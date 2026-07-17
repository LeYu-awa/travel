<template>
	<view class="travel-guest-edit">
		<view class="form-card">
			<view class="form-item">
				<text class="label required">姓名</text>
				<input v-model.trim="form.name" type="text" placeholder="请输入姓名" />
			</view>

			<view class="form-item">
				<text class="label required">证件类型</text>
				<picker :range="idTypeOptions" range-key="label" :value="idTypeIndex" @change="onIdTypeChange">
					<view class="picker-value">{{ idTypeText(form.id_type) }}</view>
				</picker>
			</view>

			<view class="form-item">
				<text class="label required">证件号码</text>
				<input v-model.trim="form.id_no" type="text" placeholder="请输入证件号码" />
			</view>

			<view class="form-item">
				<text class="label required">手机号</text>
				<input v-model.trim="form.mobile" type="number" maxlength="11" placeholder="请输入手机号" />
			</view>

			<view class="form-item">
				<text class="label">性别</text>
				<view class="gender-group">
					<view
						v-for="item in genderOptions"
						:key="item.value"
						:class="['gender-item', form.gender === item.value ? 'active' : '']"
						@tap="form.gender = item.value"
					>{{ item.label }}</view>
				</view>
			</view>

			<view class="form-item">
				<text class="label">出生日期</text>
				<picker mode="date" :value="form.birthday" @change="onBirthdayChange">
					<view class="picker-value">{{ form.birthday || '请选择' }}</view>
				</picker>
			</view>
		</view>

		<view class="switch-row">
			<text>保存到常用出行人</text>
			<switch :checked="saveAsFrequent" @change="onFrequentChange" color="#E93323" />
		</view>

		<view class="bottom-bar">
			<view class="btn plain" @tap="goBack">取消</view>
			<view class="btn primary" @tap="saveGuest">保存</view>
		</view>
	</view>
</template>

<script>
import { travelGuestSave } from '@/api/travel.js'

export default {
	data() {
		return {
			mode: 'add',
			index: -1,
			storageKey: '',
			guestType: 'adult',
			saveAsFrequent: false,
			form: {
				guest_id: 0,
				guest_type: 'adult',
				name: '',
				id_type: 'id_card',
				id_no: '',
				mobile: '',
				gender: '',
				birthday: ''
			},
			idTypeOptions: [
				{ value: 'id_card', label: '身份证' },
				{ value: 'passport', label: '护照' },
				{ value: 'hk_mo_pass', label: '港澳通行证' }
			],
			genderOptions: [
				{ value: 'male', label: '男' },
				{ value: 'female', label: '女' }
			]
		}
	},
	computed: {
		idTypeIndex() {
			const index = this.idTypeOptions.findIndex(item => item.value === this.form.id_type)
			return index >= 0 ? index : 0
		}
	},
	onLoad(options) {
		this.mode = options.mode || 'add'
		this.index = Number(options.index || -1)
		this.storageKey = decodeURIComponent(options.storageKey || '')
		this.guestType = options.guestType || 'adult'
		this.form.guest_type = this.guestType

		const payload = options.payload ? decodeURIComponent(options.payload) : ''
		if (payload) {
			try {
				const data = JSON.parse(payload)
				this.form = Object.assign({}, this.form, data)
			} catch (e) {}
		}
	},
	methods: {
		idTypeText(type) {
			const item = this.idTypeOptions.find(opt => opt.value === type)
			return item ? item.label : '身份证'
		},
		onIdTypeChange(e) {
			const index = Number(e.detail.value || 0)
			this.form.id_type = this.idTypeOptions[index] ? this.idTypeOptions[index].value : 'id_card'
		},
		onBirthdayChange(e) {
			this.form.birthday = e.detail.value || ''
		},
		onFrequentChange(e) {
			this.saveAsFrequent = !!e.detail.value
		},
		validateForm() {
			if (!this.form.name) {
				uni.showToast({ title: '请输入姓名', icon: 'none' })
				return false
			}
			if (!this.form.id_no) {
				uni.showToast({ title: '请输入证件号', icon: 'none' })
				return false
			}
			if (this.form.id_type === 'id_card' && !/^\d{17}[\dXx]$/.test(this.form.id_no)) {
				uni.showToast({ title: '身份证格式不正确', icon: 'none' })
				return false
			}
			if (!/^1[3-9]\d{9}$/.test(this.form.mobile || '')) {
				uni.showToast({ title: '手机号格式不正确', icon: 'none' })
				return false
			}
			return true
		},
		async syncFrequentGuest() {
			const data = {
				name: this.form.name,
				id_type: this.form.id_type,
				id_no: this.form.id_no,
				mobile: this.form.mobile,
				gender: this.form.gender,
				birthday: this.form.birthday || '',
				is_default: 0
			}
			if (Number(this.form.guest_id || 0) > 0) {
				data.id = Number(this.form.guest_id)
			}
			await travelGuestSave(data)
		},
		goBack() {
			uni.navigateBack()
		},
		async saveGuest() {
			if (!this.validateForm()) return

			try {
				if (this.saveAsFrequent) {
					await this.syncFrequentGuest()
				}
			} catch (e) {
				uni.showToast({ title: e.message || '保存常用出行人失败', icon: 'none' })
			}

			const guest = Object.assign({}, this.form, { guest_type: this.guestType })
			const result = {
				mode: this.mode,
				index: this.index,
				storageKey: this.storageKey,
				guest
			}
			uni.setStorageSync('travel_guest_edit_result', JSON.stringify(result))
			uni.showToast({ title: '保存成功', icon: 'success' })
			setTimeout(() => uni.navigateBack(), 300)
		}
	}
}
</script>

<style lang="scss" scoped>
.travel-guest-edit {
	padding: 20rpx;
	padding-bottom: 130rpx;

	.form-card {
		background: #fff;
		border-radius: 16rpx;
		padding: 24rpx;
	}

	.form-item {
		padding: 18rpx 0;
		border-bottom: 1rpx solid #f5f5f5;

		&:last-child {
			border-bottom: none;
		}

		.label {
			display: block;
			font-size: 24rpx;
			color: #888;
			margin-bottom: 10rpx;

			&.required:before {
				content: '*';
				color: #e93323;
				margin-right: 6rpx;
			}
		}

		input,
		.picker-value {
			font-size: 28rpx;
			color: #333;
			min-height: 40rpx;
		}
	}

	.gender-group {
		display: flex;
		gap: 16rpx;

		.gender-item {
			padding: 10rpx 26rpx;
			border-radius: 30rpx;
			background: #f5f5f5;
			font-size: 24rpx;
			color: #666;

			&.active {
				color: #fff;
				background: #e93323;
			}
		}
	}

	.switch-row {
		margin-top: 20rpx;
		background: #fff;
		border-radius: 16rpx;
		padding: 22rpx 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26rpx;
		color: #333;
	}

	.bottom-bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		padding: 20rpx;
		display: flex;
		gap: 16rpx;
		box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.05);

		.btn {
			flex: 1;
			height: 74rpx;
			line-height: 74rpx;
			text-align: center;
			border-radius: 37rpx;
			font-size: 27rpx;

			&.plain {
				background: #f5f5f5;
				color: #666;
			}

			&.primary {
				background: #e93323;
				color: #fff;
			}
		}
	}
}
</style>
