<template>
	<view class="travel-order-confirm">
		<view class="product-card">
			<image class="cover" :src="productCover" mode="aspectFill"></image>
			<view class="info">
				<text class="name">{{ productInfo.name || '旅游产品' }}</text>
				<text class="meta">出发：{{ departureInfo.date || '--' }}</text>
				<text class="meta">余位：{{ departureInfo.remaining || 0 }}</text>
			</view>
		</view>

		<view class="card">
			<view class="card-title">人数与房间</view>
			<view class="row">
				<text>成人</text>
				<text>x{{ adultNum }}</text>
			</view>
			<view class="row">
				<text>儿童</text>
				<text>x{{ childNum }}</text>
			</view>
			<view class="row">
				<text>房间数</text>
				<view class="stepper">
					<view class="btn" @tap="changeRoom(-1)">-</view>
					<text class="num">{{ roomNum }}</text>
					<view class="btn" @tap="changeRoom(1)">+</view>
				</view>
			</view>
			<view class="row">
				<text>房型意向</text>
				<view class="room-type-selector">
					<view
						:class="['type-btn', roomType === 'king' ? 'active' : '', !canSelectKingRoom ? 'disabled' : '']"
						@tap="selectRoomType('king')"
					>
						大床房
						<text v-if="!canSelectKingRoom" class="no-stock">(无库存)</text>
					</view>
					<view
						:class="['type-btn', roomType === 'twin' ? 'active' : '', !canSelectTwinRoom ? 'disabled' : '']"
						@tap="selectRoomType('twin')"
					>
						双床房
						<text v-if="!canSelectTwinRoom" class="no-stock">(无库存)</text>
					</view>
				</view>
			</view>
			<view class="room-tip">
				若意向房型无库存，可下单后联系客服尝试调整房型
			</view>
			<view class="row">
				<text>单房差数量（自动计算）</text>
				<text class="auto-calc">{{ singleRoomNum }} 份</text>
			</view>
			<view class="room-tip">
				单房差：当房间住不满2人时需补的差价（自动计算公式：房间数×2 - 总人数）
			</view>
		</view>

		<view class="card">
			<view class="card-title">联系人</view>
			<view class="form-item">
				<text class="label">姓名</text>
				<input v-model.trim="contact.name" type="text" placeholder="请输入姓名" />
			</view>
			<view class="form-item">
				<text class="label">手机</text>
				<input v-model.trim="contact.mobile" type="number" maxlength="11" placeholder="请输入手机号" />
			</view>
			<view class="form-item">
				<text class="label">身份证</text>
				<input v-model.trim="contact.idNo" type="text" placeholder="请输入身份证号(选填)" />
			</view>
			<view class="form-item">
				<text class="label">备注</text>
				<input v-model.trim="remark" type="text" placeholder="选填" />
			</view>
		</view>

		<view class="card">
			<view class="card-title">出行人</view>
			<view class="guest-line" @tap="goGuestPage">
				<text>已填写 {{ guests.length }}/{{ totalGuest }} 人</text>
				<text class="arrow">></text>
			</view>
		</view>

		<view class="card">
			<view class="card-title">价格明细</view>
			<view class="row">
				<text>成人 (x{{ adultNum }})</text>
				<text>¥{{ formatMoney(priceInfo.adult_price) }}</text>
			</view>
			<view class="row" v-if="childNum > 0">
				<text>儿童 (x{{ childNum }})</text>
				<text>¥{{ formatMoney(priceInfo.child_price) }}</text>
			</view>
			<view class="row">
				<text>产品金额小计</text>
				<text>¥{{ formatMoney(priceInfo.product_price) }}</text>
			</view>
			<view class="row" v-if="singleRoomNum > 0">
				<text>单房差 (x{{ singleRoomNum }})</text>
				<text>¥{{ formatMoney(priceInfo.single_room_price) }}</text>
			</view>
			<view class="row" v-if="priceInfo.rule_discount > 0">
				<text>规则优惠</text>
				<text>-¥{{ formatMoney(priceInfo.rule_discount) }}</text>
			</view>
			<view class="row total">
				<text>应付</text>
				<text>¥{{ formatMoney(priceInfo.total_price) }}</text>
			</view>
		</view>

		<view class="bottom-bar">
			<view class="price">
				<text class="label">应付</text>
				<text class="value">¥{{ formatMoney(priceInfo.total_price) }}</text>
			</view>
			<view class="submit-btn" @tap="submitOrder">提交订单</view>
		</view>
	</view>
