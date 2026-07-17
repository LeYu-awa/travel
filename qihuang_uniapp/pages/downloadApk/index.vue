<template>
	<view class="wrap">
		<view class="template-2 template-wrap">
			<view class="t-bg-2">
				<image src="/static/images/downloadApk/t-06.jpg"></image>
			</view>
			<view class="container">
				<view class="content">
					<view class="t-icon">
						<image src="/static/images/f.png"></image>
					</view>
					<view class="t-name">
						<view class="tit">岐黄手法</view>
						<view class="name-info pc-pwd">
							<view>版本 2.0.6</view>
							<view>更新时间 2025-02-26</view>
						</view>
					</view>
					<view class="download-btn" @click="handleClick">{{isAppInstalled?'立即打开APP':'下载安装'}}</view>
				</view>
			</view>
		</view>
		<!-- 安卓提示遮罩 -->
		<view v-if="weixin_android" class="weixin_android">
			<view class="click_opacity"></view>
			<view class="to_btn">
				<view class="span1">
					<image src="/static/images/downloadApk/click_btn.png"></image>
				</view>
				<view class="span2">
					<text class="circle">1</text> 点击右上角
					<image src="/static/images/downloadApk/menu_android.png"></image>
					打开菜单
				</view>
				<view class="span2 android_open">
					<text class="circle">2</text> 选择
					<image src="/static/images/downloadApk/android.png"></image>
				</view>
			</view>
		</view>
		<!-- ios提示曾 -->
		<view v-if="weixin_ios" class="weixin_ios">
			<view class="click_opacity"></view>
			<view class="to_btn">
				<view class="span1">
					<image src="/static/images/downloadApk/click_btn.png"></image>
				</view>
				<view class="span2">
					<text class="circle">1</text> 点击右上角
					<image src="/static/images/downloadApk/menu.png"></image>
					打开菜单
				</view>
				<view class="span2">
					<text class="circle">2</text> 选择
					<image src="/static/images/downloadApk/safari.png"></image>
					用Safari打开下载
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-PLUS
	const sharetrace = uni.requireNativePlugin('shoot-sharetrace');
	// #endif
	export default {
		data() {
			return {
				isAppInstalled: false, //是否安装应用标识
				weixin_android: false,
				weixin_ios: false,
				platform: 'ios', //平台类型

				downloadUrl: 'https://your-domain.com/app.apk', // APK下载地址
				schemeUrl: 'yourapp://home?uid=', // 应用协议地址
				uid: '', //邀请者id
				room_id: '' //房间号
			}
		},
		onLoad(options) {
			this.uid = options.uid;
			this.room_id = options.roomId;
			// 检测是否安装APP
			this.checkAppInstalled();
		},
		methods: {
			// 更精准的安装检测（结合本地存储和UA判断）
			checkAppInstalled() {
				// 1. 尝试通过ShareTrace获取安装参数
				this.checkViaShareTrace();

				// 2. 通过本地存储记录（需配合APP启动时写入标记）
				try {
					const installed = localStorage.getItem('app_installed');
					if (installed === 'true') this.isAppInstalled = true;
				} catch (e) {}

				// 3. 通过UserAgent特征判断（适用于部分安卓浏览器）
				const ua = navigator.userAgent.toLowerCase();
				if (ua.indexOf('yourapp') > -1) {
					this.isAppInstalled = true;
				}
			},
			// 方案2：通过ShareTrace原生插件检测（推荐）
			async checkViaShareTrace() {
				// #ifdef APP-PLUS
				try {
					const sharetrace = uni.requireNativePlugin('sharetrace');
					sharetrace.getInstallTrace(
						(res) => {
							// 能获取到安装参数说明已安装
							this.isAppInstalled = true;
							this.openAppWithParams();
						},
						(err) => {
							// 获取失败时引导下载
							this.isAppInstalled = false;
						}
					);
				} catch (e) {
					console.error('插件调用失败:', e);
				}
				// #endif
			},
			//打开/下载应用
			handleClick() {
				console.log('打开/下载应用')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		width: 100%;
		height: 100%;
	}

	.t-bg-2 {
		height: 260rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.container {
		.content {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}

		.t-icon {
			width: 200rpx;
			height: 200rpx;
			margin-top: -100rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.t-name {
			margin-top: 30rpx;
			text-align: center;

			.tit {
				font-size: 40rpx;
				font-weight: bold;
			}

			.name-info {
				color: #666;
			}
		}

		.download-btn {
			padding: 0 100rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 40rpx;
			text-align: center;
			font-size: 32rpx;
			margin-top: 40rpx;
			margin-bottom: 20rpx;
			color: #fff;
			background-color: #157df1;
		}
	}

	.click_opacity {
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.6;
		position: fixed;
		z-index: 10000;
		top: 0px;
	}

	.to_btn {
		position: fixed;
		top: 20rpx;
		right: 20rpx;
		text-align: right;
		z-index: 10001;
		font-family: "微软雅黑";
	}

	.to_btn view {
		display: block;
	}

	.to_btn .span1 {
		font-size: 32rpx;
		color: #fff;
		margin-top: 10rpx;

		image {
			width: 108rpx;
			height: 186rpx;
			display: inline-block;
		}
	}

	.to_btn {
		color: #fff;
	}

	.to_btn .span2 {
		display: inline-block;
		line-height: 72rpx;
		width: 80%;
		margin-bottom: 24rpx;
		text-align: left;
		font-size: 32rpx;
	}

	.to_btn .span2 .circle {
		display: inline-block;
		width: 32rpx;
		height: 32rpx;
		background: #009dd9;
		color: #fff;
		font-size: 24rpx;
		text-align: center;
		line-height: 32rpx;
		border: 1px solid #fff;
		border-radius: 50%;
		margin-right: 6rpx;
	}

	.to_btn .span2 image {
		display: inline-block;
		width: 60rpx;
		height: 60rpx;
		margin: 0 10rpx;
	}

	.to_btn span {
		display: block;
		float: right;
	}

	.to_btn .android_open image {
		display: inline-block;
		width: 300rpx;
		height: 68rpx;
	}
</style>