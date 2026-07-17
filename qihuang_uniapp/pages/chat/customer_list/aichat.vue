<template>
<view class="container">
	<block v-if="isload">
		<view class="message-list">
			<block v-for="(item, index) in datalist" :key="index">
				<view class="message-time" v-if="item.formatTime">
					{{ item.formatTime }}
					<text v-if="item.timeCost" style="font-size:20rpx;margin-left:10rpx;color:#999;">(耗时:{{ item.timeCost }}s)</text>
				</view>
				<view class="message-item" :style="{ paddingBottom: index === datalist.length - 1 ? '100rpx' : '' }" v-if="item.isreply === 1">
					<image class="message-avatar" mode="aspectFill" :src="item.uheadimg"></image>
					<view class="message-text-left">
						<view class="arrow-box arrow-left">
							<image class="arrow-icon" :src="arrowWhiteIcon"></image>
						</view>
						<view class="message-text">
							<block v-if="item.msgtype === 'text'">
								<parse :content="item.content" />

								<view class="tts-icon" @tap="playVoice(item, index)">
									{{ playingIndex === index ? '停止播报' : '语音播报' }}
								</view>

								<view class="suggested-box" v-if="item.suggested && item.suggested.length > 0">
									<view class="suggested-chip" v-for="(q, qidx) in item.suggested" :key="qidx" @tap="sendText(q)">
										{{ q }}
									</view>
								</view>
							</block>
							<block v-if="item.msgtype === 'product_list'">
								<view style="margin-bottom:10rpx;font-weight:bold;">为您找到以下相关产品：</view>
								<view
									v-for="(prod, pIndex) in item.content"
									:key="pIndex"
									style="margin-top:20rpx;padding:20rpx;background:#f8f8f8;border-radius:10rpx;"
									@tap="gotoProduct(prod.id)"
								>
									<view style="font-weight:bold;color:#007aff;font-size:30rpx;">{{ prod.name }}</view>
									<view style="font-size:24rpx;color:#666;margin-top:10rpx;" v-if="prod.sellpoint">{{ prod.sellpoint }}</view>
								</view>
							</block>
						</view>
					</view>
				</view>
				<view
					class="message-item"
					:style="{ paddingBottom: index === datalist.length - 1 ? '100rpx' : '', justifyContent: 'flex-end' }"
					v-else
				>
					<view class="message-text-right">
						<view class="arrow-box arrow-right">
							<image class="arrow-icon" :src="arrowGreenIcon"></image>
						</view>
						<view class="message-text">
							<parse :content="item.content" />
						</view>
					</view>
					<image class="message-avatar" mode="aspectFill" :src="item.headimg"></image>
				</view>
			</block>
		</view>

		<view class="recording-overlay" v-if="recordingStatus">
			<view class="recording-indicator">
				<view class="recording-dot"></view>
				<text class="recording-text">{{ recordingStatus }}</text>
			</view>
		</view>

		<view class="input-box notabbarbot" id="input-box">
			<scroll-view scroll-x="true" class="hot-scroll" v-if="hotQuestions.length > 0 && showHot">
				<view class="hot-item" v-for="(hq, hqIndex) in hotQuestions" :key="hqIndex" @tap="sendText(hq)">
					{{ hq }}
				</view>
			</scroll-view>

			<view class="pending-image-box" v-if="pendingImageUrl">
				<image class="pending-image" :src="pendingImageUrl" mode="aspectFill"></image>
				<view class="pending-image-close" @tap="clearPendingImage">×</view>
				<text class="pending-image-hint">请输入描述后发送</text>
			</view>

			<view class="input-form">
				<view class="icon-btn" @tap="toggleMenu">
					<view class="css-add-icon">+</view>
				</view>

				<view class="icon-btn" @touchstart="startRecord" @touchend="stopRecord">
					<image class="icon-img" :class="{ recording: recording }" :src="voiceIcon"></image>
				</view>

				<input
					@confirm="sendMessage"
					@focus="onInputFocus"
					@input="messageChange"
					class="input input-field"
					:confirmHold="true"
					confirmType="send"
					cursor-spacing="20"
					type="text"
					:value="message"
					maxlength="-1"
					placeholder="有问题尽管问我..."
				/>

				<view class="icon-btn" @tap="chooseImage">
					<image class="icon-img" :src="picIcon"></image>
				</view>

				<button @tap="sendMessage" class="send-button-active" v-if="trimMessage" style="background:#FF9900;color:#fff;margin-left:10rpx;">
					发送
				</button>
			</view>

			<view class="popup-mask" v-if="showMenu" @tap="toggleMenu"></view>

			<view class="popup-menu" v-if="showMenu">
				<view class="menu-item" @tap="handleMenu('plan')">
					<view class="menu-icon">行程</view>
					<text>行程规划</text>
				</view>
				<view class="menu-item" @tap="handleMenu('hotel')">
					<view class="menu-icon">酒店</view>
					<text>酒店查询</text>
				</view>
				<view class="menu-item" @tap="handleMenu('food')">
					<view class="menu-icon">美食</view>
					<text>美食查询</text>
				</view>
				<view class="menu-item" @tap="handleMenu('photo')">
					<view class="menu-icon">打卡</view>
					<text>景点打卡</text>
				</view>
				<view class="menu-item" @tap="handleMenu('appoint')">
					<view class="menu-icon">预约</view>
					<text>方案预约</text>
				</view>
			</view>
		</view>
	</block>
	<loading v-if="loading"></loading>
