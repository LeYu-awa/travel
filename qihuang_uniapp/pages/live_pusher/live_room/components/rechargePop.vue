<template>
	<uni-popup ref="costShow" type="bottom" @change="close">
		<view class="popUp">
			<view class="popUp-title">
				<text class="money">{{ userinfo.now_money || 0 }}</text>
				<image @click="clickClose" src="/static/images/liveRoom/close.jpg"></image>
			</view>
			<view class="popUp-content">
				<scroll-view scroll-y="true" class="scroll-Y" :show-scrollbar="false">
					<view :style="viewColor">
						<form @submit="submitSub" report-submit='true'>
							<view class="payment">
								<view class="nav">
									<view class="item" :class="active==index?'on':''"
										v-for="(item,index) in navRecharge" :key="index" @click="navRecharges(index)">
										{{item}}
									</view>
								</view>
								<view class='tip picList'>
									<view class="pic-box pic-box-color acea-row row-center-wrapper row-column"
										:class="activePic == index ? 'pic-box-color-active' : ''"
										v-for="(item, index) in picList" :key="index" @click="picCharge(index, item)">
										<view class="pic-number-pic">
											{{ item.data.price }}<span class="pic-number"> 元</span>
										</view>
										<view class="pic-number">赠送：{{ item.data.give }} 元</view>
									</view>
									<view class="pic-box pic-box-color acea-row row-center-wrapper"
										:class="rechar_id == 0 ? 'pic-box-color-active' : ''"
										@click="picCharge(picList.length)">
										<input type="number" :placeholder="otherValue" v-model="money"
											class="pic-box-money pic-number-pic"
											:class="rechar_id == 0 ? 'pic-box-color-active' : ''" />
									</view>
									<view class="tips-box">
										<view class="tips mt-30">注意事项：</view>
										<view class="tips-samll" v-for="item in rechargeAttention" :key="item">
											{{ item }}
										</view>
									</view>
								</view>
								<button class='but' formType="submit"> 立即充值</button>
							</view>
						</form>
						<payment :payMode="payMode" :order_id="rechar_id" :pay_close="pay_close" :is-call="true"
							@onChangeFun="onChangeFun" :totalPrice="totalPrice"></payment>
					</view>
				</scroll-view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	import {
		spreadInfo,
		rechargeRoutine,
		rechargeWechat,
		getRechargeApi,
		rechargeBrokerage
	} from '@/api/user.js';
	import {
		mapGetters
	} from "vuex";
	import payment from '@/components/payment';
	import {
		openPaySubscribe
	} from '@/utils/SubscribeMessage.js';
	export default {
		name: 'rechargePop',
		components: {
			payment
		},
		data() {
			let that = this;
			return {
				otherValue: '其他',
				now_money: 0,
				navRecharge: ['账户充值'],
				active: 0,
				number: '',
				from: '',
				userinfo: {},
				placeholder: "0.00",
				picList: [],
				activePic: 0,
				money: "",
				numberPic: '',
				rechar_id: '0',
				rechargeAttention: [],
				statusBarHeight: statusBarHeight,
				pay_close: false,
				totalPrice: '0',
				payMode: [{
						name: '微信支付',
						icon: 'icon-weixinzhifu',
						// #ifdef H5
						value: this.$wechat.isWeixin() ? 'weixin' : 'h5',
						// #endif
						// #ifdef MP
						value: 'routine',
						// #endif
						// #ifdef APP-PLUS
						value: 'weixin',
						// #endif
						title: '微信快捷支付',
						payStatus: true
					}
					// #ifdef H5 ||APP-PLUS
					,
					{
						name: '支付宝支付',
						icon: 'icon-zhifubao',
						// #ifdef H5 || APP-PLUS
						value: 'alipay',
						// #endif
						// #ifdef MP
						value: 'alipayQr',
						// #endif
						title: '支付宝支付',
						payStatus: true
					}
					// #endif
				],
			};
		},
		computed: mapGetters(['viewColor', 'isLogin']),
		created() {
			if (this.isLogin) {
				this.getUserInfo();
				this.getRecharge();
			} else {
				toLogin()
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
				this.$emit('close', false)
			},
			goBack: function() {
				uni.navigateBack();
			},
			/**
			 * 选择金额
			 */
			picCharge(idx, item) {
				this.activePic = idx;
				if (item === undefined) {
					this.rechar_id = '0';
					this.numberPic = "";
					this.otherValue = ''
				} else {
					this.otherValue = '其他'
					this.money = "";
					this.rechar_id = item.id.toString();
					this.numberPic = item.data.price;
				}
			},
			/**
			 * 充值额度选择
			 */
			getRecharge() {
				getRechargeApi()
					.then(res => {
						this.picList = res.data.recharge_quota;
						if (this.picList[0]) {
							this.rechar_id = this.picList[0].id.toString();
							this.numberPic = this.picList[0].data.price;
						}
						this.rechargeAttention = res.data.recharge_attention || [];
					})
					.catch(res => {
						this.$dialog.toast({
							mes: res
						});
					});
			},
			navRecharges: function(index) {
				this.active = index;
			},
			/**
			 * 获取用户信息
			 */
			getUserInfo: function() {
				let that = this;
				spreadInfo().then(res => {
					that.$set(that, 'userinfo', res.data);
				})
			},
			payClose: function() {
				this.pay_close = false;
			},
			payCheck: function(type) {
				this.createOrder(type);
			},
			/*
			 * 用户充值
			 */
			submitSub: function(e) {
				let that = this
				if (this.rechar_id == 0) {
					if (parseFloat(that.money) === 0) {
						return that.$util.Tips({
							title: '充值金额金额不能为0！'
						});
					}
					if (!that.money) {
						return that.$util.Tips({
							title: '请填写充值金额！'
						});
					}
					if (!Number(that.money)) {
						return that.$util.Tips({
							title: '请填写正确的金额！'
						});
					}
				}
				this.pay_close = true

			},
			createOrder(type) {
				let that = this;
				let query = {
					price: that.rechar_id == 0 ? that.money : that.numberPic,
					recharge_id: that.rechar_id,
					type: type,
					// #ifdef H5
					return_url: location.port ? location.protocol + '//' + location.hostname + ':' + location.port +
						'/pages/users/user_payment/index' : location.protocol + '//' + location.hostname +
						'/pages/users/user_payment/index'
					// #endif
				};
				// #ifdef MP
				// openPaySubscribe().then(() => {
				rechargeWechat(query).then(res => {
					that.callPay(res);
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					});
				});
				// });
				// #endif
				// #ifndef MP
				rechargeWechat(query).then(res => {
					that.callPay(res);
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					});
				});
				// #endif
			},
			// 调用支付
			callPay(res) {
				let that = this,
					status = res.data.type,
					orderId = res.data.recharge_id,
					callback_key = res.data.pay_key,
					jsConfig = res.data.config,
					goPages = '/pages/users/user_payment/index';
				switch (status) {
					case 'ORDER_EXIST':
					case 'EXTEND_ORDER':
					case 'PAY_ERROR':
					case 'error':
						uni.hideLoading();
						return that.$util.Tips({
							title: res.message
						}, {
							tab: 5,
							url: goPages
						});
						break;
					case 'success':
						uni.hideLoading();
						if (that.seckillId)
							return that.$util.Tips({
								title: res.message,
								icon: 'success'
							}, {
								tab: 4,
								url: goPages
							});
						return that.$util.Tips({
							title: res.message,
							icon: 'success'
						}, {
							tab: 5,
							url: goPages
						});
						break;
					case 'alipay':
					case "alipayQr":
						uni.hideLoading();
						that.$emit('onChangeFun', {
							action: 'payClose'
						});
						uni.navigateTo({
							url: '/pages/order_pay_back/index?keyCode=' + callback_key + '&url=' + jsConfig +
								'&type=10'
						})
						return;
						break;
						// #ifndef MP
					case "wechat":
					case "weixin":
					case "weixinApp":
						jsConfig.timeStamp = jsConfig.timestamp;
						// #ifndef APP-PLUS
						that.$wechat.pay(jsConfig).then(res => {
							return that.$util.Tips({
								title: res.message,
								icon: 'success'
							});
						}).catch(res => {
							if (res.errMsg == 'chooseWXPay:cancel') return that.$util.Tips({
								title: '取消支付'
							});
						})
						// #endif
						// #ifdef APP-PLUS
						let mp_pay_name = ''
						if (uni.requestOrderPayment) {
							mp_pay_name = 'requestOrderPayment'
						} else {
							mp_pay_name = 'requestPayment'
						}
						uni[mp_pay_name]({
							provider: 'wxpay',
							orderInfo: jsConfig,
							success: (e) => {
								that.getUserInfo();
								return that.$util.Tips({
									title: '支付成功',
								});
							},
							fail: (e) => {
								uni.showModal({
									content: "支付失败",
									showCancel: false
								})
							},
							complete: () => {
								uni.hideLoading();
							},
						});
						// #endif
						break;
						// #endif
						// #ifdef MP
					case "routine":
						jsConfig.timeStamp = jsConfig.timestamp;
						let mp_pay_name = ''
						if (uni.requestOrderPayment) {
							mp_pay_name = 'requestOrderPayment'
						} else {
							mp_pay_name = 'requestPayment'
						}
						uni[mp_pay_name]({
							...jsConfig,
							success: function(res) {
								uni.hideLoading();
								that.getUserInfo();
								that.getRecharge();
								return that.$util.Tips({
									title: '支付成功',
								});
							},
							fail: function(e) {
								uni.hideLoading();
								return that.$util.Tips({
									title: '取消支付',
								});
							},
						})
						break;
						// #endif
					case "balance":
						uni.hideLoading();
						//余额不足
						return that.$util.Tips({
							title: res.message
						});
						break;
						// #ifdef H5
					case 'h5':
						let host = window.location.protocol + "//" + window.location.host;
						let url = `${host}/pages/users/user_payment/index`
						let eUrl = encodeURIComponent(url)
						let jsurl = jsConfig.mweb_url || jsConfig.h5_url
						let locations = `${jsurl}&redirect_url=${eUrl}`
						setTimeout(() => {
							location.href = locations;
						}, 100);
						break;
						// #endif
						// #ifdef APP-PLUS
					case 'alipayApp':
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: jsConfig,
							success: (e) => {
								that.getUserInfo();
								return that.$util.Tips({
									title: '支付成功',
								});
							},
							fail: (e) => {
								uni.showModal({
									content: "支付失败",
									showCancel: false
								})
							},
							complete: () => {
								uni.hideLoading();
							},
						});
						break;
						// #endif
				}
			},
			onChangeFun: function(e) {
				let opt = e;
				let action = opt.action || null;
				let value = opt.value != undefined ? opt.value : null;
				action && this[action] && this[action](value);
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
		background-color: #fff;
	}

	.popUp {
		width: 100%;
		// height: 700rpx;
		background-color: #fff;
		/* 半透明白色背景 */
		backdrop-filter: blur(10px);
		/* 添加背景模糊效果 */
		-webkit-backdrop-filter: blur(10px);
		/* 兼容WebKit内核的浏览器，如Safari */
		// padding: 16rpx 32rpx 54rpx 32rpx;
		padding: 50rpx 20rpx 54rpx 20rpx;
		box-sizing: border-box;
		border-radius: 12rpx 12rpx 0 0;
	}

	.popUp-title {
		height: 40rpx;
		line-height: 40rpx;
		position: relative;

		.money {
			color: #333;
			font-size: 38rpx;
			font-weight: bold;
			display: flex;
			align-items: baseline;
		}

		.money:before {
			font-size: 26rpx;
			content: '当前金币：';
			color: #333;
			font-weight: normal;
		}

		image {
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			right: 18rpx;
			top: 0;
		}

		text {
			font-size: 22rpx;
			margin-left: 10rpx;
			color: rgba(255, 255, 255, 0.5);
		}
	}

	.popUp-content {
		max-height: 650rpx;

		.scroll-Y {
			height: 100%;

			::-webkit-scrollbar {
				display: none;
			}

			/* 对于Firefox */
			scrollbar-width: none;
			/* Firefox 64+ */
		}
	}

	.payment {
		width: 100%;
		padding-bottom: 50rpx;
		background-color: #fff;
		border-radius: 10rpx;
		padding-top: 25rpx;
		border-top-right-radius: 40rpx;
		border-top-left-radius: 40rpx;
	}

	.payment .nav {
		height: 75rpx;
		line-height: 75rpx;
	}

	.payment .nav .item {
		font-size: 30rpx;
		color: #333;
	}

	.payment .nav .item.on {
		font-weight: bold;
		border-bottom: 4rpx solid var(--view-theme);
	}

	.t-color {
		color: var(--view-theme);
	}

	.payment .input {
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1px dashed #dddddd;
		margin: 60rpx auto 0 auto;
		padding-bottom: 20rpx;
		font-size: 56rpx;
		color: #333333;
		flex-wrap: nowrap;
	}

	.payment .input text {
		padding-left: 106rpx;
	}

	.payment .input input {
		padding-right: 106rpx;
		width: 300rpx;
		height: 94rpx;
		text-align: center;
		font-size: 70rpx;
	}

	.payment .placeholder {
		color: #d0d0d0;
		height: 100%;
		line-height: 94rpx;
	}

	.payment .tip {
		font-size: 26rpx;
		color: #888888;
		padding: 0 30rpx;
		margin-top: 25rpx;
	}

	.payment .but {
		color: #fff;
		font-size: 30rpx;
		width: 700rpx;
		height: 86rpx;
		border-radius: 50rpx;
		margin: 46rpx auto 0 auto;
		line-height: 86rpx;
		background-color: var(--view-theme);
	}

	.container {
		position: relative;
		background-color: var(--view-theme);
		border-radius: 0 0 40rpx 40rpx;

		.fixed-head {
			position: absolute;
			left: 0;
			top: 20px;
			width: 100%;
			z-index: 10;

			.icon-xiangzuo {
				margin-right: 40rpx;
				margin-left: 20rpx;
				font-size: 40rpx;
				color: #fff;
			}
		}
	}


	.picList {
		display: flex;
		flex-wrap: wrap;
		margin: 30rpx 0;

		.pic-box {
			width: 32%;
			height: auto;
			border-radius: 20rpx;
			margin-top: 21rpx;
			padding: 20rpx 0;
			margin-right: 12rpx;

			&:nth-child(3n) {
				margin-right: 0;
			}
		}

		.pic-box-color {
			background-color: #f4f4f4;
			color: #656565;
		}

		.pic-number {
			font-size: 22rpx;
		}

		.pic-number-pic {
			font-size: 38rpx;
			margin-right: 10rpx;
			text-align: center;
		}

		.pic-box-color-active {
			background-color: var(--view-theme);
			color: #fff;
		}
	}

	.tips-box {
		.tips {
			font-size: 28rpx;
			color: #333333;
			font-weight: 800;
			margin-bottom: 14rpx;
			margin-top: 20rpx;
		}

		.tips-samll {
			font-size: 24rpx;
			color: #333333;
			margin-bottom: 14rpx;
		}
	}

	.tips-title {
		margin-top: 20rpx;
		font-size: 24rpx;
		color: #333;
	}
</style>