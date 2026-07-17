<template>
	<view class="ranking-page">
		<!-- Tab 切换 -->
		<view class="tabs">
			<view
				class="tab-item"
				:class="{ active: activeTab === 'all' }"
				@tap="activeTab = 'all'; resetList()"
			>
				全部排行
			</view>
			<view
				class="tab-item"
				:class="{ active: activeTab === 'my' }"
				@tap="activeTab = 'my'; resetList()"
			>
				我的投票
			</view>
		</view>

		<!-- 全部排行 -->
		<view class="ranking-list" v-if="activeTab === 'all'">
			<!-- 前三名 -->
			<view class="top-three" v-if="topThree.length">
				<view class="second item" v-if="topThree[1]">
					<image class="avatar" :src="topThree[1].cover" mode="aspectFill"></image>
					<view class="rank-badge">2</view>
					<text class="name">{{ topThree[1].name }}</text>
					<text class="votes">{{ topThree[1].vote_count }}票</text>
				</view>
				<view class="first item" v-if="topThree[0]">
					<image class="avatar" :src="topThree[0].cover" mode="aspectFill"></image>
					<view class="rank-badge gold">1</view>
					<text class="name">{{ topThree[0].name }}</text>
					<text class="votes">{{ topThree[0].vote_count }}票</text>
				</view>
				<view class="third item" v-if="topThree[2]">
					<image class="avatar" :src="topThree[2].cover" mode="aspectFill"></image>
					<view class="rank-badge">3</view>
					<text class="name">{{ topThree[2].name }}</text>
					<text class="votes">{{ topThree[2].vote_count }}票</text>
				</view>
			</view>

			<!-- 其他排名 -->
			<view class="list-item" v-for="(item, idx) in list" :key="item.player_id" @tap="goPlayer(item.player_id)">
				<text class="rank">{{ idx + 4 }}</text>
				<image class="avatar" :src="item.cover" mode="aspectFill"></image>
				<view class="info">
					<text class="name">{{ item.name }}</text>
					<text class="number">编号: {{ item.number }}</text>
				</view>
				<view class="votes">
					<text class="count">{{ item.vote_count }}</text>
					<text class="label">票</text>
				</view>
			</view>
		</view>

		<!-- 我的投票记录 -->
		<view class="my-records" v-else>
			<view class="record-item" v-for="item in records" :key="item.record_id">
				<image class="avatar" :src="item.player_cover" mode="aspectFill"></image>
				<view class="info">
					<text class="name">{{ item.player_name }}</text>
					<text class="time">{{ item.create_time }}</text>
				</view>
				<text class="vote-text">已投票</text>
			</view>

			<view class="empty" v-if="!loading && records.length === 0">
				<text>暂无投票记录</text>
			</view>
		</view>

		<!-- 加载更多 -->
		<view class="load-more" v-if="(activeTab === 'all' && list.length > 0) || (activeTab === 'my' && records.length > 0)">
			<text v-if="loading">加载中...</text>
			<text v-else-if="!hasMore">没有更多了</text>
		</view>
	</view>
</template>

<script>
import { getVoteRanking, getMyVoteRecords } from '@/api/activity'

