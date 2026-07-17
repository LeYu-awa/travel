<template>
	<view class="travel-contract-redirect">
		<view class="card">
			<view class="title">发起签约</view>
			<view class="desc">{{ tips }}</view>
			<view class="btn" @tap="startSign" :class="{ disabled: loading }">
				{{ loading ? '处理中...' : '重新尝试' }}
			</view>
			<view class="btn plain" @tap="goContractIndex">查看合同状态</view>
		</view>
	</view>
</template>

<script>
import { travelContractStart } from '@/api/travel.js'

export default {
	data() {
		return {
			orderId: 0,
			loading: false,
			tips: '正在准备合同签署链接...'
		}
	},
	onLoad(options) {
		this.orderId = Number(options.orderId || 0)
		if (!this.orderId) {
			this.tips = '订单参数错误'
			return
		}
		this.startSign()
	},
	methods: {
		goContractIndex() {
			uni.redirectTo({ url: `/pages/travel/contract/index?orderId=${this.orderId}` })
		},
		openSignUrl(url) {
			// #ifdef H5
			window.location.href = url
			// #endif

			// #ifdef MP || APP-PLUS
			uni.navigateTo({
				url: `/pages/annex/web_view/index?url=${encodeURIComponent(url)}`
			})
			// #endif
		},
		async startSign() {
			if (!this.orderId || this.loading) return
			this.loading = true
			try {
				const res = await travelContractStart(this.orderId)
				const contract = res.data || {}
				const signUrl = contract.sign_url || ''
				if (signUrl) {
					this.tips = '已获取签约链接，正在跳转...'
					this.openSignUrl(signUrl)
				} else {
					this.tips = '未获取到签约链接，请稍后在合同状态页重试'
					uni.showToast({ title: '签约链接暂不可用', icon: 'none' })
					this.goContractIndex()
				}
			} catch (e) {
				this.tips = e.message || '签约发起失败'
				uni.showToast({ title: this.tips, icon: 'none' })
			} finally {
				this.loading = false
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.travel-contract-redirect {
	min-height: 100vh;
	padding: 30rpx;

	.card {
		background: #fff;
		border-radius: 16rpx;
		padding: 30rpx;
		margin-top: 120rpx;
		text-align: center;
	}

	.title {
		font-size: 34rpx;
		font-weight: 600;
		color: #222;
	}

	.desc {
		font-size: 25rpx;
		color: #777;
		margin: 24rpx 0 34rpx;
		line-height: 1.6;
	}

	.btn {
		height: 74rpx;
		line-height: 74rpx;
		border-radius: 37rpx;
		background: #e93323;
		color: #fff;
		font-size: 27rpx;
		margin-bottom: 14rpx;

		&.plain {
			background: #fff;
			color: #666;
			border: 1rpx solid #ddd;
		}

		&.disabled {
			opacity: 0.65;
		}
	}
}
</style>
