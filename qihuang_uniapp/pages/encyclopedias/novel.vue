<template>
	<view class="Box" style="">
		<!-- 网页背景开始 -->
		<view class="pagbg anmt" :style="{ backgroundColor: pageBg }"></view>
		<view class="zhongMenu" @click="dianjile()"></view>
		<!-- 带返回键的导航栏结束 -->
		<!-- 菜单开始 -->
		<view class="bottomBox anmt"
			:style="{ color: fontColor, backgroundColor: menuBg, bottom: show ? '0' : '-150px' }">
			<view style="overflow: hidden;">
				<view style="float: left;width: 50%;overflow: hidden;">
					<view style="float: left;width: 30%;line-height: 70upx;text-align: center;font-size: 24upx;">字体
					</view>
					<view
						style="float: left;width: 70%;height: 70upx;display: flex;align-content: center;justify-content: center;">
						<slider style="width: 100%;" :value="size" min="20" max="100" @changing="changeFontSize"
							@change="changeFontSize" :activeColor="fontColor" :backgroundColor="pageBg"
							:block-color="fontColor" block-size="20" />
					</view>
				</view>
				<view style="float: left;width: 50%;overflow: hidden;">
					<view style="float: left;width: 30%;line-height: 70upx;text-align: center;font-size: 24upx;">间距
					</view>
					<view
						style="float: left;width: 70%;height: 70upx;display: flex;align-content: center;justify-content: center;">
						<slider style="width: 100%;" :value="lineHeight" min="50" max="150" @changing="changeLineHeight"
							@change="changeLineHeight" :activeColor="fontColor" :backgroundColor="pageBg"
							:block-color="fontColor" block-size="20" />
					</view>
				</view>
			</view>
			<view style="overflow: hidden;">
				<view style="float: left;width: 15%;line-height: 100upx;text-align: center;font-size: 24upx;">背景</view>
				<view style="float: left;width: 85%;height: 100upx;display: flex;">
					<view class="sekuai" v-for="(item, index) in zhutiList" @tap="qiehuan(index)" :key="item.name"
						:style="{ backgroundColor: item.pageBg, borderColor: dqzhuti == index ? item.fontColor : 'rgba(0,0,0,0)' }"
						v-if="index != 1 && index != 2"></view>
				</view>
			</view>
			<view style="width: 100%;display: flex;" class="ddd">
				<view @click="mulu()">
					<view><text class="tficon">&#xe671;</text></view>
					<view>目录</view>
				</view>
				<view @click="qiehuan(dqzhuti == 1 ? 0 : 1)">
					<view><text class="tficon">{{ dqzhuti == 1 ? '&#xe699;' : '&#xe612;' }}</text></view>
					<view>{{ dqzhuti == 1 ? '白天' : '夜间' }}</view>
				</view>
				<view @click="qiehuan(dqzhuti == 2 ? 0 : 2)" :style="dqzhuti == 2 ? 'color:green' : ''">
					<view><text class="tficon">&#xe639;</text></view>
					<view>护眼</view>
				</view>
			</view>
		</view>
		<!-- 菜单结束 -->
		<!-- 顶部开始 -->
		<view class="anmt"
			:style="{ color: fontColor, lineHeight: statusBarHeight, backgroundColor: show ? menuBg : pageBg, position: 'fixed', top: '0', left: '0', zIndex: '6', width: '100%', fontSize: '3vw', zIndex: '20' }">

			<!-- 书名章节开始 -->
			<view style="height: 40upx;line-height: 40upx;padding: 0 5vw;">
				<view style="float: left;width: 300upx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
					v-text="book_details.name"></view>
				<view v-text="details.name"
					style="float: right;width: 300upx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: right;">
				</view>
			</view>
			<!-- 书名章节结束 -->
		</view>
		<!-- 顶部结束 -->
		<!-- 小说正文开始 -->
		<view class="sview"
			:style="{  color: textColor, fontSize: forUpx(size) + 'px', lineHeight: forUpx(lineHeight) + 'px' }">
			<rich-text :nodes="details.content"></rich-text>
			<view class="btns">
				<view class="one-btn btn-item" @click="changeNovel('upper')" v-if="catalogs.indexOf(details.id) != 0">
					上一章
				</view>
				<view class="btn-item" @click="changeNovel('next')"
					v-if="catalogs.indexOf(details.id) != catalogs.length - 1">
					下一章
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="left">
			<view class="popup-footer">
				<view class="title">
					<view class="height"></view>目录
				</view>
				<view class="content">
					<view class="cell" v-for="item in book_details.catalogs" :key="item.id">
						<view @click="changeNovel('',item)" class="main">{{ item.name }}</view>
						<view v-for="v in item.children" :key="v.id" class="children" @click="changeNovel('', v)">
							{{ v.name }}
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 小说正文结束 -->
	</view>
