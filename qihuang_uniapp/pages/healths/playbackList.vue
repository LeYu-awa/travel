<template>
	<view class="playback-list">
		<view class="record-item" v-for="(item, idx) in records" :key="item.index" @click="playRecord(item)">
			<image v-if="getBanner(idx)" class="record-banner" :src="getBanner(idx)" mode="aspectFill" @click.stop="playRecord(item)"></image>
			<view class="record-body">
				<view class="record-title">回放 {{ item.index }}</view>
				<view class="record-info">
					<view class="record-time">{{ formatTime(item.start_time) }} ~ {{ formatTime(item.end_time) }}</view>
					<view class="record-duration">时长: {{ formatDuration(item.duration) }}</view>
				</view>
				<view class="record-play">点击播放</view>
			</view>
		</view>
		<emptyPage v-if="!records.length" />
	</view>
</template>

<script>
	import emptyPage from "@/components/emptyPage.vue"
	export default {
		components: { emptyPage },
		data() {
			return {
				records: [],
				banners: []
			}
		},
		onLoad() {
			try {
				const data = uni.getStorageSync('playbackRecords');
				if (data) {
					this.records = typeof data === 'string' ? JSON.parse(data) : data;
				}
				const bannersData = uni.getStorageSync('playbackBanners');
				if (bannersData) {
					this.banners = typeof bannersData === 'string' ? JSON.parse(bannersData) : (Array.isArray(bannersData) ? bannersData : []);
				}
			} catch (e) {
				this.records = [];
				this.banners = [];
			}
		},
		onUnload() {
			uni.removeStorageSync('playbackRecords');
			uni.removeStorageSync('playbackBanners');
		},
		methods: {
			getBanner(idx) {
				if (!this.banners || !this.banners.length) return '';
				return this.banners[idx % this.banners.length];
			},
			playRecord(item) {
				uni.navigateTo({
					url: '/pages/healths/lookVideo?video=' + encodeURIComponent(item.url)
				});
			},
			formatTime(t) {
				if (!t) return '--';
				return t.replace('T', ' ').replace('Z', '');
			},
			formatDuration(seconds) {
				if (!seconds) return '0秒';
				const h = Math.floor(seconds / 3600);
				const m = Math.floor((seconds % 3600) / 60);
				const s = seconds % 60;
				if (h > 0) return h + '时' + m + '分' + s + '秒';
				if (m > 0) return m + '分' + s + '秒';
				return s + '秒';
			}
		}
	}
</script>

<style lang="scss" scoped>
	.playback-list {
		padding: 20rpx;
	}
	.record-item {
		background: #fff;
		border-radius: 16rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
		.record-banner {
			width: 100%;
			height: 320rpx;
		}
		.record-body {
			padding: 24rpx;
		}
		.record-title {
			font-size: 32rpx;
			font-weight: bold;
			margin-bottom: 12rpx;
		}
		.record-info {
			.record-time {
				font-size: 26rpx;
				color: #666;
			}
			.record-duration {
				font-size: 26rpx;
				color: #999;
				margin-top: 8rpx;
			}
		}
		.record-play {
			margin-top: 16rpx;
			text-align: center;
			color: #fff;
			background: linear-gradient(180deg, rgba(38, 67, 127, 1), rgba(7, 16, 47, 1) 100%);
			border-radius: 32rpx;
			height: 64rpx;
			line-height: 64rpx;
			font-size: 28rpx;
		}
	}
</style>
