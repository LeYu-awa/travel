<template>
	<view class="apply-page">
		<view class="form-card">
			<view class="form-item">
				<text class="label"><text class="required">*</text>选手名称</text>
				<input
					class="input"
					v-model="form.name"
					placeholder="请输入选手名称"
					maxlength="50"
				/>
			</view>

			<view class="form-item">
				<text class="label"><text class="required">*</text>封面图片</text>
				<view class="upload-area">
					<view class="upload-item" v-if="form.cover">
						<image :src="form.cover" mode="aspectFill"></image>
						<view class="delete" @tap="form.cover = ''">
							<text>X</text>
						</view>
					</view>
					<view class="upload-btn" v-else @tap="uploadCover">
						<text class="icon">+</text>
						<text class="text">上传封面</text>
					</view>
				</view>
			</view>

			<view class="form-item">
				<text class="label">图片展示</text>
				<view class="upload-area">
					<view class="upload-item" v-for="(img, idx) in form.images" :key="idx">
						<image :src="img" mode="aspectFill"></image>
						<view class="delete" @tap="removeImage(idx)">
							<text>X</text>
						</view>
					</view>
					<view class="upload-btn" v-if="form.images.length < 9" @tap="uploadImage">
						<text class="icon">+</text>
						<text class="text">{{ form.images.length }}/9</text>
					</view>
				</view>
			</view>

			<view class="form-item">
				<text class="label">选手简介</text>
				<textarea
					class="textarea"
					v-model="form.description"
					placeholder="请输入选手简介"
					maxlength="500"
				></textarea>
				<text class="count">{{ form.description.length }}/500</text>
			</view>

			<!-- 动态字段 -->
			<view class="form-item" v-for="(field, idx) in applyFields" :key="idx">
				<text class="label">
					<text class="required" v-if="field.required">*</text>{{ field.name }}
				</text>
				<input
					v-if="field.type === 'text'"
					class="input"
					v-model="form.extra_fields[field.name]"
					:placeholder="'请输入' + field.name"
				/>
				<input
					v-else-if="field.type === 'number'"
					class="input"
					type="number"
					v-model="form.extra_fields[field.name]"
					:placeholder="'请输入' + field.name"
				/>
				<input
					v-else-if="field.type === 'phone'"
					class="input"
					type="number"
					v-model="form.extra_fields[field.name]"
					placeholder="请输入手机号"
					maxlength="11"
				/>
			</view>
		</view>

		<view class="submit-btn" @tap="submit" :class="{ disabled: submitting }">
			{{ submitting ? '提交中...' : '提交报名' }}
		</view>

		<view class="tips">
			<text>* 报名后{{ needAudit ? '需等待审核' : '即可参与投票' }}</text>
		</view>
	</view>
</template>

<script>
import { getVoteDetail, voteApply } from '@/api/activity'
import { HTTP_REQUEST_URL, TOKENNAME } from '@/config/app'
import store from '@/store'

