<template>
	<view>
		<Header title="历史播放">
			<template #rightIcon>
				<view v-if="list.length" @click="clearList" class="new-iconfont icon-shanchu"></view>
			</template>
		</Header>
		<view class="hot">
			<view class="list" v-if="list.length">
				<view v-for="(item, index) in list" :key="index" class="mb-2">
					<delSlideLeft :item="item" :data_transit="{ index: index, item: item }" @delItem="delItem">

						<view class="item" @click="goDetails(item.id)">
							<view class="left">
								<image class="img" :src="item.cover_image" mode=""></image>
								<view class="tag">
									{{ formatTime(item.view_duration) }}/{{ formatTime(item.material_duration) }}
								</view>
							</view>
							<view class="right">
								<view class="label">
									{{ item.name }}
								</view>
								<div class="text pt-2">
									{{ item.label }}
								</div>
								<view class="text pt-2">
									{{ item.introduction }}
								</view>

							</view>
						</view>

					</delSlideLeft>
				</view>
			</view>

			<emptyPage v-else title="暂无历史记录" />
		</view>
	</view>
</template>

<script>
import emptyPage from "@/components/emptyPage.vue"
import Header from "@/components/header.vue"
import delSlideLeft from '@/components/ay-operate/del_slideLeft.vue'

import {
	getSubjectViewList
} from "@/api/paaralan.js"
export default {
	name: 'History',
	components: {
		emptyPage,
		Header,
		delSlideLeft
	},
	data() {
		return {
			list: [],

			queryParams: {
				page: 1,
				limit: 10,
				type: 3
			}
		};
	},
	onShow() {
		this.getList()
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.queryParams.page = 1
		this.getList()
		setTimeout(function () {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	// 触底加载
	async onReachBottom() {
		this.queryParams.page += 1
		this.getList()
	},
	methods: {
		async getList() {
			let {
				data
			} = await getSubjectViewList(this.queryParams)
			if (this.queryParams.page == 1) {
				this.list = data.list || []
			} else {
				this.list = [...this.list, ...data.list]
			}
		},
		async delItem({
			data,
			item
		}) {
			await clearSubjectViewList({
				id: item.id
			})
			this.list.splice(data.index, 1)
		},
		goDetails(id) {
			uni.navigateTo({
				url: '/pages/paaralan/details?id=' + id
			})
		},

		formatTime(seconds) {
			const date = new Date((seconds || 0) * 1000); // 将秒转换为毫秒
			const hh = date.getUTCHours();
			const mm = date.getUTCMinutes();
			const ss = date.getSeconds();
			return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
		},
		async clearList() {
			uni.showModal({
				title: '是否清空播放历史？',
				content: '清空后将无法回复，请谨慎操作',
				success: async (res) => {
					// confirm()
					if (res.confirm) {
						await clearSubjectViewList()
						this.queryParams.page = 1
						this.getList()
					}
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.hot {
	padding: 30rpx 30rpx 0;

	.list {

		.mb-2 {
			margin-bottom: 20rpx;
		}

		.item {
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;

			&:last-of-type {
				margin-bottom: 0;
			}

			.left {
				position: relative;

				.img {
					width: 260rpx;
					height: 160rpx;
					border-radius: 12rpx;
					display: block;
				}

				.tag {
					background-color: #00000044;
					color: #fff;
					position: absolute;
					right: 0;
					bottom: 4rpx;
					width: 200rpx;
					height: 36rpx;
					border-top-left-radius: 10rpx;
					border-bottom-right-radius: 10rpx;
					font-size: 20rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}

			.right {
				width: calc(100% - 280rpx);
				margin-left: 20rpx;

				.label {
					font-size: 32rpx;
					font-weight: 700;
				}

				.pt-2 {
					padding-top: 20rpx;
				}

				.text {
					color: #777;
					font-size: 26rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;

					.new-iconfont {
						margin-right: 10rpx;
					}
				}
			}
		}
	}

}
</style>