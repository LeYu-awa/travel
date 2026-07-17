<template>
	<view class="">
		<view class="bg">
			<Tab :tablist="tabList" @change="change" :tabKey="pageQuery.status" />
		</view>
		
		<view class="content" v-if="list.length">
			<view class="item" v-for="item in list" :class="'item'+item.status">
				<view class="title">
					{{item.title}}
					<text>{{tabList[item.status] && tabList[item.status].label}}</text>
				</view>
				<view class="item-content">
					<view>直播时间：{{item.live_start_time}}</view>
					<view>专科直播讲师：{{item.lecturer_name}}</view>
					<view class="item-btn">
						<!-- <view class="btn btn-booking" v-if="item.status == 1"
							@click="$goNextPage('/pages/lives/index?id=' + item.appointment_id)">取消预约</view> -->
						<view class="btn btn-alreadyBooked" v-if="item.status == 1"
							@click="cancelData(item.appointment_id)">取消预约</view>
						<view class="btn" v-if="item.status == 1" @click="$goNextPage('/pages/live_pusher/live_room/live_room?roomId=' + item.live_id)">去观看</view>
						<view class="btn" v-if="item.playback_info && item.playback_info.record_list.length" @click="lookVideo(item)">看回放</view>
						<!-- <view class="btn btn-alreadyBooked" v-if="item.status != 1">已</view> -->
					</view>
				</view>
			</view>
		</view>
		<emptyPage v-else />
		<customTab active="live"></customTab>
	</view>
</template>

<script>
	import {
		getUserAppointmentList,
		cancelAppointment
	} from '@/api/live.js'
	import emptyPage from "@/components/emptyPage.vue"
	import customTab from '@/components/customTab';
	import Tab from '@/components/tab';
	export default {
		data() {
			return {
				list: [],
				pageQuery: {
					page: 1,
					limit: 20,
					status: ''
				},
				total: 0,
				tabList: [{
						label: '全部',
						key: ''
					},
					{
						label: '已预约',
						key: '1'
					},
					{
						label: '已取消',
						key: '2'
					},
					{
						label: '已结束',
						key: '3'
					},
				]
			}
		},
		components: {
			customTab,
			emptyPage,
			Tab
		},
		onShow() {
			this.getList()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.pageQuery.page = 1
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
			lookVideo(item){
				const info = item.playback_info || item
				if(!info.record_list || !info.record_list.length) return;
				uni.setStorageSync('playbackBanners', item.playback_banners || '');
				if(info.record_list.length === 1){
					this.$goNextPage('/pages/healths/lookVideo?video=' + encodeURIComponent(info.record_list[0].RecordUrl))
				} else {
					const records = info.record_list.map((r, i) => ({
						index: i + 1,
						url: r.RecordUrl,
						start_time: r.StartTime,
						end_time: r.EndTime,
						duration: r.Duration
					}));
					uni.setStorageSync('playbackRecords', records);
					uni.navigateTo({
						url: '/pages/healths/playbackList'
					});
				}
			},
			change(e, item) {
				this.pageQuery.status = item.key
				this.getList()
			},
			// 取消预约
			async cancelData(id) {
				let that = this
				uni.showModal({
					title: '提示',
					content: '您确定要取消预约吗？',
					success: async (res) => {
						if (res.confirm) {
							await cancelAppointment({
								appointment_id: id
							})
							uni.showToast({
								title: '取消成功',
								success() {
									setTimeout(() => {
										that.pageQuery.page = 1
										that.getList()
									}, 1000)
								}
							})
						}
					}
				})
			
			},
			async getList() {
				let {
					data
				} = await getUserAppointmentList(this.pageQuery)
				this.total = data.total
				if (this.pageQuery.page == 1) {
					this.list = data.list
				} else {
					this.list = [...this.list, ...data.list]
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg {
		background-color: #fff;
	}

	.content {
		.item {
			border-radius: 20rpx;
			background: linear-gradient(180.00deg, rgba(47, 129, 255, 1), rgba(178, 203, 234, 1) 100%);
			margin: 20rpx 40rpx;
			padding-bottom: 4rpx;

			.title {
				font-size: 32rpx;
				color: #fff;
				padding: 0 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				text {
					font-size: 48rpx;
					color: #ffffff55;
				}
			}

			.item-content {
				background-color: #fff;
				margin: 0 4rpx;
				padding: 16rpx;
				border-radius: 20rpx;
				line-height: 50rpx;

				.item-btn {
					display: flex;
					justify-content: end;
					margin-top: 12rpx;

					.btn {
						color: #fff;
						width: 160rpx;
						height: 64rpx;
						background: linear-gradient(180.00deg, rgba(38, 67, 127, 1), rgba(7, 16, 47, 1) 100%);
						border-radius: 32rpx;
						text-align: center;
						line-height: 64rpx;
						margin-left: 24rpx;
					}

					.btn-booking {
						background: linear-gradient(137.83deg, rgba(255, 230, 140, 1), rgba(220, 170, 90, 1) 100%);
					}

					.btn-alreadyBooked {
						font-family: OPPOSans;
						color: black;
						background: rgba(242, 242, 242, 1)
					}
				}
			}
		}

		.item2 {
			background: linear-gradient(180.00deg, rgba(3, 167, 239, 1), rgba(153, 213, 237, 1) 100%);
		}

		.item3 {
			background: linear-gradient(180.00deg, rgba(93, 188, 26, 1), rgba(197, 228, 169, 1) 100%);
		}

		.item4 {
			background: linear-gradient(180.00deg, rgba(154, 154, 154, 1), rgba(201, 201, 201, 1) 100%);
		}
	}
</style>