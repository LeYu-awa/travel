<template>
	<view class="wrap">
		<view class='collectionGoods' v-if="list.length">
			<view class='item acea-row row-between-wrapper' v-for="(item,index) in list" :key="index">
				<view class="left acea-row row-between-wrapper">
					<view class='pictrue'>
						<easy-loadimage mode="widthFix" :image-src="item.gift_image"></easy-loadimage>
					</view>
				</view>
				<view class='text acea-row row-column-between'>
					<view class='name'>
						<view class="name_text">
							直播间名称：{{item.title}}
						</view>
					</view>
					<view class='name'>
						<view class="name_text">
							礼物名称：{{item.gift_name}}
						</view>
					</view>
					<view class='acea-row row-between-wrapper'>
						<view class='money'><text>￥</text>{{item.money}}</view>
					</view>
				</view>
			</view>
			<view class='loadingicon acea-row row-center-wrapper'>
				<text class='loading iconfont icon-jiazai' :hidden='loading==false'></text>{{loadTitle}}
			</view>
		</view>
		<view class='noCommodity' v-if="!list.length">
			<view class='pictrue'>
				<image :src="`${domain}/static/images/noCart.png`"></image>
				<view>暂无赠送记录</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex";
	import {
		HTTP_REQUEST_URL
	} from '@/config/app';
	import {
		getGiftLog,
	} from '@/api/sendGift.js';
	export default {
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				loadTitle: '加载更多',
				loading: false,
				loadend: false,
				limit: 20,
				page: 1,
				list: []
			}
		},
		computed: {
			...mapGetters(['isLogin'])
		},
		onLoad() {
			if (this.isLogin) {
				this.getList()
			} else {
				toLogin()
			}
		},
		methods: {
			getList() {
				let that = this;
				if (that.loading) return;
				if (that.loadend) return;
				that.loading = true;
				that.loadTitle = "";
				getGiftLog({
					page: that.page,
					limit: that.limit
				}).then(res => {
					that.total = res.data.count;
					let list = res.data.result;
					let loadend = list.length < that.limit;
					that.list = that.$util.SplitArray(list, that.list);
					that.$set(that, 'list', that.list);
					that.loadend = loadend;
					that.loadTitle = loadend ? '我也是有底线的' : '加载更多';
					that.page = that.page + 1;
					that.loading = false;
				}).catch(err => {
					that.loading = false;
					that.loadTitle = "加载更多";
				});
			}
		},
		onReachBottom() {
			this.getList()
		},
	}
</script>

<style lang="scss" scoped>
	.collectionGoods .item {
		margin-left: 30rpx;
		padding: 25rpx 30rpx 30rpx 0;
		border-bottom: 1px solid #eee;
	}

	.collectionGoods .item .pictrue {
		width: 160rpx;
		height: 160rpx;
		position: relative;
	}

	/deep/.collectionGoods .item .pictrue image,
	/deep/.collectionGoods .item .easy-loadimage,
	.collectionGoods .item uni-image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}

	.collectionGoods .item .text {
		width: 500rpx;
		height: 160rpx;
		font-size: 28rpx;
		color: #282828;

		&.edit {
			width: 430rpx;
		}
	}

	.collectionGoods .item .text .name {
		width: 100%;
		display: flex;
		align-items: center;
		font-size: 28rpx;
	}

	.collectionGoods .item .name_text {
		display: inline-block;
		max-width: 480rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: 28rpx;
	}

	.collectionGoods .item .text .money {
		font-size: 30rpx;
		font-weight: bold;
		color: var(--view-priceColor);

		text {
			font-size: 20rpx;
		}

		
	}

	.noCommodity {
		padding-top: 1rpx;
		border-top: 0;
		min-height: 90vh;
		margin-top: 90rpx;
	}

	.noCommodity .pictrue {
		text-align: center;
		padding: 0;
		margin: 78rpx auto 26rpx auto;
	}
</style>