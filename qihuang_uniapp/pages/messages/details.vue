<template>
	<view class="content" v-if="list.length">
		<view class="text" v-for="item in list">
			<view class="time">
				{{item.update_time_formatted}}
			</view>
			<view class="block">
				<view class="image">
					<image class="icon" :src="`/static/images/message/${pageQuery.message_type}.png`" mode="widthFix">
					</image>
				</view>
				<view class="item">
					<view class="item-top">
						<view class="item-notice">
							{{item.message_type_text}}
						</view>
						<!-- <view class="item-details">
							查看详情 <text class="new-iconfont icon-right"></text>
						</view> -->
					</view>
					<view class="item-title">
						{{item.message_data_parsed.title}}
					</view>
					<view class="item-bottom" v-if="false">
						<view class="item-content">
								{{item.message_data_parsed.content}}
						</view>
						<view class="image-box">
							<image class="img" src="/static/images/message/honey.png" mode="widthFix">
							</image>
						</view>
					</view>
					<view v-else class="item-bottom noFlex">
						<view class="item-content" style="width: 100%;">
							{{item.message_data_parsed.content}}
						</view>
						<!-- <view class="btn">
							去修改密码
						</view> -->
					</view>
				</view>
			</view>

		</view>

	</view>
	<emptyPage title="暂无数据" v-else />
</template>
<script>
	import emptyPage from "@/components/emptyPage.vue"
	import {
		getSystemMessageList,
		markSystemMessageAsRead 
	} from "@/api/message.js"
	export default {
		components:{
			emptyPage
		},
		data() {
			return {
				total: 0,
				pageQuery: {
					page: 1,
					limit: 20,
				},
				list: []
			}
		},
		onLoad(e) {
			this.pageQuery.message_type = e.type
			this.getList()
		},
		async onShow() {
			await markSystemMessageAsRead({
				message_type: this.pageQuery.message_type
			})
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
			async getList() {
				let data = await getSystemMessageList(this.pageQuery)
				this.total = data.data.count
				let details = data.data.grouped_messages[this.pageQuery.message_type]
				if (this.pageQuery.page == 1) {
					this.list = details.list
				} else {
					this.list = [...this.list, ...details.list]
				}
				uni.setNavigationBarTitle({
					title: details.message_type_text
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		.time {
			text-align: center;
			margin-top: 48rpx;
			color: rgba(153, 153, 153, 1);
			font-size: 26rpx;
			font-weight: 500;
			line-height: 24rpx;
			letter-spacing: 2rpx;

		}
		
		.item-title{
			font-weight: 700;
		}
		.block {
			display: flex;

			.image {
				margin: 42rpx 20rpx 0 24rpx;
				width: 78rpx;
				height: 78rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;

				.icon {
					width: 78rpx;
					height: 78rpx;

				}
			}

			.item {
				background-color: #fff;
				margin-top: 48rpx;
				max-width: 520rpx;
				min-width: 400rpx;
				font-size: 32rpx;
				// border: 1rpx solid #000;
				border-radius: 10px;
				padding: 30rpx;

				.item-top {
					display: flex;
					justify-content: space-between;
					font-size: 28rpx;
					margin-bottom: 34rpx;

					.item-details {
						font-size: 24rpx;
						display: flex;
						align-items: center;
					}
				}

				.item-bottom {
					justify-content: space-between;
					display: flex;
					margin-top: 20rpx;

					&.noFlex {
						display: block;

						.btn {
							border-radius: 40rpx;
							/* 矩形 263 */
							text-align: center;
							width: 322rpx;
							height: 70rpx;
							line-height: 70rpx;
							color: #fff;
							background: linear-gradient(148.94deg, rgba(255, 194, 194, 1), rgba(229, 88, 88, 1) 100%);
							margin: 40rpx auto 0;
						}
					}

					.item-content {
						width: 288rpx;
						font-size: 24rpx;
					}

					.image-box {
						width: 128rpx;
						height: 128rpx;
						border: #E4CD7B solid;
						box-sizing: border-box;
						border-radius: 10px;
						margin-left: 20rpx;

						display: flex;
						align-items: center;
						justify-content: center;

						.img {
							width: 100rpx;
							line-height: 128rpx;
						}
					}
				}
			}
		}




	}
</style>