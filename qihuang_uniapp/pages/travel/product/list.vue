<template>
	<view class="travel-product-list">
		<view class="search-wrap">
			<input
				v-model.trim="keyword"
				class="search-input"
				type="text"
				placeholder="搜索旅游产品"
				confirm-type="search"
				@confirm="onSearch"
			/>
			<view class="search-btn" @tap="onSearch">搜索</view>
		</view>

		<view class="list-wrap">
			<view
				v-for="item in list"
				:key="item.id"
				class="product-item"
				@tap="goDetail(item.id)"
			>
				<image class="cover" :src="getProductImage(item)" mode="aspectFill"></image>
				<view class="info">
					<text class="name">{{ item.name || '未命名线路' }}</text>
					<text class="meta">{{ item.days || 0 }}天{{ item.nights || 0 }}晚</text>
					<view class="price-row">
						<text class="price-label">起</text>
						<text class="price">¥{{ formatMoney(getMinPrice(item)) }}</text>
					</view>
				</view>
			</view>

			<view v-if="!loading && list.length === 0" class="empty">暂无产品</view>
			<view v-if="loading" class="loading">加载中...</view>
			<view v-if="finished && list.length > 0" class="finished">没有更多了</view>
		</view>
	</view>
</template>

<script>
import { travelProductList } from '@/api/travel.js'

export default {
	data() {
		return {
			keyword: '',
			page: 1,
			limit: 10,
			loading: false,
			finished: false,
			list: []
		}
	},
	onLoad() {
		this.resetAndLoad()
	},
	onPullDownRefresh() {
		this.resetAndLoad().finally(() => uni.stopPullDownRefresh())
	},
	onReachBottom() {
		if (!this.loading && !this.finished) {
			this.getList()
		}
	},
	methods: {
		formatMoney(val) {
			const num = Number(val || 0)
			return num.toFixed(2)
		},
		getProductImage(item) {
			if (Array.isArray(item.images) && item.images.length) return item.images[0]
			if (typeof item.images === 'string') {
				try {
					const arr = JSON.parse(item.images)
					if (Array.isArray(arr) && arr.length) return arr[0]
				} catch (e) {}
			}
			return item.image || '/static/images/f.png'
		},
		getMinPrice(item) {
			// 优先展示团期最低价
			const minDepPrice = Number(item.min_departure_price || 0)
			if (minDepPrice > 0) {
				return minDepPrice
			}
			// 兜底使用产品基础价格
			const prices = [
				item.adult_price,
				item.child_price,
				item.big_child_price,
				item.mid_child_price,
				item.small_child_price
			]
				.map(v => Number(v || 0))
				.filter(v => v > 0)
			return prices.length ? Math.min.apply(null, prices) : 0
		},
		async resetAndLoad() {
			this.page = 1
			this.finished = false
			this.list = []
			await this.getList()
		},
		async getList() {
			if (this.loading || this.finished) return
			this.loading = true
			try {
				const res = await travelProductList({
					page: this.page,
					limit: this.limit,
					name: this.keyword
				})
				const rows = Array.isArray(res.data) ? res.data : []
				this.list = this.list.concat(rows)
				this.finished = rows.length < this.limit
				if (!this.finished) this.page += 1
			} catch (e) {
				uni.showToast({ title: e.message || '加载失败', icon: 'none' })
			} finally {
				this.loading = false
			}
		},
		onSearch() {
			this.resetAndLoad()
		},
		goDetail(id) {
			uni.navigateTo({ url: `/pages/travel/product/detail?id=${id}` })
		}
	}
}
</script>

<style lang="scss" scoped>
.travel-product-list {
	padding: 20rpx;

	.search-wrap {
		background: #fff;
		border-radius: 16rpx;
		padding: 18rpx;
		display: flex;
		gap: 16rpx;
		margin-bottom: 20rpx;

		.search-input {
			flex: 1;
			height: 68rpx;
			background: #f5f5f5;
			border-radius: 10rpx;
			padding: 0 20rpx;
			font-size: 26rpx;
		}

		.search-btn {
			width: 120rpx;
			height: 68rpx;
			line-height: 68rpx;
			text-align: center;
			background: #e93323;
			color: #fff;
			border-radius: 10rpx;
			font-size: 26rpx;
		}
	}

	.list-wrap {
		.product-item {
			background: #fff;
			border-radius: 16rpx;
			padding: 20rpx;
			display: flex;
			margin-bottom: 18rpx;

			.cover {
				width: 180rpx;
				height: 180rpx;
				border-radius: 12rpx;
				background: #f2f2f2;
			}

			.info {
				flex: 1;
				margin-left: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.name {
					font-size: 30rpx;
					font-weight: 600;
					color: #222;
					line-height: 1.4;
				}

				.meta {
					font-size: 24rpx;
					color: #888;
				}

				.price-row {
					display: flex;
					align-items: baseline;
					gap: 8rpx;

					.price-label {
						font-size: 24rpx;
						color: #e93323;
					}

					.price {
						font-size: 34rpx;
						color: #e93323;
						font-weight: 700;
					}
				}
			}
		}
	}

	.empty,
	.loading,
	.finished {
		text-align: center;
		color: #999;
		font-size: 24rpx;
		padding: 36rpx 0;
	}
}
</style>
