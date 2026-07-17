<template>
	<view class="recently" v-if="info.id">
		<view class="close new-iconfont icon-cuo" @click="close"></view>
		<view class="content">
			<image class="img" :src="info.cover_image" mode=""></image>
			<view class="info">
				<view class="label">
					<view class="title">
						{{ info.name }}
					</view>
					<view class="">
						上次看到：{{ formatTime(info.view_duration || 0) }}
					</view>
				</view>
				<view class="btn" @click="goDetails">
					立即查看
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getLastSubjectView,
	} from "@/api/paaralan.js";
	export default {
		name: 'topMenu',
		props: {
			header: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				info: {}
			};
		},
		async onShow() {
			if (uni.getStorageSync('LOGIN_STATUS_TOKEN')) {
				let {
					data
				} = await getLastSubjectView()
				this.info = data || {}
			}
		},
		methods: {
			close() {

			},
			goDetails() {
				uni.navigateTo({
					url: '/pages/paaralan/details?id=' + this.info.id
				})
			},

			formatTime(seconds) {
				const date = new Date(seconds * 1000); // 将秒转换为毫秒
				const hh = date.getUTCHours();
				const mm = date.getUTCMinutes();
				const ss = date.getSeconds();
				return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recently {
		position: fixed;
		bottom: 110rpx;
		left: 30rpx;
		right: 30rpx;
		z-index: 2;

		.close {
			position: absolute;
			right: 0;
			top: -20rpx;
			color: #bbb;
			font-size: 42rpx;
		}

		.content {
			background-color: #fff;
			height: 100rpx;
			border-radius: 70rpx;
			box-shadow: 0 10rpx 30rpx #66666666;
			display: flex;
			align-items: center;
			padding: 0 20rpx;

			.img {
				width: 80rpx;
				height: 80rpx;
				display: block;
				border-radius: 50%;
			}

			.info {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: calc(100% - 100rpx);
				margin-left: 20rpx;

				.label {
					color: #666;
					font-size: 20rpx;

					.title {
						font-size: 24rpx;
						color: #333;
						margin-bottom: 6rpx;
					}
				}

				.btn {
					border: 2rpx solid #eee;
					padding: 8rpx 20rpx;
					color: #777;
					border-radius: 50rpx;
					font-size: 24rpx;
				}
			}
		}
	}
</style>