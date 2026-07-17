<template>
	<view :style="viewColor">
		<view class="product-con">
			<view class="head-wrapper" id="home" :style="{ top: homeTop + 'rpx' }">
				<view class="head-menu">
					<view class='iconfont icon-fanhui2' @click="returns"></view>
					<view class="iconfont icon-gengduo5" @click="showNav"></view>
				</view>
			</view>
			<!-- 导航小图标 -->
			<view class="dialog_nav" v-show="currentPage" :style="{ top: navH + 'rpx' }">
				<view class="dialog_nav_item" :class="item.after" v-for="(item,index) in selectNavList" :key="index"
					@click="linkPage(item.url)">
					<text class="iconfont" :class="item.icon"></text>
					<text class="pl-20">{{item.name}}</text>
				</view>
			</view>
			<view v-if="storeInfo">
				<scroll-view :scroll-top="scrollTop" scroll-y='true' scroll-with-animation="true"
					:style='"height:"+height+"px;"' @scroll="scroll">
					<view id="past0">
						<!-- #ifdef MP || APP-PLUS -->
						<view class="" :style="'width:100%;' + 'height:'+sysHeight + 'px'"></view>
						<!-- #endif -->
						<image :src="storeInfo.banner_images" style="width: 100%;" mode="widthFix"></image>
						<!--有氛围图-->
						<view class='wrapper'>
							<!--无氛围图-->
							<view class='share acea-row row-between row-bottom'>
								<view class='money p-color skeleton-rect' style="min-width: 70rpx;">
									<text class='num'>{{storeInfo.price_formatted}}</text>
									<view v-if="svipData && svipData.show_svip_price && svipData.show_svip"
										style="display: inline-block;">
										<text class="vip-money">￥{{storeInfo.svip_price}}</text>
										<!-- <image class="vip-image" :src="`${domain}/static/images/svip.png`"></image> -->
									</view>
								</view>
							</view>
							<view class='introduce skeleton-rect'>
								<text class="font-bg-red bt-color">{{storeInfo.card_type_text}}</text>
								{{storeInfo.title || ''}}
							</view>
							<view class='label acea-row row-between-wrapper'
								:style="{'padding-bottom':coupon.list.length || storeInfo.top_pid?0 :10+'px;'}">
								<view class="skeleton-rect">市场价:{{storeInfo.original_price_formatted || 0}}</view>
								<view class="skeleton-rect">
									库存:{{storeInfo.stock ? storeInfo.stock : 0}}{{storeInfo.unit_name ? storeInfo.unit_name : ''}}
								</view>
								<view class="skeleton-rect">
									销量:{{storeInfo.sold_count_formatted}}
								</view>
							</view>
						</view>
					</view>
					<view class='product-intro' id="past3">
						<view class='title'>产品介绍</view>
						<rich-text :nodes="storeInfo.description"></rich-text>
						<rich-text :nodes="storeInfo.benefits"></rich-text>
					</view>
					<view style='height:120rpx;'></view>
				</scroll-view>
			</view>
			<view class='footer acea-row row-between-wrapper' :class="{'footpl':hide_mer_status==1}">

				<view v-if="attr.productSelect.stock != 0" class='bnt acea-row skeleton-rect'>
					<button class='buy bnts' @click="goBuy">立即购买</button>
				</view>
			</view>
		</view>
		<payment customizePayUrl @customizeApi="customizeApi" :payMode='payMode' @onChangeFun='onChangeFun'
			:pay_close="pay_close" :order_id="pay_order_id" :totalPrice='totalPrice'></payment>
	</view>
</template>

