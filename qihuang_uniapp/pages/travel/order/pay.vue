<template>
	<view class="travel-order-pay">
		<view class="card" v-if="order.id">
			<text class="name">{{ order.product ? order.product.name : '旅游产品' }}</text>
			<text class="meta">出发日期：{{ order.departure ? order.departure.date : '--' }}</text>
			<text class="meta">人数：{{ peopleText }}</text>
			<view class="amount-line">
				<text>应付金额</text>
				<text class="amount">¥{{ formatMoney(order.pay_price) }}</text>
			</view>
		</view>

		<view v-if="contractRequired && !contractSigned" class="notice-card">
			<view class="notice-title">该订单需要先签约后支付</view>
			<view class="notice-sub">请先完成电子合同签署，再返回支付</view>
			<view class="notice-btn" @tap="goSign">去签约</view>
		</view>

		<view class="card" v-if="!contractRequired || contractSigned">
			<view class="title">选择支付方式</view>
			<view
				:class="['pay-item', payType === 'wechat' ? 'active' : '']"
				@tap="payType = 'wechat'"
			>
				<text>微信支付</text>
				<view class="right">
					<text v-if="payType === 'wechat'">已选</text>
				</view>
			</view>
			<view
				v-if="canUseAlipay"
				:class="['pay-item', payType === 'alipay' ? 'active' : '']"
				@tap="payType = 'alipay'"
			>
				<text>支付宝支付</text>
				<view class="right">
					<text v-if="payType === 'alipay'">已选</text>
				</view>
			</view>
			<view
				v-if="canUseBalance"
				:class="['pay-item', payType === 'balance' ? 'active' : '']"
				@tap="payType = 'balance'"
			>
				<text>余额支付</text>
				<view class="right">
					<text class="sub">可用余额 ¥{{ formatMoney(nowMoney) }}</text>
					<text v-if="payType === 'balance'">已选</text>
				</view>
			</view>
		</view>

		<view class="bottom-bar">
			<view class="price">
				<text class="label">应付</text>
				<text class="value">¥{{ formatMoney(order.pay_price) }}</text>
			</view>
			<view :class="['pay-btn', submitting ? 'disabled' : '']" @tap="submitPay">
				{{ submitting ? '支付中...' : '立即支付' }}
			</view>
		</view>

		<!-- 支付失败提示 -->
		<uni-popup ref="failPopup" type="center">
			<view class="fail-popup">
				<view class="fail-icon">!</view>
				<view class="fail-title">支付失败</view>
				<view class="fail-msg">{{ payErrorMsg }}</view>
				<view class="fail-btns">
					<view class="btn-retry" @tap="closeFailAndRetry">重新支付</view>
					<view class="btn-order" @tap="goOrderDetail">查看订单</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { travelOrderDetail, travelOrderPay } from '@/api/travel.js'
import { getUserInfo } from '@/api/user.js'

