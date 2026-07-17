<template>
	<view class="video-upload-container">
		<!-- 视频选择区域 -->
		<view class="upload-area" @click="selectVideo" v-if="!videoInfo && !isUploading">
			<view class="upload-icon">
				<uni-icons type="plus" size="40" color="#666"></uni-icons>
			</view>
			<view class="upload-text">点击选择视频</view>
		</view>

		<!-- 视频预览区域 -->
		<view v-if="videoInfo && !isUploading && !uploadSuccess" class="video-preview">
			<video :src="videoInfo.tempFilePath" controls :duration="videoInfo.duration" class="video-player"></video>
			<view class="video-info">
				<text>文件名: {{ videoInfo.name }}</text>
				<text>大小: {{ formatSize(videoInfo.size) }}</text>
				<text>时长: {{ formatDuration(videoInfo.duration) }}</text>
			</view>
			<button class="upload-btn" @click="startUpload" :disabled="isUploading">
				开始上传
			</button>
		</view>

		<!-- 上传进度区域 -->
		<view v-if="isUploading" class="progress-container">
			<progress :percent="uploadProgress" stroke-width="4" activeColor="#007aff"></progress>
			<text class="progress-text">{{ uploadProgress }}%</text>
			<text class="upload-status">{{ uploadStatusText }}</text>
			<button class="cancel-btn" @click="cancelUpload">
				取消上传
			</button>
		</view>

		<!-- 上传成功提示 -->
		<view v-if="uploadSuccess" class="success-message">
			<uni-icons type="success" size="30" color="#00aa00"></uni-icons>
			<text>视频上传成功！</text>
			<button class="again-btn" @click="resetUpload">再次上传</button>
		</view>

		<!-- 错误提示 -->
		<view v-if="uploadError" class="error-message">
			<uni-icons type="clear" size="30" color="#aa0000"></uni-icons>
			<text>{{ uploadError }}</text>
			<button @click="retryUpload">重试</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoInfo: null, // 选中的视频信息
				isUploading: false, // 是否正在上传
				uploadProgress: 0, // 上传进度
				uploadStatusText: '', // 上传状态文本
				uploadSuccess: false, // 上传是否成功
				uploadError: '', // 上传错误信息
				chunkSize: 200 * 1024, // 分片大小 5MB
				chunks: [], // 分片列表
				fileMd5: '', // 文件唯一标识
				uploadCanceled: false, // 是否取消上传
				currentChunkIndex: 0, // 当前上传的分片索引
				// 上传接口地址，请替换为实际项目地址
				uploadApi: {
					chunk: `${HTTP_REQUEST_URL}/api/upload/video`, // 分片上传接口
					merge: `${HTTP_REQUEST_URL}/api/upload/video`, // 分片合并接口
					cancel: '/api/upload/cancel' // 取消上传接口
				}
			};
		},
		methods: {
			// 选择视频
			selectVideo() {
				// 重置状态
				this.resetUploadStatus();

				uni.chooseVideo({
					sourceType: ['album', 'camera'],
					maxDuration: 60, // 最大时长60秒
					camera: 'back',
					success: (res) => {
						console.log('选择视频成功', res);
						this.videoInfo = res;
						// 获取视频文件信息
						this.getFileInfo(res.tempFilePath);
					},
					fail: (err) => {
						console.error('选择视频失败', err);
						uni.showToast({
							title: '选择视频失败',
							icon: 'none'
						});
					}
				});
			},

			// 获取文件信息
			getFileInfo(filePath) {
				uni.getFileInfo({
					filePath: filePath,
					success: (res) => {
						console.log('文件信息', res);
						this.videoInfo.size = res.size;
						this.videoInfo.name = res.name || `video_${Date.now()}.mp4`;
						// 计算文件MD5，用于分片上传标识
						this.calculateFileMd5(filePath);
					},
					fail: (err) => {
						console.error('获取文件信息失败', err);
						this.uploadError = '获取文件信息失败';
					}
				});
			},

			// 改进：计算文件MD5的方法
			calculateFileMd5(filePath) {
				uni.showLoading({
					title: '准备中...'
				});

				// 使用H5+的文件系统API
				plus.io.resolveLocalFileSystemURL(filePath, (entry) => {
					entry.file((file) => {
						// 确保销毁之前的FileReader
						if (this.fileReader) {
							this.fileReader.abort();
							this.fileReader = null;
						}

						this.fileReader = new plus.io.FileReader();

						// 改进：添加所有事件监听
						this.fileReader.onloadstart = () => {
							console.log('文件读取开始');
						};

						this.fileReader.onprogress = (e) => {
							console.log(`文件读取进度: ${Math.floor(e.loaded / e.total * 100)}%`);
						};

						this.fileReader.onload = (e) => {
							console.log('文件读取成功');
							const md5 = this.simpleHash(e.target.result);
							this.fileMd5 = md5;
							console.log('文件MD5:', this.fileMd5);
							uni.hideLoading();
						};

						this.fileReader.onabort = () => {
							console.log('文件读取被中止');
							uni.hideLoading();
							this.uploadError = '文件读取被中止';
						};

						this.fileReader.onerror = (e) => {
							console.error('文件读取错误:', e);
							uni.hideLoading();
							// 错误代码说明
							const errorCodes = {
								1: '未找到文件',
								2: '安全错误',
								3: '文件读取被中断',
								4: '文件不可读',
								5: '编码错误'
							};
							this.uploadError = `文件读取失败: ${errorCodes[e.code] || '未知错误'}`;
						};

						this.fileReader.onloadend = (e) => {
							console.log('文件读取完成（无论成功或失败）');
						};

						// 读取文件内容
						this.fileReader.readAsArrayBuffer(file);
					}, (err) => {
						console.error('获取文件对象失败:', err);
						uni.hideLoading();
						this.uploadError = '获取文件信息失败';
					});
				}, (err) => {
					console.error('解析文件路径失败:', err);
					uni.hideLoading();
					this.uploadError = '无法访问文件';
				});
			},

			// 改进：读取分片文件的方法
			readChunkFile(filePath, start, end, index) {
				return new Promise((resolve, reject) => {
					plus.io.resolveLocalFileSystemURL(filePath, (entry) => {
						entry.file((file) => {
							const reader = new plus.io.FileReader();

							reader.onload = (e) => {
								resolve({
									index,
									data: e.target.result
								});
							};

							reader.onerror = (e) => {
								console.error(`分片${index}读取错误:`, e);
								reject(new Error(`分片${index}读取失败: ${e.message || '未知错误'}`));
							};

							// 读取指定范围的文件内容
							try {
								const blob = file.slice(start, end);
								reader.readAsDataURL(blob);
							} catch (e) {
								console.error(`分片${index}处理错误:`, e);
								reject(new Error(`分片处理失败: ${e.message}`));
							}
						}, (err) => {
							reject(new Error(`获取文件对象失败: ${err.message}`));
						});
					}, (err) => {
						reject(new Error(`解析路径失败: ${err.message}`));
					});
				});
			},

			// 简单哈希函数，实际项目中应使用标准MD5算法
			simpleHash(buffer) {
				const uint8Array = new Uint8Array(buffer);
				let hash = 0;
				for (let i = 0; i < uint8Array.length; i++) {
					hash = ((hash << 5) - hash) + uint8Array[i];
					hash |= 0; // 转换为32位整数
				}
				return Math.abs(hash).toString(16);
			},

			// 开始上传
			startUpload() {
				if (!this.videoInfo || !this.fileMd5) {
					uni.showToast({
						title: '请先选择视频',
						icon: 'none'
					});
					return;
				}

				this.isUploading = true;
				this.uploadSuccess = false;
				this.uploadError = '';
				this.uploadCanceled = false;
				this.currentChunkIndex = 0;
				this.uploadProgress = 0;
				this.uploadStatusText = '准备分片...';

				// 计算分片数量
				const chunkCount = Math.ceil(this.videoInfo.size / this.chunkSize);
				this.chunks = Array.from({
					length: chunkCount
				}, (_, i) => i);

				// 开始上传分片
				this.uploadNextChunk();
			},

			// 上传下一个分片
			uploadNextChunk() {
				if (this.uploadCanceled) {
					this.resetUploadStatus();
					return;
				}

				if (this.currentChunkIndex >= this.chunks.length) {
					// 所有分片上传完成，通知服务器合并
					this.mergeChunks();
					return;
				}

				const chunkIndex = this.currentChunkIndex;
				const start = chunkIndex * this.chunkSize;
				const end = Math.min(start + this.chunkSize, this.videoInfo.size);

				this.uploadStatusText = `上传分片 ${chunkIndex + 1}/${this.chunks.length}`;

				// 读取分片数据
				this.readChunkFile(this.videoInfo.tempFilePath, start, end, chunkIndex)
					.then(chunkData => {
						// 上传分片
						return this.uploadChunk(chunkData, chunkIndex, this.chunks.length);
					})
					.then(() => {
						// 计算进度
						this.currentChunkIndex++;
						this.uploadProgress = Math.floor((this.currentChunkIndex / this.chunks.length) * 100);
						// 继续上传下一个分片
						this.uploadNextChunk();
					})
					.catch(err => {
						console.error('分片上传失败', err);
						this.isUploading = false;
						this.uploadError = `分片 ${chunkIndex + 1} 上传失败: ${err.message || '未知错误'}`;
					});
			},


			// 上传分片
			uploadChunk(chunk, index, totalChunks) {
				return new Promise((resolve, reject) => {
					const formData = new FormData();
					formData.append('chunk', chunk.data);
					formData.append('index', index);
					formData.append('total', totalChunks);
					formData.append('fileMd5', this.fileMd5);
					formData.append('fileName', this.videoInfo.name);

					uni.request({
						url: this.uploadApi.chunk,
						method: 'POST',
						header: {
							'Content-Type': 'multipart/form-data'
						},
						data: formData,
						success: (res) => {
							if (res.statusCode === 200 && res.data.success) {
								resolve();
							} else {
								reject(new Error(res.data.message || '上传分片失败'));
							}
						},
						fail: (err) => {
							reject(new Error(`网络错误: ${err.errMsg}`));
						}
					});
				});
			},

			// 合并分片
			mergeChunks() {
				this.uploadStatusText = '正在合并文件...';

				uni.request({
					url: this.uploadApi.merge,
					method: 'POST',
					data: {
						fileMd5: this.fileMd5,
						fileName: this.videoInfo.name,
						totalChunks: this.chunks.length
					},
					success: (res) => {
						this.isUploading = false;
						if (res.statusCode === 200 && res.data.success) {
							this.uploadSuccess = true;
							this.uploadStatusText = '上传完成';
							console.log('文件合并成功', res.data);
							uni.showToast({
								title: '上传成功',
								icon: 'success'
							});
						} else {
							this.uploadError = `合并文件失败: ${res.data.message || '未知错误'}`;
						}
					},
					fail: (err) => {
						this.isUploading = false;
						this.uploadError = `合并文件网络错误: ${err.errMsg}`;
					}
				});
			},

			// 取消上传
			cancelUpload() {
				this.uploadCanceled = true;
				this.uploadStatusText = '已取消上传';

				// 通知服务器取消上传
				uni.request({
					url: this.uploadApi.cancel,
					method: 'POST',
					data: {
						fileMd5: this.fileMd5
					},
					success: (res) => {
						console.log('取消上传通知成功', res);
					},
					fail: (err) => {
						console.error('取消上传通知失败', err);
					}
				});

				setTimeout(() => {
					this.resetUploadStatus();
				}, 1000);
			},

			// 重试上传
			retryUpload() {
				this.startUpload();
			},

			// 重置上传状态
			resetUploadStatus() {
				this.isUploading = false;
				this.uploadProgress = 0;
				this.uploadStatusText = '';
				this.uploadSuccess = false;
				this.uploadError = '';
				this.uploadCanceled = false;
				this.currentChunkIndex = 0;
			},

			// 重置上传，可再次选择文件
			resetUpload() {
				this.resetUploadStatus();
				this.videoInfo = null;
				this.fileMd5 = '';
				this.chunks = [];
			},

			// 格式化文件大小
			formatSize(size) {
				if (size < 1024) {
					return `${size} B`;
				} else if (size < 1024 * 1024) {
					return `${(size / 1024).toFixed(2)} KB`;
				} else {
					return `${(size / (1024 * 1024)).toFixed(2)} MB`;
				}
			},

			// 格式化时长
			formatDuration(duration) {
				const minutes = Math.floor(duration / 60);
				const seconds = Math.floor(duration % 60);
				return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
			}
		}
	};
