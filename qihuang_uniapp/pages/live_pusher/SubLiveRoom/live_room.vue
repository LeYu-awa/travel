<!-- 副播页面 -->
<template>
	<view class="container">
		<div id="player" :data="pullUrl" :change:data="player.getData" :licdata="playerLicense" :change:licdata="player.setLicenseData"></div>
		<div class="custom-error-tips" v-if="showErrorTips">{{errorValue}}</div>
		<!-- <view v-html="html" style="height: 100vh;width: 750rpx;"></view> -->
		<contentpop :datainfo="datainfo" @goodShow="ongoodShow" :messageList="messageList"
			@onforbiddenShow="onforbiddenShow" @user="onuser" @userdata="userdata" @viewUserList="viewWatchUser"
			:virtualUser="virtualUser" :userList="watchUserList" :giftsvgashow="giftsvgashow" ref="contentpop">
		</contentpop>
		<forbiddenSpeechPop @everyone="oneveryone" :roomId="roomId" :datalist="sanctionList" :show="forbiddenShow"
			@close="handleShowUpdate" @tab="ontab"></forbiddenSpeechPop>
		<goodPop ref="goodPop" :show="goodShow" :roomId="roomId" @close="handleShowgood" @goodinfo="goodinfo"></goodPop>
		<!-- 观众列表弹窗 -->
		<watchUserPop ref="watchUserPop" @selectedUser="onuser"></watchUserPop>
		<!-- <bulletChat ref="bulletChat"></bulletChat> -->
		<!-- 观众信息弹窗 -->
		<uni-popup ref="userInfoPop" type="bottom">
			<view class="popUp">
				<image class="popUp-close" src="/static/images/liveRoom/close.jpg" @click="onclose"></image>
				<view class="pop-user">
					<view class="pop-user-image">
						<image :src="userinfo.avatar"></image>
					</view>
					<view class="pop-user-right">
						<view class="pop-user-title">{{userinfo.nickname}}</view>
						<view class="pop-user-text">
							128个动态 · 28w粉丝 · 1关注 <text>TA的主页</text>
						</view>
					</view>
				</view>
				<view class="pop-text">王者荣资深叫唤师，长期活跃于青铜白银段位，技术从未退步</view>
				<view class="btn">
					<view class="follow" v-if="userinfo.is_attention==0">关注</view>
					<view class="followedby" v-if="userinfo.is_attention==1 "><uni-icons type="checkmarkempty"
							size="20"></uni-icons></view>
					<view class="block" v-if="userinfo.sanction_blacklist==0"
						@click="handleSanction(2,userinfo.uid,userinfo.fd,'forbidden')">
						<image src="/static/images/liveRoom/block.png"></image>拉黑
					</view>
					<view class="by" v-if="userinfo.sanction_blacklist==1"
						@click="handleSanction(2,userinfo.uid,userinfo.fd,'restore')">
						<image src="/static/images/liveRoom/block.png"></image>已拉黑
					</view>
					<view class="forbidden" v-if="userinfo.sanction_speak==0"
						@click="handleSanction(1,userinfo.uid,userinfo.fd,'forbidden')">
						<image src="/static/images/liveRoom/Forbiddenbs.png"></image>禁言
					</view>
					<view class="by" v-if="userinfo.sanction_speak==1"
						@click="handleSanction(1,userinfo.uid,userinfo.fd,'restore')">
						<image src="/static/images/liveRoom/Forbiddenbs.png"></image>已禁言
					</view>
				</view>
			</view>
		</uni-popup>
		<view class="svga" v-show="giftsvgashow">
			<l-svga ref="svga"></l-svga>
		</view>
	</view>
</template>

