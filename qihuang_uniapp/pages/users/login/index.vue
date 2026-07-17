<template>
	<div :style="viewColor">
		<div class="register_main"
			:style="{ 'background-image': formItem == 1 ? `url(${domain}/static/images/logo_bgl.png)` : `url(${domain}/static/images/logo_bgh.png)`}">
			<view class="system-height" :style="{ height: statusBarHeight }"></view>
			<!-- #ifdef APP-PLUS -->
			<view class="title-bar" style="height: 43px;">
				<view class="icon" @click="home">
					<text class="iconfont icon-shouye2"></text>
				</view>
				商城登录
			</view>
			<!-- #endif -->
			<div class="register absolute" v-if="!auth_token">
				<div class="whiteBg" v-if="formItem === 1">
					<view class="login_title">
						<view class="title_h">{{current==0 ? "账号登录" : "手机号登录"}}</view>
						<view class="title_info" v-if="current==1">首次登录会自动注册</view>
						<view class="title_info" v-else>没有账号？<text @click="formItem = 2">立即注册</text></text></view>
					</view>
					<!--账号登录-->
					<div class="list" :hidden="current !== 0">
						<form @submit.prevent="submit">
							<div class="item">
								<input type="text" placeholder="请输入手机号或账号" placeholder-class="placeholder"
									v-model="account" required />
							</div>
							<div class="item">
								<input type="password" placeholder="填写登录密码" placeholder-class="placeholder"
									v-model="password" required />
								<navigator class="forgetPwd" hover-class="none"
									url="/pages/users/retrievePassword/index">
									忘记密码
								</navigator>
							</div>
						</form>
					</div>
					<!--手机号验证码登录-->
					<div class="list" :hidden="current !== 1">
						<div class="item">
							<input type="text" placeholder="输入手机号码" placeholder-class="placeholder" v-model="account" />
						</div>
						<div class="item">
							<input type="text" placeholder="填写验证码" placeholder-class="placeholder" class="codeIput"
								v-model="captcha" />
							<button class="code" :disabled="disabled" :class="disabled === true ? 'on' : ''"
								@click="handleVerify">
								{{ text }}
							</button>
						</div>
						<div class="item">
							<input type="text" placeholder="填写您的邀请码" :disabled="spid ? true: false"
								placeholder-class="placeholder" v-model="spread" />
						</div>
					</div>
					<!--手机号验证码登录-->
					<div class="logon" @click="loginMobile" v-if="current ===1">立即登录</div>
					<div class="logon" @click="submit" v-else>登录</div>
					<div class="tip">
						<text v-if="current==0" @click="current = 1">手机号登录</text>
						<text v-else @click="current = 0">账号登录</text>
					</div>
					<div class="protocol acea-row row-between-wrapper">
						<checkbox-group class="checkgroup" @change='isAgree=!isAgree'>
							<checkbox class="checkbox" :checked="isAgree ? true : false" />
							<text class="protocol_text">我已同意<text @click="userAgree"
									class="font_pro">《用户协议》</text>与<text @click="userPrivacyAgree"
									class="font_pro">《隐私政策》</text></text>
						</checkbox-group>
					</div>
					<!-- #ifdef APP-PLUS -->
					<!-- <view class="appLogin" v-if="wechat_phone_switch == 1 || appleShow">
						<view class="hds">
							<span class="line"></span>
							<p>其他方式登录</p>
							<span class="line"></span>
						</view>
						<view class="btn-wrapper">
							<view class="btn wx" v-if="wechat_phone_switch == 1" @click="wxLogin">
								<span class="iconfont icon-s-weixindenglu1"></span>
							</view>
							<view class="btn wx btn-apple" @click="appleLogin" v-if="appleShow">
								<span class="iconfont icon-s-pingguo"></span>
							</view>
						</view>
					</view> -->
					<!-- #endif -->
				</div>
				<div class="whiteBg" v-else>
					<view class="login_title">
						<view class="title_h">注册账号</view>
					</view>
					<div class="list">
						<div class="item">
							<input type="text" placeholder="请输入手机号" placeholder-class="placeholder" v-model="account" />
						</div>
						<div class="item">
							<input type="text" placeholder="填写验证码" placeholder-class="placeholder" class="codeIput"
								v-model="captcha" />
							<button class="code" :disabled="disabled" :class="disabled === true ? 'on' : ''"
								@click="handleVerify">
								{{ text }}
							</button>
						</div>
						<div class="item">
							<input type="password" placeholder="填写您的登录密码" placeholder-class="placeholder"
								v-model="password" />
						</div>
						<div class="item">
							<input type="text" placeholder="填写您的邀请码" :disabled="spid ? true: false"
								placeholder-class="placeholder" v-model="spread" />
						</div>
						<div class="item" v-if="isShowCode">
							<input type="text" placeholder="填写验证码" placeholder-class="placeholder" class="codeIput"
								v-model="codeVal" />
							<div class="code" @click="getcaptcha">
								<image class="code-img" style="width: 100%;height: 100%;" :src="codeUrl" />
							</div>
						</div>
					</div>
					<div class="tip">
						已有账号?
						<text @click="formItem = 1">立即登录</text>
					</div>
					<div class="logon" @click="register">注册</div>
					<div class="protocol acea-row row-between-wrapper">
						<checkbox-group class="checkgroup" @change='isAgree=!isAgree'>
							<checkbox class="checkbox" :checked="isAgree ? true : false" />
							<text class="protocol_text">我已同意<text @click="userAgree"
									class="font_pro">《用户协议》</text>与<text @click="userPrivacyAgree"
									class="font_pro">《隐私政策》</text></text>
						</checkbox-group>
					</div>
					<!-- #ifdef APP-PLUS -->
					<!-- <view class="appLogin" v-if="!appLoginStatus && !appleLoginStatus">
						<view class="hds">
							<span class="line"></span>
							<p>其他方式登录</p>
							<span class="line"></span>
						</view>
						<view class="btn-wrapper">
							<view class="btn wx" @click="wxLogin">
								<span class="iconfont icon-s-weixindenglu1"></span>
							</view>
							<view class="btn wx btn-apple" @click="appleLogin" v-if="appleShow">
								<span class="iconfont icon-s-pingguo"></span>
							</view>
						</view>
					</view> -->
					<!-- #endif -->
				</div>
				<div class="bottom"></div>
			</div>
			<form report-submit='true' v-if="auth_token">
				<view class="register">
					<view class="whiteBg">
						<view class="login_title">
							<view class="title_h">绑定手机号</view>
						</view>
						<view class="list">
							<view class="item">
								<input type='number' placeholder='填写手机号码' placeholder-class='placeholder'
									v-model="account"></input>
							</view>
							<view class="item">
								<input type='number' placeholder='填写验证码' placeholder-class='placeholder'
									class="codeIput" v-model="captcha"></input>
								<button class="code" :class="disabled === true ? 'on' : ''" :disabled='disabled'
									@click="handleVerify">
									{{ text }}
								</button>
							</view>
							<view class="item">
								<input type='password' placeholder='填写登录密码' placeholder-class='placeholder'
									v-model="password"></input>
							</view>
							<view class="protocol acea-row">
								<checkbox-group class="checkgroup" @change='isAgree=!isAgree'>
									<checkbox class="checkbox" :checked="isAgree ? true : false" />
									<text class="protocol_text">您已同意<text @click="userAgree"
											class="font_pro">《用户协议》</text>与<text @click="userPrivacyAgree"
											class="font_pro">《隐私政策》</text></text>
								</checkbox-group>
							</view>
						</view>
						<button form-type="submit" @click="register" class="logon">确认绑定</button>
						<button form-type="submit" @click="auth_token = ''" class="logon back">返回</button>
					</view>
				</view>
			</form>
			<view class="copyright" @click="goCopyUrl">{{copyData}}</view>
			<Verify @success="success" :captchaType="'blockPuzzle'" :imgSize="{ width: '330px', height: '155px' }"
				ref="verify"></Verify>
		</div>
	</div>
