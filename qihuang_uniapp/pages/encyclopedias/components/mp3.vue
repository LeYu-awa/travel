<template>
	<view class="mp3" v-if="src && show">
		<!-- <audio style="text-align: left" :src="src || 'https://qh.cg24.cn/uploads/file/48/13d9a1243decc5cb0d0ff76a35dc3c.mp3'" :name="title" author="暂无" :action="audioAction" controls></audio> -->
		<view @click="is_play ? pause() : play()" class="center new-iconfont"
			:class="is_play ? 'icon-weibiaoti--' : 'icon-bofang'"></view>
		<view class="item">
			<view class="label">{{title}}</view>
			<view>{{current || '00:00:00'}}/{{duration || '00:00:00'}}</view>
		</view>
		<!-- <view class="item ml-3">
			倍数：1X
		</view> -->
		<view class="new-iconfont icon-chacha" @click="destroy()">
			
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			src: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			show: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			show: {
				handler(value) {
					if (value) {
						this.init()
					} else {
						this.destroy()
					}
				},

			}
		},
		data() {
			return {
				current: '',
				duration: '',
				is_play: false,
				innerAudioContext: '',
				audioAction: {
					method: 'pause'
				}
			}
		},
		methods: {
			init() {
				this.innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.autoplay = true;
				this.innerAudioContext.src = this.src;


				this.innerAudioContext.onPlay(() => {
					console.log('开始播放');
					this.duration = this.formatTime(this.innerAudioContext.duration)
					this.is_play = true
				});

				// 监听播放进度更新
				this.innerAudioContext.onTimeUpdate((e) => {
					this.current = this.formatTime(this.innerAudioContext.currentTime)

				});

				// console.log(a)
				this.innerAudioContext.onError((res) => {
					console.log(res);
					// console.log(res.errCode);
				});
			},
			formatTime(seconds) {
				const date = new Date(seconds * 1000); // 将秒转换为毫秒
				const hh = date.getUTCHours();
				const mm = date.getUTCMinutes();
				const ss = date.getSeconds();
				return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
			},
			play() {
				console.log(123)
				this.innerAudioContext.play()
				this.is_play = true
			},
			pause() {
				this.innerAudioContext.pause()
				this.is_play = false
			},
			destroy() {
				this.innerAudioContext.destroy()
				this.is_play = false
				this.$emit('destroy')
			},
		}
	}
</script>
<style lang="scss" scoped>
	.mp3 {
		background-color: #F3F2ED;
		position: fixed;
		bottom: 200rpx;
		width: 500rpx;
		height: 100rpx;
		border-radius: 100rpx;
		left: 30rpx;
		display: flex;
		align-items: center;
		padding: 0 30rpx;

		.item {
			text-align: left;

			.label {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.new-iconfont {
				width: 50%;
				text-align: right;
				font-size: 40rpx;
			}
		}

		.center {
			// border: 4rpx solid #B0AFAA;
			font-size: 70rpx;
			width: 80rpx;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 20rpx;
		}
	}
	.icon-chacha{
		position: absolute;
		right: 0;
		top: -6rpx;
		background-color: #88888866;
		border-radius: 50%;
		width: 40rpx;
		height: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
	}
</style>