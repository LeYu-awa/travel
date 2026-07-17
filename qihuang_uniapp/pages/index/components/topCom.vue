<template>
	<view>
		<view class="top-bj"></view>
		<view class="top">
			<view class="top-title">
				<view class="title">岐黄手法·健康甄选</view>
				<view class="desc">一站式数智中医绝技标准开源平台</view>
			</view>
			<view class='search acea-row row-between-wrapper'>
				<view class='input acea-row row-between-wrapper'>
					<text class='iconfont icon-sousuo2'></text>
					<input type='text' :value='searchValue' placeholder='请输入关键字' placeholder-class='placeholder'
						@input="setValue" confirm-type="search" @confirm="searchBut()"></input>
				</view>
			</view>
			<!-- <view class="top-input">
				<image src="/static/images/index/search.png" class="search"></image>
				<input type="text" placeholder="搜索药品或症状"/>
			</view> -->
		</view>
		<!-- <view class="tab">
			<view :class="tabindex==index?'item active' :'item'" v-for="(item,index) in tablist" :key="index"
				@click="ontab(index)">
				{{ item.name }}
			</view>
		</view> -->
	</view>
</template>
<script>
	export default {
		name: 'topCom',
		props: {

		},
		data() {
			return {
				searchValue: '',
				tabindex: 0,
				tablist: [{
						name: '推荐'
					},
					{
						name: '中药百科'
					},
					{
						name: '方剂选粹'
					},
					{
						name: '经络腧穴'
					},
					{
						name: '国学经典'
					}
				]
			};
		},
		created() {},
		methods: {
			ontab(index) {
				this.tabindex = index
			},
			setValue: function(event) {
				this.$set(this, 'searchValue', event.detail.value);
			},
			searchBut() {
				console.log(this.searchValue)
			}
		}
	}
</script>

<style scoped lang="scss">
	.top-bj {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 480rpx;
		// background: linear-gradient(to bottom, #49bbfa, #ffffff);
		z-index: 0;
		background-color: #23687e;
	}

	.top {
		width: 100%;
		// box-sizing: border-box;
		// align-items: center;
		padding: 116rpx 22rpx 0 20rpx;
		position: relative;
		z-index: 99;

		.title {
			font-weight: bold;
			font-size: 40rpx;
			font-style: italic;
			color: #fff;
		}
		.desc{
			color: #fff;
		}

		.search {
			margin-top: 50rpx;

			.input {
				width: 100%;
				background-color: #f7f7f7;
				border-radius: 33rpx;
				padding: 0 35rpx;
				box-sizing: border-box;
				height: 66rpx;
				display: flex;
			}

			.input input {
				margin-left: 10rpx;
				flex: 1;
				font-size: 28rpx;
			}

			.input .placeholder {
				color: #919393;
				font-size: 28rpx;
			}

			.input .iconfont {
				color: #919393;
				font-size: 35rpx;
			}

		}
	}

	// .tab {
	// 	width: 100%;
	// 	margin-top: 27rpx;
	// 	height: 42rpx;
	// 	display: flex;
	// 	align-items: center;
	// 	position: relative;
	// 	z-index: 99;

	// 	.item {
	// 		// min-width: 106rpx;
	// 		width: 25%;
	// 		height: 42rpx;
	// 		text-align: center;
	// 		line-height: 42rpx;
	// 		font-size: 28rpx;
	// 		color: #000;
	// 		margin-right: 20rpx;
	// 	}

	// 	.active {
	// 		font-size: 30rpx;
	// 		font-weight: bold;
	// 		position: relative;
	// 	}

	// 	.active::after {
	// 		content: '';
	// 		width: 40rpx;
	// 		height: 6rpx;
	// 		border-radius: 6rpx;
	// 		background: #fcb51a;
	// 		position: absolute;
	// 		left: 50%;
	// 		bottom: -8rpx;
	// 		transform: translate(-50%, 0);
	// 	}
	// }
</style>