<template>
	<view class="categoryStyle">
		<view class="item" v-for="(item, index) in list" :key="index" @click="goNextPage(item)">
			<image v-if="item.logo.indexOf('icon') == -1" class="img" :src="item.logo"></image>
			<view v-else :style="'background: '+ item.color" class="new-iconfont" :class="item.logo "></view>
			<view>
				{{ item.name }}
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: 'category',
		props: {
			categoryList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				list: []
			};
		},
		watch:{
			categoryList:{
				handler(value){
					this.list = value || []
				},
				deep: true,
				immediate: true
			}
		},
		methods: {
			goNextPage(item) {
				if (item.url) {
					uni.navigateTo({
						url: '/pages/paaralan/' + item.url
					})
				} else {
					uni.navigateTo({
						url: '/pages/paaralan/search?id=' + item.id
					})
				}

			},
		}
	}
</script>

<style lang="scss" scoped>
	.categoryStyle {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 20rpx;

		.item {
			width: 20%;
			text-align: center;
			margin: 10rpx 0;
			font-size: 28rpx;

			.img {
				width: 100rpx;
				height: 60rpx;
				display: block;
				margin: 10rpx auto;
			}

			.new-iconfont {
				width: 100rpx;
				height: 60rpx;
				border-radius: 30rpx;
				margin: 10rpx auto;
				background: red;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				font-size: 36rpx;
			}
		}
	}
</style>