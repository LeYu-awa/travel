<template>
	<view class="hot">
		<view class="title" v-if="header">
			<view class="left">
				<view class="new-iconfont icon-huo"></view>
				本周热销好课
			</view>
			<view class="right" @click="goPagRank()">
				更多课程
				<view class="new-iconfont icon-right"></view>
			</view>
		</view>
		<view class="list">
			<view class="item" v-for="item, index in list.slice(0, num || list.length)" :key="item.id"
				@click="goDetails(item)">
				<view class="left">
					<view class="ranking">
						<image class="ranking-img"
							:src="'/static/images/paaralan/hot' + (index > 3 ? 4 : index + 1) + '.png'" mode="">

						</image>
						<view class="num">{{ index + 1 }}</view>
					</view>

					<image class="img" :src="item.cover_image" mode=""></image>
					<view class="tag">
						付费
					</view>
				</view>
				<view class="right">
					<view class="label">
						{{item.name}}
					</view>
					<view class="text">
						<text class="new-iconfont icon-yanjing"></text>
						{{item.virtual_user_num + item.view_num}}次播放
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getNavList,
	} from "@/api/paaralan.js";
	export default {
		name: 'topMenu',
		props: {
			header: {
				type: Boolean,
				default: true
			},
			num: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				list: [],
			};
		},
		created() {
			this.getList()
		},
		methods: {
			async getList() {
				let {
					data
				} = await getNavList({
					id: 2
				})
				this.list = data[0].subjects
			},
			// 去排行榜
			goPagRank() {
				uni.navigateTo({
					url: '/pages/paaralan/pagRank'
				})
			},
			// 进入详情
			goDetails(item) {
				uni.navigateTo({
					url: '/pages/paaralan/details?id=' + item.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hot {
		padding: 30rpx 30rpx 0;

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 30rpx;

			.left,
			.right {
				display: flex;
				align-items: center;
			}

			.left {
				font-weight: 700;
				font-size: 36rpx;

				.new-iconfont {
					font-size: 36rpx;
					margin-right: 20rpx;
					color: red;
				}
			}
		}

		.list {
			.item {
				margin-bottom: 20rpx;
				display: flex;

				&:last-of-type {
					margin-bottom: 0;
				}

				.left {
					position: relative;

					.ranking {
						position: absolute;
						z-index: 1;

						.ranking-img {
							width: 80rpx;
							height: 60rpx;
							position: absolute;
							left: -20rpx;
							top: -20rpx;
						}

						.num {
							position: absolute;
							z-index: 1;
							width: 40rpx;
							height: 20rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							color: #fff;
						}
					}

					.img {
						width: 260rpx;
						height: 140rpx;
						border-radius: 12rpx;
					}

					.tag {
						background-color: #F2BC96;
						color: #633617;
						position: absolute;
						right: 0;
						top: 0;
						padding: 4rpx 10rpx;
						border-top-right-radius: 10rpx;
						border-bottom-left-radius: 10rpx;
						font-size: 24rpx;
					}
				}

				.right {
					width: calc(100% - 280rpx);
					margin-left: 20rpx;

					.label {
						font-size: 32rpx;
						font-weight: 700;
						height: 100rpx;
					}

					.text {
						.new-iconfont {
							margin-right: 10rpx;
						}
					}
				}
			}
		}

	}
</style>