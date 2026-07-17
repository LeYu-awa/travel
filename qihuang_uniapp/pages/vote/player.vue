<template>
	<view class="player-detail" v-if="player">
		<!-- 选手封面 -->
		<image class="cover" :src="player.cover" mode="aspectFill"></image>

		<!-- 选手信息 -->
		<view class="info-card">
			<view class="header">
				<view class="left">
					<text class="name">{{ player.name }}</text>
					<text class="number">编号: {{ player.number }}</text>
				</view>
				<view class="vote-count">
					<text class="count">{{ player.vote_count }}</text>
					<text class="label">票</text>
				</view>
			</view>

			<!-- 排名 -->
			<view class="rank-info" v-if="rank > 0">
				<text class="rank">当前排名第 {{ rank }} 名</text>
			</view>
		</view>

		<!-- 图片展示 -->
		<view class="section" v-if="player.images && player.images.length">
			<text class="section-title">图片展示</text>
			<view class="images">
				<image
					v-for="(img, idx) in player.images"
					:key="idx"
					:src="img"
					mode="aspectFill"
					@tap="previewImage(idx)"
				></image>
			</view>
		</view>

		<!-- 选手简介 -->
		<view class="section" v-if="player.description">
			<text class="section-title">选手简介</text>
			<view class="content">
				<rich-text :nodes="player.description"></rich-text>
			</view>
		</view>

		<!-- 扩展字段 -->
		<view class="section" v-if="player.extra_fields && Object.keys(player.extra_fields).length">
			<text class="section-title">更多信息</text>
			<view class="extra-fields">
				<view class="field-item" v-for="(value, key) in player.extra_fields" :key="key">
					<text class="field-label">{{ key }}</text>
					<text class="field-value">{{ value }}</text>
				</view>
			</view>
		</view>

		<!-- 底部操作栏 -->
		<view class="bottom-bar">
			<view class="btn vote" @tap="doVote" :class="{ disabled: voting }">
				{{ voting ? '投票中...' : '投一票' }}
			</view>
			<view class="btn share" @tap="sharePlayer">
				分享拉票
			</view>
		</view>
	</view>
</template>

<script>
import { getVotePlayerDetail, doVote } from '@/api/activity'

export default {
	data() {
		return {
			id: 0,
			player: null,
			rank: 0,
			voting: false
		}
	},
	onLoad(options) {
		this.id = options.id
		this.getDetail()
	},
	methods: {
		async getDetail() {
			try {
				const res = await getVotePlayerDetail(this.id)
				this.player = res.data
				this.rank = res.data.rank || 0
				uni.setNavigationBarTitle({ title: res.data.name })
			} catch (e) {
				uni.showToast({ title: e.message || '加载失败', icon: 'none' })
			}
		},
		previewImage(idx) {
			uni.previewImage({
				current: idx,
				urls: this.player.images
			})
		},
		async doVote() {
			if (this.voting) return

			// 检查登录状态
			const token = uni.getStorageSync('token')
			if (!token) {
				uni.showToast({ title: '请先登录', icon: 'none' })
				setTimeout(() => {
					uni.navigateTo({ url: '/pages/users/login/index' })
				}, 1500)
				return
			}

			this.voting = true
			try {
				const res = await doVote(this.player.vote_id, this.player.player_id)
				uni.showToast({ title: '投票成功', icon: 'success' })
				// 更新票数
				this.player.vote_count++
				this.rank = res.data.rank || this.rank
			} catch (e) {
				uni.showToast({ title: e.message || '投票失败', icon: 'none' })
			} finally {
				this.voting = false
			}
		},
		sharePlayer() {
			// #ifdef H5
			// H5分享逻辑
			uni.showToast({ title: '请使用浏览器分享功能', icon: 'none' })
			// #endif

			// #ifdef MP
			// 小程序分享由 onShareAppMessage 处理
			// #endif
		}
	},
	// #ifdef MP
	onShareAppMessage() {
		return {
			title: `快来为 ${this.player?.name || ''} 投票吧！`,
			path: `/pages/vote/player?id=${this.id}`
		}
	}
	// #endif
}
</script>

<style lang="scss" scoped>
.player-detail {
	padding-bottom: 120rpx;
	background: #f5f5f5;
}

.cover {
	width: 100%;
	height: 500rpx;
}

.info-card {
	background: #fff;
	padding: 30rpx;
	margin-bottom: 20rpx;

	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;

		.left {
			.name {
				font-size: 36rpx;
				font-weight: bold;
				color: #333;
				display: block;
			}

			.number {
				font-size: 26rpx;
				color: #999;
				display: block;
				margin-top: 10rpx;
			}
		}

		.vote-count {
			text-align: center;
			background: linear-gradient(135deg, #ff6b6b, #e93323);
			padding: 20rpx 30rpx;
			border-radius: 12rpx;

			.count {
				display: block;
				font-size: 48rpx;
				font-weight: bold;
				color: #fff;
			}

			.label {
				font-size: 24rpx;
				color: rgba(255, 255, 255, 0.8);
			}
		}
	}

	.rank-info {
		margin-top: 20rpx;
		padding-top: 20rpx;
		border-top: 1rpx solid #f5f5f5;

		.rank {
			font-size: 28rpx;
			color: #e93323;
			font-weight: 500;
		}
	}
}

.section {
	background: #fff;
	padding: 30rpx;
	margin-bottom: 20rpx;

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

.images {
	display: flex;
	flex-wrap: wrap;
	gap: 10rpx;

	image {
		width: 210rpx;
		height: 210rpx;
		border-radius: 8rpx;
	}
}

.extra-fields {
	.field-item {
		display: flex;
		justify-content: space-between;
		padding: 16rpx 0;
		border-bottom: 1rpx solid #f5f5f5;

		&:last-child {
			border-bottom: none;
		}

		.field-label {
			font-size: 28rpx;
			color: #999;
		}

		.field-value {
			font-size: 28rpx;
			color: #333;
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

		&.vote {
			background: linear-gradient(135deg, #ff6b6b, #e93323);
			color: #fff;
			margin-right: 20rpx;

			&.disabled {
				opacity: 0.6;
			}
		}

		&.share {
			background: #fff;
			color: #e93323;
			border: 2rpx solid #e93323;
		}
	}
}
</style>
