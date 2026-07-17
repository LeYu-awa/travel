<template>
	<view class="travel-order-cancel">
		<view class="card">
			<view class="title">取消订单</view>
			<view class="subtitle">请选择取消原因</view>

			<view class="reason-list">
				<view
					v-for="item in reasons"
					:key="item"
					:class="['reason-item', selectedReason === item ? 'active' : '']"
					@tap="selectedReason = item"
				>{{ item }}</view>
			</view>

			<view class="textarea-wrap">
				<textarea v-model.trim="customReason" maxlength="120" placeholder="补充说明（选填）"></textarea>
			</view>
		</view>

		<view class="bottom">
			<view class="btn plain" @tap="goBack">返回</view>
			<view class="btn primary" @tap="submitCancel">确认取消</view>
		</view>
	</view>
</template>

<script>
import { travelOrderCancel } from '@/api/travel.js'

export default {
	data() {
		return {
			orderId: 0,
			selectedReason: '',
			customReason: '',
			reasons: ['行程有变', '时间冲突', '价格原因', '信息填写错误', '其他']
		}
	},
	onLoad(options) {
		this.orderId = Number(options.id || 0)
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		async submitCancel() {
			if (!this.orderId) {
				uni.showToast({ title: '订单参数错误', icon: 'none' })
				return
			}
			const reasonBase = this.selectedReason || '用户取消'
			const reason = this.customReason ? `${reasonBase}：${this.customReason}` : reasonBase
			try {
				await travelOrderCancel(this.orderId, { reason })
				uni.showToast({ title: '取消成功', icon: 'success' })
				setTimeout(() => {
					uni.redirectTo({ url: '/pages/travel/order/list' })
				}, 300)
			} catch (e) {
				uni.showToast({ title: e.message || '取消失败', icon: 'none' })
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.travel-order-cancel {
	padding: 20rpx;
	padding-bottom: 120rpx;

	.card {
		background: #fff;
		border-radius: 16rpx;
		padding: 24rpx;

		.title {
			font-size: 32rpx;
			font-weight: 600;
			color: #222;
		}

		.subtitle {
			font-size: 24rpx;
			color: #888;
			margin-top: 8rpx;
		}
	}

	.reason-list {
		margin-top: 22rpx;

		.reason-item {
			padding: 20rpx;
			border: 1rpx solid #ececec;
			border-radius: 10rpx;
			margin-bottom: 14rpx;
			font-size: 26rpx;
			color: #444;

			&.active {
				border-color: #e93323;
				background: #fff5f4;
				color: #e93323;
			}
		}
	}

	.textarea-wrap {
		margin-top: 16rpx;

		textarea {
			width: 100%;
			height: 160rpx;
			background: #f7f7f7;
			border-radius: 10rpx;
			padding: 16rpx;
			font-size: 24rpx;
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
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);

		.btn {
			flex: 1;
			height: 72rpx;
			line-height: 72rpx;
			text-align: center;
			font-size: 27rpx;
			border-radius: 36rpx;

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
