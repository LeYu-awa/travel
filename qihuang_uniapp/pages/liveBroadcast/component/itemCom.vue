<!-- swiper -->
<template>
	<view class="cont-view">
		<view style="margin-top: 35rpx;display: flex;flex-flow:row wrap;justify-content: space-between;"
			v-if="tabindexData==1">
			<view class="list" v-for="(item,index) in list" :key="index" @click="oninfo(item)">
				<view class="list-top">
					<image class="list-top-image" :src="item.room_image" mode="aspectFill"></image>
					<view class="list-top-bottom">
						<view class="list-top-bottom-text">{{item.assistant_title}}</view>
						<view class="list-top-bottom-num">
							<image src="/static/images/liveBroadcast/people.png"></image>
							{{item.watch_num}}
						</view>
					</view>
				</view>
				<view class="list-title">{{item.title}}</view>
				<view class="list-bottom">
					<view class="list-bottom-left">{{item.type_name}}</view>
					<view class="list-bottom-btn" v-if="item.is_attention==1">已关注</view>
				</view>
			</view>
		</view>
		<view class="content" v-else>
			<view class="item" v-for="(item,index) in list" :key="index" @click="oninfo(item)">
				<view class="item-bj-box">
					<image class="img" :src="item.room_image" mode="aspectFill"></image>
					<view class="item-live-btn" @click="reservation(item.id)" v-if="item.is_live!=1">
						立即预约直播
					</view>
				</view>
				<view class="item-live-info-box" v-if="item.is_live==1">
					<view class="title"> {{item.title}}</view>
					<view class="user-box">
						<view class="user">
							<view class="head">
								<view class="label" v-if="item.is_live==1">直播</view>
								<image src="/static/images/f.png" mode="aspectFill" class="img"></image>
							</view>
							<view class="nickname"> {{item.nickname}}</view>
						</view>
						<view class="watch-num">
							<image src="/static/images/ren.png" class="icon"></image>
							{{item.watch_num}}
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		reservation
	} from '@/api/liveBroadcast.js'
	import {
		mapGetters
	} from "vuex";
	import {
		toLogin
	} from '@/libs/login.js';
	export default {
		name: 'contCom',
		props: {
			list: { // 必须提供字段
				default: []
			},
			tabindexData: {
				type: Number || String,
				default: 0
			},
		},
		data() {
			return {
			};
		},
		computed: {
			...mapGetters(['isLogin'])
		},
		watch: {

		},
		mounted() {

		},
		methods: {
			oninfo(data) {
				if (!this.isLogin) { // 未登录
					toLogin()
					return
				}
				if (data.is_live == 0) {
					return uni.showToast({
						title: '暂未开播',
						duration: 2000
					});
				}
				if ((data.can_see == 2 || data.can_see == 3) && data.is_allow ==
					0) { //can_see 等于2会员或者3付费的时候  用is_allow 来判断
					return uni.showToast({
						title: '请付费',
						duration: 2000
					});
				}
				uni.navigateTo({
					url: '/pages/live_pusher/live_room/live_room?roomId=' + data.id
				})
			},
			reservation(id) {
				reservation({
					room_id: id
				}).then(res => {
					if (res.status == 200) {
						uni.showToast({
							title: res.message,
							duration: 2000
						});
					} else {
						uni.showToast({
							title: '暂未开播',
							duration: 2000
						});
					}
				})
			}
		}
	}
</script>
<style scoped lang="less">
	.cont-view {

		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
	}

	.list {
		width: 326rpx;
		height: 273rpx;
		border-radius: 12rpx;
		margin-bottom: 25rpx;

		.list-top {
			width: 100%;
			height: 190rpx;
			position: relative;

			.list-top-image {
				width: 100%;
				height: 190rpx;
				border-radius: 12rpx;
			}

			.list-top-bottom {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 46rpx;
				background: rgba(0, 0, 0, 0.6);
				padding: 0 6rpx 0 18rpx;
				box-sizing: border-box;
				display: flex;
				flex-flow: row wrap;
				justify-content: space-between;

				.list-top-bottom-text {
					width: 180rpx;
					font-size: 19rpx;
					color: #ffffff;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					display: flex;
					align-items: center;
				}

				.list-top-bottom-num {
					display: flex;
					align-items: center;
					font-size: 19rpx;
					color: #ffffff;

					image {
						width: 27rpx;
						height: 23rpx;
						margin-right: 10rpx;
					}
				}
			}
		}

		.list-title {
			line-height: 31rpx;
			font-size: 22rpx;
			margin-top: 10rpx;
			color: #3f445d;
			font-weight: 500;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.list-bottom {
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;
			margin-top: 10rpx;
			margin-top: 6rpx;

			.list-bottom-left {
				width: 210rpx;
				color: #c0c9d2;
				font-size: 22rpx;
				line-height: 36rpx;
			}

			.list-bottom-btn {
				width: 88rpx;
				height: 36rpx;
				background: #f4cb8b;
				color: #ffffff;
				font-size: 19rpx;
				border-radius: 12rpx;
				line-height: 36rpx;
				text-align: center;
			}
		}
	}

	.content {
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;

		.item {
			width: 340rpx;
			border-radius: 16rpx;
			position: relative;
			z-index: 99;
			box-sizing: border-box;
			margin-bottom: 24rpx;
			overflow: hidden;

			.item-bj-box {
				width: 100%;
				height: 454rpx;
				position: relative;

				.img {
					width: 100%;
					height: 100%;
				}

				.item-live-btn {
					width: 180rpx;
					border-radius: 25rpx;
					font-size: 28rpx;
					background: #006bfc;
					color: #ffffff;
					line-height: 56rpx;
					text-align: center;
					position: absolute;
					bottom: 20rpx;
					left: 50%;
					transform: translateX(-50%);
				}

			}

			.item-live-info-box {
				width: 100%;
				height: 148rpx;
				padding: 20rpx 14rpx;
				box-sizing: border-box;
				background-color: #fff;

				.title {
					height: 70rpx;
					font-size: 28rpx;
					font-weight: bold;
					color: rgb(51, 51, 51);
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					/* 限制行数为2 */
					overflow: hidden;
				}

				.user-box {
					margin: 8rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				.user {
					display: flex;
					align-items: center;

					.head {
						width: 46rpx;
						height: 46rpx;
						border-radius: 50%;
						margin-right: 11rpx;
						box-sizing: border-box;
						position: relative;
						display: flex;
						align-items: center;
						justify-content: center;
						border: 1px solid red;

						.img {
							width: 34rpx;
							height: 34rpx;
							border-radius: 50%;
						}
						.label{
							width: 46rpx;
							height:26rpx;
							color: #fff;
							background-color: red;
							border-radius: 10rpx;
							font-size: 18rpx;
							text-align: center;
							line-height: 26rpx;
							position: absolute;
							top: -20rpx;
							left: 50%;
							transform: translateX(-50%);
							z-index: 1;
						}
					}

					.nickname {
						font-size: 24rpx;
					}
				}

				.watch-num {
					font-size: 24rpx;
					color: rgb(102, 102, 102);
					display: flex;
					align-items: center;

					.icon {
						width: 20rpx;
						height: 20rpx;
						margin-right: 8rpx;
						display: inline-block;
					}
				}

			}


		}
	}
</style>