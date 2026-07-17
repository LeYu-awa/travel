<template>
	<view class="page">
		<live-pusher
			id="livePusher"
			ref="livePusher"
			class="livePusher"
			url=""
			mode="SD"
			:muted="true"
			:enable-camera="true"
			:auto-focus="true"
			:beauty="1"
			whiteness="2"
			aspect="9:16"
			:device-position="devicePosition"
			style="width: 750rpx; height: 100vh"
			waiting-image="/static/waiting.png"
			waiting-image-hash="waitimage"
			@statechange="statechange"
			@netstatus="netstatus"
			@error="error"
		></live-pusher>
		<!-- 顶部导航栏 -->

		<cover-view class="navbar">
			<cover-view class="navbar-slot" @click="closeLive">关闭</cover-view>
		</cover-view>
		<!-- 开播前的功能按钮 -->
		<cover-view v-if="!isLiving" class="pre-config">
			<cover-view class="config-item" @click="toggleMic">
				<cover-image :src="isMicOn ? '/static/mic.png' : '/static/mic-off.png'" class="config-item-img"></cover-image>
				<cover-view class="config-item-text">麦克风</cover-view>
			</cover-view>
			<cover-view class="config-item" @click="switchCamera">
				<cover-image src="/static/camera.png" class="config-item-img"></cover-image>
				<cover-view class="config-item-text">翻转</cover-view>
			</cover-view>
			<cover-view class="config-item" @click="openBeauty">
				<cover-image src="/static/my.png" class="config-item-img"></cover-image>
				<cover-view class="config-item-text">美颜</cover-view>
			</cover-view>
			<cover-view class="config-item" @click="openLiveInfo">
				<cover-image src="/static/msg.png" class="config-item-img"></cover-image>
				<cover-view class="config-item-text">信息</cover-view>
			</cover-view>
		</cover-view>

		<!-- 开播后才显示的内容 -->
		<template v-if="isLiving">
			<!-- 礼物排行榜 -->
			<cover-view class="gift-rank">
				<cover-view class="rank-title">礼物榜</cover-view>
				<cover-view class="rank-list">
					<cover-view class="rank-item" v-for="(item, index) in rankList.slice(0, 4)" :key="index">
						<cover-image :src="item.avatar" class="rank-avatar"></cover-image>
					</cover-view>
					<cover-view class="rank-item" @click="openRankList">
						<cover-image src="/static/more.png" class="rank-avatar"></cover-image>
					</cover-view>
				</cover-view>
			</cover-view>

			<!-- 礼物动效区域 -->
			<cover-view class="gift-area">
				<cover-view class="gift-item" v-for="(gift, index) in giftList" :key="index">
					<cover-view class="gift-user">
						<cover-image :src="gift.avatar" class="gift-avatar"></cover-image>
						<cover-view class="gift-info">
							<cover-view class="gift-name">{{ gift.username }}</cover-view>
							<cover-view class="gift-level">Lv.{{ gift.level }}</cover-view>
						</cover-view>
					</cover-view>
					<cover-image :src="gift.giftImage" class="gift-img"></cover-image>
					<cover-view class="gift-count">x{{ gift.count }}</cover-view>
				</cover-view>
			</cover-view>

			<!-- 弹幕区域 -->
			<cover-view class="danmu-area">
				<cover-view class="danmu-item" v-for="(msg, index) in danmuList" :key="index">
					<cover-view class="danmu-level">Lv.{{ msg.level }}</cover-view>
					<cover-view class="danmu-username">{{ msg.username }}:</cover-view>
					<cover-view class="danmu-content">{{ msg.content }}</cover-view>
				</cover-view>
			</cover-view>
			<!-- 右侧功能按钮 -->
			<cover-view class="right-config">
				<cover-view class="config-item" @click="toggleMic">
					<cover-image :src="isMicOn ? '/static/mic.png' : '/static/mic-off.png'" class="config-item-img"></cover-image>
				</cover-view>
				<cover-view class="config-item" @click="switchCamera">
					<cover-image src="/static/camera.png" class="config-item-img"></cover-image>
				</cover-view>
				<cover-view class="config-item" @click="openBeauty">
					<cover-image src="/static/my.png" class="config-item-img"></cover-image>
				</cover-view>
				<cover-view class="config-item" @click="openLiveInfo">
					<cover-image src="/static/msg.png" class="config-item-img"></cover-image>
				</cover-view>
			</cover-view>

			<!-- 底部功能按钮 -->
			<cover-view class="bottom-config">
				<cover-view class="bottom-item" v-for="(item, index) in bottomButtons" :key="index" @click="openBottomPopup(item.type)">
					<cover-image src="/static/wb.png" class="bottom-item-img"></cover-image>
					<cover-view class="bottom-item-text">{{ item.text }}</cover-view>
				</cover-view>
			</cover-view>
		</template>
		<!-- 未开播时的开播按钮 -->
		<cover-view class="footer" v-if="!isLiving" @click="openLiveShow">开启直播</cover-view>
	</view>