</script>

<style scoped>
	.video-upload-container {
		display: flex;
		flex-direction: column;
		padding: 20rpx;
	}

	.upload-area {
		width: 100%;
		height: 300rpx;
		border: 2rpx dashed #ccc;
		border-radius: 16rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 30rpx;
		background-color: #f9f9f9;
	}

	.upload-icon {
		margin-bottom: 20rpx;
	}

	.upload-text {
		color: #666;
		font-size: 28rpx;
	}

	.video-preview {
		margin-bottom: 30rpx;
	}

	.video-player {
		width: 100%;
		height: 400rpx;
		margin-bottom: 20rpx;
	}

	.video-info {
		display: flex;
		flex-direction: column;
		gap: 10rpx;
		margin-bottom: 20rpx;
		font-size: 26rpx;
		color: #333;
	}

	.upload-btn {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		background-color: #007aff;
		color: white;
		border-radius: 10rpx;
	}

	.progress-container {
		margin: 30rpx 0;
	}

	.progress-text {
		display: block;
		text-align: center;
		margin: 10rpx 0;
		font-size: 28rpx;
	}

	.upload-status {
		display: block;
		text-align: center;
		margin: 10rpx 0;
		font-size: 26rpx;
		color: #666;
	}

	.cancel-btn {
		margin-top: 20rpx;
		color: #ff3b30;
		background-color: transparent;
		font-size: 28rpx;
	}

	.success-message {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 30rpx 0;
		color: #00aa00;
		font-size: 30rpx;
		gap: 10rpx;
	}

	.again-btn {
		margin-top: 10rpx;
		color: #007aff;
		background-color: transparent;
	}

	.error-message {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 30rpx 0;
		color: #aa0000;
		font-size: 30rpx;
		gap: 10rpx;
	}

	.error-message button {
		margin-top: 10rpx;
		color: #007aff;
		background-color: transparent;
	}
</style>