<template>
	<view class="page">
		<Header>
			<template #title>
				<view class="sreach">
					<input type="text" v-model="keyword" @confirm="getDetails" placeholder="搜索经络/穴位/病症/课程" />
					<text>搜索</text>
				</view>
			</template>
			<view style="padding: 0 30rpx" v-if="getData">
				<Tab :tablist="getContentList" @change="change" :tabKey="tabKey" />
			</view>
		</Header>
			<view class="" v-if="getData">
				<view class="block">
					<template v-for="item, index in getContentList">
						<view class="item section" v-if="details[item.key] && (tabKey == 0 || (tabKey != 0 && tabKey == index))" :id="item.key">
							<view class="title-h3">
								<view class="border"></view>{{ item.label }}
							</view>
							<view class="content">
								<template v-if="item.key == 'acupoint'"></template>
								<!-- <template v-if="item.key == 'disease'"></template> -->
								<template v-if="item.key == 'video'"></template>
								<!-- <template v-if="item.key == 'medicine_food'"></template> -->
								<template v-else>
									<view class="doctor-item" v-for="val in details[item.key].slice(0, tabKey != 0 ? details[item.key].length : 3)" :key="val.id"
										@click="goNextPage(val, item.key)">
										<!-- <image :src="val.cover || val.image" class="logo" /> -->
										<view class="right">
											<view class="">
												<view class="title">
													{{ val.name }}
												</view>
												<view class="text" v-if="type == 'medicinalDiet'">
													{{ val.source }};{{ val.effect }};{{ val.formula }}
												</view>
												<rich-text v-else class="text" :nodes="val.author || val.profile || val.diagnosis || val.effect || val.explanation || val.introduction" />
											</view>
											<view class="new-iconfont icon-right" />
										</view>
									</view>
								</template>
								<!-- <image v-if="item.type == 'image'" mode="widthFix" style="width: 100%;"
								:src="details[item.key]" />
							<video v-else-if="item.type == 'video'" class="video" id="myVideo" :src="details[item.key]"
								:autoplay="true" show-mute-btn></video>
							<rich-text v-else class="text" :nodes="details[item.key]" /> -->
							</view>
						</view>
					</template>
				</view>
				<view class="tips">
					知源经络穴位内容仅供中医科普使用，不能作为诊断治疗依据，具体请遵医嘱。<text>数据来源说明</text>
				</view>
			</view>
		<emptyPage v-else title="暂无搜索内容" />
	</view>
</template>

<script>
import customTab from "@/components/customTab";
import Tab from "@/components/tab";
import Header from "@/components/header.vue"
import emptyPage from "@/components/emptyPage.vue"
import Footer from "./components/footer.vue"
import {
	globalSearch
} from "@/api/encyclopedia.js";
export default {
	components: {
		Header,
		customTab,
		emptyPage,
		Tab,
		Footer
	},
	computed: {
		getContentList() {
			return this.contentList.filter((item) => {
				return this.details[item.key]?.length ? item : item.key ? '' : item
			})
		},
		getData() {
			for (let i in this.details) {
				if (this.details[i].length) {
					return true
				}
			}
			return false
		},
	},
	data() {
		return {
			id: '',
			keyword: '',
			type: '',
			tabKey: 0,
			scrollTop: 0,
			details: {},
			contentList: [{
				label: '全部',
				type: 'text',
				key: ''
			},
			{
				label: '经络穴位',
				type: 'text',
				key: 'acupoint'
			},
			{
				label: '病症',
				type: 'text',
				key: 'disease'
			},
			{
				label: '课程',
				type: 'text',
				key: 'lesson'
			},
			{
				label: '视频',
				type: 'text',
				key: 'video'
			},
			{
				label: '药食材',
				type: 'text',
				key: 'medicine_food'
			},
			{
				label: '医家',
				type: 'text',
				key: 'doctor'
			},
			{
				label: '术语',
				type: 'text',
				key: 'term'
			},
			{
				label: '药膳',
				type: 'text',
				key: 'medicinal_diet'
			},
			]
		};
	},
	onShow() { },
	onLoad(e) {
		this.keyword = e.keyword
		this.getDetails()
	},
	// 监听页面滚动，更新当前激活的锚点
	// onPageScroll(e) {
	// 	this.scrollTop = e.scrollTop
	// 	uni.createSelectorQuery().selectAll('.section').boundingClientRect((rects) => {
	// 		if (rects && rects.length) {
	// 			for (let i = 0; i < rects.length; i++) {
	// 				if (rects[i].top <= 100 && rects[i].bottom > 100) {
	// 					this.tabKey = `${i}`;
	// 					break;
	// 				}
	// 			}
	// 		}
	// 	}).exec();
	// },
	methods: {
		change(index, item) {
			// uni.createSelectorQuery().select(`#${item.key}`).boundingClientRect((rect) => {
			// 	console.log(rect)
			// 	if (rect) {
			// 		uni.pageScrollTo({
			// 			scrollTop: rect.top - 96 + this.scrollTop,
			// 			duration: 300
			// 		});
			// 		this.tabKey = index;
			// 	}
			// }).exec();
			
			this.tabKey = index;
		},
		goNextPage(e, type) {
			if(type == 'disease'){
				uni.navigateTo({
					url: './diseaseDetails?id=' + e.id
				})
			}else if(type == 'lesson'){
				uni.navigateTo({
					url: '/pages/paaralan/details?id=' + e.id
				})
			}else if (type == 'book') {
				uni.navigateTo({
					url: './bookDetails?id=' + e.id
				})
			} else if (type == 'food1' || type == 'food2' || type == 'medicine_food') {
				uni.navigateTo({
					url: './commonDetails?type=food&id=' + e.id
				})
			} else {
				uni.navigateTo({
					url: './commonDetails?type=' + type + '&id=' + e.id
				})
			}

		},
		async getDetails() {
			if(!this.keyword){
				return uni.showToast({
					title: '请输入关键字',
					icon: 'none',
					duration: 2000
				})
			}
			let {
				data
			} = await globalSearch({
				keyword: this.keyword
			})
			this.details = data
		},
	}
}
</script>
<style scoped lang="scss">
.sreach {
	display: flex;
	align-items: center;
	width: calc(100% - 60rpx);
	justify-content: space-between;
	background-color: #F4F3EF;
	border: 2rpx solid var(--main-color);
	padding: 16rpx 20rpx;
	border-radius: 16rpx;

	text {
		color: var(--main-color);
	}
}

.block {
	background-color: #fff;
	// padding: 0 30rpx 30rpx;

	.item {
		padding: 20rpx 0;
	}

	.title-h3 {
		font-size: 32rpx;
		padding: 10rpx 30rpx;
		display: flex;
		align-items: end;
		background-color: var(--input-bg-color);

		.border {
			width: 16rpx;
			height: 16rpx;
			background-color: var(--main-color);
			margin-bottom: 8rpx;
			margin-right: -8rpx;
		}
	}

	.content {
		padding: 0 30rpx;
	}
}

.tips {
	padding: 30rpx;
	color: #999;
	font-size: 26rpx;

	text {
		color: var(--main-color);
	}
}

.doctor-item {
	display: flex;
	padding-top: 30rpx;

	// .logo {
	// 	width: 80rpx;
	// 	height: 80rpx;
	// 	margin-right: 30rpx;
	// }

	.right {
		width: calc(100%);
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
</style>