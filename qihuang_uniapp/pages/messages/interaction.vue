<template>
	<view class="content" v-if="list.length">
		<view class="item" v-for="item in list" @click="goVideo(item)">
			<view class="left">
				<image class="head" :src="item.interacting_user.avatar_url||'/static/images/f.png'"></image>
				<view class="head-bt">
					<image class="head-bottom" :src="`/static/images/message/${item.type}.png`"></image>
				</view>
			</view>
			<view class="right">
				<view class="right-content">
					<view class="right-top">
						{{item.interacting_user.username}}<text
							v-if="item.interacting_user.is_following_each_other">互相关注</text>
					</view>
					<view class="right-mid">
						<text v-if="item == 1">等5人近期访问过你</text>
						<text v-else-if="item.type =='comment'">评论了你：老师你发的视频教的太好了</text>
						<text v-else-if="item.type =='like'">赞了你的视频</text>
						<text v-else>提到了你：@海焱老师教你学手法 </text>
					</view>
					<view class="time">
						{{item.timestamp}}
					</view>
					<!-- <view class="right-bottom" v-if="item.type == 'comment'">
						<view class="reply">
							<image class="reply-img" src="/static/images/message/liveimg.png"></image>
							<text>回复评论</text>
						</view>
						<view class="like" @click="like(item)">
							<image class="like-img" src="/static/images/message/blackheart.png"></image>
							<text>点赞</text>
						</view>
					</view> -->
				</view>
				<view>
					<image mode="aspectFill" class="content-img" :src="item.content_info.image_url"></image>
				</view>
			</view>
		</view>
	</view>
	<emptyPage title="暂无数据" v-else />
</template>

<script>
	import emptyPage from "@/components/emptyPage.vue"
	import {
		getInteractiveMessages
	} from "@/api/message.js"
	export default {
		components: {
			emptyPage
		},
		data() {
			return {
				total: 0,
				pageQuery: {
					page: 1,
					limit: 10,
				},
				list: []
			}
		},
		onLoad(e) {
			this.getList()
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
			async like(item){
				
			},
			goVideo(item){
				uni.navigateTo({
					//#ifdef APP
					url: '/pages/short_video/appSwiper/details?id=' + item.content_info.community_id
					//#endif
					//#ifndef APP
					url: '/pages/short_video/nvueSwiper/details?id=' + item.content_info.community_id
					//#endif
				});
			},
			async getList() {
				let data = await getInteractiveMessages(this.pageQuery)
				this.total = data.data.count
				if (this.pageQuery.page == 1) {
					this.list = data.data.list
				} else {
					this.list = [...this.list, ...data.data.list]
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		min-height: 100vh;
		background-color: #fff;

		.item {
			margin: 0 30rpx;
			padding: 30rpx 0 0;
			display: flex;
			align-items: center;


			.left {
				width: 120rpx;
				height: 120rpx;
				position: relative;
				display: flex;
				margin-bottom: 30rpx;

				.head {
					width: 120rpx;
					height: 120rpx;
					position: absolute;
					right: 0;
					border-radius: 50%;
				}

				.head-bt {
					width: 44rpx;
					height: 44rpx;
					border-radius: 50%;
					position: absolute;
					bottom: -10rpx;
					right: -10rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					// border: 6rpx solid #fff;
					// padding: 5rpx;

					.head-bottom {

						width: 44rpx;
						height: 44rpx;

					}
				}

			}

			.right {
				margin-left: 30rpx;
				width: calc(100% - 120rpx);
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 2rpx solid #eee;
				padding-bottom: 30rpx;

				.right-content {

					.right-top {
						font-size: 32rpx;
						display: flex;
						align-items: center;
						margin-bottom: 10rpx;

						text {
							border-radius: 4rpx;
							width: 100rpx;
							height: 32rpx;
							background-color: #F7F7F7;
							line-height: 32rpx;
							text-align: center;
							margin-left: 20rpx;
							margin-top: 10rpx;
							font-size: 20rpx
						}
					}

					.right-mid {
						width: 300rpx;
						font-size: 28rpx;
						margin-bottom: 10rpx;
					}

					.time {
						font-size: 24rpx;
						color: #666;
					}

				}

				.right-bottom {
					margin-top: 10rpx;
					display: flex;

					.reply {
						width: 176rpx;
						border-radius: 10rpx;
						background-color: #F7F7F7;
						font-size: 24rpx;
						padding: 10rpx 0;
						display: flex;
						align-items: center;
						justify-content: center;

						.reply-img {
							border-radius: 50%;
							width: 25rpx;
							height: 25rpx;
							margin-right: 10rpx;
						}

					}

					.like {
						width: 100rpx;
						border-radius: 10rpx;
						background-color: #F7F7F7;
						font-size: 24rpx;
						margin-left: 20rpx;
						padding: 10rpx 0;
						display: flex;
						align-items: center;
						justify-content: center;

						.like-img {
							border-radius: 50%;
							width: 30rpx;
							height: 30rpx;
						}


					}
				}


				.content-img {
					width: 102rpx;
					height: 154rpx;
				}

			}
		}


		.items {
			margin: 40rpx 30rpx 30rpx 40rpx;
			display: flex;

			.lefts {
				width: 120rpx;
				height: 120rpx;

				display: flex;

				.heads {
					width: 120rpx;
					height: 120rpx;
					position: absolute;
				}

				.heads-bt {
					background: linear-gradient(180.00deg, rgba(255, 132, 109, 1), rgba(222, 134, 76, 1) 100%);
					width: 44rpx;
					height: 44rpx;
					border-radius: 50%;
					position: absolute;
					bottom: 106rpx;
					left: 115rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					.heads-bottom {

						width: 32rpx;
						height: 32rpx;
						line-height: 44rpx;

					}
				}

			}

			.rights {
				margin-left: 30rpx;
				width: calc(100% - 120rpx);
				display: flex;
				justify-content: space-between;
				border-bottom: 2rpx solid #eee;
				padding-bottom: 30rpx;

				.rights-content {

					.rights-top {

						font-size: 32rpx;
						display: flex;

						.rights-status {
							border-radius: 4rpx;
							display: flex;
							width: 100rpx;
							height: 26rpx;
							background-color: #80808030;
							line-height: 26rpx;
							text-align: center;
							align-items: center;
							margin-left: 20rpx;
							margin-top: 10rpx;
							font-size: 20rpx
						}
					}

					.rights-mid {
						width: 300rpx;
						font-size: 28rpx;
					}

					.times {
						font-size: 24rpx;
					}

					.rights-bottom {
						margin-top: 10rpx;
						display: flex;

						.reply {
							width: 176rpx;
							height: 30rpx;
							border-radius: 10rpx;
							background-color: #80808010;
							font-size: 24rpx;
							text-align: center;
							align-items: center;
							display: flex;

							.reply-img {
								border-radius: 50%;
								width: 25rpx;
								height: 25rpx;
							}

						}

						.like {
							width: 100rpx;
							height: 30rpx;
							border-radius: 10rpx;
							background-color: #80808010;
							font-size: 24rpx;
							margin-left: 20rpx;
							text-align: center;
							align-items: center;
							display: flex;

							.like-img {
								border-radius: 50%;
								width: 30rpx;
								height: 30rpx;
							}


						}
					}

				}

				.contents-img {
					width: 102rpx;
					height: 154rpx;
				}

			}
		}
	}
</style>