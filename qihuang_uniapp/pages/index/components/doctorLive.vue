<!-- 名医直播 -->
<template>
	<view class="box">
		<!-- <view class="line"></view> -->
		<!-- <view class="image-box">
			<swiper class="swiper" circular :autoplay="true" :interval="interval" :duration="duration"
				indicator-color="rgba(255,255,255,0.6)" indicator-active-color="#fff">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image class="swiper-item" :src="item.image" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view> -->
		<view class="title">
			<view class="title-left">
				<image src="/static/images/index/hotLogo.jpg"></image>名医直播
			</view>
			<view class="title-right">
				<view class="title-right-img">
					<text class="default" :class="{'active':currentIndex==1}"
						@click="currentIndex=1;getLiveList({is_recommend:1})">直播推荐</text>
					<text class="default" :class="{'active':currentIndex==2}"
						@click="currentIndex=2;getLiveList({is_soon:1})">即将开播</text>
				</view>
				<!-- <image class="title-right-img" src="/static/images/index/hf.jpg"></image> -->
				<image class="title-right-icon" src="/static/images/index/right2.jpg"></image>
			</view>
		</view>
		<view class="content">
			<view class="item" v-for="(item,index) in list" :key="index" @click="oninfo(item)">
				<image class="item-bj" src="/static/images/index/doctorLivebj.jpg"></image>
				<view class="item-title">{{item.nickname}}</view>
				<view class="item-icon">
					<text v-if="item.is_live==1">直播中</text>
					<image class="item-icon-img" src="/static/images/index/doctorLiveicon.jpg"></image>
				</view>
				<view class="item-label">{{item.rank_name}}</view>
				<!-- 医院 -->
				<view class="item-hospital"></view>
				<view class="item-live-title" v-if="item.is_live==1">
					<image src="/static/images/index/live.jpg"></image>{{item.title}}
				</view>
				<view class="item-live-bottom" v-else>
					<view class="live-time">距开播还有：{{calculateTimeUntilLive(item.live_start_time)}}</view>
					<view class="item-live-btn" @click="reservation(item.id)">立即预约直播</view>
				</view>
			</view>
		</view>
		<view class="allbtn">
			<view>查看更多</view>
		</view>
		<!-- <view class="line2"></view> -->
	</view>
</template>

<script>
	import {
		getLiveList,
		reservation
	} from '@/api/liveBroadcast.js'
	import {
		mapGetters
	} from "vuex";
	import {
		toLogin
	} from '@/libs/login.js';
	export default {
		name: 'popularSections',
		props: {
			swiperList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				currentIndex: 1,
				interval: 5000,
				duration: 500,
				list: []
			};
		},
		watch: {

		},
		computed: {
			...mapGetters(['isLogin'])
		},
		mounted() {
			this.getLiveList({
				is_recommend: 1
			})
		},
		methods: {
			calculateTimeUntilLive(liveStartTime) {
				const now = new Date();
				const liveStart = new Date(liveStartTime);

				const diffMs = liveStart - now; // 计算时间差（毫秒）
				const diffSecs = Math.floor((diffMs / 1000) % 60); // 秒
				const diffMins = Math.floor((diffMs / (1000 * 60)) % 60); // 分钟
				const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24); // 小时
				const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // 天

				if (diffDays > 0) {
					return `${diffDays}天 ${diffHours}小时 ${diffMins}分 ${diffSecs}秒`;
				} else if (diffHours > 0) {
					return `${diffHours}小时 ${diffMins}分 ${diffSecs}秒`;
				} else {
					return `${diffMins}分 ${diffSecs}秒`;
				}
			},
			getLiveList(data) {
				getLiveList(data).then(res => {
					this.list = res.data
				})
			},
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
							title: res.message,
							duration: 2000
						});
					}
				})
			}
		}
	}
