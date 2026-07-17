<template>
	<view class="pagRank">
		<view class="top">
			<!-- <div class="title">
				<text class="new-iconfont icon-left"></text>
				<text class="label">本周热销好课</text>
				<text>每日0点更新</text>
			</div> -->

			<image class="bg" src="../../static/images/paaralan/pagRank.png"></image>

		</view>
		<view class="content">
			<view class="tip">
				<text class="new-iconfont icon-shijian"></text>
				每日0点更新
			</view>
			<hot :header="false"></hot>
			<view class="tips">
				没有更多了
			</view>
		</view>
	</view>
</template>

<script>
	import hot from './components/hot';
	export default {
		components: {
			hot
		},
	}
</script>

<style scoped lang="scss">
	
	.tip{
		text-align: right;
		padding: 30rpx 30rpx 0 0 ;
		color: #666;
		font-size: 26rpx;
		.new-iconfont{
			margin-right: 10rpx;
			font-size: 28rpx;
		}
	}
	.tips {
		text-align: center;
		color: #999;
		padding: 40rpx;
	}

	.pagRank {
		background-color: #c30b1d;
	}

	.content {
		background-color: #fff;
		border-radius: 30rpx 30rpx 0 0;
		height: calc(100vh - 300rpx);
	}

	.top {
		position: relative;
		height: 300rpx;

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			z-index: 1;
			color: #fff;
			padding: 20rpx;
			font-size: 24rpx;

			.new-iconfont {
				font-size: 32rpx;
			}

			.label {
				font-size: 32rpx;
			}
		}

		.bg {
			width: 100%;
			height: 600rpx;
			position: absolute;
			top: 0;
		}
	}
</style>