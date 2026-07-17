<template>
	<view class="page">
		<view class="search">
			<view class="item">
				<view :class="['label ', {select: queryParams.type_id == ''}]" @click="setSearch('type_id', '')">
					全部
				</view>
				<view class="content">
					<view v-for="item in searchList" :key="item.id"
						:class="['tag', {select: queryParams.type_id == item.id}]"
						@click="setSearch('type_id', item.id)">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="item">
				<view :class="['label ', {select: queryParams.is_pay == ''}]" @click="setSearch('is_pay', '')">
					全部
				</view>
				<view class="content">
					<view :class="['tag', {select: queryParams.is_pay == '1'}]" @click="setSearch('is_pay', '1')">
						付费
					</view>
					<view :class="['tag', {select: queryParams.is_pay == '0'}]" @click="setSearch('is_pay', '0')">
						免费
					</view>
				</view>
			</view>
			<view class="item">
				<view class="text">
					排序方式
				</view>
				<view class="content">
					
					<view :class="['tag', {select: queryParams.order_by == 'create_time'}]"
						@click="setSearch('order_by', 'create_time')">
						最近更新
					</view>
					<view :class="['tag', {select: queryParams.order_by == 'view_num'}]"
						@click="setSearch('order_by', 'view_num')">
						播放量
					</view>
				</view>
			</view>
		</view>
		<!-- 常规列表 -->
		<list v-if="list.length" :header="false" :list="list" />

		<emptyPage v-else title="暂无内容" />
	</view>
</template>

<script>
	import topSearch from './components/topSearch';
	import hot from './components/hot';
	import list from './components/list';
	import emptyPage from "@/components/emptyPage.vue"
	import {
		getTypeList,
		getSubjectListByType
	} from "@/api/paaralan.js";
	export default {
		components: {
			topSearch,
			hot,
			list,
			emptyPage
		},
		data() {
			return {
				searchList: [],
				list: [],
				queryParams: {
					page: 1,
					limit: 10,
					type_id: '',
					is_pay: '',
					order_by: 'create_time',
				},
			};
		},
		onShow() {
			
		},
		onLoad(e) {
			this.queryParams.type_id = e.id || ''
			this.init()
		},
		// 下拉刷新
		// onPullDownRefresh() {
		// 	this.queryParams.page = 1
		// 	this.getList()
		// 	setTimeout(function() {
		// 		uni.stopPullDownRefresh();
		// 	}, 1000);
		// },
		// 触底加载
		async onReachBottom() {
			this.queryParams.page += 1
			this.getList()
		},
		methods: {
			async init() {
				let {
					data
				} = await getTypeList()
				let arr = []
				data.filter(v => {
					arr.push(...v.child)
				})
				this.searchList = arr
				this.getList()
			},
			// 设置头部的筛选条件
			setSearch(type, value) {
				this.queryParams.page = 1
				this.queryParams[type] = value
				this.getList()
			},
			async getList() {
				let {
					data
				} = await getSubjectListByType(this.queryParams)
				if (this.queryParams.page == 1) {
					this.list = data.list || []
				} else {
					this.list = [...this.list, ...data.list]
				}
			},
		}
	}
</script>
<style scoped lang="less">
	.search {
		padding: 30rpx;
		position: sticky;
		top: 0;
		background: #fff;
		z-index: 2;

		.item {
			display: flex;
			margin-top: 16rpx;

			.label,
			.tag {
				padding: 10rpx 20rpx;
				height: 60rpx;
				white-space: nowrap;
			}

			.text {
				padding: 10rpx 20rpx 10rpx 0;
			}

			.tag {
				text-align: center;
				min-width: 20%;
			}

			.select {
				background-color: #C1A06B;
				color: #fff;
				border-radius: 20rpx;
			}

			.content {
				display: flex;
				flex-wrap: wrap;

			}
		}
	}
</style>