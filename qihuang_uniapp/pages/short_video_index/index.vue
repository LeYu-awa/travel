<template>
	<view></view>
</template>

<script>
export default {
	onLoad() {
		// #ifdef APP
		uni.redirectTo({
			url: '/pages/short_video/appSwiper/index'
		})
		// #endif
		// #ifndef APP
		uni.redirectTo({
			url: '/pages/short_video/nvueSwiper/index'
		})
		// #endif
	}
}
</script>
