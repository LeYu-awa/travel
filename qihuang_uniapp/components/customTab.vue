<template>
	<view>
		<view :style="'height:' + height + 'px'"></view>
		<view class="tabbar-foot" id="foot">
			<view class="footer-bg"></view>
			<view class="tabbar-page-footer" id="target">
				<view class="tabbar-item" :class="(item.key == 'live' || item.key == 'video') ? 'main-style' : ''"
					v-for="item in tabbar" :key="item.key" @click="goNextPage(item)">
					<view class="flex">
						<image v-if="item.key == 'live' || item.key == 'video'" class="tabbar-img"
							:src="currentActive == 'video' ? '/static/images/tabbar_2_select.png' : '/static/images/tabbar_2.png'" />
					</view>
					<!-- <view :class="item.key == 'live' ? 'center main-text-style' : 'center'">

					</view> -->
					<text :class="[(currentActive == item.key ? 'tabbar-select' : ''), 'text-style']">{{item.label}}<text
							v-if="item.key === 'message' && total"
							class="total">{{total > 99 ? '99+' : total}}</text></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getMessageNum
	} from "@/api/user.js"
	
	import { checkLogin } from '../libs/login';
	import {
		getAppVersion
	} from "@/api/api.js";
	// 使用全局变量存储定时器，确保整个应用只有一个定时器
	let globalMessageTimer = null;
	export default {
		props: {
			// newData: {
			// 	type: Object,
			// 	default: {},
			// },
			// activeRouter: {
			// 	type: String,
			// 	default: '',
			// },
			active: {
				type: String,
				default: '',
			},
			// 兼容历史调用方式：<customTab :activeRouter="...">
			activeRouter: {
				type: String,
				default: '',
			},
		},
		computed: {
			currentActive() {
				if (this.active) return this.active;
				const map = {
					'/pages/short_video/appSwiper/index': 'home',
					'/pages/short_video/nvueSwiper/index': 'home',
					'/pages/short_video_index/index': 'home',
					'/pages/home/index': 'home',
					'/pages/live/living': 'health',
					'/pages/healths/index': 'video',
					'/pages/user/index': 'my',
					'/pages/store/shopStreet/index': 'shopStreet',
					'/pages/shop_street/index': 'shopStreet',
				};
				return map[this.activeRouter] || '';
			},
		},
		data() {
			return {
				
				appUpdate: {},
				tabbar: [{
						label: '首页',
						key: 'home',
						// 与 pages.json tabBar 首项保持一致
						//#ifdef APP
						"url": "/pages/short_video/appSwiper/index",
						//#endif
						//#ifndef APP
						"url": "/pages/short_video_index/index",
						//#endif
					},
					{
						label: '直播',
						key: 'health',
						url: '/pages/live/living'
					},
					{
						label: '手法绝技',
						key: 'video',
						url: '/pages/healths/index'
					},
					// {
					// 	label: '消息',
					// 	key: 'message',
					// 	url: '/pages/message/index'
					// },
					{
						label: '附近',
						key: 'shopStreet',
						// 这里必须是 tabBar 页面，业务页会在该页面内再跳转
						url: '/pages/shop_street/index'
					},
					{
						label: '我的',
						key: 'my',
						url: '/pages/user/index'
					},
				],
				total: 0,
				height: 50,
			}
		},
		watch: {
			active: {
				handler(value) {
					// this.getTabbarHeight()
					// this.tabindex = value
					// if(value == 'video' || value == 'buy_video'){
					// 	this.tabbar[2].key = 'video'
					// 	this.tabbar[2].label = '视频学堂'
					// 	this.tabbar[2].url = '/pages/healths/index'
					// 	this.tabbar[3].key = 'buy_video'
					// 	this.tabbar[3].label = '购课'
					// 	this.tabbar[3].url = '/pages/healths/purchased'
					// }
				},
				deep: true,
				immediate: true
			}
		},
		created() {
			uni.hideTabBar();
			this.getTabbarHeight();
			this.getMessageNum(); // 立即执行一次

			// 确保全局只有一个定时器在运行
			// this.initMessageTimer();
			// #ifdef APP-PLUS
			this.appVersionConfig(); //APP版本检测
			// #endif
		},

		beforeUnmount() {
			// 组件卸载时，如果当前定时器存在且是当前实例创建的，才清除
			// 避免清除其他实例正在使用的定时器
			if (globalMessageTimer) {
				clearInterval(globalMessageTimer);
				globalMessageTimer = null;
			}
		},
		methods: {
			
			// #ifdef APP-PLUS
			appVersionConfig() {
				var that = this;
				//app升级
				// 获取本地应用资源版本号
				getAppVersion().then((res) => {
					that.$set(that.appUpdate, "androidAddress", res.data.androidAddress);
					that.$set(that.appUpdate, "appVersion", res.data.appVersion);
					that.$set(that.appUpdate, "iosAddress", res.data.iosAddress);
					that.$set(that.appUpdate, "openUpgrade", res.data.openUpgrade);
					plus.runtime.getProperty(plus.runtime.appid, function (inf) {
						let nowVersion = inf.version.split(".").join("");
						let appVersion = res.data.appVersion.split(".").join("");
						that.$set(that.appUpdate, "alert", appVersion > nowVersion);
						that.alertAppUpdate();
					});
				});
			},
			alertAppUpdate() {
				if (this.appUpdate.alert) {
					uni.getSystemInfo({
						success: (res) => {
							uni.showModal({
								title: "更新提示",
								content: "发现新版本，是否前去下载?",
								showCancel: this.appUpdate.openUpgrade != "1",
								cancelColor: "#eeeeee",
								confirmColor: "#FF0000",
								success: (response) => {
									if (response.confirm) {
										switch (res.platform) {
											case "android":
												plus.runtime.openURL(this.appUpdate
													.androidAddress);
												break;
											case "ios":
												plus.runtime.openURL(
													encodeURI(this.appUpdate.iosAddress)
												);
												break;
										}
									}
								},
							});
						},
					});
				}
			},
			// #endif
			// 初始化消息定时器
			initMessageTimer() {
				// 如果全局定时器已存在，则清除它
				if (globalMessageTimer) {
					clearInterval(globalMessageTimer);
				}

				// 创建新的全局定时器
				globalMessageTimer = setInterval(() => {
					if (checkLogin()) {
						this.getMessageNum();
					}
				}, 1000);
			},
			async getMessageNum() {
				let {
					data: {
						total
					}
				} = await getMessageNum()
				this.total = total || 0
			},
			goNextPage(item) {
				if (item.key != this.currentActive) {
					if (item.key == 'video' || item.key == 'buy_video') {
						uni.reLaunch({
							url: item.url
						})
					} else {
						uni.switchTab({
							url: item.url,
							// 兜底：若目标并非 tabBar 页面，退化为 reLaunch，避免点击无响应
							fail: () => {
								uni.reLaunch({
									url: item.url
								})
							}
						})
					}
				}
			},
			getTabbarHeight() {
				let that = this
				this.$nextTick(() => {
					const query = uni.createSelectorQuery().in(this);
					query
						.select(".footer-bg")
						.boundingClientRect((data) => {
							that.height = data?.height || 50
							this.$emit('height', that.height)
						})
						.exec();

				})

			},
			// goRouter(item) {
			// 	var pages = getCurrentPages();
			// 	var page = (pages[pages.length - 1]).$page.fullPath;
			// 	if (item.link == page) return
			// 	uni.switchTab({
			// 		url: item.link,
			// 		fail(err) {
			// 			uni.redirectTo({
			// 				url: item.link
			// 			})
			// 		}
			// 	})
			// },
		}
	}