</template>

<script>
import {
	travelProductDetail,
	travelDepartureCalendar,
	travelOrderPricePreview,
	travelOrderCreate,
	travelOrderSaveGuests
} from '@/api/travel.js'

export default {
	data() {
		return {
			productId: 0,
			departureId: 0,
			adultNum: 1,
			childNum: 0,
			roomNum: 1,
			roomType: '',
			singleRoomNum: 0,
			productInfo: {},
			departureInfo: {},
			priceInfo: {
				product_price: 0,
				single_room_price: 0,
				rule_discount: 0,
				total_price: 0,
				adult_price: 0,
				child_price: 0,
				adult_unit_price: 0,
				child_unit_price: 0,
				single_room_unit_price: 0,
				king_room_remaining: 0,
				twin_room_remaining: 0
			},
			contact: {
				name: '',
				mobile: '',
				idNo: ''
			},
			remark: '',
			guests: [],
			submitting: false
		}
	},
	computed: {
		totalGuest() {
			return Number(this.adultNum || 0) + Number(this.childNum || 0)
		},
		guestStorageKey() {
			return `travel_guests_${this.productId}_${this.departureId}`
		},
		productCover() {
			const raw = this.productInfo.images
			if (Array.isArray(raw) && raw.length) return raw[0]
			if (typeof raw === 'string') {
				try {
					const arr = JSON.parse(raw)
					if (Array.isArray(arr) && arr.length) return arr[0]
				} catch (e) {}
			}
			return this.productInfo.image || '/static/images/f.png'
		},
		canSelectKingRoom() {
			return Number(this.priceInfo.king_room_remaining || this.departureInfo.king_room_remaining || 0) >= this.roomNum
		},
		canSelectTwinRoom() {
			return Number(this.priceInfo.twin_room_remaining || this.departureInfo.twin_room_remaining || 0) >= this.roomNum
		},
		calculatedSingleRoomNum() {
			return Math.max(0, this.roomNum * 2 - this.totalGuest)
		}
	},
	onLoad(options) {
		this.productId = Number(options.productId || 0)
		this.departureId = Number(options.departureId || 0)
		this.adultNum = Number(options.adultNum || 1)
		this.childNum = Number(options.childNum || 0)
		this.roomNum = Number(options.roomNum || 1)
		if (!this.productId || !this.departureId) {
			uni.showToast({ title: '参数错误', icon: 'none' })
			return
		}
		this.initPage()
	},
	onShow() {
		this.readGuestsFromStorage()
		if (this.productId && this.departureId) {
			this.getPricePreview()
		}
	},
	methods: {
		formatMoney(v) {
			return Number(v || 0).toFixed(2)
		},
		async initPage() {
			await Promise.all([this.getProductInfo(), this.getDepartureInfo()])
			this.readGuestsFromStorage()
			// 初始化时自动计算单房差
			this.singleRoomNum = this.calculatedSingleRoomNum
			await this.getPricePreview()
		},
		readGuestsFromStorage() {
			try {
				const raw = uni.getStorageSync(this.guestStorageKey)
				if (!raw) {
					this.guests = []
					return
				}
				const parsed = JSON.parse(raw)
				this.guests = Array.isArray(parsed) ? parsed : []
			} catch (e) {
				this.guests = []
			}
		},
		async getProductInfo() {
			try {
				const res = await travelProductDetail(this.productId)
				this.productInfo = res.data || {}
			} catch (e) {
				uni.showToast({ title: e.message || '产品加载失败', icon: 'none' })
			}
		},
		async getDepartureInfo() {
			try {
				const start = new Date()
				const end = new Date()
				end.setMonth(end.getMonth() + 6)
				const res = await travelDepartureCalendar({
					product_id: this.productId,
					start_date: `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-01`,
					end_date: `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate()).padStart(2, '0')}`
				})
				const calendar = res.data || {}
				const row = Object.keys(calendar)
					.map(date => Object.assign({ date }, calendar[date] || {}))
					.find(item => Number(item.id) === this.departureId)
				if (row) this.departureInfo = row
			} catch (e) {
				uni.showToast({ title: e.message || '团期加载失败', icon: 'none' })
			}
		},
		async getPricePreview() {
			try {
				const res = await travelOrderPricePreview({
					product_id: this.productId,
					departure_id: this.departureId,
					adult_num: this.adultNum,
					child_num: this.childNum,
					big_child_num: 0,
					mid_child_num: 0,
					small_child_num: 0,
					room_num: this.roomNum,
					room_type: this.roomType
				})
				this.priceInfo = Object.assign({}, this.priceInfo, res.data || {})
				// 从后端返回的单房差数量
				this.singleRoomNum = this.priceInfo.single_room_num || 0
			} catch (e) {
				uni.showToast({ title: e.message || '价格试算失败', icon: 'none' })
			}
		},
		changeRoom(delta) {
			const next = this.roomNum + delta
			if (next < 1) return
			if (next > this.totalGuest) {
				uni.showToast({ title: '房间数不能超过出行人数', icon: 'none' })
				return
			}
			this.roomNum = next
			// 自动计算单房差
			this.singleRoomNum = this.calculatedSingleRoomNum
			this.getPricePreview()
		},
		selectRoomType(type) {
			if (type === 'king' && !this.canSelectKingRoom) {
				uni.showToast({ title: '您所选的出行日期没有大床房', icon: 'none' })
				return
			}
			if (type === 'twin' && !this.canSelectTwinRoom) {
				uni.showToast({ title: '您所选的出行日期没有双床房', icon: 'none' })
				return
			}
			this.roomType = type
			this.getPricePreview()
		},
		goGuestPage() {
			uni.navigateTo({
				url: `/pages/travel/order/guest?productId=${this.productId}&departureId=${this.departureId}&adultNum=${this.adultNum}&childNum=${this.childNum}`
			})
		},
		validateForm() {
			if (!this.contact.name) {
				uni.showToast({ title: '请填写联系人姓名', icon: 'none' })
				return false
			}
			if (!/^1[3-9]\d{9}$/.test(this.contact.mobile || '')) {
				uni.showToast({ title: '请填写正确手机号', icon: 'none' })
				return false
			}
			if (this.contact.idNo && !/^\d{17}[\dXx]$/.test(this.contact.idNo)) {
				uni.showToast({ title: '身份证格式不正确', icon: 'none' })
				return false
			}
			// 人数规则校验
			if (this.totalGuest > 4) {
				uni.showToast({ title: '每单最多选择4名出行人', icon: 'none' })
				return false
			}
			if (this.childNum > this.adultNum * 2) {
				uni.showToast({ title: '每个成人最多携带2名儿童', icon: 'none' })
				return false
			}
			if (this.guests.length !== this.totalGuest) {
				uni.showToast({ title: `请填写${this.totalGuest}位出行人`, icon: 'none' })
				return false
			}
			if (this.departureInfo && Number(this.departureInfo.remaining || 0) < this.totalGuest) {
				uni.showToast({ title: '团期余位不足', icon: 'none' })
				return false
			}
			return true
		},
		buildGuestPayload() {
			return this.guests.map(item => {
				return {
					guest_type: item.guest_type || item.type || 'adult',
					name: item.name || '',
					id_type: item.id_type || item.idType || 'id_card',
					id_no: item.id_no || item.idNo || '',
					mobile: item.mobile || '',
					gender: item.gender || '',
					birthday: item.birthday || '',
					guest_id: Number(item.guest_id || item.guestId || item.id || 0)
				}
			})
		},
		async submitOrder() {
			if (this.submitting) return
			if (!this.validateForm()) return

			this.submitting = true
			uni.showLoading({ title: '提交中...' })
			try {
				const createRes = await travelOrderCreate({
					product_id: this.productId,
					departure_id: this.departureId,
					adult_num: this.adultNum,
					child_num: this.childNum,
					big_child_num: 0,
					mid_child_num: 0,
					small_child_num: 0,
					room_num: this.roomNum,
					room_type: this.roomType,
					contact_name: this.contact.name,
					contact_mobile: this.contact.mobile,
					contact_id_no: this.contact.idNo,
					remark: this.remark
				})
				const order = createRes.data || {}
				const orderId = Number(order.id || order.order_id || 0)
				if (!orderId) throw new Error('创建订单失败')

				const guestPayload = this.buildGuestPayload()
				await travelOrderSaveGuests(orderId, guestPayload)
				uni.removeStorageSync(this.guestStorageKey)

				const needContract = Number(order.contract_required || 0) === 1
				if (needContract) {
					uni.redirectTo({ url: `/pages/travel/contract/redirect?orderId=${orderId}` })
				} else {
					uni.redirectTo({ url: `/pages/travel/order/pay?id=${orderId}` })
				}
			} catch (e) {
				uni.showToast({ title: e.message || '提交失败', icon: 'none' })
			} finally {
				uni.hideLoading()
				this.submitting = false
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.travel-order-confirm {
	padding: 20rpx;
	padding-bottom: 130rpx;

	.product-card,
	.card {
		background: #fff;
		border-radius: 16rpx;
		padding: 24rpx;
		margin-bottom: 20rpx;
	}

	.product-card {
		display: flex;
		gap: 20rpx;

		.cover {
			width: 160rpx;
			height: 160rpx;
			border-radius: 12rpx;
			background: #f5f5f5;
		}

		.info {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.name {
				font-size: 30rpx;
				color: #222;
				font-weight: 600;
			}

			.meta {
				font-size: 24rpx;
				color: #777;
			}
		}
	}

	.card-title {
		font-size: 30rpx;
		font-weight: 600;
		color: #222;
		margin-bottom: 20rpx;
	}

	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 14rpx 0;
		font-size: 27rpx;
		color: #333;

		&.total {
			margin-top: 8rpx;
			padding-top: 20rpx;
			border-top: 1rpx solid #f2f2f2;
			font-weight: 600;
			color: #e93323;
		}
	}

	.form-item {
		padding: 18rpx 0;
		border-bottom: 1rpx solid #f4f4f4;

		&:last-child {
			border-bottom: none;
		}

		.label {
			display: block;
			font-size: 24rpx;
			color: #888;
			margin-bottom: 8rpx;
		}

		input {
			font-size: 28rpx;
		}
	}

	.stepper {
		display: flex;
		align-items: center;
		gap: 12rpx;

		.btn {
			width: 44rpx;
			height: 44rpx;
			line-height: 44rpx;
			text-align: center;
			border: 1rpx solid #ddd;
			border-radius: 8rpx;
		}

		.num {
			min-width: 44rpx;
			text-align: center;
		}
	}

	.room-type-selector {
		display: flex;
		gap: 16rpx;

		.type-btn {
			padding: 12rpx 24rpx;
			border: 2rpx solid #ddd;
			border-radius: 8rpx;
			font-size: 26rpx;
			color: #333;

			&.active {
				border-color: #e93323;
				color: #e93323;
				background: #fff5f4;
			}

			&.disabled {
				opacity: 0.5;
				color: #999;
			}

			.no-stock {
				font-size: 20rpx;
				color: #999;
				margin-left: 4rpx;
			}
		}
	}

	.room-tip {
		margin-top: 12rpx;
		padding: 12rpx 16rpx;
		background: #fff8e6;
		border-radius: 8rpx;
		font-size: 22rpx;
		color: #996600;
		line-height: 1.5;
	}

	.auto-calc {
		color: #e93323;
		font-weight: 500;
	}

	.guest-line {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		color: #333;

		.arrow {
			color: #bbb;
		}
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
		box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.05);

		.price {
			flex: 1;

			.label {
				font-size: 24rpx;
				color: #888;
			}

			.value {
				font-size: 38rpx;
				font-weight: 700;
				color: #e93323;
				margin-left: 10rpx;
			}
		}

		.submit-btn {
			height: 76rpx;
			line-height: 76rpx;
			padding: 0 44rpx;
			background: #e93323;
			color: #fff;
			font-size: 28rpx;
			border-radius: 38rpx;
		}
	}
}
</style>
