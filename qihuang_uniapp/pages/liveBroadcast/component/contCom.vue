<!-- swiper -->
<template>
	<view class="content">
		<view class="tab" v-if="tabindexData==1">
			<view class="tab-left" :style="{'height':state?'auto':'56rpx'}">
				<view :class="tabindex==index?'item active' :'item'" v-for="(item,index) in tablist" :key="index"
					@click="ontab(index)">{{ item.name }}</view>
			</view>
			<view class="tab-right" @click="state=!state">{{state?'收起':'更多'}}</view>
		</view>
		<itemCom :list="list" :tabindexData="tabindexData"></itemCom>
	</view>
</template>

<script>
	import itemCom from './itemCom';
	import {
		getLiveTypeList,
		getLiveList
	} from '@/api/liveBroadcast.js'
	export default {
		name: 'contCom',
		props: {
			tabindexData: {
				type: Number || String,
				default: 0
			},
		},
		components: {
			itemCom
		},
		data() {
			return {
				tabindex: 0,
				tablist: [],
				state: false,
				list: []
			};
		},
		watch: {
			tabindexData: {
				handler(val) {
					console.log(val, '--val--')
					if (val == 1) {
						this.getLiveTypeList()
					} else {
						getLiveList({
							type: '1',
							name: ''
						}).then(res => {
							this.list = res.data
						})
					}
				},
				immediate: true,
				deep: true,
			}
		},
		mounted() {},
		methods: {
			ontab(index) {
				this.tabindex = index;
				this.getLiveList()
			},
			getLiveTypeList() {
				getLiveTypeList().then(res => {
					console.log(res, '--res----')
					this.tablist = res.data
					this.getLiveList()
				})
			},
			getLiveList() {
				getLiveList({
					type: this.tablist[this.tabindex].id,
					name: ''
				}).then(res => {
					this.list = res.data
				})
			}
		}
	}
</script>
<style scoped lang="less">
	.content {
		width: 100%;
		background: #f4f4f4;
		padding: 0 32rpx 24rpx 32rpx;
		box-sizing: border-box;

		.tab {
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;

			.tab-left {
				width: 600rpx;
				display: flex;
				flex-flow: row wrap;
				justify-content: flex-start;
				overflow: hidden;

				.item {
					width: 110rpx;
					height: 56rpx;
					border-radius: 12rpx;
					background: #ffffff;
					font-size: 22rpx;
					color: #c2cbd4;
					margin: 0 10rpx 15rpx 0;
					line-height: 56rpx;
					text-align: center;
				}
			}

			.active {
				background: #587ff7 !important;
				color: #ffffff !important;
			}

			.tab-right {
				color: #c2cbd4;
				font-size: 22rpx;
				line-height: 56rpx;
				text-align: center;
			}
		}
	}
</style>