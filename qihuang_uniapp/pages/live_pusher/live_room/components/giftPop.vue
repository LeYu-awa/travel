<template>
	<uni-popup ref="costShow" type="bottom" @change="close">
		<view class="popUp">
			<view class="popUp-top">

				<view class="item" :style="{'color':tabindex==index?'#ffffff !important':'rgba(255, 255, 255, 0.3)'}"
					v-for="(item,index) in tablist" :key="index" @click="ontab(index)">{{ item.name }}</view>
			</view>
			<view class="popUp-content">
				<swiper class="swiper" indicator-active-color="#ffffff" :indicator-dots="indicatorDots"
					:interval="interval" :duration="duration">
					<swiper-item v-for="(item,ink) in list" :key="ink" class="swiper-item">
						<view class="list">
							<view class="list-item" v-for="(itm,index) in item.item" :key="index"
								:id="giftindex==index?'active':''" @click="ongift(ink,index)">
								<view class="list-item-icon" v-if="giftindex==index">粉丝</view>
								<view class="list-item-image">
									<image :src="itm.image"></image>
								</view>
								<view class="list-item-name">{{itm.name}}</view>
								<view class="list-item-prc">{{itm.money}}金币</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="popUp-bottom">
				<view class="popUp-bottom-left">
					<view class="popUp-bottom-left-prc">当前金币：<text>{{userInfo.now_money}}</text></view>
					<view class="popUp-bottom-left-tips" @click="recharge">去充值</view>
				</view>
				<view class="popUp-bottom-right"><input type="text" v-model="value">
					<view @click="onclickgift">赠送</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>
<script>
	import {
		getUserInfo
	} from '@/api/user.js';
	import {
		getGiftList
	} from '@/api/liveBroadcast.js';
	export default {
		name: 'giftPop',
		props: {
			show: {
				type: Boolean,
				default: false,
			},
			gitList: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
				tabindex: 0,
				tablist: [{
						name: '常规礼物',
						id: ''
					},
					{
						name: '粉丝礼物',
						id: ''
					},
					{
						name: '我的背包',
						id: ''
					},
				],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				value: 1,
				giftink: -1,
				giftindex: -1,
				list: [],
				userInfo: {}
			};
		},
		watch: {
			show(newVal) {
				if (newVal) {
					this.value = 1;
					this.getUserInfo();
					this.$refs.costShow.open()
				}
			},
			userInfo(newVal) {
				if (newVal) {
					this.user_info = newVal
				}
			},
			gitList(newVal) {
				if (newVal) {
					this.list = this.getList(newVal)
				}
			},
		},
		methods: {
			getUserInfo() {
				getUserInfo().then(res => {
					this.userInfo = res.data
				})
			},
			ontab(index) {
				this.tabindex = index
			},
			ongift(ink, index) {
				// if (this.giftindex == index) {
				//   this.giftindex = -1
				// } else {
				//   this.giftindex = index
				// }
				if (this.giftink == ink && this.giftindex == index) {
					this.giftink = -1
					this.giftindex = -1
				} else {
					this.giftink = ink
					this.giftindex = index
				}

			},
			close() {
				this.$emit('close', false)
			},
			onclickgift() {
				let gift_total_money = Number(this.list[this.giftink].item[this.giftindex].money) * Number(this.value);
				if (gift_total_money > Number(this.userInfo.now_money)) {
					uni.showToast({
						title: '金币不足，请充值！',
						icon: 'none'
					})
					return false
				}
				this.$emit('close', false)
				this.$emit('gift', this.list[this.giftink].item[this.giftindex], this.value)
				this.giftink = -1
				this.giftindex = -1
				this.$refs.costShow.close()
			},
			getList(list) {
				let data = []
				data = list.reduce((acc, curr, index) => {
					const groupIndex = Math.floor(index / 9);
					if (!acc[groupIndex]) {
						acc[groupIndex] = {
							item: []
						};
					}
					acc[groupIndex].item.push(curr);
					// 如果当前组已满九个元素，将其添加到items数组中
					if (acc[groupIndex].item.length === 9) {
						acc.push(acc[groupIndex]);
						delete acc[groupIndex]; // 从累加器中删除已添加的对象，避免重复添加
					}
					return acc;
				}, []);

				// 处理剩余的元素（如果不足九个）
				if (Object.keys(data).length < list.length / 9) {
					const lastGroupIndex = Math.floor((list.length - 1) / 9);
					data.push(data[lastGroupIndex]);
					delete data[lastGroupIndex]; // 从对象中删除已添加的对象
				}

				// 转换items为纯数组
				data = Object.values(data);
				return data
			},
			getGiftList() {
				getGiftList().then(res => {
					this.list = res.data.reduce((acc, curr, index) => {
						const groupIndex = Math.floor(index / 9);
						if (!acc[groupIndex]) {
							acc[groupIndex] = {
								item: []
							};
						}
						acc[groupIndex].item.push(curr);
						// 如果当前组已满九个元素，将其添加到items数组中
						if (acc[groupIndex].item.length === 9) {
							acc.push(acc[groupIndex]);
							delete acc[groupIndex]; // 从累加器中删除已添加的对象，避免重复添加
						}
						return acc;
					}, []);

					// 处理剩余的元素（如果不足九个）
					if (Object.keys(this.list).length < res.data.length / 9) {
						const lastGroupIndex = Math.floor((res.data.length - 1) / 9);
						this.list.push(this.list[lastGroupIndex]);
						delete this.list[lastGroupIndex]; // 从对象中删除已添加的对象
					}

					// 转换items为纯数组
					this.list = Object.values(this.list);
					console.log(this.list, '--this.list--')
				})
			},
			recharge() {
				this.$emit('goRecharge')
			}
		}
	}
