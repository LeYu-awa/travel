<template>
	<view class="content" v-if="list.length">
		<view class="text" v-for="item in list">
			<view class="time">
				{{item.update_time_formatted}}
			</view>
			<view class="block">
				<view class="image">
					<image class="icon" src="/static/images/message/live_appointment.png" mode="widthFix">
					</image>
				</view>
				<view class="item">

					<view class="item-notice">
						{{item.message_type_text}}
					</view>

					<view class="item-details">
						<text>{{item.message_data_parsed.title}}</text>
					</view>
					<view class="item-title">
						{{item.message_data_parsed.appointment_code}}
					</view>

					<view class="item-bottom" @click="copyText(item.message_data_parsed.appointment_code)">
						<view class="item-content" style="width: 100%;">
							{{item.message_data_parsed.content}}
						</view>
						<view class="btn">
							复制预约码
						</view>
					</view>
				</view>

			</view>
			<!-- <view class="img">
				<view class="img-title">
					<view class="liveicon">
						<image class="live-icon" src="/static/images/message/Icon_living.png"></image>
					</view>
					<view class="live-title">
						直播中
					</view>
				</view>

				<image class="live-image" src="/static/images/message/liveimg.png" mode="widthFix">

				</image>
				<view class="img-bottom">
					进入直播间
				</view>

			</view> -->
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
			this.pageQuery.message_type = 'live_appointment'
			this.getList()
		},
		async onShow() {
			await markSystemMessageAsRead({
				message_type: 'live_appointment'
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
			copyText(text) {
				uni.setClipboardData({
					data: text,
					success: function() {
						uni.showToast({
							title: '复制成功',
							icon: 'success'
						});
					},
					fail: function() {
						uni.showToast({
							title: '复制失败',
							icon: 'none'
						});
					}
				});
			},
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

		.item-title {
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
				font-size: 28rpx;
				// border: 1rpx solid #000;
				border-radius: 10px;
				padding: 30rpx;



				.item-details {
					font-size: 32rpx;
					margin: 26rpx 0 10rpx;
					text-align: center;
				}

				.item-title {
					font-size: 48rpx;
					text-align: center;
					margin-bottom: 24rpx;
				}

				.item-bottom {

					display: block;

					.btn {
						border-radius: 40rpx;
						/* 矩形 263 */
						text-align: center;
						width: 322rpx;
						height: 70rpx;
						line-height: 70rpx;
						color: #fff;
						border-radius: 40rpx;

						background: var(--蓝黑渐变, linear-gradient(180.00deg, rgba(38, 67, 127, 1), rgba(7, 16, 47, 1) 100%));
						margin: 40rpx auto 0;
					}


					.item-content {
						width: 288rpx;
						font-size: 32rpx;

						text {
							olor: var(--蓝黑渐变, linear-gradient(180.00deg, rgba(38, 67, 127, 1), rgba(7, 16, 47, 1) 100%));
						}
					}


				}
			}
		}

		.img {
			margin: 40rpx 110rpx;
			width: 360rpx;
			position: relative;

			.img-title {
				border-radius: 10rpx;
				background-color: #80808055;

				color: #fff;
				position: absolute;
				left: 20rpx;
				top: 30rpx;
				z-index: 1;
				width: 136rpx;
				height: 40rpx;
				display: flex;

				.liveicon {
					border-radius: 10rpx;
					background: var(--线性渐变, linear-gradient(137.83deg, rgba(255, 230, 140, 1), rgba(220, 170, 90, 1) 100%));
					width: 40rpx;
					height: 40rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					.live-icon {
						width: 28rpx;
						height: 28rpx;

						line-height: 40rpx;
					}

				}

				.live-title {
					width: 96rpx;
					font-size: 18rpx;
					text-align: center;
					align-items: center;
					line-height: 40rpx;
				}
			}

			.live-image {
				width: 360rpx;
				height: 550rpx;
			}

			.img-bottom {
				color: #fff;
				position: absolute;
				border-radius: 20rpx;
				width: 154rpx;
				height: 40rpx;
				font-size: 20rpx;
				text-align: center;
				line-height: 40rpx;
				background: var(--线性渐变, linear-gradient(137.83deg, rgba(255, 230, 140, 1), rgba(220, 170, 90, 1) 100%));
				right: 0;
				left: 0;
				margin: auto;
				bottom: 40rpx;
			}

		}
	}
</style>