</template>
<script>
	let statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';

	import {
		getCityV2,
		getCityList
	} from '@/api/api.js';
	import dayjs from "@/plugin/dayjs/dayjs.min.js";
	import sendVerifyCode from "@/mixins/SendVerifyCode";
	import {
		loginH5,
		loginMobile,
		registerVerify,
		register,
		getCodeApi,
		getUserInfo,
		getCaptcha,
		appleLogin,
		loginMpPhone
	} from "@/api/user";

	import {
		getGeocoder
	} from '@/api/store.js';
	// #ifdef APP-PLUS
	import {
		wechatAppAuth,
		appleAppAuth
	} from '@/api/api.js'
	// #endif
	import attrs, {
		required,
		alpha_num,
		chs_phone
	} from "@/utils/validate";
	import {
		getLogo,
		getconfig,
		getVersion
	} from "@/api/public";
	import {
		VUE_APP_API_URL,
		configMap
	} from "@/utils";
	import {
		HTTP_REQUEST_URL
	} from '@/config/app';
	import parser from "@/components/jyf-parser/jyf-parser";
	import {
		commonAuth
	} from '../../../api/public';

	import {
		mapGetters
	} from "vuex";
	import Verify from '@/components/verify/verify.vue';
	const BACK_URL = "login_back_url";

	// #ifdef APP-PLUS
	var sharetrace = uni.requireNativePlugin("shoot-sharetrace")
	//  #endif
	export default {
		name: "Login",
		mixins: [sendVerifyCode],
		components: {
			"jyf-parser": parser,
			Verify
		},
		data: function() {
			return {
				domain: HTTP_REQUEST_URL,
				statusBarHeight: statusBarHeight,
				current: 1,
				account: "",
				password: "",
				spid: getApp().globalData.spid || '',
				spread: getApp().globalData.spid || "", // 邀请码
				captcha: "",
				formItem: 1,
				type: "login",
				keyCode: "",
				codeUrl: "",
				codeVal: "",
				isShowCode: false,
				tagStyle: {
					img: 'width:100%;display:block;'
				},
				addres: '',
				isAgree: false,
				appLoginStatus: false, // 微信登录强制绑定手机号码状态
				appUserInfo: null, // 微信登录保存的用户信息
				appleLoginStatus: false, // 苹果登录强制绑定手机号码状态
				appleUserInfo: null,
				appleShow: false, // 苹果登录版本必须要求ios13以上的
				keyLock: true,
				auth_token: "",
				codeVal: '',
				copyright: {
					status: ''
				}
			};
		},
		computed: {
			...configMap(['login_logo', 'wechat_phone_switch'], mapGetters(['viewColor'])),
			copyData() {
				let copy = this.copyright.status == -1 ? (this.copyright.year + " " + this.copyright.url) : this.copyright
					.Copyright
				return copy;
			}
		},
		watch: {
			formItem: function(nval, oVal) {
				if (nval == 1) {
					this.type = 'login'
				} else {
					this.type = 'register'
					
					this.selfLocation()
				}
			}
		},
		onLoad() {
			let self = this
			uni.getSystemInfo({
				success: function(res) {
					if (res.platform.toLowerCase() == 'ios' && self.getSystem(res.system) >= 13) {
						self.appleShow = true
					}
				}
			});
			// #ifdef APP-PLUS
			// 如果需要禁止Sharetrace SDK获取剪切板内容，请在startInit前调用disableClipboard
			// sharetrace.disableClipboard();
			sharetrace.startInit();
			sharetrace.registerWakeupTrace(data => {
				if (data) {
					const params = {};
					data.data.paramsData.split('&').forEach(pair => {
						const [key, value] = pair.split('=');
						params[key] = decodeURIComponent(value);
					});
					console.log(params, 'app接收到的参数')
					if (params.uid) {
						getApp().globalData.uid = params.uid;
					}
					if (params.spid) {
						getApp().globalData.spid = params.spid;
						self.spid = getApp().globalData.spid || ''
						self.spread = getApp().globalData.spid || ''
					}
				}
			});
			// #endif
		},
		onShow() {
			this.$nextTick(() => {
				this.spid = getApp().globalData.spid || ''
				this.spread = getApp().globalData.spid || ''

			})

		},
		mounted: function() {
			this.getVersion();
		},
		onReady() {
			let that = this
			// #ifdef MP
			wx.login({
				success(res) {
					if (res.code) {
						that.codeVal = res.code
					} else {
						console.log('登录失败！' + res.errMsg)
					}
				}
			})
			// #endif
		},
		methods: {
			// 地址数据
			getCityList: function() {
				let that = this;
				getCityV2(0).then(res => {
					this.district = res.data
				})
			},
			// 获取定位
			selfLocation() {
				let self = this
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						let latitude, longitude;
						latitude = res.latitude.toString();
						longitude = res.longitude.toString();
						this.latitude = res.latitude
						this.longitude = res.longitude
						getGeocoder({
							lat: latitude,
							long: longitude
						}).then(res => {
							console.log('fhui', res)
							let data = res.data.address_component
							self.addres = data.province + data.city + data.district
						}).catch(err => {
							uni.showToast({
								title: err,
								icon: 'none'
							})
						})
					},
					fail: (res) => {

						console.log('shibai', res)
						// uni.showToast({
						// 	title: res,
						// 	icon: 'none',
						// 	duration: 1000
						// });
					},
				});
			},
			// #ifdef MP
			getPhoneNumber(e) {
				let that = this;
				if (!that.isAgree) {
					return that.$util.Tips({
						title: '请勾选用户协议与隐私政策'
					});
				} else {
					loginMpPhone({
							iv: e.detail.iv,
							encryptedData: e.detail.encryptedData,
							code: that.codeVal,
							auth_token: uni.getStorageSync('auth_token'),
						}).then(({
							data
						}) => {
							const backUrl = that.$Cache.get(BACK_URL) || "/pages/index/index";
							that.$Cache.clear(BACK_URL);
							that.$store.commit("LOGIN", {
								'token': data.token,
								'time': data.exp
							});
							that.$store.commit("SETUID", data.user.uid);
							that.$store.commit('UPDATE_USERINFO', data.user);

							let method
							let indexPat = ['/pages/index/index', '/pages/order_addcart/order_addcart',
								'/pages/goods_cate/goods_cate',
								'/pages/user/index', '/pages/plant_grass/index'
							]
							if (indexPat.includes(this.getPath(backUrl))) {
								method = 'switchTab'
							} else {
								method = 'navigateTo'
							}
							if (this.getPath(backUrl) === '/pages/users/login/index') {
								uni.switchTab({
									url: '/pages/index/index'
								});
								return
							}
							uni[method]({
								url: backUrl
							});
						})
						.catch(res => {
							that.$util.Tips({
								title: res
							});
						});
				}

			},
			// #endif
			goCopyUrl() {
				// #ifdef H5
				location.href = this.copyright.url
				// #endif
			},
			userAgree() {
				uni.navigateTo({
					url: '/pages/users/user_about/index?from=sys_user_agree'
				})
			},
			userPrivacyAgree() {
				uni.navigateTo({
					url: '/pages/users/user_about/index?from=sys_userr_privacy'
				})
			},
			getSystem(system) {
				if (system.indexOf('iOS') === -1) {
					return system
				} else {
					let str = system.split(' ')[1]
					if (str.indexOf('.')) {
						return Number(str.split('.')[0])
					} else {
						return Number(str)
					}
				}
			},
			home() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			// 苹果登录
			appleLogin() {
				let self = this
				if (!self.isAgree) {
					return self.$util.Tips({
						title: '请勾选用户协议与隐私政策'
					});
				} else {
					this.account = ''
					this.captcha = ''
					uni.showLoading({
						title: '登录中'
					})
					uni.login({
						provider: 'apple',
						timeout: 10000,
						success(loginRes) {
							uni.getUserInfo({
								provider: 'apple',
								success: function(infoRes) {
									self.appleUserInfo = infoRes.userInfo
									self.appleLoginApi()
								},
								fail() {
									uni.showToast({
										title: '获取用户信息失败',
										icon: 'none',
										duration: 2000
									})
								},
								complete() {
									uni.hideLoading()
								}
							});
						},
						fail(error) {
							uni.showToast({
								title: '获取用户信息失败',
								icon: 'none',
								duration: 2000
							})
							console.log(error)
						}
					})
				}
			},
			appleLoginApi() {
				let that = this
				commonAuth({
					auth: {
						type: 'apple',
						auth: {
							userInfo: that.appleUserInfo,
							openId: that.appleUserInfo.openId,
							nickname: (that.appleUserInfo.fullName.familyName || '') + (that.appleUserInfo.fullName
								.giveName || ''),
						}
					}
				}).then(res => {
					const data = res.data;
					if (res.status == 200) {
						const backUrl = that.$Cache.get(BACK_URL) || "/pages/index/index";
						that.$Cache.clear(BACK_URL);
						that.$store.commit("LOGIN", {
							'token': data.result.token,
							'time': data.result.exp
						});
						that.$store.commit("SETUID", data.result.user.uid);
						that.$store.commit('UPDATE_USERINFO', data.result.user);
						let method
						let indexPat = ['/pages/index/index', '/pages/order_addcart/order_addcart',
							'/pages/goods_cate/goods_cate',
							'/pages/user/index', '/pages/plant_grass/index'
						]
						if (indexPat.includes(this.getPath(backUrl))) {
							method = 'switchTab'
						} else {
							method = 'navigateTo'
						}
						if (this.getPath(backUrl) === '/pages/users/login/index') {
							uni.switchTab({
								url: '/pages/index/index'
							});
							return
						}
						uni[method]({
							url: backUrl
						});
					} else {
						uni.hideLoading();
						that.auth_token = res.data.result.key;
					}
				}).catch(res => {
					uni.hideLoading();
					uni.showToast({
						title: res.message || res,
						icon: 'none',
						duration: 2000
					});
				});
			},
			// App微信登录
			wxLogin() {
				if (!this.isAgree) return this.$util.Tips({
					title: '请勾选用户协议与隐私政策'
				});
				let self = this
				this.account = ''
				this.captcha = ''
				uni.showLoading({
					title: '登录中'
				})
				uni.login({
					provider: 'weixin',
					onlyAuthorize: true,
					success: function(loginRes) {
						console.log('loginRes', loginRes)
						self.appUserInfo = loginRes
						self.wxLoginApi()
					},
					fail(error) {
						console.log('weisah ', error)
						uni.showToast({
							title: '登录失败',
							icon: 'none',
							duration: 2000
						})
					}
				});
			},
			getPath(url) {
				if (url.indexOf("?") != -1) {
					url = url.split("?")[0];
					console.log(url);
				}
				return url
			},
			wxLoginApi() {
				const that = this
				let formData = {
					auth: {
						type: 'app_wechat',
						auth: {
							code: that.appUserInfo.code,
							openid: that.appUserInfo.authResult.openid,
							phone: this.account,
						}
					}
				}
				commonAuth(formData).then(res => {
					const data = res.data;
					if (res.status == 200) {
						const backUrl = that.$Cache.get(BACK_URL) || "/pages/index/index";
						that.$Cache.clear(BACK_URL);
						that.$store.commit("LOGIN", {
							'token': data.result.token,
							'time': data.result.exp
						});
						that.$store.commit("SETUID", data.result.user.uid);
						that.$store.commit('UPDATE_USERINFO', data.result.user);
						// uni.navigateBack({
						// 	delta:1
						// })
						uni.switchTab({
							//#ifdef APP
							"url": "/pages/short_video/appSwiper/index",
							//#endif	
							//#ifndef APP
							"url": "/pages/short_video/nvueSwiper/index",
							//#endif
						});
						// let method
						// let indexPat = ['/pages/index/index', '/pages/order_addcart/order_addcart',
						// 	'/pages/goods_cate/goods_cate',
						// 	'/pages/user/index', '/pages/plant_grass/index'
						// ]
						// if (indexPat.includes(this.getPath(backUrl))) {
						// 	method = 'switchTab'
						// } else {
						// 	method = 'navigateTo'
						// }
						// if (this.getPath(backUrl) === '/pages/users/login/index') {
						// 	uni.switchTab({
						// 		url: '/pages/index/index'
						// 	});
						// 	return
						// }
						// uni[method]({
						// 	url: backUrl
						// });
					} else {
						that.auth_token = res.data.result.key;
						that.bindStatus = true;
					}
					uni.hideLoading();
				}).catch(res => {
					console.log('登录失败了', err)
					uni.hideLoading();
					uni.showToast({
						title: res.message || res,
						icon: 'none',
						duration: 2000
					});
				});
			},

			getCode(data) {
				let that = this
				getCodeApi()
					.then(res => {
						that.keyCode = res.data.key;
						that.code(data);
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},
			async loginMobile() {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请输入手机号码'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				if (!that.captcha) return that.$util.Tips({
					title: '请输入验证码'
				});
				if (!/^[\w\d]+$/i.test(that.captcha)) return that.$util.Tips({
					title: '请输入正确的验证码'
				});
				if (!that.isAgree) return that.$util.Tips({
					title: '请勾选用户协议与隐私政策'
				});

				loginMobile({
						auth_token: uni.getStorageSync('auth_token'),
						phone: that.account,
						sms_code: that.captcha,
						spread: that.spread ? that.spread : that.$Cache.get("spread"),
						// #ifdef APP-PLUS
						user_type: 'app',
						// #endif
						// #ifdef H5
						user_type: 'h5',
						// #endif
					})
					.then(({
						data
					}) => {
						const backUrl = that.$Cache.get(BACK_URL) || "/pages/user/index";
						that.$Cache.clear(BACK_URL);
						that.$store.commit("LOGIN", {
							'token': data.token,
							'time': data.exp
						});
						that.$store.commit("SETUID", data.user.uid);
						that.$store.commit('UPDATE_USERINFO', data.user);

						let method
						let indexPat = ['/pages/index/index', '/pages/order_addcart/order_addcart',
							'/pages/goods_cate/goods_cate',
							'/pages/user/index'
						]
						if (indexPat.includes(this.getPath(backUrl))) {
							method = 'switchTab'
						} else {
							method = 'navigateTo'
						}
						const pages = getCurrentPages(); // 获取当前页面栈的实例列表
						const currentPage = pages[pages.length - 2]; // 获取当前页面实例
						const currentUrl = currentPage?.route; // 获取当前页面的路由地址
						if (currentUrl == 'pages/short_video/nvueSwiper/index' || currentUrl ==
							'pages/short_video/appSwiper/index') {
							return uni.reLaunch({
								url: '/' + currentUrl
							})
						}
						if (this.getPath(backUrl) === '/pages/users/login/index') {
							uni.switchTab({
								url: '/pages/index/index'
							});
							return
						}
						uni[method]({
							url: backUrl
						});
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},
			async register() {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请输入手机号码'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				if (!that.captcha) return that.$util.Tips({
					title: '请输入验证码'
				});
				if (!/^[\w\d]+$/i.test(that.captcha)) return that.$util.Tips({
					title: '请输入正确的验证码'
				});
				if (!that.password) return that.$util.Tips({
					title: '请输入密码'
				});
				if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/i.test(that.password)) return that.$util.Tips({
					title: '请输入6-16位字母加数字组合'
				});
				if (!that.isAgree) return that.$util.Tips({
					title: '请勾选用户协议与隐私政策'
				});
				register({
						auth_token: this.auth_token || uni.getStorageSync('auth_token'),
						phone: that.account,
						sms_code: that.captcha,
						pwd: that.password,
						addres: that.addres,
						spread: that.spread ? that.spread : that.$Cache.get("spread"),
						// #ifdef APP-PLUS
						user_type: 'app',
						// #endif
						// #ifdef H5
						user_type: 'h5',
						// #endif
					})
					.then(res => {
						const backUrl = that.$Cache.get(BACK_URL) || "/pages/index/index";
						that.$Cache.clear(BACK_URL);
						that.$store.commit("LOGIN", {
							'token': res.data.token,
							'time': res.data.exp
						});
						that.$store.commit("SETUID", res.data.user.uid);
						that.$store.commit('UPDATE_USERINFO', res.data.user);
						uni.switchTab({
							url: '/pages/user/index'
						})
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},
			async code(data) {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请输入手机号码'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				// if (that.formItem == 2) that.type = "register";
				await registerVerify({
						phone: that.account,
						type: 'login',
						key: that.keyCode,
						// code: that.codeVal,
						toke: '', //data.token 修改于2025.3.4日
						captchaType: 'blockPuzzle',
						captchaVerification: '' //data.captchaVerification
					})
					.then(res => {
						that.$util.Tips({
							title: res.message
						});
						that.sendCode();
					})
					.catch(res => {
						that.$util.Tips({
							title: res
						});
					});
			},
			getcaptcha() {
				let that = this
				getCaptcha().then(data => {
					// that.codeUrl = `${VUE_APP_API_URL}/sms_captcha?key=${that.keyCode}`;
					that.codeUrl = data.data.captcha;
					that.keyCode = data.data.key
				})
				that.isShowCode = true;
			},
			navTap: function(index) {
				this.current = index;
			},
			getPath(url) {
				if (url.indexOf("?") != -1) {
					url = url.split("?")[0];
				}
				return url
			},
			async submit() {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请输入账号'
				});
				if (!/^[\w\d]{5,16}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的账号'
				});
				if (!that.password) return that.$util.Tips({
					title: '请输入密码'
				});
				if (!that.isAgree) return that.$util.Tips({
					title: '请勾选用户协议与隐私政策'
				});
				loginH5({
						auth_token: uni.getStorageSync('auth_token'),
						account: that.account,
						password: that.password,
						spread: that.spread ? that.spread : that.$Cache.get("spread"),
					})
					.then(({
						data
					}) => {
						const backUrl = that.$Cache.get(BACK_URL) || "/pages/index/index";
						that.$Cache.clear(BACK_URL);
						that.$store.commit("LOGIN", {
							'token': data.token,
							'time': data.exp
						});
						that.$store.commit("SETUID", data.user.uid);
						that.$store.commit('UPDATE_USERINFO', data.user);

						let method
						let indexPat = ['/pages/index/index', '/pages/order_addcart/order_addcart',
							'/pages/goods_cate/goods_cate',
							'/pages/user/index'
						]
						if (indexPat.includes(this.getPath(backUrl))) {
							method = 'switchTab'
						} else {
							method = 'navigateTo'
						}
						const pages = getCurrentPages(); // 获取当前页面栈的实例列表
						const currentPage = pages[pages.length - 2]; // 获取当前页面实例
						const currentUrl = currentPage?.route; // 获取当前页面的路由地址
						if (currentUrl == 'pages/short_video/nvueSwiper/index' || currentUrl ==
							'pages/short_video/appSwiper/index') {
							return uni.reLaunch({
								url: '/' + currentUrl
							})
						}
						if (this.getPath(backUrl) === '/pages/users/login/index') {
							uni.switchTab({
								url: '/pages/index/index'
							});
							return
						}
						uni[method]({
							url: backUrl
						});
					})
					.catch(e => {
						that.$util.Tips({
							title: e
						});
					});
			},
			getVersion() {
				getVersion().then(data => {
					this.copyright = data.data;
				});
			},
			success(data) {
				this.$refs.verify.hide();
				this.code(data);
			},
			handleVerify() {
				let that = this;
				if (!that.account) return that.$util.Tips({
					title: '请输入手机号码'
				});
				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account)) return that.$util.Tips({
					title: '请输入正确的手机号码'
				});
				if (!that.isAgree) return that.$util.Tips({
					title: '请勾选用户协议与隐私政策'
				});
				// that.$refs.verify.show();
				this.code()
			}
		}
	};
