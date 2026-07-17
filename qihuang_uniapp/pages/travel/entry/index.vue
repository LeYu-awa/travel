<template>
	<view class="travel-entry">
		<view class="hero">
			<text class="title">旅游预订</text>
			<text class="desc">线路查询、签约、支付、订单全流程</text>
		</view>

		<view class="menu-list">
			<view class="menu-item" @tap="goProductList">
				<view class="menu-left">
					<text class="menu-title">旅游线路</text>
					<text class="menu-sub">查看产品与团期</text>
				</view>
				<text class="menu-arrow">></text>
			</view>

			<view class="menu-item" @tap="goOrderList">
				<view class="menu-left">
					<text class="menu-title">我的订单</text>
					<text class="menu-sub">查看待支付/待出行订单</text>
				</view>
				<text class="menu-arrow">></text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	methods: {
		goProductList() {
			uni.navigateTo({ url: '/pages/travel/product/list' })
		},
		goOrderList() {
			uni.navigateTo({ url: '/pages/travel/order/list' })
		}
	}
}
</script>

<style lang="scss" scoped>
.travel-entry {
	padding: 24rpx;

	.hero {
		background: #fff;
		border-radius: 16rpx;
		padding: 32rpx 28rpx;
		margin-bottom: 24rpx;

		.title {
			display: block;
			font-size: 38rpx;
			font-weight: 600;
			color: #222;
			margin-bottom: 10rpx;
		}

		.desc {
			font-size: 24rpx;
			color: #666;
		}
	}

	.menu-list {
		.menu-item {
			background: #fff;
			border-radius: 16rpx;
			padding: 28rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 18rpx;

			.menu-left {
				.menu-title {
					display: block;
					font-size: 30rpx;
					color: #222;
					margin-bottom: 8rpx;
				}

				.menu-sub {
					font-size: 24rpx;
					color: #888;
				}
			}

			.menu-arrow {
				font-size: 30rpx;
				color: #bbb;
			}
		}
	}
}
</style>