</template>
<script>
	import {
		getBookCatalogDetail,
		bookDetail
	} from "@/api/encyclopedia.js";
	import zhuti from './zhuti'
	export default {
		data() {
			return {
				details: {},
				content: [],
				book_details: {},
				catalogs: [], // 所有的目录id
				id: '',
				book_id: '',
				show: false, //菜单display
				dqzhuti: 0, //当前主题
				zhutiList: zhuti.data, //主题列表
				fontColor: 'rgb(100,103,120)', //菜单字体颜色
				pageBg: 'rgb(247,247,247)', //页面背景色
				menuBg: '#fff', //菜单背景色
				textColor: '#000', //富文本文字颜色
				statusBarHeight: '',
				Dindex: '', //当前章节索引
				id: '', //本书ID
				battery: '', //电量
				systemTime: '', //系统时间
				size: uni.getStorageSync('fontsize') ? uni.getStorageSync('fontsize') : 40, //正文字体大小
				lineHeight: uni.getStorageSync('lineHeight') ? uni.getStorageSync('lineHeight') : 70, //正文行间距
			}
		},
		onUnload() {
			uni.hideLoading();
			//页面卸载的时候将通知栏显示出来
			// plus.navigator.setFullscreen(false);
		},
		created() {
			var this_ = this;
			//获取状态栏高度给顶部占位节点
			// plus.navigator.setFullscreen(true);
			var zt = uni.getStorageSync('zhuti'); //主题索引
			if (zt) {
				this.dqzhuti = zt;
				this.fontColor = zhuti.data[zt].fontColor; //菜单字体颜色
				this.pageBg = zhuti.data[zt].pageBg; //页面背景色
				this.menuBg = zhuti.data[zt].menuBg; //菜单背景色
				this.textColor = zhuti.data[zt].textColor; //富文本文字颜色
			} else {
				this.dqzhuti = 0;
				this.fontColor = zhuti.data[0].fontColor; //菜单字体颜色
				this.pageBg = zhuti.data[0].pageBg; //页面背景色
				this.menuBg = zhuti.data[0].menuBg; //菜单背景色
				this.textColor = zhuti.data[0].textColor; //富文本文字颜色
			}
			uni.getSystemInfo({
				success: res => {
					this.statusBarHeight = res.statusBarHeight + 'px';
				}
			})
		},
		// onShow() {
		// 	//页面显示的时候将通知栏隐藏掉
		// 	plus.navigator.setFullscreen(true);
		// },
		// onHide() {
		// 	//页面隐藏的时候将通知栏显示出来
		// 	plus.navigator.setFullscreen(false);
		// },
		onLoad(e) {
			// plus.navigator.setStatusBarStyle('dark');
			// plus.navigator.setStatusBarBackground('#FF0000');
			this.id = e.id
			this.book_id = e.book_id
			this.getDetails()
		},
		methods: {
			async getDetails() {
				// 1、获取书本信息，有多少章节
				let book = await bookDetail({
					id: this.book_id
				})
				this.book_details = book.data
				this.catalogs = this.extractAllIds(this.book_details.catalogs)
				let {
					data
				} = await getBookCatalogDetail({
					id: this.id
				})
				this.details = data
			},
			extractAllIds(data) {
				const result = [];

				function traverse(node) {
					if (Array.isArray(node)) {
						node.forEach(traverse);
						return;
					}

					if (node.id !== undefined) {
						result.push(node.id);
					}

					// 递归处理 children 数组
					if (Array.isArray(node.children)) {
						traverse(node.children);
					}
				}

				traverse(data);
				return result;
			},
			//修改正文字体大小
			changeFontSize(e) {
				this.size = e.detail.value;
				uni.setStorageSync('fontsize', e.detail.value);
			},
			//修改正文行间距
			changeLineHeight(e) {
				this.lineHeight = e.detail.value;
				uni.setStorageSync('lineHeight', e.detail.value);
			},
			mulu() {
				this.$refs.popup.open('left')
			},
			async changeNovel(type,item) {
				if(!type){
					let {
						data
					} = await getBookCatalogDetail({
						id: item.id
					})
					this.details = data
					this.$refs.popup.close()
					
				}else{
					let key = this.catalogs.indexOf(this.details.id)
					if (type == 'next') { // 上一章
						let {
							data
						} = await getBookCatalogDetail({
							id: this.catalogs[key + 1]
						})
						this.details = data
					} else {
						let {
							data
						} = await getBookCatalogDetail({
							id: this.catalogs[key - 1]
						})
						this.details = data
					}
				}
				
			},
			back() {
				uni.navigateBack({});
			},
			dianjile() {
				this.show = !this.show;
			},
			//切换主题
			qiehuan(e) {
				this.fontColor = zhuti.data[e].fontColor; //菜单字体颜色
				this.pageBg = zhuti.data[e].pageBg; //页面背景色
				this.menuBg = zhuti.data[e].menuBg; //菜单背景色
				this.textColor = zhuti.data[e].textColor; //富文本文字颜色
				uni.setStorageSync('zhuti', e);
				this.dqzhuti = e;
			},
			getTimes() {
				var times = new Date();
				this.systemTime = (times.getHours() < 10 ? '0' + times.getHours() : times.getHours()) + ':' + (times
					.getMinutes() < 10 ? '0' + times.getMinutes() : times.getMinutes());
			},
			forUpx(e) {
				return uni.upx2px(e)
			}
		}
	}
