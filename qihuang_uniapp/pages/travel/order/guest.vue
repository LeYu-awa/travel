<template>
	<view class="travel-order-guest">
		<view class="header">
			<text class="title">填写出行人</text>
			<text class="sub">共 {{ totalGuest }} 人（成人 {{ adultNum }}，儿童 {{ childNum }}）</text>
		</view>

		<view class="guest-list">
			<view v-for="(item, index) in guests" :key="index" class="guest-item">
				<view class="guest-top">
					<text class="tag">{{ item.guest_type === 'adult' ? '成人' : '儿童' }}</text>
					<view class="actions">
						<text class="action-text" @tap="editGuest(index)">编辑</text>
						<text class="action-text danger" @tap="removeGuest(index)">删除</text>
					</view>
				</view>
				<text class="line">{{ item.name || '-' }} / {{ idTypeText(item.id_type) }}</text>
				<text class="line">{{ item.id_no || '-' }}</text>
				<text class="line">{{ item.mobile || '-' }}</text>
			</view>
		</view>

		<view class="add-row" v-if="guests.length < totalGuest" @tap="addGuest">
			<text>+ 添加出行人（还需 {{ totalGuest - guests.length }} 人）</text>
		</view>

		<view class="freq-card" v-if="frequentGuests.length > 0">
			<view class="title">常用出行人</view>
			<view class="freq-list">
				<view
					v-for="item in frequentGuests"
					:key="item.id"
					class="freq-item"
					@tap="useFrequent(item)"
				>
					<text class="name">{{ item.name }}</text>
					<text class="idno">{{ maskIdNo(item.id_no) }}</text>
				</view>
			</view>
		</view>

		<view class="bottom-bar">
			<text class="status">已填写 {{ guests.length }}/{{ totalGuest }}</text>
			<view class="save-btn" @tap="saveAndBack">保存并返回</view>
		</view>
	</view>
</template>

<script>
import { travelGuestList } from '@/api/travel.js'

export default {
	data() {
		return {
			productId: 0,
			departureId: 0,
			adultNum: 1,
			childNum: 0,
			guests: [],
			frequentGuests: []
		}
	},
	computed: {
		totalGuest() {
			return Number(this.adultNum || 0) + Number(this.childNum || 0)
		},
		storageKey() {
			return `travel_guests_${this.productId}_${this.departureId}`
		}
	},
	onLoad(options) {
		this.productId = Number(options.productId || 0)
		this.departureId = Number(options.departureId || 0)
		this.adultNum = Number(options.adultNum || 1)
		this.childNum = Number(options.childNum || 0)
		this.readGuests()
		this.getFrequentGuests()
	},
	onShow() {
		this.consumeEditResult()
	},
	methods: {
		idTypeText(type) {
			const map = {
				id_card: '身份证',
				passport: '护照',
				hk_mo_pass: '港澳通行证'
			}
			return map[type] || type || '证件'
		},
		maskIdNo(idNo) {
			if (!idNo) return '-'
			if (idNo.length <= 8) return idNo
			return `${idNo.slice(0, 4)}****${idNo.slice(-4)}`
		},
		readGuests() {
			try {
				const raw = uni.getStorageSync(this.storageKey)
				const parsed = raw ? JSON.parse(raw) : []
				this.guests = Array.isArray(parsed) ? parsed : []
			} catch (e) {
				this.guests = []
			}
		},
		writeGuests() {
			uni.setStorageSync(this.storageKey, JSON.stringify(this.guests))
		},
		consumeEditResult() {
			const raw = uni.getStorageSync('travel_guest_edit_result')
			if (!raw) return
			try {
				const result = JSON.parse(raw)
				if (!result || result.storageKey !== this.storageKey) return
				if (result.mode === 'add') {
					if (this.guests.length < this.totalGuest) {
						this.guests.push(result.guest)
					}
				} else if (result.mode === 'edit' && Number(result.index) >= 0) {
					const idx = Number(result.index)
					if (idx < this.guests.length) {
						this.$set(this.guests, idx, result.guest)
					}
				}
				this.writeGuests()
			} catch (e) {}
			uni.removeStorageSync('travel_guest_edit_result')
		},
		async getFrequentGuests() {
			try {
				const res = await travelGuestList({ page: 1, limit: 50 })
				this.frequentGuests = Array.isArray(res.data) ? res.data : []
			} catch (e) {
				this.frequentGuests = []
			}
		},
		currentGuestType() {
			const adultCount = this.guests.filter(item => item.guest_type === 'adult').length
			if (adultCount < this.adultNum) return 'adult'
			return 'child'
		},
		addGuest() {
			const guestType = this.currentGuestType()
			uni.navigateTo({
				url: `/pages/travel/guest/edit?mode=add&storageKey=${encodeURIComponent(this.storageKey)}&guestType=${guestType}`
			})
		},
		editGuest(index) {
			const item = this.guests[index]
			if (!item) return
			uni.navigateTo({
				url: `/pages/travel/guest/edit?mode=edit&index=${index}&storageKey=${encodeURIComponent(this.storageKey)}&guestType=${item.guest_type}&payload=${encodeURIComponent(JSON.stringify(item))}`
			})
		},
		removeGuest(index) {
			this.guests.splice(index, 1)
			this.writeGuests()
		},
		useFrequent(item) {
			if (this.guests.length >= this.totalGuest) {
				uni.showToast({ title: '人数已满', icon: 'none' })
				return
			}
			const exists = this.guests.some(guest => guest.id_no === item.id_no)
			if (exists) {
				uni.showToast({ title: '该出行人已添加', icon: 'none' })
				return
			}
			const guest = {
				guest_type: this.currentGuestType(),
				guest_id: Number(item.id || 0),
				name: item.name || '',
				id_type: item.id_type || 'id_card',
				id_no: item.id_no || '',
				mobile: item.mobile || '',
				gender: item.gender || '',
				birthday: item.birthday || ''
			}
			this.guests.push(guest)
			this.writeGuests()
		},
		saveAndBack() {
			if (this.guests.length !== this.totalGuest) {
				uni.showToast({ title: `需填写${this.totalGuest}人`, icon: 'none' })
				return
			}
			this.writeGuests()
			uni.navigateBack()
		}
	}
}
</script>

