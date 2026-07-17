<template>
	<!-- <view> -->
	<view class="footer">
		<view class="item" @click="showPopup">
			<view class="new-iconfont icon-mulu"></view>
			<view class="text">
				目录
			</view>
		</view>
		<view class="item" @click="settoggleCollection">
			<view class="new-iconfont" :class="is_collected ? 'icon-shoucang1' : 'icon-shoucang'"></view>
			<view class="text">
				收藏
			</view>
		</view>
		<view class="item" @click="change('share')">
			<view class="new-iconfont icon-weixin"></view>
			<view class="text">
				分享
			</view>
		</view>
		<view class="item" v-if="mp3Url" @click="showMp3 = true">
			<view class="new-iconfont icon-bofang"></view>
			<view class="text">
				全文朗读
			</view>
		</view>
		<view class="item" v-if="isRead">
			<view class="new-iconfont icon-shu"></view>
			<view class="text">
				阅读模式
			</view>
		</view>

		<!-- 开始播放 -->
		<Mp3 :title="title" :src="mp3Url" :show="showMp3" @destroy="showMp3 = false" />
		<uni-popup ref="popup" type="bottom">
			<view class="popup-footer">
				<view class="popup-title">目录<text @click="closePopup" class="new-iconfont icon-chacha"></text></view>

				<view class="popup-content">
					<template v-if="moreCatalogue.length">
						<template v-for="val, i in moreCatalogue">
							<view class="title">
								<view class="border"></view> {{val.name}}
							</view>
							<view class="content">
								<view class="item" v-for="item, index in val.arr" :key="index"
									@click="changeScroll(i, val)">{{item.label || item.name}}</view>
							</view>
						</template>
					</template>
					<template v-else>
						<view class="title">
							<view class="border"></view> 简介
						</view>
						<view class="content" v-if=" catalogue && catalogue.length">
							<view class="item" v-for="item, index in catalogue" :key="index"
								@click="changeScroll(index, item)">{{item.label || item.name}}</view>
						</view>
					</template>
				</view>
			</view>
		</uni-popup>
	</view>

	<!-- </view> -->
</template>

<script>
	import Mp3 from "./mp3.vue"
	import {
		toggleCollection,
		isCollected
	} from "@/api/encyclopedia.js";
	export default {
		name: 'category',
		components: {
			Mp3
		},
		props: {
			// isCollected: {
			// 	type: Boolean,
			// 	default: false
			// },
			id: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			mp3Url: {
				type: String,
				default: ''
			},
			isRead: {
				type: Boolean,
				default: true
			},
			moreCatalogue: {
				type: Array,
				default: ()=>{
					return []
				}
			},
			catalogue: {
				type: Array,
				default: ()=>{
					return []
				}
			}
		},
		data() {
			return {
				showMp3: false,
				is_collected: false
			};
		},
		created() {
			this.getisCollected()
		},
		methods: {
			showPopup() {
				this.$refs.popup.open('bottom')
			},
			closePopup() {
				this.$refs.popup.close()
			},
			async getisCollected() {
				let {
					data
				} = await isCollected({
					type: this.type,
					target_id: this.id
				})
				this.is_collected = data.is_collected
			},
			async settoggleCollection() {
				await toggleCollection({
					type: this.type,
					target_id: this.id
				})
				this.is_collected = !this.is_collected
			},
			change(value) {
				this.$emit('change', value)
			},
			changeScroll(index, item) {
				this.$emit('changeScroll', index, item)
				this.closePopup()
			},
			goNextPage(item) {
				if (item.url) {
					uni.navigateTo({
						url: '/pages/paaralan/' + item.url
					})
				} else {
					uni.navigateTo({
						url: '/pages/paaralan/search?id=' + item.id
					})
				}

			},
		}
	}
</script>

<style lang="scss" scoped>
	.footer {
		position: sticky;
		bottom: 0;
		background-color: #fff;
		padding: 20rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		text-align: center;
		font-size: 24rpx;
		color: #666;

		.new-iconfont {
			font-size: 40rpx;
		}

		.icon-shoucang1 {
			color: var(--main-color);
		}
	}


	.popup-footer {
		background-color: #fff;
		padding: 30rpx;
		text-align: left;

		.popup-title {
			display: flex;
			justify-content: space-between;
			font-weight: 700;
			font-size: 36rpx;
			color: #000;

			text {
				width: 30rpx;
				height: 30rpx;
			}
		}

		.popup-content {
			max-height: 50vh;
			overflow-y: auto;

			.title {
				display: flex;
				align-items: center;
				color: #000;
				font-size: 32rpx;
				font-weight: 700;
				padding: 30rpx 0;

				.border {
					background-color: var(--main-color);
					width: 20rpx;
					height: 20rpx;
					margin-right: 10rpx;
				}
			}

			.content {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.item {
					width: calc(50% - 10rpx);
					background-color: #eee;
					text-align: center;
					margin-bottom: 20rpx;
					border-radius: 10rpx;
					padding: 10rpx 0;
					font-size: 28rpx;
				}
			}
		}
	}
</style>