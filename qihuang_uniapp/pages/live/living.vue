<template>

	<view class="">
		<view class="top">
			<view class="input">
				<input @confirm="changeInput" v-model="pageQuery.title" placeholder="请输入你的直播训练营" />
				<text class="new-iconfont icon-sousuo"></text>
			</view>
		</view>
		<view class="content" :style="'height: calc(100vh - ' + topHeight + 'px - ' + footerHeight + 'px);overflow: auto'">

			<!-- 轮播图 -->
			<swiperCom :list="bannerList"></swiperCom>
			<view class="right" v-if="list.length">
				<view class="item" v-for="(item, index) in list" :key="index" @click="buy(item)">

					<image v-if="item.is_live" class="liveing" mode="widthFix" src="/static/images/health/title1.png">
					</image>
					<view class="mark" v-if="!item.is_paid">
						<view class="">
							<view class="new-iconfont icon-lock-full"></view>
							<view class="">
								待解锁
							</view>
						</view>
					</view>
					<image class="img" :src="item.room_image || '/static/images/empty-box.png'" mode="aspectFill">
					</image>

					<view class="title">
						{{item.title}}
					</view>

					<view class="phase"><rich-text :nodes="item.description"></rich-text></view>
					<view class="text">
						<view class="money">
							<!-- <text v-if="item.is_free">免费</text>
							<text v-else>￥{{item.price}}</text> -->
							观看人数<text class="new-iconfont icon-icon"></text>{{item.virtual_user + item.online_user}}
						</view>
						<view class="btn replay-btn" v-if="item.is_paid && item.playback_info && item.playback_info.has_playback" @click.stop="lookVideo(item)">
							看回放
						</view>
						<view class="btn" :class="item.is_paid ? 'paid' : ''">
							{{item.is_paid ? '进入直播间' : '解锁直播间'}}
						</view>
					</view>
				</view>
			</view>
			<emptyPage title="暂无数据" v-else />
		</view>
		<Buy title="专科训练" />
		<uni-popup ref="popupRef">
			<view class="popup-tips">
				<view class="new-iconfont icon-chacha" @click="closePopup"></view>
				<image class="img" src="/static/images/health/tips.png"></image>
				<view class="label">
					{{noPay ? popupTitle : '购买成功'}}
				</view>
				<view class="btn" @click="goPay">
					<text>{{noPay ? '立即解锁' : '确定'}}</text>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popupTipsRef">
			<view class="popup-tips">
				<view class="new-iconfont icon-chacha" @click="closePopup"></view>
				<image class="img" src="/static/images/health/tips.png"></image>
				<view class="label">
					本期直播间已预约满员！​​请期待下期直播！
				</view>
				<view class="btn" @click="closePopup">
					<text>确定</text>
				</view>
			</view>
		</uni-popup>
		<payment customizePayUrl @customizeApi="customizeApi" :payMode='payMode' @onChangeFun='onChangeFun'
			:pay_close="pay_close" :order_id="pay_order_id" :totalPrice='totalPrice'>
			<template #footer>
				<picker mode="selector" :range="couponList" @change="selectCoupon"
					:disabled="couponList.length ? false : true" range-key="text">
					<view class="set-coupon">
						选择优惠券
						<text class="text" v-if="payValue.coupon" style="color: red;">减{{payValue.coupon}}元<text
								v-if="couponList.length" class="new-iconfont icon-right"></text></text>
						<text class="text" v-else>
							{{couponList.length ? '当前可用'+couponList.length+'张' : '暂无可用优惠券'}}<text
								v-if="couponList.length" class="new-iconfont icon-right"></text></text>
					</view>
				</picker>
			</template>
		</payment>
		<customTab active="health" @height="(value) => footerHeight = value"></customTab>
	</view>

</template>

