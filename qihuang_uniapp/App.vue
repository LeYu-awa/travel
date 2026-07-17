<script>
	import {
		checkLogin
	} from "./libs/login";
	import {
		HTTP_REQUEST_URL
	} from './config/app';
	import {
		getconfig,
		history
	} from '@/api/public.js'
	import Routine from './libs/routine.js';
	import Cache from '@/utils/cache';
	// #ifdef APP-PLUS
	var sharetrace = uni.requireNativePlugin("shoot-sharetrace")
	//  #endif
	export default {
		globalData: {
			spid: 0,
			code: 0,
			isLogin: false,
			userInfo: {},
			MyMenus: [],
			balance_func_status: 0, //余额开关
			recharge_switch: 0, // 充值开关
			store_user_min_recharge: 0, //最小充值
			yue_pay_status: 0, //余额支付开关
			alipay_open: 0, //支付宝支付开关
			routine_logo: '', //首页logo
			share_pic: '',
			site_logo: '',
			site_name: '', //名称
			fid: '', //一级分类id
			uid: '',
			hide_mer_status: 0,
			member_status: 0,
			copy_command_status: 0, //是否开启自动获取剪切板内容
			arrival_notice: 0, //是否开启到货通知
			is_phone_login: 0,
			auto_arrival: 0,
			mer_location: 0,
			statusBarHeight: 0,
			mer_location: 0,
			store_street_theme: 1,
			sys_intention_agree: '',
			copyright_status: '',
			copyright_context: '',
			copyright_image: '',
			open_update_info: 0,
			recommend_switch: 0,
			svip_switch_status: 0,
			community_reply_status: 0,
			community_reply_auth: 0,
			margin_ico_switch: 0,
			margin_ico: '',
			community_app_switch: [],
			first_avatar_switch: "",
			wechat_phone_switch: "",
			navigation: {},
			imgColor: '',
			...uni.getStorageSync('GLOBAL_DATA') || {}
		},
		onLaunch: function(option) {
			uni.hideTabBar();
			this.globalData.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
			this.globalData.uid = this.$store.state.app.uid
			let that = this;
			// #ifdef MP
			if (HTTP_REQUEST_URL == '') {
				console.error(
					"请配置根目录下的config.js文件中的 'HTTP_REQUEST_URL'\n\n请修改开发者工具中【详情】->【AppID】改为自己的Appid\n\n请前往后台【小程序】->【小程序配置】填写自己的 appId and AppSecret"
				);
				return false;
			}
			if (option.query.hasOwnProperty('scene')) {
				switch (option.scene) {
					//扫描小程序码
					case 1047:
						let val = that.$util.getUrlParams(decodeURIComponent(option.query.scene));
						that.globalData.code = val;
						that.globalData.uid = val
						break;
						//长按图片识别小程序码
					case 1048:
						that.globalData.code = option.query.scene;
						break;
						//手机相册选取小程序码
					case 1049:
						that.globalData.code = option.query.scene;
						break;
						//直接进入小程序
					case 1001:
						that.globalData.spid = option.query.scene;
						break;
				}
			}
			// #endif
			// 获取导航高度；
			uni.getSystemInfo({
				success: function(res) {
					that.globalData.navHeight = res.statusBarHeight * (750 / res.windowWidth) + 91;
				}
			});
			// #ifdef MP
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			that.globalData.navH = menuButtonInfo.top * 2 + menuButtonInfo.height / 2;
			const version = uni.getSystemInfoSync().SDKVersion
			if (Routine.compareVersion(version, '2.21.2') >= 0) {
				that.$Cache.set('MP_VERSION_ISNEW', true)
			} else {
				that.$Cache.set('MP_VERSION_ISNEW', false)
			}
			// #endif
			that.getConfigData()

			// #ifdef APP-PLUS
			// 如果需要禁止Sharetrace SDK获取剪切板内容，请在startInit前调用disableClipboard
			// sharetrace.disableClipboard();
			sharetrace.startInit();
			sharetrace.getInstallTrace(data => {
				if (data) {
					const params = {};
					data.data.paramsData.split('&').forEach(pair => {
						const [key, value] = pair.split('=');
						params[key] = decodeURIComponent(value);
					});
					console.log(params, 'app接收到的参数')
					if (params.uid) {
						that.globalData.uid = params.uid;
					}
					if (params.spid) {
						that.globalData.spid = params.spid;
					}
				}
			});
			sharetrace.registerWakeupTrace(data => {
				if (data) {
					const params = {};
					data.data.paramsData.split('&').forEach(pair => {
						const [key, value] = pair.split('=');
						params[key] = decodeURIComponent(value);
					});
					console.log(params, 'app接收到的参数')
					if (params.uid) {
						that.globalData.uid = params.uid;
					}
					if (params.spid) {
						that.globalData.spid = params.spid;
					}
					// 根据参数跳转对应页面
					// 直播详情
					if (params.roomId && params.type == 'live') {
						uni.navigateTo({
							url: `/pages/live_pusher/live_room/live_room?roomId=${params.roomId}`
						});
					}
					// 短视频详情
					if (params.id && params.type == 'appShortVideo') {
						uni.navigateTo({
							url: '/pages/short_video/appSwiper/index?id=' + params.id + '&user=' +
								user + '&uid=' + params.uid + '&tab=' + params.tab
						});
					}
					// 正价商品详情
					if (params.id && params.type == 'goods') {
						uni.navigateTo({
							url: `/pages/goods_details/index?id=${params.id}&spid=${params.uid}`
						});
					}
					// 秒杀商品详情
					if (params.id && params.type == 'skillGoods') {
						uni.navigateTo({
							url: `/pages/goods_details/index?id=${params.id}&spid=${params.uid}`
						});
					}
				}
			});
			// #endif
		},
		onShow() {
			let that = this
			that.$store.commit('SETUUID', uni.getStorageSync('uuid') || that.randomString());
			// 记录H5和公众号
			if (this.$store.state.app.token) {
				// #ifdef H5
				this.reportVisit();
				//#endif
			};
			// #ifndef H5
			setTimeout(() => {
				if (that.globalData.copy_command_status == 1) {
					uni.getClipboardData({
						success: function(res) {
							if (/^(\/@[1-9]{1}).*\*\//.test(res.data)) {
								that.$store.commit("PARSE_PWD", res.data)
							}
						},
						fail: function(res) {
							// 内容获取失败
						}
					})
				}
			}, 1500)
			// #endif	
		},
		methods: {
			randomString(len) {
				// 　　len = len || 32;
				// 　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
				// 　　var maxPos = $chars.length;
				// 　　var pwd = '';
				// 　　for (var i = 0; i < len; i++) {
				// 　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
				// 　　}
				let pwd = (Date.now()).toString()
				uni.setStorageSync('uuid', pwd)
				return pwd;
			},
			setOpenShare: function(data) {
				let that = this;
				let href = location.href;
				href = href.indexOf("?") === -1 ? href + "?spid=" + this.globalData.uid : href + "&spid=" + this
					.globalData.uid;
				if (that.$wechat.isWeixin()) {
					let configAppMessage = {
						desc: data.share_info,
						title: data.share_title,
						link: href,
						imgUrl: data.share_pic
					};
					that.$wechat.wechatEvevt(["updateAppMessageShareData", "updateTimelineShareData"],
						configAppMessage);
				}
			},
			// 获取配置
			getConfigData() {
				getconfig().then(res => {
					uni.$emit('update', res.data)
					this.$store.commit('GLOBAL_DATA', res.data);
					this.globalData.balance_func_status = res.data.balance_func_status
					this.globalData.recharge_switch = res.data.recharge_switch
					this.globalData.routine_logo = res.data.routine_logo
					this.globalData.share_pic = res.data.share_pic
					this.globalData.community_reply_status = res.data.community_reply_status
					this.globalData.site_logo = res.data.site_logo
					this.globalData.login_logo = res.data.login_logo
					this.globalData.site_name = res.data.site_name
					this.globalData.store_user_min_recharge = res.data.store_user_min_recharge
					this.globalData.yue_pay_status = res.data.yue_pay_status
					this.globalData.sys_intention_agree = res.data.sys_intention_agree
					this.globalData.mer_intention_open = res.data.mer_intention_open
					this.globalData.alipay_open = res.data.alipay_open
					this.globalData.hide_mer_status = res.data.hide_mer_status
					this.globalData.mer_location = res.data.mer_location
					this.globalData.procudt_increase_status = res.data.procudt_increase_status
					this.globalData.auto_arrival = res.data.sys_extension_type
					this.globalData.member_status = res.data.member_status
					this.globalData.copy_command_status = res.data.copy_command_status
					this.globalData.is_phone_login = res.data.is_phone_login
					this.globalData.mer_location = res.data.mer_location
					this.globalData.store_street_theme = res.data.store_street_theme
					this.globalData.copyright_status = res.data.copyright_status
					this.globalData.copyright_image = res.data.copyright_image
					this.globalData.copyright_context = res.data.copyright_context
					this.globalData.open_update_info = res.data.open_update_info
					this.globalData.recommend_switch = res.data.recommend_switch
					this.globalData.svip_switch_status = res.data.svip_switch_status
					this.globalData.navigation = res.data.navigation
					this.globalData.community_app_switch = res.data.community_app_switch
					this.globalData.community_reply_auth = res.data.community_reply_auth
					this.globalData.margin_ico_switch = res.data.margin_ico_switch
					this.globalData.first_avatar_switch = res.data.first_avatar_switch
					this.globalData.wechat_phone_switch = res.data.wechat_phone_switch
					this.$Cache.set('BIND_PHONE', res.data.wechat_phone_switch) //是否开启强制绑定手机号
					this.globalData.margin_ico = res.data.margin_ico
					this.globalData.community_auth = res.data.community_auth
					this.$Cache.set('WECHAT_APPID', res.data.wechat_config_appid)
					this.$store.commit("VIEW_COLOR", res.data.global_theme.theme)
					this.$store.commit("KEY_COLOR", '_' + res.data.global_theme.type)
					try {
						uni.setStorageSync('SUBSCRIBE_MESSAGE', res.data.tempid);
					} catch (e) {
						// error
					}
					// #ifdef H5
					this.setOpenShare(res.data);
					// #endif
				}).catch(err => {});
			},
			reportVisit() {
				// 本地 H5 开发阶段跳过浏览上报，避免接口差异导致 404 干扰调试
				if (process.env.NODE_ENV === 'development') return;
				history({
					page: location.pathname + location.search,
				}).catch(() => {});
			}
		},
		onHide: function() {
			//console.log('App Hide')
		},
		watch: {
			// 记录H5和公众号
			$route(n) {
				if (this.$store.state.app.token) {
					// #ifdef H5
					this.reportVisit();
					// #endif
				}
			},
		}
	}
