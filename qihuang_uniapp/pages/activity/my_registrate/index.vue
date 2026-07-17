<template>
	<view>
		<view class="application-record" v-if="listData.length">
			<navigator :url="`/pages/activity/registrate_activity/index?id=${item.activity_id}`" hover-class='none' class="card-list" v-for="item in listData" :key="item.activity_id" v-if="item.activity">
				<view class="card-top">
					<view class="card-wrapper">
						<view class="card-status" :class="'status'+item.activity.time_status">{{item.activity.time_status==0?'未开始' : item.activity.time_status==1?'正在进行' : '已结束'}}</view>
						<view class="btn">详情<text class='iconfont icon-jiantou'></text></view>
					</view>
				</view>
				<view v-if="item.activity" class="card-bottom">
					<view class="title">{{item.activity.activity_name}}</view>
					<view class="time">提交时间：{{item.create_time}}</view>
				</view>
			</navigator>
		</view>
		<view class='no-shop' v-if="!listData.length && !loading">
			<view class='pictrue' style="margin: 0 auto;">
				<image :src="`${domain}/static/images/noCart.png`"></image>
				<text>暂无活动，快去提交报名信息吧!</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getRechargeRecordList
	} from '@/api/user.js'
	import {HTTP_REQUEST_URL} from '@/config/app';
	export default {
		data() {
			return {
				domain:HTTP_REQUEST_URL,
				loading: false,
				listData: [],
				count: 0,
				pageData: {
					page: 1,
					limit: 10,
				}
			}
		},
		onLoad() {
			this.getListData()
		},
		methods: {
			getListData() {
				this.loading = true
				uni.showLoading({
					title: '数据加载中',
				});
				getRechargeRecordList(this.pageData).then(res => {
					this.count = res.data.count
					this.listData = this.listData.concat(res.data.list)
					uni.hideLoading();
					this.loading = false
				})
			},
			
		},
		// 滚动到底部
		onReachBottom() {
			if (this.count == this.listData.length) {
				uni.showToast({
					title: '没有更多啦',
					icon: 'none',
					duration: 1000
				});
			} else {
				this.pageData.page += 1
				this.getListData()
			}
		},
	}
</script>

<style lang="scss" scoped>
	.application-record {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #F5F5F5;
		padding: 30rpx 30rpx;
		.card-list {
			width: 100%;
			background-color: #fff;
			padding: 20rpx 24rpx;
			margin-bottom: 30rpx;
			border-radius: 16rpx;
			.card-top{
				.card-wrapper{
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1px solid #EEEEEE;
					padding-bottom: 30rpx;
					.card-status{
						font-size: 28rpx;
						&.status1{
							color: #61CE74;
						}
						&.status-1{
							color: #FF922C;
						}
					}
					.btn{
						color:#666666;
						.iconfont{
							color: #bbbbbb;
							font-size: 22rpx;
							margin-left: 5rpx;
						}
					}
				}
			}
			.card-bottom {
				margin-top: 30rpx;
				.title {
					font-size: 28rpx;
					font-weight: bold;
					color: #333333;
				}
				.time {
					color: #999999;
					font-size: 24rpx;
					margin-top: 24rpx;
				}
			}
		}
	}
	.no-shop {
		width: 100%;
		background-color: #fff;
		height: 100vh;
		.pictrue {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: $uni-nothing-text;
			image {
				width: 414rpx;
				height: 380rpx;
			}
		}
	}
</style>
