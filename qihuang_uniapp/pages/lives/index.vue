<template>
	<view class="content">
		<image src="/static/images/user/setting_bg.png" class="bg" mode="widthFix"></image>

		<view class="relative">
			<view class="block">
				<view class="title">
					{{info.title}}
				</view>
				<view class="top-time">
					直播时间：{{info.live_start_time}}
				</view>
				<view class="top-bottom">
					专科直播讲师：{{info.lecturer_name}}
				</view>
				<view class="top-description">
					标签：{{info.tags}}
				</view>
			</view>
			<view class="block">
				<view class="title">
					直播间预约码使用说明：
				</view>
				<rich-text :nodes="info.description"></rich-text>

			</view>
			<view class="block input">
				<view class="new-iconfont icon-shouji"></view>
				<input v-model="code" placeholder="请输入预约码" />
			</view>

			<view class="copy" @click="$goNextPage('/pages/messages/livebooking')">
				已有预约码，去复制
			</view>
			<view class="btn" @click="save">
				使用
			</view>
		</view>
	</view>
</template>

<script>
	import {
		appointmentWithInviteCode,
		getAppointmentDetail
	} from '@/api/live.js'

	export default {
		data() {
			return {
				// list: [],
				info: {},
				code: '',
				id: '',
			}
		},

		onLoad(e) {
			this.id = e.id
			this.getInfo()
		},
		methods: {
			async save() {
				await appointmentWithInviteCode({
					appointment_id: this.id,
					invite_code: this.code
				})
			},
			change(e) {
				this.tabKey = e
				this.getInfo()
			},
			async getInfo() {
				let {
					data
				} = await getAppointmentDetail({
					appointment_id: this.id
				})
				this.info = data
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 100vh;
		background: linear-gradient(180.00deg, rgba(247, 248, 250, 0.3), rgba(247, 248, 250, 1) 100%);

		.bg {
			width: 100%;
			position: absolute;
		}

		.relative {
			position: relative;
			top: 120rpx;

			.block {
				margin: 0 40rpx 40rpx;
				padding: 30rpx;
				border-radius: 20rpx;
				background-color: #fff;
				// font-size: 26rpx;
				box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.2);

				.title {
					font-size: 32rpx;
					margin-bottom: 20rpx;
					font-weight: 700;
				}

				.top-time {
					margin-bottom: 20rpx;
				}

				.top-description {
					margin-top: 20rpx;
				}

				&.input {
					display: flex;
					align-items: center;
					border-radius: 100rpx;

					.new-iconfont {
						margin-right: 20rpx;
						font-size: 40rpx;
					}

					input {
						width: 100%;
					}
				}
			}

			.copy {
				text-align: right;
				color: #26437F;
				font-size: 24rpx;
				margin: 20rpx 40rpx 40rpx 0;
			}

			.btn {
				color: #fff;
				height: 86rpx;
				margin: 0 40rpx;
				border-radius: 86rpx;
				line-height: 86rpx;
				text-align: center;
				font-size: 32rpx;
				box-shadow: 0px 1px 1px 0px rgba(152, 156, 203, 1);
				background: linear-gradient(180.00deg, rgba(38, 67, 127, 1), rgba(7, 16, 47, 1) 100%);
			}
		}
	}
</style>