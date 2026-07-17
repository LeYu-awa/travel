<template>
	<view class="">
		<Header title="历史足迹">
			<template #rightIcon>
				<view v-if="list.length" @click="clearList" class="new-iconfont icon-shanchu"></view>
			</template>
		</Header>
		<view class="content" v-if="list.length">
			<view v-for="(item, index) in list" :key="index" class="mb-2">
				<delSlideLeft :item="item" :data_transit="{ index: index, item: item }" @delItem="delItem">
					<view class="item" @click="goDetails(item.id)">
						<view class="flex"><text class="mian">{{item.label}}</text><text>{{ item.name }}</text></view>
						<text class="time">{{ item.view_time }}</text>
					</view>
				</delSlideLeft>
			</view>
		</view>
		<emptyPage v-else title="暂无历史记录" />
	</view>
</template>

<script>
import delSlideLeft from '@/components/ay-operate/del_slideLeft.vue'
import emptyPage from "@/components/emptyPage.vue"
import Header from "@/components/header.vue"
import {
	getSubjectViewList,
	clearSubjectViewList
} from "@/api/paaralan.js"
export default {
	components: {
		emptyPage,
		delSlideLeft,
		Header
	},
	data() {
		return {
			list: [],
			queryParams: {
				page: 1,
				limit: 20
			}
		}
	},
	onLoad() {
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
		async delItem({ data, item }) {
			await clearSubjectViewList({ id: item.id })
			this.list.splice(data.index, 1)
		},
		goDetails(id) {
			uni.navigateTo({
				url: '/pages/paaralan/details?id=' + id
			})
		},
		async clearList() {
			uni.showModal({
				title: '是否清空历史足迹？',
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
		},
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
	}
}
</script>

<style scoped lang="scss">
.content {
	margin: 20rpx;

	.mb-2 {
		margin-bottom: 20rpx;
	}

	.item {
		display: flex;
		padding: 20rpx;
		justify-content: space-between;

		.mian {
			min-width: 40rpx;
			padding: 0 12rpx;
			height: 40rpx;
			border: 2rpx solid red;
			color: red;
			border-radius: 10rpx;
			line-height: 40rpx;
			font-size: 24rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 10rpx;
		}

		.time {
			font-size: 24rpx;
			color: #999;
		}
	}
}
</style>