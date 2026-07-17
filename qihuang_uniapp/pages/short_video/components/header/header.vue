<template>
	<view class="page">
		<view :style="{ height: systemBarHeight }"></view>

		<view class="custom-top" :style="'top: ' + systemBarHeight">
			<view class="new-iconfont"></view>
			<view class="custom-tabs">
				<view class="custom-item" v-for="item, index in tabList" @click="goPage(item)">
					<text class="text">{{item.label}}</text>
					<view class="border" v-if="item.key == tabKey"></view>
				</view>
			</view>
			<!-- #ifdef APP -->
			<navigator hover-class="none" :url="`/pages/plantGrass/plant_search/index`" class="pictrue">
				<view class="">
					<image @click="goPage({url: '/pages/plantGrass/plant_search/index'})" class="sousuo" src="@/pages/short_video/static/img/index/sousuo.png"
						:style="'top: ' + systemBarHeight"></image>
				</view>
			</navigator>
			<!-- #endif -->
			<!-- #ifndef APP -->
			<view class="new-iconfont icon-sousuo" @click="$goNextPage('/pages/plantGrass/plant_search/index')"></view>
			<!-- #endif -->
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
				tabList: [
					// {
					// 	label: '附近',
					// 	key: 'near',
					// 	url: '/pages/store/shopStreet/index'
					// },
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
				}else {
					this.tabKey = item.key
					this.$emit('changeTab', item)
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
		flex-direction: row;
		width: 750rpx;
		z-index: 10;
		.pictrue{
			position: relative;
		}

		.custom-tabs {
			display: flex;
			flex-direction: row;

			.custom-item {
				padding: 20rpx 0;
				margin: 0 20rpx;
				position: relative;
				text-align: center;

				.text {
					color: #fff;
					flex: 1;
					font-size: 28rpx;
				}

				.border {
					height: 6rpx;
					width: 50rpx;
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					border-radius: 6rpx;
					background-color: #fff;
				}
			}
		}
	}
	
	.sousuo {
		width: 50rpx;
		height: 50rpx;
		position: fixed;
		z-index: 10;
		right: 50rpx;
		margin-top: 16rpx;
	}
</style>