<template>
	<view class="content" :style="list.length?'' : 'background: transparent;min-height: auto;'">
		<!-- <view class="top">
			<Tab :tablist="categoryList" tabName="id" :tabKey="pageQuery.body_part_id" @change="changeTab" />
		</view> -->

		<view class="bottom" v-if="list.length">
			<!-- <view class="time">
			今天
		</view> -->
			<view class="item" v-for="item in list" :key="item.id"
				@click="$goNextPage('./lookVideo?video=' + item.video_url+'&id=' + item.video_course_id)">
				<view class="item-left">
					<image class="video-img" :src="item.video_course_image" mode="aspectFit"></image>
					<view class="left-text" v-if="item.view_progress">
						<text v-if="item.view_progress == item.total_view_time">已看完</text>
						<text v-else>
							{{formatTime(item.view_progress)}}/{{formatTime(item.total_view_time)}}</text>
					</view>
					<view class="progress-container" v-if="item.view_progress">
						<view class="progress-bar"
							:style="{ width: (item.view_progress / item.total_view_time) * 100 + '%' }"></view>
					</view>
				</view>
				<view class="item-right">
					<view class="title">
						{{item.video_course_name}}
					</view>
					<view class="author">
						发布人：{{item.publisher_nickname}}
					</view>
					<view class="watch">
						<!-- 观看时间：2025/8/1 -->
						观看人数：{{item.view_count}}人
					</view>
				</view>
			</view>
		</view>

		<emptyPage title="暂无数据" v-else />
		<!-- <customTab active="buy_video" @height="(value) => footerHeight = value"></customTab> -->
	</view>

</template>

<script>
	import emptyPage from "@/components/emptyPage.vue"
	import customTab from '@/components/customTab';
	import Tab from '@/components/tab';
	import {
		getHealthVideoOrderList,
		getBodyParts
	} from "@/api/health.js"
	export default {
		data() {
			return {
				topHeight: 0,
				footerHeight: 0,
				list: [],
				pageQuery: {
					page: 1,
					limit: 20,
					status: 'paid',
					body_part_id: ''
				},
				categoryList: [],
				total: 0,
			}
		},
		components: {
			customTab,
			emptyPage,
			Tab
		},
		onLoad() {
			this.getCategoryList()
		},
		onShow() {
			this.pageQuery.page = 1
			this.getList()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.getList()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		// 触底加载
		async onReachBottom() {
			if (this.list.length < this.total) {
				this.pageQuery.page += 1
				this.getList()
			} else {
				uni.showToast({
					title: '没有更多了',
					icon: 'none'
				})
			}
		},
		methods: {
			changeTab(e, item) {
				this.pageQuery.body_part_id = item.id
				this.pageQuery.page = 1
				this.getList()
			},
			formatTime(seconds) {
				const date = new Date(seconds * 1000); // 将秒转换为毫秒
				const hh = date.getUTCHours();
				const mm = date.getUTCMinutes();
				const ss = date.getSeconds();
				return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
			},
			// 身体部分分类
			async getCategoryList() {
				let data = await getBodyParts()
				data.data.list.filter((v) => {
					v.id = v.id.toString()
				})
				this.categoryList = [{
					id: '',
					name: '全部'
				}, ...data.data.list]
			},
			async getList() {
				let {
					data
				} = await getHealthVideoOrderList(this.pageQuery)
				this.total = data.total
				if (this.pageQuery.page == 1) {
					this.list = data.list
				} else {
					this.list = [...this.list, ...data.list]
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		min-height: 100vh;
		background-color: #fff;

		.top {
			position: sticky;
			top: 0;
			background-color: #fff;
			z-index: 1;
		}

		.bottom {
			.time {
				margin: 20rpx 0 10rpx 20rpx;
			}

			.item {
				margin-bottom: 20rpx;
				display: flex;
				border-bottom: 2rpx solid #eee;
				padding-bottom: 20rpx;

				.item-left {
					border-radius: 20rpx;
					width: 200rpx;
					height: 200rpx;
					margin-left: 20rpx;
					position: relative;

					.video-img {
						width: 200rpx;
						height: 200rpx;
						position: absolute;
						display: block;
					}

					.left-text {
						color: #fff;
						background-color: #80808080;
						border-radius: 10rpx;
						font-size: 18rpx;
						height: 30rpx;
						padding: 0 14rpx;
						display: flex;
						align-items: center;
						text-align: center;
						position: absolute;
						bottom: 10rpx;
						right: 10rpx;

					}

					.progress-container {
						width: 200rpx;
						height: 6rpx;
						background-color: #e0e0e0;
						border-radius: 5px;
						overflow: hidden;
						position: absolute;
						bottom: 0;
					}

					.progress-bar {
						height: 100%;
						background-color: red;
					}
				}

				.item-right {
					margin-left: 30rpx;
					font-size: 32rpx;
					font-weight: bold;

					.title {
						height: 100rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}

					.author {
						color: #808080;
						font-size: 24rpx;
					}

					.watch {
						color: #808080;
						margin-top: 12rpx;
						font-size: 24rpx;
					}
				}
			}
		}
	}


	// .popup-tips {
	// 	position: relative;

	// 	.icon-chacha {
	// 		position: absolute;
	// 		right: -10rpx;
	// 		top: 0;
	// 		color: #fff;
	// 		font-size: 40rpx;
	// 		z-index: 2;
	// 		border: 1px solid #fff;
	// 		border-radius: 40rpx;
	// 		padding: 10rpx;
	// 	}

	// 	.img {
	// 		width: 562rpx;
	// 		height: 546rpx;
	// 	}

	// 	.label {
	// 		position: absolute;
	// 		width: 300rpx;
	// 		text-align: center;
	// 		line-height: 70rpx;
	// 		color: #fff;
	// 		left: 0;
	// 		right: 0;
	// 		margin: auto;
	// 		top: 258rpx;
	// 		font-size: 36rpx;
	// 	}

	// 	.btn {
	// 		background-color: #fff;
	// 		width: 342rpx;
	// 		height: 88rpx;
	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: center;
	// 		position: absolute;
	// 		left: 0;
	// 		font-size: 32rpx;
	// 		font-weight: 700;
	// 		right: 0;
	// 		border-radius: 88rpx;
	// 		bottom: 42rpx;
	// 		margin: auto;

	// 		text {
	// 			background-image: linear-gradient(137.83deg, rgba(255, 230, 140, 1), rgba(220, 170, 90, 1) 100%);
	// 			-webkit-background-clip: text;
	// 			background-clip: text;
	// 			color: transparent;
	// 		}
	// 	}
	// }
</style>