<template>
	<view class="">

		<image class="bg" style="width: 100%;" src="/static/images/user/user_bg.png" mode="widthFix"></image>
		<Header showBg="transparent" color="#ffffff"></Header>
		<view class="top">
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
					<view @click="follow" class="concern" :class="info.is_following? 'yes' : ''">
						{{info.is_following ? '已关注' : '关注'}}
					</view>
				</view>
			</view>
		</view>
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

	</view>
</template>

<script>
	import Header from "@/components/header.vue"
	import emptyPage from "@/components/emptyPage.vue"
	import {
		getUserProfile,
		getMyLikes,
		getUserWorks,
		getMyCollections,
		getRecommendVideoList
	} from "@/api/user.js"
	import {
		unfollowUser,
		followUser
	} from "@/api/index.js"
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
				tabKey: 'otherWork',
				info: {},
				list: [],
				uid: '',
				total: 0,
				pageQuery: {
					page: 1,
					limit: 12
				}
			}
		},
		components: {
			customTab,
			Header,
			emptyPage,
			Tab
		},
		onLoad(e) {
			this.uid = e.uid
			this.getInfo()
		},
		onShow() {},
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
			}else{
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
				this.getList()
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
			showPopup() {
				this.$refs.popupRef.open('center')
			},
			closePopup() {
				this.$refs.popupRef.close()
			},
			changeTab(index, item) {
				this.tabKey = item.key
				this.getList()
			},
			async follow() {
				if (this.info.is_following) {
					await unfollowUser({
						follow_uid: this.uid
					})
				} else {
					await followUser({
						follow_uid: this.uid
					})
				}
				this.info.is_following = !this.info.is_following
			},
			async getList() {
				let data;
				switch (this.tabKey) {
					case 'otherWork': // 作品
						data = await getUserWorks({
							...this.pageQuery,
							uid: this.uid
						})
						break;
					case 'recommend': // 推荐
						data = await getRecommendVideoList()
						break;
					case 'collect': // 收藏
						data = await getMyCollections()
						break;
					case 'like': // 喜欢
						data = await getMyLikes()
						break;
				}
				this.total = data.data.count
				if (this.pageQuery.page == 1) {
					this.list = data.data.list
				} else {
					this.list = [...this.list, ...data.data.list]
				}
			},
			goPage(item) {
				// if (item.url) {
				// 	this.$goNextPage(item.url)
				// } else 
				if (item.key == 'likes_count') {
					this.showPopup()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
	}

	.top {
		position: relative;

		.info {
			position: relative;
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
		margin-top: 100rpx;
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

			.concern {

				border-radius: 20rpx;
				width: 620rpx;
				height: 60rpx;
				margin: 20rpx 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
				color: #fff;
				background-color: #EE1D52;

				&.yes {
					background-color: #ddd;
					color: #666;
				}
			}
		}


	}

	.sticky {
		background-color: #fff;
		position: sticky;
		top: 0;
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
</style>