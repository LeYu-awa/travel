<template>
	<view class="">
		<image style="width: 100%;" mode="widthFix" src="/static/images/health/bg.png"></image>
		<view class="content">
			<view class="title blue_bg">
				<text>健康解决方案</text>
			</view>
			<image @click="$goNextPage('/pages/healths/index')" src="/static/images/health/1.png" style="width: 100%;"
				mode="widthFix"></image>
			<view class="input" @click="$goNextPage('/pages/healths/index')">
				请描述您的症状和诊断病症
				<text class="new-iconfont icon-sousuo"></text>
			</view>
			<view class="title yellow_bg">
				<text>专科训练营•直播</text>
			</view>
			<view class="live" @click="$goNextPage('/pages/healths/living')">
				<image src="/static/images/health/title.png" class="title-img" mode="widthFix"></image>
				<image src="/static/images/health/2.png" style="width: 100%;" mode="widthFix"></image>
			</view>

			<view class="block" v-if="symptomsList.length">
				<view class="item" v-for="item in symptomsList" :key="item.id" @click="$goNextPage('/pages/healths/living')">
					<image class="icon" :src="item.logo"></image>
					<view class="">
						{{item.name}}
					</view>
				</view>
			</view>

			<view class="title green_bg">
				<text>岐黄甄选</text>
			</view>
			<image src="/static/images/health/3.png" @click="$goNextPage('/pages/goods_cate/goods_cate')"
				style="width: 100%;" mode="widthFix"></image>
		</view>
		<customTab active="health"></customTab>
	</view>
</template>

<script>
	import {
		getLiveTypeList
	} from "@/api/health.js"
	import customTab from '@/components/customTab';
	export default {
		data() {
			return {
				symptomsList: []
			}
		},
		components: {
			customTab
		},
		onLoad() {
			this.getLiveTypeListList()
		},
		methods: {
			async getLiveTypeListList() {
				let {
					data
				} = await getLiveTypeList()
				this.symptomsList = data.slice(0, 4)
				this.symptomsList.push({
					id: '',
					logo: '/static/images/health/more.png',
					name: '更多'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #fff;
		border-radius: 24rpx 24rpx 0 0;
		padding: 30rpx;
		margin-top: -140rpx;
		position: relative;

		.title {
			font-weight: 700;
			font-size: 32rpx;
			position: relative;
			margin-bottom: 24rpx;

			text {
				position: relative;
				z-index: 1;
			}

			&.blue_bg {
				&::after {
					background: linear-gradient(127.95deg, rgba(118, 165, 255, 1), rgba(255, 255, 255, 1) 100%);
				}
			}

			&.yellow_bg {
				&::after {
					background: linear-gradient(137.83deg, rgba(255, 239, 182, 1), rgba(255, 255, 255, 1) 100%);
				}
			}

			&.green_bg {
				&::after {
					background: linear-gradient(127.95deg, rgba(114, 188, 121, 1), rgba(255, 255, 255, 1) 100%);
				}
			}

			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				height: 10rpx;

				width: 200rpx;
			}
		}

		.input {
			height: 56rpx;
			width: 100%;
			padding: 0 28rpx;
			border-radius: 40rpx;
			color: #666;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #F2F2F2;
			margin: 24rpx 0;

			.new-iconfont {
				background-image: linear-gradient(137.83deg, rgba(255, 230, 140, 1), rgba(220, 170, 90, 1) 100%);
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;
			}
		}

		.live {
			position: relative;

			.title-img {
				position: absolute;
				left: 30rpx;
				top: 30rpx;
				width: 126rpx;
				z-index: 1;
			}
		}

		.block {
			display: flex;
			// justify-content: space-between;
			margin-bottom: 32rpx;

			.item {
				width: 20%;
				text-align: center;
				font-size: 24rpx;
				color: #333;

				.icon {
					width: 82rpx;
					height: 82rpx;
					border-radius: 50%;
					display: block;
					margin: 20rpx auto 10rpx;
				}
			}
		}
	}
</style>