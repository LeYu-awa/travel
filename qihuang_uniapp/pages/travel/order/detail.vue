<template>
	<view class="travel-order-detail">
		<view class="head-card">
			<text class="sn">订单号 {{ order.order_sn || '-' }}</text>
			<text class="status">{{ statusText(order.status) }}</text>
		</view>

		<view class="card">
			<view class="card-title">订单信息</view>
			<view class="row">
				<text class="label">产品</text>
				<text class="value">{{ order.product ? order.product.name : '-' }}</text>
			</view>
			<view class="row">
				<text class="label">出发日期</text>
				<text class="value">{{ order.departure ? order.departure.date : '-' }}</text>
			</view>
			<view class="row">
				<text class="label">出行人数</text>
				<text class="value">{{ peopleText }}</text>
			</view>
			<view class="row">
				<text class="label">联系人</text>
				<text class="value">{{ order.contact_name || '-' }} {{ order.contact_mobile || '' }}</text>
			</view>
			<view class="row">
				<text class="label">下单时间</text>
				<text class="value">{{ order.create_time || '-' }}</text>
			</view>
			<view class="row">
				<text class="label">应付金额</text>
				<text class="value price">¥{{ formatMoney(order.pay_price) }}</text>
			</view>
		</view>

		<view class="card" v-if="Number(order.contract_required || 0) === 1">
			<view class="card-title">合同信息</view>
			<view class="row clickable" @tap="goContract">
				<text class="label">签约状态</text>
				<view class="right">
					<text class="value">{{ contractText }}</text>
					<text class="arrow">></text>
				</view>
			</view>
		</view>

		<view class="card" v-if="insurances.length > 0">
			<view class="card-title">保险信息</view>
			<view
				v-for="item in insurances"
				:key="item.id"
				class="row clickable"
				@tap="goInsurance(item)"
			>
				<text class="label">{{ item.name || '旅游保险' }}</text>
				<view class="right">
					<text class="value">{{ item.insurance_no || '暂未出单' }}</text>
					<text class="arrow">></text>
				</view>
			</view>
		</view>

		<view class="card" v-if="guestList.length > 0">
			<view class="card-title">出行人</view>
			<view v-for="item in guestList" :key="item.id" class="guest-row">
				<text>{{ item.name }}</text>
				<text>{{ item.id_no }}</text>
			</view>
		</view>

		<view class="bottom-bar">
			<view v-if="order.status === 'pending'" class="btn" @tap="goCancel">取消订单</view>
			<view v-if="order.status === 'pending'" class="btn primary" @tap="goPay">去支付</view>
			<view class="btn" @tap="backList">返回列表</view>
		</view>
	</view>
</template>

<script>
import { travelOrderDetail } from '@/api/travel.js'

export default {
	data() {
		return {
			orderId: 0,
			order: {},
			insurances: [],
			guestList: []
		}
	},
	computed: {
		peopleText() {
			const adult = Number(this.order.adult_num || 0)
			const child =
				Number(this.order.child_num || 0) +
				Number(this.order.big_child_num || 0) +
				Number(this.order.mid_child_num || 0) +
				Number(this.order.small_child_num || 0)
			return `${adult}成人${child > 0 ? ` ${child}儿童` : ''}`
		},
		contractText() {
			if (Number(this.order.contract_required || 0) !== 1) return '无需签约'
			return Number(this.order.contract_signed || 0) === 1 ? '已签署' : '待签署'
		}
	},
	onLoad(options) {
		this.orderId = Number(options.id || 0)
		this.getDetail()
	},
	onShow() {
		if (this.orderId) this.getDetail()
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
		async getDetail() {
			if (!this.orderId) return
			try {
				const res = await travelOrderDetail(this.orderId)
				this.order = res.data || {}
				this.insurances = Array.isArray(this.order.insurances) ? this.order.insurances : []
				this.guestList = Array.isArray(this.order.guests) ? this.order.guests : []
			} catch (e) {
				uni.showToast({ title: e.message || '加载失败', icon: 'none' })
			}
		},
		goContract() {
			uni.navigateTo({ url: `/pages/travel/contract/index?orderId=${this.orderId}` })
		},
		goInsurance(item) {
			if (!item.insurance_no) {
				uni.showToast({ title: '保单暂未生成', icon: 'none' })
				return
			}
			uni.navigateTo({
				url: `/pages/travel/insurance/detail?insuranceNo=${encodeURIComponent(item.insurance_no)}`
			})
		},
		goPay() {
			uni.navigateTo({ url: `/pages/travel/order/pay?id=${this.orderId}` })
		},
		goCancel() {
			uni.navigateTo({ url: `/pages/travel/order/cancel?id=${this.orderId}` })
		},
		backList() {
			uni.navigateTo({ url: '/pages/travel/order/list' })
		}
	}
}
</script>

<style lang="scss" scoped>
.travel-order-detail {
	padding: 20rpx;
	padding-bottom: 130rpx;

	.head-card,
	.card {
		background: #fff;
		border-radius: 16rpx;
		padding: 24rpx;
		margin-bottom: 18rpx;
	}

	.head-card {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.sn {
			font-size: 24rpx;
			color: #666;
		}

		.status {
			font-size: 26rpx;
			color: #e93323;
		}
	}

	.card-title {
		font-size: 30rpx;
		font-weight: 600;
		color: #222;
		margin-bottom: 18rpx;
	}

	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 14rpx 0;
		border-bottom: 1rpx solid #f5f5f5;

		&:last-child {
			border-bottom: none;
		}

		.label {
			font-size: 25rpx;
			color: #777;
		}

		.right {
			display: flex;
			align-items: center;
		}

		.value {
			font-size: 25rpx;
			color: #333;
			margin-right: 8rpx;

			&.price {
				color: #e93323;
				font-weight: 600;
			}
		}

		.arrow {
			color: #bbb;
			font-size: 24rpx;
		}

		&.clickable {
			.label,
			.value {
				color: #333;
			}
		}
	}

	.guest-row {
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		color: #444;
		padding: 10rpx 0;
	}

	.bottom-bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		padding: 20rpx;
		display: flex;
		gap: 12rpx;
		box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.05);

		.btn {
			flex: 1;
			height: 72rpx;
			line-height: 72rpx;
			text-align: center;
			border-radius: 36rpx;
			font-size: 26rpx;
			border: 1rpx solid #ddd;
			color: #666;

			&.primary {
				background: #e93323;
				border-color: #e93323;
				color: #fff;
			}
		}
	}
}
</style>
