<template>
	<view class="">
		<view class="top">
			<view class="input">
				<input @confirm="changeInput" v-model="pageQuery.title" placeholder="请描述您的症状和诊断病症" />
				<text class="new-iconfont icon-sousuo"></text>
			</view>
			<view class="tags">
				<view class="item" :class="{select: item.id == pageQuery.symptom_id}" v-for="item in symptomsList"
					:key="item.id" @click="selectSymptoms(item)">
					{{item.name}}
				</view>
			</view>
		</view>
		<view class="content">
			<view class="left">
				<view class="title">
					症状部位
				</view>
				<view class="scroll" :style="'height: calc(100vh - 72rpx - ' + topHeight + 'px - ' + footerHeight + 'px)'">
					<view class="item" v-for="(item, index) in categoryList" :key="item.id"
						@click="selectBodyPart(item, index)" :class="{
						select: pageQuery.body_part_id == item.id,
						'border-r-b': bodyPartIndex-1 == index,
						'border-r-t': bodyPartIndex+1 == index,
					}">
						{{item.name}}
					</view>

				</view>

			</view>
			<scroll-view :scroll-y="true" style="width: calc(100% - 138rpx)" @scrolltolower="scrolltolower"
				:style="'height: calc(100vh - ' + topHeight + 'px - ' + footerHeight + 'px - 2px);' + (list.length ? '' : 'display: block')">
				<view v-if="list.length" class="right">
					<view class="item" v-for="item in list" :key="item.id" @click="buy(item)">

						<view class="mark" v-if="!item.is_unlocked">
							<view class="">
								<view class="new-iconfont icon-lock-full"></view>
								<view class="">
									待解锁
								</view>
							</view>
						</view>
						<image class="img" :src="item.thumbnail_url" mode="aspectFill"></image>
						<view class="title">
							{{item.title}}
						</view>
						<view class="text">
							<view class="money">
								{{item.is_free == 1? '免费' : '￥' + item.price}}
							</view>
							<view class="eye">
								播放次数{{item.play_count}}
							</view>
							<view class="btn" :class="item.is_unlocked ? 'disabled' : ''">
								购买
							</view>
						</view>
					</view>
				</view>

				<emptyPage title="暂无数据" v-else />
			</scroll-view>

		</view>
		<Buy />
		<uni-popup ref="popupRef">
			<view class="popup-tips">
				<view class="new-iconfont icon-chacha" @click="closePopup"></view>
				<image class="img" src="/static/images/health/tips.png"></image>
				<view class="label">
					{{noPay ? popupTitle : '购买成功请到已买课程查看视频'}}
				</view>
				<view class="btn" @click="goPay">
					<text>{{noPay ? '立即解锁' : '立即观看'}}</text>
				</view>
			</view>
		</uni-popup>
		<payment customizePayUrl @customizeApi="customizeApi" :payMode='payMode' @onChangeFun='onChangeFun'
			:pay_close="pay_close" :order_id="pay_order_id" :totalPrice='totalPrice'>

			<template #footer>
				<picker mode="selector" :range="couponList" @change="selectCoupon" :disabled="couponList.length ? false : true" range-key="text">
					<view class="set-coupon">
						选择优惠券
						<text class="text" v-if="payValue.coupon" style="color: red;">减{{payValue.coupon}}元<text v-if="couponList.length"
								class="new-iconfont icon-right"></text></text>
						<text class="text" v-else>
							{{couponList.length ? '当前可用'+couponList.length+'张' : '暂无可用优惠券'}}<text v-if="couponList.length"
								class="new-iconfont icon-right"></text></text>
					</view>
				</picker>
			</template>
		</payment>
		<customTab active="video" @height="(value) => footerHeight = value"></customTab>
	</view>
</template>

