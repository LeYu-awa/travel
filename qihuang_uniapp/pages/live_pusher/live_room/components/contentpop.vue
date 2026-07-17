<template>
	<uni-popup ref="costShow" type="center" :animation="false" mask-background-color="rgba(0,0,0,0)"
		:is-mask-click="true">
		<view class="popUp" @click="onclikc">
			<view class="top-anchor">
				<view class="top-anchor-user">
					<view class="top-anchor-user-image">
						<image :src="datainfo.room_image" class="tv-anchor-image"></image>
					</view>
					<view class="top-anchor-user-cont">
						<view class="top-anchor-user-cont-title">{{datainfo.live_name}}</view>
						<view class="top-anchor-user-cont-num">{{likes}}本场点赞</view>
					</view>
					<view class="top-anchor-user-right" @click="onfollow"><text
							class="top-anchor-user-right-text">{{datainfo.is_attention==0?'关注':'取消关注'}}</text></view>
				</view>
				<view class="top-anchor-right">
					<!-- <view class="look-user-avatar">
						<image v-for="item in watchUserList.splice(0,3)" class="avatar" :src="item.avatar || '/static/images/f.png'"/>
					</view> -->
					<view class="top-anchor-right-text" @click.stop="viewWatchUser">
						<text class="top-anchor-right-text-text">{{virtualUser}}观看</text>
						<text @click.stop="onout" class="new-iconfont icon-chacha"></text>
					</view>

					<!-- <view class="top-anchor-right-image" @click="onout">
						<image src="/static/images/liveRoom/close.jpg" class="top-anchor-right-image-cont"></image>
					</view> -->
				</view>
			</view>
			<!-- <view class="danmu-area">
		  <scroll-view scroll-y="true" class="scroll-Y" :show-scrollbar="false">
			<view class="danmu-item" v-for="(msg, index) in messageList" :key="index">
			  <view class="danmu-username">{{ msg.nickname }}:</view>
			  <view class="danmu-content">{{ msg.content }}</view>
			</view>  
		  </scroll-view>
		</view> -->
			<view class="giftList" v-show="giftsvgashow">
				<giftList ref="lffBarrage" :maxTop="60" type="leftBottom"></giftList>
			</view>
			<view class="bulletChat">
				<bulletChat ref="bulletChat"></bulletChat>
			</view>
			<view class="give">
				<view class="give-image">
					<likeButton :throttle="100" :large="2" :duration="3000" @handleClick="handleClick">
						<image src="/static/images/liveRoom/redHeart.png" style="width: 65rpx;height: 65rpx;"></image>
					</likeButton>

				</view>
			</view>
			<view class="bottom-box">
				<view class="bottom-box-left" @click="sendMessage">
					<!-- <input class="bottom-box-left-input" type="text" placeholder="说点什么"></input> -->
					<view class="bottom-box-left-input">{{sanction==0?'说点什么':'你已被禁止发言'}}</view>
					<view class="bottom-box-left-image">
						<image src="/static/images/liveRoom/microphone.jpg" class="top-anchor-right-image"></image>
					</view>
				</view>
				<view class="bottom-box-right">
					<view class="item-image-box">
						<image src="/static/images/liveRoom/bottom1111.png" class="item-image"></image>
					</view>
					<view class="item-image-box">
						<image @click="ongift" src="/static/images/liveRoom/bottom2222.png" class="item-image"></image>
					</view>
					<view class="item-image-box">
						<image @click="goodShow" src="/static/images/liveRoom/bottom3333.png" class="item-image"></image>
					</view>
					<view class="item-image-box">
						<image @click="oninfo" src="/static/images/liveRoom/bottom4444.png" class="item-image"></image>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>

