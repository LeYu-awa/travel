<template>
	<view class="container">
		<!-- <view class="top-anchor"> 
		  <view class="top-anchor-user">
			<view class="top-anchor-user-image" >
			  <image :src="roomInfo.room_image" class="tv-anchor-image" ></image>
			</view>
			<view class="top-anchor-user-cont" >
				<view class="top-anchor-user-cont-title">{{roomInfo.live_name}}</view>
				<view class="top-anchor-user-cont-num">{{roomInfo.likes?roomInfo.likes:0}}本场点赞</view>
			</view>
			<view class="top-anchor-user-right" @click="onfollow"><text class="top-anchor-user-right-text" >{{roomInfo.is_attention==0?'+关注':'取消关注'}}</text></view>
		  </view>
		  <view class="top-anchor-right">
		    <view class="top-anchor-right-text"><text class="top-anchor-right-text-text">{{roomInfo.virtual_user?roomInfo.virtual_user:0}}观看</text></view>
		    <view class="top-anchor-right-image" >
				<image src="/static/images/liveRoom/close.jpg" class="top-anchor-right-image-cont"></image>
			</view>
		  </view>
		</view>
    <view style="width: 100%;color: '#fffffff';">{{ addnum }}</view>
    <button @click="addnum++">增加</button> -->
		<!-- <video 
			v-if="roomInfo.pull_url"
			:src="roomInfo.pull_url"
			is-live
			:autoplay="isAutoplay" 
			:muted="isMuted"
			:controls="false"
			:show-progress="false"
			:show-fullscreen-btn="false"
			:show-play-btn="false"
			:show-center-play-btn="false"
			:enable-progress-gesture="false"
			object-fit="contain" 
			codec="hardware"  
		></video>  -->
		<div id="player" :data="pullUrl" :change:data="player.getData" :licdata="playerLicense" :change:licdata="player.setLicenseData"></div>
		<div class="custom-error-tips" v-if="showErrorTips">{{errorValue}}</div>
		<!-- <view v-html="html" style="height: 100vh;width: 750rpx;border: 1px solid yellow;"></view> -->
		<!-- <div id="url-player-test" style="height: 100vh;width: 750rpx;"></div> -->
		<!-- <view id="player" style="height: 100vh;width: 750rpx;"></view> -->
		<contentpop @gift="ongift" @goodShow="ongoodShow" @onfollow="onfollow" @sendMessage="onsendMessage"
			@handleClick="handleClick" @oninfo="oninfo" @viewWatchUser="viewWatchUser" :datainfo="roomInfo"
			:messageList="messageList" :likes="likes" :virtualUser="virtualUser" :sanction="sanction"
			:giftsvgashow="giftsvgashow" ref="contentpop"></contentpop>
		<giftPop :gitList="gitList" :show="giftShow" @close="handleShowUpdate" @gift="onmove" @goRecharge="goRecharge">
		</giftPop>
		<goodPop :goodList="goodList" :show="goodShow" :roomId="roomId" @close="handleShowgood" @goodinfo="goodinfo">
		</goodPop>
		<goodInfoPop :show="goodInfoShow" @close="handleinfoShowgood" :goodInfoData="goodInfoData"></goodInfoPop>
		<sendMessage :show="sendMessageShow" :roomId="roomId" @close="handsendMessage" @sendChat="onsendChat">
		</sendMessage>
		<InfoCom :show="InfoShow" :roomId="roomId" @close="handsendInfo" @onclick="clickInfo"></InfoCom>
		<reportCom :show="reportShow" @close="handsendreport" :roomId="roomId"></reportCom>
		<!-- 观众列表弹窗 -->
		<watchUserPop ref="watchUserPop"></watchUserPop>
		<!-- 余额充值弹窗 -->
		<rechargePop ref="rechargePop"></rechargePop>
		<!-- <giftList :datainfo="giftinfo" v-show="giftsvgashow"></giftList> -->
		<uni-popup ref="costShow" type="bottom">
			<view class="popUp">
				<view class="popUp-topimage">
					<image :src="roomInfo.room_image"></image>
				</view>
				<image class="popUp-close" src="/static/images/liveRoom/close.jpg" @click="onclose"></image>
				<view class="popUp-name">{{roomInfo.live_name}}</view>
				<view class="popUp-info">{{roomInfo.room_title}}</view>
				<view class="popUp-btn">
					<view @click="attentionLive()">{{roomInfo.is_attention==0?'关注主播':'取消关注'}}</view>
				</view>
			</view>
		</uni-popup>
		<view class="svga" v-show="giftsvgashow">
			<l-svga ref="svga"></l-svga>
		</view>
		<!-- <cover-view class="give">
			<view class="give-image">
				<likeButton :throttle="100" :large="2" :duration="3000" @handleClick="handleClick">
					<image src="/static/images/liveRoom/redHeart.png" style="width: 65rpx;height: 65rpx;"></image>
				</likeButton>
			</view>
		</cover-view> -->
	</view>
</template>

