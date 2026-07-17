<template>
	<view>
		<view class='searchGood'>
			<view class='search acea-row row-between-wrapper'>
				<view class='input acea-row row-between-wrapper'>
					<text class='iconfont icon-sousuo2'></text>
					<input type='text' :value='searchValue' :focus="focus" placeholder='点击搜索商品、店铺名称' placeholder-class='placeholder'
					 @input="setValue"></input>
				</view>
				<view class='bnt' @tap='searchBut'>搜索</view>
			</view>
			<view class='title'>历史记录 <text class="iconfont icon-shanchu" @click="remove"></text></view>
			<view class='list acea-row' :style="{'height':historyBox?'auto':'150rpx'}" v-if="historyList.length > 0">
				<block v-for="(item,index) in historyList" :key="index">
					<view class='item line1' @tap='setHotSearchValue(item,0)'>{{item}}</view>
				</block>
			</view>
			<view>
				<view class="more-btn" v-if="historyList.length>9 && !historyBox" @click="historyBox = true">
					展开全部<text class="iconfont icon-xiangxia"></text>
				</view>
				<view class="more-btn" v-if="historyList.length>9 && historyBox" @click="historyBox = false">
					收起<text class="iconfont icon-xiangshang"></text>
				</view>
			</view>
			<view v-if="historyList.length == 0" style="text-align: center; color: #999;">暂无搜索历史~</view>
			<view class='title'>热门搜索</view>
			<view class='list acea-row' :style="{'height': hotSearchBox?'auto':'150rpx'}">
				<block v-for="(item,index) in hotSearchList" :key="index">
					<view class='item line1' @tap='setHotSearchValue(item,1)'>{{item.keyword}}</view>
				</block>
			</view>
			<view>
				<view class="more-btn" v-if="hotSearchList.length>8 && !hotSearchBox" @click="hotSearchBox = true">
					展开全部<text class="iconfont icon-xiangxia"></text>
				</view>
				<view class="more-btn" v-if="hotSearchList.length>8 && hotSearchBox" @click="hotSearchBox = false">
					收起<text class="iconfont icon-xiangshang"></text>
				</view>
			</view>
			<!--今日热搜模块-->
			<view class="search-hot">
				<scroll-view v-if="isShow" scroll-x="true" style="white-space: nowrap; display: flex;" scroll-with-animation show-scrollbar="true">
					<view v-if="daySearchList.length>0" class="scroll-count">
						<view class="scroll-item" :style="{'background-image':`url(${domain}/static/images/search-title-bg.png)`}">
							<view class="search-title">
								<image :src="`${domain}/static/images/search-title-icon.png`" class="title-icon"></image>
								<text>今日热搜</text>
							</view>
							<view class="search-list">
								<navigator v-for="(item,index) in daySearchList" :url="`/pages/goods_details/index?id=${item.product_id}`" hover-class="none" class="search-item">
									<block v-if="index<3">
										<view class="picture">
											<image :src="item.image" class="image"></image>
											<text class="list-num num-pic" :style="{'background-image':`url(${domain}/static/images/search-list${index+1}.png)`}">{{index+1}}</text>
										</view>
										<view class="list-info">
											<view class="title line1">{{item.store_name}}</view>
											<view class="info line1">{{item.store_info}}</view>
										</view>
									</block>
									<block v-else>
										<view class="list-more">
											<view class="list-num" :style="{'background-image':`url(${domain}/static/images/search-list.png)`}">{{index+1}}</view>
											<view class="title line1 titleml">{{item.store_name}}</view>
										</view>
									</block>
								</navigator>
							</view>
						</view>
					</view>
					<!--热销排行-->
					<view v-for="(item,index) in hotRankList" class="scroll-count">
						<view class="scroll-item" :style="{'background-image':`url(${domain}/static/images/search-title-bg.png)`}">
							<view class="search-title">
								<image :src="`${domain}/static/images/search-title-icon.png`" class="title-icon"></image>
								<text>{{item.cate_name}}</text>
							</view>
							<view class="search-list">
								<navigator v-for="(itm,idx) in item.list" :url="`/pages/goods_details/index?id=${itm.product_id}`" hover-class="none" class="search-item">
									<block v-if="idx<3">
										<view class="picture">
											<image :src="itm.image" class="image"></image>
											<text class="list-num num-pic" :style="{'background-image':`url(${domain}/static/images/search-list${idx+1}.png)`}">{{idx+1}}</text>
										</view>
										<view class="list-info">
											<view class="title line1">{{itm.store_name}}</view>
											<view class="info line1">{{itm.store_info}}</view>
										</view>
									</block>
									<block v-else>
										<view class="list-more">
											<view class="list-num" :style="{'background-image':`url(${domain}/static/images/search-list.png)`}">{{idx+1}}</view>
											<view class="title line1 titleml">{{itm.store_name}}</view>
										</view>
									</block>
								</navigator>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="search-hot-switch">
					<view v-if="isShow" class="switch" @click="isShow=!isShow">
						<text class="iconfont icon-xianshizhuangtai"></text>
						<text>隐藏热搜榜</text>
					</view>
					<view v-else class="switch" @click="isShow=!isShow">
						<text class="iconfont icon-yincangzhuangtai"></text>
						<text>开启热搜榜</text>
					</view>
				</view>
			</view>
		</view>
		<!-- #ifndef H5 -->
		<passwordPopup></passwordPopup>
		<!-- #endif -->
	</view>