export default {
	data() {
		return {
			id: 0,
			activeTab: 'all',
			topThree: [],
			list: [],
			records: [],
			page: 1,
			loading: false,
			hasMore: true
		}
	},
	onLoad(options) {
		this.id = options.id
		this.getRanking()
	},
	onPullDownRefresh() {
		this.resetList()
		uni.stopPullDownRefresh()
	},
	onReachBottom() {
		if (this.hasMore && !this.loading) {
			this.page++
			this.loadData()
		}
	},
	methods: {
		resetList() {
			this.page = 1
			this.hasMore = true
			this.list = []
			this.records = []
			this.topThree = []
			this.loadData()
		},
		async loadData() {
			if (this.activeTab === 'all') {
				this.getRanking()
			} else {
				this.getRecords()
			}
		},
		async getRanking() {
			if (this.loading) return
			this.loading = true

			try {
				const res = await getVoteRanking(this.id, { page: this.page, limit: 20 })
				const allList = res.data.list || []

				if (this.page === 1) {
					this.topThree = allList.slice(0, 3)
					this.list = allList.slice(3)
				} else {
					this.list = [...this.list, ...allList]
				}
				this.hasMore = allList.length >= 20
			} catch (e) {
				uni.showToast({ title: e.message || '加载失败', icon: 'none' })
			} finally {
				this.loading = false
			}
		},
		async getRecords() {
			if (this.loading) return
			this.loading = true

			try {
				const res = await getMyVoteRecords({ page: this.page, limit: 20, vote_id: this.id })
				if (this.page === 1) {
					this.records = res.data.list || []
				} else {
					this.records = [...this.records, ...(res.data.list || [])]
				}
				this.hasMore = this.records.length < res.data.count
			} catch (e) {
				uni.showToast({ title: e.message || '加载失败', icon: 'none' })
			} finally {
				this.loading = false
			}
		},
		goPlayer(id) {
			uni.navigateTo({
				url: `/pages/vote/player?id=${id}`
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.ranking-page {
	min-height: 100vh;
	background: #f5f5f5;
}

.tabs {
	display: flex;
	background: #fff;
	padding: 20rpx 30rpx;

	.tab-item {
		flex: 1;
		text-align: center;
		padding: 20rpx 0;
		font-size: 28rpx;
		color: #666;
		position: relative;

		&.active {
			color: #e93323;
			font-weight: bold;

			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 40rpx;
				height: 4rpx;
				background: #e93323;
				border-radius: 2rpx;
			}
		}
	}
}

.top-three {
	display: flex;
	justify-content: center;
	align-items: flex-end;
	padding: 40rpx 20rpx;
	background: linear-gradient(135deg, #ff6b6b, #e93323);

	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;

		.avatar {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			border: 4rpx solid #fff;
		}

		.rank-badge {
			position: absolute;
			top: -10rpx;
			right: -10rpx;
			width: 40rpx;
			height: 40rpx;
			background: #c0c0c0;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			font-size: 24rpx;
			font-weight: bold;

			&.gold {
				background: #ffd700;
			}
		}

		.name {
			font-size: 26rpx;
			color: #fff;
			margin-top: 16rpx;
			max-width: 150rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.votes {
			font-size: 24rpx;
			color: rgba(255, 255, 255, 0.8);
			margin-top: 8rpx;
		}

		&.first {
			margin: 0 30rpx;

			.avatar {
				width: 160rpx;
				height: 160rpx;
			}

			.name {
				font-size: 30rpx;
			}
		}

		&.second, &.third {
			.avatar {
				width: 100rpx;
				height: 100rpx;
			}
		}
	}
}

.list-item {
	display: flex;
	align-items: center;
	padding: 24rpx 30rpx;
	background: #fff;
	border-bottom: 1rpx solid #f5f5f5;

	.rank {
		width: 60rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		text-align: center;
	}

	.avatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 8rpx;
		margin-left: 20rpx;
	}

	.info {
		flex: 1;
		margin-left: 20rpx;

		.name {
			font-size: 28rpx;
			color: #333;
			display: block;
		}

		.number {
			font-size: 24rpx;
			color: #999;
			display: block;
			margin-top: 8rpx;
		}
	}

	.votes {
		text-align: center;

		.count {
			display: block;
			font-size: 36rpx;
			font-weight: bold;
			color: #e93323;
		}

		.label {
			font-size: 22rpx;
			color: #999;
		}
	}
}

.record-item {
	display: flex;
	align-items: center;
	padding: 24rpx 30rpx;
	background: #fff;
	border-bottom: 1rpx solid #f5f5f5;

	.avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 8rpx;
	}

	.info {
		flex: 1;
		margin-left: 20rpx;

		.name {
			font-size: 28rpx;
			color: #333;
			display: block;
		}

		.time {
			font-size: 24rpx;
			color: #999;
			display: block;
			margin-top: 8rpx;
		}
	}

	.vote-text {
		font-size: 24rpx;
		color: #e93323;
	}
}

.load-more {
	text-align: center;
	padding: 30rpx;
	color: #999;
	font-size: 24rpx;
}

.empty {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 40vh;
	color: #999;
	font-size: 28rpx;
}
</style>