</script>
<style>
	/* @font-face {font-family: "iconfont";
	  src: url('../../font/dianliang.ttf') format('truetype');
	}
	.iconfont {
	  font-family: "iconfont" !important;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	.icon-80dianliang:before {
	  content: "\e617";
	} */
	.pagbg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.zuizhong.active {
		opacity: 1;
		position: fixed;
		width: 100upx;
		text-align: center;
		font-size: 30upx;
		font-weight: bold;
		color: #ec706b;
		transform: translateX(50%) scale(0.7);
		right: 80upx;
		-webkit-transition: all 0.5s;
		z-index: 9
	}

	.zuizhong {
		opacity: 0;
		position: fixed;
		width: 100upx;
		text-align: center;
		font-size: 20upx;
		font-weight: bold;
		color: #ec706b;
		right: 80upx;
		transform: translateX(50%) scale(0.1);
		-webkit-transition: all 0.5s;
		transition: all 0.5s;
		z-index: 9
	}

	.quanquan {
		-webkit-box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 13px 1px;
		box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 13px 1px;
		position: fixed;
		right: 70upx;
		z-index: 9;
		border-radius: 50%;
		overflow: hidden;
		transform: translateX(50%) scale(0.5);
	}

	.back {
		width: 40upx;
		height: 40upx;
		margin: 0 40upx;
	}

	.sview {
		width: calc(100% - 40upx);
		font-size: 45upx;
		line-height: 90upx;
		position: relative;
		text-indent: calc(2em + 12upx);
		margin: 0 auto;
		z-index: 5;
		white-space: normal;
		word-break: break-all;
		word-wrap: break-word;
		overflow: hidden;
		padding: 50upx 20upx;
		/* padding: 0 20upx 300upx; */

		.btns {
			display: flex;
			justify-content: center;
			text-align: center;
			padding: 50rpx 0 30rpx;

			.btn-item {
				width: calc(50% - 20rpx);
				background-color: var(--main-color);
				color: #fff;
				font-size: 30rpx;
				border-radius: 40rpx;
				text-indent: 0;

				&.one-btn {
					background-color: transparent;
					border: 2rpx solid var(--main-color);
					color: var(--main-color);
					margin-right: 40rpx;
				}
			}
		}
	}

	.titlee {
		width: 100%;
		font-size: 45upx;
		line-height: 65upx;
		position: relative;
		z-index: 5;
		padding: 0 20upx 50upx;
		text-indent: -2.3em;
	}

	.tMain {
		display: flex;
		align-items: center;
	}

	page {
		letter-spacing: 6upx;
	}

	.topBox {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		opacity: 1;
		z-index: 9;
	}

	.bottomBox {
		padding: 0 0 20upx 0;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		opacity: 1;
		z-index: 9;
	}

	.bottomBox .ddd>view {
		width: 100%;
		text-align: center;
		font-size: 24upx;
		line-height: 40upx;
	}

	.bottomBox .ddd image {
		width: 40upx;
		height: 40upx;
	}

	@font-face {
		font-family: "ydiconfont";
		src: url('https://at.alicdn.com/t/font_1282539_9h0uwv1sxps.ttf') format('truetype');
		/* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
	}

	.tficon {
		font-family: ydiconfont;
		font-size: 34upx;
	}

	.guanggao {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 6;
		width: 100%;
	}

	.dianxin {
		position: absolute;
		top: 32.5%;
		left: 11%;
		width: 72%;
		height: 35%;
	}

	.dLiang {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: block;
	}

	.anmt {
		transition: all 0.5s;
	}

	.sekuai {
		width: 150upx;
		height: 100upx;
		background-color: #EC706B;
		border-radius: 12upx;
		border: 5upx solid #000;
		transform: scale(0.4);
		margin: -10upx -35upx 0;
	}

	.zhongMenu {
		top: 50%;
		position: fixed;
		left: 0;
		width: 100%;
		height: 50%;
		transform: translateY(-50%);
		z-index: 9;
	}

	.popup-footer {
		background-color: #fff;
		padding: 30rpx;
		height: 100vh;
		width: 60vw;

		.content {
			.cell {

				.main,
				.children {
					border-bottom: 2rpx solid #eee;
					font-weight: 700;
					padding: 20rpx 0;
				}

				.children {
					padding-left: 50rpx;
				}
			}
		}


	}
</style>