</script>
<style scoped lang="less">
	.box {

		.line {
			width: 100%;
			height: 8rpx;
			background-color: #efefef;
			margin-top: 78rpx;
			margin-bottom: 26rpx;
		}

		.image-box {
			padding: 0 22rpx;
			box-sizing: border-box;

			.swiper {
				width: 696rpx;
				height: 300rpx;
			}

			image {
				width: 696rpx;
				height: 300rpx;
				border-radius: 20rpx;
				box-shadow: 3rpx 8rpx 8rpx 3rpx rgba(0, 0, 0, 0.05);
			}
		}
	}

	.title {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		height: 52rpx;
		margin: 45rpx 0 30rpx 0;
		padding: 0 30rpx;
		box-sizing: border-box;

		.title-left {
			font-size: 32rpx;
			font-weight: 500;
			display: flex;
			align-items: center;

			image {
				width: 36rpx;
				height: 36rpx;
				margin-right: 8rpx;
			}
		}

		.title-right {
			display: flex;
			align-items: center;

			.title-right-img {
				margin-right: 20rpx;
				border-radius: 30rpx;
				background-color: #e8e8e8;
				border: 1px solid #999;
				font-size: 24rpx;
			}

			.default {
				padding: 0 10rpx;
				height: 48rpx;
				color: #717273;
			}

			.active {
				font-size: 26rpx;
				color: #fff;
				background-color: #006bfc;
				border-radius: 30rpx;
				border: 1px solid #006bfc;
			}


			.title-right-icon {
				width: 19rpx;
				height: 39rpx;
			}
		}
	}

	.content {
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;

		.item {
			width: 338rpx;
			height: 500rpx;
			border-radius: 26rpx;
			position: relative;
			z-index: 99;
			padding: 14rpx 30rpx;
			box-sizing: border-box;
			margin-bottom: 15rpx;

			.item-bj {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: -1;
				border-radius: 26rpx;
			}

			.item-title {
				height: 82rpx;
				line-height: 82rpx;
				font-size: 30rpx;
				font-weight: bold;
				color: #757575;
				position: relative;
			}

			.item-title::before {
				content: '';
				width: 39rpx;
				height: 5rpx;
				background: #757575;
				position: absolute;
				left: 5rpx;
				bottom: 0;
			}

			.item-icon {
				position: absolute;
				top: 30rpx;
				right: 44rpx;
				color: #006bfc;
				display: flex;
				align-items: center;

				.item-icon-img {
					width: 36rpx;
					height: 36rpx;
				}
			}


			.item-label {
				height: 25rpx;
				line-height: 25rpx;
				margin-top: 26rpx;
				font-size: 20rpx;
				color: #757575;
			}

			.item-hospital {
				height: 25rpx;
				line-height: 25rpx;
				margin-top: 10rpx;
				font-size: 20rpx;
				color: #757575;
			}

			.item-live-title {
				display: flex;
				align-items: center;
				margin-top: 250rpx;
				font-size: 26rpx;
				font-weight: bold;
				color: #757575;

				image {
					width: 35rpx;
					height: 32rpx;
					margin-right: 11rpx;

				}
			}

			.item-live-bottom {
				position: absolute;
				bottom: 20rpx;
				left: 50%;
				transform: translateX(-50%);
				display: flex;
				flex-wrap: wrap;
				justify-content: center;

				.live-time {
					font-size: 24rpx;
					color: #006bfc;
					margin-bottom: 10rpx;
				}

				.item-live-btn {
					width: 280rpx;
					height: 56rpx;
					border-radius: 25rpx;
					font-size: 30rpx;
					font-weight: bold;
					background: #006bfc;
					color: #ffffff;
					line-height: 56rpx;
					text-align: center;
				}
			}
		}
	}

	.allbtn {
		display: flex;
		justify-content: center;
		margin: 40rpx 0 32rpx 0;

		view {
			width: 170rpx;
			height: 52rpx;
			border-radius: 25rpx;
			font-size: 30rpx;
			font-weight: bold;
			background: #006bfc;
			color: #ffffff;
			line-height: 50rpx;
			text-align: center;
			border: 1rpx solid #79889d;
		}
	}

	.line2 {
		width: 100%;
		height: 8rpx;
		background-color: #efefef;
		margin-bottom: 42rpx;
	}
</style>