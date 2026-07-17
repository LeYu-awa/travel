<template>
	<view class="travel-product-detail">
		<swiper class="banner" :indicator-dots="true" :autoplay="true" :interval="3000">
			<swiper-item v-for="(img, index) in productImages" :key="index">
				<image :src="img" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<view class="product-card">
			<text class="name">{{ product.name || '旅游产品' }}</text>
			<view class="price-line">
				<text>成人 ¥{{ formatMoney(product.adult_price) }}</text>
				<text v-if="Number(product.child_price) > 0">儿童 ¥{{ formatMoney(product.child_price) }}</text>
			</view>
			<view class="meta">
				<text>{{ product.days || 0 }}天{{ product.nights || 0 }}晚</text>
				<text>线路编号 {{ product.id || '-' }}</text>
			</view>
		</view>

		<view class="block">
			<view class="block-title">选择团期</view>
			<view class="month-row">
				<picker mode="date" :value="monthPickerValue" @change="onMonthChange">
					<view class="month-btn">{{ monthText }}</view>
				</picker>
			</view>

			<view class="departure-grid">
				<view
					v-for="item in departures"
					:key="item.id"
					:class="['departure-item', selectedDeparture && selectedDeparture.id === item.id ? 'active' : '', `status-${item.status}`]"
					@tap="selectDeparture(item)"
				>
					<text class="date">{{ formatDate(item.date) }}</text>
					<text class="price">{{ getDeparturePriceText(item) }}</text>
					<text class="status">{{ getStatusText(item.status) }}</text>
					<text class="remain">余位 {{ item.remaining }}</text>
				</view>
			</view>

			<view v-if="departures.length === 0" class="empty">当前月份暂无团期</view>
		</view>

		<view class="block">
			<view class="block-title">出行人数</view>
			<view class="people-row">
				<text>成人</text>
				<view class="stepper">
					<view class="btn" @tap="changePeople('adult', -1)">-</view>
					<text class="num">{{ adultNum }}</text>
					<view class="btn" @tap="changePeople('adult', 1)">+</view>
				</view>
			</view>
			<view class="people-row">
				<text>儿童</text>
				<view class="stepper">
					<view class="btn" @tap="changePeople('child', -1)">-</view>
					<text class="num">{{ childNum }}</text>
					<view class="btn" @tap="changePeople('child', 1)">+</view>
				</view>
			</view>
			<view class="people-tip">
				<text>每单最多选择4名出行人，每个成人最多携带2名儿童，超出需分次下单或</text>
				<text class="service-link" @tap="openCustomerService">联系客服></text>
			</view>
		</view>

		<view class="block" v-if="product.description">
			<view class="block-title">产品说明</view>
			<rich-text :nodes="product.description"></rich-text>
		</view>

		<view class="bottom-bar">
			<view class="total">
				<text class="label">合计</text>
				<text class="price">¥{{ totalPrice }}</text>
			</view>
			<view class="submit-btn" @tap="bookNow">立即预订</view>
		</view>
	</view>
</template>

<script>
import { travelProductDetail, travelDepartureCalendar } from '@/api/travel.js'

