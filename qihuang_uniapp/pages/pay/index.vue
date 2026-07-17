<template>
	<view class='wrapper'>
		<view class='item'>
			<view>支付方式</view>
			<view class='list'>
				<!-- #ifdef H5 -->
				<view class='payItem acea-row row-middle' :class='active==index ?"on":""' @tap='payItem(index)'
					v-for="(item,index) in cartArr" :key='index' v-if="item.payStatus==1">
					<view class='name acea-row row-center-wrapper'>
						<view class='iconfont animated'
							:class='(item.icon) + " " + (animated==true&&active==index ?"bounceIn":"")'></view>
						{{item.name}}
					</view>
					<view class='tip'>
						{{item.title}}
						<block v-if="item.value == 'balance'">
							{{userInfo.now_money}}
						</block>
					</view>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP || APP-PLUS -->
				<view class='payItem acea-row row-middle' :class='active==index ?"on":""' @tap='payItem(index)'
					v-for="(item,index) in cartArr" :key='index' v-if="item.payStatus==1">
					<view class='name acea-row row-center-wrapper'>
						<view class='iconfont animated'
							:class='(item.icon) + " " + (animated==true&&active==index ?"bounceIn":"")'></view>
						{{item.name}}
					</view>
					<view class='tip'>
						{{item.title}}
						<block v-if="item.value == 'balance'">
							{{userInfo.now_money}}
						</block>
					</view>
				</view>
				<!-- #endif -->
			</view>
			<button class='but' @click="submitSub"> 立即支付</button>
		</view>
	</view>
</template>

<script>
	import {
		getAddressDefault,
		getAddressDetail,
		getAddressList,
		getUserInfo,
		getAgreementApi
	} from '@/api/user.js';
	import {
		mapGetters
	} from "vuex";
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		configMap
	} from '@/utils';
	export default {
		data() {
			return {
				userInfo: {},
				active: 0, //支付方式切换
				animated: false,
				payType: 'weixin', //支付方式
				//支付方式
				cartArr: [{
						"name": "微信支付",
						"icon": "icon-weixin2",
						value: 'weixin',
						title: '微信快捷支付',
						payStatus: 1,
					},
					{
						name: "支付宝支付",
						icon: "icon-icon34",
						// #ifdef H5 || APP-PLUS
						value: 'alipay',
						// #endif
						// #ifdef MP
						value: 'alipayQr',
						// #endif
						title: '支付宝支付',
						payStatus: this.$store.getters.globalData.alipay_open
					},
					{
						"name": "余额支付",
						"icon": "icon-icon-test",
						value: 'balance',
						title: '可用余额:',
						payStatus: this.$store.getters.globalData.yue_pay_status,
					},
					{
						"name": "线下支付",
						"icon": "icon-yinhangqia",
						value: 'offline',
						title: '线下支付',
						payStatus: 2,
					},
				],
			}
		},
		computed: {
			...mapGetters(['isLogin', 'viewColor']),
			...configMap(['hide_mer_status', 'alipay_open', 'yue_pay_status']),
		},
		onLoad() {
			if (this.isLogin) {
				this.getUserInfo()
			} else {
				toLogin()
			}
		},
		methods: {
			// 获取个人信息
			getUserInfo() {
				getUserInfo().then(res => {
					this.userInfo = res.data
				})
			},
			payItem: function(e) {
				let that = this;
				let active = e;
				that.active = active;
				that.animated = true;
				that.payType = that.cartArr[active].value;
				if (that.payType == 'weixin') {
					that.payType = that.from
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper .item .discount .placeholder {
		color: #ccc;
		text-align: right;
	}

	.wrapper {
		margin-bottom: 12rpx;
		background-color: #fff;
	}

	.wrapper .item {
		padding: 27rpx 30rpx;
		font-size: 30rpx;
		color: #282828;
	}

	.wrapper .item .list .payItem {
		border: 1px solid #eee;
		border-radius: 6rpx;
		height: 86rpx;
		width: 100%;
		box-sizing: border-box;
		margin-top: 20rpx;
		font-size: 28rpx;
		color: #282828;
	}

	.wrapper .item .list .payItem.on {
		border-color: var(--view-theme);
		color: var(--view-theme);
	}

	.wrapper .item .list .payItem .name {
		width: 50%;
		text-align: center;
		border-right: 1px solid #eee;
		justify-content: left;
		padding-left: 80rpx;
	}

	.wrapper .item .list .payItem .name .iconfont {
		width: 44rpx;
		height: 44rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 44rpx;
		background-color: #fe960f;
		color: #fff;
		font-size: 30rpx;
		margin-right: 15rpx;
	}

	.wrapper .item .list .payItem .name .iconfont.icon-weixin2 {
		background-color: #41b035;
	}

	.wrapper .item .list .payItem .name .iconfont.icon-icon34 {
		background-color: #4295D5;
	}

	.wrapper .item .list .payItem .tip {
		width: 49%;
		text-align: center;
		font-size: 26rpx;
		color: #aaa;
	}
	.but {
		color: #fff;
		font-size: 30rpx;
		width: 700rpx;
		height: 86rpx;
		border-radius: 50rpx;
		margin: 46rpx auto 0 auto;
		line-height: 86rpx;
		background-color: var(--view-theme);
	}
</style>