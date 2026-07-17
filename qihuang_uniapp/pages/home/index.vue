<template>
	<view class="">
		<!-- 头部 -->
		<customHeader />
		
		<!-- 视频 -->
		<customVideo :height="systemBarHeight + footerHeight"/>
		<customTab active="home" @height="(height) => footerHeight = height "></customTab>
	</view>
</template>

<script>
	import customHeader from "./components/header.vue"
	import customVideo from "./components/video.vue"
	import customTab from '@/components/customTab';
	export default{
		data(){
			return {
				systemBarHeight: 0,
				footerHeight: 0
			}
		},
		components:{
			customTab,
			customHeader,
			customVideo
		},
		onShow() {
			this.systemBarHeight = uni.getSystemInfoSync().statusBarHeight;
		}
	}
</script>

<style>
</style>