</template>
<script>
	import bulletChat from './bulletChat';
	import giftList from './giftList';
	import likeButton from '@/components/like-button/like-button';
	import {
		getUserList,
	} from '@/api/liveBroadcast.js';
	export default {
		components: {
			bulletChat,
			giftList,
			likeButton,
		},
		name: 'giftPop',
		props: {
			datainfo: {
				default: {},
			},
			messageList: {
				default: [],
			},
			roomId:{
				default: 0
			},
			likes: { // 点赞数
				default: 0,
			},
			virtualUser: { //观看人数
				default: 0,
			},
			sanction: { //禁言状态
				default: 0,
			},
			giftsvgashow: {
				default: false
			},
		},
		data() {
			return {
				danmuList: [{
						level: 1,
						username: '用户1',
						content: '这是一条弹幕'
					},
					{
						level: 1,
						username: '用户1',
						content: '这是一条弹幕'
					},
					{
						level: 1,
						username: '用户1',
						content: '这是一条弹幕'
					},
					{
						level: 1,
						username: '用户1',
						content: '这是一条弹幕'
					},
					{
						level: 1,
						username: '用户1',
						content: '这是一条弹幕'
					},
					{
						level: 1,
						username: '用户1',
						content: '这是一条弹幕'
					},
					{
						level: 1,
						username: '用户1',
						content: '这是一条弹幕'
					},
					{
						level: 1,
						username: '用户1',
						content: '这是一条弹幕'
					},
					{
						level: 1,
						username: '用户1',
						content: '这是一条弹幕'
					},
					{
						level: 1,
						username: '用户1',
						content: '这是一条弹幕'
					},
					{
						level: 1,
						username: '用户1',
						content: '这是一条弹幕'
					},
					{
						level: 1,
						username: '用户1',
						content: '这是一条弹幕'
					},
				], // 弹幕列表
				// roomInfo:{
				// 	 is_attention:0,
				// 	 live_name:'测试',
				// 	 room_title:'123',
				// 	 room_image:'https://img2.baidu.com/it/u=1939933609,3801343216&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1741971600&t=7a30114a6eb79d0e7a3efc46bcfb5a3d'
				//  },
				aaa: 0,
			};
		},
		created() {
			let that = this
			setTimeout(() => {
				that.$refs.costShow.open('top')
			}, 1000)
		},
		methods: {
			handleClick() {
				this.$emit('handleClick')
			},
			colrdo(str) {
				let strdata = {
					nickname: str.nickname,
					image: str.gift_data.image,
					name: str.gift_data.name,
					fans: false,
					num: str.num
				}
				this.$refs.lffBarrage.add(strdata);
			},
			onadd(str) {
				this.$refs.bulletChat.add({
					item: str.content,
					nickname: str.nickname,
					fans: false
				})
			},
			onclikc() {
				console.log('点击')
			},
			ongift() {
				this.$emit('gift')
			},
			goodShow() {
				this.$emit('goodShow')
			},
			oninfo() {
				this.$emit('oninfo')
			},
			onout() {
				uni.navigateBack({
					delta: 1
				});
			},
			viewWatchUser() {
				return
				this.$emit('viewWatchUser')
			},
			onfollow() {
				this.$emit('onfollow')
			},
			// 弹出消息弹窗
			sendMessage() {
				if (this.sanction !== 0) return
				this.$emit('sendMessage')
			}
		}
	}
</script>