</script>

<style lang="scss" scoped>
	.tabbar-foot {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		overflow: visible;
		z-index: 10;
	}

	.footer-bg {
		position: absolute;
		width: 750rpx;
		height: 98rpx;
		bottom: 0;
		background-color: #fff;
		border-top: 1px solid #F3F3F3;
		padding-bottom: constant(safe-area-inset-bottom); ///兼容 IOS<11.2/
		padding-bottom: env(safe-area-inset-bottom); ///兼容 IOS>11.2/
		box-shadow: 0px 0px 17rpx 1rpx rgba(206, 206, 206, 0.32);
		box-sizing: border-box;
	}

	.tabbar-page-footer {
		position: relative;
		z-index: 999;
		display: flex;
		overflow: visible;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		text-align: center;
		height: 142rpx;
		padding-top: 40rpx;
		// height: calc(98rpx + constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		// height: calc(98rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		// background-color: #fff;
		padding-bottom: constant(safe-area-inset-bottom); ///兼容 IOS<11.2/
		padding-bottom: env(safe-area-inset-bottom); ///兼容 IOS>11.2/

		.tabbar-item {
			width: calc(750rpx / 5);
			flex: 1;
			text-align: center;
			overflow: visible;
			position: relative;
		}

		.text-style {
			font-size: 30rpx;
			text-align: center;
			overflow: visible;
			font-weight: 400;
		}

		.tabbar-select {
			// background: linear-gradient(137.83deg, rgba(255, 230, 140, 1), rgba(220, 170, 90, 1));
			// -webkit-background-clip: text;
			// background-clip: text;
			// color: transparent;
			// font-size: 30rpx;
			color: rgba(220, 170, 90, 1);
		}

		.total {
			position: absolute;
			background-color: red;
			color: #fff;
			font-size: 20rpx;
			min-width: 30rpx;
			height: 30rpx;
			border-radius: 50%;
		}


		.main-style {
			// box-shadow: rgba(0, 0, 0, 0.25) 0px -7px 9px -6px;
			// box-shadow: 0px -7px 9px -6px rgba(206, 206, 206, 0.32);
			position: relative;
			top: -20rpx;
			border-radius: 220rpx;
			background: #fff;
			width: 150rpx;
			height: 138rpx;
			font-size: 24rpx;
			overflow: visible;

			.tabbar-img {
				width: 76rpx;
				height: 76rpx;
				overflow: visible;
				display: block;
			}

			.flex {
				display: flex;
				align-items: center;
				overflow: visible;
				justify-content: center;
				padding: 16rpx 0 6rpx;
			}

			.text-style {
				font-size: 24rpx;
			}
		}
	}
</style>
