<!-- swiper -->
<template>
	<view class="swiper-view">
		<view>
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration" indicator-color="rgba(255,255,255,0.6)" indicator-active-color="#fff">
				<swiper-item v-for="(item,index) in list" :key="index">
					<image class="swiper-item" :src="item.image" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
		getCarouselImage
	} from '@/api/liveBroadcast.js'
	export default {
		name: 'swiperCom',
		props: {

		},
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500,
				list: []
			};
		},
		watch: {

		},
		mounted() {
			this.getCarouselImage()
		},
		methods: {
			getCarouselImage() {
				getCarouselImage().then(res => {
					console.log(res)
					this.list = res.data.top
				})
			}
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
		padding: 24rpx 32rpx;
		box-sizing: border-box;
		margin-top: 28rpx;
		background: #f4f4f4;
	}

	.swiper {
		height: 320rpx;
	}

	.swiper-item {
		width: 100%;
		height: 320rpx;
		border-radius: 12rpx;
	}
</style>