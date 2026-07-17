<template>
	<view>
		<!-- 顶部tab -->
		<topCom @ontab="ontab"></topCom>
		<!-- 轮播图 -->
		<swiperCom></swiperCom>
		<!-- 内容 -->
		<contCom :tabindexData="tabindex"></contCom>
		<customTab :newData="newData" :activeRouter="activeRouter"></customTab>
	</view>
</template>

<script>
	import topCom from './component/topCom';
	import swiperCom from './component/swiperCom';
	import contCom from './component/contCom';
	import customTab from '@/components/customTab';
	import {
		getNavigation
	} from '@/api/public.js';
	export default {
		components: {
			topCom,
			swiperCom,
			contCom,
			customTab
		},
		data() {
			return {
				newData: {},
				activeRouter: '',
				tabindex: 0
			}
		},
		onShow() {
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let curRoute = routes[routes.length - 1].route //获取当前页面路由
			this.activeRouter = '/' + curRoute
			this.getNav()
		},
		methods: {
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
			ontab(data) {
				this.tabindex = data
			}
		}
	}
</script>

<style scoped lang="less">

</style>