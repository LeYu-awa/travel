<template>
	<view class="vote-detail" v-if="detail">
		<!-- 封面 -->
		<image class="cover" :src="detail.cover" mode="aspectFill"></image>

		<!-- 活动信息 -->
		<view class="info-card">
			<text class="title">{{ detail.activity_name }}</text>
			<view class="stats">
				<view class="stat-item">
					<text class="num">{{ detail.player_count || 0 }}</text>
					<text class="label">选手</text>
				</view>
				<view class="stat-item">
					<text class="num">{{ detail.vote_count || 0 }}</text>
					<text class="label">投票</text>
				</view>
			</view>
		</view>

		<!-- 轮播图 -->
		<swiper class="banner" v-if="detail.banner && detail.banner.length" indicator-dots autoplay circular>
			<swiper-item v-for="(img, idx) in detail.banner" :key="idx">
				<image :src="img" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<!-- 活动描述 -->
		<view class="section" v-if="detail.description">
			<text class="section-title">活动介绍</text>
			<view class="content">
				<rich-text :nodes="detail.description"></rich-text>
			</view>
		</view>

		<!-- 活动规则 -->
		<view class="section" v-if="detail.rule">
			<text class="section-title">活动规则</text>
			<view class="content">
				<rich-text :nodes="detail.rule"></rich-text>
			</view>
		</view>

		<!-- 时间信息 -->
		<view class="time-info">
			<view class="time-row">
				<text class="label">投票时间</text>
				<text class="value">{{ detail.start_time }} ~ {{ detail.end_time }}</text>
			</view>
			<view class="time-row" v-if="detail.apply_start_time">
				<text class="label">报名时间</text>
				<text class="value">{{ detail.apply_start_time }} ~ {{ detail.apply_end_time }}</text>
			</view>
			<view class="time-row">
				<text class="label">每日限投</text>
				<text class="value">{{ detail.per_day_count }}次</text>
			</view>
		</view>

		<!-- 选手列表 -->
		<view class="section">
			<view class="section-header">
				<text class="section-title">参赛选手</text>
				<text class="more" @tap="goRanking">查看排行 ></text>
			</view>
			<view class="player-list">
				<view
					class="player-item"
					v-for="item in players"
					:key="item.player_id"
					@tap="goPlayer(item.player_id)"
				>
					<image class="avatar" :src="item.cover" mode="aspectFill"></image>
					<view class="player-info">
						<text class="name">{{ item.name }}</text>
						<text class="number">编号: {{ item.number }}</text>
					</view>
					<view class="vote-count">
						<text class="count">{{ item.vote_count }}</text>
						<text class="label">票</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部操作栏 -->
		<view class="bottom-bar">
			<view class="btn apply" @tap="goApply" v-if="detail.apply_status === 1">
				立即报名
			</view>
			<view class="btn apply disabled" v-else-if="detail.apply_status === 'applied'">
				已报名
			</view>
			<view class="btn apply disabled" v-else>
				{{ detail.apply_status_text }}
			</view>
			<view class="btn ranking" @tap="goRanking">
				排行榜
			</view>
		</view>
	</view>
</template>

<script>
import { getVoteDetail, getVotePlayerList } from '@/api/activity'

export default {
	data() {
		return {
			id: 0,
			detail: null,
			players: [],
			playerPage: 1
		}
	},
	onLoad(options) {
		this.id = options.id
		this.getDetail()
		this.getPlayers()
	},
	methods: {
		async getDetail() {
			try {
				const res = await getVoteDetail(this.id)
				this.detail = res.data
				uni.setNavigationBarTitle({ title: res.data.activity_name })
			} catch (e) {
				uni.showToast({ title: e.message || '加载失败', icon: 'none' })
			}
		},
		async getPlayers() {
			try {
				const res = await getVotePlayerList(this.id, { page: this.playerPage, limit: 5 })
				this.players = res.data.list || []
			} catch (e) {
				console.error(e)
			}
		},
		goPlayer(id) {
			uni.navigateTo({
				url: `/pages/vote/player?id=${id}`
			})
		},
		goRanking() {
			uni.navigateTo({
				url: `/pages/vote/ranking?id=${this.id}`
			})
		},
		goApply() {
			uni.navigateTo({
				url: `/pages/vote/apply?id=${this.id}`
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.vote-detail {
	padding-bottom: 120rpx;
	background: #f5f5f5;
}

.cover {
	width: 100%;
	height: 400rpx;
}

.info-card {
	background: #fff;
	padding: 30rpx;
	margin-bottom: 20rpx;

	.title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		display: block;
		margin-bottom: 20rpx;
	}

	.stats {
		display: flex;
		justify-content: center;

		.stat-item {
			text-align: center;
			padding: 0 60rpx;

			.num {
				display: block;
				font-size: 48rpx;
				font-weight: bold;
				color: #e93323;
			}

			.label {
				font-size: 24rpx;
				color: #999;
			}
		}
	}
}

.banner {
	height: 300rpx;
	margin-bottom: 20rpx;

	image {
		width: 100%;
		height: 100%;
	}
}

.section {
	background: #fff;
	padding: 30rpx;
	margin-bottom: 20rpx;

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;

		.more {
			font-size: 24rpx;
			color: #999;
		}
	}

	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		display: block;
		margin-bottom: 20rpx;
	}

	.content {
		font-size: 28rpx;
		color: #666;
		line-height: 1.6;
	}
}

.time-info {
	background: #fff;
	padding: 30rpx;
	margin-bottom: 20rpx;

	.time-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 16rpx;

		&:last-child {
			margin-bottom: 0;
		}

		.label {
			font-size: 28rpx;
			color: #999;
		}

		.value {
			font-size: 28rpx;
			color: #333;
		}
	}
}

.player-list {
	.player-item {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f5f5f5;

		&:last-child {
			border-bottom: none;
		}

		.avatar {
			width: 100rpx;
			height: 100rpx;
			border-radius: 8rpx;
			flex-shrink: 0;
		}

		.player-info {
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

		.vote-count {
			text-align: center;

			.count {
				display: block;
				font-size: 32rpx;
				font-weight: bold;
				color: #e93323;
			}

			.label {
				font-size: 22rpx;
				color: #999;
			}
		}
	}
}

.bottom-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	padding: 20rpx 30rpx;
	background: #fff;
	box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);

	.btn {
		flex: 1;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 40rpx;
		font-size: 28rpx;
		font-weight: 500;

		&.apply {
			background: #e93323;
			color: #fff;
			margin-right: 20rpx;

			&.disabled {
				background: #ccc;
			}
		}

		&.ranking {
			background: #fff;
			color: #e93323;
			border: 2rpx solid #e93323;
		}
	}
}
</style>
