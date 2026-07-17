<template>
	<view class="travel-order-list">
		<scroll-view class="tabs" scroll-x>
			<view
				v-for="item in tabs"
				:key="item.value"
				:class="['tab-item', activeTab === item.value ? 'active' : '']"
				@tap="changeTab(item.value)"
			>{{ item.label }}</view>
		</scroll-view>

		<view class="list-wrap">
			<view v-for="item in list" :key="item.id" class="order-item">
				<view class="top-row">
					<text class="order-sn">{{ item.order_sn }}</text>
					<text class="status">{{ statusText(item.status) }}</text>
				</view>

				<view class="product-row" @tap="goDetail(item.id)">
					<image class="cover" :src="productCover(item)" mode="aspectFill"></image>
					<view class="info">
						<text class="name">{{ item.product ? item.product.name : '旅游产品' }}</text>
						<text class="meta">出发 {{ item.departure ? item.departure.date : '--' }}</text>
						<text class="meta">人数 {{ peopleCount(item) }}</text>
					</view>
				</view>

				<view class="bottom-row">
					<text class="price">¥{{ formatMoney(item.pay_price) }}</text>
					<view class="btn-group">
						<view v-if="item.status === 'pending'" class="btn" @tap="cancelOrder(item.id)">取消</view>
						<view v-if="item.status === 'pending'" class="btn primary" @tap="goPay(item.id)">去支付</view>
						<view class="btn" @tap="goDetail(item.id)">详情</view>
					</view>
				</view>
			</view>

			<view v-if="!loading && list.length === 0" class="empty">暂无订单</view>
			<view v-if="loading" class="loading">加载中...</view>
			<view v-if="finished && list.length > 0" class="finished">没有更多了</view>
		</view>
	</view>
</template>

<script>
import { travelOrderList, travelOrderCancel } from '@/api/travel.js'

export default {
	data() {
		return {
			tabs: [
				{ label: '全部', value: '' },
				{ label: '待支付', value: 'pending' },
				{ label: '待出行', value: 'confirmed' },
				{ label: '已完成', value: 'completed' },
				{ label: '已取消', value: 'cancelled' }
			],
			activeTab: '',
			page: 1,
			limit: 10,
			list: [],
			loading: false,
			finished: false
		}
	},
	onLoad() {
		this.resetAndLoad()
	},
	onPullDownRefresh() {
		this.resetAndLoad().finally(() => uni.stopPullDownRefresh())
	},
	onReachBottom() {
		if (!this.loading && !this.finished) this.getList()
	},
	methods: {
		formatMoney(v) {
			return Number(v || 0).toFixed(2)
		},
		statusText(status) {
			const map = {
				pending: '待支付',
				confirmed: '待出行',
				completed: '已完成',
				cancelled: '已取消',
				refunded: '已退款'
			}
			return map[status] || status || '-'
		},
		peopleCount(item) {
			const adult = Number(item.adult_num || 0)
			const child = Number(item.child_num || 0) + Number(item.big_child_num || 0) + Number(item.mid_child_num || 0) + Number(item.small_child_num || 0)
			return `${adult}成人${child > 0 ? ` ${child}儿童` : ''}`
		},
		productCover(item) {
			const product = item.product || {}
			const raw = product.images
			if (Array.isArray(raw) && raw.length) return raw[0]
			if (typeof raw === 'string') {
				try {
					const arr = JSON.parse(raw)
					if (Array.isArray(arr) && arr.length) return arr[0]
				} catch (e) {}
			}
			return product.image || '/static/images/f.png'
		},
		async resetAndLoad() {
			this.page = 1
			this.list = []
			this.finished = false
			await this.getList()
		},
		async getList() {
			if (this.loading || this.finished) return
			this.loading = true
			try {
				const res = await travelOrderList({
					page: this.page,
					limit: this.limit,
					status: this.activeTab
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
		changeTab(val) {
			if (this.activeTab === val) return
			this.activeTab = val
			this.resetAndLoad()
		},
		goDetail(id) {
			uni.navigateTo({ url: `/pages/travel/order/detail?id=${id}` })
		},
		goPay(id) {
			uni.navigateTo({ url: `/pages/travel/order/pay?id=${id}` })
		},
		cancelOrder(id) {
			uni.showModal({
				title: '取消订单',
				content: '确认取消该订单吗？',
				success: async res => {
					if (!res.confirm) return
					try {
						await travelOrderCancel(id, { reason: '用户主动取消' })
						uni.showToast({ title: '已取消', icon: 'success' })
						this.resetAndLoad()
					} catch (e) {
						uni.showToast({ title: e.message || '取消失败', icon: 'none' })
					}
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.travel-order-list {
	.tabs {
		background: #fff;
		white-space: nowrap;
		padding: 0 10rpx;

		.tab-item {
			display: inline-block;
			font-size: 26rpx;
			color: #666;
			padding: 26rpx 20rpx 20rpx;
			margin: 0 6rpx;
			border-bottom: 4rpx solid transparent;

			&.active {
				color: #e93323;
				border-color: #e93323;
				font-weight: 600;
			}
		}
	}

	.list-wrap {
		padding: 20rpx;
	}

	.order-item {
		background: #fff;
		border-radius: 16rpx;
		padding: 20rpx;
		margin-bottom: 16rpx;

		.top-row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 16rpx;
			border-bottom: 1rpx solid #f2f2f2;

			.order-sn {
				font-size: 24rpx;
				color: #666;
			}

			.status {
				font-size: 24rpx;
				color: #e93323;
			}
		}

		.product-row {
			display: flex;
			padding: 18rpx 0;

			.cover {
				width: 140rpx;
				height: 140rpx;
				border-radius: 10rpx;
				background: #f5f5f5;
			}

			.info {
				flex: 1;
				margin-left: 16rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.name {
					font-size: 28rpx;
					color: #222;
				}

				.meta {
					font-size: 23rpx;
					color: #888;
				}
			}
		}

		.bottom-row {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.price {
				font-size: 32rpx;
				color: #e93323;
				font-weight: 600;
			}

			.btn-group {
				display: flex;
				gap: 12rpx;

				.btn {
					min-width: 120rpx;
					height: 56rpx;
					line-height: 56rpx;
					text-align: center;
					border-radius: 28rpx;
					border: 1rpx solid #ddd;
					font-size: 24rpx;
					color: #666;

					&.primary {
						background: #e93323;
						border-color: #e93323;
						color: #fff;
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
