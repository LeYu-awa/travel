<template>
	<view class="wrap">
		<!-- 列表 -->
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key="index" @click="oninfo(item)">
				<image class="item-bj" src="/static/images/index/doctorLivebj.jpg"></image>
				<view class="item-title">{{item.nickname}}</view>
				<view class="item-icon">
					<view v-if="item.is_live==1">直播中</view>
					<image class="item-icon-img" src="/static/images/index/doctorLiveicon.jpg"></image>
				</view>
				<view class="item-label">{{item.rank_name}}</view>
				<view class="item-live-title">
					<image src="/static/images/index/live.jpg"></image>{{item.title}}
				</view>
				<view class="item-live-btn" v-if="item.is_live==0">
					<view @click="reservation(item.id)">立即预约直播</view>
				</view>
			</view>
		</view>
		
		<!-- 空数据 -->
		<view class='noCommodity' v-if="list.length==0">
			<view class='pictrue'>
				<image :src="`${domain}/static/images/noCart.png`"></image>
				<view>暂无数据</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		HTTP_REQUEST_URL
	} from '@/config/app';
	import {
		getAttentionLiveList
	} from '@/api/attention.js';
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
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				list: []
			}
		},
		computed: {
			...mapGetters(['isLogin'])
		},
		onLoad(options) {
			this.getList({
				is_live: options.is_live
			})
		},
		methods: {
			getList(params) {
				getAttentionLiveList(params).then(res => {
					this.list = res.data;
				})
			},
			oninfo(data) {
				if (!this.isLogin) {
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

<style lang="scss" scoped>
	.wrap {
		width: 100%;
		margin-top: 30rpx;
		background: #f8f8f8;
		border-radius: 12rpx 12rpx 0 0;
		padding: 30rpx 40rpx;
	}

	.list {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;

		.item {
			width: 330rpx;
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
				line-height: 25rpx;
				margin-top: 26rpx;
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

			.item-live-btn {
				position: absolute;
				bottom: 20rpx;
				display: flex;
				justify-content: center;

				view {
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
</style>