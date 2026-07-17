<template>
	<view class="tab">
		<view :class="tabindex==index?'item active' :'item'" v-for="(item,index) in tablist" :key="index"
			@click="ontab(index)">
			{{ item.name }}
		</view>
	</view>
</template>

<script>
	export default {
		name: 'topMenu',
		props: {

		},
		data() {
			return {
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab {
		width: 100%;
		height: 52rpx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 99;
	
		.item {
			// min-width: 106rpx;
			width: 25%;
			height: 52rpx;
			text-align: center;
			line-height: 52rpx;
			font-size: 28rpx;
			color: #000;
			margin-right: 20rpx;
		}
	
		.active {
			font-size: 30rpx;
			font-weight: bold;
			position: relative;
		}
	
		.active::after {
			content: '';
			width: 40rpx;
			height: 6rpx;
			border-radius: 6rpx;
			background: #fcb51a;
			position: absolute;
			left: 50%;
			bottom: -8rpx;
			transform: translate(-50%, 0);
		}
	}
</style>