export default {
	data() {
		return {
			orderId: 0,
			order: {},
			contractRequired: false,
			contractSigned: false,
			payType: 'wechat',
			nowMoney: 0,
			alipayOpen: 1,
			balanceOpen: 0,
			submitting: false,
			payErrorMsg: ''
		}
	},
	computed: {
		peopleText() {
			const adult = Number(this.order.adult_num || 0)
			const child =
				Number(this.order.child_num || 0) +
				Number(this.order.big_child_num || 0) +
				Number(this.order.mid_child_num || 0) +
				Number(this.order.small_child_num || 0)
			return `${adult}成人${child > 0 ? ` ${child}儿童` : ''}`
		},
		canUseAlipay() {
			return Number(this.alipayOpen || 0) === 1
		},
		canUseBalance() {
			return Number(this.balanceOpen || 0) === 1
		}
	},
	onLoad(options) {
		this.orderId = Number(options.id || 0)
		this.initPayConfig()
		this.getUserProfile()
		this.getOrderDetail()
	},
	onShow() {
		if (this.orderId) {
			this.initPayConfig()
			this.getOrderDetail()
			this.getUserProfile()
		}
	},
	methods: {
		formatMoney(v) {
			return Number(v || 0).toFixed(2)
		},
		initPayConfig() {
			try {
				const globalData = (this.$store && this.$store.getters && this.$store.getters.globalData) || {}
				this.alipayOpen = Number(globalData.alipay_open || 0)
				this.balanceOpen = Number(globalData.yue_pay_status || 0)
			} catch (e) {
				this.alipayOpen = 1
				this.balanceOpen = 0
			}
			if (!this.canUseAlipay && this.payType === 'alipay') {
				this.payType = 'wechat'
			}
			if (!this.canUseBalance && this.payType === 'balance') {
				this.payType = 'wechat'
			}
		},
		async getUserProfile() {
			try {
				const res = await getUserInfo()
				const user = res.data || {}
				this.nowMoney = Number(user.now_money || 0)
			} catch (e) {}
		},
		async getOrderDetail() {
			if (!this.orderId) return
			try {
				const res = await travelOrderDetail(this.orderId)
				this.order = res.data || {}
				this.contractRequired = Number(this.order.contract_required || 0) === 1
				this.contractSigned = Number(this.order.contract_signed || 0) === 1
			} catch (e) {
				uni.showToast({ title: e.message || '订单加载失败', icon: 'none' })
			}
		},
		goSign() {
			uni.navigateTo({ url: `/pages/travel/contract/redirect?orderId=${this.orderId}` })
		},
		getClientFromPlatform() {
			let from = 'mini'
			// #ifdef H5
			from = this.$wechat && this.$wechat.isWeixin && this.$wechat.isWeixin() ? 'weixin' : 'h5'
			// #endif
			// #ifdef APP-PLUS
			from = 'app'
			// #endif
			// #ifdef MP
			from = 'mini'
			// #endif
			return from
		},
		async submitPay() {
			if (!this.orderId || this.submitting) return
			if (this.contractRequired && !this.contractSigned) {
				uni.showToast({ title: '请先签署合同', icon: 'none' })
				return
			}
			if (this.payType === 'balance' && Number(this.nowMoney || 0) < Number(this.order.pay_price || 0)) {
				uni.showToast({ title: '余额不足，请更换支付方式', icon: 'none' })
				return
			}
			this.submitting = true
			try {
				const from = this.getClientFromPlatform()
				const payParams = {
					pay_type: this.payType,
					from
				}
				// #ifdef H5
				payParams.return_url = `${window.location.protocol}//${window.location.host}/pages/travel/order/detail?id=${this.orderId}`
				// #endif
				const res = await travelOrderPay(this.orderId, payParams)
				await this.handlePayResponse(res.data || {})
			} catch (e) {
				if (e && e.__cancel) {
					uni.showToast({ title: e.message || '已取消支付', icon: 'none' })
					return
				}
				this.showPayError(e.message || '支付发起失败，请稍后重试')
			} finally {
				this.submitting = false
			}
		},
		showPayError(msg) {
			this.payErrorMsg = msg
			try {
				if (this.$refs.failPopup) {
					this.$refs.failPopup.open()
				} else {
					// 弹窗组件未就绪，使用 modal 替代
					uni.showModal({
						title: '支付失败',
						content: msg,
						confirmText: '重新支付',
						cancelText: '查看订单',
						success: (res) => {
							if (res.confirm) {
								// 重新支付，什么都不做
							} else {
								this.goOrderDetail()
							}
						}
					})
				}
			} catch (e) {
				console.error('showPayError', e)
			}
		},
		closeFailAndRetry() {
			try {
				this.$refs.failPopup && this.$refs.failPopup.close()
			} catch (e) {}
		},
		goOrderDetail() {
			try {
				this.$refs.failPopup && this.$refs.failPopup.close()
			} catch (e) {}
			uni.redirectTo({ url: `/pages/travel/order/detail?id=${this.orderId}` })
		},
		parsePayPayload(data) {
			if (data && data.status && data.result) {
				return {
					status: data.status,
					result: data.result
				}
			}
			return {
				status: this.payType,
				result: data
			}
		},
		redirectSuccess() {
			const orderSn = this.order.order_sn || ''
			const payPrice = this.order.pay_price || 0
			uni.redirectTo({
				url: `/pages/travel/order/paySuccess?orderId=${this.orderId}&orderSn=${orderSn}&payPrice=${payPrice}`
			})
		},
		async handlePayResponse(rawData) {
			// 处理业务错误响应 {status: 400, message: "..."}
			if (rawData && rawData.status && rawData.status !== 200 && rawData.status !== 'success') {
				this.showPayError(rawData.message || '支付失败，请稍后重试')
				return
			}

			const payload = this.parsePayPayload(rawData)
			const status = payload.status
			const result = payload.result || {}

			if (status === 'success') {
				this.redirectSuccess()
				return
			}

			if (status === 'error') {
				this.showPayError(result.message || rawData.message || '支付失败，请稍后重试')
				return
			}

			if (['routine', 'weixin', 'weixinApp', 'h5', 'weixinQr'].indexOf(status) !== -1) {
				await this.payByWechat(status, result)
				return
			}

			if (['alipay', 'alipayQr', 'alipayApp'].indexOf(status) !== -1) {
				await this.payByAlipay(status, result)
				return
			}

			const maybeConfig = result.config || result
			if (maybeConfig && maybeConfig.timeStamp && maybeConfig.nonceStr) {
				await this.requestWechatPay(maybeConfig)
				return
			}
			this.showPayError('不支持的支付类型')
		},
		async payByWechat(status, result) {
			const config = result.config || result
			// #ifdef MP || APP-PLUS
			await this.requestWechatPay(config)
			return
			// #endif

			// #ifdef H5
			if (status === 'h5' && (config.h5_url || config.mweb_url)) {
				const payUrl = config.h5_url || config.mweb_url
				const redirect = encodeURIComponent(`${window.location.protocol}//${window.location.host}/pages/travel/order/detail?id=${this.orderId}`)
				const targetUrl = payUrl.indexOf('redirect_url=') === -1 ? `${payUrl}&redirect_url=${redirect}` : payUrl
				window.location.href = targetUrl
				return
			}
			if ((status === 'weixin' || status === 'weixinApp') && this.$wechat && typeof this.$wechat.pay === 'function') {
				config.timeStamp = config.timeStamp || config.timestamp
				try {
					await this.$wechat.pay(config)
					this.redirectSuccess()
				} catch (e) {
					this.showPayError('微信支付取消或失败')
				}
				return
			}
			this.showPayError('当前环境暂不支持微信支付')
			// #endif
		},
		async requestWechatPay(config) {
			return new Promise((resolve, reject) => {
				const payData = Object.assign({}, config)
				payData.timeStamp = String(payData.timeStamp || payData.timestamp || '')
				// #ifdef MP
				const mpPayName = typeof uni.requestOrderPayment === 'function' ? 'requestOrderPayment' : 'requestPayment'
				uni[mpPayName]({
					timeStamp: payData.timeStamp,
					nonceStr: payData.nonceStr,
					package: payData.package,
					signType: payData.signType || 'MD5',
					paySign: payData.paySign,
					success: () => {
						this.redirectSuccess()
						resolve()
					},
					fail: err => {
						if (err && err.errMsg && err.errMsg.indexOf('cancel') !== -1) {
							reject({ __cancel: true, message: '已取消支付' })
							return
						} else {
							this.showPayError('微信支付失败，请稍后重试')
						}
						reject(err)
					}
				})
				// #endif

				// #ifdef APP-PLUS
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: payData,
					success: () => {
						this.redirectSuccess()
						resolve()
					},
					fail: err => {
						if (err && err.errMsg && err.errMsg.indexOf('cancel') !== -1) {
							reject({ __cancel: true, message: '已取消支付' })
							return
						} else {
							this.showPayError('微信支付失败，请稍后重试')
						}
						reject(err)
					}
				})
				// #endif
			})
		},
		async payByAlipay(status, result) {
			const config = result.config || result

			// #ifdef APP-PLUS
			if (status === 'alipayApp') {
				await new Promise((resolve, reject) => {
					uni.requestPayment({
						provider: 'alipay',
						orderInfo: config,
						success: () => {
							this.redirectSuccess()
							resolve()
						},
						fail: err => {
							if (err && err.errMsg && err.errMsg.indexOf('cancel') !== -1) {
								reject({ __cancel: true, message: '已取消支付' })
								return
							} else {
								this.showPayError('支付宝支付失败')
							}
							reject(err)
						}
					})
				})
				return
			}
			// #endif

			if ((status === 'alipay' || status === 'alipayQr') && result.pay_key) {
				uni.navigateTo({
					url: `/pages/order_pay_back/index?keyCode=${result.pay_key}&url=${encodeURIComponent(config)}`
				})
				return
			}
			// #ifdef H5
			if (typeof config === 'string' && /^https?:\/\//.test(config)) {
				window.location.href = config
				return
			}
			// #endif

			this.showPayError('当前环境暂不支持支付宝支付')
		}
	}
}
</script>

