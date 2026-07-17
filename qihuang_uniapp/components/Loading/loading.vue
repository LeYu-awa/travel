<template>
	<view class="loading-wrap" :style="loadstyle">
		<view class="css-spinner"></view>
	</view>
</template>
<script>
	export default {
		name: 'loading',
		props: {
			loadstyle:{default:''}
		}
	}
</script>
<style>
.loading-wrap {position: fixed;width: 64rpx;height: 64rpx;left: 50%;top: 38%;z-index: 99999;text-align: center;margin-left: -32rpx;border-radius: 35rpx;}
.css-spinner {width: 64rpx;height: 64rpx;border: 6rpx solid rgba(255, 153, 0, 0.2);border-top: 6rpx solid #FF9900;border-radius: 50%;animation: loading 0.8s linear infinite;box-sizing: border-box;}
@keyframes loading {0% {transform: rotate(0deg);}100% {transform: rotate(360deg);}}
@-webkit-keyframes loading {0% {transform: rotate(0deg);}100% {transform: rotate(360deg);}}
</style>