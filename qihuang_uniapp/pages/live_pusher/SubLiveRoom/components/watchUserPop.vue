<template>
	<uni-popup ref="popup" type="bottom" border-radius="10px 10px 0 0">
		<view class="popUp">
			<view class="popUp-title">
				<view class='title'>在线观众<text class='iconfont icon-guanbi' @tap='close'></text></view>
			</view>
			<view class="popUp-content">
				<scroll-view scroll-y="true" :scroll-top="scrollTop" class="user-list" @scroll="scroll">
					<view v-for="(item,index) in userList" :key="index" class="list" @click="selected(item)">
						<image class="item-head" :src="item.avatar ? item.avatar : '/static/images/f.png'"></image>
						<view class="item-name">{{item.nickname}}</view>
					</view>
				</scroll-view>
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
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			selected(item) {
				this.$emit('selectedUser',item)
			}
		}
	}
</script>

<style scoped lang="scss">
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
		scroll-view {
			max-height: 550rpx;
		}

		.user-list {
			padding: 0 30rpx;
			margin-top: 20rpx;
			box-sizing: border-box;

			.list {
				display: flex;
				align-items: center;
				margin: 40rpx 0;

				.item-head {
					width: 108rpx;
					height: 108rpx;
					border-radius: 50%;
					border: 1px solid #efefef;
				}

				.item-name {
					display: inline-block;
					line-height: 50rpx;
					margin: 0 20rpx;
					font-size: 26rpx;
				}
			}
		}
	}
</style>