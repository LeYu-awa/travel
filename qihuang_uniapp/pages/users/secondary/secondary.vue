<!-- 副播管理页面 -->
<template>
	<view>
		<view class="content">
			<view class="liveStreaming">
				<view class="title">
					<view class="title-left">
						<image src="/static/images/liveRoom/live.png"></image>直播中
					</view>
					<!-- <view class="title-right">查看更多<uni-icons type="right" size="16"></uni-icons></view> -->
				</view>
				<view class="list" v-for="(item,index) in liveList " :key="index">
					<view class="list-left">
						<image :src="item.room_image"></image>
						<view>直播中</view>
					</view>
					<view class="list-content">
						<view class="list-content-name">{{item.live_name}}</view>
						<view class="list-content-time">开播时间:{{item.live_start_time}}</view>
						<view class="list-content-duration">
							<image src="/static/images/liveRoom/live.png"></image>
							已直播时常:{{calculateTimeUntilLive(item.live_start_time)}}
						</view>
					</view>
					<view class="list-btn">
						<view @click="oninfo(item)">管理直播间</view>
					</view>
				</view>
			</view>
			<view class="liveStreaming">
				<view class="title">
					<view class="title-left">
						<image src="/static/images/liveRoom/live.png" style="filter: grayscale(100%);"></image>未开播
					</view>
					<!-- <view class="title-right">查看更多<uni-icons type="right" size="16"></uni-icons></view> -->
				</view>
				<view class="list" v-for="(item,index) in notLiveList " :key="index">
					<view class="list-left" style="filter: grayscale(100%);">
						<image :src="item.room_image"></image>
						<view>未开播</view>
					</view>
					<view class="list-content">
						<view class="list-content-name">{{item.live_name}}</view>
						<view class="list-content-time">上次开播时间:{{item.live_start_time}}</view>
						<view class="list-content-duration" style="filter: grayscale(100%);display: flex;">
							<view>
								<image src="/static/images/liveRoom/live.png"></image>
								<text> 下次开播时间:</text>
							</view>
							<view style="display: flex;flex-direction: column;">
								<text v-if="item.live_date_type==1">{{item.live_date}}</text>
								<text v-if="item.live_date_type==2">{{item.live_more_date}}</text>
							</view>
						</view>
					</view>
					<view class="list-btn">
						<view>预约直播间</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getLiveManage
	} from '@/api/liveBroadcast.js';
	export default {
		data() {
			return {
				liveList: [],
				notLiveList: []
			};
		},
		onLoad() {
			this.getLiveManage()
		},
		methods: {
			calculateTimeUntilLive(liveStartTime) {
				const now = new Date();
				const liveStart = new Date(liveStartTime);

				const diffMs = now - liveStart; // 计算时间差（毫秒）
				const diffSecs = Math.floor((diffMs / 1000) % 60); // 秒
				const diffMins = Math.floor((diffMs / (1000 * 60)) % 60); // 分钟
				const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24); // 小时
				const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // 天

				if (diffDays > 0) {
					return `${diffDays}天 ${diffHours}:${diffMins}:${diffSecs}`;
				} else if (diffHours > 0) {
					return `${diffHours}:${diffMins}:${diffSecs}`;
				} else {
					return `${diffMins}:${diffSecs}`;
				}
			},

			oninfo(data) {
				if (data.is_live == 0) {
					return uni.showToast({
						title: '暂未开播',
						duration: 2000
					});
				}
				uni.navigateTo({
					url: '/pages/live_pusher/SubLiveRoom/live_room?roomId=' + data.id
				})
			},
			getLiveManage() {
				getLiveManage({
					is_live: 1
				}).then(res => {
					this.liveList = res.data
				})
				getLiveManage({
					is_live: 0
				}).then(res => {
					this.notLiveList = res.data
				})
			}
		}
	}
</script>
<style>
	page {
		background-color: #f1f5fc;
	}
</style>
<style scoped lang="less">
	.content {
		padding: 20rpx 18rpx;
		box-sizing: border-box;

		.liveStreaming {

			.title {
				height: 75rpx;
				padding: 0 22rpx;
				box-sizing: border-box;
				display: flex;
				flex-flow: row wrap;
				justify-content: space-between;
				align-items: center;

				.title-left {
					display: flex;
					align-items: center;
					font-size: 26rpx;
					font-weight: 500;
					color: #000000;

					image {
						width: 23rpx;
						height: 25rpx;
						margin-right: 16rpx;
					}
				}

				.title-right {
					font-size: 20rpx;
					color: #000000;
					display: flex;
					align-items: center;
				}
			}
		}
	}

	.list {
		width: 100%;
		height: 185rpx;
		background: #ffffff;
		border-radius: 85rpx 25rpx 25rpx 25rpx;
		margin-bottom: 15rpx;
		padding: 20rpx;
		display: flex;

		.list-left {
			width: 140rpx;
			height: 140rpx;
			position: relative;

			image {
				border: 6rpx solid #587ff7;
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
			}

			view {
				position: absolute;
				top: 116rpx;
				left: 28rpx;
				width: 86rpx;
				height: 35rpx;
				border: 2rpx solid #ffffff;
				background: #587ff7;
				font-size: 22rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #ffffff;
				border-radius: 35rpx;
			}
		}

		.list-content {
			width: 367rpx;
			margin-left: 22rpx;
			padding-top: 16rpx;

			.list-content-name {
				line-height: 33rpx;
				font-size: 33rpx;
				font-weight: bold;
			}

			.list-content-time {
				margin: 24rpx 0 12rpx 0;
				min-width: 200rpx;
				height: 30rpx;
				display: flex;
				align-items: center;
				background: #f6f6f8;
				font-size: 20rpx;
				padding: 0 10rpx;
				border-radius: 15rpx;
				display: inline-block;
			}

			.list-content-duration {
				font-size: 25rpx;
				color: #587ff7;

				image {
					width: 23rpx;
					height: 25rpx;
					margin-right: 16rpx;
				}
			}
		}

		.list-btn {
			display: flex;
			align-items: center;

			view {
				width: 148rpx;
				height: 53rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 25rpx;
				color: #ffffff;
				border-radius: 16rpx;
				background: #587ff7;
			}
		}
	}
</style>