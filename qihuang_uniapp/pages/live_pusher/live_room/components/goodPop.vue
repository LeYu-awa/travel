<template>
	<uni-popup ref="costShow" type="bottom" @change="close">
		<view class="popUp">
			<view class="popUp-title">
				直播间商品清单
				<text>{{list.length}}件商品</text>
				<image @click="clickClose" src="/static/images/liveRoom/close.jpg"></image>
			</view>
			<view class="popUp-content">
				<scroll-view scroll-y="true" class="scroll-Y" :show-scrollbar="false">
					<view class="list" v-for="(item,ink) in goodList" :key="ink">
						<image class="list-image" mode="aspectFill" :src="item.image"></image>
						<view class="list-right">
							<view class="list-right-title">{{item.store_name}}</view>
							<view class="list-right-h2">{{item.store_info}}</view>
							<view class="list-right-bottom">
								<view class="list-right-bottom-left"><text>￥</text>{{item.price}}</view>
								<view class="list-right-bottom-right">
									<text>剩余{{item.stock}}件</text>
									<view class="sellOut" v-if="item.stock==0">已售罄</view>
									<view class="buying" v-else @click="ongood(item)">去抢购</view>

								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</uni-popup>
</template>
<script>
	import {
		getLiveGoods
	} from '@/api/liveBroadcast.js';
	export default {
		name: 'goodPop',
		props: {
			show: {
				type: Boolean,
				default: false,
			},
			roomId: {
				type: String,
				default: '',
			},
			goodList: {
				type: Array,
				default () {
					return []
				}
			},
		},
		data() {
			return {
				list: [],
			};
		},
		watch: {
			show(newVal) {
				if (newVal) {
					this.$refs.costShow.open()
				}
			},
		},
		created() {
			// this.getLiveGoods()
		},
		methods: {
			// 商品列表
			getLiveGoods() {
				getLiveGoods({
					room_id: this.roomId
				}).then(res => {
					if (res.status == 200) {
						this.list = res.data

					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				})
			},
			clickClose() {
				this.$refs.costShow.close()
				this.$emit('close', false)
			},
			close() {
				this.$emit('close', false)
			},
			ongood(data) {
				this.$emit('goodinfo', data)
			}
		}
	}
</script>

<style scoped lang="scss">
	// /deep/ ::-webkit-scrollbar {
	// 	display: block; 
	// 	width: 0 !important;
	// 	height: 0 !important;
	// 	-webkit-appearance: auto!important;
	// 	background:transparent;
	// 	overflow: auto!important;
	// }
	.popUp {
		width: 100%;
		// height: 700rpx;
		background: rgba(255, 255, 255, 0.3);
		/* 半透明白色背景 */
		backdrop-filter: blur(10px);
		/* 添加背景模糊效果 */
		-webkit-backdrop-filter: blur(10px);
		/* 兼容WebKit内核的浏览器，如Safari */
		// padding: 16rpx 32rpx 54rpx 32rpx;
		padding: 50rpx 20rpx 54rpx 20rpx;
		box-sizing: border-box;
		border-radius: 12rpx 12rpx 0 0;

		.popUp-title {
			height: 40rpx;
			line-height: 40rpx;
			font-size: 26rpx;
			color: #ffffff;
			position: relative;

			image {
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				right: 18rpx;
				top: 0;
			}

			text {
				font-size: 22rpx;
				margin-left: 10rpx;
				color: rgba(255, 255, 255, 0.5);
			}
		}

		.popUp-content {
			height: 650rpx;

			.list {
				margin-top: 50rpx;
				display: flex;

				.list-image {
					width: 148rpx;
					height: 148rpx;
					border-radius: 8rpx;
				}

				.list-right {
					width: 540rpx;
					margin-left: 18rpx;

					.list-right-title {
						line-height: 48rpx;
						font-size: 28rpx;
						color: #ffffff;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.list-right-h2 {
						line-height: 42rpx;
						font-size: 22rpx;
						color: rgba(255, 255, 255, 0.6);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.list-right-bottom {
						height: 55rpx;
						margin-top: 5rpx;
						display: flex;
						flex-flow: row wrap;
						justify-content: space-between;

						.list-right-bottom-left {
							display: flex;
							align-items: center;
							font-size: 28rpx;
							font-weight: bold;
							color: #ffffff;

							text {
								font-size: 20rpx;
								margin-right: 6rpx;
							}
						}

						.list-right-bottom-right {
							display: flex;
							align-items: center;

							text {
								font-size: 23rpx;
								margin-right: 20rpx;
								color: rgba(255, 255, 255, 0.6);
							}

							view {
								width: 190rpx;
								height: 55rpx;
								border-radius: 8rpx;
								display: flex;
								align-items: center;
								justify-content: center;
								font-size: 23rpx;
							}

							.buying {
								background: #ff4e5f;
								color: #ffffff;
							}

							.sellOut {
								background: #1d233d;
								color: rgba(255, 255, 255, 0.6);
							}
						}
					}
				}
			}
		}
	}

	.scroll-Y {
		height: 100%;

		::-webkit-scrollbar {
			display: none;
		}

		/* 对于Firefox */
		scrollbar-width: none;
		/* Firefox 64+ */
	}
</style>