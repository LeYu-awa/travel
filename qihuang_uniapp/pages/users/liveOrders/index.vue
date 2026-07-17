<template>
	<view class="content">
		<Header>
			<template #title>
				<view class="top_flex">
					<view class="new-iconfont icon-sousuo"></view>
					<input class="input" placeholder="搜索视频直播订单" @confirm="changInput" />
				</view>
			</template>
			<Tab :tablist="tabList" tabName="id" :tabKey="pageQuery.order_status" @change="changeTab" />
			<!-- <view class="tabs">
				<view class="text" @click="changeType('video')" :class="type == 'video' ? 'select' : ''">
					视频
				</view>
				<view class="text" @click="changeType('live')" :class="type == 'live' ? 'select' : ''">
					直播间
				</view>
			</view>
			<view class="tags">
				<view class="text" @click="changeStatus('')" :class="pageQuery.pay_status == '' ? 'select' : ''">
					全部
				</view>
				<view class="text" @click="changeStatus('0')" :class="pageQuery.pay_status == '0' ? 'select' : ''">
					待付款
				</view>
				<view class="text" @click="changeStatus('1')" :class="pageQuery.pay_status == '1' ? 'select' : ''">
					已购买
				</view>
			</view> -->
		</Header>
		<template v-if="list.length">
			<!-- 使用v-for循环遍历订单状态数组 -->
			<view class="item" v-for="(item, index) in list" :key="index"
				@click="$goNextPage('/pages/video_card_goods/index?id=' + item.member_card_id)">
				<view class="item-top">
					<view class="title">
						{{item.order_id}}
					</view>
					<view class="status">{{item.order_status_text}}
					</view>
				</view>
				<view class="item-mid">
					<view class="img">
						<image :src="item.member_card_image"></image>
					</view>
					<view class="mid-right">
						<view class="mid-content">
							{{item.member_card_title}}
						</view>
						<view class="price">
							{{item.pay_price_formatted}}
						</view>
					</view>
				</view>
				<view class="item-bottom">
					<view class="time">
						下单时间：{{ item.create_time_formatted }}
					</view>
					<view class="btns">
						<!-- 状态1和3显示：删除订单和再次购买 -->
						<view class="btn" v-if="item.order_status == 2" @click.stop="deleteData(item)">
							删除订单
						</view>
						<!-- <view class="btn save" @click="confirmData(item)" v-if="item.pay_status == 1">
							确认订单
						</view> -->
						<!-- <view class="btn save" v-if="item.pay_status == 1">
							再次购买
						</view> -->

						<!-- 状态2显示：取消订单和去支付 -->
						<view class="btn" v-if="item.order_status == 0" @click.stop="cancelData(item)">
							取消订单
						</view>
						<view class="btn save" v-if="item.order_status == 0" @click.stop="buy(item)">
							去支付
						</view>
					</view>
				</view>
			</view>
		</template>
		<emptyPage v-else title="暂无历史记录" />
		<uni-popup ref="popupRef">
			<view class="popup-tips">
				<view class="popup-content">
					<view class="title">
						取消订单
					</view>
					<textarea v-model="popupValue.cancel_reason" placeholder="请输入取消原因" name="" id="" cols="30"
						rows="10"></textarea>
					<view class="popup-footer">
						<view class="b" @click="closePopup">
							取消
						</view>
						<view class="b save" @click="savePopup">
							确认
						</view>
					</view>
				</view>

			</view>
		</uni-popup>
		<payment customizePayUrl @customizeApi="customizeApi" :payMode='payMode' @onChangeFun='onChangeFun'
			:pay_close="pay_close" :order_id="pay_order_id" :totalPrice='totalPrice'></payment>
		<customTab active="my"></customTab>
	</view>
</template>