export default {
	data() {
		return {
			productId: 0,
			product: {},
			departures: [],
			selectedDeparture: null,
			adultNum: 1,
			childNum: 0,
			currentMonth: ''
		}
	},
	computed: {
		productImages() {
			const raw = this.product.images
			if (Array.isArray(raw) && raw.length) return raw
			if (typeof raw === 'string') {
				try {
					const arr = JSON.parse(raw)
					if (Array.isArray(arr) && arr.length) return arr
				} catch (e) {}
			}
			return [this.product.image || '/static/images/f.png']
		},
		monthText() {
			const d = this.currentMonth ? new Date(this.currentMonth + '-01') : new Date()
			return `${d.getFullYear()}年${d.getMonth() + 1}月`
		},
		monthPickerValue() {
			return this.currentMonth ? `${this.currentMonth}-01` : ''
		},
		totalPeople() {
			return Number(this.adultNum || 0) + Number(this.childNum || 0)
		},
		totalPrice() {
			const departure = this.selectedDeparture || {}
			const adultPrice = Number(departure.adult_price || this.product.adult_price || 0)
			const childPrice = Number(departure.child_price || this.product.child_price || 0)
			return (adultPrice * this.adultNum + childPrice * this.childNum).toFixed(2)
		}
	},
	onLoad(options) {
		this.productId = Number(options.id || 0)
		const now = new Date()
		this.currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
		if (!this.productId) {
			uni.showToast({ title: '参数错误', icon: 'none' })
			return
		}
		this.initPage()
	},
	methods: {
		formatMoney(v) {
			return Number(v || 0).toFixed(2)
		},
		formatDate(v) {
			if (!v) return '--'
			const dt = new Date(v)
			if (isNaN(dt.getTime())) return v
			return `${dt.getMonth() + 1}-${dt.getDate()}`
		},
		getStatusText(status) {
			const map = {
				available: '可订',
				full: '满员',
				reserve: '可预约',
				expired: '已过期'
			}
			return map[status] || status || '未知'
		},
		getDeparturePriceText(item) {
			const prices = [
				Number(item.adult_price || 0),
				Number(item.child_price || 0),
				Number(item.big_child_price || 0),
				Number(item.mid_child_price || 0),
				Number(item.small_child_price || 0)
			].filter(v => v > 0)
			if (prices.length === 0) {
				return '实时计价'
			}
			const minPrice = Math.min.apply(null, prices)
			return '¥' + minPrice
		},
		async initPage() {
			await Promise.all([this.getProductDetail(), this.getCalendar()])
		},
		async getProductDetail() {
			try {
				const res = await travelProductDetail(this.productId)
				this.product = res.data || {}
				if (Number(this.product.min_adult || 1) > this.adultNum) {
					this.adultNum = Number(this.product.min_adult || 1)
				}
			} catch (e) {
				uni.showToast({ title: e.message || '加载失败', icon: 'none' })
			}
		},
		buildMonthRange(month) {
			const start = `${month}-01`
			const startDate = new Date(start)
			const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0)
			const end = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`
			return { start, end }
		},
		async getCalendar() {
			try {
				const range = this.buildMonthRange(this.currentMonth)
				const res = await travelDepartureCalendar({
					product_id: this.productId,
					start_date: range.start,
					end_date: range.end
				})
				const calendar = res.data || {}
				const list = Object.keys(calendar).map(date => {
					return Object.assign({ date }, calendar[date] || {})
				})
				list.sort((a, b) => (a.date > b.date ? 1 : -1))
				this.departures = list
				if (this.selectedDeparture) {
					const found = list.find(item => item.id === this.selectedDeparture.id)
					this.selectedDeparture = found || null
				}
				if (!this.selectedDeparture) {
					const firstAvailable = list.find(item => item.status === 'available' || item.status === 'reserve')
					this.selectedDeparture = firstAvailable || list[0] || null
				}
			} catch (e) {
				uni.showToast({ title: e.message || '团期加载失败', icon: 'none' })
			}
		},
		onMonthChange(e) {
			const value = e.detail && e.detail.value ? e.detail.value : ''
			if (!value) return
			const dt = new Date(value)
			if (isNaN(dt.getTime())) return
			this.currentMonth = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`
			this.getCalendar()
		},
		selectDeparture(item) {
			if (item.status === 'expired') {
				uni.showToast({ title: '该团期已过期', icon: 'none' })
				return
			}
			if (item.status === 'full') {
				uni.showToast({ title: '该团期已满员', icon: 'none' })
				return
			}
			this.selectedDeparture = item
			const remaining = Number(item.remaining || 0)
			if (remaining > 0 && this.totalPeople > remaining) {
				this.childNum = Math.max(0, remaining - this.adultNum)
				if (this.adultNum > remaining) {
					this.adultNum = Math.max(Number(this.product.min_adult || 1), remaining)
					this.childNum = 0
				}
			}
		},
		changePeople(type, delta) {
			const minAdult = Number(this.product.min_adult || 1)
			const maxAdult = Number(this.product.max_adult || 99)
			const minChild = Number(this.product.min_child || 0)
			const maxChild = Number(this.product.max_child || 99)

			if (type === 'adult') {
				const next = this.adultNum + delta
				if (next < minAdult || next > maxAdult) {
					uni.showToast({ title: `成人范围 ${minAdult}-${maxAdult}`, icon: 'none' })
					return
				}
				// 检查4人上限
				if (!this.canFitCapacity(next + this.childNum)) return
				// 检查儿童/成人比例（增加成人时不需要检查，减少成人时需要）
				if (delta < 0 && this.childNum > next * 2) {
					uni.showToast({ title: '每个成人最多携带2名儿童', icon: 'none' })
					return
				}
				this.adultNum = next
				return
			}

			const next = this.childNum + delta
			if (next < minChild || next > maxChild) {
				uni.showToast({ title: `儿童范围 ${minChild}-${maxChild}`, icon: 'none' })
				return
			}
			// 检查4人上限
			if (!this.canFitCapacity(this.adultNum + next)) return
			// 检查儿童/成人比例
			if (next > this.adultNum * 2) {
				uni.showToast({ title: '每个成人最多携带2名儿童', icon: 'none' })
				return
			}
			this.childNum = next
		},
		validatePeopleRule() {
			const total = this.adultNum + this.childNum
			if (total > 4) {
				uni.showToast({ title: '每单最多选择4名出行人', icon: 'none' })
				return false
			}
			if (this.childNum > this.adultNum * 2) {
				uni.showToast({ title: '每个成人最多携带2名儿童', icon: 'none' })
				return false
			}
			return true
		},
		openCustomerService() {
			// 打开客服（使用 uni 客服功能或跳转客服页面）
			// 如果配置了客服链接，可以跳转到指定页面
			// 这里使用通用的联系客服方式
			uni.showModal({
				title: '联系客服',
				content: '请拨打客服电话或添加微信咨询',
				confirmText: '拨打电话',
				cancelText: '取消',
				success: (res) => {
					if (res.confirm) {
						// 使用项目中配置的客服电话（如有）
						const servicePhone = this.product.service_phone || '400-000-0000'
						uni.makePhoneCall({ phoneNumber: servicePhone })
					}
				}
			})
		},
		canFitCapacity(nextTotal) {
			if (!this.selectedDeparture) return true
			const remaining = Number(this.selectedDeparture.remaining || 0)
			if (nextTotal > remaining) {
				uni.showToast({ title: '超出团期余位', icon: 'none' })
				return false
			}
			return true
		},
		bookNow() {
			if (!this.selectedDeparture) {
				uni.showToast({ title: '请选择团期', icon: 'none' })
				return
			}
			if (this.selectedDeparture.status === 'expired' || this.selectedDeparture.status === 'full') {
				uni.showToast({ title: '该团期不可预订', icon: 'none' })
				return
			}
			if (this.totalPeople <= 0) {
				uni.showToast({ title: '请选择出行人数', icon: 'none' })
				return
			}
			// 校验人数规则
			if (!this.validatePeopleRule()) return
			uni.navigateTo({
				url: `/pages/travel/order/confirm?productId=${this.productId}&departureId=${this.selectedDeparture.id}&adultNum=${this.adultNum}&childNum=${this.childNum}`
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.travel-product-detail {
	padding-bottom: 120rpx;

	.banner {
		width: 100%;
		height: 420rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.product-card,
	.block {
		background: #fff;
		margin: 20rpx;
		border-radius: 16rpx;
		padding: 26rpx;
	}

	.product-card {
		.name {
			display: block;
			font-size: 34rpx;
			font-weight: 600;
			color: #222;
			margin-bottom: 14rpx;
		}

		.price-line {
			display: flex;
			gap: 24rpx;
			color: #e93323;
			font-size: 28rpx;
			margin-bottom: 14rpx;
		}

		.meta {
			display: flex;
			justify-content: space-between;
			color: #888;
			font-size: 24rpx;
		}
	}

	.block-title {
		font-size: 30rpx;
		font-weight: 600;
		color: #222;
		margin-bottom: 22rpx;
	}

	.month-row {
		margin-bottom: 18rpx;

		.month-btn {
			display: inline-block;
			padding: 12rpx 22rpx;
			background: #f6f6f6;
			border-radius: 8rpx;
			font-size: 24rpx;
			color: #444;
		}
	}

	.departure-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 14rpx;

		.departure-item {
			width: calc(25% - 11rpx);
			border-radius: 10rpx;
			background: #f8f8f8;
			padding: 14rpx 8rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			border: 2rpx solid transparent;

			.date {
				font-size: 24rpx;
				color: #333;
			}

			.price {
				font-size: 22rpx;
				color: #e93323;
				font-weight: 500;
				margin: 4rpx 0;
			}

			.status {
				font-size: 20rpx;
				margin: 4rpx 0;
			}

			.remain {
				font-size: 20rpx;
				color: #888;
			}

			&.active {
				border-color: #e93323;
				background: #fff5f4;
			}

			&.status-available .status {
				color: #2aa84a;
			}

			&.status-reserve .status {
				color: #ff9800;
			}

			&.status-full,
			&.status-expired {
				opacity: 0.55;
			}
		}
	}

	.people-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 18rpx;
		font-size: 28rpx;
		color: #333;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.people-tip {
		margin-top: 16rpx;
		padding: 14rpx 16rpx;
		background: #fff8e6;
		border-radius: 8rpx;
		font-size: 22rpx;
		color: #996600;
		line-height: 1.5;

		.service-link {
			color: #e93323;
			font-weight: 500;
		}
	}

	.stepper {
		display: flex;
		align-items: center;
		gap: 16rpx;

		.btn {
			width: 50rpx;
			height: 50rpx;
			line-height: 50rpx;
			text-align: center;
			border: 1rpx solid #ddd;
			border-radius: 8rpx;
			font-size: 30rpx;
			color: #444;
		}

		.num {
			width: 64rpx;
			text-align: center;
		}
	}

	.empty {
		text-align: center;
		color: #999;
		font-size: 24rpx;
		padding: 20rpx 0 8rpx;
	}

	.bottom-bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		padding: 20rpx;
		display: flex;
		align-items: center;
		box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.06);

		.total {
			flex: 1;

			.label {
				color: #888;
				font-size: 24rpx;
			}

			.price {
				color: #e93323;
				font-size: 38rpx;
				font-weight: 700;
				margin-left: 10rpx;
			}
		}

		.submit-btn {
			height: 76rpx;
			line-height: 76rpx;
			padding: 0 42rpx;
			border-radius: 38rpx;
			background: #e93323;
			color: #fff;
			font-size: 28rpx;
		}
	}
}
</style>
