<template>
	<view class="travel-insurance-detail">
		<view class="card" v-if="insurance.id">
			<view class="title-row">
				<text class="name">{{ insurance.name || '旅游保险' }}</text>
				<text class="status">{{ statusText(insurance.status) }}</text>
			</view>

			<view class="row">
				<text class="label">保单号</text>
				<text class="value">{{ insurance.insurance_no || '暂未出单' }}</text>
			</view>
			<view class="row">
				<text class="label">保险公司</text>
				<text class="value">{{ insurance.company || '-' }}</text>
			</view>
			<view class="row">
				<text class="label">保险期限</text>
				<text class="value">{{ insurance.start_date || '-' }} ~ {{ insurance.end_date || '-' }}</text>
			</view>
			<view class="row">
				<text class="label">被保人</text>
				<text class="value">{{ insurance.insured_name || '-' }}</text>
			</view>
			<view class="row">
				<text class="label">证件号</text>
				<text class="value">{{ insurance.insured_id_no || '-' }}</text>
			</view>
			<view class="row">
				<text class="label">保障金额</text>
				<text class="value price">¥{{ formatMoney(insurance.coverage) }}</text>
			</view>
		</view>

		<view class="card" v-if="insurance.id">
			<view class="btn" @tap="downloadPdf">下载保单</view>
		</view>

		<view class="empty" v-if="!loading && !insurance.id">暂无保单信息</view>
	</view>
</template>

<script>
import { travelInsuranceDetail, travelInsuranceDownload } from '@/api/travel.js'

export default {
	data() {
		return {
			insuranceNo: '',
			insurance: {},
			loading: false
		}
	},
	onLoad(options) {
		this.insuranceNo = decodeURIComponent(options.insuranceNo || '')
		this.getDetail()
	},
	methods: {
		formatMoney(v) {
			return Number(v || 0).toFixed(2)
		},
		statusText(status) {
			const map = {
				pending: '出单中',
				issued: '已生效',
				expired: '已过期',
				cancelled: '已作废'
			}
			return map[status] || status || '-'
		},
		async getDetail() {
			if (!this.insuranceNo) return
			this.loading = true
			try {
				const res = await travelInsuranceDetail(this.insuranceNo)
				this.insurance = res.data || {}
			} catch (e) {
				uni.showToast({ title: e.message || '查询失败', icon: 'none' })
				this.insurance = {}
			} finally {
				this.loading = false
			}
		},
		async downloadPdf() {
			if (!this.insuranceNo) return
			try {
				const res = await travelInsuranceDownload(this.insuranceNo)
				const url = res.data && res.data.url ? res.data.url : ''
				if (!url) {
					uni.showToast({ title: '暂无可下载文件', icon: 'none' })
					return
				}

				// #ifdef H5
				window.open(url, '_blank')
				// #endif

				// #ifdef MP || APP-PLUS
				uni.downloadFile({
					url,
					success: downRes => {
						if (downRes.statusCode !== 200) {
							uni.showToast({ title: '下载失败', icon: 'none' })
							return
						}
						uni.openDocument({
							filePath: downRes.tempFilePath,
							showMenu: true
						})
					},
					fail: () => {
						uni.showToast({ title: '下载失败', icon: 'none' })
					}
				})
				// #endif
			} catch (e) {
				uni.showToast({ title: e.message || '下载失败', icon: 'none' })
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.travel-insurance-detail {
	padding: 20rpx;

	.card {
		background: #fff;
		border-radius: 16rpx;
		padding: 24rpx;
		margin-bottom: 16rpx;
	}

	.title-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16rpx;

		.name {
			font-size: 30rpx;
			font-weight: 600;
			color: #222;
		}

		.status {
			font-size: 24rpx;
			color: #e93323;
		}
	}

	.row {
		display: flex;
		justify-content: space-between;
		padding: 13rpx 0;
		border-bottom: 1rpx solid #f5f5f5;

		&:last-child {
			border-bottom: none;
		}

		.label {
			font-size: 24rpx;
			color: #777;
		}

		.value {
			font-size: 24rpx;
			color: #333;

			&.price {
				color: #e93323;
				font-size: 28rpx;
				font-weight: 600;
			}
		}
	}

	.btn {
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		background: #e93323;
		color: #fff;
		font-size: 27rpx;
		border-radius: 36rpx;
	}

	.empty {
		text-align: center;
		color: #999;
		font-size: 25rpx;
		padding: 80rpx 0;
	}
}
</style>