<style lang="scss" scoped>
.travel-order-pay {
	padding: 20rpx;
	padding-bottom: 120rpx;

	.card,
	.notice-card {
		background: #fff;
		border-radius: 16rpx;
		padding: 24rpx;
		margin-bottom: 18rpx;
	}

	.name {
		display: block;
		font-size: 30rpx;
		font-weight: 600;
		color: #222;
	}

	.meta {
		display: block;
		font-size: 24rpx;
		color: #777;
		margin-top: 10rpx;
	}

	.amount-line {
		margin-top: 18rpx;
		display: flex;
		justify-content: space-between;
		font-size: 27rpx;
		color: #333;

		.amount {
			color: #e93323;
			font-size: 34rpx;
			font-weight: 700;
		}
	}

	.notice-card {
		background: #fff6e8;

		.notice-title {
			font-size: 28rpx;
			color: #c26b00;
			font-weight: 600;
		}

		.notice-sub {
			font-size: 24rpx;
			color: #a97939;
			margin-top: 10rpx;
		}

		.notice-btn {
			margin-top: 16rpx;
			display: inline-block;
			padding: 10rpx 22rpx;
			font-size: 24rpx;
			color: #fff;
			background: #ff9800;
			border-radius: 8rpx;
		}
	}

	.title {
		font-size: 28rpx;
		font-weight: 600;
		color: #222;
		margin-bottom: 14rpx;
	}

	.pay-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 18rpx 0;
		font-size: 27rpx;
		color: #555;
		border-bottom: 1rpx solid #f5f5f5;

		&:last-child {
			border-bottom: none;
		}

		&.active {
			color: #e93323;
			font-weight: 600;
		}

		.right {
			display: flex;
			align-items: center;
			gap: 12rpx;

			.sub {
				font-size: 22rpx;
				color: #999;
				font-weight: 400;
			}
		}
	}

	.bottom-bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		padding: 20rpx;
		display: flex;
		align-items: center;
		box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.05);

		.price {
			flex: 1;

			.label {
				color: #888;
				font-size: 24rpx;
			}

			.value {
				color: #e93323;
				font-size: 38rpx;
				font-weight: 700;
				margin-left: 8rpx;
			}
		}

		.pay-btn {
			height: 76rpx;
			line-height: 76rpx;
			padding: 0 46rpx;
			border-radius: 38rpx;
			background: #e93323;
			color: #fff;
			font-size: 28rpx;

			&.disabled {
				opacity: 0.6;
				pointer-events: none;
			}
		}
	}

	.fail-popup {
		width: 560rpx;
		background: #fff;
		border-radius: 20rpx;
		padding: 50rpx 40rpx;
		text-align: center;

		.fail-icon {
			width: 100rpx;
			height: 100rpx;
			line-height: 100rpx;
			margin: 0 auto 24rpx;
			border-radius: 50%;
			background: #ffe8e6;
			color: #e93323;
			font-size: 56rpx;
			font-weight: 700;
		}

		.fail-title {
			font-size: 32rpx;
			color: #222;
			font-weight: 600;
			margin-bottom: 16rpx;
		}

		.fail-msg {
			font-size: 26rpx;
			color: #888;
			line-height: 1.5;
			margin-bottom: 36rpx;
		}

		.fail-btns {
			display: flex;
			gap: 24rpx;

			.btn-retry {
				flex: 1;
				height: 72rpx;
				line-height: 72rpx;
				border-radius: 36rpx;
				background: #e93323;
				color: #fff;
				font-size: 28rpx;
			}

			.btn-order {
				flex: 1;
				height: 72rpx;
				line-height: 72rpx;
				border-radius: 36rpx;
				border: 2rpx solid #ddd;
				color: #666;
				font-size: 28rpx;
			}
		}
	}
}
</style>
