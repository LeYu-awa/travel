<template>
	<view class="">
		<Suspension :isDock="true" :edge="{top: 10,
					right: 10,
					bottom: 10,
					left: 10}">
			<view class="content" @click="$goNextPage('/pages/store/list/order')">
				<view class="icon-bg">
					<view class="iconfont icon-gouwuche">

					</view>
				</view>
				<view class="">
					<view class="">
						{{title}}
					</view>
					<view class="">
						购买
					</view>
				</view>
			</view>
		</Suspension>
	</view>
</template>

<script>
	import Suspension from "./Suspension/index.vue"
	export default {
		components: {
			Suspension
		},
		props: {
			title: {
				type: String,
				default: '视频解锁'
			}
		},
		data() {
			return {}
		},
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #fff;
		padding: 10rpx;
		font-size: 16rpx;
		text-align: center;
		border-radius: 70rpx;
		box-shadow: 0px 8rpx 8rpx 0px rgba(0, 0, 0, 0.25);

		.icon-bg {
			height: 92rpx;
			width: 92rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 10rpx;
			border-radius: 50%;
			background: linear-gradient(180.00deg, rgba(38, 67, 127, 1), rgba(7, 16, 47, 1) 100%);

			.iconfont {
				background-image: linear-gradient(137.83deg, rgba(255, 230, 140, 1), rgba(220, 170, 90, 1) 100%);
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;
				font-size: 50rpx;
				font-weight: 700;
			}
		}
	}
</style>