<template>
	<view class="header-bg" :style="{background: showBg, color: color}">
		<view :style="{ height: systemBarHeight }"></view>

		<view class="header">
			<view class="">
				<view v-if="showBack" @click="goBack" class="new-iconfont icon-left"></view>
			</view>
			<slot name="title">
				<view>{{ title }}</view>
				<view>
					<slot name="rightIcon"></slot>
				</view>

			</slot>
		</view>
		<slot></slot>
	</view>

</template>
<script>
	export default {
		props: {
			title: '',
			color: {
				type: String,
				default: ''
			},
			showBack: {
				type: Boolean,
				default: true
			},
			customize: {
				type: Boolean,
				default: false
			},
			showBg: {
				type: String,
				default: '#ffffff'
			}
		},
		data() {
			return {
				systemBarHeight: 0
			}
		},
		created() {
			this.systemBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
		},
		methods: {
			goBack() {
				if(this.customize){
					this.$emit('customizeBack')
				}else{
					uni.navigateBack({
						delta: 1
					})
				}
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	.header-bg {
		position: sticky;
		top: 0;
		font-size: 36rpx;
		z-index: 10;
		
		.icon-left{
			font-size: 42rpx !important;
		}
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx;
		
		.new-iconfont {
			font-size: 36rpx;
		}
	}
</style>