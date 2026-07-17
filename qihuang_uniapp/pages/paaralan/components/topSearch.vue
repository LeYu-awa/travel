<template>
	<view class="">

		<view class="category">
			<view class="item" v-for="(item,index) in categoryList" :key="index" @click="ontab(index)">
				<image class="img" :src="item.logo"></image>
				<!-- <view :style="{background: item.color}" :class="['new-iconfont', item.icon] "></view> -->
				<view class="">
					{{ item.name }}
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		getLessonTypeShowList,
		getTypeList
	} from "@/api/paaralan.js"
	export default {
		name: 'topMenu',
		props: {
			categoryList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				tabindex: 0,
				categoryList1: [{
						name: '排行榜',
						icon: '',
						color: '#AA7C64'
					},
					{
						name: '针灸',
						icon: '',
						color: '#75737E'
					}, {
						name: '艾灸',
						icon: '',
						color: '#877F58'
					}, {
						name: '推拿',
						icon: '',
						color: '#AA7C64'
					}, {
						name: '拔罐',
						icon: '',
						color: '#866667'
					}, {
						name: '中基',
						icon: '',
						color: '#866667'
					}, {
						name: '中药',
						icon: '',
						color: '#75737E'
					}, {
						name: '排行榜',
						icon: '',
						color: '#866667'
					}, {
						name: '排行榜',
						icon: '',
						color: '#877F58'
					}, {
						name: '更多',
						icon: '',
						color: '#866667'
					},
				],
				tablist: [{
						name: '全部'
					},
					{
						name: '外治'
					},
					{
						name: '保健养生'
					},
					{
						name: '入门'
					},
					{
						name: '临床'
					}
				]
			};
		},
		created() {
			this.init()
		},
		methods: {
			async init() {
				// 获取分类
				let data = await getTypeList()
			},
			goHistory() {
				uni.navigateTo({
					url: '/pages/paaralan/history'
				})
			},
			ontab(index) {
				this.tabindex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.category {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 20rpx;

		.item {
			width: 20%;
			text-align: center;
			margin: 10rpx 0;
			font-size: 28rpx;

			.img {
				width: 100rpx;
				height: 60rpx;
			}

			.new-iconfont {
				width: 100rpx;
				height: 60rpx;
				border-radius: 30rpx;
				margin: 10rpx auto;
			}
		}
	}
</style>