<script>
	import customTab from '@/components/customTab';
	import Header from "@/components/header.vue"
	import Tab from "@/components/tab.vue"
	import payment from '@/components/payment';
	import emptyPage from "@/components/emptyPage.vue"
	import {
		getUserInfo,
		getMemberOrder,
		deleteLiveOrder,
		cancelLiveOrder,
		confirmLiveOrder,
		repayMemberOrder
	} from "@/api/user.js"
	export default {
		components: {
			customTab,
			Tab,
			Header,
			payment,
			emptyPage
		},
		data() {
			return {
				pageQuery: {
					page: 1,
					limit: 10,
					order_status: ''
				},
				popupValue: {},
				tabKey: '',
				tabList: [{
						label: '全部',
						id: ''
					},
					{
						label: '待支付',
						id: '0'
					},
					{
						label: '已支付',
						id: '1'
					},
					{
						label: '已取消',
						id: '2'
					},
					// {
					// 	label: '已退款',
					// 	id: '3'
					// },
				],
				type: 'video',
				total: 0,
				payValue: {},
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
				totalPrice: '0',
				pay_close: false,
				pay_order_id: '',
				// 订单状态数组，包含1、2、3三种状态
				list: [],

			};
		},
		onLoad() {
			this.getList()
		},
		onShow() {
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
			changInput(){
				this.pageQuery.page = 1
				this.getList()
			},
			changeTab(e, item) {
				this.pageQuery.page = 1
				this.pageQuery.order_status = item.id
				this.getList()
			},
			changeType(type) {
				this.type = type
				this.pageQuery.page = 1
				this.pageQuery.order_status = ''
				this.getList()
			},
			changeStatus(status) {
				this.pageQuery.order_status = status
				this.pageQuery.page = 1
				this.getList()
			},
			buy(item) {
				this.payValue = item
				this.goPay()
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
			goPay: function() {
				this.$set(this, 'pay_close', true);
				this.order_id = this.payValue.id;
				this.pay_order_id = this.payValue.id.toString()
				this.$set(this, 'totalPrice', this.payValue.price);
			},
			async customizeApi(number, type) {
				let that = this
				let {
					data,
					message
				} = await repayMemberOrder({
					id: this.payValue.id,
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
							this.noPay = false
							uni.hideLoading();
							this.payClose()
							this.getUserInfo()
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
			async getList() {
				let data = await getMemberOrder(this.pageQuery)

				this.total = data.data.count
				if (this.pageQuery.page == 1) {
					this.list = data.data.list
				} else {
					this.list = [...this.list, ...data.data.list]
				}
			},

			// 删除订单
			async deleteData(item) {
				let that = this
				uni.showModal({
					title: '提示',
					content: '您确定要删除该订单吗？',
					success: async (res) => {
						if (res.confirm) {
							await deleteLiveOrder({
								id: item.id
							})
							uni.showToast({
								title: '删除成功',
								success() {
									setTimeout(() => {
										that.pageQuery.page = 1
										that.getList()
									}, 1000)
								}
							})
						}
					}
				})

			},
			// 取消订单
			async savePopup() {
				await cancelLiveOrder({
					id: this.popupValue.id,
					cancel_reason: this.popupValue.cancel_reason
				})
				let that = this
				uni.showToast({
					title: '取消成功',
					success:()=> {
						that.pageQuery.page = 1
						that.getList()
						that.closePopup()
					}
				})

			},
			closePopup() {
				this.$refs.popupRef.close()
				this.popupValue = {}
			},
			// 取消订单
			async cancelData(item) {
				this.$refs.popupRef.open('center')
				this.popupValue = item
			},
			// 确认订单
			async confirmData(item) {
				let that = this
				uni.showModal({
					title: '提示',
					content: '您确定要确认该订单吗？',
					success: async (res) => {
						if (res.confirm) {
							await confirmLiveOrder({
								id: item.id
							})
							uni.showToast({
								title: '确认成功',
								success() {
									setTimeout(() => {
										that.pageQuery.page = 1
										that.getList()
									}, 1000)
								}
							})
						}
					}
				})

			},
		}
	};
</script>

<style lang="scss" scoped>
	.content {

		.tabs {
			display: flex;
			font-size: 28rpx;
			padding: 0 30rpx;

			.text {
				margin-right: 50rpx;

				&.select {
					background-image: linear-gradient(137.83deg, rgba(255, 230, 140, 1), rgba(220, 170, 90, 1) 100%);
					-webkit-background-clip: text;
					background-clip: text;
					color: transparent;
					position: relative;

					&::after {
						content: '';
						width: 50rpx;
						height: 6rpx;
						position: absolute;
						bottom: -16rpx;
						left: 0;
						right: 0;
						border-radius: 10rpx;
						margin: auto;
						background-image: linear-gradient(137.83deg, rgba(255, 230, 140, 1), rgba(220, 170, 90, 1) 100%);
					}
				}
			}
		}

		.tags {
			font-size: 26rpx;
			display: flex;
			padding: 40rpx 30rpx 10rpx;

			.text {
				height: 56rpx;
				line-height: 56rpx;
				padding: 0 22rpx;
				border-radius: 56rpx;
				background-color: #f2f2f2;
				margin-right: 16rpx;

				&.select {
					color: #fff;
					background: linear-gradient(180.00deg, rgba(67, 106, 188, 1), rgba(42, 55, 99, 1) 100%);
				}
			}
		}

		.item {
			background-color: #fff;
			margin-bottom: 20rpx;
			padding: 30rpx;

			.item-top {
				font-weight: bold;
				display: flex;
				justify-content: space-between;

				.status {
					font-size: 24rpx;
					padding: 4rpx 16rpx;
					border-radius: 16rpx;
					color: #19336B;
				}
			}

			.item-mid {
				margin-top: 20rpx;
				display: flex;

				.img {
					width: 180rpx;
					height: 180rpx;
					border-radius: 10rpx;
					background: rgba(196, 196, 196, 1);

					image {
						width: 180rpx;
						height: 180rpx;
					}
				}

				.mid-right {
					width: calc(100% - 196rpx);
					margin-left: 16rpx;

					.mid-content {
						font-size: 26rpx;
						height: 80rpx;
						margin-bottom: 20rpx;
						display: -webkit-box;
						/* 必须设置为弹性盒子模型 */
						-webkit-box-orient: vertical;
						/* 垂直排列子元素 */
						-webkit-line-clamp: 2;
						/* 限制显示的行数 */
						overflow: hidden;
						/* 隐藏超出内容 */
						text-overflow: ellipsis;
					}

					.price {
						text-align: right;
						// color: orangered;
						background-image: linear-gradient(137.83deg, rgba(255, 230, 140, 1), rgba(220, 170, 90, 1) 100%);
						-webkit-background-clip: text;
						background-clip: text;
						color: transparent;
						font-size: 32rpx;
					}
				}
			}

			.item-bottom {
				display: flex;
				align-items: center;

				.time {
					font-size: 22rpx;
					color: rgba(102, 102, 102, 1);
					flex: 1;
					padding-top: 10rpx;
				}

				.btns {
					display: flex;
					justify-content: space-between;

					.btn {
						width: 156rpx;
						height: 68rpx;
						border-radius: 34rpx;
						text-align: center;
						line-height: 68rpx;
						font-size: 24rpx;
						background-color: #f2f2f2;
						margin-left: 16rpx;
					}

					.save {
						color: #fff;
						background: linear-gradient(180.00deg, rgba(67, 106, 188, 1), rgba(42, 55, 99, 1) 100%);
					}
				}
			}
		}
	}

	.top_flex {
		display: flex;
		width: 100%;
		align-items: center;
		background-color: #F0F5F8;
		padding: 0 20rpx;
		border-radius: 64rpx;

		.input {
			height: 64rpx;
			line-height: 64rpx;
			font-size: 28rpx;
			width: 100%;
			margin: 0 10rpx;
		}
	}


	.popup-tips {
		.popup-content {
			background-color: #fff;
			padding: 30rpx;
			border-radius: 10rpx;

			.title {
				text-align: center;
				margin-bottom: 20rpx;
			}

			textarea {
				background-color: #efefef;
				border-radius: 10rpx;
				padding: 20rpx;
			}

			.popup-footer {
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;

				.b {
					width: calc(50% - 10rpx);
					text-align: center;
					border-radius: 50rpx;
					height: 70rpx;
					line-height: 70rpx;
					border: 2rpx solid #eee;

					&.save {
						color: #fff;
						background: linear-gradient(180.00deg, rgba(67, 106, 188, 1), rgba(42, 55, 99, 1) 100%);
					}

				}
			}
		}
	}
</style>