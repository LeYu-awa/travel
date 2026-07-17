<template>
	<view class="travel-pay-success">
		<view class="icon-wrap">
			<text class="icon">√</text>
		</view>
		<view class="title">支付成功</view>

		<view class="info-card">
			<view class="row">
				<text class="label">订单号</text>
				<text class="value">{{ orderSn || '-' }}</text>
			</view>
			<view class="row">
				<text class="label">支付金额</text>
				<text class="value price">¥{{ formatMoney(payPrice) }}</text>
			</view>
		</view>

		<view class="btn primary" @tap="goOrderDetail">查看订单</view>
		<view class="btn plain" @tap="goOrderList">我的旅游订单</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderId: 0,
			orderSn: '',
			payPrice: 0
		}
	},
	onLoad(options) {
		this.orderId = Number(options.orderId || options.id || 0)
		this.orderSn = options.orderSn || ''
		this.payPrice = Number(options.payPrice || 0)
	},
	methods: {
		formatMoney(v) {
			return Number(v || 0).toFixed(2)
		},
		goOrderDetail() {
			if (this.orderId) {
				uni.redirectTo({ url: `/pages/travel/order/detail?id=${this.orderId}` })
			} else {
				this.goOrderList()
			}
		},
		goOrderList() {
			uni.redirectTo({ url: '/pages/travel/order/list' })
		}
	}
}
</script>

<style lang="scss" scoped>
.travel-pay-success {
	padding: 40rpx;
	text-align: center;

	.icon-wrap {
		width: 140rpx;
		height: 140rpx;
		background: #e8f8ea;
		border-radius: 70rpx;
		margin: 30rpx auto 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.icon {
			font-size: 74rpx;
			color: #2dbf55;
			font-weight: 600;
		}
	}

	.title {
		font-size: 36rpx;
		font-weight: 600;
		color: #222;
		margin-bottom: 30rpx;
	}

	.info-card {
		background: #fff;
		border-radius: 16rpx;
		padding: 26rpx;
		margin-bottom: 26rpx;

		.row {
			display: flex;
			justify-content: space-between;
			padding: 16rpx 0;

			.label {
				font-size: 25rpx;
				color: #777;
			}

			.value {
				font-size: 25rpx;
				color: #333;
			}

			.price {
				color: #e93323;
				font-size: 30rpx;
				font-weight: 600;
			}
		}
	}

	.btn {
		height: 78rpx;
		line-height: 78rpx;
		border-radius: 39rpx;
		font-size: 27rpx;
		margin-top: 16rpx;

		&.primary {
			background: #e93323;
			color: #fff;
		}

		&.plain {
			border: 1rpx solid #ddd;
			color: #666;
			background: #fff;
		}
	}
}
</style>