<script>
	var sysHeight = uni.getSystemInfoSync().statusBarHeight;
	import {
		arrivalSubscribe
	} from '@/utils/SubscribeMessage.js';

	import payment from '@/components/payment';
	import {
		getProductParmas,
		getProductCode,
		collectAdd,
		collectDel,
		postCartAdd,
		arrivalNoticeApi,
		copyPasswordApi,
		getDiscountsLst,
		priceRuleApi
	} from '@/api/store.js';
	import {
		getOrderConfirm
	} from '@/api/order.js';
	import {
		getUserInfo,
		imgToBase,
		getMemberCardDetail,
		createMemberCard
	} from '@/api/user.js';
	import {
		getCoupons,
		getShopCoupons
	} from '@/api/api.js';
	import {
		getCartCounts
	} from '@/api/order.js';
	import {
		mapGetters
	} from "vuex";
	import {
		configMap
	} from "@/utils";
	import {
		imageBase64
	} from "@/api/public";
	import productConSwiper from '@/components/productConSwiper';
	import couponListWindow from '@/components/couponListWindow';
	import copyPassword from '@/components/copyPassword';
	import productWindow from '@/components/productWindow';
	import userEvaluation from '@/components/userEvaluation';
	import shareRedPackets from '@/components/shareRedPackets';
	import specs from '@/components/specs/index.vue';
	import Cache from '@/utils/cache';
	import {
		toLogin
	} from '@/libs/login.js';
	// #ifndef H5
	import passwordPopup from '@/components/passwordPopup';
	// #endif
	import {
		HTTP_REQUEST_URL
	} from '@/config/app';
	import {
		CART_TIME,
		CART_ID
	} from '@/config/cache';
	import home from '@/components/home';
	import {
		silenceBindingSpread
	} from "@/utils";
	import parser from "@/components/jyf-parser/jyf-parser";
	import history from "@/mixins/history";
	import shareScence from "@/libs/spread";
	import guaranteeTemplate from '@/components/freightGuarantee';
	import discountsGoods from './discountsGoods';
	import ClipboardJS from "@/plugin/clipboard/clipboard.js";
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue';
	let app = getApp();
	export default {
		components: {
			// #ifndef H5
			passwordPopup,
			// #endif
			productConSwiper,
			couponListWindow,
			productWindow,
			userEvaluation,
			shareRedPackets,
			home,
			guaranteeTemplate,
			copyPassword,
			discountsGoods,
			"jyf-parser": parser,
			easyLoadimage,
			specs,
			payment
		},
		mixins: [history],
		data() {
			let that = this;
			return {
				isNodes: 0, //控制什么时候开始抓取元素节点,只要数值改变就重新抓取
				sysHeight: sysHeight, //系统导航条高度
				//属性是否打开
				coupon: {
					'coupon': false,
					list: [],
				},
				// attrTxt: '选择', //属性页面提示
				attrValue: '', //已选属性
				animated: false, //购物车动画
				id: 0, //商品id
				replyCount: 0, //总评论数量
				reply: [], //评论列表
				storeInfo: {
					merchant: {}
				}, //商品详情
				productValue: [], //系统属性
				couponList: [], //优惠券
				cart_num: 1, //购买数量
				isOpen: false, //是否打开属性组件
				actionSheetHidden: true,
				posterImageStatus: false,
				storeImage: '', //海报产品图
				PromotionCode: '', //二维码图片
				canvasStatus: false, //海报绘图标签
				posterImage: '', //海报路径
				posterbackgd: '/static/images/posterbackgd.png',
				source: '',
				sharePacket: {
					isState: true, //默认不显示
				}, //分销商详细
				// uid: 0, //用户uid
				circular: false,
				autoplay: false,
				interval: 3000,
				duration: 500,
				swiperCur: 0,
				clientHeight: "",
				systemStore: {}, //门店信息
				replyChance: 0,
				CartCount: 0,
				isDown: true,
				storeSelfMention: true,
				posters: false,
				weixinStatus: false,
				attr: {
					cartAttr: false,
					productAttr: [],
					productSelect: {}
				},
				description: '',
				navActive: 0,
				H5ShareBox: false, //公众号分享图片
				activity: [],
				retunTop: true, //顶部返回
				navH: "",
				navList: [],
				opacity: 0,
				scrollY: 0,
				topArr: [],
				toView: '',
				height: 0,
				heightArr: [],
				lock: false,
				scrollTop: 0,
				tagStyle: {
					img: 'width:100%;display:block;'
				},
				// 动画状态
				showAnimate: true,
				domain: HTTP_REQUEST_URL,
				currSpid: '',
				codeImg: "",
				videoCoverImg: "",
				shipping: "",
				guarantee: [],
				shippingValue: "",
				uniqueValue: "",
				priceRule: "",
				isCopy: false,
				copyUrl: '',
				comboTotal: 0,
				comboList: [],
				max_count: 0,
				min_count: 0,
				pay_limit: 1,
				svipData: {},
				svipPrice: false,
				specsInfo: {
					show: false,
					params: []
				},
				recommend: [],
				serviceInfo: {},
				currentPage: false,
				homeTop: 59,
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
				selectNavList: [{
						name: '首页',
						icon: 'icon-shouye8',
						url: '/pages/index/index',
						after: 'dialog_after'
					},
					// {
					// 	name: '搜索',
					// 	icon: 'icon-sousuo6',
					// 	url: '/pages/columnGoods/goods_search_con/index',
					// 	after: 'dialog_after'
					// },
					// // {
					// // 	name: '购物车',
					// // 	icon: 'icon-gouwuche7',
					// // 	url: '/pages/order_addcart/order_addcart',
					// // 	after: 'dialog_after'
					// // },
					// {
					// 	name: '我的收藏',
					// 	icon: 'icon-shoucang3',
					// 	url: '/pages/users/user_goods_collection/index',
					// 	after: 'dialog_after'
					// },
					// {
					// 	name: '个人中心',
					// 	icon: 'icon-gerenzhongxin1',
					// 	url: '/pages/user/index'
					// },
				],
			};
		},
		computed: {
			...configMap(['margin_ico_switch', 'margin_ico', 'hide_mer_status', 'procudt_increase_status', 'site_name',
				'share_pic'
			], mapGetters(['isLogin', 'uid', 'viewColor'])),
		},
		onLoad(options) {
			let that = this
			if (options.spid) {
				app.globalData.spid = options.spid;
				that.currSpid = options.spid
			}
			var pages = getCurrentPages();
			let curPage = pages[pages.length - 1];
			if (pages.length <= 1) {
				that.retunTop = false
			}
			let curParam = curPage.options || curPage.$route.query;
			that.source = curParam.source;
			that.navH = app.globalData.navHeight + 10;
			//页面中需要计算的一些值
			// #ifdef APP-PLUS
			that.homeTop = (that.sysHeight + 8) * 2;
			// #endif
			// #ifdef H5
			that.homeTop = 10;
			// #endif
			that.id = options.id;
			uni.getSystemInfo({
				success: function(res) {
					that.height = res.windowHeight
					//res.windowHeight:获取整个窗口高度为px，*2为rpx；98为头部占据的高度；
					that.navHeight = res.statusBarHeight * (750 / res.windowWidth) + 91;
				},
			});
			//扫码携带参数处理
			// #ifdef MP
			if (options.scene) {
				let value = this.$util.getUrlParams(decodeURIComponent(options.scene));
				if (value.id) options.id = value.id;
				//记录推广人uid
				if (value.spid) {
					app.globalData.spid = value.spid;
					that.currSpid = value.spid
				}
			}
			if (!options.id && !options.scene) {
				return this.$util.Tips({
					title: '缺少参数无法查看商品'
				}, {
					tab: 3,
					url: 1
				});
			} else {
				this.id = options.id
			}
			//记录推广人uid
			if (options.spid) app.globalData.spid = options.spid;
			// #endif
			shareScence(that.currSpid, that.isLogin)
			this.getGoodsDetails();
			// this.getDiscountsData();
			// // #ifdef H5
			// this.isLogin && silenceBindingSpread();
			// //#endif  
			// if (this.isLogin) {
			// 	this.downloadFilePromotionCode();
			// 	this.getHistory()
			// }
		},
		onReady() {
			this.isNodes++;
			this.$nextTick(function() {
				// #ifdef MP
				const menuButton = uni.getMenuButtonBoundingClientRect();
				const query = uni.createSelectorQuery().in(this);
				query
					.select('#home')
					.boundingClientRect(data => {
						this.homeTop = menuButton.top * 2 + menuButton.height - data.height;
					})
					.exec();
				// #endif
			});
		},
		onShow() {
			let that = this
			this.getUserInfo()
			// that.getConfig();
			uni.hideLoading();
		},
		/**
		 * 用户点击右上角分享
		 */
		// #ifdef MP
		onShareAppMessage: function() {
			let that = this;
			that.$set(that, 'actionSheetHidden', !that.actionSheetHidden);
			return {
				title: that.storeInfo.store_name || '',
				imageUrl: that.storeInfo.image || '',
				path: '/pages/goods_details/index?id=' + that.id + '&spid=' + that.uid,
			}
		},
		onShareTimeline: function() {
			let that = this;
			that.$set(that, 'actionSheetHidden', !that.actionSheetHidden);
			return {
				title: that.storeInfo.store_name || '',
				query: {
					id: that.id,
					spid: that.uid
				},
				imageUrl: that.storeInfo.image || ''
			}
		},
		// #endif
		methods: {


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
			async customizeApi(number, type) {
				let that = this
				let {
					data,
					message
				} = await createMemberCard({
					member_card_id: this.id,
					pay_method: type
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
							return that.$util.Tips({
								title: '支付成功',
								icon: 'success'
							}, {
								tab: 2,
								url: '/pages/users/liveOrders/index'
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
							that.payClose()
							that.getUserInfo()
						},
					});
					// #endif
				} else {
					uni.hideLoading();
					this.payClose()
					this.getUserInfo()
					return that.$util.Tips({
						title: '支付成功',
						icon: 'success'
					}, {
						tab: 2,
						url: '/pages/users/liveOrders/index'
					});
				}
			},











			//下拉导航页面跳转
			linkPage(url) {
				if ([
						'/pages/user/index'
					].indexOf(url) > -1) {
					uni.switchTab({
						url
					})
				} else if (url == '/pages/index/index') {
					uni.reLaunch({
						url: '/pages/shop/index'
					});
				} else {
					uni.navigateTo({
						url
					})
				}
				this.currentPage = false
			},
			boxStatus(data) {
				this.showAnimate = data
			},
			closeChange: function() {
				this.$set(this.sharePacket, 'isState', true);
			},
			showNav() {
				this.currentPage = !this.currentPage;
			},
			hideNav() {
				this.currentPage = false;
			},
			/**查看运费说明*/
			showShip: function() {
				this.$refs.guartemplate.showShippingTel();
			},
			/**查看服务保障*/
			showGuaranee: function() {
				this.$refs.guartemplate.showGuaranteeTel();
			},
			/*查看套餐详情*/
			openCombo() {
				this.$refs.discounts.showPopup(this.id);
			},
			seeSpecs() {
				this.specsInfo.show = true;
			},
			mySpecs() {
				this.$set(this.specsInfo, 'show', false);
			},
			/*获取套餐列表数据*/
			getDiscountsData() {
				getDiscountsLst({
					product_id: this.id
				}).then(res => {
					this.comboTotal = res.data.count;
					res.data.list.forEach((item, index) => {
						item.save_price = 0;
						item.discountsProduct.forEach((v, i) => {
							item.save_price += parseFloat(v.product.ot_price) - parseFloat(v
								.product.price)
						})
					})
					this.comboList = res.data.list;
				}).catch(err => {

				});
			},
			/*获取价格说明*/
			getPricrRule() {
				priceRuleApi(this.storeInfo.cate_id).then(res => {
					this.priceRule = res.data
				}).catch(err => {

				});
			},
			goActivity: function(e) {
				let item = e;
				if (item.type === "1") {
					uni.navigateTo({
						url: `/pages/activity/goods_seckill_details/index?id=${item.id}&time=${item.time}&status=1`
					});
				} else if (item.type === "2") {
					uni.navigateTo({
						url: `/pages/activity/goods_bargain_details/index?id=${item.id}&bargain=${this.uid}`
					});
				} else {
					uni.navigateTo({
						url: `/pages/activity/goods_combination_details/index?id=${item.id}`
					});
				}
			},
			/**
			 * 购物车手动填写
			 *
			 */
			iptCartNum: function(e) {
				this.$set(this.attr.productSelect, 'cart_num', e);
			},
			// 后退
			returns: function() {
				// uni.switchTab({
				// 	url: '/pages/index/index'
				// });
				uni.navigateBack({
					delta: 1
				})
			},
			// 首页
			goHome() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			// 种草详情
			goPlant(item) {
				if (item.is_type == 1) {
					uni.navigateTo({
						url: '/pages/plantGrass/plant_detail/index?id=' + item.community_id
					});
				} else {
					uni.navigateTo({
						//#ifdef APP
						url: '/pages/short_video/appSwiper/index?id=' + item.community_id + '&tab=1'
						//#endif
						//#ifndef APP
						url: '/pages/short_video/nvueSwiper/index?id=' + item.community_id + '&tab=1'
						//#endif
					});
				}
			},
			tap: function(index) {
				var id = "past" + index;
				var index = index;
				var that = this;
				this.$set(this, 'toView', id);
				this.$set(this, 'navActive', index);
				this.$set(this, 'lock', true);
				this.$set(this, 'scrollTop', index > 0 ? that.topArr[index] - (app.globalData.navHeight / 2) : that
					.topArr[index]);
			},
			scroll: function(e) {
				var that = this,
					scrollY = e.detail.scrollTop;
				var opacity = scrollY / 200;
				opacity = opacity > 1 ? 1 : opacity;
				that.$set(that, 'showAnimate', false);
				that.$set(that, 'opacity', opacity);
				that.$set(that, 'scrollY', scrollY);
				if (that.lock) {
					that.$set(that, 'lock', false)
					return;
				}
				for (var i = 0; i < that.topArr.length; i++) {
					if (scrollY < that.topArr[i] - (app.globalData.navHeight / 2) + that.heightArr[i]) {
						that.$set(that, 'navActive', i)
						break
					}
				}
				uni.$emit('scroll');
			},
			ChangCouponsClose: function() {
				this.$set(this.coupon, 'coupon', false)
			},
			/**
			 * 购物车数量加和数量减
			 *
			 */
			ChangeCartNum: function(changeValue) {
				//changeValue:是否 加|减
				//获取当前变动属性
				let productSelect = this.productValue[this.attrValue];
				//如果没有属性,赋值给商品默认库存
				if (productSelect === undefined && !this.attr.productAttr.length)
					productSelect = this.attr.productSelect;
				//无属性值即库存为0；不存在加减；
				if (productSelect === undefined) return;
				let stock = productSelect.stock || 0;
				let num = this.attr.productSelect;
				if (changeValue) {
					num.cart_num++;
					if (num.cart_num > stock) {
						this.$set(this.attr.productSelect, "cart_num", stock);
						this.$set(this, "cart_num", stock);
					}
					if (num.cart_num > this.storeInfo.once_max_count && this.storeInfo.once_max_count != 0 && this
						.storeInfo.pay_limit != 0) {
						this.$set(this.attr.productSelect, "cart_num", this.storeInfo.once_max_count);
						this.$set(this, "cart_num", this.storeInfo.once_max_count);
						return this.$util.Tips({
							title: "单次购买件数不能超过" + this.storeInfo.once_max_count + "件！"
						});
					}
				} else {
					num.cart_num--;
					if (num.cart_num < 1) {
						this.$set(this.attr.productSelect, "cart_num", 1);
						this.$set(this, "cart_num", 1);
					}
					if (num.cart_num < this.storeInfo.once_min_count && this.storeInfo.once_min_count != 0) {
						this.$set(this.attr.productSelect, "cart_num", this.storeInfo.once_min_count);
						this.$set(this, "cart_num", this.storeInfo.once_min_count);
						return this.$util.Tips({
							title: "单次购买件数不能少于" + this.storeInfo.once_min_count + "件！"
						});
					}
				}
			},
			attrVal(val) {
				this.$set(this.attr.productAttr[val.indexw], 'index', this.attr.productAttr[val.indexw].attr_values[val
					.indexn]);
			},
			/**
			 * 属性变动赋值
			 *
			 */
			ChangeAttr: function(res) {
				let productSelect = this.productValue[res];
				if (productSelect) this.$set(this, "uniqueValue", productSelect.unique);
				if (productSelect && productSelect.stock > 0) {
					this.$set(this.attr.productSelect, "image", productSelect.image ? productSelect.image : this
						.storeInfo.image);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "svip_price", productSelect.svip_price);
					this.$set(this.attr.productSelect, "stock", productSelect.stock);
					this.$set(this.attr.productSelect, "unique", productSelect.unique);
					this.$set(this, "uniqueValue", productSelect.unique);
					if (productSelect.stock == 0) {
						this.$set(this.attr.productSelect, "cart_num", 0);
					} else {
						this.$set(this.attr.productSelect, "cart_num", this.min_count || 1);
					}
					this.$set(this, "attrValue", res);
					// this.$set(this, "attrTxt", "选择");
				} else {
					this.$set(this.attr.productSelect, "image", productSelect.image);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "svip_price", productSelect.svip_price);
					this.$set(this.attr.productSelect, "stock", 0);
					this.$set(this.attr.productSelect, "unique", "");
					this.$set(this.attr.productSelect, "cart_num", 0);
					this.$set(this, "attrValue", res);
					this.$set(this, "attrTxt", "选择");
				}
			},
			/**
			 * 领取完毕移除当前页面领取过的优惠券展示
			 */
			ChangCoupons: function(e) {
				let coupon = e;
				let couponList = this.$util.ArrayRemove(this.couponList, 'id', coupon.id);
				this.$set(this, 'couponList', couponList);
				this.getCouponList();
			},
			setClientHeight: function() {
				let that = this;
				let view = uni.createSelectorQuery().in(this).select("#list0");
				view.fields({
					size: true,
				}, data => {
					that.$set(that, 'clientHeight', data.height + 20)
				}).exec();
			},
			/**
			 * 获取产品详情
			 * 
			 */
			getGoodsDetails: function() {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				let that = this;
				getMemberCardDetail({
					id: that.id
				}).then(res => {
					uni.hideLoading();
					that.storeInfo = res.data
					// let storeInfo = res.data;
					// if (storeInfo.video_link && storeInfo.slider_image.length > 1) {
					// 	this.videoCoverImg = storeInfo.slider_image[0]
					// 	storeInfo.slider_image.splice(0, 1)
					// } else if (storeInfo.video_link && storeInfo.slider_image.length === 1) {
					// 	this.videoCoverImg = storeInfo.slider_image[0]
					// }
					// that.$set(that, 'storeInfo', storeInfo);
					// that.$set(that, 'reply', res.data.topReply ? [res.data.topReply] : []);
					// that.$set(that, 'replyCount', res.data.replayData && res.data.replayData.count);
					// that.$set(that, 'replyChance', res.data.replayData && res.data.replayData.rate);
					// that.$set(that.attr, 'productAttr', res.data.attr);
					// that.$set(that, 'productValue', res.data.sku);
					// that.$set(that.sharePacket, 'priceName', res.data.priceName);
					// that.$set(that.sharePacket, 'max', res.data.max_extension);
					// that.$set(that.sharePacket, 'min', res.data.min_extension);
					// that.$set(that, 'systemStore', res.data.system_store);
					// that.$set(that, 'storeSelfMention', res.data.store_self_mention);
					// that.$set(that, 'PromotionCode', storeInfo.code_base);
					// that.$set(that, 'activity', res.data.activity ? res.data.activity : []);
					// that.$set(that, 'max_count', res.data.once_max_count);
					// that.$set(that, 'pay_limit', res.data.pay_limit);
					// that.$set(that, 'min_count', res.data.once_min_count);
					// that.$set(that, 'svipData', res.data.show_svip_info || null);
					// that.$set(that, 'svipPrice', res.data.show_svip_info && res.data.show_svip_info
					// 	.show_svip_price || false);
					// uni.setNavigationBarTitle({
					// 	title: storeInfo.store_name.substring(0, 7) + "..."
					// })
					// that.$set(that, 'storeImage', that.storeInfo.image);
					// getProductParmas(that.id).then((res) => {
					// 	that.$set(that, 'description', res.data.content);
					// 	if (that.description.type == 0) {
					// 		that.description.content = that.description.content.replace(
					// 			/<img/gi,
					// 			'<img style="max-width:100%;height:auto;float:left;display:block" '
					// 		);
					// 		that.description.content = that.description.content.replace(
					// 			/<video/gi,
					// 			'<video style="width:100%;height:300px;display:block" '
					// 		);
					// 	}
					// 	that.$set(that, 'guarantee', res.data.guarantee ? res.data.guarantee : []);
					// 	that.$set(that, 'shippingValue', res.data.temp ? res.data.temp.name : '');
					// 	that.$set(that, 'shipping', res.data.temp ? res.data.temp.info : '');
					// 	that.$set(that.specsInfo, 'params', res.data.params);
					// 	that.$set(that.storeInfo, 'merchant', res.data.merchant);
					// 	that.$set(that.storeInfo, 'spu_id', res.data.spu_id);
					// 	that.$set(that.storeInfo, 'community', res.data.community);
					// 	that.$set(that.storeInfo, 'atmosphere_pic', res.data.atmosphere_pic);
					// 	that.$set(that.storeInfo, 'top_pid', res.data.top_pid);
					// 	that.$set(that.storeInfo, 'top_num', res.data.top_num);
					// 	that.$set(that.storeInfo, 'top_name', res.data.top_name);
					// 	var recommendArr = [];
					// 	for (var i = 0, len = res.data.merchant.recommend.length; i < len; i += 6) {
					// 		recommendArr.push(res.data.merchant.recommend.slice(i, i + 6));
					// 	}
					// 	that.recommend = recommendArr
					// })
					// if (that.isLogin) {
					// 	that.downloadFilePromotionCode();
					// 	that.getCartCount();
					// };
					// // #ifdef H5
					// that.ShareInfo();
					// // #endif
					// setTimeout(function() {
					// 	that.infoScroll();
					// }, 500);
					// that.DefaultSelect();
					// that.getPricrRule(that.storeInfo.cate_id)
					// that.$nextTick(function() {
					// 	that.getCouponList();
					// })
				}).catch(err => {
					//状态异常返回上级页面
					return that.$util.Tips({
						title: err
					}, {
						tab: 3,
						url: 1
					});
				})
			},
			infoScroll: function() {
				var that = this,
					topArr = [],
					heightArr = [];
				for (var i = 0; i < that.navList.length; i++) { //productList
					//获取元素所在位置
					var query = uni.createSelectorQuery().in(this);
					var idView = "#past" + i;
					query.select(idView).boundingClientRect();
					query.exec(function(res) {
						var top = res[0].top;
						var height = res[0].height;
						topArr.push(top);
						heightArr.push(height);
						that.$set(that, 'topArr', topArr);
						that.$set(that, 'heightArr', heightArr);
					});
				};
			},
			/**
			 * 默认选中属性
			 *
			 */
			DefaultSelect: function() {
				let productAttr = this.attr.productAttr;
				let value = [];
				let arr = []
				let unSortArr = []
				for (var key in this.productValue) {
					if (this.productValue[key].stock > 0) {
						value = this.attr.productAttr.length ? key.split(",") : [];
						break;
					}
				}
				for (let i = 0; i < productAttr.length; i++) {
					this.$set(productAttr[i], "index", value[i]);
				}
				//sort();排序函数:数字-英文-汉字；
				let productSelect = this.productValue[value.join(",")];
				if (productSelect && productAttr.length) {
					this.$set(
						this.attr.productSelect,
						"store_name",
						this.storeInfo.store_name
					);
					this.$set(this.attr.productSelect, "image", productSelect.image ? productSelect.image : this
						.storeInfo.image);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "svip_price", productSelect.svip_price);
					this.$set(this.attr.productSelect, "stock", productSelect.stock);
					this.$set(this.attr.productSelect, "unique", productSelect.unique);
					this.$set(this, "uniqueValue", productSelect.unique);
					this.$set(this, "attrValue", value.join(","));
					this.$set(this, "attrTxt", "选择");
					if (productSelect.stock == 0) {
						this.$set(this.attr.productSelect, "cart_num", 0);
					} else {
						this.$set(this.attr.productSelect, "cart_num", this.min_count || 1);
					}
				} else if (!productSelect && productAttr.length) {
					this.$set(
						this.attr.productSelect,
						"store_name",
						this.storeInfo.store_name
					);
					this.$set(this.attr.productSelect, "image", this.storeInfo.image);
					this.$set(this.attr.productSelect, "price", this.storeInfo.price);
					this.$set(this.attr.productSelect, "svip_price", this.storeInfo.svip_price);
					this.$set(this.attr.productSelect, "stock", 0);
					this.$set(this.attr.productSelect, "unique", "");
					this.$set(this, "uniqueValue", "");
					this.$set(this.attr.productSelect, "cart_num", 0);
					this.$set(this, "attrValue", "");
					this.$set(this, "attrTxt", "选择");
				} else if (!productSelect && !productAttr.length) {
					this.$set(
						this.attr.productSelect,
						"store_name",
						this.storeInfo.store_name
					);
					this.$set(this.attr.productSelect, "image", this.storeInfo.image);
					this.$set(this.attr.productSelect, "price", this.storeInfo.price);
					this.$set(this.attr.productSelect, "svip_price", this.storeInfo.svip_price);
					this.$set(this.attr.productSelect, "stock", this.storeInfo.stock);
					this.$set(this.attr.productSelect, "unique", this.storeInfo.unique || "");
					this.$set(this, "uniqueValue", this.storeInfo.unique || "");
					this.$set(this.attr.productSelect, "cart_num", 1);
					this.$set(this, "attrValue", "");
					this.$set(this, "attrTxt", "选择");
				} else if (productSelect && !productAttr.length) {
					this.$set(this.attr.productSelect, "store_name", this.storeInfo.store_name);
					this.$set(this.attr.productSelect, "image", productSelect.image);
					this.$set(this.attr.productSelect, "price", productSelect.price);
					this.$set(this.attr.productSelect, "svip_price", productSelect.svip_price);
					this.$set(this.attr.productSelect, "stock", productSelect.stock);
					this.$set(this.attr.productSelect, "unique", productSelect.unique);
					this.$set(this, "uniqueValue", productSelect.unique);
					this.$set(this, "attrValue", value.join(","));
					this.$set(this, "attrTxt", "选择");
					if (productSelect.stock == 0) {
						this.$set(this.attr.productSelect, "cart_num", 0);
					} else {
						this.$set(this.attr.productSelect, "cart_num", this.min_count || 1);
					}
				}
			},
			/**
			 * 获取优惠券
			 *
			 */
			getCouponList() {
				let that = this;
				let goodsArr = []
				let couponList = [];
				let activeList = []
				getCoupons({
					ids: that.id
				}).then(res => {
					goodsArr = res.data
					getShopCoupons(that.storeInfo.mer_id).then(({
						data
					}) => {
						couponList = goodsArr.concat(data)
						that.$set(that.coupon, 'list', couponList);
						for (let i = 0; i < couponList.length; i++) {
							if (!couponList[i].issue && activeList.length < 2) {
								activeList.push(couponList[i]);
							}
						}
						that.$set(that, 'couponList', activeList);
					})
				});
			},
			ChangCouponsUseState(index) {
				let that = this;
				that.$set(that.coupon, 'coupon', false);
			},
			/**
			 *
			 *
			 * 收藏商品
			 */
			setCollect: function() {
				if (this.isLogin === false) {
					toLogin()
				} else {
					let that = this;
					if (this.storeInfo.isRelation) {
						collectDel({
							type: 0,
							type_id: this.id
						}).then(res => {
							that.$util.Tips({
								title: '已取消收藏'
							});
							that.$set(that.storeInfo, 'isRelation', !that.storeInfo.isRelation);
						}).catch(err => {
							that.$util.Tips({
								title: err
							});
						})
					} else {
						collectAdd({
							type_id: this.id,
							type: 0
						}).then(res => {
							that.$util.Tips({
								title: '收藏成功'
							});
							that.$set(that.storeInfo, 'isRelation', !that.storeInfo.isRelation);
						}).catch(err => {
							that.$util.Tips({
								title: err
							});
						})
					}
				}
			},
			/**
			 * 打开属性插件
			 */
			selecAttr: function() {
				this.$set(this.attr, 'cartAttr', true);
				this.$set(this, 'isOpen', true);
			},
			/**
			 * 打开优惠券插件
			 */
			couponTap: function() {
				let that = this;
				if (that.isLogin === false) {
					toLogin()
				} else {
					that.$set(that.coupon, 'coupon', true);
				}
			},
			goCustomer: function() {
				let that = this;
				if (that.isLogin === false) {
					toLogin()
				} else {
					uni.navigateTo({
						url: `/pages/chat/customer_list/chat?mer_id=${that.storeInfo.mer_id}&uid=${that.uid}&productId=${that.id}`
					});
				}
			},
			onMyEvent: function() {
				this.$set(this.attr, 'cartAttr', false);
				this.$set(this, 'isOpen', false);
			},
			/**
			 * 打开属性加入购物车
			 *
			 */
			joinCart: function(e) {
				//是否登录
				if (this.isLogin === false) {
					toLogin()
				} else {
					this.goCat();
				}
			},
			/*
			 * 加入购物车
			 */
			goCat: function(news) {
				let that = this,
					productSelect = that.productValue[this.attrValue];
				//打开属性
				if (that.attrValue) {
					//默认选中了属性，但是没有打开过属性弹窗还是自动打开让用户查看默认选中的属性
					that.attr.cartAttr = !that.isOpen ? true : false;
					// if(!that.isOpen)that.attr.cartAttr = true
				} else {
					if (that.isOpen) that.attr.cartAttr = true;
					else
						that.attr.cartAttr = !that.attr.cartAttr;
				}
				//只有关闭属性弹窗时进行加入购物车
				if (that.attr.cartAttr === true && that.isOpen === false)
					return (that.isOpen = true);
				that.isOpen = that.attr.cartAttr = true;
				//如果有属性,没有选择,提示用户选择
				if (
					that.attr.productAttr.length &&
					that.isOpen === true &&
					productSelect.stock == 0
				)
					return that.$util.Tips({
						title: "产品库存不足，请选择其它"
					});
				if (that.attr.productSelect.cart_num == 0) {
					return that.$util.Tips({
						title: '购买个数不能为0！'
					})
				}
				let q = {
					is_new: news === undefined ? 0 : 1,
					product_id: that.id,
					cart_num: that.attr.productSelect.cart_num,
					product_attr_unique: that.attr.productSelect !== undefined ? that.attr.productSelect.unique :
						"",
					source: this.source,
					product_type: 0,
					spread_id: this.currSpid
				};
				postCartAdd(q)
					.then(function(res) {
						that.isOpen = that.attr.cartAttr = false;
						let cartId = res.data.cart_id
						let arr = (Cache.get(CART_ID) && JSON.parse(Cache.get(CART_ID))) || []
						// let arr = []
						arr.push(cartId)
						Cache.set(CART_ID, Array.from([...new Set(arr)]))
						const timestamp = Date.now();
						Cache.set(CART_TIME, timestamp)
						if (news) {
							uni.navigateTo({
								url: '/pages/users/order_confirm/index?cartId=' + cartId
							});
						} else {
							that.$util.Tips({
								title: "添加购物车成功",
								success: () => {
									that.getCartCount(true);
								}
							});
						}
					})
					.catch(res => {
						return that.$util.Tips({
							title: res
						});
					});
			},
			/**
			 * 获取购物车数量
			 * @param boolean 是否展示购物车动画和重置属性
			 */
			getCartCount: function(isAnima) {
				let that = this;
				const isLogin = that.isLogin;
				if (isLogin) {
					getCartCounts().then(res => {
						that.CartCount = res.data[0].count;
						//加入购物车后重置属性
						if (isAnima) {
							that.animated = true;
							setTimeout(function() {
								that.animated = false;
							}, 500);
						}
					});
				}
			},
			/**
			 * 立即购买
			 */
			goBuy: function(e) {
				if (this.isLogin === false) {
					toLogin()
				} else {
					// this.goCat(true);
					this.$set(this, 'pay_close', true);
					this.order_id = this.id;
					this.pay_order_id = this.id.toString()
					this.$set(this, 'totalPrice', this.storeInfo.price);
				}
			},
			/**
			 * 分享打开
			 *
			 */
			listenerActionSheet: function() {
				if (this.isLogin === false) {
					toLogin()
				} else {
					// #ifdef H5
					if (this.$wechat.isWeixin() === true) {
						this.weixinStatus = true;
					}
					// #endif
					this.posters = true;
				}
			},
			// 分享关闭
			listenerActionClose: function() {
				this.posters = false;
				this.currentPage = false;
			},
			//隐藏海报
			posterImageClose: function() {
				this.posterImageStatus = false
			},
			//替换安全域名
			setDomain: function(url) {
				url = url ? url.toString() : '';
				//本地调试打开,生产请注销
				if (url.indexOf("https://") > -1) return url;
				else return url.replace('http://', 'https://');
			},
			/**
			 * 获取产品分销二维码
			 * @param function successFn 下载完成回调
			 *
			 */
			downloadFilePromotionCode: function(successFn) {
				let that = this;
				let type;
				// #ifndef MP
				type = 'wechat'
				// #endif
				// #ifdef MP
				type = 'routine'
				// #endif
				getProductCode(that.id, {
					type: type,
					product_type: 0
				}).then(async res => {
					that.codeImg = res.data.url
					that.$set(that, 'isDown', false);
				}).catch(err => {
					that.$set(that, 'isDown', false);
					that.$set(that, 'PromotionCode', '');
				});
			},
			// 小程序关闭分享弹窗；
			goFriend: function() {
				this.posters = false;
				this.currentPage = false;
			},
			/**
			 * 生成海报
			 */
			async goPoster() {
				if (this.posterImage) {
					this.posterImageStatus = true
					this.posters = false
					return
				}
				let that = this;
				let arr2
				that.posters = false;
				that.$set(that, 'canvasStatus', true);
				uni.showLoading({
					title: '海报生成中',
					mask: true
				});
				// #ifdef MP || APP-PLUS
				arr2 = [that.posterbackgd, await that.fileStoreImage(that.storeImage), await that.fileStoreImage(
					that.codeImg), await that.fileStoreImage(that.share_pic)];
				// #endif
				// #ifdef H5
				arr2 = [that.posterbackgd, await that.imgToBase(that.storeImage), await that.imgToBase(that.codeImg),
					await that.imgToBase(that.share_pic)
				];
				// #endif
				//生成推广海报
				that.$util.goodsPosterCanvas(arr2, that.storeInfo.store_name, that.storeInfo.price, that.site_name,
					that.storeInfo.ot_price,
					function(tempFilePath) {
						that.$set(that, 'posterImage', tempFilePath);
						that.$set(that, 'posterImageStatus', true);
						that.$set(that, 'actionSheetHidden', !that.actionSheetHidden);
						that.$set(that, 'canvasStatus', false);
					}, (err) => {
						that.$set(that, 'canvasStatus', false);
					});
			},
			//图片转符合安全域名路径
			fileStoreImage(url) {
				// #ifdef MP  || APP-PLUS
				let ishttps = url.split('//')[0] == 'https:'
				if (!ishttps) {
					url = 'https://' + url.split('//')[1]
				}
				// #endif
				return new Promise((resolve, reject) => {
					let that = this;
					console.log(url, 'urlurlurlurl')
					uni.downloadFile({
						url: url,
						success: function(res) {
							resolve(res.tempFilePath);
						},
						fail: function() {
							return that.$util.Tips({
								title: ''
							});
						}
					});
				})
			},
			/*
			 * 保存到手机相册
			 */
			// #ifdef MP
			savePosterPath: function() {
				let that = this;
				uni.getSetting({
					success(res) {
						if (!res.authSetting['scope.writePhotosAlbum']) {
							uni.authorize({
								scope: 'scope.writePhotosAlbum',
								success() {
									uni.saveImageToPhotosAlbum({
										filePath: that.posterImage,
										success: function(res) {
											that.posterImageClose();
											that.$util.Tips({
												title: '保存成功',
												icon: 'success'
											});
										},
										fail: function(res) {
											that.$util.Tips({
												title: '保存失败'
											});
										}
									})
								}
							})
						} else {
							uni.saveImageToPhotosAlbum({
								filePath: that.posterImage,
								success: function(res) {
									that.posterImageClose();
									that.$util.Tips({
										title: '保存成功',
										icon: 'success'
									});
								},
								fail: function(res) {
									that.$util.Tips({
										title: '保存失败'
									});
								},
							})
						}
					}
				})
			},
			// #endif
			// #ifdef APP-PLUS
			savePosterPath() {
				let that = this
				uni.saveImageToPhotosAlbum({
					filePath: that.posterImage,
					success: function(res) {
						that.posterImageClose();
						that.$util.Tips({
							title: '保存成功',
							icon: 'success'
						});
					},
					fail: function(res) {
						that.$util.Tips({
							title: '保存失败'
						});
					},
				})
			},
			// #endif
			//#ifdef H5
			ShareInfo() {
				let data = this.storeInfo;
				let href = location.href;
				if (this.$wechat.isWeixin()) {
					getUserInfo().then(res => {
						href =
							href.indexOf("?") === -1 ?
							href + "?spid=" + res.data.uid :
							href + "&spid=" + res.data.uid;

						let configAppMessage = {
							desc: data.store_info,
							title: data.store_name,
							link: href,
							imgUrl: data.image
						};
						this.$wechat.wechatEvevt([
							"updateAppMessageShareData",
							"updateTimelineShareData",
							"onMenuShareAppMessage",
							"onMenuShareTimeline"
						], configAppMessage).then(res => {}).catch(err => {
							console.log(err);
						})
					});
				}
			},
			//#endif
			async imgToBase(url) {
				let res = await imgToBase({
					image: url
				})
				return res.data.image
			},
			//复制口令
			copyPwd() {
				let that = this;
				copyPasswordApi({
					id: that.id,
					product_type: 0
				}).then(async res => {
					that.copyUrl = res.data.str;
					that.posters = false
					that.isCopy = true;
				})
			},
			closeCopy() {
				this.isCopy = false
			},
			// APP分享
			appShare(scene) {
				let that = this
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let curRoute = routes[routes.length - 1].$page.fullPath // 获取当前页面路由，也就是最后一个打开的页面路由
				uni.share({
					provider: "weixin",
					scene: scene,
					type: 0,
					// href: `${HTTP_REQUEST_URL}${curRoute}&spid=${that.uid}`,
					href: `http://app-qh.cg24.cn?&uid=${that.uid}&spid=${that.uid}&type=goods`,
					title: that.storeInfo.store_name,
					summary: that.storeInfo.store_info,
					imageUrl: that.storeInfo.image,
					success: function(res) {
						uni.showToast({
							title: '分享成功',
							icon: 'success'
						})
						that.posters = false;
						uni.hideLoading();
					},
					fail: function(err) {
						uni.showToast({
							title: '分享失败',
							icon: 'none',
							duration: 2000
						})
						that.posters = false;
						uni.hideLoading();
					}
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	.product-intro {
		background-color: #fff;
	}

	.ml8 {
		top: 2rpx
	}

	.activity_pin {
		width: auto;
		height: 44rpx;
		line-height: 44rpx;
		background: linear-gradient(90deg, rgba(233, 51, 35, 1) 0%, rgba(250, 101, 20, 1) 100%);
		opacity: 1;
		border-radius: 22rpx;
		padding: 0 15rpx;
		margin-left: 19rpx;
	}

	.activity_miao {
		width: auto;
		height: 44rpx;
		line-height: 44rpx;
		padding: 0 15rpx;
		background: linear-gradient(90deg, rgba(250, 102, 24, 1) 0%, rgba(254, 161, 15, 1) 100%);
		opacity: 1;
		border-radius: 22rpx;
		margin-left: 19rpx;
	}

	.iconfonts {
		color: #fff !important;
		font-size: 28rpx;
	}

	.activity_title {
		font-size: 24rpx;
		color: #fff;
	}

	.activity_kan {
		width: auto;
		height: 44rpx;
		line-height: 44rpx;
		padding: 0 15rpx;
		background: linear-gradient(90deg, rgba(254, 159, 15, 1) 0%, rgba(254, 178, 15, 1) 100%);
		opacity: 1;
		border-radius: 22rpx;
		margin-left: 19rpx;
	}

	.t-color {
		color: var(--view-theme);
	}

	.p-color {
		color: var(--view-priceColor);
	}

	.bt-color {
		background-color: var(--view-theme);
		border: 1px solid var(--view-theme);
	}

	.head-bar {
		background: #fff;
	}

	.generate-posters {
		width: 100%;
		height: 170rpx;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 388;
		transform: translate3d(0, 100%, 0);
		transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
		border-top: 1px solid #eee;
	}

	.generate-posters.on {
		transform: translate3d(0, 0, 0);
	}

	.generate-posters .item {
		/* #ifdef H5 */
		flex: 50%;
		/* #endif */
		/* #ifndef H5 */
		flex: 33.33%;
		/* #endif */
		text-align: center;
		font-size: 30rpx;

		&.item3 {
			flex: 33.33%;
		}
	}

	.generate-posters .item .iconfont {
		font-size: 80rpx;
		color: #5eae72;
	}

	.generate-posters .item .iconfont.icon-haibao {
		color: #5391f1;
	}

	.generate-posters .item .iconfont.icon-fuzhikouling1 {
		color: #FBB324;
	}

	.product-con .footer {
		padding: 0 30rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		box-sizing: border-box;
		height: 100rpx;
		height: calc(100rpx + constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		height: calc(100rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		background-color: #fff;
		z-index: 10;
		border-top: 1px solid #f0f0f0;

		&.footpl {
			padding-left: 80rpx;
		}
	}

	.product-con .footer .item {
		font-size: 18rpx;
		color: #666;
		text-align: center;
	}

	.product-con .attribute .atterTxt {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		display: inline-block;
		width: 400rpx;
	}

	.product-con .attribute .params {
		margin-right: 20rpx;
		font-size: 28rpx;
		color: #282828;

		&:nth-child(2) {
			margin-right: 0;
		}
	}

	.product-con .attribute .atterTxt1 {
		color: #282828;

		&.hasAttr {
			&:after {
				content: "";
				display: inline-block;
				position: relative;
				top: -6rpx;
				margin: 0 6rpx;
				width: 5rpx;
				height: 5rpx;
				background-color: #282828;
				border-radius: 100%;
			}

			&:last-child {
				&:after {
					display: none;
				}
			}
		}
	}

	.product-con .wrapper .coupon .activity {
		border: 1px solid var(--view-theme);
		color: var(--view-theme);

		&::before,
		&::after {
			border: 1px solid var(--view-theme);
		}

		&::before {
			border-left-color: #ffffff;
		}

		&::after {
			border-right-color: #ffffff;
		}
	}

	.product-con .guaranteeAttr {
		display: inline-block;
		width: 560rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.product-con .footer .item .iconfont {
		text-align: center;
		font-size: 40rpx;
	}

	.fenxiang_btn {
		.icon-yishoucang2 {
			color: var(--view-priceColor) !important;
		}
	}

	.product-con .wrapper .introduce {
		margin: 20rpx 30rpx 0;

		&.atmosphere {
			padding: 20rpx 30rpx;
			margin: 0;
			justify-content: space-between;
			align-items: flex-start;

			.title {
				width: 540rpx;
			}
		}

		.font-bg-red {
			position: relative;
			/* #ifdef H5 */
			top: -2rpx;
			/* #endif */
			/* #ifndef H5 */
			top: -4rpx;
			/* #endif */
		}
	}

	.product-con .footer .item .iconfont.icon-shoucang1 {
		color: var(--view-priceColor);
	}

	.integral_count {
		padding: 0 30rpx;
	}

	.product-con .integral {
		display: inline-block;
		margin: 20rpx 30rpx 0 0;
		color: #FF9000;
		background-color: #FFF4E6;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 22rpx;
		padding: 0 26rpx;
		font-size: 24rpx;
		font-weight: normal;

		&:last-child {
			margin-left: 0;
		}
	}

	.product-con .footer .item .iconfont.icon-gouwuche1 {
		font-size: 40rpx;
		position: relative;
	}

	.product-con .footer .item .iconfont.icon-gouwuche1 .num {
		color: #fff;
		position: absolute;
		font-size: 18rpx;
		height: 30rpx;
		border-radius: 200rpx;
		padding: 0 8rpx;
		box-sizing: border-box;
		top: -10rpx;
		right: -10rpx;
		background-color: var(--view-theme);
		min-width: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.product-con .footer .bnt {
		width: 100%;
		height: 76rpx;
	}

	.product-con .footer .bnt .bnts {
		width: 100%;
		text-align: center;
		line-height: 76rpx;
		color: #fff;
		font-size: 28rpx;

		&.sold_out {
			width: 444rpx;
			border-radius: 50rpx;
		}

		&.virtual_buy {
			width: 444rpx;
			border-radius: 50rpx;
		}
	}

	.product-con .footer .bnt .joinCart {
		border-radius: 50rpx 0 0 50rpx;
		background-image: linear-gradient(90deg, var(--view-bntColor11) 0%, var(--view-bntColor12) 100%);

		&.disabled {
			background: #bbb;
		}
	}

	.product-con .footer .bnt .buy {
		width: 100%;
		border-radius: 50rpx;
		background-image: linear-gradient(90deg, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
	}

	.product-con .footer .bnt .buy[disabled] {
		background: #bbb;
	}

	.product-con .superior {
		background-color: #fff;
		margin-top: 20rpx;
		padding-bottom: 10rpx;
	}

	.product-con .superior .title {
		height: 98rpx;
	}

	.product-con .superior .title image {
		width: 30rpx;
		height: 30rpx;
	}

	.product-con .superior .title .titleTxt {
		margin: 0 20rpx;
		font-size: 30rpx;
		background-image: linear-gradient(to right, #f57a37 0%, #f21b07 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.product-con .superior .slider-banner {
		width: 690rpx;
		margin: 0 auto;
		position: relative;
	}

	.product-con .superior .slider-banner swiper {
		height: 100%;
		width: 100%;
	}

	.product-con .superior .slider-banner swiper-item {
		height: 100%;
	}

	.product-con .superior .slider-banner .list {
		width: 100%;
	}

	.product-con .superior .slider-banner .list .item {
		width: 215rpx;
		margin: 0 22rpx 30rpx 0;
		font-size: 26rpx;
	}

	.product-con .superior .slider-banner .list .item:nth-of-type(3n) {
		margin-right: 0;
	}

	.product-con .superior .slider-banner .list .item .pictrue {
		position: relative;
		width: 100%;
		height: 215rpx;
	}

	.product-con .superior .slider-banner .list .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}

	.product-con .superior .slider-banner .list .item .name {
		color: #282828;
		margin-top: 12rpx;
	}

	.product-con .superior .slider-banner .swiper-pagination-bullet {
		background-color: #999;
	}

	.product-con .superior .slider-banner .swiper-pagination-bullet-active {
		background-color: #e93323;
	}

	.svipCon {
		height: 64rpx;
		padding: 0 20rpx;
		margin: 8rpx 20rpx 0;
		background: #FAE3BB;
		font-size: 24rpx;
		color: #B37400;
		border-radius: 10rpx;

		image {
			width: 38rpx;
			height: 38rpx;
			margin-right: 20rpx;
		}
	}

	.svipCon .svipBtn {
		font-size: 22rpx;

		.iconfont {
			font-size: 18rpx;
			margin-left: 4rpx;
		}
	}

	button {
		padding: 0;
		margin: 0;
		line-height: normal;
		background-color: #fff;
	}

	button::after {
		border: 0;
	}

	action-sheet-item {
		padding: 0;
		height: 240rpx;
		align-items: center;
		display: flex;
	}

	.contact {
		font-size: 16px;
		width: 50%;
		background-color: #fff;
		padding: 8rpx 0;
		border-radius: 0;
		margin: 0;
		line-height: 2;
	}

	.contact::after {
		border: none;
	}

	.action-sheet {
		font-size: 17px;
		line-height: 1.8;
		width: 50%;
		position: absolute;
		top: 0;
		right: 0;
		padding: 25rpx 0;
	}

	.canvas {
		z-index: 300;
		width: 750px;
		height: 1190px;
	}

	.poster-pop {
		width: 600rpx;
		height: 897rpx;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		z-index: 399;
		top: 50%;
		margin-top: -500rpx;
	}

	.poster-pop image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.poster-pop .close {
		width: 46rpx;
		height: 75rpx;
		position: fixed;
		right: 0;
		top: -73rpx;
		display: block;
	}

	.poster-pop .save-poster {
		background-color: #df2d0a;
		font-size: 22rpx;
		color: #fff;
		text-align: center;
		height: 76rpx;
		line-height: 76rpx;
		width: 100%;
		border-radius: 43rpx;
		margin-top: 20rpx;
	}

	.poster-pop .keep {
		color: #fff;
		text-align: center;
		font-size: 25rpx;
		margin-top: 10rpx;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 9;
	}

	.pictrue_log {
		width: 80upx;
		height: 40upx;
		border-radius: 6upx 0 12upx 0;
		line-height: 40upx;
		font-size: 24upx;
	}

	.pictrue_log_class {
		z-index: 3;
		background: -webkit-gradient(linear, left top, right top, from(rgba(246, 122, 56, 1)), to(rgba(241, 27, 9, 1)));
		background: linear-gradient(90deg, rgba(246, 122, 56, 1) 0%, rgba(241, 27, 9, 1) 100%);
		opacity: 1;
		position: absolute;
		top: 0;
		left: 0;
		color: #fff;
		text-align: center;
	}

	.navbar .header {
		height: 96rpx;
		font-size: 30rpx;
		color: #050505;
		background-color: #fff;
		/* #ifdef MP */
		padding-right: 95rpx;
		/* #endif */
	}

	.navbar .header .item {
		position: relative;
		margin: 0 25rpx;
	}

	.navbar .header .item.on:before {
		position: absolute;
		width: 60rpx;
		height: 5rpx;
		background-repeat: no-repeat;
		content: "";
		background-image: linear-gradient(to right, #ff3366 0%, #ff6533 100%);
		bottom: -10rpx;
		left: 50%;
		margin-left: -28rpx;
	}

	.navbar {
		position: fixed;
		background-color: #fff;
		top: 0;
		left: 0;
		z-index: 99;
		width: 100%;
	}

	.navbar .navbarH {
		position: relative;
	}

	.navbar .navbarH .navbarCon {
		position: absolute;
		bottom: 0;
		height: 100rpx;
		width: 100%;
	}

	.share-box {
		z-index: 1000;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.store-wrapper {
		margin-top: 20rpx;
		background-color: #fff;

		.store-hd {
			padding: 30rpx;
			border-bottom: 1px solid #F5F5F5;

			.store-info {
				position: relative;
				display: flex;

				.store-margin {
					width: 24rpx;
					height: 26rpx;
					margin-left: 10rpx;
				}

				.logo {
					width: 86rpx;
					height: 86rpx;

					image {
						width: 86rpx;
						height: 86rpx;
						border-radius: 6rpx;
					}
				}

				.info {
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin-left: 20rpx;

					.name {
						font-size: 28rpx;
						color: #282828;
						font-weight: bold;
						display: flex;
						align-items: center;
					}

					.txt {
						margin-top: 8rpx;
						color: #666666;
						font-size: 22rpx;
					}
				}

				.link {
					position: absolute;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
					display: flex;
					align-items: center;
					justify-content: center;
					width: 114rpx;
					height: 50rpx;
					background-image: linear-gradient(-90deg, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
					border-radius: 25rpx;
					color: #fff;
				}
			}

			.score-wrapper {
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;

				.item {
					color: #948D8C;
					font-size: 26rpx;

					text {
						margin-left: 10rpx;
						color: var(--view-priceColor);
					}
				}
			}
		}

		.con-box {
			padding: 20rpx 30rpx 0;

			.title {
				font-size: 28rpx;
				color: #282828;
			}

			.moer-btn {
				font-size: 28rpx;
				color: #999999;
			}

			.img-box {
				.img-item {
					width: 220rpx;
					margin: 30rpx 15rpx 0 0;
					display: inline-block;

					&:nth-child(3n) {
						margin-right: 0;
					}

					/deep/image,
					/deep/uni-image,
					/deep/.easy-loadimage {
						width: 218rpx;
						height: 220rpx;
						border-radius: 16rpx;
						display: inline-block;
					}

					.txt {
						.title {
							font-size: 28rpx;
							color: #282828;
							margin-top: 15rpx;
						}

						.price {
							color: var(--view-priceColor);
							font-size: 28rpx;

							text {
								font-size: 20rpx;
							}
						}
					}
				}
			}

			/deep/.uni-swiper-dot {
				width: 8rpx;
				height: 4rpx;
				background: rgba(0, 0, 0, .15);
			}

			/deep/.uni-swiper-dot-active {
				width: 16rpx;
				background: var(--view-theme);
			}

			.page_swiper,
			swiper {
				height: 760rpx;
			}
		}
	}

	.sys-head {
		background: transparent;
	}

	.swiper-item,
	/deep/uni-swiper-wrapper,
	/deep/uni-swiper {
		height: 740rpx !important;
	}

	.head-wrapper {
		z-index: 999;
		display: flex;
		align-items: center;
		position: fixed;
		left: 30rpx;
		top: 0;
	}

	.head-menu {
		display: flex;
		align-items: center;
		height: 58rpx;
		width: 158rpx;
		background: rgba(255, 255, 255, 0.302);
		border: 2rpx solid rgba(0, 0, 0, 0.0588);
		border-radius: 29rpx;

		.iconfont {
			flex: 1;
			text-align: center;
			color: #000000;
			box-sizing: border-box;

			&.icon-fanhui2 {
				border-right: 1px solid rgba(0, 0, 0, 0.2);
				;
			}
		}
	}
</style>