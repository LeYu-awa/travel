<template>
	<view class="wrap">
		<skeleton :show="showSkeleton" :isNodes="isNodes" ref="skeleton" loading="chiaroscuro" selector="skeleton"
			bgcolor="transparent"></skeleton>
		<!-- 自定义顶部背景颜色 -->
		<view class="top">
			<view class="sys-head">
				<view class="sys-bar" :style="{height:sysHeight}"></view>
				<view class="sys-title">个人中心</view>
				<view class="bg"></view>
			</view>
			<view class="right-btn">
				<view class="btn" hover-class="none">
					<view class="iconfont icon-kefu" style="color: #333;"></view>
					<text class="iconnum" v-if="userInfo.total_unread">{{userInfo.total_unread}}</text>
				</view>
				<view class="btn" @click="authTo('/pages/chat/customer_list/index?type=0')" hover-class="none">
					<view class="iconfont icon-xiaoxi" style="color: #333;"></view>
					<text class="iconnum" v-if="userInfo.total_unread">{{userInfo.total_unread}}</text>
				</view>
				<view class="iconfont icon-shezhi" style="color: #333;" v-if="isLogin" @click="goSetting()"></view>
			</view>
		</view>
		<!-- 自定义顶部背景颜色 -->
		<view class="new-users skeleton" :style="{visibility: showSkeleton ? 'hidden' : 'visible'}">
			<view class="head">
				<view class="user-card" :class="svip_switch_status == 1 ? 'svip-card' : ''">
					<view class="bg"></view>
					<view class="user-info">
						<view class="avatar-box" :class="{on:userInfo.is_svip > 0 && svip_switch_status == 1}">
							<image class="avatar skeleton-radius"
								:src="userInfo.avatar ? userInfo.avatar : '/static/images/f.png'" @click="goEdit">
							</image>
							<view class="headwear" v-if="userInfo.is_svip > 0 && svip_switch_status == 1">
								<image :src="`${domain}/static/images/headwear.png`"></image>
							</view>
						</view>
						<view class="info">
							<!--#ifdef MP-->
							<view class="name" v-if="!userInfo.uid" @click="openAuto">
								请点击授权
							</view>
							<!--#endif-->
							<!--#ifdef APP-PLUS-->
							<view class="name" v-if="!userInfo.uid" @click="openAuto">
								请点击登录
							</view>
							<!--#endif-->
							<!--#ifdef H5-->
							<view class="name" v-if="!userInfo.uid" @click="openAuto">
								<text v-if="isWeixin">请点击授权</text>
								<text v-else>请点击登录</text>
							</view>
							<!--#endif-->
							<view class="name" v-if="userInfo.uid">
								{{userInfo.nickname}}
								<!-- <view class="vip" v-if="userInfo.is_svip > 0 && svip_switch_status == 1"> -->
								<view class="vip" v-if="userInfo.brokerage_level==0" >
									<image class="level_icon" :src="userInfo.member_icon" alt="" />
								</view>
								<view class="vip-bg" v-if="userInfo.brokerage_level!=0">
									<image v-if="member_status" src="/static/images/dengji2.png" class="level_icon"></image>
									<view v-if="userInfo.brokerage_level==1">青铜会员</view>
									<view v-if="userInfo.brokerage_level==2">白银会员</view>
									<view v-if="userInfo.brokerage_level==3">黄金会员</view>
									<view v-if="userInfo.brokerage_level==4">铂金会员</view>
									<view v-if="userInfo.brokerage_level==5">钻石会员</view>
								</view>
							</view>
							<!-- <view class="num" v-if="userInfo.phone" @click="goEdit()">
								<view class="num-txt">{{userInfo.phone}}</view>
								<view class="icon">
									<image src="/static/images/edit.png" mode=""></image>
								</view>
							</view> -->
							<view class="phone" v-if="!userInfo.phone && isLogin" @tap="bindPhone">绑定手机号</view>
						</view>
					</view>
					<view class="num-wrapper skeleton-rect">
						<view class="num-item" @click="goMenuPage('/pages/users/user_goods_collection/index')">
							<text class="num">{{userInfo.total_collect_product || 0}}</text>
							<view class="txt">我的收藏</view>
						</view>
						<view v-if="hide_mer_status != 1" class="num-item"
							@click="goMenuPage('/pages/users/user_goods_collection/index?tab=2')">
							<text class="num">{{userInfo.total_collect_store || 0}}</text>
							<view class="txt">关注店铺</view>
						</view>
						<view class="num-item" @click="goMenuPage('/pages/users/browsingHistory/index')">
							<text class="num">{{userInfo.total_visit_product || 0}}</text>
							<view class="txt">浏览记录</view>
						</view>
						<view class="num-item" @click="goMenuPage('/pages/users/user_coupon/index')">
							<text class="num">{{userInfo.total_coupon || 0}}</text>
							<view class="txt">优惠券</view>
						</view>
					</view>
					<view @click="goSvip" class="cardVipA acea-row row-between-wrapper" v-if="svip_switch_status == 1">
						<image class="svip_user" :src="`${domain}/static/images/svip_user.png`"></image>
						<view class="left-box">
							<view v-if="userInfo.is_svip > 0" class="small">累计为您节省{{userInfo.svip_save_money}}元</view>
							<view v-else-if="userInfo.is_svip <= 0" class="small">开通享六大特权，省钱又省心
							</view>
						</view>
						<view class="acea-row row-middle">
							<view class="btn-open">
								{{userInfo.is_svip > 0 && userInfo.is_svip != 3  ? '立即续费' : userInfo.is_svip == 3 ? '终身会员' : '立即开通'}}
							</view>
						</view>
					</view>

				</view>
			</view>
			<view class="wrapper">
				<view class="middle-box">
					<view class="item">
						<view class="left">
							<view class="title">商家入驻</view>
							<view class="desc">在家也可以赚钱</view>
						</view>
						<view class="right">
							<image src="/static/images/user/ruzhu.png"></image>
						</view>
					</view>
					<view class="item">
						<view class="right">
							<view class="title">问题反馈</view>
							<view class="desc">即时解决您的问题</view>
						</view>
						<view class="right">
							<image src="/static/images/user/fankui.png"></image>
						</view>
					</view>
				</view>
				<view class="order-wrapper">
					<view class="order-hd flex skeleton-rect">
						<view class="left">我的订单</view>
						<view class="right flex" @click="authTo('/pages/users/order_list/index?status=-1')"
							hover-class="none" open-type="navigate">
							全部订单
							<text class="iconfont icon-xiangyou"></text>
						</view>
					</view>
					<view class="order-bd">
						<block v-for="(item,index) in orderMenu" :key="index">
							<view class="order-item" @click="authTo(item.url)" hover-class="none">
								<view class="pic">
									<image :src="item.img" class="order-img"></image>
									<!-- <text class="iconfont" :class="item.icon"></text> -->
									<text class="order-status-num" v-if="item.num > 0">{{ item.num }}</text>
								</view>
								<view class="txt skeleton-rect">{{item.title}}</view>
							</view>
						</block>
					</view>
				</view>
				<!-- 轮播 -->
				<!-- <view class="slider-wrapper skeleton-rect" v-if="imgUrls.length>0">
					<swiper indicator-dots="true" :autoplay="autoplay" :circular="circular" :interval="interval"
						:duration="duration" indicator-color="rgba(255,255,255,0.6)" indicator-active-color="#fff">
						<block v-for="(item,index) in imgUrls" :key="index">
							<swiper-item>
								<view @click="goUrl(item.url)" class='slide-navigator acea-row row-between-wrapper'>
									<image :src="item.pic" class="slide-image"></image>
								</view>
							</swiper-item>
						</block>
					</swiper>
				</view> -->
				<!-- 会员菜单 -->
				<view class="user-menus" style="margin-top: 20rpx;">
					<!-- <view class="title skeleton-rect">我的服务</view> -->
					<view class="menu-box">
						<block v-for="(item,index) in personalMenu" :key="index">
							<view v-if="item.isShow" class="item">
								<view @click="authTo(item.url)" class="item-count">
									<image v-if="showSkeleton" class="skeleton_image skeleton-radius"></image>
									<image v-else :src="item.pic"></image>
									<text>{{item.name}}</text>
								</view>
							</view>
						</block>
					</view>
				</view>
				<view class="limits-box">
					<view class="item">
						<view class="left">
							<image src="/static/images/user/tongzhi.png"></image>
						</view>
						<view class="center">
							<view class="title">开启推送权限</view>
							<view class="desc">获得及时信息及时推送</view>
						</view>
						<view class="right">
							<view class="btn">去开启 <text class="iconfont icon-xiangyou"></text></view>
						</view>
					</view>
					<view class="item">
						<view class="left">
							<image src="/static/images/user/renzheng.png"></image>
						</view>
						<view class="center">
							<view class="title">实名认证</view>
							<view class="desc">保护账号资产安全</view>
						</view>
						<view class="right">
							<view class="btn">去认证 <text class="iconfont icon-xiangyou"></text></view>
						</view>
					</view>
					<view class="item" @click="goSetting()">
						<view class="left">
							<image src="/static/images/user/shezhi.png"></image>
						</view>
						<view class="center">
							<view class="title">账号设置</view>
							<view class="desc">资料设置及账号管理</view>
						</view>
						<view class="right">
							<view class="btn">去设置 <text class="iconfont icon-xiangyou"></text></view>
						</view>
					</view>
				</view>
				<view class="menus-list-item" v-if="!userInfo.topService && userInfo.service" @click="toService(0)">
					<view class="item-text">
						<view class="title">
							<text class="merchant">商家</text>管理
						</view>
						<view class="info">进入商户中心管理店铺</view>
					</view>
					<view class="image merchant-image"
						:style="{'background-image':`url(${domain}/static/images/merchant-image.png)`}"></view>
				</view>
				<view class="menus-list-item" v-if="!userInfo.service && userInfo.topService" @click="toService(1)">
					<view class="item-text">
						<view class="title">
							<text class="plantform">平台</text>管理
						</view>
						<view class="info">进入平台客服中心</view>
					</view>
					<view class="image plantform-image"
						:style="{'background-image':`url(${domain}/static/images/plantform-image.png)`}"></view>
				</view>
				<view class="menu-list-count" v-if="userInfo.topService && userInfo.service">
					<view class="menu-item" @click="toService(0)">
						<view class="image merchant-image"
							:style="{'background-image':`url(${domain}/static/images/merchant-image.png)`}"></view>
						<view class="menu-text">
							<view class="title">
								<text class="merchant">商家</text>管理
							</view>
							<view class="info">进入商家管理中心</view>
						</view>
					</view>
					<view class="menu-item" @click="toService(1)">
						<view class="menu-text">
							<view class="title">
								<text class="plantform">平台</text>管理
							</view>
							<view class="info">进入平台客服中心</view>
						</view>
						<view class="image plantform-image"
							:style="{'background-image':`url(${domain}/static/images/plantform-image.png)`}"></view>
					</view>
				</view>
			</view>
			<view v-if="copyright.status !== -1" class="copy-right">
				<image class="img-copyright" :src="copyright.image" mode="widthFix"></image>
				<view class="text">{{copyright.Copyright}}</view>
			</view>
			<view v-else class="copy-right">
				<view class="iconfont icon-crmeb"></view>
				<view class="text">©️众邦科技版权所有</view>
			</view>
			<view style="height: 50rpx;"></view>
			<!-- #ifndef H5 -->
			<passwordPopup></passwordPopup>
			<!-- #endif -->
		</view>
		<!--自定义底部tab栏-->
		<customTab :newData="newData" :activeRouter="activeRouter"></customTab>
	</view>