</script>

<style scoped lang="scss">
	.popUp {
		width: 100%;
		height: 700rpx;
		background: rgba(255, 255, 255, 0.3);
		/* 半透明白色背景 */
		backdrop-filter: blur(10px);
		/* 添加背景模糊效果 */
		-webkit-backdrop-filter: blur(10px);
		/* 兼容WebKit内核的浏览器，如Safari */
		// padding: 16rpx 32rpx 54rpx 32rpx;
		padding: 16rpx 0 54rpx 0;
		box-sizing: border-box;
		border-radius: 12rpx 12rpx 0 0;

		.popUp-top {
			height: 42rpx;
			display: flex;
			align-items: center;
			padding: 0 32rpx;
			box-sizing: border-box;

			.item {
				width: 127rpx;
				line-height: 42rpx;
				font-size: 28rpx;
				color: rgba(255, 255, 255, 0.3);
				text-align: center;
				font-weight: 500;
				margin-right: 20rpx;
			}

			.active {
				color: #ffffff !important;
			}
		}
	}

	.popUp-content {
		width: 100%;
		height: 500rpx;
		margin-top: 33rpx;
		padding: 0 32rpx 0 0rpx;
		box-sizing: border-box;

		.swiper {
			height: 500rpx;
		}

		.swiper-item {
			display: block;
			height: 100%;
			padding: 0 0 0 32rpx;
			box-sizing: border-box;
		}

		.list {
			width: 100%;
			height: 100%;
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;

			.list-item {
				width: 148rpx;
				height: 213rpx;
				border-radius: 8rpx;
				position: relative;
				margin-bottom: 30rpx;
				box-sizing: border-box;

				.list-item-icon {
					position: absolute;
					top: 0;
					left: 0;
					z-index: 99;
					width: 72rpx;
					height: 34rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					border: 1rpx solid #ffffff;
					border-radius: 8rpx 0 8rpx 0;
					box-sizing: border-box;
					color: #ffffff;
					background: #ef4f61;
					font-size: 18rpx;
				}

				.list-item-image {
					height: 110rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 110rpx;
						height: 110rpx;
					}
				}

				.list-item-name {
					height: 33rpx;
					line-height: 33rpx;
					margin-top: 18rpx;
					font-size: 24rpx;
					text-align: center;
					color: #ffffff;
				}

				.list-item-prc {
					line-height: 27rpx;
					margin-top: 10rpx;
					font-size: 16rpx;
					text-align: center;
					color: rgba(255, 255, 255, 0.5);
				}
			}

			#active {
				border: 1rpx solid #ffffff;
			}
		}

		.list:after {
			content: "";
			width: 30%;
		}
	}

	.popUp-bottom {
		height: 58rpx;
		margin-top: 28rpx;
		padding: 0 32rpx 0 63rpx;
		box-sizing: border-box;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;

		.popUp-bottom-left {
			display: flex;
			align-items: center;

			.popUp-bottom-left-prc {
				font-size: 22rpx;
				color: #ffffff;

				text {
					margin-left: 5rpx;
				}
			}

			.popUp-bottom-left-tips {
				margin-left: 25rpx;
				color: #f14d5d;
				font-size: 22rpx;
			}
		}

		.popUp-bottom-right {
			width: 227rpx;
			height: 58rpx;
			border-radius: 8rpx;
			border: 2rpx solid #ffffff;
			display: flex;
			align-items: center;
			background: #0c1332;

			input {
				width: 139rpx;
				color: #ffffff;
				font-size: 22rpx;
				text-align: center;
			}

			view {
				flex: 1;
				height: 100%;
				font-size: 22rpx;
				color: #ffffff;
				display: flex;
				align-items: center;
				justify-content: center;
				border-left: 2rpx solid #ffffff;
			}
		}
	}
</style>