</view>
</template>

<script>
import { aiInit, aiChat, aiProduct, aiTts } from "@/api/user";
import { HTTP_REQUEST_URL, TOKENNAME } from "@/config/app";
import store from "@/store";
import loading from "@/components/Loading/loading.vue";

export default {
	components: {
		loading
	},
	data() {
		return {
			opt: {},
			loading: false,
			datalist: [],
			message: "",
			isload: true,
			trimMessage: "",
			userHeadImg: "/static/images/aichat/touxiang.png",
			aiHeadImg: "/static/images/aichat/aihead.png",
			voiceIcon: "/static/images/aichat/voice.png",
			picIcon: "/static/images/aichat/msg-pic.png",
			arrowWhiteIcon: "/static/images/aichat/arrow-white.png",
			arrowGreenIcon: "/static/images/aichat/arrow-green.png",
			hotQuestions: [],
			photoguide: "",
			showMenu: false,
			showHot: true,
			recording: false,
			recordingStatus: "",
			recordingTime: 0,
			recordingTimer: null,
			recorderManager: null,
			innerAudioContext: null,
			playingIndex: -1,
			pendingImageUrl: "",
			startTime: 0
		};
	},
	onLoad(opt) {
		this.opt = opt || {};
		this.addAiMessage("您好，我是您的AI旅行助手，请问有什么可以帮您？", "text");
		this.initData();
		this.initRecorder();

		this.innerAudioContext = uni.createInnerAudioContext();
		this.innerAudioContext.onEnded(() => {
			this.playingIndex = -1;
		});
		this.innerAudioContext.onError(() => {
			this.playingIndex = -1;
		});
		this.innerAudioContext.onStop(() => {
			this.playingIndex = -1;
		});
	},
	methods: {
		initData() {
			aiInit()
				.then((res) => {
					if (res && res.status === 1) {
						this.hotQuestions = res.result ? res.result.hotQuestions || [] : [];
						this.photoguide = res.result ? res.result.photoguide || "" : "";
						
						if (res.result && res.result.history && res.result.history.length > 0) {
							const historyList = res.result.history.map(item => {
								if (item.isreply === 1) {
									item.uheadimg = this.aiHeadImg;
								} else {
									item.headimg = this.userHeadImg;
								}
								return item;
							});
							this.datalist = this.datalist.concat(historyList);
							this.scrollToBottom();
						}
					}
				})
				.catch(() => {});
		},
		toggleMenu() {
			this.showMenu = !this.showMenu;
			this.showHot = !this.showMenu;
		},
		handleMenu(type) {
			this.showMenu = false;
			this.showHot = true;
			if (type === "plan") {
				this.sendText("请帮我规划一次旅行");
			} else if (type === "hotel") {
				this.sendText("推荐一些性价比高的酒店");
			} else if (type === "food") {
				this.sendText("推荐一些当地特色美食");
			} else if (type === "photo") {
				if (this.photoguide) this.addAiMessage(this.photoguide, "text");
				else this.sendText("景点打卡攻略");
			} else if (type === "appoint") {
				this.sendText("我想预约一个旅行方案，请告诉我预约方式。");
			}
		},
		sendText(txt) {
			this.message = txt;
			this.trimMessage = txt;
			this.sendMessage();
		},
		initRecorder() {
			// #ifdef MP-WEIXIN
			this.recorderManager = wx.getRecorderManager();
			// #endif
			// #ifndef MP-WEIXIN
			this.recorderManager = uni.getRecorderManager();
			// #endif

			this.recorderManager.onStart(() => {
				this.recordingTime = 0;
				this.recordingStatus = "正在录音 0:00";
				this.recordingTimer = setInterval(() => {
					this.recordingTime++;
					const mins = Math.floor(this.recordingTime / 60);
					const secs = this.recordingTime % 60;
					const remaining = Math.max(60 - this.recordingTime, 0);
					this.recordingStatus = "正在录音 " + mins + ":" + (secs < 10 ? "0" : "") + secs + " (剩余" + remaining + "秒)";
					if (this.recordingTime >= 60 && this.recordingTimer) {
						clearInterval(this.recordingTimer);
						this.recordingTimer = null;
					}
				}, 1000);
			});

			this.recorderManager.onError((res) => {
				if (this.recordingTimer) {
					clearInterval(this.recordingTimer);
					this.recordingTimer = null;
				}
				this.recording = false;
				this.recordingStatus = "";
				uni.showToast({ title: "录音错误:" + (res.errMsg || "未知错误"), icon: "none" });
			});

			this.recorderManager.onStop((res) => {
				if (res.tempFilePath) this.uploadVoice(res.tempFilePath);
			});
		},
		startRecord() {
			// #ifdef MP-WEIXIN
			wx.getSetting({
				success: (res) => {
					const recordAuth = res.authSetting["scope.record"];
					if (recordAuth === undefined) {
						this.recordingStatus = "请求权限中...";
						wx.authorize({
							scope: "scope.record",
							success: () => this.doStartRecord(),
							fail: () => {
								this.recordingStatus = "";
								this.recording = false;
								uni.showToast({ title: "请授权录音权限", icon: "none" });
							}
						});
					} else if (recordAuth === true) {
						this.doStartRecord();
					} else {
						this.recordingStatus = "";
						this.recording = false;
						uni.showModal({
							title: "需要录音权限",
							content: "请在设置中开启录音权限",
							success: (modalRes) => {
								if (modalRes.confirm) wx.openSetting();
							}
						});
					}
				},
				fail: () => {
					this.recordingStatus = "";
					this.recording = false;
					uni.showToast({ title: "获取权限状态失败", icon: "none" });
				}
			});
			// #endif
			// #ifndef MP-WEIXIN
			this.doStartRecord();
			// #endif
		},
		doStartRecord() {
			this.startTime = new Date().getTime();
			if (!this.recorderManager) this.initRecorder();
			this.recording = true;

			let audioFormat = "mp3";
			// #ifdef MP-WEIXIN
			const sysInfo = uni.getSystemInfoSync();
			if (sysInfo.platform === "devtools") audioFormat = "wav";
			// #endif

			this.recorderManager.start({
				duration: 60000,
				sampleRate: 16000,
				numberOfChannels: 1,
				encodeBitRate: audioFormat === "mp3" ? 48000 : 96000,
				format: audioFormat
			});
		},
		stopRecord() {
			const now = new Date().getTime();
			const duration = now - (this.startTime || 0);

			if (this.recordingTimer) {
				clearInterval(this.recordingTimer);
				this.recordingTimer = null;
			}

			if (duration < 600) {
				setTimeout(() => {
					this.recording = false;
					this.recordingStatus = "";
					if (this.recorderManager) this.recorderManager.stop();
				}, 600 - duration);
			} else {
				this.recording = false;
				this.recordingStatus = "";
				if (this.recorderManager) this.recorderManager.stop();
			}
		},
		uploadVoice(path) {
			this.loading = true;
			const token = store.state.app.token || uni.getStorageSync("token") || "";
			uni.uploadFile({
				url: HTTP_REQUEST_URL + "/api/user/ai/voice",
				filePath: path,
				name: "audio",
				header: token ? { [TOKENNAME]: "Bearer " + token } : {},
				success: (uploadFileRes) => {
					this.loading = false;
					let res = {};
					try {
						res = JSON.parse(uploadFileRes.data || "{}");
					} catch (e) {}
					if (res.status === 1) {
						if (res.text) this.addUserMessage(res.text);
						if (res.result) this.addAiMessage(res.result, "text", res.time_cost);
						if (res.products && res.products.length > 0) this.addAiMessage(res.products, "product_list");
						if (res.suggested_questions && this.datalist.length > 0) {
							this.$set(this.datalist[this.datalist.length - 1], "suggested", res.suggested_questions);
						}
					} else {
						uni.showToast({ title: res.msg || "识别失败", icon: "none" });
					}
				},
				fail: () => {
					this.loading = false;
					uni.showToast({ title: "网络错误", icon: "none" });
				}
			});
		},
		playVoice(item, index) {
			if (this.playingIndex === index) {
				this.innerAudioContext.stop();
				this.playingIndex = -1;
				return;
			}
			this.innerAudioContext.stop();
			const text = (item.content || "").replace(/<[^>]+>/g, "");
			uni.showLoading({ title: "生成中..." });
			aiTts({ text })
				.then((res) => {
					uni.hideLoading();
					if (res.status === 1 && res.url) {
						this.innerAudioContext.src = res.url;
						this.innerAudioContext.play();
						this.playingIndex = index;
					} else {
						uni.showToast({ title: "语音合成失败", icon: "none" });
					}
				})
				.catch(() => {
					uni.hideLoading();
					uni.showToast({ title: "语音合成失败", icon: "none" });
				});
		},
		chooseImage() {
			this.$util.uploadImageOne("upload/image", (res) => {
				if (res && res.data && res.data.path) {
					this.pendingImageUrl = res.data.path;
					uni.showToast({ title: "图片已添加，请输入描述", icon: "none" });
				}
			});
		},
		clearPendingImage() {
			this.pendingImageUrl = "";
		},
		sendMessage(msgOverride, imgUrl) {
			let actualMsg = "";
			if (typeof msgOverride === "string") actualMsg = msgOverride;
			else actualMsg = this.message;
			actualMsg = actualMsg ? actualMsg.trim() : "";

			const actualImg = typeof imgUrl === "string" ? imgUrl : this.pendingImageUrl;
			if (!actualMsg) {
				if (actualImg) uni.showToast({ title: "请输入图片描述", icon: "none" });
				return;
			}

			let displayContent = actualMsg;
			if (actualImg) {
				displayContent = '<img src="' + actualImg + '" style="max-width:300rpx;max-height:300rpx;display:block;margin-bottom:10rpx;"/>' + actualMsg;
			}
			this.addUserMessage(displayContent);

			if (!msgOverride || typeof msgOverride !== "string") {
				this.message = "";
				this.trimMessage = "";
			}
			this.pendingImageUrl = "";
			this.loading = true;

			aiChat({ userprompt: actualMsg, image: actualImg })
				.then((res) => {
					this.loading = false;
					if (res.status === 1 && res.result) {
						this.addAiMessage(res.result, "text", res.time_cost);
						if (res.suggested_questions && this.datalist.length > 0) {
							this.$set(this.datalist[this.datalist.length - 1], "suggested", res.suggested_questions);
						}
					} else {
						uni.showToast({ title: res.msg || "回复失败", icon: "none" });
					}
				})
				.catch(() => {
					this.loading = false;
					uni.showToast({ title: "网络错误", icon: "none" });
				});

			if (actualMsg && !actualImg) {
				aiProduct({ userprompt: actualMsg })
					.then((res) => {
						if (res.status === 1 && res.products && res.products.length > 0) {
							this.addAiMessage(res.products, "product_list", res.time_cost);
						}
					})
					.catch(() => {});
			}
		},
		addUserMessage(content) {
			const safeContent = typeof content === "string" ? content : String(content || "");
			this.datalist.push({
				isreply: 0,
				headimg: this.userHeadImg,
				content: safeContent,
				msgtype: "text",
				formatTime: this.getCurrentTime()
			});
			this.scrollToBottom();
		},
		addAiMessage(content, type, timeCost) {
			let safeContent = content;
			if ((!type || type === "text") && typeof content !== "string") {
				if (content === null || content === undefined) safeContent = "";
				else if (typeof content === "object") safeContent = JSON.stringify(content);
				else safeContent = String(content);
			}
			this.datalist.push({
				isreply: 1,
				uheadimg: this.aiHeadImg,
				content: safeContent,
				msgtype: type || "text",
				formatTime: this.getCurrentTime(),
				timeCost: timeCost || ""
			});
			this.scrollToBottom();
		},
		getCurrentTime() {
			const date = new Date();
			const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
			const minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
			return hour + ":" + minute;
		},
		scrollToBottom() {
			setTimeout(() => {
				uni.pageScrollTo({
					scrollTop: 99999,
					duration: 200
				});
			}, 100);
		},
		messageChange(e) {
			this.message = e.detail.value;
			this.trimMessage = e.detail.value.trim();
		},
		onInputFocus() {},
		gotoProduct(id) {
			uni.navigateTo({
				url: "/pages/goods_details/index?id=" + id
			});
		}
	}
};
</script>