</template>
<script>
	let sysHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	import {
		getMenuList,
		getUserInfo,
		setVisit
	} from '@/api/user.js';
	import {
		getVersion,
		getNavigation
	} from "@/api/public";
	import {
		orderData
	} from '@/api/order.js'
	import {
		mapGetters
	} from "vuex";
	import dayjs from '@/plugin/dayjs/dayjs.min.js';
	import Cache from '@/utils/cache';
	// #ifndef H5
	import passwordPopup from '@/components/passwordPopup';
	// #endif
	import customTab from '@/components/customTab';
	import {
		configMap
	} from '@/utils';
	import Auth from '../../libs/wechat';
	import {
		HTTP_REQUEST_URL
	} from '@/config/app';
	import {
		toLogin
	} from '@/libs/login.js';
	const app = getApp();
	export default {
		components: {
			// #ifndef H5
			passwordPopup,
			// #endif
			customTab
		},
		computed: configMap({
			mer_intention_open: 0,
			hide_mer_status: 0,
			recharge_switch: 0,
			integral_status: 0,
			member_status: 0,
			balance_func_status: 0,
			svip_switch_status: 0,
			navigation: {}
		}, mapGetters(['isLogin', 'viewColor', 'keyColor'])),
		filters: {
			dateFormat: function(value) {
				return dayjs(value * 1000).format('YYYY-MM-DD');
			}
		},
		data() {
			return {
				//#ifdef H5
				isWeixin: this.$wechat.isWeixin(),
				//#endif
				domain: HTTP_REQUEST_URL,
				showSkeleton: true, //骨架屏显示隐藏
				isNodes: 0, //控制什么时候开始抓取元素节点,只要数值改变就重新抓取
				orderMenu: [{
						img: '/static/images/user/index1.png',
						icon: 'icon-daifukuan1',
						title: '待付款',
						url: '/pages/users/order_list/index?status=0',
						num: 0
					},
					{
						img: '/static/images/user/index2.png',
						icon: 'icon-daifahuo1',
						title: '待发货',
						url: '/pages/users/order_list/index?status=1',
						num: 0
					},
					{
						img: '/static/images/user/index3.png',
						icon: 'icon-daishouhuo1',
						title: '待收货',
						url: '/pages/users/order_list/index?status=2',
						num: 0
					},
					// {
					// 	icon: 'icon-daipingjia1',
					// 	title: '待评价',
					// 	url: '/pages/users/order_list/index?status=3',
					// 	num: 0
					// },
					{
						img: '/static/images/user/index4.png',
						icon: 'icon-a-shouhoutuikuan1',
						title: '售后/退款',
						url: '/pages/users/refund/list',
						num: 0
					},
				],
				imgUrls: [{
					url: '',
					pic: ''
				}],
				userMenu: [],
				skeletonMenu: [],
				personalMenu: [{
						pic: '',
						name: '',
						isShow: true
					},
					{
						pic: '',
						name: '',
						isShow: true
					},
					{
						pic: '',
						name: '',
						isShow: true
					},
					{
						pic: '',
						name: '',
						isShow: true
					},
					{
						pic: '',
						name: '',
						isShow: true
					},
					{
						pic: '',
						name: '',
						isShow: true
					},
					{
						pic: '',
						name: '',
						isShow: true
					},
					{
						pic: '',
						name: '',
						isShow: true
					},
					{
						pic: '',
						name: '',
						isShow: true
					},
					{
						pic: '',
						name: '',
						isShow: true
					},
					{
						pic: '',
						name: '',
						isShow: true
					},
					{
						pic: '',
						name: '',
						isShow: true
					}
				],
				autoplay: true,
				circular: true,
				interval: 3000,
				duration: 500,
				orderStatusNum: {},
				userInfo: {
					aratar: '/static/f.png',
					is_svip: 0
				},
				MyMenus: [],
				is_promoter: 0, //推广人开关  1开
				extension_status: 0,
				copyright: {
					copyright_status: 1
				},
				newData: {},
				activeRouter: '',
				sysHeight: sysHeight,
			}
		},
		onLoad() {

		},
		onReady() {
			this.isNodes++;
		},
		mounted: function() {
			this.getVersion()
		},
		onShow: function() {
			let that = this;
			let routes = getCurrentPages();
			let curRoute = routes[routes.length - 1].route
			this.activeRouter = '/' + curRoute
			this.getNav();
			if (that.isLogin) {
				this.getUserInfo();
				this.orderNum();
			} else {
				// this.userInfo = {
				// 	is_svip: 0
				// }
				this.orderMenu.forEach(v => {
					v.num = 0
				})
				this.getMyMenus();
			}
			setTimeout(() => {
				this.showSkeleton = false
			}, 500)
		},
		methods: {
			authTo(url) {
				if (this.isLogin) {
					uni.navigateTo({
						url: url
					})
				} else {
					this.openAuto()
				}
			},
			goSvip() {
				if (this.isLogin) {
					if (this.userInfo.is_svip > 0) {
						uni.navigateTo({
							url: '/pages/annex/vip_center/index'
						})
					} else {
						uni.navigateTo({
							url: '/pages/annex/vip_paid/index'
						})
					}
				} else {
					this.openAuto()
				}

			},
			goRouter(item) {
				var pages = getCurrentPages();
				var page = (pages[pages.length - 1]).$page.fullPath;
				if (item.link == page) return
				uni.switchTab({
					url: item.link,
					fail(err) {
						uni.redirectTo({
							url: item.link
						})
					}
				})
			},
			getNav() {
				getNavigation().then(res => {
					this.newData = res.data
					if (this.newData.status && this.newData.status.status) {
						uni.hideTabBar()
					} else {
						uni.showTabBar()
					}
				})
			},
			toService(is_sys) {
				uni.navigateTo({
					url: '/pages/admin/business/index?is_sys=' + is_sys
				})
			},
			getVersion() {
				getVersion().then(data => {
					this.copyright = data.data;
				});
			},
			// 菜单显示
			filterMenus: function(item) {
				let that = this;
				if (item.url == '/pages/users/user_money/index') item.isShow = that.balance_func_status == 1
				else if (item.url == '/pages/users/user_spread_user/index') {
					if (that.extension_status == 0) {
						item.isShow = false
					} else if (that.extension_status == 1) {
						if (that.is_promoter == 1) {
							item.isShow = that.is_promoter == 1 && that.extension_status == 1
						} else if (that.is_promoter == 0) {
							item.isShow = that.is_promoter == 0 && that.extension_status == 1
							item.url = "/pages/users/distributor/index"
						}
					}
				} else if (item.url == '/pages/store/settled/index') item.isShow = that.mer_intention_open == 1
				else if (item.url == '/pages/users/user_grade/index') item.isShow = that.member_status == 1
				else if (item.url == '/pages/users/user_integral/index') item.isShow = that.integral_status == 1
				else item.isShow = true
			},
			showMenu(menu) {
				return !menu || ['integral', 'service', 'admin_order', 'verify_order', 'intention', 'promoter', 'balance']
					.indexOf(menu) === -1;
			},
			goUrl(url) {
				if (url.indexOf("http") != -1) {
					// #ifdef H5
					location.href = url
					// #endif
				} else {
					if (['/pages/goods_cate/goods_cate', '/pages/order_addcart/order_addcart', '/pages/user/index',
							'/pages/plant_grass/index'
						].indexOf(url) == -1) {
						uni.navigateTo({
							url: url
						})
					} else {
						uni.switchTab({
							url: url
						})
					}
				}
			},
			// 去聊天列表
			goChat() {
				let type = this.userInfo.service ? 1 : 0
				uni.navigateTo({
					url: `/pages/chat/customer_list/index?type=${type}`
				})
			},
			// 记录会员访问
			setVisit() {
				setVisit({
					url: '/pages/user/index'
				}).then(res => {})
			},
			// 打开授权
			openAuto() {
				toLogin()
			},
			Setting: function() {
				uni.openSetting({
					success: function(res) {}
				});
			},
			// 绑定手机
			bindPhone() {
				uni.navigateTo({
					url: '/pages/users/user_phone/index'
				})
			},
			/**
			 * 获取个人用户信息
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {
					that.userInfo = res.data;
					that.is_promoter = res.data.is_promoter;
					that.extension_status = res.data.extension_status;
					that.getMyMenus();
				});
			},
			// 订单数字
			orderNum() {
				orderData().then(({
					data
				}) => {
					this.orderMenu.forEach((item, index) => {
						switch (item.title) {
							case '待付款':
								item.num = data.noPay
								break
							case '待发货':
								item.num = data.noPostage
								break
							case '待收货':
								item.num = data.noDeliver
								break
							case '待评价':
								item.num = data.noComment
								break
							case '售后/退款':
								item.num = data.refund
								break
						}
					})
				})
			},
			/**
			 *
			 * 获取个人中心图标
			 */
			getMyMenus: function() {
				let that = this;
				if (this.MyMenus.length) return;
				getMenuList().then(res => {
					that.personalMenu = []
					res.data.menu.forEach((item, index) => {
						that.filterMenus(item)
						that.personalMenu.push(item)
					})
					that.imgUrls = res.data.banner
					uni.stopPullDownRefresh(); //结束下拉刷新
				});
			},
			// 编辑页面
			goEdit() {
				if (this.isLogin) {
					// uni.navigateTo({
					// 	url: '/pages/users/user_info/index'
					// })
					uni.navigateTo({
						url: `/pages/plantGrass/plant_user/index?id=${this.userInfo.uid}`
					})
				} else {
					this.openAuto()
				}
			},
			goSetting() {
				if (this.isLogin) {
					uni.navigateTo({
						url: '/pages/users/user_setting/index'
					})
				} else {
					this.openAuto()
				}
			},
			// 签到
			goSignIn() {
				uni.navigateTo({
					url: '/pages/users/user_sgin/index'
				})
			},
			goMenuPage(url) {
				if (this.isLogin) {
					uni.navigateTo({
						url
					})
				} else {
					this.openAuto()
				}
			},
		},
		onPullDownRefresh: function() {
			this.getNav();
			if (this.isLogin) {
				this.getUserInfo();
				this.orderNum();
			} else {
				this.userInfo = {}
				this.orderMenu.forEach(v => {
					v.num = 0
				})
				this.getMyMenus();
			}
		},
	}
