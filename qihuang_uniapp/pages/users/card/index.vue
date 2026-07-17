<template>
	<view class="content" v-if="list.length">
		<view class="item" v-for="(item, index) in list" :key="index">
			<view class="item-top">
				<view class="title">
					<text>{{item.name}}</text>
				</view>
				<view class="remainder">
					剩余{{item.remaining_count || 0}}张
				</view>
			</view>
			<view class="item-mid">
				<view class="id" v-if="item.card_numbers.length">
					卡片ID​​：{{item.card_numbers[0].card_no}}
				</view>
				<view class="expiration">
					​​有效期​​：{{item.description}}
				</view>
				<view class="range">
					使用范围​​：{{item.usage_scope}}
				</view>
				<view class="notice">
					注意事项：{{item.notes}}
				</view>
			</view>
			<view class="item-bottom" v-if="item.remaining_count">
				<view class="sent" @click="showModal(item)">
					赠送
				</view>
				<!-- <view class="cope" @click="copyText(item.notes)">
					<text>复制预约码</text>
				</view> -->
				<view class="use">
					使用
				</view>
			</view>
		</view>
		<uni-popup ref="popupRef">
			<view class="popup-tips">
				<view class="new-iconfont icon-chacha" @click="closePopup"></view>
				<image class="img" src="/static/images/health/tips.png"></image>
				<view class="title">赠送</view>
				<view class="label">
					<input type="text" v-model="user_id" placeholder="请输入增送好友的ID" />
				</view>
				<view class="btn" @click="savePopup">
					<text>确认</text>
				</view>
			</view>
		</uni-popup>
	</view>
	<emptyPage title="暂无数据" v-else />
</template>

<script>
	import emptyPage from "@/components/emptyPage.vue"
	import {
		getCardWallet,
		transferCard
	} from "@/api/user.js"
	export default {
		components: {
			emptyPage
		},
		data() {
			return {
				list: [],
				user_id: '',
				modalValue:{}
			}
		},
		onShow() {
			this.getList()
		},
		methods: {
			copyText(text){
				uni.setClipboardData({
				    data: text,
				    success: function () {
				        uni.showToast({
				            title: '复制成功',
				            icon: 'success'
				        });
				    },
				    fail: function () {
				        uni.showToast({
				            title: '复制失败',
				            icon: 'none'
				        });
				    }
				});
			},
			async getList() {
				let data = await getCardWallet()
				console.log(data)
				this.list = data.data
			},
			// showPopup() {
			// 	this.$refs.popupRef.open('center')
			// },
			async savePopup(){
				await transferCard({
					card_id: this.modalValue.card_type_id,
					target_user_id: this.user_id
				})
				uni.showToast({
					title: '赠送成功'
				})
				this.user_id = ''
				this.getList()
			},
			closePopup() {
				this.$refs.popupRef.close()
			},
			showModal(item){
				this.modalValue = item
				this.$refs.popupRef.open('center')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.item {
			background-image: url('/static/images/user/bg.png');
			color: rgba(255, 255, 255, 1);
			font-size: 24rpx;

			line-height: 32rpx;
			border-radius: 5%;
			margin: 30rpx;
			padding: 40rpx;

			.item-top {
				display: flex;
				justify-content: space-between;
				margin-bottom: 25rpx;
				font-size: 32rpx;

				.title {
					font-size: 36rpx;
					width: 180rpx;
					height: 64rpx;
					border-radius: 32rpx;
					text-align: center;
					line-height: 60rpx;

					text {
						background-image: linear-gradient(137.83deg, rgba(255, 230, 140, 1), rgba(220, 170, 90, 1) 100%);
						-webkit-background-clip: text;
						background-clip: text;
						color: transparent;
					}

				}

				.remainder {
					margin-top: 40rpx;
				}

			}

			.item-mid {
				font-size: 24rpx;
				margin-bottom: 40rpx;

				.id {
					margin-bottom: 10rpx;
				}

				.expiration {
					margin-bottom: 10rpx;
				}

				.range {
					margin-bottom: 10rpx;
				}
			}

			.item-bottom {
				display: flex;
				justify-content: space-evenly;
				font-size: 24rpx;

				.sent {

					width: 160rpx;
					height: 64rpx;
					border-radius: 32rpx;
					text-align: center;
					line-height: 60rpx;
					background: linear-gradient(180.00deg, rgba(67, 106, 188, 1), rgba(42, 55, 99, 1) 100%);
				}

				.cope {
					/* 复制预约码 */
					width: 200rpx;
					height: 64rpx;
					border-radius: 32rpx;
					background-color: #fff;
					text-align: center;
					line-height: 60rpx;

					text {
						background-image: linear-gradient(137.83deg, rgba(255, 230, 140, 1), rgba(220, 170, 90, 1) 100%);
						-webkit-background-clip: text;
						background-clip: text;
						color: transparent;
					}


				}

				.use {
					width: 160rpx;
					height: 64rpx;
					border-radius: 32rpx;
					text-align: center;
					line-height: 60rpx;
					background: var(--线性渐变, linear-gradient(137.83deg, rgba(255, 230, 140, 1), rgba(220, 170, 90, 1) 100%));
				}
			}
		}

	}
	
	.popup-tips{
		.title{
			color: #fff;
			position: absolute;
			left: 40rpx;
			font-size: 42rpx;
			top: 150rpx;
		}
		.label{
			text-align: left;
			width: 450rpx;
			input{
				color: #333;
				width: 100%;
				background-color: #fff;
				padding: 8rpx 24rpx;
				height: 70rpx;
				line-height: 70rpx;
				border-radius: 10rpx;
			}
		}
	}
</style>