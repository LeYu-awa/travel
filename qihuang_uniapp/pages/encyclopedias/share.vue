<template>
	<view class="page">
		<view class="content">
			<image :src="image" mode="widthFix" style="width: 80%;display: block;margin: auto;"></image>
		</view>
		<view class="tips">
			<view class="border"></view>
			<view >分享到</view>
			<view class="border"></view>
		</view>
		<view class="btns" >
			<view class="item" @click="share('WXSceneSession')">
				<image class="img" src="@/static/images/encyclopedia/share1.png"/>
				<view>微信好友</view>
			</view>
			<view class="item" @click="share('WXSceneTimeline')">
				<image class="img" src="@/static/images/encyclopedia/share2.png"/>
				<view>朋友圈</view>
			</view>
			<view class="item" @click="share('WXSceneFavorite')">
				<image class="img" src="@/static/images/encyclopedia/share3.png"/>
				<view>微信收藏</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import {
		configMap
	} from '@/utils';
	export default {
		computed: configMap({
			statusBarHeight: 0,
			community_reply_status: 0
		}, mapGetters(['isLogin', 'uid'])),
		data() {
			return {
				image: '',
				title: '',
				content: '',
			}
		},
		onLoad(e){
			this.image = e.url
			this.title = e.title
			
		},
		methods: {
			share(scene){
				let that = this
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				let uid = this.uid ? this.uid : 0;
				// let data = this.dataList[this.k];
				// let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				// let curRoute = routes[routes.length - 1].$page.fullPath // 获取当前页面路由，也就是最后一个打开的页面路由
				uni.share({
					provider: "weixin",
					scene: scene,
					type: 0,
					// href: `${HTTP_REQUEST_URL}/pages/short_video/nvueSwiper/index?&id=${id}`,
					href: `https://www.sharetrace.com/docs/index.html`,
					title: '岐黄手法 - ' + this.title,
					summary: `点击查看更多【${this.title}】相关权威中医百科知识`,
					imageUrl: '/static/images/logo.png',
					success: function(res) {
						uni.showToast({
							title: '分享成功',
							icon: 'success'
						})
						uni.hideLoading();
					},
					fail: function(err) {
						uni.hideLoading();
						uni.showToast({
							title: '分享失败',
							icon: 'none',
							duration: 2000
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.page{
	background-color: #999;
	height: 100vh;
}
.content{
	height: 80vh;
	overflow-y: auto;
	padding-top: 5vh;
}
.tips{
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 50rpx;
	.border{
		width: 50rpx;
		height: 2rpx;
		background-color: #fff;
		margin: 0 20rpx;
	}
}
.btns{
	display: flex;
	justify-content: center;
	color: #fff;
	font-size: 26rpx;
	.item{
		margin-top: 50rpx;
		width: 25%;
		text-align: center;
		.img{
			width: 80rpx;
			height: 80rpx;
			background: #fff;
			padding: 16rpx;
			border-radius: 50%;
		}
	}
}
</style>
