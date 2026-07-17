<template>
	<view class="vote-list">
		<view class="header">
			<text class="title">投票活动</text>
		</view>

		<!-- 活动列表 -->
		<view class="activity-list">
			<view
				class="activity-item"
				v-for="item in list"
				:key="item.vote_id"
				@tap="goDetail(item.vote_id)"
			>
				<image class="cover" :src="item.cover" mode="aspectFill"></image>
				<view class="info">
					<text class="name">{{ item.activity_name }}</text>
					<view class="status-row">
						<text class="status" :class="item.time_status">{{ item.time_status_text }}</text>
						<text class="count">{{ item.player_count }}人参与</text>
					</view>
					<text class="time">{{ item.start_time }} ~ {{ item.end_time }}</text>
				</view>
			</view>
		</view>

		<!-- 加载更多 -->
		<view class="load-more" v-if="list.length > 0">
			<text v-if="loading">加载中...</text>
			<text v-else-if="!hasMore">没有更多了</text>
		</view>

		<!-- 空状态 -->
		<view class="empty" v-if="!loading && list.length === 0">
			<text>暂无投票活动</text>
		</view>
	</view>
</template>

<script>
import { getVoteList } from '@/api/activity'

export default {
	data() {
		return {
			list: [],
			page: 1,
			limit: 10,
			loading: false,
			hasMore: true
		}
	},
	onLoad() {
		this.getList()
	},
	onPullDownRefresh() {
		this.page = 1
		this.hasMore = true
		this.getList().then(() => {
			uni.stopPullDownRefresh()
		})
	},
	onReachBottom() {
		if (this.hasMore && !this.loading) {
			this.page++
			this.getList()
		}
	},
	methods: {
		async getList() {
			if (this.loading) return
			this.loading = true

			try {
				const res = await getVoteList({ page: this.page, limit: this.limit })
				if (this.page === 1) {
					this.list = res.data.list || []
				} else {
					this.list = [...this.list, ...(res.data.list || [])]
				}
				this.hasMore = this.list.length < res.data.count
			} catch (e) {
				uni.showToast({ title: e.message || '加载失败', icon: 'none' })
			} finally {
				this.loading = false
			}
		},
		goDetail(id) {
			uni.navigateTo({
				url: `/pages/vote/detail?id=${id}`
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.vote-list {
	min-height: 100vh;
	background: #f5f5f5;
}

.header {
	padding: 30rpx;
	background: #fff;

	.title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
	}
}

.activity-list {
	padding: 20rpx;
}

.activity-item {
	display: flex;
	padding: 20rpx;
	margin-bottom: 20rpx;
	background: #fff;
	border-radius: 12rpx;

	.cover {
		width: 200rpx;
		height: 150rpx;
		border-radius: 8rpx;
		flex-shrink: 0;
	}

	.info {
		flex: 1;
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.name {
			font-size: 28rpx;
			color: #333;
			font-weight: 500;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.status-row {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.status {
				font-size: 24rpx;
				padding: 4rpx 12rpx;
				border-radius: 4rpx;

				&.ongoing {
					background: #e8f5e9;
					color: #4caf50;
				}

				&.not_start {
					background: #fff3e0;
					color: #ff9800;
				}

				&.ended {
					background: #f5f5f5;
					color: #999;
				}
			}

			.count {
				font-size: 24rpx;
				color: #999;
			}
		}

		.time {
			font-size: 22rpx;
			color: #999;
		}
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
	height: 60vh;
	color: #999;
	font-size: 28rpx;
}
</style>