<style lang="scss" scoped>
.travel-order-guest {
	padding: 20rpx;
	padding-bottom: 130rpx;

	.header {
		background: #fff;
		border-radius: 16rpx;
		padding: 24rpx;
		margin-bottom: 18rpx;

		.title {
			display: block;
			font-size: 32rpx;
			font-weight: 600;
			color: #222;
			margin-bottom: 10rpx;
		}

		.sub {
			font-size: 24rpx;
			color: #777;
		}
	}

	.guest-item {
		background: #fff;
		border-radius: 16rpx;
		padding: 22rpx;
		margin-bottom: 16rpx;

		.guest-top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10rpx;

			.tag {
				font-size: 22rpx;
				color: #fff;
				background: #e93323;
				padding: 4rpx 12rpx;
				border-radius: 6rpx;
			}

			.actions {
				display: flex;
				gap: 18rpx;
			}

			.action-text {
				font-size: 24rpx;
				color: #409eff;

				&.danger {
					color: #f56c6c;
				}
			}
		}

		.line {
			display: block;
			font-size: 24rpx;
			color: #555;
			line-height: 1.6;
		}
	}

	.add-row {
		background: #fff;
		border-radius: 16rpx;
		padding: 28rpx;
		text-align: center;
		font-size: 28rpx;
		color: #e93323;
		border: 2rpx dashed #efc5c1;
	}

	.freq-card {
		background: #fff;
		border-radius: 16rpx;
		padding: 22rpx;
		margin-top: 20rpx;

		.title {
			font-size: 28rpx;
			font-weight: 600;
			color: #222;
		}

		.freq-list {
			display: flex;
			flex-wrap: wrap;
			gap: 14rpx;
			margin-top: 16rpx;

			.freq-item {
				width: calc(50% - 7rpx);
				background: #f7f7f7;
				border-radius: 10rpx;
				padding: 16rpx 14rpx;

				.name {
					display: block;
					font-size: 26rpx;
					color: #333;
					margin-bottom: 8rpx;
				}

				.idno {
					font-size: 22rpx;
					color: #888;
				}
			}
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
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.05);

		.status {
			font-size: 24rpx;
			color: #777;
		}

		.save-btn {
			height: 72rpx;
			line-height: 72rpx;
			padding: 0 34rpx;
			background: #e93323;
			color: #fff;
			border-radius: 36rpx;
			font-size: 27rpx;
		}
	}
}
</style>
