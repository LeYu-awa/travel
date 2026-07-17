<template>
	<view class="travel-contract-confirm">
		<view class="card">
			<view class="icon" :class="contract.status === 'signed' ? 'ok' : 'pending'">
				{{ contract.status === 'signed' ? '√' : '...' }}
			</view>
			<view class="title">{{ titleText }}</view>
			<view class="desc">{{ descText }}</view>

			<view class="info" v-if="contract.contract_no">
				<view class="row">
					<text>合同编号</text>
					<text>{{ contract.contract_no }}</text>
				</view>
				<view class="row" v-if="contract.signed_at">
					<text>签署时间</text>
					<text>{{ contract.signed_at }}</text>
				</view>
			</view>
		</view>

		<view class="bottom">
			<view class="btn plain" @tap="goOrder">返回订单</view>
			<view class="btn primary" v-if="contract.status === 'signed'" @tap="goPay">去支付</view>
			<view class="btn primary" v-else @tap="refreshStatus">刷新状态</view>
		</view>
	</view>
</template>

<script>
import { travelContractStatus, travelContractDetail } from '@/api/travel.js'

export default {
	data() {
		return {
			orderId: 0,
			contract: {
				status: 'none',
				contract_no: '',
				signed_at: ''
			},
			timer: null
		}
	},
	computed: {
		titleText() {
			if (this.contract.status === 'signed') return '签约成功'
			if (this.contract.status === 'pending') return '等待签约完成'
			if (this.contract.status === 'rejected') return '签约失败'
			return '未发起签约'
		},
		descText() {
			if (this.contract.status === 'signed') return '合同已签署，可以继续支付订单'
			if (this.contract.status === 'pending') return '请在签约平台完成签署后返回'
			if (this.contract.status === 'rejected') return '签约被拒绝，请重新发起'
			return '暂无签约记录'
		}
	},
	onLoad(options) {
		this.orderId = Number(options.orderId || 0)
		this.refreshStatus()
	},
	onHide() {
		this.stopTimer()
	},
	onUnload() {
		this.stopTimer()
	},
	methods: {
		stopTimer() {
			if (this.timer) {
				clearInterval(this.timer)
				this.timer = null
			}
		},
		async refreshStatus() {
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
				this.contract = Object.assign({}, detailData, {
					status: statusData.status || detailData.status || 'none',
					signed_at: statusData.signed_at || detailData.signed_at || ''
				})
				if (this.contract.status === 'pending') {
					this.startTimer()
				} else {
					this.stopTimer()
				}
			} catch (e) {
				uni.showToast({ title: e.message || '查询失败', icon: 'none' })
			}
		},
		startTimer() {
			this.stopTimer()
			this.timer = setInterval(() => {
				this.refreshStatus()
			}, 5000)
		},
		goOrder() {
			uni.redirectTo({ url: `/pages/travel/order/detail?id=${this.orderId}` })
		},
		goPay() {
			uni.redirectTo({ url: `/pages/travel/order/pay?id=${this.orderId}` })
		}
	}
}
</script>

<style lang="scss" scoped>
.travel-contract-confirm {
	padding: 24rpx;
	padding-bottom: 120rpx;

	.card {
		background: #fff;
		border-radius: 16rpx;
		padding: 30rpx;
		text-align: center;
		margin-top: 80rpx;
	}

	.icon {
		width: 120rpx;
		height: 120rpx;
		margin: 0 auto 24rpx;
		border-radius: 60rpx;
		line-height: 120rpx;
		font-size: 56rpx;
		font-weight: 600;

		&.ok {
			background: #e8f8ea;
			color: #2dbf55;
		}

		&.pending {
			background: #f8f3e8;
			color: #cc8b27;
		}
	}

	.title {
		font-size: 34rpx;
		font-weight: 600;
		color: #222;
	}

	.desc {
		font-size: 25rpx;
		color: #777;
		margin-top: 12rpx;
		line-height: 1.6;
	}

	.info {
		margin-top: 24rpx;
		background: #f7f7f7;
		border-radius: 10rpx;
		padding: 16rpx;

		.row {
			display: flex;
			justify-content: space-between;
			font-size: 24rpx;
			color: #555;
			padding: 8rpx 0;
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
			height: 72rpx;
			line-height: 72rpx;
			text-align: center;
			border-radius: 36rpx;
			font-size: 26rpx;

			&.plain {
				background: #f5f5f5;
				color: #666;
			}

			&.primary {
				background: #e93323;
				color: #fff;
			}
		}
	}
}
</style>
