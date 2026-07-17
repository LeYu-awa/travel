<template>
	<view class="travel-contract-index">
		<view class="card">
			<view class="title">合同状态</view>
			<view class="row">
				<text class="label">状态</text>
				<text class="value">{{ statusText(contract.status) }}</text>
			</view>
			<view class="row" v-if="contract.contract_no">
				<text class="label">合同编号</text>
				<text class="value">{{ contract.contract_no }}</text>
			</view>
			<view class="row" v-if="contract.signed_at">
				<text class="label">签署时间</text>
				<text class="value">{{ contract.signed_at }}</text>
			</view>
		</view>

		<view class="card" v-if="contract.sign_url">
			<view class="title">签约操作</view>
			<view class="btn primary" @tap="goSign">前往签约</view>
		</view>

		<view class="card" v-if="contract.pdf_url">
			<view class="title">合同文件</view>
			<view class="btn primary" @tap="downloadPdf">下载PDF</view>
		</view>

		<view class="card" v-if="!contract.sign_url && !contract.pdf_url">
			<view class="title">提示</view>
			<view class="tip">签约链接暂不可用，请稍后刷新状态。</view>
			<view class="btn" @tap="refreshAll">刷新状态</view>
		</view>

		<view class="bottom">
			<view class="btn plain" @tap="goOrder">返回订单</view>
			<view v-if="contract.status === 'signed'" class="btn primary" @tap="goPay">去支付</view>
			<view v-else class="btn primary" @tap="refreshAll">刷新状态</view>
		</view>
	</view>
</template>

<script>
import { travelContractStatus, travelContractDetail, travelContractDownload } from '@/api/travel.js'

export default {
	data() {
		return {
			orderId: 0,
			contract: {
				status: 'none',
				contract_no: '',
				sign_url: '',
				pdf_url: '',
				signed_at: ''
			},
			pollTimer: null
		}
	},
	onLoad(options) {
		this.orderId = Number(options.orderId || 0)
		this.refreshAll()
	},
	onShow() {
		if (this.orderId && !this.pollTimer && this.contract.status === 'pending') {
			this.startPoll()
		}
	},
	onHide() {
		this.stopPoll()
	},
	onUnload() {
		this.stopPoll()
	},
	methods: {
		statusText(status) {
			const map = {
				none: '未创建',
				pending: '待签署',
				signed: '已签署',
				rejected: '已拒签'
			}
			return map[status] || status || '-'
		},
		async refreshAll() {
			if (!this.orderId) return
			try {
				let statusData = {}
				let detailData = {}
				try {
					const statusRes = await travelContractStatus(this.orderId)
					statusData = statusRes && statusRes.data ? statusRes.data : {}
				} catch (e) {}
				try {
					const detailRes = await travelContractDetail(this.orderId)
					detailData = detailRes && detailRes.data ? detailRes.data : {}
				} catch (e) {}

				this.contract = Object.assign(
					{},
					this.contract,
					detailData,
					{
						status: statusData.status || detailData.status || 'none',
						sign_url: statusData.sign_url || detailData.sign_url || '',
						pdf_url: statusData.pdf_url || detailData.pdf_url || '',
						signed_at: statusData.signed_at || detailData.signed_at || ''
					}
				)

				if (this.contract.status === 'pending') {
					this.startPoll()
				} else {
					this.stopPoll()
				}
			} catch (e) {
				uni.showToast({ title: e.message || '加载失败', icon: 'none' })
			}
		},
		startPoll() {
			this.stopPoll()
			this.pollTimer = setInterval(() => {
				this.refreshAll()
			}, 5000)
		},
		stopPoll() {
			if (this.pollTimer) {
				clearInterval(this.pollTimer)
				this.pollTimer = null
			}
		},
		goSign() {
			if (!this.contract.sign_url) {
				uni.showToast({ title: '签约链接暂不可用', icon: 'none' })
				return
			}
			// #ifdef H5
			window.location.href = this.contract.sign_url
			// #endif
			// #ifdef MP || APP-PLUS
			uni.navigateTo({
				url: `/pages/annex/web_view/index?url=${encodeURIComponent(this.contract.sign_url)}`
			})
			// #endif
		},
		async downloadPdf() {
			try {
				const res = await travelContractDownload(this.orderId)
				const url = res.data && res.data.url ? res.data.url : ''
				if (!url) {
					uni.showToast({ title: '暂无可下载文件', icon: 'none' })
					return
				}

				// #ifdef H5
				window.open(url, '_blank')
				// #endif

				// #ifdef MP || APP-PLUS
				uni.downloadFile({
					url,
					success: downRes => {
						if (downRes.statusCode !== 200) {
							uni.showToast({ title: '下载失败', icon: 'none' })
							return
						}
						uni.openDocument({
							filePath: downRes.tempFilePath,
							showMenu: true
						})
					},
					fail: () => {
						uni.showToast({ title: '下载失败', icon: 'none' })
					}
				})
				// #endif
			} catch (e) {
				uni.showToast({ title: e.message || '下载失败', icon: 'none' })
			}
		},
		goPay() {
			uni.redirectTo({ url: `/pages/travel/order/pay?id=${this.orderId}` })
		},
		goOrder() {
			uni.redirectTo({ url: `/pages/travel/order/detail?id=${this.orderId}` })
		}
	}
}
</script>

<style lang="scss" scoped>
.travel-contract-index {
	padding: 20rpx;
	padding-bottom: 120rpx;

	.card {
		background: #fff;
		border-radius: 16rpx;
		padding: 24rpx;
		margin-bottom: 16rpx;
	}

	.title {
		font-size: 30rpx;
		font-weight: 600;
		color: #222;
		margin-bottom: 16rpx;
	}

	.row {
		display: flex;
		justify-content: space-between;
		padding: 14rpx 0;
		border-bottom: 1rpx solid #f5f5f5;

		&:last-child {
			border-bottom: none;
		}

		.label {
			font-size: 25rpx;
			color: #777;
		}

		.value {
			font-size: 25rpx;
			color: #333;
		}
	}

	.tip {
		font-size: 25rpx;
		color: #888;
		line-height: 1.6;
		margin-bottom: 16rpx;
	}

	.btn {
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		font-size: 26rpx;
		border-radius: 35rpx;
		background: #f5f5f5;
		color: #666;

		&.primary {
			background: #e93323;
			color: #fff;
		}
	}

	.bottom {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		padding: 20rpx;
		display: flex;
		gap: 14rpx;
		box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.05);

		.btn {
			flex: 1;

			&.plain {
				background: #f5f5f5;
				color: #666;
			}
		}
	}
}
</style>
