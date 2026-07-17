<template>
	<view class="page">
		<view class="bg-fff">

			<image class="image" src="/static/images/message/banner.png" mode="widthFix"></image>
		</view>

		<view class="content" v-if="cellList">
			<view class="item-content" @click="goPage({message_type: 'interaction'})">
				<image class="icon" :src="`/static/images/message/interaction.png`" mode="widthFix">
				</image>
				<view class="right">
					<view class="title">
						<view class="title-container">
							<view class="title-life">
								互动消息
							</view>
						</view>
						<view class="time">

						</view>
					</view>
					<view class="text">
						<text class="overflow">
							点击查看互动消息
						</text>
					</view>
				</view>
			</view>
			<view class="item-content" v-for="item in cellList" @click="goPage(item)">
				<image class="icon" :src="`/static/images/message/${item.message_type}.png`" mode="widthFix">
				</image>
				<view class="right">
					<view class="title">
						<view class="title-container">
							<view class="title-life">
								{{item.message_type_text}}
							</view>
							<view class="title-top" v-if="item.latest_message">
								{{item.latest_message.is_top_text}}
							</view>
						</view>
						<view class="time">
							{{item.latest_message ? item.latest_message.update_time_formatted : ''}}
						</view>
					</view>
					<view class="text">
						<text class="overflow">
							<text v-if="item.message_type == 'interaction'">
								{{item.unread_count ? '有新的互动消息' : '没有最新消息通知'}}
							</text>
							<text v-else-if="item.message_type == 'live_start_notice'">
								{{item.latest_message && item.latest_message.message_data_parsed ? item.latest_message.message_data_parsed.title : '没有最新消息通知'}}
							</text>
							<text v-else>{{item.latest_message && item.latest_message.message_data_parsed ? item.latest_message.message_data_parsed.content : '没有最新消息通知'}}</text>
						</text>
						<text class="num" v-if="item.unread_count">{{item.unread_count}}</text>
					</view>
				</view>
			</view>
			<view class="tips">
				没有更多啦~
			</view>
		</view>
		<emptyPage v-else />
		<!-- <customTab active="message"></customTab> -->
	</view>
</template>

<script>
	import {
		getSystemMessageList,
		getInteractiveMessages,
		getLatestSystemMessage
	} from "@/api/message.js"
	import customTab from '@/components/customTab';
	import emptyPage from "@/components/emptyPage.vue"
	export default {
		data() {
			return {
				cellList: [],
				interactive: [],
				// testlist: [
				// 	{title: '直播预约码', time: '17:50', content: '这个里面是内容', count: 10, is_top: false, logo: '', url: '', key: 'live_code'},
				// 	{title: '新关注我的', time: '17:50', content: '', count: 0, is_top: false, logo: '', url: '', key: 'live_code'},
				// 	{title: '互动消息', time: '17:50', content: '家豪等5人近期访问过你的主页', count: 1, is_top: false, logo: '', url: '', key: 'live_code'},
				// ]
			}
		},
		components: {
			customTab,
			emptyPage
		},
		onShow() {
			this.getList()
		},
		methods: {
			goPage(item) {
				let url
				switch (item.message_type) {
					case 'interaction': // 互动消息
						url = '/pages/messages/interaction'
						break;
					case 'live_appointment': // 直播预约码
						url = '/pages/messages/livebooking'
						break;
					case 'new_followers': // 新关注我的
						url = '/pages/users/concern/index?type=followers&read=true'
						break;
					case 'live_start_notice': // 直播通知
						url = '/pages/messages/liveStart'
						break;
					default:
						url = '/pages/messages/details?type=' + item.message_type
						break;
				}
				this.$goNextPage(url)
			},
			async getList() {
				let data = await getLatestSystemMessage()
				// let interactive = await getInteractiveMessages()

				this.cellList = data.data.grouped_latest_messages
				// if (interactive.data.list?.length) {
				// 	this.interactive = interactive.data
				// }
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bg-fff {
		background-color: #fff;

		.image {
			width: 666rpx;
			display: block;
			margin: auto;
		}
	}

	.content {
		background-color: #fff;

		.tips {
			text-align: center;
			padding: 30rpx 0 50rpx;
			color: #666;
		}

		.item-content {
			padding: 10rpx 30rpx;
			display: flex;

			// align-items: center;
			// justify-content: space-between;
			.icon {
				width: 100rpx;
				height: 100rpx;
			}

			.right {
				width: calc(100% - 120rpx);
				margin-left: 20rpx;
				border-bottom: 2rpx solid #eee;
				padding-bottom: 20rpx;
				color: #999;

				// padding-bottom: 32rpx;
				.title {
					color: #333;
					padding-bottom: 10rpx;
					// font-weight: 700;
					font-size: 36rpx;
					display: flex;
					justify-content: space-between;

					.title-container {

						display: flex;
						align-items: center;
					}

					.title-life {
						margin-right: 10rpx;

					}

					.title-top {
						font-size: 18rpx;
						margin-left: 16rpx;
						padding: 2rpx 6rpx;
						background-color: #f0f0f0;
						border-radius: 4rpx;

					}
				}

				.time {
					font-size: 26rpx;
					color: #999;
				}

				.text {
					display: flex;
					justify-content: space-between;
					padding-bottom: 10rpx;
					font-size: 28rpx;

					.overflow {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						margin-right: 16rpx;
					}

					.num {
						min-width: 40rpx;
						height: 40rpx;
						background: linear-gradient(-35.13deg, rgba(212, 65, 65, 1), rgba(232, 101, 101, 1) 100%);
						border-radius: 50%;
						color: white;
						font-size: 24rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 0 4rpx;
						box-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.2);
					}

				}
			}
		}
	}
</style>