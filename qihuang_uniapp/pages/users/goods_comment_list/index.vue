<template>
	<view :style="viewColor">
		<view class='evaluate-list'>
			<view class='generalComment acea-row row-between-wrapper'>
				<view class='acea-row row-middle t-color'>
					<view class='evaluate'>评分</view>
					<view class="star-box">
						<view class="star">
							<view class="star-active" :class="'star'+keyColor" :style="'width:'+replyData.star+';background-image: url('+domain+'/static/diy/score1'+keyColor+'.png)'"></view>
						</view>
					</view>
				</view>
				<view><text class='t-color'>{{replyData.rate}}</text>好评率</view>
			</view>
			<view class='nav acea-row row-middle' v-if="replyData.stat">
				<view class='item' :class='type=="count" ? "b-color":""' @click='changeType("count")'>全部({{replyData.stat.count}})</view>
				<view class='item' :class='type=="best" ? "b-color":""' @click='changeType("best")'>好评({{replyData.stat.best}})</view>
				<view class='item' :class='type=="middle" ? "b-color":""' @click='changeType("middle")'>中评({{replyData.stat.middle}})</view>
				<view class='item' :class='type=="negative" ? "b-color":""' @click='changeType("negative")'>差评({{replyData.stat.negative}})</view>
			</view>
			<userEvaluation :reply="reply"></userEvaluation>
			<view class='loadingicon acea-row row-center-wrapper' v-if="reply.length > 0">
				<text class='loading iconfont icon-jiazai' :hidden='loading==false'></text>{{loadTitle}}
			</view>
		</view>
		<view class='noCommodity' v-if="reply.length == 0">
			<view class='pictrue'>
				<image :src="`${domain}/static/images/no_commen.png`"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import { getReplyList } from '@/api/store.js';
	import userEvaluation from '@/components/userEvaluation';
	import { mapGetters } from "vuex";
	import { HTTP_REQUEST_URL } from '@/config/app';
	export default {
		components: {
			userEvaluation
		},
		computed: mapGetters(['viewColor','keyColor']),
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				replyData: {},
				product_id: 0,
				reply: [],
				type: "count",
				loading: false,
				loadend: false,
				loadTitle: '加载更多',
				page: 1,
				limit: 20
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let that = this;
			if (!options.product_id) return that.$util.Tips({
				title: '缺少参数'
			}, {
				tab: 3,
				url: 1
			});
			that.product_id = options.product_id;
		},
		onShow: function() {
			this.getProductReplyList();
		},
		methods: {
			/**
			 * 分页获取评论
			 */
			getProductReplyList: function() {
				let that = this;
				if (that.loadend) return;
				if (that.loading) return;
				that.loading = true;
				that.loadTitle = '';
				getReplyList(that.product_id, {
					page: that.page,
					limit: that.limit,
					type: that.type,
				}).then(res => {
					let list = res.data.list,
						loadend = list.length < that.limit;
					that.reply = that.$util.SplitArray(list, that.reply);
					that.$set(that,'reply',that.reply);
					that.$set(that,'replyData',res.data)
					that.loading = false;
					that.loadend = loadend;
					that.loadTitle = loadend ? "😕人家是有底线的~~" : "加载更多";
					that.page = that.page + 1;
				}).catch(err => {
					that.loading = false,
					that.loadTitle = '加载更多'
				});
			},
			/*
			 * 点击事件切换
			 * */
			changeType: function(e) {
				let type = e
				if (type == this.type) return;
				this.type = type;
				this.page = 1;
				this.loadend = false;
				this.$set(this,'reply',[]);
				this.getProductReplyList();
			}
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.getProductReplyList();
		},
		// 滚动监听
		onPageScroll(e) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			uni.$emit('scroll');
		},
	}
</script>

<style lang="scss">
	page{background-color:#fff;}
	.evaluate-list .generalComment{height:94rpx;padding:0 30rpx;margin-top:1rpx;background-color:#fff;font-size:28rpx;color:#808080;}
	.evaluate-list .generalComment .evaluate{margin-right:7rpx;}
	.evaluate-list .nav{font-size:24rpx;color:#282828;padding:0 30rpx 32rpx 30rpx;background-color:#fff;border-bottom:1rpx solid #f5f5f5;}
	.evaluate-list .nav .item{
		font-size:24rpx;color:#282828;border-radius:6rpx;height:54rpx;padding:0 20rpx;
		background-color:#f4f4f4;line-height:54rpx;margin-right:17rpx;
		&.b-color{
			background-color:var(--view-theme);
			color: #fff;
		}
	}	
	.noCommodity .pictrue{margin: 0 auto;}
	.t-color{color:var(--view-theme);}
	.star-box {
		display: flex;
		align-items: center;
		margin-left: 10rpx;
		.star {
			position: relative;
			width: 111rpx;
			height: 19rpx;
			background: url(~pages/columnGoods/images/star.png);
			background-size: 111rpx 19rpx;
		}
		.star-active {
			position: absolute;
			left: 0;
			top: 0;
			width: 111rpx;
			height: 19rpx;
			overflow: hidden;
			background-image: url(~pages/columnGoods/images/star_active.png);
			background-size: 111rpx 19rpx;
			&.star_purple{
				background-image: url(~pages/columnGoods/images/star_active_purple.png);
			}
		}
		.num {
			color: $theme-color;
			font-size: 24rpx;
			margin-left: 10rpx;
		}
	}
	.evaluateWtapper .easy-loadimage {
		width: 160rpx;
		height: 160rpx;
	}
	
</style>
