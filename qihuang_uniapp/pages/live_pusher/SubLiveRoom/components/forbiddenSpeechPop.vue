<template>
	<uni-popup ref="costShow" type="bottom" @change="close">
		<view class="popUp">
			<view class="tablist">
				<view v-for="(item, index) in tablist" :key="index" class="tabItem" :id="tabindex==index?'active':''"
					@click="ontab(index)">
					{{ item.name }}
				</view>
			</view>

			<view class="content" v-show="tabindex==0">
				<scroll-view scroll-y="true" class="scroll-Y">
					<view class="list" v-for="(item,index) in datalist" :key="index">
						<view class="list-image">
							<image :src="item.avatar"></image>
						</view>
						<view class="list-content">
							<view class="title">
								{{item.nickname}}
								<!-- <view>粉丝团</view> -->
							</view>
							<view class="list-info">
								<!-- 128个动态 · 28w粉丝 · 1关注 -->
							</view>
						</view>
						<view class="list-btn">
							<view class="qx" @click="sanction(1,item.uid,index)">取消禁言 </view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="content" v-show="tabindex==1">
				<scroll-view scroll-y="true" class="scroll-Y">
					<view class="list" v-for="(item,index) in datalist" :key="index">
						<view class="list-image">
							<image :src="item.avatar"></image>
						</view>
						<view class="list-content">
							<view class="title">
								{{item.nickname}}
								<!-- <view>粉丝团</view> -->
							</view>
							<view class="list-info">
								<!-- 128个动态 · 28w粉丝 · 1关注 -->
							</view>
						</view>
						<view class="list-btn">
							<view class="qx" @click="sanction(2,item.uid,index)">取消拉黑 </view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="btn" v-show="tabindex==0">
				<view @click="everyone">{{everyoneState?'取消全员禁言':'全员禁言'}}</view>
			</view>
		</view>
	</uni-popup>
</template>
<script>
	import {
		sanction
	} from '@/api/liveBroadcast.js';
	export default {
		name: 'forbiddenSpeechPop',
		props: {
			show: {
				type: Boolean,
				default: false,
			},
			datalist: {
				type: Array,
				default: [],
			},
			roomId: {
				type: String,
				default: '',
			}
		},
		data() {
			return {
				tabindex: 0,
				tablist: [{
						name: '禁言列表',
						id: ''
					},
					{
						name: '拉黑列表',
						id: ''
					},
				],
				everyoneState: false
			};
		},
		watch: {
			show(newVal) {
				if (newVal) {
					this.$refs.costShow.open()
				}
			},
		},
		created() {},
		methods: {
			ontab(index) {
				this.$emit('tab', index)
				this.tabindex = index

			},
			close() {
				this.$emit('close', false)
			},
			sanction(sanctiondata, userId, index) {
				let str = {
					room_id: this.roomId,
					sanction_user_id: userId,
					sanction: sanctiondata ,//处罚 1禁言 2拉黑
					operate:'restore'
				}
				sanction(str).then(res => {
					console.log(res)
					if (res.status == 200) {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
						this.datalist.splice(index, 1)

					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					}
				})
			},
			everyone() {
				this.$emit('everyone', this.everyoneState ? 'off' : 'open')
				this.everyoneState = !this.everyoneState
			}
		}
	}
</script>

<style scoped lang="scss">
	.popUp {
		width: 100%;
		height: 800rpx;
		background: #ffffff;
		/* 半透明白色背景 */
		backdrop-filter: blur(10px);
		/* 添加背景模糊效果 */
		-webkit-backdrop-filter: blur(10px);
		/* 兼容WebKit内核的浏览器，如Safari */
		// padding: 16rpx 32rpx 54rpx 32rpx;
		padding: 6rpx 36rpx 76rpx 36rpx;
		box-sizing: border-box;
		border-radius: 12rpx 12rpx 0 0;

	}

	.tablist {
		height: 104rpx;
		display: flex;
		align-items: center;
		margin-bottom: 40rpx;

		.tabItem {
			width: 140rpx;
			margin-right: 38rpx;
			color: #c2cad4;
		}

		#active {
			font-size: 33rpx;
			font-weight: 500;
			text-align: center;
			line-height: 104rpx;
			position: relative;
			color: #000000;
		}

		#active::before {
			position: absolute;
			bottom: 0;
			left: 50%;
			content: '';
			width: 62rpx;
			height: 6rpx;
			background: #182bff;
			transform: translate(-50%, 0);
		}
	}

	.scroll-Y {
		height: 100%;
	}

	.content {
		height: 500rpx;

		.list {
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;
			margin-bottom: 60rpx;

			.list-image {
				width: 93rpx;
				height: 93rpx;

				image {
					width: 93rpx;
					height: 93rpx;
					border-radius: 50%;
					border: 1px solid #efefef;
				}
			}

			.list-content {
				width: 390rpx;
				padding-top: 10rpx;

				.title {
					height: 35rpx;
					display: flex;
					align-items: center;
					font-size: 26rpx;
					color: #182bff;

					view {
						width: 73rpx;
						height: 35rpx;
						font-size: 20rpx;
						background: #ff4d5e;
						color: #ffffff;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-left: 12rpx;
						border-radius: 12rpx;
					}
				}

				.list-info {
					margin-top: 13rpx;
					line-height: 32rpx;
					font-size: 22rpx;
					color: #c6ced6;
				}
			}

			.list-btn {
				display: flex;
				align-items: center;

				view {
					width: 146rpx;
					height: 65rpx;
					border-radius: 12rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 22rpx;
				}

				.qx {
					background: #0c1332;
					color: #ffffff;
				}
			}
		}
	}

	.btn {
		display: flex;
		justify-content: center;
		margin-top: 30rpx;

		view {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 520rpx;
			height: 80rpx;
			border-radius: 12rpx;
			color: #ffffff;
			background: #ff4e5f;
		}
	}
</style>