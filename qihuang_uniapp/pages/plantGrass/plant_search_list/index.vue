<template>
	<view :style="viewColor">
		<view class="main">
			<view class='search acea-row row-between-wrapper'>
				<view class='input acea-row row-between-wrapper'>
					<text class='iconfont icon-sousuo2'></text>
					<input type='text' v-model="where.keyword" :focus="focus" placeholder='请输入关键字' placeholder-class='placeholder' @input="setValue" confirm-type="search" @confirm="searchBut()"></input>
					<i v-if="where.keyword" class="iconfont icon-guanbi1 icon-zhanwei" @click="where.keyword = ''"></i>
					<i v-else class="iconfont icon-zhanwei"></i>
				</view>
				<view class='bnt' @tap='searchBut'>搜索</view>
			</view>
			<view class="search-tabs acea-row">
				<view v-for="(item,index) in tabList" :key="index" @click="getList(item,index)" class="item" :class="{on : activeIndex == index}">{{item.title}}</view>
			</view>
			<view v-if="activeIndex == 2" class="tab-cont">
				<view class="author-wrap">
					<view class="user_plant_item" v-for="(item,index) in goods" :key="index" @click="goAuthor(item)">
						<image :src="(item.avatar) || '/static/images/f.png'" mode=""></image>
						<view class="info">
							<view class="line1">
								<text class="name line1">{{item.nickname}}</text>
							</view>
							<view class="acea-row plant-des">
								<view class="des">
									内容<text>{{(item.count_content<10000&&item.count_content>0) ? item.count_content : item.count_content>1000 ? (item.count_content/10000).toFixed(2)+'万' : 0}}</text>
								</view>
								<view class="des">
									粉丝<text>{{(item.count_fans<10000&&item.count_fans>0) ? item.count_fans : item.count_fans>1000 ? (item.count_fans/10000).toFixed(2)+'万' : 0}}</text>
								</view>
							</view>
							<view class="btn" :class="!item.is_following_author ? 'focusBtn' : ''" @click.stop="focusToggle(item)">
								<text v-if="!item.is_following_author" class="iconfont icon-jiahao2"></text>
								{{item.is_following_author ? '已关注' : '关注'}}
							</view>
						</view>
					</view>
				</view>
				<view :hidden="!loading" class="acea-row row-center-wrapper loadingicon">
					<text class="iconfont icon-jiazai loading"></text>
				</view>
				<emptyPage v-if="authorList.length == 0 && !loading" title="暂无作者~"></emptyPage>
			</view>
			<view v-else class="tab-cont">
				<view v-if="goods.length" class="goods-wrap">
					<view class="goods">
						<WaterfallsFlow :wfList='goods' :isFind="false" :isAuth="0" @itemTap="itemTap"/>
					</view>
				</view>
			</view>
			<view :hidden="!loading" class="acea-row row-center-wrapper loadingicon">
				<text class="iconfont icon-jiazai loading"></text>
			</view>
			<emptyPage v-if="goods.length == 0 && !loading" title="暂无内容~"></emptyPage>
		</view>
	</view>
</template>

