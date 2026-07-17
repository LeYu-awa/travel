<template>
	<!-- 支付弹窗 -->
	<uni-popup ref="costShow" type="center">
		<view class="costContent">
			<view class="cost-title">支付</view>
			<view class="cost-text">创作不易，您需支付{{watch_cost}}元，观看视频内容 </view>
			<view class="cost-prc">{{watch_cost}}元</view>
			<view class="cost-play">
				<radio-group @change="radioChange">
					<label class="uni-list-cell">
						<view>
							<image src="/static/images/wx.png" mode="widthFix"></image>微信支付
						</view>
						<view>
							<radio value="wechat" :checked="payType==='wechat'" />
						</view>
					</label>
					<label class="uni-list-cell">
						<view>
							<image src="/static/images/yue.png" mode="widthFix"></image>余额支付
						</view>
						<view>
							<radio value="balance" :checked="payType==='balance'" />
						</view>
					</label>
				</radio-group>
			</view>
			<view class="cost-btn" @click="goPay">去付款</view>
		</view>
	</uni-popup>
</template>

<script>
	import {
		createVideoOrder,
		getPayStatus
	} from '@/api/community.js';
	import {
		getUserInfo
	} from '@/api/user.js';
	export default {
		props: {
			// 视频id
			video_id: {
				type: [String, Number],
				default: '0'
			},
			// 支付金额
			watch_cost: {
				type: [String, Number],
				default: '0'
			},
			//用户账户金额
			user_now_money: {
				type: [String, Number],
				default: '0'
			}
		},
		data() {
			return {
				payType: 'wechat', //支付方式
			}
		},
		methods: {
			open() {
				this.$refs.costShow.open()
			},
			clickClose() {
				this.$refs.costShow.close()
				this.$emit('close', false)
			},
			close() {
				this.$refs.costShow.close()
				this.$emit('close', false)
			},
			radioChange: function(evt) {
				this.payType = evt.detail.value
			},
			goPay() {
				let that = this;
				if (this.payType == 'balance' && parseFloat(this.user_now_money) < parseFloat(this.watch_cost)) {
					uni.showToast({
						title: '余额不足!',
						icon: 'error',
						duration: 2000
					});
					return false;
				}
				uni.showLoading({
					title: '支付中'
				});
				createVideoOrder({
					pay_type: this.payType,
					video_id: this.video_id
				}).then(res => {
					if (res.status == 200) {
						uni.hideLoading();
						switch (this.payType) {
							case 'balance':
								this.$refs.costShow.close()
								uni.showModal({
									content: "支付成功",
									showCancel: false,
									success: res => {
										this.$emit('paySuccess', this.video_id)
									}
								})
								break;
							case 'wechat':
								// #ifdef APP-PLUS
								uni.requestPayment({
									provider: 'wxpay',
									orderInfo: res.data,
									success: (e) => {
										this.$refs.costShow.close()
										uni.showModal({
											content: "支付成功",
											showCancel: false,
											success: res => {
												this.$emit('paySuccess', this.video_id)
											}
										})
									},
									fail: (err) => {
										if (err.errMsg.indexOf('取消') > -1 || err.errMsg.indexOf(
												'cancel') > 1 || err.errMsg.indexOf('-2') > -1) {
											this.$emit('close')
											uni.showToast({
												title: '支付取消',
												icon: 'none',
												duration: 2000
											});
										} else {
											this.$emit('close')
											uni.showModal({
												content: "支付遇到错误，请稍候重试",
												showCancel: false,
											})
										}
									},
									complete: () => {
										uni.hideLoading();
									},
								});
								// #endif
								break;
						}
					}
				}).catch(err => {
					uni.hideLoading();
					return uni.showToast({
						title: err,
						icon: 'error',
						duration: 2000
					});
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.costContent {
		width: 100%;
		// height: 300rpx;
		background-color: #fff;
		padding: 30rpx 20rpx;
		box-sizing: border-box;
		border-radius: 15rpx;

		.cost-title {
			font-size: 30rpx;
			font-weight: 500;
			text-align: center;
		}

		.cost-text {
			font-size: 22rpx;
			font-weight: 300;
			text-align: center;
			color: rgb(121, 121, 121);
			margin-top: 25rpx;
		}

		.cost-prc {
			font-size: 50rpx;
			font-weight: bold;
			text-align: center;
			color: red;
			margin-top: 15rpx;
			margin-bottom: 38rpx;
		}

		.uni-list-cell {
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;

			view {
				display: flex;
				align-items: center;
				font-size: 26rpx;
			}

			image {
				width: 38rpx;
				height: 38rpx;
				margin-right: 10rpx;
			}
		}

		.cost-btn {
			width: 100%;
			height: 60rpx;
			background: rgb(249, 98, 105);
			color: #ffffff;
			font-size: 32rpx;
			border-radius: 15rpx;
			line-height: 60rpx;
			text-align: center;
			margin-top: 50rpx;
		}
	}
</style>