<script>
	import {
		GetLiveShowUrlApi
	} from '@/api/video.js';
	import {
		attentionLive,
		getLiveGoods,
		getChat,
		sendChat,
		getUserList,
	} from '@/api/liveBroadcast.js';

	import giftPop from './components/giftPop';
	import goodPop from './components/goodPop';
	import goodInfoPop from './components/goodInfoPop';
	import contentpop from './components/contentpop';
	import sendMessage from './components/sendMessage';
	import giftList from './components/giftList';
	import InfoCom from './components/infoCom';
	import reportCom from './components/reportCom';
	import watchUserPop from './components/watchUserPop.vue';
	import rechargePop from './components/rechargePop.vue';
	import likeButton from '@/components/like-button/like-button';
	// #ifdef APP-PLUS
	const subNVue = uni.getSubNVueById('subNVueDrawer');
	// #endif

	import {
		mapGetters
	} from "vuex";
	import {
		toLogin
	} from '@/libs/login.js';

	// #ifdef APP-PLUS
	const sharetrace = uni.requireNativePlugin('shoot-sharetrace');
	// #endif
	import {
		HTTP_REQUEST_URL
	} from '@/config/app.js';
	const HARDCODED_PLAYER_LICENSE = Object.freeze({
		domain: 'pailvxing.com',
		key: 'rPGyCqMTO5BPusVi82ffdc4180ffb4bbd9e7c96016f481402'
	});
	export default {
		components: {
			giftPop,
			contentpop,
			goodPop,
			goodInfoPop,
			sendMessage,
			giftList,
			likeButton,
			InfoCom,
			reportCom,
			watchUserPop,
			rechargePop,
		},
		data() {
			return {
				showErrorTips: false,
				errorValue: '主播暂时离开,请稍后..',
				addnum: 0,
				pullUrl: '',
				refreshingPullUrl: false,
				lastPullRefreshAt: 0,
				playerLicense: {
					...HARDCODED_PLAYER_LICENSE
				},
				html: '',
				roomInfo: {
					live_name: '',
					room_image: ''
				},
				isMuted: false, // 是否静音
				isAutoplay: true, // 是否自动播放
				giftShow: false,
				goodShow: false,
				goodInfoShow: false,
				InfoShow: false,
				reportShow: false,
				roomId: '',
				giftsvgashow: false,
				webSocketTask: null,
				giftdata: {}, // 选中的礼物数据
				goodInfoData: {},
				sendMessageShow: false,
				datalist: [], //总数据
				messageList: [],
				chatstate: null,
				sanction: 0, //0   //状态  0正常 1禁言  2拉黑
				likes: 0,
				virtualUser: 0,
				gitList: [], // 礼物列表
				goodList: [], // 商品列表
				giftinfo: {},
				reconnectTimeout: null, //重连定时器
				heartbeatInterval: null, // 心跳
				timeout: 15000,
				isOpen: false,

				watchUserList: [], //在线观众列表


			};
		},
		computed: {
			...mapGetters(['isLogin'])
		},
		onLoad(options) {
			console.log('[live-room] onLoad', {
				roomId: options && options.roomId,
				isLogin: this.isLogin
			});
			if (this.isLogin) {
				this.roomId = options.roomId;
				this.GetLiveShowUr(this.roomId).catch(() => {});
				this.socketinit()
				this.loadPlayerLicense()
			} else {
				toLogin();
			}

		},
		onReady() {
			// sharetrace.getInstallTrace(data => {
			// 	this.showResult(JSON.stringify(data));
			// });
		},
		methods: {
			setErrorTips(data) {
				console.log('[live-room] setErrorTips', data);
				this.showErrorTips = data.flag;
				this.errorValue = data.text;
			},
			loadPlayerLicense() {
				this.playerLicense = {
					...HARDCODED_PLAYER_LICENSE
				};
				const pageInfo = typeof window !== 'undefined' && window.location ? {
					href: window.location.href,
					host: window.location.host,
					hostname: window.location.hostname
				} : {};
				console.warn('[live-room] using hardcoded license', {
					license: this.playerLicense,
					pageInfo
				});
			},
			showResult(data) {
				uni.showModal({
					title: 'ShareTrace',
					content: data,
					showCancel: false,
					success: function(res) {
						console.log(res, 111)
					}
				});
			},
			//点击充值
			goRecharge() {
				this.$refs.rechargePop.open()
			},
			clickInfo(val) {
				//举报
				if (val == 1) {
					this.InfoShow = false;
					this.reportShow = true
				}
				//分享
				if (val == 2) {
					this.appShare()
				}
			},
			// #ifdef APP-PLUS
			appShare() {
				let that = this
				console.log('app点击分享直播1117', )
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				uni.share({
					provider: "weixin",
					scene: 'WXSceneSession',
					type: 0,
					// href:'http://app-qh.cg24.cn?sharePage='+`/pages/live_pusher/live_room/live_room$roomId=${this.roomId}&uid=${222}`,
					href: `http://app-qh.cg24.cn?&roomId=${this.roomId}&uid=${this.$store.state.app.uid}&type=live&spid=${this.$store.state.app.uid}`,
					title: this.roomInfo.room_title || '',
					summary: this.roomInfo.assistant_title || '',
					imageUrl: this.roomInfo.room_image || '',
					success: function(res) {
						uni.hideLoading();
						uni.showToast({
							title: '分享成功',
							icon: 'none'
						})
					},
					fail: function(err) {
						uni.hideLoading();
						uni.showToast({
							title: '分享失败',
							icon: 'none'
						})
					}
				});
			},
			// #endif
			handsendreport() {
				this.reportShow = false;
			},
			oninfo() {
				this.InfoShow = true;
			},
			handsendInfo() {
				this.InfoShow = false;
			},
			//获取在线观众列表
			viewWatchUser(flag) {
				getUserList({
					"type": "user_list",
					"room_id": this.roomId,
				}).then(res => {
					if (res.status == 200) {
						this.watchUserList = res.data;
						if(!flag){
							this.$refs.watchUserPop.open(this.watchUserList)
						}
					}
				})
			},
			// 点赞
			handleClick() {
				this.webSocketTask.send({
					data: JSON.stringify({
						"type": "likes",
						"room_id": this.roomId
					}),
				})
			},
			// 启动心跳检测 
			startHeartbeat() {
				let that = this;
				console.log('心跳')
				
				// that.viewWatchUser(true)
				if (this.heartbeatInterval) {
					clearInterval(this.heartbeatInterval);
				}
				this.heartbeatInterval = setInterval(() => {
					if (this.isOpen) {
						that.webSocketTask.send({
							data: 'PING',
						})
						that.webSocketTask.send({
							data: JSON.stringify({
								type: 'room_info',
								"room_id": this.roomId,
							}),
						})
						
					}
				}, that.timeout)
			},
			socketinit() {
				// 创建webSocket
				let that = this
				this.webSocketTask = uni.connectSocket({
					// url: 'wss://lawdoo.com:8069/websocket-doubao-server',
					url: `ws://1.94.24.131:8324?token=${this.$store.state.app.token}&room_id=${this.roomId}`,
					success(res) {
						console.log('WebSocket连接成功');
						that.isOpen = true;
						// 连接成功后启动心跳
						that.startHeartbeat()
					},
					fail(error) {
						console.error('WebSocket连接失败', error);
						that.reconnect();
					}
				})
				//监听websocket连接关闭事件
				this.webSocketTask.onClose((res) => {
					this.isOpen = false;
					this.reconnect();
				})

				//接收websocket消息及处理
				this.webSocketTask.onMessage((res) => {

					let data = JSON.parse(res.data);
					let that = this;
					//判断服务器返回的type类型
					switch (data.type) {
						case 'PONG': // 处理服务器返回的 PONG
							// 可以在这里添加处理逻辑，例如记录心跳正常
							break;
							//如果返回的ping，说明服务端ping客户端
						case 'room_info': //直播间信息
							that.likes = data.data.likes_num //点赞数
							that.virtualUser = data.data.people_num //人数
							that.sanction = data.data.sanction
							that.gitList = data.data.gift
							that.goodList = data.data.goods
							if (data.data.sanction == 2) {
								uni.showToast({
									title: '您已被拉入黑名单',
									icon: 'none'
								});
								setTimeout(function() {
									uni.navigateBack({
										delta: 1
									});
								}, 2000)

							}
							break;
						case 'message': //直播间信息
							that.$refs.contentpop.onadd({
								content: data.data.content,
								nickname: data.data.nickname
							})
							break;
						case 'sanction': //直播间信息
							if (data.data.sanction == 1) {
								that.sanction = that.sanction == 1 ? 0 : 1
							} else if (data.data.sanction == 2) {
								uni.showToast({
									title: '您已被拉入黑名单',
									icon: 'none'
								});
								setTimeout(function() {
									uni.navigateBack({
										delta: 1
									});
								}, 2000)
							}
							break;
						case 'gift': //礼物
							setTimeout(() => {
								that.setVideoItem({
									svga: data.data.gift_data.svga
								})
							}, 500)
							that.$refs.contentpop.colrdo(data.data)
							break;
						case 'likes': //礼物
							that.likes = data.data
							break;
					}
				})
			},
			// 重连 WebSocket  
			reconnect() {
				if (this.reconnectTimeout) {
					clearTimeout(this.reconnectTimeout);
				}
				this.reconnectTimeout = setTimeout(() => {
					this.socketinit();
				}, 3000);
			},
			//关闭连接
			closeSocket() {
				if (this.webSocketTask) {
					this.webSocketTask.close()
					this.isOpen = false;
				}
			},
			// 聊天消息发送
			onsendChat(data) {
				this.webSocketTask.send({
					data: JSON.stringify({
						"type": "message",
						"room_id": this.roomId,
						"content": data
					}),
					success: (res) => {
						console.log('消息发送成功', res);
					},
					fail: (error) => {
						console.error('消息发送失败', error);
						this.reconnect();
					}
				})
			},
			onsendMessage() {
				this.sendMessageShow = true
			},
			// 获取消息
			getChat() {
				let str = {
					room_id: this.roomId,
					id: this.datalist.length == 0 ? null : this.datalist[this.datalist.length - 1].id
				}
				getChat(str).then(res => {
					this.datalist = this.datalist.concat(res.data)
					res.data.map(item => {
						switch (item.type) {
							case 1: // 弹幕
								this.messageList.push(item)
								break;
							case 2: // 礼物
								let that = this
								setTimeout(() => {
									that.setVideoItem({
										svga: item.content
									})
								}, 1000)
								break;
						}
					})
				})
			},
			// 发送消息
			sendChat(data) {
				sendChat(data).then(res => {
					// this.setVideoItem(this.giftdata)
				})
			},
			nvueShow() {
				const liveRoomNew = uni.getSubNVueById('liveRoomNew');

				setTimeout(() => {
					liveRoomNew.show()
				}, 1000)
			},
			// 礼物动画播放
			setVideoItem(data) {
				let that = this
				// this.$refs.giftsvgashow.open('top')
				this.giftsvgashow = true
				setTimeout(() => {
					that.$refs.svga.render(async (parser, player) => {
						const videoItem = await parser.load(data.svga);
						await player.setVideoItem(videoItem);
						// 设置当前动画的循环次数，0代表无限循环 默认 0
						player.loops = 1
						// 开始播放动画，reverse = true 时则反向播放。
						player.startAnimation()
						// 监听动画完成
						player.onFinished(() => {
							that.giftsvgashow = false
							// that.$refs.giftsvgashow.close()
						})
					})
				}, 500)
			},
			onmove(data, giftNum) {
				this.webSocketTask.send({
					data: JSON.stringify({
						"type": "gift",
						"room_id": this.roomId,
						"gift_id": data.id,
						"num": giftNum
					}),
				})

				// this.giftdata = data
				// let str={
				// 	type:'2',
				// 	room_id:this.roomId,
				// 	content:data.id
				// }
				//     this.sendChat(str)
			},
			onout() {
				uni.navigateBack({
					delta: 1
				});
			},
			handleShowUpdate() {
				this.giftShow = false
			},
			handleShowgood() {
				this.goodShow = false
			},
			handleinfoShowgood() {
				this.goodInfoShow = false
			},
			goodinfo(data) {
				this.goodInfoData = data
				this.goodInfoShow = true
			},
			ongift() {
				this.giftShow = true
			},
			ongoodShow() {
				this.goodShow = true
			},
			onfollow() {
				this.$refs.costShow.open()
			},
			onclose() {
				this.$refs.costShow.close()
			},
			handsendMessage() {
				this.sendMessageShow = false
			},
			// 打开键盘聊天
			// #ifdef APP-PLUS
			openkeyboard() {
				subNVue.show('slide-in-bottom', 300, () => {
					uni.onKeyboardHeightChange((res) => {
						if (res.height) {
							subNVue.setStyle({
								height: res.height
							});
						}
						subNVue.setStyle({
							bottom: res.height,

						});
					});
				});

			},
			// #endif
			// 关注和取消关注
			attentionLive() {
				attentionLive({
					room_id: this.roomId
				}).then(res => {
					if (res.status == 200) {
						if (this.roomInfo.is_attention == 0) {
							uni.showToast({
								title: '关注成功',
								icon: 'none'
							});
							this.roomInfo.is_attention = 1
						} else {
							uni.showToast({
								title: '取消成功',
								icon: 'none'
							});
							this.roomInfo.is_attention = 0
						}

					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				})
			},

			refreshPullUrl(payload = {}) {
				console.log('[live-room] refreshPullUrl called', payload);
				const now = Date.now();
				if (this.refreshingPullUrl) {
					console.log('[live-room] refreshPullUrl skipped: refreshing');
					return;
				}
				if (now - this.lastPullRefreshAt < 1500) {
					console.log('[live-room] refreshPullUrl skipped: throttle');
					return;
				}
				const roomId = payload.roomId || this.roomId;
				if (!roomId) {
					console.log('[live-room] refreshPullUrl skipped: empty roomId');
					return;
				}
				this.refreshingPullUrl = true;
				this.lastPullRefreshAt = now;
				this.GetLiveShowUr(roomId, {
						silent: true,
						pullType: payload.pullType || 'flv'
					})
					.then(() => {
						console.log('[live-room] refreshPullUrl success', {
							roomId,
							pullType: payload.pullType || 'flv'
						});
					})
					.catch((err) => {
						console.log('refreshPullUrl error', payload, err);
					})
					.finally(() => {
						this.refreshingPullUrl = false;
					});
			},
			//获取推流地址
			GetLiveShowUr(roomId, options = {}) {
				console.log('[live-room] GetLiveShowUr start', {
					roomId,
					options
				});
				let that = this;
				const targetRoomId = roomId || this.roomId;
				const {
					silent = false,
					pullType = 'flv'
				} = options;
				if (!targetRoomId) {
					console.log('[live-room] GetLiveShowUr skip: empty targetRoomId');
					return Promise.resolve();
				}
				return GetLiveShowUrlApi({
						room_id: targetRoomId,
						// 用户端改走 flv，当前流可用（m3u8 在云侧返回 404）
						pull_type: pullType
					})
					.then((res) => {
						if (res.status == 200) {
							that.roomInfo = res.data;
							const nextPullUrl = that.roomInfo.pull_url || '';
							console.log('[live-room] GetLiveShowUr success', {
								roomId: targetRoomId,
								pullType,
								hasPullUrl: !!nextPullUrl,
								pullUrl: nextPullUrl
							});
							if (nextPullUrl && nextPullUrl !== that.pullUrl) {
								console.log('[live-room] pullUrl updated', {
									from: that.pullUrl,
									to: nextPullUrl
								});
								that.pullUrl = nextPullUrl;
							} else if (!that.pullUrl) {
								that.pullUrl = nextPullUrl;
							}
							// poster="https://img.alicdn.com/imgextra/i1/2825989823/O1CN01sgPdZ22MQzAJ2GJAx_!!2825989823.jpg"
							this.html =
								`<video  controlslist="nodownload" :muted="false"   src="${nextPullUrl}"   style="height:100%"  autoplay="autoplay"  webkit-playsinline="" playsinline="" ></video>`
							return res;
						} else {
							console.log('[live-room] GetLiveShowUr business error', res);
							if (!silent) {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								});
							}
							return Promise.reject(new Error(res.msg || '获取直播地址失败'));
						}
					})
					.catch((err) => {
						console.log(err);
						if (!silent) {
							uni.showToast({
								title: '获取直播地址失败',
								icon: 'none'
							});
						}
						return Promise.reject(err);
					});
			}
		},
		beforeDestroy() {
			clearInterval(this.chatstate);
			clearInterval(this.heartbeatInterval);
			clearTimeout(this.reconnectTimeout);
			// 离开直播间时发送消息到后台
			if (this.webSocketTask && this.webSocketTask.readyState === 1) {
				this.webSocketTask.send({
					data: JSON.stringify({
						"type": 'close',
						"room_id": this.roomId
					}),
				});
				console.log('离开直播间')
			}
			// this.closeSocket();

		}
	};
