<template>
	<uni-popup ref="costShow" type="center" :animation="false" mask-background-color="rgba(0,0,0,0)"
		:is-mask-click="true">
		<view class="popUp">
			<view class="top-anchor">
				<view class="top-anchor-left">
					<view class="top-image" v-if="userList.length">
						<image v-for="(item,index) in userList.slice(0,4)" :key="index" :src="item.avatar"
							@click="onUser(item)"></image>
					</view>
					<view class="top-text" @click="viewWatcher">{{virtualUser}}人在线</view>
				</view>
				<view class="top-anchor-right">
					<image src="/static/images/liveRoom/close.jpg" class="top-anchor-right-image-cont"></image>
				</view>
			</view>
			<!-- <view class="top-info">
        <view class="top-info-icon">
          <image src="/static/images/liveRoom/microphone.png"></image>开麦
        </view>
        <view class="top-info-icon">
          <image src="/static/images/liveRoom/camera.png"></image>翻转
        </view>
        <view class="top-info-icon">
          <image src="/static/images/liveRoom/face.png"></image>美颜
        </view>
        <view class="top-info-icon">
          <image src="/static/images/liveRoom/container.png"></image>信息
        </view>
        <view class="top-info-btn">· · ·</view>
      </view> -->
			<!-- <view class="fanClub">
        <view class="fanClub-box">
          <image src="/static/images/liveRoom/crown.png"></image>
          我的粉丝团<uni-icons type="right" size="12" color="#ffffff"></uni-icons>
        </view>
      </view> -->
			<view class="giftList" v-show="giftsvgashow">
				<giftList ref="lffBarrage" :maxTop="60" type="leftBottom"></giftList>
			</view>
			<view class="bulletChat">
				<bulletChat ref="bulletChat" @userdata="userdata"></bulletChat>
			</view>
			<view class="bottom-box">
				<view class="item" @click="ongoodShow">
					<view class="item-image">
						<image src="/static/images/liveRoom/grounding.png"></image>
					</view>
					<view class="item-text">上架商品</view>
				</view>
				<view class="item" @click="onRoomManage">
					<view class="item-image">
						<image src="/static/images/liveRoom/forbidden.png"></image>
					</view>
					<view class="item-text">房间管理</view>
				</view>
			</view>

		</view>


	</uni-popup>
</template>
<script>
	import bulletChat from './bulletChat';
	import giftList from './giftList';
	export default {
		components: {
			bulletChat,
			giftList
		},
		name: 'contentpop',
		props: {
			datainfo: {
				default: {},
			},
			messageList: {
				default: [],
			},
			virtualUser: { //观看人数
				default: 0,
			},
			userList: {
				default: [],
			},
			giftsvgashow: {
				default: false
			}
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
			};
		},
		created() {
			let that = this
			setTimeout(() => {
				that.$refs.costShow.open('top')
			}, 1000)
		},
		methods: {
			userdata(data) {
				this.$emit('userdata', data)
			},
			colrdo(str) {
				let strdata = {
					nickname: str.nickname,
					image: str.gift_data.image,
					name: str.gift_data.name,
					fans: false
				}
				this.$refs.lffBarrage.add(strdata);
			},
			onadd(str) {
				this.$refs.bulletChat.add({
					item: str.content,
					nickname: str.nickname,
					fans: false,
					fd: str.fd
				})
			},
			onRoomManage() {
				this.$emit('onforbiddenShow')
			},
			onout() {
				uni.navigateBack({
					delta: 1
				});
			},
			ongoodShow() {
				this.$emit('goodShow')
			},
			onmsg() {
				this.$refs.bulletChat.add({
					item: '这是内容',
					fans: false
				})
			},
			onUser(data) {
				this.$emit('user', data)
			},
			viewWatcher() {
				this.$emit('viewUserList')
			}
		}
	}
</script>

<style scoped lang="scss">
	.popUp {
		width: 100vw;
		height: 100vh;
		// position: relative;
		padding-top: 60rpx;
		// background: #191e37;
	}

	.top-anchor {
		padding: 0 18rpx 0 26rpx;
		// box-sizing: border-box;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		width: 750rpx;
		height: 94rpx;

		.top-anchor-left {
			display: flex;
			align-items: center;
			height: 100%;

			.top-image {
				display: flex;
				flex-flow: row wrap;
				justify-content: flex-start;

				image {
					width: 76rpx;
					height: 76rpx;
					border-radius: 50%;
					border: 2rpx solid #fff;
					margin-right: 8rpx;
				}
			}

			.top-text {
				font-size: 26rpx;
				color: #ffffff;

			}
		}

		.top-anchor-right {
			display: flex;
			align-items: center;
			height: 100%;

			image {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}

	.top-info {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 78rpx;
		margin-top: 20rpx;
		padding: 0 22rpx 0 0;
		box-sizing: border-box;

		.top-info-icon {
			width: 160rpx;
			height: 78rpx;
			display: flex;
			align-items: center;
			color: #ffffff;
			font-size: 23rpx;
			justify-content: center;

			image {
				width: 45rpx;
				height: 45rpx;
				margin-right: 10rpx;
			}
		}

		.top-info-btn {
			width: 90rpx;
			height: 46rpx;
			border-radius: 6rpx;
			background: #191e37;
			color: #ffffff;
			font-size: 18rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.fanClub {
		display: flex;
		justify-content: flex-end;
		padding: 0 22rpx 0 0;
		box-sizing: border-box;
		margin-top: 15rpx;

		.fanClub-box {
			width: 215rpx;
			height: 80rpx;
			font-size: 23rpx;
			color: #ffffff;
			display: flex;
			align-items: center;
			justify-content: center;
			background: rgba(0, 0, 0, 0.3);
			border-radius: 4rpx;

			image {
				width: 35rpx;
				height: 35rpx;
				margin-right: 13rpx;
			}
		}
	}

	.bottom-box {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 157rpx;
		padding: 0 160rpx;
		box-sizing: border-box;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;

		.item {
			width: 90rpx;

			.item-image {
				width: 90rpx;
				height: 90rpx;

				image {
					width: 90rpx;
					height: 90rpx;
					border-radius: 12rpx;
				}
			}

			.item-text {
				line-height: 40rpx;
				text-align: center;
				font-size: 22rpx;
				color: #ffffff;
			}
		}
	}

	.bulletChat {
		position: absolute;
		bottom: 220rpx;
		left: 0;
		width: 100%;
		height: 360rpx;
	}

	.giftList {
		position: absolute;
		bottom: 580rpx;
		left: 0;
		width: 100%;
		height: 200rpx;
	}
</style>