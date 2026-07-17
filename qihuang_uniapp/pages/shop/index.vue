<template>

	<view class="content">

		<image src="/static/images/user/setting_bg.png" class="bg" mode="widthFix"></image>
		<Header showBg="transparent" color="#ffffff" :customize="true" @customizeBack="goIndex">
			<template #title>
				<view class="top_flex" @click="$goNextPage('/pages/columnGoods/goods_search_con/index')">
					<input class="input" placeholder="请选择您需要的产品" />
					<view class="flex">
						<view class="new-iconfont icon-dizhiguanli"></view>
					</view>
				</view>

			</template>
		</Header>
		<view class="block">
			<!-- <image src="/static/images/shop/rice.png" class="rice" mode="widthFix"></image> -->
			<!-- 轮播图 -->
			<swiperCom :list="bannerList"></swiperCom>
			<view class="item">
				<view class="new-iconfont icon-gonggao1"></view>
				<view class="notice-content">
					公告
					<swiper style="width: calc(100% - 100rpx);height: 42rpx;" circular vertical :indicator-dots="false"
						:autoplay="true" :interval="3000">
						<swiper-item v-for="item in notice">
							<text @click="goPage(item)">{{item.title}}</text>
						</swiper-item>
					</swiper>

				</view>
			</view>
			<view class="item">
				<view class="classify-content" v-for="item in hotList"
					@click="$goNextPage('/pages/columnGoods/goods_list/index?id='+item.store_category_id+'&title=' + item.cate_name)">
					<image class="img" :src="item.pic"></image>
					<view class="">
						{{item.cate_name}}
					</view>
				</view>
				<view class="classify-content" @click="$goNextPage('/pages/goods_cate/goods_cate')">
					<image class="img" src="/static/images/shop/more.png"></image>
					<view class="">
						更多
					</view>
				</view>
			</view>
			<view class="nextpage">
				<image class="vip" mode="widthFix"
					@click="$goNextPage('/pages/columnGoods/goods_list/index?id=350&title=折扣商品')"
					src="/static/images/shop/VIP.png"></image>
				<image class="integral" mode="widthFix" @click="$goNextPage('/pages/points_mall/index')"
					src="/static/images/shop/Integral.png"></image>
			</view>
			<view class="specials">
				<view class="specials-top">

					<view class="title">
						<b>热门商品</b>
					</view>
					<view class="more" @click="$goNextPage('/pages/activity/rank/index')">
						更多<view class="new-iconfont icon-right"></view>
					</view>
				</view>
				<view class="specials-mid">
					<view class="mid-content" v-for="item in spuTopList">
						<image class="specials-img" :src='itm.image'></image>
						<view class="specials-name">
							{{itm.store_name}}
						</view>
						<view class="price">
							<BaseMoney :money="itm.price" symbolSize="26" integerSize="36" decimalSize="28"
								incolor="E93323" weight />
							<BaseMoney :money="itm.ot_price" symbolSize="22" integerSize="22" decimalSize="22"
								incolor="999999" class="ml-16" line />
						</view>
					</view>
				</view>
			</view>
		</view>

		<recommend v-if="recommend_switch == 1" :hostProduct="hostProduct" :isLogin="isLogin"></recommend>
		<customTab active="home"></customTab>
	</view>

</template>