<script>
	import WaterfallsFlow from '@/components/plantWaterfallsFlow/WaterfallsFlow.vue'
	import { graphicLstApi, followAuthorApi } from '@/api/community.js';
	import {
		unfollowUser,
		followUser
	} from "@/api/index.js"
	import { toLogin } from '@/libs/login.js';
	import { mapGetters } from "vuex";
	import { configMap } from '@/utils';
	import emptyPage from '@/components/emptyPage.vue'
	const app = getApp();
	export default {
		components: {
			emptyPage,
			WaterfallsFlow,
		},
		data() {
			return {
				focus: false,
				goods: [],
				authorList: [
					{avatar: "",nickname: '爱吃酥脆紫菜的小西', count: 35, count_fans: 0, is_fans: 1},
					{avatar: "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKZw2XnQEyK8f1BIcNGVegibE9tPZBtjyu0AgyaPDEEwmyZnWydhXwXUnbrtGnXmam6WTzichTBcLgQ/132",nickname: '猪猪甜甜圈', count: 35, count_fans: 951, is_fans: 0},
					{avatar: "",nickname: '爱吃酥脆紫菜的小西', count: 35, count_fans: 951, is_fans: 1},
				],
				keyword: '',
				loaded: false,
				loading: false,
				loadTitle: '加载更多',
				where: {
					keyword: "",
					search_type: "all",
					page: 1,
					limit: 30,
					topic_id: ''
				},
				searchValue: "",
				activeIndex: 0,
				activeType: 'all',
				tabList:[
					{title: "全部", value: 0, type: "all"},
					{title: "内容", value: 1, type: "content"},
					{title: "用户", value: 2, type: "user"},
				]
			}
		},
		created() {},
		computed: {
			...mapGetters(['isLogin', 'uid', 'viewColor']),
			...configMap({community_status: 0})
		},
		watch: {},
		onLoad: function(options) {
			this.where.keyword = this.searchValue =  options.searchValue ? options.searchValue : ''
			this.where.topic_id = options.id ? options.id : ''
			this.getGoods();
		},
		onShow() {},
		mounted: function() {},
		methods: {
			setValue: function(event) {
				// this.$set(this.where, 'keyword', event.detail.value);
			},
			searchBut(){
				if(!this.where.keyword){
					return uni.showToast({
						title: '请输入关键字',
						icon: 'none'
					})
				}
				this.loadend = this.loading = false
				this.where.page = 1
				this.goods = []
				this.getGoods()
			},
			goAuthor(item){
				if(this.isLogin && this.community_status==1){
					uni.navigateTo({
						url: '/pages/users/user_index/index?uid='+item.uid
					})	
				}else{
					toLogin()
				}
				
			},
			itemTap(e, index){
				uni.navigateTo({
					url: '/pages/short_video/appSwiper/search-details?key=' + index + '&keyword=' + this.where.keyword + '&search_type=' + this.activeType
				})
			},
			// 获取列表数据
			getList(item,index){
				if(!this.where.keyword){
					return uni.showToast({
						title: '请输入关键字',
						icon: 'none'
					})
				}
				this.activeIndex = index;
				this.activeType = item.type;
				this.where={
					keyword: this.where.keyword,
					search_type: item.type,
					page: 1,
					limit: 30,
					topic_id: ''
				}
				this.goods = []
				this.loadend = false
				this.loading = false
				this.getGoods()
			},
			// 获取社区内容列表
			getGoods: function() {
				let that = this;
				if (that.loadend) return;
				if (that.loading) return;
				that.loading = true;
				that.loadTitle = '';
				graphicLstApi(that.where).then(res => {
					that.loading = false;
					let list = res.data;
					let goodsList = that.$util.SplitArray(list, that.goods);
					let loadend = list.length < that.where.limit;
					that.loadend = loadend;
					that.loading = false;
					that.loadTitle = loadend ? '已全部加载' : '加载更多';
					that.$set(that, 'goods', goodsList);
					that.$set(that.where, 'page', that.where.page + 1);
				}).catch(err => {
					that.loading = false;
					that.goodsLoading = false;
					uni.showToast({
						title: err,
						icon: 'none'
					})
				});
			},
			/*关注*/
			async focusToggle(item){
				
				if (item.is_following_author) {
					await unfollowUser({
						follow_uid: item.uid
					})
					item.count_fans = item.count_fans - 1
				} else {
					await followUser({
						follow_uid: item.uid
					})
					
					item.count_fans = item.count_fans + 1
				}
				item.is_following_author = !item.is_following_author
				// followAuthorApi(item.uid,{status: status}).then(res => {
				// 	if (res.status === 200) {
				// 		item.is_following_author = item.is_following_author ? false : true
				// 		item.count_fans = item.is_following_author ? item.count_fans-- : item.count_fans++
				// 	}
				// 	this.$util.Tips({
				// 		title: res.message
				// 	});
				// }).catch(err => {
				// 	this.$util.Tips({
				// 		title: err
				// 	});
				// });
			},
		},
		onReachBottom() {
			this.getGoods();
		},
		// 滚动监听
		onPageScroll(e) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			uni.$emit('scroll');
		}
	}
</script>

<style lang="scss" scoped>
	@import '../style/main.scss';
	.main .search {
		padding: 20rpx 0 0 10rpx;
	}
	.main .search .input {
		width: 580rpx;
		background-color: #f7f7f7;
		border-radius: 33rpx;
		padding: 0 20rpx 0 30rpx;
		box-sizing: border-box;
		height: 66rpx;
		position: relative;
	}
	.main .search .input input {
		width: 440rpx;
		font-size: 28rpx;
	}
	.main .search .input .placeholder {
		color: #bbb;
	}
	.main .search .input .iconfont {
		color: #000;
		font-size: 35rpx;
	}
	.main .search .input .icon-guanbi1 {
		font-size: 32rpx;
		color: #cccccc;
		
	}
	.main .search .bnt {
		width: 120rpx;
		text-align: center;
		height: 66rpx;
		line-height: 66rpx;
		font-size: 28rpx;
		color: #282828;
	}
	.search-tabs{
		align-items: center;
		padding: 40rpx 30rpx 30rpx;
		.item{
			color: #999999;
			font-size: 30rpx;
			position: relative;
			+.item{
				margin-left: 55rpx;
			}
			&.on{
				color: var(--view-theme);
				font-size: 34rpx;
				font-weight: bold;
				&::after{
					content: "";
					display: block;
					width: 40rpx;
					height: 5rpx;
					background: var(--view-theme);
					position: absolute;
					left: 50%;
					margin-left: -20rpx;
					bottom: -18rpx;
				}
			}
		}
	}
	.author-wrap{
		.focusBtn{
			color: var(--view-theme)!important;
			border-color: var(--view-theme)!important;
	
		}
	}
	.main {
		background: #ffffff;
		padding: 0 20rpx;
		min-height: 100vh;
		.goods-wrap{
			margin-top: 20rpx;
		}
	}
	.goods {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.empty-box{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 0;
		padding-top: 200rpx;
		image{
			width: 414rpx;
			height: 240rpx;
		}
		.txt{
			font-size: 26rpx;
			color: #999;
		}
	}
</style>