<script>
	import emptyPage from "@/components/emptyPage.vue"
	import customTab from '@/components/customTab';
	import payment from '@/components/payment';
	import Buy from '@/components/buy';
	import {
		getUserInfo, getCouponUserList
	} from '@/api/user.js';
	import {
		getBodyParts,
		getSymptoms,
		getVideoCourses,
		createHealthVideoOrder
	} from "@/api/health.js";
	import cache from "../../config/cache";
	export default {
		data() {
			return {
				pageQuery: {
					page: 1,
					limit: 10,
					title: '',
					body_part_id: '',
				},

				couponList: [],
				bodyPartIndex: '',
				total: 0,
				topHeight: 0,
				footerHeight: 0,
				categoryList: [], // 分类list
				list: [],
				symptomsList: [], // 病症list
				payValue: {}, // 购买课程的内容
				totalPrice: '0',
				popupTitle: '',
				noPay: true,
				payMode: [{
						name: "微信支付",
						icon: "icon-weixinzhifu",
						value: 'weixin',
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
			emptyPage,
			payment,
			customTab,
			Buy
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.pageQuery.page = 1
			this.getList()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad() {
			this.getList()
			this.getCategoryList()
			this.getSymptomsList()
		},
		onShow() {
			this.getUserInfo()
			this.closePopup()
			this.noPay = true
		},
		methods: {
			async getCategoryList() {
				let data = await getBodyParts({
					limit: 1000
				})
				this.categoryList = data.data.list
			},
			async getSymptomsList(category) {
				let data = await getSymptoms({
					category
				})
				this.symptomsList = data.data.list
				this.getTabbarHeight()
			},
			async getList() {
				let data = await getVideoCourses(this.pageQuery)
				this.total = data.data.count
				// data.data.list.filter(v => {
				// 	v.price = (Number(v.price) + Number(v.cost_price || 0)).toFixed(2)
				// })
				if (this.pageQuery.page == 1) {
					this.list = data.data.list
				} else {
					this.list = [...this.list, ...data.data.list]
				}
			},
			changeInput() {
				this.pageQuery.page = 1
				this.getList()
			},
			// 触底加载
			scrolltolower(e) {
				if (e.detail.direction == 'bottom') {
					if (this.list.length < this.total) {
						this.pageQuery.page += 1
						this.getList()
					}
				}
			},
			selectSymptoms(item) {
				if (item.id == this.pageQuery.symptom_id) {
					this.pageQuery.symptom_id = ''
				} else {
					this.pageQuery.symptom_id = item.id
				}
				this.pageQuery.page = 1
				this.getList()
			},
			// 选择身体部位
			selectBodyPart(item, index) {
				if (this.bodyPartIndex !== '' && this.bodyPartIndex == index) {
					this.bodyPartIndex = ''
					this.pageQuery.body_part_id = ''
				} else {
					this.bodyPartIndex = index
					this.pageQuery.body_part_id = item.id
				}
				this.pageQuery.symptom_id = ''
				this.pageQuery.page = 1
				this.getList()
				this.getSymptomsList(item.id)
			},
			buy(item) {
				if (item.is_unlocked) {
					this.$goNextPage('./lookVideo?video=' + item.video_url + '&id=' + item.id)
				} else {
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
					let {data} = await getCouponUserList({
						status: '0',
						type: 13,
						
						exclusive_id: this.payValue.id
					})
					this.couponList = data.filter(v=>{
						if(v.use_min_price <= this.payValue.price){
							v.text = v.store_coupon_title + '：满' + v.use_min_price + '元减' + v.coupon_price + '元'
							return v
						}
					})
					this.$set(this, 'pay_close', true);
					this.order_id = this.payValue.id;
					this.pay_order_id = this.payValue.id.toString()
					this.$set(this, 'totalPrice', this.payValue.price);
				} else {
					this.$goNextPage('/pages/healths/purchased')
				}
			},
			selectCoupon(e){
				let data = this.couponList[e.detail.value]
				this.payValue.coupon = data.coupon_price
				this.payValue.coupon_id = data.coupon_id
				this.payValue = {...this.payValue}
				this.$set(this, 'totalPrice', (Number(this.payValue.price) - Number(data.coupon_price)).toFixed(2));
			},
			async customizeApi(number, type) {
				let that = this
				let {
					data,
					message
				} = await createHealthVideoOrder({
					video_course_id: this.payValue.id,
					coupon_id: this.payValue.coupon_id,
					pay_type: type
				})
				if (type == 'weixin') {
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

							that.noPay = false
							that.payClose()
							that.getUserInfo()
							this.pageQuery.page = 1
							this.getList()
							return that.$util.Tips({
								title: '支付成功',
								icon: 'success'
							});
						},
						fail: (e) => {
							if (that.isCall) {
								return that.$util.Tips({
									title: '取消支付'
								});
							} else {
								return that.$util.Tips({
									title: '取消支付'
								});
							}
						},
						complete: () => {
							uni.hideLoading();
						},
					});
					// #endif
				} else {
					this.noPay = false
					uni.hideLoading();
					this.payClose()
					this.getUserInfo()
					this.pageQuery.page = 1
					this.getList()
				}
			},

			closePopup() {
				this.$refs.popupRef.close()
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
				width: 100%;
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

				&.select {
					background: linear-gradient(180.00deg, rgba(38, 67, 127, 1), rgba(7, 16, 47, 1) 100%);
					color: #fff;
				}
			}
		}
	}

	.content {
		display: flex;
		background-color: #f5f5f5;

		.left {
			width: 138rpx;

			.title {
				border-radius: 0px 14rpx 0px 0px;
				height: 72rpx;
				color: #fff;
				line-height: 72rpx;
				text-align: center;
				background: linear-gradient(180.00deg, rgba(38, 67, 127, 1), rgba(7, 16, 47, 1) 100%);
			}

			.scroll {
				height: 50vh;
				overflow-y: auto;
			}

			.item {
				height: 72rpx;
				line-height: 72rpx;
				text-align: center;
				background-color: #fff;

				&.select {
					position: relative;
					background-color: #f5f5f5;

					&:before {
						background: linear-gradient(180.00deg, rgba(38, 67, 127, 1), rgba(7, 16, 47, 1) 100%);
						height: 72rpx;
						border-radius: 5rpx;
						width: 4rpx;
						content: '';
						position: absolute;
						left: 0;
						top: 0;
					}
				}

				&.border-r-b {
					border-radius: 0 0 12rpx 0;
				}

				&.botder-r-t {
					border-radius: 0 12rpx 0 0;
				}
			}
		}

		.right {
			width: 100%;
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
				position: relative;

				.mark {
					background-color: rgba(0, 0, 0, 0.6);
					height: 448rpx;
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
					height: 448rpx;
				}

				.title {
					font-size: 20rpx;
					padding: 10rpx;
				}

				.text {
					padding: 0 10rpx 10rpx;
					align-items: center;
					display: flex;
					justify-content: space-between;
					font-size: 18rpx;

					.money {
						color: rgba(7, 16, 47, 1);
					}

					.eye {
						font-size: 12rpx;
					}

					.btn {
						width: 66rpx;
						height: 38rpx;
						line-height: 38rpx;
						text-align: center;
						color: #fff;
						border-radius: 20rpx;
						background: linear-gradient(180.00deg, rgba(38, 67, 127, 1), rgba(7, 16, 47, 1) 100%);

						&.disabled {
							text-decoration-line: line-through;
							background: linear-gradient(180.00deg, rgba(38, 67, 127, 0.61), rgba(7, 16, 47, 0.61) 100%);
						}
					}
				}
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