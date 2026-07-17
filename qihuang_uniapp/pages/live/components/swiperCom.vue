<!-- swiper -->
<template>
	<view class="swiper-view">
		<view style="box-shadow: 3rpx 8rpx 8rpx 3rpx rgba(0,0,0,0.05);">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration" indicator-color="#bfbfbf" indicator-active-color="#313131">
				<swiper-item v-for="(item,index) in list" :key="index">
					<image class="swiper-item" :src="item.image" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'swiperCom',
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500
			};
		},
		watch: {

		},
		mounted() {

		},
		methods: {

		}
	}
</script>
<style>
	uni-page-body {
		background: transparent;
	}
</style>
<style scoped lang="less">
	.swiper-view {
		padding: 0 20rpx;
		box-sizing: border-box;
		margin-top: 20rpx;
		margin-bottom: 6rpx;
		background: transparent;
		border-radius: 20rpx;
	}

	.swiper {
		height: 288rpx;
		border-radius: 20rpx;
	}

	.swiper-item {
		width: 100%;
		height: 288rpx;
		border-radius: 20rpx;

	}
</style>