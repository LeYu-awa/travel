<template>
	<view class="page">
		<view class="top">
			<view class="sreach">
				<input type="text" v-model="keyWord" @confirm="init()" placeholder="搜索食材名称，您想知道的都在这里~" />
			</view>
			<Tab v-if="type == 'food1' || type == 'food2'" @change="changeTab" :tablist="getTablist" />
			<view class="tags" v-if="showSreach">

				<view class="tag" :class="item.id == selectId ? 'select' : ''" v-for="item in category" :key="item.id"
					@click="selectTag(item)">
					{{ item.name }}
				</view>
			</view>
			<view class="tags" v-else>
				<view class="w-l">
					<scroll-view scroll-x="true">
						<view class="scroll-view">
							<view class="tag" :class="item.id == selectId ? 'select' : ''" v-for="item in category"
								:key="item.id" @click="selectTag(item)">
								{{ item.name }}
							</view>
						</view>
					</scroll-view>
				</view>

				<view class="filter" @click="showSreach = true">
					<view class="new-iconfont icon-shaixuan"></view>
					筛选
				</view>
			</view>
			<view v-if="showSreach" class="close" @click="showSreach = false">关闭</view>
		</view>

		<view @click="showSreach = false" class="mask" v-if="showSreach"></view>
		<view class="content" v-if="list.length">
			<view class="item" v-for="item in list" :key="item.id" @click="goNextPage(item)">
				<image :src="item.cover || item.image" class="logo" />
				<view class="right">
					<view class="">
						<view class="title">
							{{ item.name }}
						</view>
						<view class="text" v-if="type == 'medicinalDiet'">
							{{ item.source }};{{ item.effect }};{{ item.formula }}
						</view>
						<view v-else class="text">
							{{ item.author }}
						</view>
					</view>
					<view class="new-iconfont icon-right">

					</view>
				</view>
			</view>
		</view>
		<emptyPage v-else title="暂无历史记录" />
	</view>
</template>

<script>
	import emptyPage from "@/components/emptyPage.vue"

	import Tab from "@/components/tab";
	import {
		medicinalDietList,
		medicinalDietEfficacyList,
		foodCategoryList,
		foodList,
		searchBookList,
		medicineFoodEfficacyCategoryList
	} from "@/api/encyclopedia.js";
	export default {
		components: {
			Tab,
			emptyPage
		},
		data() {
			return {
				type: '',
				list: [],
				showSreach: false,
				category: [],
				selectId: '',
				keyWord: '',
				// tablist: [{
				// 		name: '功效',
				// 		id: 0,
				// 	},
				// 	{
				// 		name: '性味与归经',
				// 		id: 0,
				// 	},
				// 	{
				// 		name: '品类',
				// 		id: 0,
				// 	},
				// ],
			}
		},
		computed: {
			getTablist() {
				if (this.type == 'food1') {
					return [{
							name: '功效',
						},
						{
							name: '性味与归经',
						},
						{
							name: '品类',
						},
					]
				} else {
					return [{
							name: '功效',
						},
						{
							name: '药性',
						},
					]
				}
			}
		},
		onLoad(e) {
			this.type = e.type
			this.init()
		},
		methods: {
			init() {
				switch (this.type) {
					case 'book': // 书籍
						this.getBook()
						break;
					case 'food1': // 食材
					case 'food2': // 食材
						this.getfood()
						break;
					case 'medicinalDiet': // 药膳
						this.getmedicinalDiet()
						break;
				}
			},
			async getBook() {
				let {
					data: {
						list
					}
				} = await searchBookList({
					category: this.selectId || '',
					name: this.keyWord || ''
				})
				this.list = list
				this.category = [{
						id: '经典',
						name: "经典"
					},
					{
						id: '方剂',
						name: "方剂"
					},
					{
						id: '方药',
						name: "方药"
					},
					{
						id: '针灸',
						name: "针灸"
					},
					{
						id: '医案',
						name: "医案"
					},
					{
						id: '临床应用',
						name: "临床应用"
					},
					{
						id: '养生',
						name: "养生"
					},
					{
						id: '内科',
						name: "内科"
					},
					{
						id: '外科',
						name: "外科"
					},
					{
						id: '儿科',
						name: "儿科"
					},
					{
						id: '骨伤科',
						name: "骨伤科"
					},
					{
						id: '妇产科',
						name: "妇产科"
					},
					{
						id: '五官科',
						name: "五官科"
					},
					{
						id: '其他',
						name: "其他"
					},
				]
			},
			async changeTab(index, item) {
				if(index == 0){
					let category = await medicineFoodEfficacyCategoryList({
						limit: 1000
					})
					this.category = category.data.list
				}else{
					if (this.type == 'food1') {
						if (index == 1) {
							this.category = [
								{
									id: '平',
									name: "平"
								}, 
								{
									id: '温',
									name: "温"
								}, {
									id: '凉',
									name: "凉"
								}, {
									id: '寒',
									name: "寒"
								}, {
									id: '甘',
									name: "甘"
								}, {
									id: '酸',
									name: "酸"
								}, {
									id: '辛',
									name: "辛"
								}, {
									id: '苦',
									name: "苦"
								}, {
									id: '咸',
									name: "咸"
								}, {
									id: '肺',
									name: "肺"
								}, {
									id: '大肠',
									name: "大肠"
								}, {
									id: '胃',
									name: "胃"
								}, {
									id: '脾',
									name: "脾"
								}, {
									id: '心',
									name: "心"
								}, {
									id: '小肠',
									name: "小肠"
								}, {
									id: '膀胱',
									name: "膀胱"
								}, {
									id: '肾',
									name: "肾"
								}, {
									id: '胆',
									name: "胆"
								},  {
									id: '肝',
									name: "肝"
								}, 
							]
							return 
						}
					}
					let category = await foodCategoryList({
						limit: 1000,
						type:  this.type == 'food1' ? 1 : 2
					})
					
					this.category = category.data.list
				}
				

			},
			async getfood() {
				let {
					data: {
						list
					}
				} = await foodList({
					type: this.type == 'food1' ? 1 : 2
				})
				this.list = list
				this.changeTab(0)
				let category = await medicineFoodEfficacyCategoryList({
					limit: 1000
				})
				// let category = await foodCategoryList({
				// 	type: this.type == 'food1' ? 1 : 2,
				// 	limit: 1000
				// })
				this.category = category.data.list
			},
			// 获取药膳
			async getmedicinalDiet() {
				let {
					data: {
						list
					}
				} = await medicinalDietList({
					efficacy_id: this.selectId || '',
					name: this.keyWord || ''
				})

				this.list = list
				let category = await medicinalDietEfficacyList()
				this.category = category.data.list
			},
			selectTag(item) {
				this.selectId = this.selectId == item.id ? '' : item.id
				this.showSreach = false
				this.init()
			},
			goNextPage(e) {
				if (this.type == 'book') {
					uni.navigateTo({
						url: './bookDetails?id=' + e.id
					})
				} else if (this.type == 'food1' || this.type == 'food2') {
					uni.navigateTo({
						url: './commonDetails?type=food&id=' + e.id
					})
				} else {
					uni.navigateTo({
						url: './commonDetails?type=' + this.type + '&id=' + e.id
					})
				}

			}
		}

	}
