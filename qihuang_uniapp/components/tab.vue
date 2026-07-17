<template>
	<view class="tab">
		<view :class="(tabName != 'key' ? tabindex == item[tabName] : ( tabindex == item[tabName] || tabindex==index) )? 'item active' : 'item'" v-for="(item, index) in tablist" :key="index"
			@click="ontab(index, item)">
			{{ item.name || item.label || item.title }}
		</view>
	</view>

</template>
<script>
export default {
	props: {
		tablist: {
			type: Array,
			default: []
		},
		tabName: {
			type: String,
			default: 'key'
		},
		tabKey: {
			type: Number | String,
			default: 0
		}
	},
	data() {
		return {
			tabindex: 0,
		}
	},
	watch: {
		tabKey: {
			handler(value) {
				this.tabindex = value
			},
			deep: true,
			immediate: true
		}
	},
	methods: {
		ontab(index, item) {
			this.tabindex = this.tabName != 'key' ? item[this.tabName] : (item[this.tabName] || index);
			this.$emit('change', index, item)
		},
	},
}
</script>

<style lang="scss" scoped>
.tab {
	width: 100%;
	height: 80rpx;
	display: flex;
	justify-content: space-around;
	overflow-x: auto;
	white-space: nowrap;
	align-items: center;
	position: relative;
	z-index: 99;

	.item {
		min-width: 106rpx;
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
		content: "";
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