<style scoped lang="scss">
	.popUp {
		width: 100vw;
		height: 100vh;
	}

	.top-anchor {

		padding: 0 24rpx;
		// box-sizing: border-box;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		width: 750rpx;
		height: 84rpx;
		margin-top: 60rpx;

	}

	.top-anchor-user {
		width: 360rpx;
		height: 84rpx;
		background-color: rgba(0, 0, 0, 0.35);
		border-radius: 48rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 0 10rpx;

		// box-sizing: border-box;
		.top-anchor-user-image {
			width: 74rpx;
			height: 74rpx;
			display: flex;
			align-items: center;
			margin-right: 10rpx;

			.tv-anchor-image {
				width: 66rpx;
				height: 66rpx;
				border-radius: 76rpx;
				border: 2rpx solid #ffffff;
			}
		}

	}

	.top-anchor-user-cont {
		height: 74rpx;
		width: 170rpx;
	}

	.top-anchor-user-cont-title {
		color: #ffffff;
		font-size: 28rpx;
		height: 34rpx;
		line-height: 34rpx;
		margin-top: 8rpx;
		font-weight: 500;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.top-anchor-user-cont-num {
		font-size: 20rpx;
		color: #bec0c7;
		line-height: 37rpx;
	}

	.top-anchor-user-right {
		width: 112rpx;
		height: 58rpx;
		border-radius: 48rpx;
		// background: #0c1332;
		background: linear-gradient(137.83deg, rgba(255, 230, 140, 1), rgba(220, 170, 90, 1) 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: auto;

		.top-anchor-user-right-text {
			color: #ffffff;
			font-size: 22rpx;
		}


	}

	.top-anchor-right {
		flex: 1;
		height: 94rpx;
		display: flex;
		flex-flow: row wrap;
		justify-content: flex-end;
		.look-user-avatar{
			display: flex;
			align-items: center;
			
			.avatar{
				width: 50rpx;
				height: 50rpx;
				margin-left: -25rpx;
				border-radius: 50%;
				&:first-of-type{
					margin-left: 0;
				}
			}
		}

		.top-anchor-right-text {
			width: 200rpx;
			height: 94rpx;
			// margin-right: 22rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}

		.top-anchor-right-text-text {
			font-size: 22rpx;
			color: #ffffff;
			text-align: right;
			background-color: rgba(0, 0, 0, 0.35);
			height: 54rpx;
			padding: 0 20rpx;
			border-radius: 54rpx;
			line-height: 54rpx;

		}

		.new-iconfont {
			background-color: rgba(0, 0, 0, 0.35);
			color: #ffffff;
			width: 54rpx;
			height: 54rpx;
			border-radius: 54rpx;
			margin-left: 20rpx;
			line-height: 54rpx;
			text-align: center;
		}

		.top-anchor-right-image {
			width: 40rpx;
			height: 94rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.top-anchor-right-image-cont {
				width: 40rpx;
				height: 40rpx;
			}


		}
	}

	.bottom-box {
		position: absolute;
		bottom: 80rpx;
		left: 0;
		width: 750rpx;
		height: 75rpx;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		padding: 0 38rpx 0 23rpx;
		box-sizing: border-box;

		.bottom-box-left {
			width: 270rpx;
			height: 75rpx;
			border-radius: 12rpx;
			background: rgba(0, 0, 0, 0.35);
			padding: 0 14rpx;
			box-sizing: border-box;
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;
			border-radius: 75rpx;

			.bottom-box-left-input {
				width: 180rpx;
				height: 75rpx;
				font-size: 28rpx;
				color: #fff;
				line-height: 75rpx;
				// color: rgba(255, 255, 2255, 0.7);
			}

			.bottom-box-left-image {
				width: 31rpx;
				height: 75rpx;
				display: flex;
				align-items: center;
			}

			.top-anchor-right-image {
				width: 31rpx;
				height: 36rpx;
			}
		}

		.bottom-box-right {
			margin-left: 28rpx;
			width: 385rpx;
			height: 75rpx;
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;
			align-items: center;

			.item-image-box {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				background-color: rgba(0, 0, 0, 0.35);
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.item-image {
				width: 61rpx;
				height: 61rpx;
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

	.danmu-area {
		position: absolute;
		bottom: 200rpx;
		left: 20rpx;
		z-index: 999;
		width: 500rpx;
		height: 300rpx;
		overflow-y: hidden;

		.danmu-item {
			display: flex;
			align-items: center;
			margin-bottom: 10rpx;
			color: #fff;
			font-size: 28rpx;
		}
	}

	.giftList {
		position: absolute;
		bottom: 580rpx;
		left: 0;
		width: 100%;
		height: 200rpx;
	}

	.bulletChat {
		position: absolute;
		bottom: 220rpx;
		left: 0;
		width: 100%;
		height: 360rpx;
	}

	.give {
		position: absolute;
		bottom: 200rpx;
		left: 0;
		width: 100%;
		height: 65rpx;
		padding: 0 35rpx;
		display: flex;
		justify-content: flex-end;

		.give-image {
			width: 65rpx;
			height: 65rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>