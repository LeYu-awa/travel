<template>
	<view>
		<!-- 顶部内容 -->
		<topCom></topCom>
		<view class="content-wrap">
			<!-- 顶部菜单 -->
			<topMenu></topMenu>
			<!-- 轮播图 -->
			<swiperCom :list="topswiper"></swiperCom>
			<!-- <topTips></topTips> -->
			<toptab></toptab>
			<!-- 热门板块 -->
			<popularSections :list="hotdata"></popularSections>
			<!-- 直播 -->
			<doctorLive :swiperList="liveswiper"></doctorLive>
			<networkDoctor :swiperList="networkswiper" :swiperBottomList="swiperBottomList"></networkDoctor>
		</view>

		<!--自定义底部tab栏-->
		<customTab :newData="newData" :activeRouter="activeRouter"></customTab>
	</view>
</template>

<script>
	import topCom from './components/topCom';
	import topMenu from './components/topMenu';

	import swiperCom from './components/swiperCom';
	import topTips from './components/topTips';
	import toptab from './components/toptab';
	import popularSections from './components/popularSections';
	import doctorLive from './components/doctorLive';
	import networkDoctor from './components/networkDoctor';
	import customTab from '@/components/customTab';
	import {
		getNavigation
	} from '@/api/public.js';
	import {
		getHotSector,
		getAppVersion
	} from '@/api/api.js';
	import {
		getCarouselImage
	} from '@/api/liveBroadcast.js'
	export default {
		components: {
			topCom,
			topMenu,
			swiperCom,
			topTips,
			toptab,
			popularSections,
			doctorLive,
			networkDoctor,
			customTab
		},
		data() {
			return {
				newData: {},
				activeRouter: '',
				indexData: {

				},
				topswiper: [], // 顶部轮播图数据
				liveswiper: [],
				networkswiper: [],
				hotdata: [], // 热门板块数据
				swiperBottomList: [],
				appUpdate: {},
			};
		},
		onShow() {
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let curRoute = routes[routes.length - 1].route //获取当前页面路由
			this.activeRouter = '/' + curRoute
			this.getNav()
		},
		onLoad() {
			console.log(this.$store.state.app.uid,222)
			this.getCarouselImage()
			this.getHotSector()
			// #ifdef APP-PLUS
			this.appVersionConfig(); //APP版本检测
			// #endif
		},
		methods: {
			// #ifdef APP-PLUS
			appVersionConfig() {
				var that = this;
				//app升级
				// 获取本地应用资源版本号
				getAppVersion().then(res => {
					that.$set(that.appUpdate, 'androidAddress', res.data.androidAddress);
					that.$set(that.appUpdate, 'appVersion', res.data.appVersion);
					that.$set(that.appUpdate, 'iosAddress', res.data.iosAddress);
					that.$set(that.appUpdate, 'openUpgrade', res.data.openUpgrade);
					plus.runtime.getProperty(plus.runtime.appid, function(inf) {
						let nowVersion = (inf.version).split('.').join('');
						let appVersion = (res.data.appVersion).split('.').join('');
						that.$set(that.appUpdate, 'alert', appVersion > nowVersion);
						that.alertAppUpdate();
					});
				})
			},
			alertAppUpdate() {
				console.log(this.appUpdate, '---this.appUpdate---')
				if (this.appUpdate.alert) {
					uni.getSystemInfo({
						success: (res) => {
							uni.showModal({
								title: '更新提示',
								content: '发现新版本，是否前去下载?',
								showCancel: this.appUpdate.openUpgrade != '1',
								cancelColor: '#eeeeee',
								confirmColor: '#FF0000',
								success: (response) => {
									if (response.confirm) {
										switch (res.platform) {
											case "android":
												plus.runtime.openURL(this
													.appUpdate
													.androidAddress);
												break;
											case "ios":
												plus.runtime.openURL(encodeURI(
													this.appUpdate
													.iosAddress));
												break;
										}
									}
								}
							});
						}
					})
				}
			},
			// #endif
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
			getHotSector() {
				getHotSector().then(res => {
					this.hotdata = res.data
				})
			},
			// 轮播图 
			getCarouselImage() {
				getCarouselImage().then(res => {
					console.log(res)
					this.topswiper = res.data.top
					this.liveswiper = res.data.middle
					this.networkswiper = res.data.lower
					this.swiperBottomList = res.data.bottom
					console.log(this.liveswiper, '--this.liveswiper--')
				})
			}
		}
	}
</script>
<style>
	page {
		background: #ffffff;
	}
</style>
<style scoped lang="less">
	.content-wrap {
		position: relative;
		z-index: 1;
		background-color: #fff;
		margin-top:40rpx;
		border-radius: 30rpx 30rpx 0 0;
		padding: 20rpx;
	}
</style>