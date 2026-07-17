<template>
	<view :style="viewColor">
		<view class="application-list" v-if="listData.length">
			<view @click="goDetail(item)" class="card-list" v-for="item in listData" :key="item.activity_id">
				<view class="card-top" :style="'background-image: url('+item.pic+')'"></view>
				<view class="card-bottom">
					<view class="title">{{item.activity_name}}</view>
					<view class="bottom acea-row">
						<view>
							<view class="item">
								<view class="name">已报名人数：</view>
								<view class="count">
									{{item.total}}人
								</view>
							</view>
							<view class="item">
								<view class="name">报名截止时间：</view>
								<view class="count">
									{{formatDate(new Date(item.end_time))}}
								</view>
							</view>
						</view>
						<view v-if="item.total==item.count && item.count!=0" class="go-sign disabled">已报满</view>
						<view v-else class="go-sign" :class="{'disabled' : item.time_status!=1}">{{item.time_status==-1?'已结束' : item.time_status==0?'未开始':'去报名'}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class='no-shop' v-if="!listData.length && !loading">
			<view class='pictrue' style="margin: 0 auto;">
				<image :src="`${domain}/static/images/noCart.png`"></image>
				<text>暂无数据!</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { getRechargeList } from '@/api/user.js'
	import {HTTP_REQUEST_URL} from '@/config/app';
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
	export default {
		data() {
			return {
				domain:HTTP_REQUEST_URL,
				loading: false,
				listData: [],
				count: 0,
				pageData: {
					page: 1,
					limit: 3,
				}
			}
		},
		computed:{
			...mapGetters(['isLogin','uid','viewColor']),
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
				getRechargeList(this.pageData).then(res => {
					this.count = res.data.count
					this.listData = this.listData.concat(res.data.list)
					uni.hideLoading();
					this.loading = false
				})
			},
			formatDate(date){  
				let year = date.getFullYear();
				let month = date.getMonth()+1;  
				let day = date.getDate();  
				month = month < 10 ?'0'+ month : month;  
				day = day < 10 ?'0'+ day : day;  
				return year +'-'+ month +'-'+ day;
			},
			goDetail(item){
				if(this.isLogin){
					uni.navigateTo({
						url: `/pages/activity/registrate_activity/index?id=${item.activity_id}&spid=${this.uid}`
					});
				}else{
					toLogin()
				}
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
	.application-list {
		background-color: #F5F5F5;
		padding: 30rpx;
		.card-list {
			width: 100%;
			background-color: #ffffff;
			margin-bottom: 30rpx;
			border-radius: 16rpx;
			.card-top{
				background-size: 100%;
				background-repeat: no-repeat;
				width: 690rpx;
				height: 322rpx;
				border-radius: 16rpx 16rpx 0 0;
			}
			.card-bottom {
				padding: 30rpx;
				.title{
					font-size: 30rpx;
					color: #333333;
					font-weight: bold;
				}
				.bottom{
					margin-top: 30rpx;
					align-items: flex-end;
					justify-content: space-between;
					.item{
						display: flex;
						align-items: center;
						color: #999999;
						&:last-child{
							margin-top: 20rpx;
						}
						&::before{
							content: "";
							width: 6rpx;
							height: 6rpx;
							background: #FFAA00;
							border-radius: 100%;
							margin-right: 10rpx;
						}
						.count{
							color: #666666;
							text{
								color: var(--view-theme);
								display: inline-block;
								margin-left: 6rpx;
							}
						}
					}
					.go-sign{
						font-size: 26rpx;
						color: #ffffff;
						width: 140rpx;
						height: 56rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 30rpx;
						background: var(--view-theme);
						&.disabled{
							background: #BBBBBB;
						}
					}
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