</template>

<script>
	import { getSearchKeyword,copyPasswordSearch,getTodayHotSearch,getHotRanking } from '@/api/store.js';
	import shareScence from '@/libs/spread';
	import { silenceBindingSpread } from '@/utils';
	import { goShopDetail } from '@/libs/order.js';
	import { initiateAssistApi } from '@/api/activity.js';
	import { mapGetters } from 'vuex';
	import { HTTP_REQUEST_URL } from '@/config/app';
	// #ifndef H5
	import passwordPopup from '@/components/passwordPopup';
	// #endif
 import { toLogin } from '@/libs/login.js';
	export default {
		computed: mapGetters(['isLogin', 'uid']),
		components: {
			// #ifndef H5
			passwordPopup,
			// #endif
		},
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				hostProduct: [],
				searchValue: '',
				focus: true,
				bastList: [],
				hotSearchList: [],
				daySearchList: [],
				hotRankList: [],
				first: 0,
				limit: 8,
				page: 1,
				loading: false,
				loadend: false,
				loadTitle: '加载更多',
				hotPage: 1,
				isScroll: true,
				// 搜索历史
				historyList: [],
				// 临时搜索列表
				tempStorage: [],
				historyBox: false,
				hotSearchBox: false,
				mainWidth: 960,
				isShow: true,
			};
		},
		onLoad(options) {
			this.searchValue = options.searchVal || ''
		},
		onShow: function() {
			try {
				this.historyList = []
				this.tempStorage = []
				let arr = uni.getStorageSync('historyList')
				if (arr.length > 0) {
					this.historyList = arr
				} else {
					this.historyList = []
				}
				this.tempStorage = this.historyList
			} catch (e) {}
			this.getRoutineHotSearch();
			this.getHotSearchList();
			this.getHotRankingList();
		},
		methods: {
			// 清空历史记录
			remove() {
				let self = this
				uni.showModal({
					title: '提示',
					content: '确认删除全部历史搜索记录？',
					success: function(res) {
						if (res.confirm) {
							self.tempStorage = []
							try {
								uni.setStorageSync('historyList', self.tempStorage)
								self.historyList = []
							} catch (e) {}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			getRoutineHotSearch: function() {
				let that = this;
				getSearchKeyword().then(res => {
					that.$set(that, 'hotSearchList', res.data);
				});
			},
			/*今日热搜*/
			getHotSearchList(){
				getTodayHotSearch().then(res => {
					this.$set(this, 'daySearchList', res.data);
				});
			},
			/*热销排行*/
			getHotRankingList(){
				getHotRanking().then(res => {
					this.$set(this, 'hotRankList', res.data);
				});
			},
			setHotSearchValue: function(event, key) {
				this.focus = false
				if (key) {
					this.$set(this, 'searchValue', event.keyword);
				} else {
					this.$set(this, 'searchValue', event);
				}
				this.$nextTick(() => {
					this.focus = true
				})
				this.searchBut()
			},
			setValue: function(event) {
				this.$set(this, 'searchValue', event.detail.value);
			},
			searchBut: function() {
				if(/^(\/@[1-9]{1}).*\*\//.test(this.searchValue)){
					uni.showLoading({
						title: '加载中',
						mask: true
					});
					copyPasswordSearch({key: this.searchValue}).then(res => {
						uni.hideLoading();
						let item = res.data
						shareScence(res.data.user.uid, this.isLogin);
						//#ifdef H5
						this.isLogin && silenceBindingSpread();
						//#endif
						goShopDetail(item, this.uid).then(res => {
							if (this.isLogin) {
								initiateAssistApi(item.activity_id)
									.then(res => {
										let id = res.data.product_assist_set_id;
										uni.hideLoading();
										uni.navigateTo({
											url: '/pages/activity/assist_detail/index?id=' + id
										});
										
									})
									.catch(err => {
										uni.showToast({
											title: err,
											icon: 'none'
										});
									});
							} else {
                toLogin()
							}
						})
					}).catch(err => {
						uni.showToast({
							title: err,
							icon: 'none'
						});
						this.searchValue = ""
					});
				}else{
					let status = false
					this.tempStorage.forEach((el, index) => {
						if (el == this.searchValue) {
							status = true
						}
					})
					if (!status && this.searchValue) {
						this.tempStorage.unshift(this.searchValue)
					}
					try {
						uni.setStorageSync('historyList', this.tempStorage);
					} catch (e) {}
					uni.navigateTo({
						url: '/pages/columnGoods/goods_search_con/index?searchValue=' + this.searchValue
					})
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}
</style>
<style lang="scss">
	.searchGood .search {
		padding-left: 30rpx;
	}
	.searchGood .search {
		margin-top: 20rpx;
	}
	.searchGood .search .input {
		width: 598rpx;
		background-color: #f7f7f7;
		border-radius: 33rpx;
		padding: 0 35rpx;
		box-sizing: border-box;
		height: 66rpx;
	}
	.searchGood .search .input input {
		width: 472rpx;
		font-size: 28rpx;
	}
	.searchGood .search .input .placeholder {
		color: #bbb;
	}
	.searchGood .search .input .iconfont {
		color: #000;
		font-size: 35rpx;
	}
	.searchGood .search .bnt {
		width: 120rpx;
		text-align: center;
		height: 66rpx;
		line-height: 66rpx;
		font-size: 30rpx;
		color: #282828;
	}
	.searchGood .title {
		position: relative;
		font-size: 28rpx;
		color: #282828;
		margin: 50rpx 30rpx 25rpx 30rpx;
		.icon-shanchu {
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			color: #999;
		}
	}
	.searchGood .list {
		padding: 0 10rpx;
		overflow: hidden;
	}
	.searchGood .list .item {
		font-size: 26rpx;
		color: #666;
		padding: 0 21rpx;
		height: 60rpx;
		background: rgba(242, 242, 242, 1);
		border-radius: 22rpx;
		line-height: 60rpx;
		margin: 0 0 20rpx 20rpx;
		max-width: 150rpx;
	}
	.searchGood .line {
		border-bottom: 1rpx solid #eee;
		margin: 20rpx 30rpx 0 30rpx;
	}
	.more-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 0 20rpx 20rpx;
		height: 60rpx;
		font-size: 24rpx;
		color: #999;
		.iconfont {
			font-size: 22rpx;
			margin-left: 10rpx;
		}
	}
	.search-hot{
		padding: 0 30rpx 30rpx;
		padding-bottom: calc(30rpx + constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		padding-bottom: calc(30rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		scroll-view{
			width:100%;
		}
		/deep/.uni-scroll-view-content{
			display: flex;
		}
	}
	.scroll-item{
		border: 1px solid #FFECEC;
		border-radius: 16rpx;
		background-repeat: no-repeat;
		background-size: 100% auto;
		height: 980rpx;
	}
	.scroll-count{
		display: inline-block;
		width: 450rpx;
		margin-right: 30rpx;
		vertical-align:top;
		&:last-child{
			margin-right: 0;
		}
		.search-title{
			padding: 20rpx 20rpx 32rpx;
			color: #E93323;
			font-size: 28rpx;
			font-weight: bold;
			display: flex;
			align-items: center;
			.title-icon{
				width: 30rpx;
				height: 30rpx;
				margin-right: 10rpx;
			}		
		}
		.search-list{
			padding: 0 20rpx 40rpx;
			position: relative;
			top: -15rpx;
		}
		.search-item{
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			&:nth-child(n+3){
				margin-bottom: 0;
			}
			.list-more{
				display: flex;
				align-items: center;
				margin-top: 40rpx;
			}
			.picture{
				width: 106rpx;
				height: 106rpx;
				border-radius: 10rpx;
				position: relative;
				.image{
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}
			.list-info{
				max-width: 260rpx;
				margin-left: 20rpx;
			}
			.title{
				margin: 0;
				color: #282828;
				font-size: 26rpx;
				&.titleml{
					margin-left: 15rpx;
					max-width: 360rpx;
				}
			}
			.info{
				font-size: 22rpx;
				color: #999999;
			}
		}
		.list-num{
			width: 28rpx;
			height: 31rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 20rpx;
			color: #ffffff;
			background-size: 100% 100%;
			&.num-pic{
				position: absolute;
				top: 0;
				left: 0;
			}
		}
	}
	.search-hot-switch{
		margin-top: 20rpx;
		.switch{
			border: 1px solid #CCCCCC;
			border-radius: 22rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 174rpx;
			height: 43rpx;
			color: #666666;
			font-size: 20rpx;
			.iconfont{
				font-size: 24rpx;
				margin-right: 10rpx;
				position: relative;
				// top: 1rpx;
			}
		}
		
	}
</style>