<script>
	import emptyPage from "@/components/emptyPage.vue"
	import customTab from '@/components/customTab';
	import payment from '@/components/payment';
	import Buy from '@/components/buy';

	import swiperCom from './components/swiperCom';
	import {
		getUserInfo,
		getCouponUserList
	} from '@/api/user.js';
	import {
		getLiveAppointmentList,
		createAppointmentOrder
	} from '@/api/health.js'
	import {
		getCarouselImage
	} from '@/api/liveBroadcast.js'
	export default {
		data() {
			return {
				pageQuery: {
					page: 1,
					limit: 10,
					title: '',
				},

				couponList: [],
				total: 0,
				topHeight: 0,
				footerHeight: 0,
				list: [],
				bannerList: [],
				payValue: {}, // 购买课程的内容
				totalPrice: '0',
				popupTitle: '',
				noPay: true,
				payMode: [{
						name: "微信支付",
						icon: "icon-weixinzhifu",
						value: 'wechat',
						title: '微信快捷支付',
						payStatus: 1
					},
					{
						name: "支付宝支付",
						icon: "icon-zhifubao",
						value: 'alipay',
						title: '支付宝支付',
						payStatus: this.$store.getters.globalData.alipay_open
					},
					{
						name: "余额支付",
						icon: "icon-yuezhifu",
						value: 'balance',
						title: '可用余额:',
						number: 0,
						payStatus: this.$store.getters.globalData.yue_pay_status
					}
				],
				pay_close: false,
				pay_order_id: '',
			}
		},
		components: {
			customTab,
			emptyPage,
			payment,
			Buy,
			swiperCom
		},
		onLoad() {
			this.getTabbarHeight()
			this.getList()
			this.getBanner()
		},
		onShow() {
			// this.closePopup()
			// this.noPay = true
			
			this.getUserInfo()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.pageQuery.page = 1
			this.getList()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		// 触底加载
		async onReachBottom() {
			if (this.list.length < this.total) {
				this.pageQuery.page += 1
				this.getList()
			}
		},
		methods: {
			async getBanner() {
				let {
					data
				} = await getCarouselImage({type: 1})
				this.bannerList = data
			},
			async getList() {
				let {
					data
				} = await getLiveAppointmentList(this.pageQuery)
				this.total = data.count
				// data.data.list.filter(v => {
				// 	v.price = (Number(v.price) + Number(v.cost_price || 0)).toFixed(2)
				// })
				if (this.pageQuery.page == 1) {
					this.list = data.list
				} else {
					this.list = [...this.list, ...data.list]
				}
			},
			changeInput() {
				this.pageQuery.page = 1
				this.getList()
			},
			lookVideo(item) {
				const info = item.playback_info || item
				if (!info.record_list || !info.record_list.length) { return uni.showToast({ title: '回放数据加载中，请稍后再试', icon: 'none' }); }
				uni.setStorageSync('playbackBanners', item.playback_banners || '');
				if (info.record_list.length === 1) {
					this.$goNextPage('/pages/healths/lookVideo?video=' + encodeURIComponent(info.record_list[0].RecordUrl))
				} else {
					const records = info.record_list.map((r, i) => ({
						index: i + 1,
						url: r.RecordUrl,
						start_time: r.StartTime,
						end_time: r.EndTime,
						duration: r.Duration
					}));
					uni.setStorageSync('playbackRecords', records);
					uni.navigateTo({ url: '/pages/healths/playbackList' });
				}
			},
			buy(item) {
				
				if (item.is_paid) {
					if (item.is_live) {
						this.$goNextPage('/pages/live_pusher/live_room/live_room?roomId=' + item.live_id)
					} else {
						return uni.showToast({
							title: '该主播暂未开播',
							icon: 'none'
						})
					}
				} else {
					// 最大参与人数 <= 当前参与人数
					if (item.max_participants <= item.current_participants) {
						this.$refs.popupTipsRef.open('center')
						return
					}
					this.payValue = item
					this.popupTitle = item.price + '元解锁' + item.title
					this.noPay = true
					this.$refs.popupRef.open('center')
				}
			},
			/**
			 * 获取用户信息
			 *
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
					that.payMode[2].number = res.data.now_money;
				});
			},
			/**
			 * 事件回调
			 *
			 */
			onChangeFun: function(e) {
				let opt = e;
				let action = opt.action || null;
				let value = opt.value != undefined ? opt.value : null;
				(action && this[action]) && this[action](value);
			},
			/**
			 * 关闭支付组件
			 *
			 */
			payClose: function() {
				this.pay_close = false;
			},
			/**
			 * 打开支付组件
			 *
			 */
			async goPay() {
					if (this.noPay) {
						let {
							data
						} = await getCouponUserList({
							status: '0',
							type: 14,
							exclusive_id: this.payValue.id
						})
						this.couponList = data.filter(v => {
							if (v.use_min_price <= this.payValue.price) {
								v.text = v.store_coupon_title + '：满' + v.use_min_price + '元减' + v
									.coupon_price + '元'
								return v
							}
						})
						this.$set(this, 'pay_close', true);
						this.order_id = this.payValue.id;
						this.pay_order_id = this.payValue.id.toString()
						this.$set(this, 'totalPrice', this.payValue.price);
					} else {
						this.closePopup()
						// this.$goNextPage('/pages/healths/purchased')
					}
			},
			selectCoupon(e) {
				let data = this.couponList[e.detail.value]
				this.payValue.coupon = data.coupon_price
				this.payValue.coupon_id = data.coupon_id
				this.payValue = {
					...this.payValue
				}
				this.$set(this, 'totalPrice', (Number(this.payValue.price) - Number(data.coupon_price)).toFixed(2));
			},
			async customizeApi(number, type) {
				let that = this
				let {
					data,
					message
				} = await createAppointmentOrder({
					appointment_id: this.payValue.id,
					coupon_id: this.payValue.coupon_id,
					pay_method: type
				})
				if (type == 'wechat') {
					let jsConfig = data.pay_config
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
							this.$emit('onChangeFun', {
								action: 'payClose'
							});
							this.pageQuery.page = 1
							that.noPay = false
							that.payClose()
							that.getUserInfo()
							that.getList()
							return that.$util.Tips({
								title: '支付成功',
								icon: 'success'
							});
						},
						fail: (e) => {
							return that.$util.Tips({
								title: '取消支付'
							});
						},
						complete: () => {
							uni.hideLoading();
						},
					});
					// #endif
				} else {

					this.pageQuery.page = 1
					this.noPay = false
					uni.hideLoading();
					this.payClose()
					this.getUserInfo()
					this.getList()
				}




			},

			closePopup() {
				this.$refs.popupRef.close()
				this.$refs.popupTipsRef.close()
			},
			getTabbarHeight() {
				let that = this
				this.$nextTick(() => {
					const query = uni.createSelectorQuery().in(this);
					query
						.select(".top")
						.boundingClientRect((data) => {
							that.topHeight = data?.height || 50
							// this.$emit('height', that.height)
						})
						.exec();

				})

			},
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		background-color: #fff;
		padding: 10rpx 30rpx 24rpx;


		.input {
			height: 56rpx;
			width: 100%;
			padding: 0 28rpx;
			border-radius: 40rpx;
			color: #666;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 24rpx 0 10rpx;
			background-color: #f5f5f5;

			input {
				font-size: 28rpx;
			}

			.new-iconfont {
				background-image: linear-gradient(137.83deg, rgba(255, 230, 140, 1), rgba(220, 170, 90, 1) 100%);
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;
			}
		}

		.tags {
			display: flex;
			flex-wrap: wrap;

			.item {
				font-size: 20rpx;
				background-color: #F9F9F9;
				color: #AEAEAE;
				padding: 4rpx 16rpx;
				border-radius: 20rpx;
				margin-right: 26rpx;
				margin-top: 16rpx;
			}
		}
	}

	.content {
		// display: flex;
		background-color: #f5f5f5;
		width: calc(100%);


		.right {
			width: calc(100%);
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 20rpx;
			overflow-y: auto;

			.item {
				width: calc(50% - 8rpx);
				background-color: #fff;
				border-radius: 6rpx;
				overflow: hidden;
				margin-bottom: 14rpx;
				box-shadow: 0 1rpx 10rpx #66666666;
				position: relative;

				.liveing {
					position: absolute;
					left: 20rpx;
					top: 20rpx;
					width: 160rpx;
					z-index: 1;
				}

				.mark {
					background-color: rgba(0, 0, 0, 0.6);
					height: 454rpx;
					position: absolute;
					z-index: 1;
					left: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					text-align: center;
					right: 0;
					font-size: 24rpx;
					color: #fff;

					.new-iconfont {
						font-size: 50rpx;
						margin-bottom: 20rpx;
					}
				}

				.img {
					width: 100%;
					height: 454rpx;
					background-color: #f0f0f0;
				}

				.title {
					font-size: 24rpx;
					color: #333;
					padding: 10rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}

				.phase {
					font-size: 24rpx;
					padding: 0 10rpx 10rpx;
					color: #333;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					height: 38rpx;
				}

				.text {
					padding: 0 10rpx 10rpx;
					align-items: center;
					display: flex;
					justify-content: space-between;
					font-size: 20rpx;

					.eye {
						font-size: 22rpx;
					}

					.money {
						font-size: 16rpx;
						display: flex;
						align-items: center;
						// color: var(--view-theme) !important;
						color: #666;

						.new-iconfont {
							font-size: 16rpx;
							margin: 0 10rpx;
							color: #999;
						}
					}

					.btn {
						width: 144rpx;
						height: 38rpx;
						line-height: 38rpx;
						text-align: center;
						color: #fff;
						border-radius: 20rpx;
						// background: linear-gradient(180.00deg, rgba(38, 67, 127, 1), rgba(7, 16, 47, 1) 100%);
						background: linear-gradient(137.83deg, rgba(255, 230, 140, 1), rgba(220, 170, 90, 1) 100%);

													&.replay-btn {
								background: linear-gradient(180deg, rgba(38, 67, 127, 1), rgba(7, 16, 47, 1) 100%) !important;
								margin-right: 10rpx;
							}

							// &.paid {
						// 	background: linear-gradient(137.83deg, rgba(255, 230, 140, 1), rgba(220, 170, 90, 1) 100%);
						// }
					}
				}
			}
		}
	}


	.popup-tips {
		position: relative;

		.icon-chacha {
			position: absolute;
			right: -10rpx;
			top: 0;
			color: #fff;
			font-size: 40rpx;
			z-index: 2;
			border: 1px solid #fff;
			border-radius: 40rpx;
			padding: 10rpx;
		}

		.img {
			width: 562rpx;
			height: 546rpx;
		}

		.label {
			position: absolute;
			width: 400rpx;
			text-align: center;
			line-height: 70rpx;
			color: #fff;
			left: 0;
			right: 0;
			margin: auto;
			top: 258rpx;
			font-size: 36rpx;
		}

		.btn {
			background-color: #fff;
			width: 342rpx;
			height: 88rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			left: 0;
			font-size: 32rpx;
			font-weight: 700;
			right: 0;
			border-radius: 88rpx;
			bottom: 42rpx;
			margin: auto;

			text {
				background-image: linear-gradient(137.83deg, rgba(255, 230, 140, 1), rgba(220, 170, 90, 1) 100%);
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;
			}
		}
	}

	.set-coupon {
		width: 100%;
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.text {
			align-items: center;
			display: flex;
			justify-content: space-between;

			.new-iconfont {
				margin-left: 10rpx;
			}
		}
	}
</style>