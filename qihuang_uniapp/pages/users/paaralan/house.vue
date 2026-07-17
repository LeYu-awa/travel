<template>
	<view class="">
		<Header title="收藏">
			<template #rightIcon>
				<view v-if="list.length" @click="clearList" class="new-iconfont icon-shanchu"></view>
			</template>
			<Tab :tablist="tablist" @change="changeTab" :tabKey="queryParams.type"/>
		</Header>
		<view class="content" v-if="list.length">
			<view v-for="(item, index) in list" :key="index" class="mb-2">
				<delSlideLeft :item="item" :data_transit="{ index: index, item: item }" @delItem="delItem">
					<view class="item" @click="goDetails(item.id)">
						<view class="flex"><text v-if="type[item.type]" class="mian"
								:style="{ color: type[item.type].color, borderColor: type[item.type].color }">{{
									type[item.type].label }}</text><text>{{ item.info ? item.info.name : '' }}</text></view>
						<text class="time">{{ item.create_time }}</text>
					</view>
				</delSlideLeft>
			</view>

		</view>
		<emptyPage v-else title="暂无收藏记录" />
	</view>
</template>

<script>
import Tab from "@/components/tab";
import delSlideLeft from '@/components/ay-operate/del_slideLeft.vue'
import emptyPage from "@/components/emptyPage.vue"
import Header from "@/components/header.vue"
import {
	getCollectionList,
	clearCollectionList
} from "@/api/paaralan.js"
export default {
	components: {
		emptyPage,
		Tab,
		delSlideLeft,
		Header
	},
	data() {
		return {
			type: {
				dong: {
					label: '董',
					color: ''
				},
				acupoint: {
					label: '穴'
				},
				lesson: {
					label: '视'
				},
				term: {
					label: '术'
				},
				medicinalDiet: {
					label: '药'
				},
				book: {
					label: '书'
				},
				disease: {
					label: '病'
				},
				video: {
					label: '视'
				},
				doctor: {
					label: '医'
				}
			},
			list: [],
			tabindex: '',
			queryParams: {
				page: 1,
				limit: 20,
				type: ''
			},
			tablist: [{
				name: '全部',
				key: '',
			},
			{
				name: '课程',
				key: 'lesson',
			},{
				name: '穴位',
				key: 'acupoint',
			},{
				name: '病症',
				key: 'disease',
			},{
				name: '董氏奇穴',
				key: 'dong',
			},{
				name: '视频',
				key: 'video',
			},{
				name: '书籍',
				key: 'book',
			},{
				name: '食材',
				key: 'medicine_food',
			},
			{
				name: '药膳',
				key: 'medicinal_diet',
			},{
				name: '古代医家',
				key: 'doctor',
			},{
				name: '中医术语',
				key: 'term',
			},
			],
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
			await clearCollectionList({ id: item.id,type: this.queryParams.type })
			this.list.splice(data.index, 1)

		},

		changeTab(index, item) {
			// console.log(index,item)
			this.queryParams.type = item.key
			this.queryParams.page = 1
			this.getList()
		},

		goDetails(id) {
			uni.navigateTo({
				url: '/pages/paaralan/details?id=' + id
			})
		},
		async clearList() {
			uni.showModal({
				title: '是否清空收藏？',
				content: '清空后将无法回复，请谨慎操作',
				success: async (res) => {
					// confirm()
					if (res.confirm) {
						await clearCollectionList({type: this.queryParams.type})
						this.queryParams.page = 1
						this.getList()
					}
				}
			})
		},
		async getList() {
			let {
				data
			} = await getCollectionList(this.queryParams)
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
	padding: 20rpx;

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
			font-size: 20rpx;
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