<template>
	<view class="">
		<view :style="{ height: systemBarHeight }"></view>

		<view class="custom-top">
			<view class="new-iconfont"></view>
			<view class="custom-tabs">
				<view class="custom-item" :class="index == 3 ? 'select' : ''" v-for="item, index in tabList"
					@click="goPage(item)">
					<text style="color: #fff;">{{item.label}}</text>
				</view>
			</view>
			<view class="new-iconfont icon-sousuo" @click="$goNextPage('/pages/plantGrass/plant_search/index')"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: ''
		},
		data() {
			return {
				tabKey: 'recommend',
				tabList: [{
						label: '附近',
						key: 'near',
						url: '/pages/store/shopStreet/index'
					},
					{
						label: '商城',
						key: 'shop',
						url: '/pages/shop/index'
					},
					{
						label: '关注',
						key: 'follow',
						url: ''
					},
					{
						label: '推荐',
						key: 'recommend',
						url: ''
					},
				],
				systemBarHeight: 0
			}
		},
		created() {
			this.systemBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			goPage(item) {
				if (item.url) {
					uni.navigateTo({
						url: item.url
					})
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.custom-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		color: #ffffff;
		position: fixed;
		left: 0;
		right: 0;
		flex-direction: unset;
		width: 100%;
		z-index: 10;

		.custom-tabs {
			display: flex;
			flex-direction: unset;

			.custom-item {
				padding: 20rpx 0;
				margin: 0 20rpx;
				color: #fff !important;

				&.select {
					position: relative;

					&::after {
						content: '';
						height: 6rpx;
						width: 100%;
						position: absolute;
						bottom: 0;
						left: 0;
						right: 0;
						background-color: #fff;
					}

				}
			}
		}
	}
</style>