</script>
<style lang="scss" scoped>
	// /deep/uni-checkbox .uni-checkbox-input,
	// /deep/checkbox .wx-checkbox-input{
	// 	border-radius: 100%;
	// 	width: 28rpx;
	// 	height: 28rpx;
	// }
	// /deep/checkbox .uni-checkbox-input.uni-checkbox-input-checked,
	// /deep/checkbox .wx-checkbox-input.wx-checkbox-input-checked {
	// 	border: 1px solid var(--view-theme)!important;
	// 	background-color: var(--view-theme)!important;
	// }
	.register .whiteBg .title_info text {
		color: var(--view-theme);
	}

	.register .list .item .code {
		color: var(--view-theme);
	}

	.title-bar {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 34rpx;
		font-weight: 500;
		color: #333333;
		line-height: 48rpx;

		.icon {
			position: absolute;
			left: 30rpx;
			top: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 80rpx;
			height: 80rpx;

			image {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}

	.code image {
		width: 100%;
		height: 100%;
	}

	.protocol_text {
		color: #999;
		font-size: 24rpx;
	}

	.protocol {
		margin-top: 82rpx;
		justify-content: center;
	}

	.protocol_text {
		.font_pro {
			color: var(--view-theme);
		}
	}

	.appLogin {
		margin-top: 82rpx;

		.hds {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;
			color: #B4B4B4;

			.line {
				width: 68rpx;
				height: 1rpx;
				background: #CCCCCC;
			}

			p {
				margin: 0 20rpx;
			}
		}

		.btn-wrapper {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 30rpx;

			.btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 68rpx;
				height: 68rpx;
				border-radius: 50%;

				+.btn {
					margin-left: 30rpx;
				}
			}

			.apple-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 246rpx;
				height: 66rpx;
				margin-left: 10rpx;
				background: #EAEAEA;
				border-radius: 34rpx;
				font-size: 24rpx;

				.icon-s-pingguo {
					color: #333;
					margin-right: 10rpx;
					font-size: 34rpx;
				}
			}

			.iconfont {
				font-size: 40rpx;
				color: #fff;
			}

			.wx {
				background-color: #61C64F;

				&.btn-apple {
					margin-right: 0;
					background-color: #333;
				}
			}
		}
	}

	.whiteBg .logon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 86rpx;
		margin-top: 48rpx;
		background-color: var(--view-theme);
		border-radius: 120rpx;
		color: #FFFFFF;
		font-size: 30rpx;
	}

	.whiteBg .back {
		border: 1px solid var(--view-theme);
		color: var(--view-theme);
		margin-top: 30rpx;
		background-color: transparent;
	}

	.copyright {
		position: fixed;
		bottom: 30rpx;
		left: 0;
		width: 100%;
		text-align: center;
		font-size: 20rpx;
		line-height: 28rpx;
		color: #9E9E9E;
	}
</style>