</script>

<style lang="scss">
	/* #ifndef APP-PLUS-NVUE || APP-NVUE */
	// @import "@/plugin/aliplayer/aliplayer-min.css";
	// @import "aliyun-aliplayer/build/skins/default/aliplayer-min.css";
	/* #ifdef H5 */
	// @import "@/static/css/aliplayer-min.css";
	/* #endif */
	// @import url('https://at.alicdn.com/t/c/font_4948635_wi69kijbbuj.css');
	@import "@/plugin/animate/animate.min.css";
	@import 'static/css/base.css';
	@import 'static/iconfont/iconfont.css';
	@import 'static/iconfont/newIconfont.css';
	@import 'static/css/style.scss';


	::-webkit-scrollbar {
		display: none;
	}

	page {
		--color: #55311B;
		--main-color: #C1A06B;
		--main-bg-color: #FEF2DA;
		--main-tag-bg-color: #FFF8E5;
		--tab-select-color: #fcb51a;
		--input-bg-color: #F4F3EF;
		// background: linear-gradient(180deg, rgba(247, 248, 250, 0.3), #f7f8fa 100%);
	}

	uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
		display: none
	}

	.bg-color-red {
		background-color: #e93323 !important;
	}

	.syspadding {
		padding-top: var(--status-bar-height);
	}

	.flex {
		display: flex;
	}

	.uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		visibility: hidden;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	::-moz-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.empty-txt {
		line-height: 100rpx;
		font-size: 22rpx;
		color: #999;
		text-align: center;
	}

	.product-con .conter img {
		display: block;
	}

	.open-location {
		height: 100vh;
	}

	uni-tabbar {
		bottom: 0;
	}

	/*#endif*/
	/* 通用基础样式（同时作用于 H5/APP 和微信小程序） */
	.circular .uni-swiper-dot,
	.circular .wx-swiper-dot {
		width: 10rpx;
		height: 10rpx;
		background: rgba(0, 0, 0, .4);
	}

	.circular .uni-swiper-dot-active,
	.circular .wx-swiper-dot-active {
		background: #fff;
	}

	.square .uni-swiper-dot,
	.square .wx-swiper-dot {
		width: 20rpx;
		height: 5rpx;
		border-radius: 3rpx;
		background: rgba(0, 0, 0, .4);
	}

	.square .uni-swiper-dot-active,
	.square .wx-swiper-dot-active {
		background: #fff;
	}

	.nodoc .uni-swiper-dot,
	.nodoc .wx-swiper-dot {
		visibility: hidden;
	}

	/* 定位调整 */
	.swiper.dot0 .uni-swiper-dots,
	.swiper.dot0 .wx-swiper-dots {
		left: 130rpx;
	}

	.swiper.dot1 .uni-swiper-dots,
	.swiper.dot1 .wx-swiper-dots {
		left: 50%;
	}

	.swiper.dot2 .uni-swiper-dots,
	.swiper.dot2 .wx-swiper-dots {
		right: 130rpx;
		left: 0;
	}


	::-webkit-scrollbar {
		display: none !important;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		color: transparent;
		background: transparent;
	}

	/* 确保scroll-view组件也隐藏滚动条 */
	scroll-view::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		color: transparent;
		background: transparent;
	}

	/* 为页面添加隐藏滚动条样式 */
	.comment-list::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		color: transparent;
		background: transparent;
	}
</style>
