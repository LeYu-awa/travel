<!-- 热门版块 -->
<template>
	<view class="box">
		<view class="title">
			<view class="title-left">
				<!-- <image src="/static/images/index/hotLogo.jpg"></image> -->
				热门板块
			</view>
			<!-- <view class="title-right">查看更多<image  src="/static/images/index/right.jpg"></image></view>-->
		</view>
		<view class="hot-content">
			<view class="hot-item" v-for="(item,index) in list" :key="index" @click="ongoto(item.url)">
				<image :src="item.image" class="hot-item-bj" mode="aspectFill"></image>
				<view class="hot-title">{{item.name}}</view>
				<view class="hot-desc">{{item.title}}</view>
			</view>
			<!-- <view class="hot-item">
        <image src="/static/images/index/hotbj2.jpg"  class="hot-item-bj"></image>
        <image src="/static/images/index/hot2.png" class="hot-item-icon"></image>
        <view class="hot-btn">查看详情</view>
      </view> -->
		</view>
	</view>
</template>

<script>
	export default {
		name: 'popularSections',
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

			};
		},
		watch: {

		},
		mounted() {

		},
		methods: {
			ongoto(url) {
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>
<style scoped lang="less">
	.box {
		padding: 0 20rpx;
		box-sizing: border-box;

		.title {
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;
			height: 52rpx;
			margin: 45rpx 0 20rpx 0;

			.title-left {
				font-size: 32rpx;
				font-weight: bold;
				display: flex;
				align-items: center;
				position: relative;
				z-index: 1;

				&::after {
					content: '';
					background: linear-gradient(to right, rgba(52, 181, 193, 1), rgba(52, 181, 193, 0.3), rgba(52, 181, 193, 0.1));
					position: absolute;
					left: 0;
					bottom: 10rpx;
					width: 100%;
					height: 10rpx;
					z-index: -1;
				}

				image {
					width: 36rpx;
					height: 36rpx;
					margin-right: 8rpx;
				}
			}

			.title-right {
				font-size: 22rpx;
				color: #686868;
				display: flex;
				align-items: center;

				image {
					width: 12rpx;
					height: 14rpx;
				}
			}
		}

		.hot-content {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.hot-item {
				width: 325rpx;
				height: 180rpx;
				padding: 20rpx;
				margin-bottom: 20rpx;
				position: relative;
				z-index: 99;
				// box-shadow: 3rpx 8rpx 8rpx 3rpx rgba(0, 0, 0, 0.05);
				border-radius: 23rpx;
				overflow: hidden;

				.hot-title {
					width: 60%;
					position: relative;
					color: #000;
					line-height: 40rpx;
					font-size: 30rpx;
					font-weight: bold;
					text-align: left;
				}

				.hot-desc {
					width: 60%;
					position: relative;
					color: #717273;
					line-height: 30rpx;
					font-size: 24rpx;
					text-align: left;
					margin-top: 10rpx;
				}

				.hot-btn {
					width: 100rpx;
					height: 30rpx;
					font-size: 26rpx;
					color: #fff;
					font-weight: 400;
					background: #0034dc;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.hot-item-icon {
					position: absolute;
					top: 65rpx;
					right: -12rpx;
					width: 180rpx;
					height: 190rpx;
					z-index: 99;
				}

				.hot-item-bj {
					width: 100%;
					height: 100%;
					position: absolute;
					left: 0;
					right: 0;
					bottom: 0;
					top: 0;
				}
			}
		}
	}
</style>