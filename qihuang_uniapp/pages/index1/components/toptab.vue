<template>
	<view class="box">
		<view class="content">
			<view class="top-tab">
				<view class="left">
					<view class="item" @click="ongoto('/pages/liveBroadcast/index')">
						<view class="item-image">
							<image src="/static/images/index/index11.png"></image>
						</view>
						<view class="item-title">公益大讲堂</view>
						<view class="item-text">每日手法医学开源技术直播</view>
					</view>
				</view>
				<view class="right">
					<view class="item top" @click="ongoto('/pages/news_list/index')">
						<view class="item-image">
							<image src="/static/images/index/index22.png"></image>
						</view>
						<view class="item-title">家风家教</view>
						<view class="item-text">家庭传承的规范和准则</view>
					</view>
					<view class="item bottom" @click="ongoto('/pages/plant_grass/index')">
						<view class="item-image">
							<image src="/static/images/index/index33.png"></image>
						</view>
						<view class="item-title">手法学堂</view>
						<view class="item-text">古法今用的手法技艺传承场</view>
					</view>
				</view>
			</view>
			<view class="bottom-view">
				<view class="bottom-item">
					<view class="bottom-item-image">
						<image src="/static/images/index/index55.jpg"></image>
					</view>
					<view class="bottom-item-text">阳台岐黄圃</view>
				</view>
				<view class="bottom-item">
					<view class="bottom-item-image">
						<image src="/static/images/index/index66.jpg"></image>
					</view>
					<view class="bottom-item-text">3D经络</view>
				</view>
				<view class="bottom-item">
					<view class="bottom-item-image">
						<image src="/static/images/index/index77.jpg"></image>
					</view>
					<view class="bottom-item-text">岐黄自诊</view>
				</view>
				<view class="bottom-item">
					<view class="bottom-item-image">
						<image src="/static/images/index/index88.jpg"></image>
					</view>
					<view class="bottom-item-text">互联网医院</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'toptab',
		props: {

		},
		data() {
			return {

			};
		},
		created() {},
		methods: {
			ongoto(url) {
				if (url == '/pages/plant_grass/index') {
					uni.switchTab({
						url: '/pages/plant_grass/index'
					})
				} else {
					uni.navigateTo({
						url: url
					});
				}

			}
		}
	}
</script>

<style scoped lang="scss">
	.box {
		padding: 0 10rpx;
		box-sizing: border-box;
		margin-top: 20rpx;

		.content {
			width: 100%;

			.top-tab {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 24rpx;
				height: 380rpx;

				.left {
					background-color: #ddf4fa;
					height: 380rpx;
					border-radius: 16rpx;
					overflow: hidden;
				}

				.right {
					height: 380rpx;
					display: grid;
					grid-template-rows: 1fr 1fr;
					gap: 24rpx;

					.top,
					.bottom {
						background-color: #ddf4fa;
						border-radius: 16rpx;
					}
				}

				.item {
					width: 100%;
					height: 100%;
					padding: 20rpx;
					position: relative;

					.item-image {
						width: 100%;
						height: 100%;
						position: absolute;
						left: 0;
						right: 0;
						bottom: 0;
						top: 0;

						image {
							width: 100%;
							height: 100%;

						}
					}

					.item-title,
					.item-text {
						position: relative;
					}

					.item-title {
						line-height: 40rpx;
						font-size: 30rpx;
						font-weight: bold;
						text-align: left;
					}

					.item-text {
						color: #717273;
						line-height: 28rpx;
						font-size: 24rpx;
						text-align: left;
					}
				}



			}
		}
	}

	.bottom-view {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		margin-top: 53rpx;
		box-sizing: border-box;

		.bottom-item {
			width: 120rpx;
			position: relative;
			display: flex;
			align-items: center;
			flex-direction: column;
			.bottom-item-image {
				width: 80rpx;
				height: 80rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.bottom-item-text {
				margin-top: 20rpx;
				font-size: 24rpx;
				text-align: center;
			}
		}
	}
</style>