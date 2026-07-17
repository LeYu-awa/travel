<template>
	<view class="">
		<video class="video" id="myVideo" :src="video" :autoplay="true" @timeupdate="timeupdate" show-mute-btn></video>
	</view>
</template>

<script>
	import {
		updateVideoProgress
	} from "@/api/health.js"
	export default {
		data() {
			return {
				id: '', // 视频id
				currentTime: '', // 观看时长
				video: '', // 视频url
				duration: '', // 视频总时长
			}
		},
		onUnload() {
			if (this.id) {
				updateVideoProgress({
					video_id: this.id,
					watch_duration: this.currentTime,
					total_duration: this.duration
				})
			}
		},
		onLoad(e) {
			this.id = e.id
			this.video = e.video
		},
		methods: {
			timeupdate({
				detail
			}) {
				this.currentTime = detail.currentTime
				this.duration = detail.duration

			},
		}
	}
</script>

<style lang="scss" scoped>
	.video {
		width: 100%;
		height: 100vh;
	}
</style>