<style>
.container { display: block; min-height: 100%; box-sizing: border-box; background: #f4f4f4; color: #222; }
.message-list { padding-left: 25rpx; padding-right: 25rpx; padding-bottom: 220rpx; }
.message-item { display:flex; padding:20rpx 0; }
.message-time { width:100%; padding-top:20rpx; padding-bottom:10rpx; text-align:center; display:inline-block; color:#999; font-size:24rpx; }
.message-avatar { width:90rpx; height:90rpx; border-radius:50%; }
.message-text { max-width:525rpx; min-height:64rpx; line-height:50rpx; font-size:30rpx; padding:20rpx 30rpx; word-break:break-all; }
.message-text-left { position:relative; background-color:#fff; margin-left:20rpx; border-radius:12rpx; border:1rpx solid #ddd; }
.message-text-right { position:relative; background-color:#9AE966; margin-right:20rpx; border-radius:12rpx; border:1rpx solid #6DBF58; }
.arrow-box { position:absolute; width:16rpx; height:24rpx; top:35rpx; }
.arrow-left { left:-14rpx; }
.arrow-right { right:-14rpx; }
.arrow-icon { display:block; width:100%; height:100%; }

.input-box { position:fixed; z-index:100; bottom:0; width:96%; min-height:100rpx; padding:15rpx 2%; background-color:#fff; box-sizing:content-box; }
.input-form { width:100%; height:100%; display:flex; flex-direction:row; align-items:center; }
.input { flex:1; height:66rpx; border:1rpx solid #ddd; padding:5rpx 10rpx; background-color:#fff; font-size:30rpx; border-radius:12rpx; }
.send-button-active { width:100rpx; height:62rpx; margin-left:20rpx; border-radius:8rpx; text-align:center; line-height:62rpx; font-size:28rpx; border:1rpx solid #ddd; color:#fff; }

.input-field { flex:1; background:#f5f5f5; border-radius:40rpx; padding:15rpx 30rpx; margin:0 20rpx; font-size:28rpx; height:70rpx; box-sizing:border-box; }
.icon-btn { width:60rpx; height:60rpx; display:flex; align-items:center; justify-content:center; }
.icon-text { font-size:22rpx; color:#666; }
.icon-img { width:50rpx; height:50rpx; will-change:transform; }
.recording { animation:pulse 1.5s infinite ease-in-out; opacity:0.7; }
@keyframes pulse { 0% { transform:scale(1); } 50% { transform:scale(1.2); } 100% { transform:scale(1); } }

.hot-scroll { width:100%; white-space:nowrap; padding:10rpx 0; margin-bottom:10rpx; border-bottom:1rpx solid #eee; }
.hot-item { display:inline-block; padding:10rpx 24rpx; background:#f0f8ff; color:#409eff; border-radius:30rpx; font-size:24rpx; margin-right:20rpx; }

.popup-menu { position:absolute; bottom:120rpx; left:20rpx; width:260rpx; background:#fff; box-shadow:0 0 20rpx rgba(0,0,0,0.1); border-radius:20rpx; padding:10rpx 0; z-index:200; }
.popup-mask { position:fixed; top:0; left:0; width:100%; height:100%; z-index:199; background:transparent; }
.menu-item { display:flex; align-items:center; padding:20rpx 30rpx; border-bottom:1rpx solid #f5f5f5; }
.menu-item:last-child { border-bottom:none; }
.menu-icon { margin-right:20rpx; font-size:24rpx; color:#666; }

.tts-icon { display:inline-block; color:#409eff; font-size:24rpx; margin-top:10rpx; padding:4rpx 10rpx; background:#eef; border-radius:8rpx; }
.suggested-box { margin-top:16rpx; }
.suggested-chip { display:block; background:#fff; border:1rpx solid #409eff; color:#409eff; border-radius:30rpx; padding:10rpx 20rpx; margin-bottom:10rpx; font-size:24rpx; text-align:center; }
.css-add-icon { font-size:50rpx; color:#555; font-weight:300; line-height:50rpx; text-align:center; border:2rpx solid #999; border-radius:50%; width:44rpx; height:44rpx; line-height:40rpx; }

.pending-image-box { position:relative; display:flex; align-items:center; padding:10rpx 20rpx; background:#f0f0f0; border-radius:10rpx; margin-bottom:10rpx; }
.pending-image { width:100rpx; height:100rpx; border-radius:8rpx; margin-right:20rpx; }
.pending-image-close { position:absolute; top:0; left:90rpx; width:36rpx; height:36rpx; background:rgba(0,0,0,0.6); color:#fff; border-radius:50%; text-align:center; line-height:36rpx; font-size:24rpx; }
.pending-image-hint { color:#666; font-size:24rpx; }

.recording-overlay { position:fixed; top:40%; left:50%; transform:translate(-50%, -50%); z-index:999; background:rgba(0,0,0,0.7); border-radius:20rpx; padding:40rpx 60rpx; }
.recording-indicator { display:flex; flex-direction:column; align-items:center; }
.recording-dot { width:30rpx; height:30rpx; background:#FF5A5F; border-radius:50%; margin-bottom:20rpx; animation:blink 1s infinite; }
@keyframes blink { 0%, 100% { opacity:1; } 50% { opacity:0.3; } }
.recording-text { color:#fff; font-size:28rpx; }
</style>