</script>


<script module="player" lang="renderjs">
	import Aliplayer from 'aliyun-aliplayer';
	import 'aliyun-aliplayer/build/flv/aliplayer-flv-min.js';
	import "aliyun-aliplayer/build/skins/default/aliplayer-min.css";
	const HARDCODED_PLAYER_LICENSE = Object.freeze({
		domain: 'pailvxing.com',
		key: 'rPGyCqMTO5BPusVi82ffdc4180ffb4bbd9e7c96016f481402'
	});
	export default {
		data() {
			return {
				licenseData: {
					...HARDCODED_PLAYER_LICENSE
				}
			}
		},
		mounted() {
			this.getData()
		},
		beforeDestroy() {
			console.log('[live-room-player] beforeDestroy');
			const state = this.playerState || {};
			clearTimeout(state.retryTimer);
			clearTimeout(state.stallTimer);
			clearInterval(state.flowTimer);
			state.retryTimer = null;
			state.stallTimer = null;
			state.flowTimer = null;
			if (this.player && typeof this.player.dispose === 'function') {
				try {
					this.player.dispose();
				} catch (e) {}
			}
			this.player = null;
		},
		methods: {
			setLicenseData(newVal) {
				if (!newVal) return;
				const prev = this.licenseData || {};
				const changed = prev.domain !== newVal.domain || prev.key !== newVal.key;
				console.warn('[live-room-player] setLicenseData', {
					previousLicense: prev,
					nextLicense: newVal,
					changed
				});
				this.licenseData = newVal;
				if (!changed) return;
				const state = this.playerState || {};
				if (this.player && state.sourceUrl && !state.hasPlayed) {
					console.log('[live-room-player] license updated, recreate player', {
						sourceUrl: state.sourceUrl
					});
					if (typeof this.player.dispose === 'function') {
						try {
							this.player.dispose();
						} catch (e) {}
					}
					this.player = null;
					this.createPlayer(state.sourceUrl);
				}
			},
			// html中绑定的方法
			getData(newValue) {
				console.log('[live-room-player] getData', {
					hasValue: !!newValue,
					value: newValue
				});
				if (newValue) {
					this.createPlayer(newValue)
				}
			},
			createPlayer(url) {
				let that = this;
				const MAX_RETRY = 5;
				const RETRY_DELAY = 2000;
				const STALL_TIMEOUT = 12000;
				const FLOW_CHECK_INTERVAL = 1500;
				const FLOW_ALIVE_WINDOW = 15000;
				const OFFLINE_TEXT = '主播暂时离开，请稍后...';
				const RECONNECTING_TEXT = '直播连接中，请稍后...';
				const log = (...args) => console.log('[live-room-player]', ...args);
				log('createPlayer start', {
					url
				});
				const getPageInfo = () => {
					if (typeof window === 'undefined' || !window.location) return {};
					return {
						href: window.location.href,
						host: window.location.host,
						hostname: window.location.hostname,
						origin: window.location.origin
					};
				};
				const isLicenseDomainMatchHost = () => {
					const licenseDomain = String(resolvedLicense && resolvedLicense.domain || '').trim().toLowerCase();
					const host = String(getPageInfo().hostname || '').trim().toLowerCase();
					if (!licenseDomain || !host) return false;
					return host === licenseDomain || host.endsWith(`.${licenseDomain}`);
				};
				const resolvedLicense = this.licenseData || {
					...HARDCODED_PLAYER_LICENSE
				};
				log('resolved license for Aliplayer', {
					license: resolvedLicense,
					licenseDataFromProp: this.licenseData,
					hardcodedLicense: HARDCODED_PLAYER_LICENSE,
					pageInfo: getPageInfo()
				});
				const getVideoDebugInfo = () => {
					const videoEl = getVideoElement();
					if (!videoEl) {
						return {
							hasVideoElement: false
						};
					}
					let bufferedRanges = [];
					try {
						if (videoEl.buffered && videoEl.buffered.length > 0) {
							for (let i = 0; i < videoEl.buffered.length; i++) {
								bufferedRanges.push({
									start: videoEl.buffered.start(i),
									end: videoEl.buffered.end(i)
								});
							}
						}
					} catch (e) {}
					const nativeError = videoEl.error ? {
						code: videoEl.error.code,
						message: videoEl.error.message || ''
					} : null;
					return {
						hasVideoElement: true,
						currentTime: videoEl.currentTime,
						paused: videoEl.paused,
						ended: videoEl.ended,
						readyState: videoEl.readyState,
						networkState: videoEl.networkState,
						src: videoEl.currentSrc || videoEl.src || '',
						buffered: bufferedRanges,
						nativeError
					};
				};
				const getPlayerStateSnapshot = () => {
					const s = that.playerState || {};
					return {
						retryCount: s.retryCount,
						hasPlayed: s.hasPlayed,
						sourceUrl: s.sourceUrl,
						awaitingUserGesture: s.awaitingUserGesture,
						autoPlayTryCount: s.autoPlayTryCount,
						sessionId: s.sessionId,
						lastBufferedEnd: s.lastBufferedEnd,
						lastCurrentTime: s.lastCurrentTime,
						lastDataAt: s.lastDataAt,
						flowDetected: s.flowDetected,
						flowStableTicks: s.flowStableTicks
					};
				};
				const logDetailedPlayerError = (tag, event, extra = {}) => {
					const paramData = event && event.paramData ? event.paramData : {};
					const errorCode = Number(paramData && paramData.error_code || 0);
					console.error('[live-room-player] detailed error', {
						tag,
						errorCode,
						eventType: event && event.type,
						paramData,
						licenseInUse: resolvedLicense,
						propLicenseData: that.licenseData,
						hardcodedLicense: HARDCODED_PLAYER_LICENSE,
						pageInfo: getPageInfo(),
						playerState: getPlayerStateSnapshot(),
						videoDebug: getVideoDebugInfo(),
						extra
					});
				};
				const bindNativeVideoDebugEvents = () => {
					const videoEl = getVideoElement();
					if (!videoEl || videoEl.__qhDebugBound) return;
					videoEl.__qhDebugBound = true;
					const nativeLog = (type) => {
						const nativeError = videoEl.error ? {
							code: videoEl.error.code,
							message: videoEl.error.message || ''
						} : null;
						console.error('[live-room-player] native video event', {
							type,
							nativeError,
							videoDebug: getVideoDebugInfo(),
							licenseInUse: resolvedLicense,
							pageInfo: getPageInfo()
						});
					};
					videoEl.addEventListener('error', () => nativeLog('error'));
					videoEl.addEventListener('stalled', () => nativeLog('stalled'));
					videoEl.addEventListener('waiting', () => nativeLog('waiting'));
				};
				const setNetworkDebugContext = (tag) => {
					if (typeof window === 'undefined') return;
					window.__qhAliPlayerDebugContext = {
						tag,
						license: resolvedLicense,
						pageInfo: getPageInfo()
					};
				};
				const shouldLogNetworkUrl = (rawUrl) => {
					const urlText = String(rawUrl || '');
					if (!urlText) return false;
					return /license|aliyun|aliplayer|aliyuncs|m3u8|flv|auth_key|live/i.test(urlText);
				};
				const logLicenseRequest = (stage, req = {}) => {
					setNetworkDebugContext('live-room-player');
					console.log('[live-room-player] send request with license', {
						stage,
						request: req,
						license: resolvedLicense,
						pageInfo: getPageInfo()
					});
				};
				const installPlayerNetworkDebug = () => {
					if (typeof window === 'undefined') return;
					const w = window;
					setNetworkDebugContext('live-room-player');
					if (!w.__qhAliPlayerNetworkDebugInstalled) {
						w.__qhAliPlayerNetworkDebugInstalled = true;
						if (typeof w.fetch === 'function' && !w.fetch.__qhAliPlayerWrapped) {
							const rawFetch = w.fetch.bind(w);
							const wrappedFetch = function(input, init) {
								const requestUrl = typeof input === 'string' ? input : (input && input.url) || '';
								if (shouldLogNetworkUrl(requestUrl)) {
									const ctx = w.__qhAliPlayerDebugContext || {};
									console.log('[ali-player-network] fetch', {
										url: requestUrl,
										method: (init && init.method) || 'GET',
										context: ctx
									});
								}
								return rawFetch(input, init);
							};
							wrappedFetch.__qhAliPlayerWrapped = true;
							w.fetch = wrappedFetch;
						}
						const xhrProto = w.XMLHttpRequest && w.XMLHttpRequest.prototype;
						if (xhrProto && !xhrProto.__qhAliPlayerWrapped) {
							const rawOpen = xhrProto.open;
							const rawSend = xhrProto.send;
							xhrProto.open = function(method, reqUrl, ...rest) {
								this.__qhAliReq = {
									method,
									url: reqUrl
								};
								return rawOpen.call(this, method, reqUrl, ...rest);
							};
							xhrProto.send = function(body) {
								const reqInfo = this.__qhAliReq || {};
								if (shouldLogNetworkUrl(reqInfo.url)) {
									const ctx = w.__qhAliPlayerDebugContext || {};
									console.log('[ali-player-network] xhr', {
										url: reqInfo.url || '',
										method: reqInfo.method || 'GET',
										bodyPreview: typeof body === 'string' ? body.slice(0, 300) : (body ? Object.prototype.toString.call(body) : ''),
										context: ctx
									});
								}
								return rawSend.call(this, body);
							};
							xhrProto.__qhAliPlayerWrapped = true;
						}
					}
				};
				installPlayerNetworkDebug();
				const setErrorTips = (flag, text) => {
					log('setErrorTips', {
						flag,
						text
					});
					that.$ownerInstance.callMethod('setErrorTips', {
						flag,
						text
					});
				};
				const hideErrorTips = () => setErrorTips(false, '');
				const showReconnectingTips = () => setErrorTips(true, RECONNECTING_TEXT);
				const showOfflineTips = () => setErrorTips(true, OFFLINE_TEXT);

				const state = this.playerState || {
					retryCount: 0,
					hasPlayed: false,
					sourceUrl: '',
					retryTimer: null,
					stallTimer: null,
					flowTimer: null,
					awaitingUserGesture: false,
					autoPlayTryCount: 0,
					sessionId: 0,
					lastUrlRefreshAt: 0,
					lastBufferedEnd: 0,
					lastCurrentTime: 0,
					lastDataAt: 0,
					flowDetected: false,
					flowStableTicks: 0,
					lastAutoPlayAt: 0
				};
				const sameSource = state.sourceUrl === url;
				if (!sameSource) {
					state.retryCount = 0;
				}
				state.hasPlayed = false;
				state.sourceUrl = url;
				state.awaitingUserGesture = false;
				state.autoPlayTryCount = 0;
				clearTimeout(state.retryTimer);
				clearTimeout(state.stallTimer);
				clearInterval(state.flowTimer);
				state.retryTimer = null;
				state.stallTimer = null;
				state.flowTimer = null;
				state.lastBufferedEnd = 0;
				state.lastCurrentTime = 0;
				state.lastDataAt = 0;
				state.flowDetected = false;
				state.flowStableTicks = 0;
				state.lastAutoPlayAt = 0;
				state.sessionId = (state.sessionId || 0) + 1;
				const sessionId = state.sessionId;
				this.playerState = state;
				log('session reset', {
					sessionId,
					sameSource
				});

				const isCurrentSession = () => {
					return !!(that.playerState && that.playerState.sessionId === sessionId);
				};
				const requestFreshUrl = (reason) => {
					if (!isCurrentSession()) return;
					const now = Date.now();
					if (now - state.lastUrlRefreshAt < 2000) return;
					state.lastUrlRefreshAt = now;
					log('requestFreshUrl', {
						reason
					});
					that.$ownerInstance.callMethod('refreshPullUrl', {
						pullType: 'flv',
						reason
					});
				};
				const getVideoElement = () => {
					const p = that.player;
					if (p && p.tag && String(p.tag.nodeName || '').toUpperCase() === 'VIDEO') {
						return p.tag;
					}
					if (p && typeof p.getVideoElement === 'function') {
						try {
							const v = p.getVideoElement();
							if (v) return v;
						} catch (e) {}
					}
					const playerEl = document.getElementById('player');
					if (!playerEl) return null;
					return playerEl.querySelector('video');
				};
				const isFlowAlive = () => {
					if (!state.lastDataAt) return false;
					return Date.now() - state.lastDataAt <= FLOW_ALIVE_WINDOW;
				};
				const stopFlowProbe = () => {
					clearInterval(state.flowTimer);
					state.flowTimer = null;
				};
				const sampleFlow = () => {
					if (!isCurrentSession()) return;
					const videoEl = getVideoElement();
					const isVideoPlaying = !!(videoEl && !videoEl.paused);
					let bufferedEnd = 0;
					if (videoEl) {
						try {
							if (videoEl.buffered && videoEl.buffered.length > 0) {
								bufferedEnd = videoEl.buffered.end(videoEl.buffered.length - 1);
							}
						} catch (e) {}
					}
					if ((!bufferedEnd || bufferedEnd <= 0) && that.player && typeof that.player.getBuffered === 'function') {
						try {
							const b = that.player.getBuffered();
							if (typeof b === 'number') {
								bufferedEnd = b;
							} else if (b && typeof b.end === 'function' && b.length > 0) {
								bufferedEnd = b.end(b.length - 1);
							}
						} catch (e) {}
					}
					let currentTime = Number(videoEl && videoEl.currentTime || 0);
					if ((!currentTime || currentTime <= 0) && that.player && typeof that.player.getCurrentTime === 'function') {
						try {
							currentTime = Number(that.player.getCurrentTime() || 0);
						} catch (e) {}
					}
					const bufferedDelta = bufferedEnd - state.lastBufferedEnd;
					const timeDelta = currentTime - state.lastCurrentTime;
					state.lastBufferedEnd = bufferedEnd;
					state.lastCurrentTime = currentTime;
					const hasFlowGrowth = bufferedDelta > 0.25 || timeDelta > 0.05;
					if (hasFlowGrowth) {
						state.lastDataAt = Date.now();
						if (!state.flowDetected) {
							state.flowDetected = true;
							log('flow detected', {
								bufferedEnd,
								currentTime,
								bufferedDelta,
								timeDelta
							});
						}
					}

					if (state.hasPlayed) return;
					if (currentTime > 0.1) {
						markPlayed();
						return;
					}
					if (ensureAutoPlay('sampleFlow')) return;
					if (state.flowDetected && bufferedEnd > 0.5 && (isVideoPlaying || !videoEl)) {
						state.flowStableTicks += 1;
						if (state.flowStableTicks >= 2) {
							log('markPlayed by flow', {
								bufferedEnd,
								currentTime,
								flowStableTicks: state.flowStableTicks
							});
							markPlayed();
						}
						return;
					}
					state.flowStableTicks = 0;
				};
				const startFlowProbe = () => {
					if (!isCurrentSession()) return;
					stopFlowProbe();
					log('startFlowProbe');
					state.flowTimer = setInterval(() => {
						sampleFlow();
					}, FLOW_CHECK_INTERVAL);
				};

				const ensureAutoPlay = (reason) => {
					if (!isCurrentSession() || state.hasPlayed) return false;
					const videoEl = getVideoElement();
					const paused = !!(videoEl && videoEl.paused);
					const canAutoRecover = state.flowDetected && paused && state.lastBufferedEnd > 0.5 && state.lastCurrentTime <= 0.2;
					if (!canAutoRecover) return false;
					if (state.autoPlayTryCount >= 8) return false;
					const now = Date.now();
					if (now - state.lastAutoPlayAt < 1200) return true;
					state.lastAutoPlayAt = now;
					state.autoPlayTryCount += 1;
					state.awaitingUserGesture = true;
					log('autoplay fallback to mute', {
						reason,
						autoPlayTryCount: state.autoPlayTryCount,
						bufferedEnd: state.lastBufferedEnd,
						currentTime: state.lastCurrentTime
					});
					showReconnectingTips();
					try {
						if (videoEl) videoEl.muted = true;
					} catch (e) {}
					try {
						if (that.player && typeof that.player.mute === 'function') that.player.mute();
					} catch (e) {}
					try {
						if (that.player && that.player.play) that.player.play();
					} catch (e) {}
					clearTimeout(state.stallTimer);
					state.stallTimer = null;
					setTimeout(() => {
						if (!isCurrentSession() || state.hasPlayed) return;
						state.awaitingUserGesture = false;
					}, 600);
					return true;
				};

				const canLoadByUrl = (playerInstance) => {
					return !!(playerInstance && typeof playerInstance.loadByUrl === 'function');
				};

				const markPlayed = () => {
					if (!isCurrentSession()) return;
					if (!state.hasPlayed) {
						log('markPlayed', {
							bufferedEnd: state.lastBufferedEnd,
							currentTime: state.lastCurrentTime
						});
					}
					state.hasPlayed = true;
					state.retryCount = 0;
					state.lastDataAt = Date.now();
					state.flowStableTicks = 0;
					state.autoPlayTryCount = 0;
					state.awaitingUserGesture = false;
					clearTimeout(state.stallTimer);
					state.stallTimer = null;
					hideErrorTips();
				};
				const armStallWatchdog = (tag) => {
					if (!isCurrentSession()) return;
					clearTimeout(state.stallTimer);
					state.stallTimer = setTimeout(() => {
						if (!isCurrentSession()) return;
						if (ensureAutoPlay(`stall:${tag}`)) return;
						if (!state.hasPlayed) {
							requestFreshUrl(`stall:${tag}`);
							retryLoad(`stall:${tag}`);
						}
					}, STALL_TIMEOUT);
				};
				const retryLoad = (eventName) => {
					if (!isCurrentSession()) return;
					log('retryLoad', {
						eventName,
						retryCount: state.retryCount,
						hasPlayed: state.hasPlayed,
						flowAlive: isFlowAlive()
					});
					if (ensureAutoPlay(`retry:${eventName}`)) return;
					if (state.awaitingUserGesture) return;
					if (state.retryCount >= MAX_RETRY) {
						if (!state.hasPlayed) {
							showReconnectingTips();
							requestFreshUrl(`maxRetry:${eventName}`);
							clearTimeout(state.retryTimer);
							state.retryTimer = setTimeout(() => {
								if (!isCurrentSession() || state.hasPlayed) return;
								state.retryCount = MAX_RETRY - 1;
								log('maxRetryLoop continue', {
									eventName
								});
								retryLoad(`maxRetryLoop:${eventName}`);
							}, RETRY_DELAY * 3);
						}
						return;
					}
					state.retryCount += 1;
					if (!state.hasPlayed && state.retryCount >= 2) {
						requestFreshUrl(`retry:${eventName}`);
					}
					showReconnectingTips();
					clearTimeout(state.retryTimer);
					state.retryTimer = setTimeout(() => {
						if (!isCurrentSession()) return;
						try {
							const reloadUrl = state.sourceUrl || url;
							log('retry reloadUrl', {
								reloadUrl
							});
							if (canLoadByUrl(player)) {
								logLicenseRequest('aliplayer:loadByUrl:retry', {
									method: 'GET',
									url: reloadUrl
								});
								player.loadByUrl(reloadUrl);
								if (player.play) player.play();
								startFlowProbe();
								armStallWatchdog(`reload:${eventName}`);
								return;
							}
							if (typeof player.dispose === 'function') {
								try {
									player.dispose();
								} catch (e) {}
							}
							that.player = null;
							that.createPlayer(reloadUrl);
						} catch (e) {
							console.log('重连失败', eventName, e);
						}
					}, RETRY_DELAY);
				};

				if (this.player) {
					log('reuse existing player');
					hideErrorTips();
					if (canLoadByUrl(this.player)) {
						logLicenseRequest('aliplayer:loadByUrl:reuse', {
							method: 'GET',
							url
						});
						this.player.loadByUrl(url);
						try {
							this.player.play();
						} catch (e) {}
						startFlowProbe();
						armStallWatchdog('reuse');
						return;
					}
					if (typeof this.player.dispose === 'function') {
						try {
							this.player.dispose();
						} catch (e) {}
					}
					this.player = null;
				}

				const playerOptions = {
					id: 'player',
					source: url,
					width: "750rpx",
					height: "100vh",
					autoplay: true,
					autoplayPolicy: {
						fallbackToMute: true,
						showUnmuteBtn: true
					},
					isLive: true,
					extraInfo: {
						poster: 'noposter'
					}, // 播放器参数 extraInfo 的内容会透传到 <video> 标签上
					skinLayout: false, //隐藏播放器自带皮肤后，播放器报错界面也将不会显示
				};
				playerOptions.license = resolvedLicense;
				logLicenseRequest('aliplayer:init', {
					method: 'INIT',
					url,
					playerOptions: {
						id: playerOptions.id,
						source: playerOptions.source,
						isLive: playerOptions.isLive
					}
				});

				var player = new Aliplayer(playerOptions, function(player) {
					log('Aliplayer created');
					log('playerOptions', playerOptions);
				});
				setTimeout(() => {
					bindNativeVideoDebugEvents();
				}, 0);
				startFlowProbe();
				armStallWatchdog('init');

				player.on('ready', function() {
					if (!isCurrentSession()) return;
					log('event:ready');
					bindNativeVideoDebugEvents();
					try {
						player.play();
					} catch (e) {}
					armStallWatchdog('ready');
				});

				setTimeout(() => {
					if (!isCurrentSession()) return;
					if (!state.hasPlayed) {
						showReconnectingTips();
						ensureAutoPlay('startupDelay');
					}
				}, 3000);

				//正在播放
				player.on('playing', function(e) {
					log('event:playing');
					markPlayed();
				});
				player.on('canplay', function() {
					log('event:canplay');
					markPlayed();
				});
				player.on('play', function() {
					log('event:play');
					markPlayed();
				});
				player.on('loadedmetadata', function() {
					log('event:loadedmetadata');
					markPlayed();
				});
				player.on('loadeddata', function() {
					log('event:loadeddata');
					markPlayed();
				});
				player.on('timeupdate', function() {
					markPlayed();
				});
				//结束
				player.on('ended', function(e) {
					log('event:ended');
					setErrorTips(true, '直播结束！');
				});
				//错误
				player.on('error', function(event) {
					log('event:error', event);
					logDetailedPlayerError('aliplayer:on(error)', event, {
						stage: 'before-branch'
					});
					const errorCode = Number(event && event.paramData && event.paramData.error_code || 0);
					if ([4036, 4037, 4038, 4039, 4040, 4041].includes(errorCode)) {
						log('license error detected', {
							errorCode,
							licenseInUse: resolvedLicense,
							pageInfo: getPageInfo(),
							licenseDomainMatchesHost: isLicenseDomainMatchHost()
						});
						logDetailedPlayerError('aliplayer:license-error', event, {
							licenseError: true
						});
						that.$ownerInstance.callMethod('loadPlayerLicense');
						showReconnectingTips();
						if (state.retryCount < MAX_RETRY) {
							state.retryCount += 1;
							clearTimeout(state.retryTimer);
							state.retryTimer = setTimeout(() => {
								if (!isCurrentSession() || state.hasPlayed) return;
								try {
									if (typeof player.dispose === 'function') player.dispose();
								} catch (e) {}
								that.player = null;
								that.createPlayer(state.sourceUrl || url);
							}, 800);
						}
						return;
					}
					if (ensureAutoPlay('error')) return;
					const videoEl = getVideoElement();
					const playingNow = !!(videoEl && !videoEl.paused && !videoEl.ended);
					if (isFlowAlive() && (playingNow || state.lastCurrentTime > 0.1)) {
						log('event:error ignored (flow alive)', {
							hasPlayed: state.hasPlayed,
							flowDetected: state.flowDetected,
							playingNow
						});
						if (!state.hasPlayed) {
							markPlayed();
						}
						return;
					}
					retryLoad('error');
				});
				//直播流中断重试事件
				player.on('onM3u8Retry', function() {
					if (!isCurrentSession()) return;
					log('event:onM3u8Retry');
					showReconnectingTips();
					armStallWatchdog('onM3u8Retry');
				});
				//尝试数据恢复失败时，会触发liveStreamStop事件
				player.on('liveStreamStop', () => {
					if (!isCurrentSession()) return;
					log('event:liveStreamStop');
					requestFreshUrl('liveStreamStop');
					retryLoad('liveStreamStop');
				});
				// 当RTS拉流成功时触发，通过订阅该事件，可以获取到RTS TraceId。 回调函数的参数中traceId为拉流的TraceId，source为当前RTS流的播放地址。
				// player.on('rtsTraceId', function(event) {
				// 	console.log('EVENT rtsTraceId拉流成功', event.paramData);
				// })
				// // 当RTS降级时触发，参数reason为降级的原因，fallbackUrl为降级到的地址。
				// player.on('rtsFallback', function(event) {
				// 	console.log('EVENT rtsFallback降级', event.paramData);
				// })
				log('player attached');
				this.player = player;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.custom-error-tips {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		text-align: center;
	}

	// .box{
	//     width: 112rpx;
	//     height: 50rpx;
	//     color: #ffffff;
	//     font-size: 22rpx;
	//     // border-radius: 0 38rpx 38rpx 0;
	//     background: pink;
	//     // display: flex;
	//     // align-items: center;
	//     // justify-content: center;
	//     margin:200rpx  ;
	//     border-radius: 0 38rpx 38rpx 50%;
	//     // border-radius: 0 38rpx 38rpx 0;
	// }
	uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none;
		width: 0;
		height: 0;
		-webkit-appearance: none;
		background: transparent;
		color: transparent;
	}


	.content {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
	}

	.container {
		width: 100%;
		height: 100vh;
		background-color: #000000;
		// background-color: red;
		padding-bottom: env(safe-area-inset-bottom);
		/* 兼容安全区 */
		box-sizing: border-box;
		/* 确保高度包含 padding */
	}

	video {
		width: 100%;
		height: 100%;
		z-index: -1;
		background: pink;
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

	/* 弹幕区域 */
	.tv-anchor123 {
		width: 300rpx;
		position: fixed;
		top: calc(var(--status-bar-height) + 20px);
		left: 40rpx;
		height: 110rpx;
		z-index: 999;
		display: flex;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 50rpx;
		padding: 0 20rpx;

		.tv-anchor-image {
			width: 60rpx;
			height: 60rpx;
			border-radius: 60rpx;
		}

		.tv-anchor-nickname {
			margin-left: 20rpx;
			font-size: 32rpx;
			color: #ffffff;
		}
	}

	/* 弹幕区域 */
	// .danmu-area {
	// 	position: fixed;
	// 	bottom: 200rpx;
	// 	left: 20rpx;
	// 	z-index: 999;
	// 	width: 500rpx;
	// 	height: 300rpx;
	// 	overflow-y: hidden;

	// 	.danmu-item {
	// 		display: flex;
	// 		align-items: center;
	// 		margin-bottom: 10rpx;
	// 		color: #fff;
	// 		font-size: 28rpx;
	// 	}
	// }
	// 输入框

	.footer {
		width: 100%;
		padding: 20rpx 4%;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 9999;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.footer_input {
		flex: 1;
		padding: 0 30rpx;
		height: 80rpx;
		border: 1px solid #ccc;
		border-radius: 50rpx;
		color: #ffffff;
		line-height: 80rpx;
	}

	.footer_send {
		width: 150rpx;
		height: 80rpx;
		background-color: #fd502f;
		border-radius: 50%;
		margin-left: 20rpx;
		text-align: center;
		line-height: 80rpx;
		font-size: 32rpx;
		color: #ffffff;
	}

	.top-anchor {

		padding: 0 18rpx 0 26rpx;
		// box-sizing: border-box;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		width: 750rpx;
		height: 94rpx;
		margin-top: 60rpx;

	}

	.top-anchor-user {
		width: 410rpx;
		height: 94rpx;
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 48rpx;
		display: flex;
		flex-flow: row wrap;
		justify-content: flex-start;
		align-items: center;
		padding: 0 0 0 10rpx;

		// box-sizing: border-box;
		.top-anchor-user-image {
			width: 76rpx;
			height: 94rpx;
			display: flex;
			align-items: center;
			margin-right: 20rpx;

			.tv-anchor-image {
				width: 76rpx;
				height: 76rpx;
				border-radius: 76rpx;
				border: 2rpx solid #ffffff;
			}
		}

	}

	.top-anchor-user-cont {
		height: 94rpx;
		width: 192rpx;
	}

	.top-anchor-user-cont-title {
		color: #ffffff;
		font-size: 28rpx;
		line-height: 34rpx;
		margin-top: 8rpx;
		font-weight: 500;

	}

	.top-anchor-user-cont-num {
		font-size: 20rpx;
		color: #bec0c7;
		line-height: 37rpx;
		margin-top: 12rpx;
	}

	.top-anchor-user-right {
		width: 112rpx;
		height: 94rpx;
		border-radius: 0 48rpx 48rpx 0;
		background: #0c1332;
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

		.top-anchor-right-text {
			width: 200rpx;
			height: 94rpx;
			margin-right: 22rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}

		.top-anchor-right-text-text {
			font-size: 22rpx;
			color: #ffffff;
			text-align: right;
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

	.popUp {
		width: 100%;
		height: 415rpx;
		background: #ffffff;
		border-radius: 16rpx 16rpx 0 0;
		padding-top: 25rpx;
		position: relative;

		.popUp-topimage {
			display: flex;
			justify-content: center;

			image {
				width: 108rpx;
				height: 108rpx;
				border-radius: 50%;
			}
		}

		.popUp-close {
			position: absolute;
			top: 32rpx;
			right: 32rpx;
			width: 40rpx;
			height: 40rpx;
		}

		.popUp-name {
			line-height: 35rpx;
			margin-top: 18rpx;
			font-size: 24rpx;
			color: #1629ff;
			text-align: center;
		}

		.popUp-info {
			line-height: 35rpx;
			font-size: 22rpx;
			color: #d6dce3;
			text-align: center;
		}

		.popUp-btn {
			margin-top: 48rpx;
			display: flex;
			justify-content: center;

			view {
				width: 214rpx;
				height: 73rpx;
				border-radius: 12rpx;
				color: #ffffff;
				background: #2133ff;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28rpx;
			}
		}
	}

	.svga {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
	}

	.give {
		position: absolute;
		bottom: 160rpx;
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
