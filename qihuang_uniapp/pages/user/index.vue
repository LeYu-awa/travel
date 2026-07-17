<template>
	<view class="">
	
		<Header :show-back="false" title="个人主页">
			<template #rightIcon>
				<view class="new-iconfont icon-liebiao" style="font-size: 50rpx;"
					@click="$goNextPage('/pages/users/user_setting/index')">
				</view>
			</template>
		</Header>
		<view class="top">
			<image  @click="uploadpic" style="width: 100%;" :src="info.back_url || `/static/images/user/bg.png`" mode="widthFix"></image>
			<view class="info">
				<image class="avatar" :src="info.avatar_url || '/static/images/f.png'" mode=""></image>
				<view class="right">
					<view class="name">
						{{info.nickname}}
					</view>
					<view class="id">
						ID：{{info.user_id}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="content">
			<view class="p-4">
				<view class="count">
					<view class="item" v-for="item in countList" @click="goPage(item)">
						<view class="label">
							{{item.label}}
						</view>
						<view class="value">
							{{info[item.key]}}
						</view>
					</view>
					<view class="btn" @click="$goNextPage('/pages/plantGrass/plant_release/index')">
						发布
					</view>
				</view>
				<view class="remark">
					{{info.motto || '暂未添加介绍'}}
				</view>
				<view class="tags">
					<view class="item" v-if="info.sex">
						{{info.sex == 1 ? '男' : '女'}}
					</view>
					<view class="item" v-if="info.age">
						{{info.age}}岁
					</view>
					<view class="item" v-if="info.location">
						{{info.location}}
					</view>
					<view class="item" v-if="info.role">
						{{info.role}}
					</view>
				</view>
				<view class="category">
					<view class="item" v-for="item in categoryList" @click="goPage(item)">
						<view class="new-iconfont" :class="item.icon"></view>
						<view class="">
							{{item.label}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<yz-qr style="position: absolute;top: -1000000rpx;" :text="`http://app-qh.cg24.cn?spid=${uid}`"
			:qrPath.sync="qrPath"></yz-qr>
		<view class="sticky">
			<Tab :tablist="tabList" @change="changeTab" />
		</view>
		<view class="video-list" v-if="list.length">
			<view class="item" v-for="(item, index) in list" :key="item.id" @click="goVideo(item, index)">
				<image class="img" :src="item.image" mode="aspectFit"></image>
				<view class="flex">
					<text class="new-iconfont icon-love"></text>
					{{item.count_start || 0}}
				</view>
			</view>
		</view>
		<emptyPage v-else />
		<uni-popup ref="popupRef">
			<view class="popup-tips">
				<view class="new-iconfont icon-chacha" @click="closePopup"></view>
				<image class="img" src="/static/images/health/tips.png"></image>
				<view class="label">
					共获得{{info.likes_count}}个赞
				</view>
				<view class="btn" @click="closePopup">
					<text>确认</text>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popupShareRef">
			<view class="popup-tips">
				<image style="width: 600rpx;" show-menu-by-longpress mode="widthFix" :src="img" />
				<view class="saveQcode" @click="dowmImage(img)">
					保存邀请码
				</view>
			</view>
		</uni-popup>
		<FCanvas ref="CanvasImgref" @changeImage="changeImage" :model="canvasMode" />
		<customTab active="my"></customTab>

	</view>
</template>
<script>
	import Header from "@/components/header.vue"
	import emptyPage from "@/components/emptyPage.vue"
	import FCanvas from "@/components/fei-canvas/canvas-vue2.vue";
	import {dowmImage} from "@/components/fei-canvas/canvas-vue2.js";
	import {
		getUserProfile,
		getMyLikes,
		getMyWorks,
		getMyCollections,
		getRecommendVideoList,
		getSystemGroupData,
		updateUserProfile
	} from "@/api/user.js"
	import customTab from '@/components/customTab';
	import Tab from '@/components/tab';
	import fn from "./index"
	import {
		configMap
	} from '@/utils';
	import {
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				...fn(),
				qrPath: '',
				img: '',
				pic: '',
				sid: getApp().globalData.uid,
				
				tabKey: 'works',
				info: {},
				list: [],
				total: 0,
				dowmImage,
				pageQuery: {
					page: 1,
					limit: 12
				}
			}
		},
		computed: configMap({
			community_reply_status: 0
		}, mapGetters(['isLogin', 'uid'])),
		components: {
			customTab,
			Header,
			emptyPage,
			FCanvas,
			Tab
		},
		async onLoad(){
			let {data} = await getSystemGroupData()
			this.pic = data.data.pic
		},
		onShow() {
			this.getInfo()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.pageQuery.page = 1
			this.getList()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		// 触底加载
		async onReachBottom() {
			if (this.list.length < this.total) {
				this.pageQuery.page += 1
				this.getList()
			} else {
				uni.showToast({
					title: '没有更多了',
					icon: 'none'
				})
			}
		},
		methods: {
			async getInfo() {
				let {
					data
				} = await getUserProfile({
					uid: this.uid
				})
				this.info = data
				this.pageQuery.page = 1
				this.getList()
			},
			showPopup() {
				this.$refs.popupRef.open('center')
			},
			closePopup() {
				this.$refs.popupRef.close()
			},
			changeTab(index, item) {
				this.tabKey = item.key
				this.pageQuery.page = 1
				this.getList()
			},
			async getList() {
				let data;
				switch (this.tabKey) {
					case 'works': // 作品
						data = await getMyWorks(this.pageQuery)
						break;
					case 'recommend': // 推荐
						data = await getRecommendVideoList(this.pageQuery)
						break;
					case 'collection': // 收藏
						data = await getMyCollections(this.pageQuery)
						break;
					case 'like': // 喜欢
						data = await getMyLikes(this.pageQuery)
						break;
				}
				this.total = data.data.count
				if (this.pageQuery.page == 1) {
					this.list = data.data.list
				} else {
					this.list = [...this.list, ...data.data.list]
				}
			},
			goVideo(item, index) {
				uni.navigateTo({
					//#ifdef APP
					url: '/pages/short_video/appSwiper/details?user=1&type=' + this.tabKey + '&uid=' + this.uid +
						'&id=' + item.community_id + '&key='+index
					//#endif
					//#ifndef APP
					url: '/pages/short_video/nvueSwiper/details?user=1&type=' + this.tabKey + '&uid=' + this.uid +
						'&id=' + item.community_id + '&key='+index
					//#endif
				});
			},
			goPage(item) {
				if (item.url) {
					this.$goNextPage(item.url)
				} else if (item.key == 'likes_count') {
					this.showPopup()
				} else if (item.key == 'share') {
					this.share('WXSceneSession')

				}
			},
			changeImage(e) {
				this.img = e;
			},
			/**
			 * 上传文件
			 * 
			 */
			uploadpic: function() {
				let that = this;
				// that.canvasStatus = true
				that.$util.uploadImageOne('upload/image', (res) => {
					that.info.back_url = res.data.path;
					// that.canvasStatus = false
					updateUserProfile({back_url:res.data.path})
				});
			},
			share(scene) {
				let that = this
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				this.canvasMode.data = [{
						type: 'image', // 绘制图片类型
						x: 0,
						y: 0,
						width: 600,
						height: 1000,
						url: this.pic//'/static/images/share.png' // 背景图
					}, 
					{
						type: "text", // 绘制文本类型
						text: "邀请码",
						x: 40, // 如果对其方式是center，那么就是再308的位置开始居中展示
						y: 760,
						textAlign: "left", // 对其方式
						fontsize: 40, // 字体大小
						color: "#000",
					}, 
					{
						type: "text", // 绘制文本类型
						text: '【' + that.info.user_id.toString() + '】',
						x: 20, // 如果对其方式是center，那么就是再308的位置开始居中展示
						y: 830,
						textAlign: "left", // 对其方式
						fontsize: 40, // 字体大小
						color: "#000",
					},
					{
						type: 'image', // 绘制图片类型
						x: 380,
						y: 760,
						width: 150,
						height: 150,
						url: this.qrPath // 背景图
					},
				]

				that.$refs.popupShareRef.open('center')
				setTimeout(() => {

					// < !--延迟执行 -->
					that.$refs.CanvasImgref.getCanvas();
					uni.hideLoading()
				}, 20);
				// let uid = this.uid ? this.uid : 0;

				// let data = this.dataList[this.k];
				// let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				// let curRoute = routes[routes.length - 1].$page.fullPath // 获取当前页面路由，也就是最后一个打开的页面路由
				// uni.share({
				// 	provider: "weixin",
				// 	scene: scene,
				// 	type: 0,
				// 	// href: `${HTTP_REQUEST_URL}/pages/short_video/nvueSwiper/index?&id=${id}`,
				// 	href: `https://www.sharetrace.com/docs/index.html`,
				// 	title: '岐黄手法',
				// 	summary: `点击查看更多权威中医百科知识`,
				// 	imageUrl: '/static/images/logo.png',
				// 	success: function(res) {
				// 		uni.showToast({
				// 			title: '分享成功',
				// 			icon: 'success'
				// 		})
				// 		uni.hideLoading();
				// 	},
				// 	fail: function(err) {
				// 		uni.hideLoading();
				// 		uni.showToast({
				// 			title: '分享失败',
				// 			icon: 'none',
				// 			duration: 2000
				// 		})
				// 	}
				// });
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		position: relative;
		height: 300rpx;

		.info {
			position: absolute;
			top: 50rpx;
			left: 30rpx;
			display: flex;
			align-items: center;

			.avatar {
				width: 132rpx;
				height: 132rpx;
				border: 4rpx solid #fff;
				border-radius: 50%;
				margin-right: 20rpx;
			}

			.right {
				color: #fff;
				font-size: 20rpx;

				.name {
					font-size: 28rpx;
					font-weight: 500;
					margin-bottom: 20rpx;
				}
			}

		}
	}

	.content {
		background-color: #fff;
		border-radius: 24rpx 24rpx 0 0;
		background-color: #fff;
		margin-top: -30rpx;
		position: relative;

		.p-4 {
			padding: 40rpx 40rpx 0;
		}

		.count {
			display: flex;
			text-align: center;
			font-size: 24rpx;
			position: relative;

			.item {
				margin-right: 60rpx;

				.label {
					margin-bottom: 10rpx;
				}
			}
			.saveQcode{
				
			}

			.btn {
				width: 152rpx;
				height: 70rpx;
				position: absolute;
				right: 0;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 70rpx;
				background: linear-gradient(137.83deg, rgba(126, 87, 69, 1), rgba(204, 179, 140, 1) 100%);
			}
		}

		.remark {
			color: #666;
			font-size: 24rpx;
			margin: 30rpx 0 20rpx;
		}

		.tags {
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 30rpx;

			.item {
				font-size: 20rpx;
				background-color: #eee;
				color: #666;
				padding: 4rpx 12rpx;
				border-radius: 20rpx;
				margin-right: 12rpx;
			}
		}

		.category {
			display: flex;
			flex-wrap: wrap;

			.item {
				width: 20%;
				text-align: center;
				font-size: 20rpx;
				margin-bottom: 20rpx;
				margin-top: 20rpx;

				.new-iconfont {
					font-size: 42rpx;
					margin-bottom: 10rpx;
				}
			}
		}


	}

	.sticky {
		background-color: #fff;
		position: sticky;
		top: 50px;
		z-index: 1;
	}

	.video-list {
		display: flex;
		flex-wrap: wrap;

		.item {
			width: calc(100% / 3 - 2rpx);
			margin-right: 3rpx;
			margin-bottom: 3rpx;
			position: relative;

			.img {
				width: 100%;
				height: 420rpx;
				display: block;
				background-color: #333;
			}

			.new-iconfont {
				margin-right: 10rpx;
			}

			.flex {
				position: absolute;
				bottom: 10rpx;
				font-size: 24rpx;
				left: 10rpx;
				color: #fff;
				align-items: center;
			}

			&:nth-child(3n) {
				margin-right: 0;
			}

		}
	}
	.popup-tips{
		.saveQcode{
			background: linear-gradient(180.00deg, rgba(67, 106, 188, 1), rgba(42, 55, 99, 1) 100%);
			width: 342rpx;
			height: 88rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			left: 0;
			font-size: 32rpx;
			font-weight: 700;
			right: 0;
			border-radius: 88rpx;
			// bottom: 42rpx;
			color: #fff;
			margin: 20rpx auto 0;
		}
	}
</style>