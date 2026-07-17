<template>
	<view class="page">
		<view class="top">
			<view class="search acea-row flex">
				<view class='input acea-row ' @click.stop="goSearch">
					<text class='new-iconfont icon-sousuo'></text>
					请输入关键字
					<!-- <input type='text' disabled placeholder='请输入关键字' placeholder-class='placeholder' @input="setValue"
						confirm-type="search" @confirm="searchBut()"></input> -->
				</view>
				<text class="new-iconfont icon-shijian history" @click="goHistory"></text>
			</view>
			<Tab :tablist="tablist" @change="ontab" />
			<!-- <view class="tab">
				<view :class="tabindex == index ? 'item active' : 'item'" v-for="(item, index) in tablist" :key="index"
					@click="ontab(index, item.id)">
					{{ item.name }}
				</view>
			</view> -->
		</view>
		<!-- 顶部内容 -->
		<view v-if="tablist.length">
			<category :categoryList="tablist[tabindex].child"></category>
		</view>
		<!-- tab -->
		<!-- <topMenu></topMenu> -->
		<!-- 分类 -->
		<!-- <category></category> -->

		<view class="border"></view>
		<template v-if="tabindex == 0">
			<!-- 热销 -->
			<hot :num="3"></hot>

			<view class="" v-for="item in navList" :key="item.id">
				<view class="border"></view>
				<!-- 常规列表 -->
				<list :model="item" :list="item.subjects" />
			</view>
		</template>
		<list v-else :header="false" :list="subjectsList" />

		<recently />
		<!--自定义底部tab栏-->
		<customTab :newData="newData" :activeRouter="activeRouter"></customTab>
	</view>
</template>

<script>
	import category from "./components/category";
	import hot from "./components/hot";
	import list from "./components/list";
	import recently from "./components/recently";
	import customTab from "@/components/customTab";
	import Tab from "@/components/tab";
	import {
		getLessonTypeShowList,
		getTypeList,
		getNavList,
		getSubjectListByType
	} from "@/api/paaralan.js";
	import {
		getNavigation
	} from "@/api/public.js";
	import {
		getAppVersion
	} from "@/api/api.js";
	export default {
		components: {
			category,
			hot,
			list,
			recently,
			customTab,
			Tab,
		},
		data() {
			return {
				newData: {},
				activeRouter: "",
				indexData: {},
				topswiper: [], // 顶部轮播图数据
				liveswiper: [],
				networkswiper: [],
				hotdata: [], // 热门板块数据
				swiperBottomList: [],
				appUpdate: {},
				isSee: 0,

				tabindex: 0,
				tablist: [],
				subjectsList: [],
				navList: [],
				queryParams: {
					page: 1,
					limit: 10,
					type_id: '',
					is_pay: '',
					order_by: 'create_time',
				},
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
		},
		// 触底加载
		async onReachBottom() {
			if (this.queryParams.type_id) {
				this.queryParams.page += 1
				this.getList()
			}
		},
		methods: {
			async init() {
				// 获取分类
				let TypeList = await getTypeList();
				let arr = [];
				TypeList.data.filter((v) => {
					v?.child.filter((j) => {
						if (arr.length < 8) {
							arr.push(j);
						}
					});
				});
				this.tablist = [{
						name: '全部',
						id: 0,
						child: [{
							id: 0,
							url: 'pagRank',
							name: '排行榜',
							logo: 'icon-paihangbang',
							color: '#80716C'
						}, ...arr, {
							id: 0,
							url: 'search',
							name: '更多',
							logo: 'icon-gengduo',
							color: '#877F58'
						}]
					},
					...TypeList.data
				];

				let NavList = await getNavList();
				this.navList = NavList.data
				// let data = await getLessonTypeShowList();
			},
			ontab(index, {
				id
			}) {
				this.tabindex = index;
				this.queryParams.type_id = 0
				if (index != 0) {
					this.queryParams.type_id = id
					this.getSubjectsList()
				}
			},
			async getSubjectsList() {
				let {
					data
				} = await getSubjectListByType(this.queryParams)
				if (this.queryParams.page == 1) {
					this.subjectsList = data.list || []
				} else {
					this.subjectsList = [...this.subjectsList, ...data.list]
				}
			},
			goSearch() {
				uni.navigateTo({
					url: '/pages/encyclopedias/search'
				})
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
					plus.runtime.getProperty(plus.runtime.appid, function(inf) {
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

			goHistory() {
				uni.navigateTo({
					url: '/pages/paaralan/history'
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
<style>
	page {
		background: #ffffff;
	}
</style>
<style scoped lang="less">
	.border {
		height: 8rpx;
		background-color: #f8f8f8;
		margin-top: 20rpx;
	}

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
		}

		.history {
			font-size: 42rpx;
		}
	}

	.tab {
		width: 100%;
		height: 52rpx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 99;

		.item {
			// min-width: 106rpx;
			width: 25%;
			height: 52rpx;
			text-align: center;
			line-height: 52rpx;
			font-size: 28rpx;
			color: #000;
			margin-right: 20rpx;
		}

		.active {
			font-size: 30rpx;
			font-weight: bold;
			position: relative;
		}

		.active::after {
			content: "";
			width: 40rpx;
			height: 6rpx;
			border-radius: 6rpx;
			background: #fcb51a;
			position: absolute;
			left: 50%;
			bottom: -8rpx;
			transform: translate(-50%, 0);
		}
	}
</style>