</script>

<style lang="scss" scoped>
	.mask {
		background-color: #00000066;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
	}

	.page {
		background-color: #fff;
		min-height: 100vh;
	}

	.top {
		padding: 30rpx 30rpx 0;
		position: sticky;
		top: 0;
		background-color: #fff;
		z-index: 2;

		.close {
			text-align: center;
			padding: 10rpx 0;
			color: #666;
			font-size: 26rpx;
		}
	}

	.sreach {
		background-color: var(--input-bg-color);
		padding: 16rpx 20rpx;
		border-radius: 10rpx;
		margin-bottom: 10rpx;
	}

	.tags {
		// padding-top: 30rpx;
		display: flex;
		flex-wrap: wrap;
		white-space: nowrap;
		background-color: #fff;
		max-height: 200rpx;
		overflow-y: auto;
		padding-top: 20rpx;

		.w-l {
			width: calc(100% - 100rpx);
		}

		.scroll-view {
			display: flex;


		}

		.tag {
			border: 2rpx solid #eee;
			padding: 4rpx 20rpx;
			font-size: 24rpx;
			border-radius: 10rpx;
			margin-right: 16rpx;
			margin-bottom: 16rpx;

			&.select {
				background-color: var(--main-color);
				color: #fff;
			}
		}

		.filter {
			display: flex;
			align-items: center;
			padding-left: 10rpx;
			margin-bottom: 16rpx;
		}
	}

	.content {

		padding: 0 30rpx;

		.item {
			display: flex;
			padding-top: 30rpx;

			.logo {
				width: 80rpx;
				height: 80rpx;
				margin-right: 30rpx;
			}

			.right {
				width: calc(100% - 110rpx);
				border-bottom: 2rpx solid #eee;
				padding-bottom: 30rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.title {
					font-weight: 700;
					font-size: 32rpx;
				}

				.text {
					font-size: 26rpx;
					color: #666;
					padding: 10rpx 0 0;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
		}
	}
</style>