</script>

<style lang="scss" scoped>
	.wrap {
		position: relative;

		&:before {
			content: '';
			position: absolute;
			width: 100%;
			height: 40%;
			background: linear-gradient(to bottom, rgba(217, 249, 250, 1), rgba(217, 249, 250, 0.5), rgba(217, 249, 250, 0.1));
			border-radius: 70rpx 70rpx 0 0;
		}
	}



	.cardVipA {
		position: absolute;
		background: linear-gradient(145deg, #F8E3A8 0%, #E8C077 100%);
		background-size: 100% 100%;
		width: 710rpx;
		height: 84rpx;
		bottom: 0;
		left: 20rpx;
		padding: 0 30rpx 0 105rpx;
		border-radius: 16rpx 16rpx 0 0;
		box-sizing: border-box;

		.svip_user {
			width: 52rpx;
			height: 52rpx;
			border-radius: 100%;
			position: absolute;
			left: 30rpx;
			top: 17rpx;
		}

		.left-box {
			font-size: 26rpx;
			color: #905100;
			font-weight: 400;
		}

		.btn {
			color: #905100;
			font-weight: 400;
			font-size: 24rpx;
		}

		.btn-open {
			background: #282828;
			border-radius: 40rpx;
			color: #F7E1A6;
			font-size: 24rpx;
			width: 140rpx;
			height: 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.new-users {
		.head {
			.user-card {
				position: relative;
				width: 100%;
				padding: 35rpx 0 50rpx;

				// background-image: linear-gradient(90deg, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
				&.svip-card {
					padding: 35rpx 0 120rpx;
				}

				.bg {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					background-size: 100% 100%;
				}

				.user-info {
					z-index: 20;
					position: relative;
					display: flex;
					align-items: center;
					padding: 0 28rpx;

				

					.avatar-box {
						width: 88rpx;
						height: 88rpx;
						border-radius: 50%;
						position: relative;

						.avatar,
						image {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}

						&.on {
							.avatar {
								border: 2px solid #FFAC65;
								border-radius: 50%;
								box-sizing: border-box;
							}
						}
					}

					.headwear {
						position: absolute;
						right: -4rpx;
						top: -14rpx;
						width: 44rpx;
						height: 44rpx;
						z-index: -1;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.info {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						margin-left: 20rpx;
						padding: 15rpx 0;

						.name {
							display: flex;
							align-items: center;
							color: #303030;
							font-size: 31rpx;

							.vip {
								display: flex;
								align-items: center;
								height: 36rpx;
								padding: 0 4rpx;
								margin-left: 12rpx;
								font-size: 22rpx;
								.level_icon {
									width: 30rpx;
									height: 28rpx;
									margin-right: 4rpx;
								}
								
							}
							.vip-bg{
								display: flex;
								align-items: center;
								height: 36rpx;
								padding: 0 4rpx;
								margin-left: 12rpx;
								font-size: 22rpx;
								border-radius: 10rpx;
								color: #fff;
								background: linear-gradient(to right, #a4e8ed 10%, #43d1e8 100%);
								.level_icon {
									width: 30rpx;
									height: 28rpx;
									margin-right: 4rpx;
								}
							}
						}

						.num {
							display: flex;
							align-items: center;
							font-size: 26rpx;
							color: #303030;

							image {
								width: 22rpx;
								height: 23rpx;
								margin-left: 20rpx;
							}
						}
					}
				}

				.num-wrapper {
					z-index: 30;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin: 30rpx 20rpx 0;
					color: #303030;

					.num-item {
						width: 25%;
						text-align: center;

						.num {
							font-size: 42rpx;
							font-weight: bold;
						}

						.txt {
							margin-top: 8rpx;
							font-size: 22rpx;
							color: #898989;
						}
					}
				}

				.sign {
					z-index: 200;
					position: absolute;
					right: -12rpx;
					top: 80rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 120rpx;
					height: 60rpx;
					background: linear-gradient(90deg, rgba(255, 225, 87, 1) 0%, rgba(238, 193, 15, 1) 100%);
					border-radius: 29rpx 4rpx 4rpx 29rpx;
					color: #282828;
					font-size: 28rpx;
					font-weight: bold;
				}
			}
		}

		.wrapper {
			position: relative;
			padding: 0 20rpx;
			margin-top: 20rpx;
		}

		.middle-box {
			display: flex;
			background-color: #fff;
			border-radius: 16rpx;
			margin: 20rpx 0;
			position: relative;

			&::after {
				content: '';
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				height: 50%;
				width: 1px;
				background-color: #eee;
			}

			.item {
				flex: 1;
				height: 160rpx;
				display: flex;
				align-items: center;
				padding: 20rpx;
				position: relative;

				.title {
					color: #303030;
					font-size: 32rpx;
					font-weight: bold;
				}

				.desc {
					color: #797979;
					font-size: 24rpx;
					margin-top: 8rpx;
				}

				image {
					width: 118rpx;
					height: 94rpx;
					position: absolute;
					top: 50%;
					right: 20rpx;
					transform: translateY(-50%);

				}
			}
		}

		.order-wrapper {
			background-color: #fff;
			border-radius: 16rpx;



			.order-hd {
				height: 80rpx;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px dashed #DDDDDD;
				padding: 0 30rpx;
				color: #282828;

				.left {
					color: #545454;
					font-weight: bold;
				}

				.right {
					align-items: center;
					color: #616161;
					font-size: 26rpx;

					.icon-xiangyou {
						margin-left: 5rpx;
						margin-top: 6rpx;
						font-size: 26rpx;
					}
				}
			}

			.order-bd {
				display: flex;

				.order-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 25%;
					height: 160rpx;

					.pic {
						position: relative;
						text-align: center;

						.order-img {
							width: 60rpx;
							height: 60rpx;
						}

						.iconfont {
							font-size: 62rpx;
							color: var(--view-theme);
						}
					}

					.txt {
						margin-top: 8rpx;
						font-size: 26rpx;
						color: #696969;
					}
				}
			}
		}

		.slider-wrapper {
			margin: 20rpx 0;
			height: 130rpx;

			swiper,
			swiper-item {
				height: 100%;
			}

			image {
				width: 100%;
				height: 130rpx;
			}
		}

		.user-menus {
			padding-bottom: 30rpx;
			background-color: #fff;
			border-radius: 16rpx;

			.title {
				height: 80rpx;
				line-height: 80rpx;
				padding: 0 30rpx;
				border-bottom: 1px dashed #DDDDDD;
				font-weight: bold;
			}

			.item {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				width: 25%;
				line-height: 28rpx;
				height: 90rpx;
				margin-top: 40rpx;
				text-align: center;

				.item-count {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 100%;
				}

				image {
					width: 48rpx;
					height: 48rpx;
				}

				.skeleton_image {
					width: 80rpx;
					height: 80rpx;
				}

				text {
					margin-top: 10rpx;
					font-size: 26rpx;
					color: #696969;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					width: 78%;
				}

				&:last-child::before {
					display: none;
				}
			}

			button {
				font-size: 28rpx;
			}
		}

		.phone {
			color: #fff;
		}

		.order-status-num {
			background-color: #fff;
			color: var(--view-theme);
			border-radius: 200rpx;
			position: absolute;
			right: -12rpx;
			top: -12rpx;
			font-size: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			min-width: 30rpx;
			height: 30rpx;
			padding: 0 8rpx;
			box-sizing: border-box;
			border: 1px solid var(--view-theme);
		}
	}

	.top {
		position: relative;

		.sys-head {
			position: relative;
			width: 100%;
			// background: linear-gradient(90deg, $bg-star1 0%, $bg-end1 100%);

			.bg {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background-image: linear-gradient(90deg, var(--view-bntColor21) 0%, var(--view-bntColor22) 100%);
				background-size: 100% auto;
				background-position: left bottom;
			}

			.sys-title {
				z-index: 10;
				position: relative;
				height: 43px;
				text-align: center;
				line-height: 43px;
				font-size: 32rpx;
				color: #333;
			}
		}

		.right-btn {
			z-index: 99;
			position: absolute;
			right: 30rpx;
			top: 50%;
			transform: translateY(-50%);
			display: flex;
			align-items: center;
			color: #fff;

			.iconfont {
				font-size: 40rpx;
				margin-left: 33rpx;
			}

			.btn {
				position: relative;
			}

			.iconnum {
				min-width: 6px;
				background-color: #fff;
				color: var(--view-theme);
				border-radius: 15rpx;
				position: absolute;
				right: -10rpx;
				top: -10rpx;
				font-size: 10px;
				padding: 0 4px;
			}
		}
	}


	.limits-box {
		background-color: #fff;
		border-radius: 16rpx;
		margin: 20rpx 0;

		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 40rpx 0;
			margin: 0 40rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #eee;

			.left {
				image {
					width: 48rpx;
					height: 48rpx;
				}
			}

			.center {
				flex: 1;
				margin-left: 20rpx;

				.title {
					font-weight: bold;
					font-size: 32rpx;
					color: #696969;
				}

				.desc {
					margin-top: 10rpx;
					font-size: 24rpx;
					color: #939393;
				}
			}

			.right {
				color: #939393;
			}
		}

		.item:last-of-type {
			border-bottom: 0;
		}
	}

	.menus-list-item {
		background: #fff;
		border-radius: 12rpx;
		padding: 30rpx 50rpx 30rpx 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;

		.title {
			font-size: 34rpx;
			color: #282828;
			font-weight: bold;

			.merchant {
				color: #E93323;
			}

			.plantform {
				color: #FFC552;
			}
		}

		.info {
			margin-top: 15rpx;
			color: #666666;
			font-size: 22rpx;
		}

		.image {
			width: 180rpx;
			height: 108rpx;
			background-size: 100%;
			background-repeat: no-repeat;
		}
	}

	.copy-right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #CCCCCC;
		font-size: 22rpx;
		margin-top: 40rpx;
		margin-bottom: 98rpx;
		margin-bottom: calc(98rpx + constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		margin-bottom: calc(98rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/

		.iconfont {
			font-size: 60rpx;
		}

		.img-copyright {
			width: 120rpx;
			height: 60rpx;
		}
	}

	.menu-box {
		display: flex;
		flex-wrap: wrap;
	}



	.menu-list-count {
		background-color: #fff;
		margin-top: 20rpx;
		border-radius: 12rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.menu-item {
			width: 50%;
			padding: 25rpx 15rpx;
			display: flex;
			align-items: center;
			position: relative;

			&:first-child {
				&::after {
					content: "";
					display: block;
					border-right: 1rpx solid #E2E2E2;
					height: 56%;
					position: absolute;
					right: 0;
				}
			}

			.image {
				width: 106rpx;
				height: 64rpx;
				background-size: 100%;
				background-repeat: no-repeat;

				&.merchant-image {
					margin-right: 15rpx;
				}

				&.plantform-image {
					margin-left: 15rpx;
				}
			}

			.menu-text {
				margin-left: 10rpx;

				.title {
					color: #333333;
					font-weight: bold;
					font-size: 26rpx;

					.merchant {
						color: #E93323;
					}

					.plantform {
						color: #FFC552;
					}
				}

				.info {
					color: #999999;
					font-size: 22rpx;
					margin-top: 5rpx;
				}
			}
		}
	}

	.page-footer {
		position: fixed;
		bottom: 0;
		z-index: 30;
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		height: calc(98rpx + constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		height: calc(98rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		box-sizing: border-box;
		border-top: solid 1rpx #F3F3F3;
		background-color: #fff;
		box-shadow: 0px 0px 17rpx 1rpx rgba(206, 206, 206, 0.32);
		padding-bottom: constant(safe-area-inset-bottom); ///兼容 IOS<11.2/
		padding-bottom: env(safe-area-inset-bottom); ///兼容 IOS>11.2/

		&.filter {
			filter: blur(2rpx);
		}

		.foot-item {
			display: flex;
			width: max-content;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			position: relative;

			.count-num {
				position: absolute;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 40rpx;
				height: 40rpx;
				top: 0rpx;
				right: -15rpx;
				color: #fff;
				font-size: 20rpx;
				background-color: #FD502F;
				border-radius: 50%;
				padding: 4rpx;
			}
		}

		.foot-item image {
			height: 50rpx;
			width: 50rpx;
			text-align: center;
			margin: 0 auto;
		}

		.foot-item .txt {
			font-size: 24rpx;
		}
	}
</style>