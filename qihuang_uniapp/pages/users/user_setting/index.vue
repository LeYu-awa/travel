<template>
	<view class="user-setting">
		<image src="/static/images/user/setting_bg.png" class="bg" mode="widthFix"></image>
		<Header title="设置" showBg="transparent" color="#ffffff" />
		<view class="relative">
			<view class="item" v-for="item, index in cellList">
				<view class="title" v-if="item.title" :style="index == 0 ? 'color: #fff' : ''">
					{{item.title}}
				</view>
				<view class="content">
					<view class="cell" v-for="val in item.arr" :key="val.key" @click="goPage(val)">
						<view class="left">
							<view class="new-iconfont" :class="val.icon"></view>
						</view>
						<view class="right">
							<view class="label">
								{{val.label}}
							</view>
							<view class="value">
								<view v-if="val.key == 'mobile'">{{phone}}</view>
								<view v-else-if="val.key == 'v'">V1.0.9</view>
								<view class="new-iconfont icon-right"></view>
							</view>

						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		cacheLst
	} from '@/api/user.js';

	import {
		getUserInfo
	} from '@/api/user.js';
	import Header from "@/components/header.vue"
	export default {
		name: 'user-setting',
		components: {
			Header
		},
		data() {
			return {
				icons: {
					sys_user_agree: 'icon-yonghuxieyi',
					sys_userr_privacy: 'icon-anquan',
					platform_rule: 'icon-zhuyi',
					the_cancellation_prompt: 'icon-shujubiangeng',
					sys_intention_agree: 'icon-xiaofeimingxidan',
				},
				phone: '',
				cellList: [{
						title: '账号与安全',
						arr: [{
								label: '个人信息',
								icon: 'icon-yonghu',
								url: '/pages/users/user_info_form/index',
								key: ''
							}, {
								label: '手机号绑定',
								icon: 'icon-shouji',
								url: '/pages/users/user_modify_phone/index',
								key: 'mobile'
							},
							{
								label: '修改密码',
								icon: 'icon-mima',
								url: '/pages/users/user_pwd_edit/index',
								key: ''
							},
							{
								label: '支付设置',
								icon: 'icon-zhifushezhi',
								url: '',
								key: ''
							},
							{
								label: '注销账号',
								icon: 'icon-qingqibing_zhuxiaoyonghu',
								url: '/pages/users/user_about/index?from=the_cancellation_msg',
								key: ''
							},
						]
					},
					// {
					// 	title: '功能',
					// 	arr: [{
					// 			label: '清理缓存',
					// 			icon: 'icon-qingchuhuancun',
					// 			url: '',
					// 			key: ''
					// 		},
					// 		{
					// 			label: '应用优化',
					// 			icon: 'icon-lianjie',
					// 			url: '',
					// 			key: ''
					// 		},

					// 	]
					// },
					{
						title: '更多',
						arr: []
					},
					{
						title: '',
						arr: [{
								label: '当前版本',
								icon: 'icon-gantanhao-xianxingyuankuang',
								url: '',
								key: 'v'
							},
					
						]
					},
					{
						title: '',
						arr: [{
								label: '退出当前账号',
								icon: 'icon-tuichu',
								url: '',
								key: 'logout'
							},

						]
					}
				]
			}
		},
		onShow() {
			this.getUserInfo()
			this.getInfo()
		},
		methods: {
			/**
			 * 获取个人用户信息
			 */
			getUserInfo: function() {
				getUserInfo().then(res => {
					let tel = res.data.phone;
					this.phone = tel.substr(0, 3) + "****" + tel.substr(7);
				});
			},
			getInfo() {
				cacheLst().then(res => {
					// this.cellList.push(res.data)
					this.cellList[1].arr = []
					res.data.filter(v => {
						this.cellList[1].arr.push({
							label: v.label,
							icon: this.icons[v.key],
							url: '/pages/users/user_about/index?from=' + v.key,
							key: ''
						})
					})
				})
			},
			goPage(val) {
				if (val.url) {
					uni.navigateTo({
						url: val.url
					})
				}else if(val.key == 'logout'){
					uni.clearStorageSync()
					uni.redirectTo({
						url: "/pages/users/login/index"
					})
				} else if (val.key == 'logOff') {
					console.log('zhuxiao', val)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-setting {

		.bg {
			width: 100%;
			position: absolute;
		}

		.relative {
			position: relative;
		}

		.item {
			margin: 0 44rpx;
			padding-top: 26rpx;

			.title {
				font-size: 24rpx;
				color: #666;
				margin-left: 66rpx;
				margin-bottom: 12rpx;
			}

			.content {
				background-color: #fff;
				padding: 0 60rpx;
				border-radius: 10rpx;

				.cell {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 30rpx 0 0;

					.left {
						display: flex;

						.new-iconfont {
							margin-right: 16rpx;
							font-size: 36rpx;
							padding-bottom: 30rpx;
						}
					}

					.right {
						width: 100%;
						display: flex;
						justify-content: space-between;
						border-bottom: 2rpx solid #e5e5e5;
						padding-bottom: 30rpx;

						.value {
							display: flex;
							align-items: center;
						}
					}

					&:last-of-type {
						.right {
							border: 0;

						}
					}
				}
			}
		}
	}
</style>