</template>

<script>
// #ifdef APP-PLUS
const subNVue = uni.getSubNVueById('subNVueDrawer');
// #endif
import {
	GetLiveShowUrlApi
} from "@/api/video.js"
export default {
	data() {
		return {
			context: null,
			isLiving: true,
			isMicOn: true,
			rankList: [],
			giftList: [],
			danmuList: [{ level: 1, username: '用户1', content: '这是一条弹幕' }], // 弹幕列表
			bottomButtons: [
				{
					type: 'share',
					icon: '/static/share.png',
					text: '分享'
				},
				{
					type: 'gift',
					icon: '/static/gift.png',
					text: '礼物'
				}
			],
			showConfig: false,
			showUserInfo: false,
			currentUserId: '',
			showProduct: false,
			showGame: false,
			showRoomManage: false,
			showFansList: false,
			showLuckyBag: false,
			showAd: false,
			devicePosition: 'front' // 摄像头方向
		};
	},
	onLoad() {
		let that = this
		that.GetLiveShowUr()
		// #ifdef APP-PLUS
		uni.$on('hideSubNVue', function (data) {
			console.log(data);
			//  101 开启直播 关闭配置弹框 并切换为直播状态 isLiving
			if (data.type == 101) {
				that.startLive(data.configInfo); // 开始推流
				this.isLiving = true;
				subNVue.hide('slide-out-bottom');
			}
			//  102 关闭直播 关闭配置弹框 并切换为非直播状态 isLiving
			// if(data.type == 102){
			// 	this.context.stop();
			// 	this.isLiving = false;
			// 	uni.navigateBack();
			// }
			subNVue.hide('slide-out-bottom');
		});
		// #endif
	},
	onReady() {
		// 延时初始化，确保组件已经渲染完成
		setTimeout(() => {
			this.context = uni.createLivePusherContext('livePusher', this);
			// 预览摄像头
			this.context.startPreview({
				success: () => {
					console.log('开始预览');
				}
			});
		}, 100);
	},
	methods: {
		//获取推流地址
		GetLiveShowUr(){
			GetLiveShowUrlApi().then(res=>{
				console.log(res)
			}).catch(err=>{
				console.log(err)
			})
		},
	
		// #ifdef APP-PLUS
		openLiveShow() {
			subNVue.setStyle({
				maskClick: false, // 核心配置
				mask: {
					backgroundColor: 'rgba(0,0,0,0.6)', // 必须定义mask属性
					disableAni: true // 2025新增防动画冲突配置
				}
			});

			subNVue.show('slide-in-bottom', 500, () => {});
			// this.showConfig = true;
		},
		// #endif
		// 切换镜头
		switchCamera() {
			this.context.switchCamera({
				success: (a) => {
					console.log('livePusher.switchCamera:' + JSON.stringify(a));
				}
			});
		},
		statechange(e) {
			console.log('statechange:');
		},
		netstatus(e) {
			console.log('netstatus:');
		},
		error(e) {
			console.log('error:');
		},
		// 关闭直播
		closeLive() {
			if (this.isLiving) {
				uni.showModal({
					title: '提示',
					content: '确定要结束直播吗？',
					success: (res) => {
						if (res.confirm) {
							this.context.stop();
							this.isLiving = false;
							uni.navigateBack();
						}
					}
				});
			} else {
				uni.navigateBack();
			}
		},
		// 打开排行榜
		openRankList() {
			// 打开排行榜弹窗
		},
		// 切换麦克风
		toggleMic() {
			this.isMicOn = !this.isMicOn;
			this.context.muted = !this.isMicOn;
		},
		// 打开美颜设置
		openBeauty() {
			// 打开美颜设置弹窗
		},
		// 打开直播信息
		openLiveInfo() {
			// 打开直播信息弹窗
		},
		// 打开底部弹窗
		openBottomPopup(type) {
			switch (type) {
				case 'share':
					uni.showShareMenu({
						withShareTicket: true,
						success() {
							console.log('打开分享');
						}
					});
					break;
				case 'gift':
					// 可以添加礼物弹窗组件
					uni.showToast({
						title: '礼物功能开发中',
						icon: 'none'
					});
					break;
				case 'chat':
					// 可以添加聊天弹窗组件
					uni.showToast({
						title: '聊天功能开发中',
						icon: 'none'
					});
					break;
				case 'product':
					this.showProduct = true;
					console.log('商品弹窗状态:', this.showProduct);
					break;
				case 'game':
					this.showGame = true;
					break;
				case 'room':
					this.showRoomManage = true;
					break;
				case 'fans':
					this.showFansList = true;
					break;
				case 'lucky':
					this.showLuckyBag = true;
					break;
				case 'ad':
					this.showAd = true;
					break;
				default:
					console.log('未处理的类型:', type);
			}
		},
		openUserInfo(userId) {
			this.currentUserId = userId;
			this.showUserInfo = true;
		},
		// 开始推流 直播开始
		startLive(config) {
			console.log('直播配置:', config);
			// 保存直播配置信息
			this.liveTitle = config.title;
			this.liveCover = config.coverImage;
			this.liveType = config.type;

			// 切换到直播状态
			this.isLiving = true;

			// 开始推流
			this.context.start({
				success: () => {
					console.log('推流开始');
					uni.showToast({
						title: '直播开始',
						icon: 'success'
					});
				},
				fail: (err) => {
					console.error('推流失败:', err);
					uni.showToast({
						title: '开播失败',
						icon: 'error'
					});
					this.isLiving = false;
				}
			});
		}
	}
};
</script>

