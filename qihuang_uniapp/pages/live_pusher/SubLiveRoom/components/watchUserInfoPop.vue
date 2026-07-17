<template>
	<uni-popup ref="popup" type="bottom" border-radius="10px 10px 0 0">
		<view class="popUp">
			<view class="popUp-title">
				<view class='title'><text class='iconfont icon-guanbi' @tap='close'></text></view>
			</view>
			<view class="popUp-content">
				<view class="user-top flex items-center">
					<view class="left">
						<image src="/static/images/f.png" class="head"></image>
					</view>
					<view class="right">
						<view class="nickname">王者叫唤师</view>
						<view class="other-info flex-between items-center">
							<view>
								<text class="text-item">128个动态</text>
								<text class="text-item">28w粉丝</text>
								<text class="text-item">1关注</text>
							</view>
							<view class="main">TA的主页</view>
						</view>
					</view>
				</view>
				<view class="user-intro">
					王者荣耀资深召唤师，从未退步
				</view>
				<view class="btn-group">
					<view class="btn-item" @click="handleAttention">关注TA</view>
					<view class="btn-item" @click="handleShielding">
						<image src="/static/images/liveRoom/block.png"></image>拉黑
					</view>
					<view class="btn-item" @click="handleBanned">
						<image src="/static/images/liveRoom/Forbiddenbs.png"></image>禁言
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>
<script>
	import {
		getGiftList
	} from '@/api/liveBroadcast.js';
	export default {
		name: 'watchUserPop',
		data() {
			return {
				old: {
					scrollTop: 0
				},
				scrollTop: 0,
				userList: [],
			};
		},
		created() {},
		methods: {
			open(data) {
				this.userList = data || [];
				this.$refs.popup.open('bottom')
			},
			close() {
				this.$refs.popup.close()
				this.$emit('changeClose')
			},
			// 关注
			handleAttention() {
				console.log('点击关注')
			},
			// 拉黑
			handleShielding() {
				console.log('点击关注')
			},
			// 禁言
			handleBanned() {
				console.log('点击关注')
			}
		}
	}
</script>

<style scoped lang="scss">
	.flex {
		display: flex;
	}

	.flex-between {
		display: flex;
		justify-content: space-between;
	}

	.items-center {
		display: flex;
		align-items: center;
	}

	.popUp {
		width: 100%;
		background: #fff;
		padding: 0 0 54rpx 0;
		box-sizing: border-box;
		border-radius: 12rpx 12rpx 0 0;

		.popUp-title {
			.title {
				font-size: 32rpx;
				font-weight: bold;
				text-align: center;
				height: 123rpx;
				line-height: 123rpx;
				position: relative;
			}

			.iconfont {
				position: absolute;
				right: 30rpx;
				color: #8a8a8a;
				font-size: 35rpx;
			}

		}
	}

	.popUp-content {
		padding: 0 32rpx;

		.user-top {
			.left .head {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}

			.right {
				flex: 1;
				margin-left: 20rpx;

				.nickname {
					color: #587ff7;
					font-size: 28rpx;
					font-weight: bold;
				}

				.other-info {
					color: #8a8a8a;
					font-size: 24rpx;
					margin-top: 14rpx;

					.text-item {
						margin-right: 10rpx;
					}
				}

				.main {
					color: #587ff7;
				}
			}
		}

		.user-intro {
			color: #8a8a8a;
			margin-top: 20rpx;
			font-size: 24rpx;
		}

		.btn-group {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 60rpx;

			.btn-item {
				margin: 0 20rpx;
				width: 120rpx;
				height: 60rpx;
				text-align: center;
				line-height: 60rpx;
				border-radius: 8rpx;
				color: #fff;
				font-size: 28rpx;
				background-color: #342e2e;
			}

			.btn-item:first-of-type {
				background-color: #587ff7;
			}
		}
	}
</style>