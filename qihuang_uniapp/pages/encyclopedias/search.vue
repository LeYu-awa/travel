<template>
	<view class="page">
		<Header >
			<template #title>
				<view class="sreach">
					<input type="text" v-model="keyword" @confirm="sreachKey(keyword)" placeholder="搜索经络/穴位/病症/课程" />
					<text>搜索</text>
				</view>
			</template>
		</Header>
		<view class="block" v-if="historyList.length">
			<view class="title">
				<view class="flex end">
					<view class="border"></view>
					<text>搜索历史</text>
				</view>
				<view class="flex" @click="clearHistory">
					<view class="new-iconfont icon-shanchu"></view>
					清空
				</view>
			</view>
			<view class="content">
				<view class="item" v-for="item in historyList" :key="item" @click="sreachKey(item)">
					{{item}}
				</view>
			</view>
		</view>
		<view class="block">
			<view class="title">
				<view class="flex end">
					<view class="border"></view>
					<text>热门搜索</text>
				</view>
			</view>
			<view class="content hot">
				<view class="item" v-for="item in searchList" :key="item.id" @click="sreachKey(item.keyword)">
					{{item.keyword}}
				</view>
			</view>
		
		</view>
		
		<scroll-view :scroll-x="true">
			<view  class="scrollView">
				<view class="item">
					<view class="title">
						视频课程
					</view>
					<view class="content">
						<view class="cell" v-for="item, index in videoList" :key="index" @click="$goNextPage('/pages/paaralan/details?id=' + item.id)">
							<view class="border border0">
								{{index + 1}}
							</view>
							<view class="text">
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
				<view class="item">
					<view class="title">
						疾病
					</view>
					<view class="content">
						<view class="cell" v-for="item, index in disease" :key="index" @click="$goNextPage('./diseaseDetails?id=' + item.id)">
							<view class="border border0">
								{{index + 1}}
							</view>
							<view class="text">
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
				<view class="item">
					<view class="title">
						药膳
					</view>
					<view class="content">
						<view class="cell" v-for="item, index in medicinalDiet" :key="index" @click="$goNextPage('./commonDetails?type=medicinalDiet&id=' + item.id)">
							<view class="border border0">
								{{index + 1}}
							</view>
							<view class="text">
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
				<view class="item">
					<view class="title">
						中草药
					</view>
					<view class="content">
						<view class="cell" v-for="item, index in food" @click="$goNextPage('./commonDetails?type=food&id=' + item.id)">
							<view class="border border0">
								{{index + 1}}
							</view>
							<view class="text">
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import emptyPage from "@/components/emptyPage.vue"
	import Header from "@/components/header.vue"
	import {
		searchStatTop, diseaseListByCategory, medicinalDietList, foodList
	} from "@/api/encyclopedia.js";
	import {getNavList} from "@/api/paaralan.js"
	export default {
		components: {
			emptyPage,
			Header
		},
		data() {
			return {
				keyword: '',
				historyList: [],
				searchList: [],
				food: [],
				medicinalDiet: [],
				disease: [],
				videoList: [],
			};
		},
		onShow() {
			this.historyList = uni.getStorageSync('historyList') ? JSON.parse(uni.getStorageSync('historyList')) : []
		},
		onLoad(e) {
			this.init()
		},
		methods: {
			clearHistory(){
				uni.removeStorageSync('historyList')
				this.historyList = []
			},
			sreachKey(key){
				this.historyList = [key, ...this.historyList]
				this.historyList = [...new Set(this.historyList)];
				uni.setStorageSync('historyList', JSON.stringify(this.historyList || []))
				uni.navigateTo({
					url: './searchDetails?keyword=' + key
				})
			},
			async init() {
				let {
					data
				} = await searchStatTop()
				this.searchList = data.list
				
				// 热门视频
				let videoList = await getNavList({
					id: 2
				})
				this.videoList = videoList.data[0].subjects
				
				// 中药材
				let food = await foodList({
					type: 2
				})
				this.food = food.data.list
				
				// 药膳
				let medicinalDiet  = await medicinalDietList()
				this.medicinalDiet = medicinalDiet.data.list
				
				// 病症
				let disease = await diseaseListByCategory()
				this.disease = disease.data.list
			},
			
		}
	}
</script>
<style scoped lang="scss">
	.page{
		min-height: 100vh;
		background-color: #fff;
	}
	
	.sreach{
		display: flex;
		align-items: center;
		width: calc(100% - 60rpx);
		justify-content: space-between;
		background-color: #F4F3EF;
		border: 2rpx solid var(--main-color);
		padding: 16rpx 20rpx;
		border-radius: 16rpx;
		text{
			color: var(--main-color);
		}
	}
	.block{
		padding: 30rpx;
		.title{
			display: flex;
			justify-content: space-between;
			.end{
				align-items: end;
				position: relative;
				left: 0;
				.border{
					width: 20rpx;
					height: 20rpx;
					background-color: var(--main-color);
					position: absolute;
					z-index: 0;
				}
				text{
					position: relative;
					margin-left: 10rpx;
					font-size: 36rpx;
				}
			}
			
		}
		
		.content{
			display: flex;
			flex-wrap: wrap;
			.item{
				min-width: 110rpx;
				margin-right: 20rpx;
				border-radius: 10rpx;
				margin-top: 20rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #eee;
				font-size: 26rpx;
			}
			&.hot{
				.item{
					background-color: var(--main-tag-bg-color);
					color: var(--main-color);
				}
			}
		}
	}
	
	.scrollView{
		display: inline-flex;
		padding-left: 30rpx;
		padding-top: 20rpx;
		.item{
			width: 360rpx;
			height: 600rpx;
			padding: 10rpx 20rpx;
			background: linear-gradient(180deg, #FCE5DF 0%, rgba(216, 216, 216, 0) 100%);
			margin-right: 20rpx;
			border-radius: 10rpx;
			border: 2rpx solid #FCE5DF;
			.title{
				font-size: 32rpx;
				color: var(--color);
			}
			.content{
				.cell{
					display: flex;
					align-items: center;
					font-size: 26rpx;
					margin-top: 16rpx;
					.border{
						width: 30rpx;
						height: 30rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: #aaa;
						color: #fff;
						font-size: 20rpx;
						margin-right: 16rpx;
						line-height: 30rpx;
						border-radius: 6rpx;
					}
				}
			}
		}
	}
</style>