<style lang="scss">
.page {
	width: 100%;
	height: 100vh;
	position: relative;
	background-color: #000;
}

.livePusher {
	width: 750rpx;
	height: 100vh;
	position: fixed;
	left: 0;
	top: 0;
	z-index: -1;
}
/* 动态调整摄像头比例 */
@media (horizontal-viewport: folded) {
	.live-pusher {
		aspect-ratio: 4/3;
	}
}

.popups {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 9999999;

	.popup-container {
		position: relative;
		width: 100%;
		height: 100%;
	}

	> * {
		pointer-events: auto;
	}
}

.navbar {
	position: fixed;
	top: 0;
	width: 100%;
	height: calc(var(--status-bar-height) + 44px);

	z-index: 2;
	.navbar-slot {
		position: absolute;
		right: 4%;
		top: calc(var(--status-bar-height) + 24px);
		width: 100rpx;
		height: 60rpx;
		background-color: rgba(0, 0, 0, 0.8);
		color: #ffffff;
		font-size: 30rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 60rpx;
	}
}
.config {
	width: 70%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	bottom: 18vh;
	left: 15%;
	z-index: 9999;
	.config-item {
		width: 100rpx;
		height: 100rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		pointer-events: auto;
		.config-item-img {
			width: 60rpx;
			height: 60rpx;
		}
		.config-item-text {
			font-size: 24rpx;
			color: #ffffff;
			text-align: center;
			margin-top: 10rpx;
		}
	}
}
.footer {
	width: 70%;
	height: 90rpx;
	background-color: #ff4e5f;
	font-size: 32rpx;
	font-weight: bold;
	color: #ffffff;
	border-radius: 10rpx;
	position: fixed;
	bottom: 10vh;
	left: 15%;
	pointer-events: auto;
	text-align: center;
	line-height: 90rpx;
	z-index: 9;
}

// 礼物排行榜样式
.gift-rank {
	position: fixed;
	top: 100rpx;
	left: 20rpx;
	z-index: 999;

	.rank-list {
		display: flex;
		align-items: center;

		.rank-item {
			margin-right: 10rpx;

			.rank-avatar {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				border: 2rpx solid #fff;
			}
		}
	}
}

// 礼物展示区域
.gift-area {
	position: fixed;
	top: 40vh;
	left: 20rpx;
	z-index: 999;
	width: 500rpx;

	.gift-item {
		display: flex;
		align-items: center;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 10rpx;
		padding: 10rpx;
		margin-bottom: 10rpx;
	}
}

// 弹幕区域
.danmu-area {
	position: fixed;
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

// 右侧功能按钮
.right-config {
	position: fixed;
	right: 20rpx;
	top: 200rpx;
	z-index: 999;

	.config-item {
		margin-bottom: 30rpx;

		.config-item-img {
			width: 80rpx;
			height: 80rpx;
		}
	}
}

// 底部功能按钮
.bottom-config {
	position: fixed;
	bottom: 40rpx;
	left: 0;
	right: 0;
	display: flex;
	flex-wrap: wrap;
	padding: 0 40rpx;
	z-index: 99999;

	.bottom-item {
		position: relative;
		width: 20%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20rpx;

		.bottom-item-img {
			width: 60rpx;
			height: 60rpx;
		}

		.bottom-item-text {
			color: #fff;
			font-size: 24rpx;
			margin-top: 10rpx;
		}
	}
}

// 开播前的功能按钮样式
.pre-config {
	width: 70%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	bottom: 25vh; // 位于开播按钮上方
	left: 15%;
	z-index: 999;

	.config-item {
		display: flex;
		flex-direction: column;
		align-items: center;

		.config-item-img {
			width: 80rpx;
			height: 80rpx;
		}

		.config-item-text {
			font-size: 24rpx;
			color: #ffffff;
			margin-top: 10rpx;
		}
	}
}
</style>
