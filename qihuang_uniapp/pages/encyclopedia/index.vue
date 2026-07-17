<template>
	<view class="page">
		<view class="top" id="top">
			<view class="search acea-row flex">
				<view class='input acea-row ' @click.stop="goSearch">
					<text class='new-iconfont icon-sousuo'></text>
					请输入关键字
					<!-- <input type='text' disabled placeholder='请输入关键字' @click="goSearch" /> -->
				</view>
				<text class="new-iconfont icon-shijian history" @click="goHistory"></text>
			</view>
			<Tab :tablist="tablist" @change="changeTab" />
		</view>
		<view :style="'overflow-y: auto;height: calc(100vh - ' + footerHeight + 'px - ' + topHeight + 'px);'">
			<!-- 中医医学 -->
			<tcm v-if="tabindex == 3" />
			<!-- 董氏奇穴 -->
			<dong :topHeight="topHeight" v-else-if="tabindex == 2" />
			<!-- 病症 -->
			<disease v-else-if="tabindex == 1" />
			<!-- 经络穴位 -->
			<view v-else class="content">
				<view class="left">
					<view class="item" :class="type == 1 ? 'select' : ''" @click="init(1)">
						十二经脉
					</view>
					<view class="item" :class="type == 2 ? 'select' : ''" @click="init(2)">
						奇经八脉
					</view>
					<view class="item" :class="type == 3 ? 'select' : ''" @click="init(3)">
						经外奇穴
					</view>
				</view>
				<view class="right">
					<scroll-view :scroll-x="true" :show-scrollbar="false">
						<view class="top-tags">
							<view class="item" v-for="item, index in list" :key="item.id" :class="scrollCategoryKey == index ? 'select' : ''"
							@click="changeTag(index, item)" >
								{{ item.handfoot_name }}
							</view>
						</view>
					</scroll-view>
					<scroll-view :scroll-y="true" :scroll-top="scrollCategory" :show-scrollbar="false" @scroll="scroll"
						style="height: calc(100% - 30px);">
						<view class="category" v-for="item in list" :key="item.id" :id="'category' + item.category_id">
							<view class="title">
								{{ item.handfoot_name }}
								<!-- <text class="new-iconfont icon-right"></text> -->
							</view>
							<view class="tags">
								<view class="item" v-for="acupoints in item.acupoints" :key="acupoints.id" @click="goDetails(acupoints)">
									{{ acupoints.name }}
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<!-- <Suspension v-if="tabindex == 0" :isDock="true" :edge="{ top: 80, right: 10, left: 10, bottom: 80 }">
			<view class="Suspension" @click="showSearch = true">
				<view class="block">
					<view class="new-iconfont icon-shaixuan"></view>
					<text>筛选</text>
				</view>
			</view>
		</Suspension> -->
		<!-- 筛选条件 -->
		<searchPopup :show="showSearch" @close="showSearch = false"></searchPopup>
		<!--自定义底部tab栏-->
		<customTab :newData="newData" :activeRouter="activeRouter" @height="($event) => { footerHeight = $event }">
		</customTab>
	</view>
</template>