export default {
	data() {
		return {
			id: 0,
			needAudit: false,
			applyFields: [],
			form: {
				name: '',
				cover: '',
				images: [],
				description: '',
				extra_fields: {}
			},
			submitting: false
		}
	},
	onLoad(options) {
		this.id = options.id
		this.getVoteInfo()
	},
	methods: {
		async getVoteInfo() {
			try {
				const res = await getVoteDetail(this.id)
				this.needAudit = res.data.apply_check === 1
				if (res.data.apply_fields) {
					try {
						this.applyFields = JSON.parse(res.data.apply_fields)
					} catch (e) {
						this.applyFields = []
					}
				}
			} catch (e) {
				uni.showToast({ title: e.message || '加载失败', icon: 'none' })
			}
		},
		uploadCover() {
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					this.uploadFile(res.tempFilePaths[0], (url) => {
						this.form.cover = url
					})
				}
			})
		},
		uploadImage() {
			uni.chooseImage({
				count: 9 - this.form.images.length,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					res.tempFilePaths.forEach((path) => {
						this.uploadFile(path, (url) => {
							this.form.images.push(url)
						})
					})
				}
			})
		},
		uploadFile(filePath, callback) {
			uni.uploadFile({
				url: HTTP_REQUEST_URL + '/api/upload/image/field',
				filePath: filePath,
				name: 'field',
				header: {
					// #ifdef MP
					"Content-Type": "multipart/form-data",
					// #endif
					[TOKENNAME]: 'Bearer ' + store.state.app.token
				},
				success: (res) => {
					const data = JSON.parse(res.data)
					if (data.status === 200) {
						callback(data.data.path)
					} else {
						uni.showToast({ title: data.message || '上传失败', icon: 'none' })
					}
				},
				fail: () => {
					uni.showToast({ title: '上传失败', icon: 'none' })
				}
			})
		},
		removeImage(idx) {
			this.form.images.splice(idx, 1)
		},
		async submit() {
			if (this.submitting) return

			// 验证
			if (!this.form.name.trim()) {
				return uni.showToast({ title: '请输入选手名称', icon: 'none' })
			}
			if (!this.form.cover) {
				return uni.showToast({ title: '请上传封面图片', icon: 'none' })
			}

			// 验证必填动态字段
			for (const field of this.applyFields) {
				if (field.required && !this.form.extra_fields[field.name]) {
					return uni.showToast({ title: `请填写${field.name}`, icon: 'none' })
				}
			}

			this.submitting = true
			try {
				await voteApply(this.id, {
					name: this.form.name,
					cover: this.form.cover,
					images: this.form.images,
					description: this.form.description,
					extra_fields: JSON.stringify(this.form.extra_fields)
				})

				uni.showModal({
					title: '提交成功',
					content: this.needAudit ? '您的报名已提交，请等待审核' : '报名成功，快去拉票吧！',
					showCancel: false,
					success: () => {
						uni.navigateBack()
					}
				})
			} catch (e) {
				uni.showToast({ title: e.message || '提交失败', icon: 'none' })
			} finally {
				this.submitting = false
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.apply-page {
	min-height: 100vh;
	background: #f5f5f5;
	padding: 20rpx;
	padding-bottom: 150rpx;
}

.form-card {
	background: #fff;
	border-radius: 12rpx;
	padding: 30rpx;

	.form-item {
		margin-bottom: 30rpx;

		.label {
			display: block;
			font-size: 28rpx;
			color: #333;
			margin-bottom: 16rpx;

			.required {
				color: #e93323;
				margin-right: 4rpx;
			}
		}

		.input {
			width: 100%;
			height: 80rpx;
			background: #f8f8f8;
			border-radius: 8rpx;
			padding: 0 20rpx;
			font-size: 28rpx;
		}

		.textarea {
			width: 100%;
			height: 200rpx;
			background: #f8f8f8;
			border-radius: 8rpx;
			padding: 20rpx;
			font-size: 28rpx;
		}

		.count {
			display: block;
			text-align: right;
			font-size: 24rpx;
			color: #999;
			margin-top: 10rpx;
		}
	}
}

.upload-area {
	display: flex;
	flex-wrap: wrap;
	gap: 20rpx;

	.upload-item {
		position: relative;
		width: 180rpx;
		height: 180rpx;

		image {
			width: 100%;
			height: 100%;
			border-radius: 8rpx;
		}

		.delete {
			position: absolute;
			top: -10rpx;
			right: -10rpx;
			width: 36rpx;
			height: 36rpx;
			background: #e93323;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;

			text {
				color: #fff;
				font-size: 24rpx;
			}
		}
	}

	.upload-btn {
		width: 180rpx;
		height: 180rpx;
		background: #f8f8f8;
		border-radius: 8rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: 2rpx dashed #ddd;

		.icon {
			font-size: 48rpx;
			color: #999;
		}

		.text {
			font-size: 24rpx;
			color: #999;
			margin-top: 10rpx;
		}
	}
}

.submit-btn {
	position: fixed;
	bottom: 40rpx;
	left: 30rpx;
	right: 30rpx;
	height: 88rpx;
	line-height: 88rpx;
	text-align: center;
	background: linear-gradient(135deg, #ff6b6b, #e93323);
	color: #fff;
	font-size: 32rpx;
	font-weight: 500;
	border-radius: 44rpx;

	&.disabled {
		opacity: 0.6;
	}
}

.tips {
	position: fixed;
	bottom: 140rpx;
	left: 0;
	right: 0;
	text-align: center;

	text {
		font-size: 24rpx;
		color: #999;
	}
}
</style>