<script>
	import {
		GetLiveShowUrlApi
	} from '@/api/video.js';
	import contentpop from './components/contentpop';
	import forbiddenSpeechPop from './components/forbiddenSpeechPop';
	import goodPop from './components/goodPop';
	import watchUserPop from './components/watchUserPop.vue';

	import bulletChat from './components/bulletChat';
	import {
		sanction,
		attentionLive,
		getLiveGoods,
		getChat,
		sendChat,
		getUserList,
	} from '@/api/liveBroadcast.js';
	const HARDCODED_PLAYER_LICENSE = Object.freeze({
		domain: 'pailvxing.com',
		key: 'rPGyCqMTO5BPusVi82ffdc4180ffb4bbd9e7c96016f481402'
	});
	export default {
		components: {
			contentpop,
			forbiddenSpeechPop,
			goodPop,
			bulletChat,
			watchUserPop,
		},
		data() {
			return {
				messageList: [],
				datainfo: {},
				forbiddenShow: false, // 禁言弹窗
				goodShow: false,
				roomId: '',
				webSocketTask: null,
				virtualUser: 0,

				showErrorTips: false,
				errorValue: '主播暂时离开,请稍后..',
				pullUrl: '',
				refreshingPullUrl: false,
				lastPullRefreshAt: 0,
				playerLicense: {
					...HARDCODED_PLAYER_LICENSE
				},
				roomInfo: {
					live_name: '',
					room_image: ''
				},
				userinfo: {
					avatar: "", // 用户头像
					is_attention: 0, //是否关注
					nickname: '', // 昵称
					sanction_speak: 0, // 禁言
					sanction_blacklist: 0, // 拉黑
				},
				sanctionList: [],
				giftsvgashow: true,
				reconnectTimeout: null, //重连定时器
				heartbeatInterval: null, // 心跳
				timeout: 15000,
				isOpen: false,
				watchUserList: [], //在线观众列表
			};
		},
		onLoad(options) {
			console.log('[sub-live-room] onLoad', {
				roomId: options && options.roomId
			});
			this.roomId = options.roomId;
			this.GetLiveShowUr(this.roomId).catch(() => {});
			this.socketinit()
			this.loadPlayerLicense()
		},
		onReady() {},
		methods: {
			setErrorTips(data) {
				console.log('[sub-live-room] setErrorTips', data);
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
				console.warn('[sub-live-room] using hardcoded license', {
					license: this.playerLicense,
					pageInfo
				});
			},
			refreshPullUrl(payload = {}) {
				console.log('[sub-live-room] refreshPullUrl called', payload);
				const now = Date.now();
				if (this.refreshingPullUrl) {
					console.log('[sub-live-room] refreshPullUrl skipped: refreshing');
					return;
				}
				if (now - this.lastPullRefreshAt < 1500) {
					console.log('[sub-live-room] refreshPullUrl skipped: throttle');
					return;
				}
				const roomId = payload.roomId || this.roomId;
				if (!roomId) {
					console.log('[sub-live-room] refreshPullUrl skipped: empty roomId');
					return;
				}
				this.refreshingPullUrl = true;
				this.lastPullRefreshAt = now;
				this.GetLiveShowUr(roomId, {
						silent: true,
						pullType: payload.pullType || 'flv'
					})
					.then(() => {
						console.log('[sub-live-room] refreshPullUrl success', {
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
				console.log('[sub-live-room] GetLiveShowUr start', {
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
					console.log('[sub-live-room] GetLiveShowUr skip: empty targetRoomId');
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
							console.log('[sub-live-room] GetLiveShowUr success', {
								roomId: targetRoomId,
								pullType,
								hasPullUrl: !!nextPullUrl,
								pullUrl: nextPullUrl
							});
							if (nextPullUrl && nextPullUrl !== that.pullUrl) {
								console.log('[sub-live-room] pullUrl updated', {
									from: that.pullUrl,
									to: nextPullUrl
								});
								that.pullUrl = nextPullUrl;
							} else if (!that.pullUrl) {
								that.pullUrl = nextPullUrl;
							}
							return res;
						} else {
							console.log('[sub-live-room] GetLiveShowUr business error', res);
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
			},
			//查看在线观众列表
			viewWatchUser() {
				this.webSocketTask.send({
					data: JSON.stringify({
						type: 'user_list',
						"room_id": this.roomId,
					}),
				})
				this.$nextTick(() => {
					this.$refs.watchUserPop.open(this.watchUserList)
				})
			},
			// 点击查看用户信息
			userdata(data) {
				this.webSocketTask.send({
					data: JSON.stringify({
						"type": "get_user",
						"room_id": this.roomId,
						"fd": data.fd
					}),
				})
			},
			// 全员禁言/关闭禁言操作
			oneveryone(data) {
				this.webSocketTask.send({
					data: JSON.stringify({
						"type": "sanction_all",
						"room_id": this.roomId,
						"operate": data //open开启禁言   off关闭禁言
					}),
				})
			},
			// 商品的上下架
			goodinfo(data, index) {
				this.webSocketTask.send({
					data: JSON.stringify({
						"type": "goods_shelves",
						"room_id": this.roomId,
						"id": data.id,
						"is_show": data.is_show == 0 ? 1 : 0
					}),
				})
				this.$refs.goodPop.list[index].is_show = data.is_show == 0 ? 1 : 0
			},
			ontab(index) {
				if (index == 0) {
					this.onsed(1)
				} else {
					this.onsed(2)
				}
			},
			//点击头像获取观众信息
			onuser(data) {
				this.webSocketTask.send({
					data: JSON.stringify({
						"type": "get_user",
						"room_id": this.roomId,
						"fd": data.fd
					}),
				})
				this.$nextTick(() => {
					this.$refs.userInfoPop.open(this.watchUserList)
				})
			},
			//点击房间管理
			onforbiddenShow() {
				this.onsed(1)
				this.forbiddenShow = true
			},
			handleShowUpdate() {
				this.forbiddenShow = false
			},
			handleShowgood() {
				this.goodShow = false
			},
			ongoodShow() {
				this.goodShow = true
			},
			onclose() {
				this.$refs.userInfoPop.close()
			},
			onsed(type) {
				// {"type": "sanction_list","sanction_type": 1}
				this.webSocketTask.send({
					data: JSON.stringify({
						"type": "sanction_list",
						"room_id": this.roomId,
						"sanction_type": type
					}),
				})
			},
			startHeartbeat() {
				let that = this;
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
				//连接之后发送获取在线观众列表的消息
				this.webSocketTask.onOpen((res) => {
					console.log(8908098)
					this.webSocketTask.send({
						data: JSON.stringify({
							"type": "user_list",
							"room_id": this.roomId
						}),
					})
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
						case 'user_list':
							that.watchUserList = data.data //在线观众
							break;
						case 'room_info': //直播间信息
							that.likes = data.data.likes_num
							that.virtualUser = data.data.people_num
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
						case 'get_user': //观众信息
							that.userinfo = data.data;
							break;
						case 'sanction_list': //禁言,拉黑列表
							that.sanctionList = data.data;
							break;
							// case 'goods':
							// 	this.goodsList=data.data;
							// 	break;
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
							console.log('动画结束')
							that.giftsvgashow = false
						})
					})
				}, 500)
			},
			handleSanction(sanctiondata, userId, fd, operate) {
				this.webSocketTask.send({
					data: JSON.stringify({
						"type": "sanction_user",
						"room_id": this.roomId,
						"fd": fd,
						"uid": userId,
						"sanction": sanctiondata,
						"operate": operate
					}),
				})
				uni.showToast({
					title: '操作成功',
					icon: 'none'
				});
				if (sanctiondata == 1) {
					this.userinfo.sanction_speak = this.userinfo.sanction_speak == 0 ? 1 : 0
				} else {
					this.userinfo.sanction_blacklist = this.userinfo.sanction_blacklist == 0 ? 1 : 0
				}
				// {"type": "sanction_user","room_id":1,"fd": 2696,"uid":1,"sanction":1}
				// let str ={
				// 	room_id:this.roomId,
				// 	sanction_user_id:userId,
				// 	sanction:sanctiondata //处罚 1禁言 2拉黑
				// }
				// sanction(str).then(res=>{
				// 	console.log(res)
				// 	if(res.status == 200){
				// 		uni.showToast({
				// 			title: res.message,
				// 			icon: 'none'
				// 		});
				// 		if(sanctiondata==1){
				// 			this.userinfo.sanction_speak = this.userinfo.sanction_speak==0?1:0
				// 		}else{
				// 			this.userinfo.sanction_blacklist = this.userinfo.sanction_blacklist==0?1:0
				// 		}

				// 	}else{
				// 		uni.showToast({
				// 			title: res.message,
				// 			icon: 'none'
				// 		});
				// 	}
				// })
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
			console.log('[sub-live-room-player] beforeDestroy');
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
				console.warn('[sub-live-room-player] setLicenseData', {
					previousLicense: prev,
					nextLicense: newVal,
					changed
				});
				this.licenseData = newVal;
				if (!changed) return;
				const state = this.playerState || {};
				if (this.player && state.sourceUrl && !state.hasPlayed) {
					console.log('[sub-live-room-player] license updated, recreate player', {
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
				console.log('[sub-live-room-player] getData', {
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
				const log = (...args) => console.log('[sub-live-room-player]', ...args);
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
					console.error('[sub-live-room-player] detailed error', {
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
						console.error('[sub-live-room-player] native video event', {
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
					setNetworkDebugContext('sub-live-room-player');
					console.log('[sub-live-room-player] send request with license', {
						stage,
						request: req,
						license: resolvedLicense,
						pageInfo: getPageInfo()
					});
				};
				const installPlayerNetworkDebug = () => {
					if (typeof window === 'undefined') return;
					const w = window;
					setNetworkDebugContext('sub-live-room-player');
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

	.popUp {
		width: 100%;
		height: 415rpx;
		background: #ffffff;
		border-radius: 16rpx 16rpx 0 0;
		padding: 25rpx 55rpx 0 55rpx;
		position: relative;

		.popUp-close {
			position: absolute;
			top: 32rpx;
			right: 32rpx;
			width: 40rpx;
			height: 40rpx;
		}

		.pop-user {
			display: flex;
			align-items: center;

			.pop-user-image {
				margin-right: 28rpx;

				image {
					width: 108rpx;
					height: 108rpx;
					border-radius: 50%;
					border: 1px solid #efefef;
				}
			}

			.pop-user-right {
				width: 512rpx;
			}

			.pop-user-title {
				line-height: 63rpx;
				font-size: 26rpx;
				color: #2133ff;
			}

			.pop-user-text {
				line-height: 31rpx;
				font-size: 22rpx;
				color: #c6ced6;
				display: flex;
				flex-flow: row wrap;
				justify-content: space-between;

				text {
					color: #2133ff;
				}
			}
		}

		.pop-text {
			line-height: 41rpx;
			margin-top: 26rpx;
			font-size: 22rpx;
			color: #c6ced6;
		}

		.btn {
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;
			margin-top: 84rpx;

			view {
				width: 183rpx;
				height: 75rpx;
				border-radius: 12rpx;
				font-size: 25rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #ffffff;

				image {
					width: 38rpx;
					height: 38rpx;
					margin-right: 18rpx;
				}
			}

			.follow {
				background: #2133ff;
			}

			.block {
				background: #0c1332;
			}

			.forbidden {
				background: #0c1332;
			}

			.followedby {
				background: #BEC7D1;
			}

			.by {
				background-color: rgb(150, 153, 167);
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
</style>