<script>
import emptyPage from "@/components/emptyPage.vue"
import customTab from "@/components/customTab";
import Tab from "@/components/tab";
import searchPopup from "./components/searchPopup";
import disease from "./components/disease";
import dong from "./components/dong";
import tcm from "./components/tcm";
import Suspension from "@/components/Suspension/index";
import {
	acupointGroupList
} from "@/api/encyclopedia.js";
import {
	getNavigation
} from "@/api/public.js";
import {
	getAppVersion
} from "@/api/api.js";
export default {
	components: {
		customTab,
		Tab,
		emptyPage,
		Suspension,
		searchPopup,
		disease,
		dong,
		tcm
	},
	data() {
		return {
			scrollCategory: 0,
            scrollCategoryKey: 0,
			showSearch: false,
			newData: {},
			activeRouter: "",
			type: 1,
			list: [],
			appUpdate: {},
			tabindex: 0,
			footerHeight: 0,
			topHeight: 0,
			tablist: [{
				name: '经络穴位',
				id: 0,
			},
			{
				name: '病症',
				id: 1,
			},
			{
				name: '董氏奇穴',
				id: 2,
			},
			{
				name: '中医医学',
				id: 3,
			},
			],
		};
	},
	onShow() {
		this.init();
		let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
		let curRoute = routes[routes.length - 1].route; //获取当前页面路由
		this.activeRouter = "/" + curRoute;
		this.getNav();
	},
	onLoad() {
		// #ifdef APP-PLUS
		this.appVersionConfig(); //APP版本检测
		// #endif
		this.getTabbarHeight()
	},
	methods: {
		async init(e) {
			this.type = e || 1
			this.scrollCategoryKey = 0
			this.scrollCategory = 0
			let { data } = await acupointGroupList({ type: this.type })
			this.list = data
		},
		scroll(e) {
            this.scrollTop = e.target.scrollTop
            uni.createSelectorQuery().selectAll('.category').boundingClientRect((rects) => {
                if (rects && rects.length && !this.click) {
                    for (let i = 0; i < rects.length; i++) {
                        if (rects[i].top <= 100 && rects[i].bottom > 100) {
                            this.scrollCategoryKey = `${i}`;
                            break;
                        }
                    }


                }
            }).exec();
        },
		changeTag(index, item) {
            this.click = true
            uni.createSelectorQuery().select(`#category${item.id}`).boundingClientRect((rect) => {
                if (rect) {
                    this.scrollCategory = rect.top - this.topHeight - 30 + this.scrollTop
                    this.scrollCategoryKey = index;
                    setTimeout(() => {

                        this.click = false
                    }, 500);
                }
            }).exec();
        },
		getTabbarHeight() {
			let that = this
			this.$nextTick(() => {
				const query = uni.createSelectorQuery().in(this);
				query
					.select("#top")
					.boundingClientRect((data) => {
						that.topHeight = data?.height
					})
					.exec();

			})

		},
		changeTab(index, item) {
			this.tabindex = index
		},

		// #ifdef APP-PLUS
		appVersionConfig() {
			var that = this;
			//app升级
			// 获取本地应用资源版本号
			getAppVersion().then((res) => {
				that.$set(that.appUpdate, "androidAddress", res.data.androidAddress);
				that.$set(that.appUpdate, "appVersion", res.data.appVersion);
				that.$set(that.appUpdate, "iosAddress", res.data.iosAddress);
				that.$set(that.appUpdate, "openUpgrade", res.data.openUpgrade);
				plus.runtime.getProperty(plus.runtime.appid, function (inf) {
					let nowVersion = inf.version.split(".").join("");
					let appVersion = res.data.appVersion.split(".").join("");
					that.$set(that.appUpdate, "alert", appVersion > nowVersion);
					that.alertAppUpdate();
				});
			});
		},
		alertAppUpdate() {
			if (this.appUpdate.alert) {
				uni.getSystemInfo({
					success: (res) => {
						uni.showModal({
							title: "更新提示",
							content: "发现新版本，是否前去下载?",
							showCancel: this.appUpdate.openUpgrade != "1",
							cancelColor: "#eeeeee",
							confirmColor: "#FF0000",
							success: (response) => {
								if (response.confirm) {
									switch (res.platform) {
										case "android":
											plus.runtime.openURL(this.appUpdate
												.androidAddress);
											break;
										case "ios":
											plus.runtime.openURL(
												encodeURI(this.appUpdate.iosAddress)
											);
											break;
									}
								}
							},
						});
					},
				});
			}
		},
		// #endif
		goDetails(item, type) {
			uni.navigateTo({
				url: '/pages/encyclopedias/details?id=' + item.id
			})
		},
		goSearch() {
			uni.navigateTo({
				url: '/pages/encyclopedias/search'
			})
		},
		goHistory() {
			uni.navigateTo({
				url: '/pages/users/paaralan/history'
			})
		},
		getNav() {
			getNavigation().then((res) => {
				this.newData = res.data;
				if (this.newData.status && this.newData.status.status) {
					uni.hideTabBar();
				} else {
					uni.showTabBar();
				}
			});
		},
	},
};
</script>
<style scoped lang="less">
.top {
	position: sticky;
	top: 0;
	background-color: #fff;
	z-index: 2;
	padding-bottom: 20rpx;
	border-bottom: 2rpx solid #eee;
}

.search {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 30rpx;

	.input {
		width: calc(100% - 60rpx);
		background-color: #f7f7f7;
		border-radius: 33rpx;
		padding: 0 35rpx;
		box-sizing: border-box;
		height: 66rpx;
		display: flex;
		align-items: center;
	}

	.kasaysayan {
		width: 40rpx;
		display: flex;
		justify-content: center;

		align-items: center;
	}

	.input input {
		margin-left: 10rpx;
		flex: 1;
		font-size: 28rpx;
	}

	.input .placeholder {
		color: #919393;
		font-size: 28rpx;
	}

	.input .new-iconfont {
		color: #919393;
		font-size: 35rpx;
		margin-right: 20rpx;
	}

	.history {
		font-size: 42rpx;
	}
}


.content {
	display: flex;
	height: 100%;

	.left {
		background-color: #EFE9DD;
		width: 200rpx;

		.item {
			padding: 20rpx;
			border-left: 6rpx solid #EFE9DD;

			&.select {
				background-color: #fff;
				color: var(--main-color);
				border-color: var(--main-color);
			}
		}
	}

	.right {
		width: calc(100% - 200rpx);
		padding-top: 20rpx;
		padding-left: 20rpx;

		height: 100%;
		overflow-y: auto;

		.top-tags {
			display: flex;

			.item {
				background-color: #eee;
				color: #999;
				padding: 10rpx 20rpx;
				border-radius: 10rpx;
				white-space: nowrap;
				margin-right: 20rpx;

				&.select {
					background-color: var(--main-bg-color);
					color: var(--main-color);
				}
			}
		}

		.category {

			padding-right: 20rpx;

			.title {
				background-color: var(--main-color);
				color: #fff;
				padding: 10rpx 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 20rpx;
			}

			.tags {
				background-color: #FAFAFA;
				padding: 20rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;

				.item {
					min-width: 30%;
					border: 2rpx solid #eee;
					text-align: center;
					height: 60rpx;
					line-height: 60rpx;
					margin-bottom: 16rpx;
					border-radius: 10rpx;
					background-color: #fff;
				}
			}
		}
	}
}

.Suspension {
	background-color: #ffffff55;
	text-align: center;
	font-size: 20rpx;
	color: var(--main-color);
	width: 80rpx;
	height: 80rpx;
	border: 2rpx solid var(--main-color);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>