<script>
	import customTab from '@/components/customTab';
	import Header from "@/components/header.vue"
	import swiperCom from './components/swiperCom';
	import {
		mapGetters
	} from "vuex";
	import {
		configMap
	} from "@/utils";
	import {
		getProductslist,
		getProductHot,
		getBrandlist,
		getStoreTypeApi,
		getParmasList,
		getCategoryList,
		noticeList
	} from '@/api/store.js';
	import {
		spuTopList
	} from '@/api/activity.js';

	import {
		getCarouselImage
	} from '@/api/liveBroadcast.js'
	import recommend from '@/components/recommend';
	export default {
		components: {
			customTab,
			Header,
			recommend,
			swiperCom
		},
		data() {
			return {
				// 推荐==========
				hotPage: 1,
				hotLimit: 10,
				hotScroll: false,
				hostProduct: [],
				// ==============
				bannerList: [], // banner
				hotList: [], // 热门分类
				notice: [], // 公告列表
				spuTopList: [], // 热门商品
			}
		},
		computed: {
			...configMap({
				recommend_switch: 0
			}, mapGetters(['isLogin'])),

		},
		onReachBottom() {
			this.get_host_product();
		},
		onLoad() {
			this.init()
			this.getBanner()
		},
		methods: {
			async getBanner() {
				let {
					data
				} = await getCarouselImage({type: 2})
				this.bannerList = data
			},
			init() {
				this.get_host_product()
				this.getCategory()
				this.getNoticeList()

			},
			async getSpuTopList() {
				spuTopList({
					cate_pid: 0
				}).then(res => {
					this.spuTopList = res.data
				})
			},
			async getNoticeList() {
				let data = await noticeList({
					page: 1,
					limit: 5
				})
				this.notice = data.data.list
			},
			goIndex() {
				uni.switchTab({
					//#ifdef APP
					"url": "/pages/short_video/appSwiper/index",
					//#endif	
					//#ifndef APP
					"url": "/pages/short_video/nvueSwiper/index",
					//#endif
				})
			},
			async getCategory() {
				let {
					data
				} = await getCategoryList()
				this.hotList = data.hot.slice(0, 4);
			},
			/**
			 * 获取我的推荐
			 */
			get_host_product: function() {
				let that = this;
				if (that.hotScroll) return
				getProductHot(
					that.hotPage,
					that.hotLimit,
				).then(res => {
					that.hotPage++
					that.hotScroll = res.data.length < that.hotLimit
					that.hostProduct = that.hostProduct.concat(res.data.list)
				});
			},

			goPage(item) {
				if (item.link_type == 3) {
					uni.navigateTo({
						url: '/pages/goods_details/index?id=' + item.target_id
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top_flex {
		display: flex;
		width: 100%;
		align-items: center;

		.input {
			background-color: #fff;
			padding: 0 26rpx;
			height: 64rpx;
			line-height: 64rpx;
			border-radius: 50rpx;
			font-size: 28rpx;
			width: 100%;
			margin: 0 20rpx;
		}

	}

	.content {

		.bg {
			width: 100%;
			position: absolute;
		}

		.block {
			margin: 0 20rpx;
			border-radius: 20rpx;
			position: relative;

			.rice {
				width: 100%;
			}

			.item {
				background-color: #fff;
				margin: 10rpx 0 20rpx;
				padding: 30rpx;
				border-radius: 20rpx;
				display: flex;
				align-items: center;

				.new-iconfont {
					margin-right: 10rpx;
					background-image: linear-gradient(137.83deg, rgba(255, 230, 140, 1), rgba(220, 170, 90, 1) 100%);
					-webkit-background-clip: text;
					background-clip: text;
					color: transparent;
				}

				.notice-content {
					display: flex;
					width: calc(100% - 42rpx);

					text {
						width: calc(100% - 100rpx);
						margin-left: 10rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}

				.classify-content {
					width: 20%;
					text-align: center;
					font-size: 22rpx;
					color: #333;

					.img {
						width: 80rpx;
						height: 80rpx;
						margin-bottom: 10rpx;
						border-radius: 50%;
					}
				}

			}

			.nextpage {

				display: flex;
				justify-content: space-between;

				image {
					width: calc(50% - 10rpx);
					// height: 160rpx;
				}
			}

			.specials {

				margin-top: 20rpx;
				padding-bottom: 20rpx;
				border-radius: 30rpx;
				box-shadow: inset 1px 1px 1px 0px rgba(255, 255, 255, 0.25);
				background: linear-gradient(180.00deg, rgba(255, 247, 215, 1), rgba(255, 255, 255, 1) 29%, rgba(255, 255, 255, 1) 100%);

				.specials-top {


					display: flex;
					justify-content: space-between;
					padding: 30rpx;

					.title {
						font-size: 32rpx;

					}

					.more {
						display: flex;
						text-align: center;
						align-items: center;
					}
				}

				.specials-mid {


					display: flex;
					align-items: center;
					text-align: center;

					.mid-content {
						width: 25%;

						.specials-img {
							width: 90rpx;
							height: 90rpx;
						}

						.price {

							font-size: 16rpx;
							color: rgba(254, 81, 81, 1);

							text {
								font-size: 24rpx;
								font-weight: bold;
							}
						}
					}
				}
			}

			.bottom {
				font-size: 32rpx;
				margin-top: 40rpx;
			}
		}
	}
</style>