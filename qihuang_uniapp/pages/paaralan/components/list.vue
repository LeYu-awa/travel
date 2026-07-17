<template>
	<view class="hot">
		<view class="title" v-if="header" @click="goSearch">
			<view class="left" v-if="model">
				{{ model.name }}
			</view>
			<view class="right">
				<view class="new-iconfont icon-right"></view>
			</view>
		</view>
		<view v-if="list.length" class="list">
			<view class="item" v-for="item in list" :key="item.id" @click.stop="goDetails(item)">
				<view class="left">
					<text class="eye">
						有{{ item.total_view_num || (item.virtual_user_num + item.view_num) }}人看过
					</text>
					<image class="img" :src="item.cover_image" mode=""></image>
					<view class="tag">
						付费
					</view>
				</view>
				<view class="right">
					<view class="label">
						{{ item.name }}
					</view>
					<view class="text">
						{{ item.introduction }}
					</view>
				</view>
			</view>
		</view>
		<emptyPage v-else title="暂无历史记录" />
	</view>
</template>

<script>
	import emptyPage from "@/components/emptyPage.vue"
	
export default {
	components: {
		emptyPage,
	},
	props: {
		header: {
			type: Boolean,
			default: true
		},
		model: {
			type: Object,
			default: () => {
				return {}
			}
		},
		list: {
			type: Array,
			default: () => {
				return []
			}
		}
	},
	data() {
		return {

		};
	},
	methods: {
		goSearch(){
			uni.navigateTo({
				url: '/pages/paaralan/search?id=' + this.model.id
			})
		},
		goDetails(item) {
			uni.navigateTo({
				url: '/pages/paaralan/details?id=' + item.id
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.hot {
	padding: 30rpx 30rpx 0;

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 30rpx;

		.left,
		.right {
			display: flex;
			align-items: center;
		}

		.left {
			font-weight: 700;
			font-size: 36rpx;

			.new-iconfont {
				font-size: 36rpx;
				margin-left: 20rpx;
			}
		}
	}

	.list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;

		.item {
			width: calc(50% - 10rpx);
			margin-bottom: 20rpx;

			// display: flex;
			&:last-of-type {
				margin-bottom: 0;
			}

			.left {
				position: relative;

				.eye {
					color: #fff;
					background-color: #00000044;
					font-size: 20rpx;
					padding: 4rpx 16rpx;
					position: absolute;
					left: 0;
					top: 0;
					z-index: 1;
					border-top-left-radius: 10rpx;
					border-bottom-right-radius: 10rpx;
				}

				.img {
					width: 100%;
					height: 180rpx;
					border-radius: 12rpx;
				}

				.tag {
					background-color: #F2BC96;
					color: #633617;
					position: absolute;
					right: 0;
					top: 0;
					padding: 4rpx 10rpx;
					border-top-right-radius: 10rpx;
					border-bottom-left-radius: 10rpx;
					font-size: 24rpx;
				}
			}

			.right {

				.text,
				.label {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					color: #666;
				}

				.label {
					font-size: 32rpx;
					font-weight: 700;
					margin-bottom: 6rpx;
					color: #333;
				}
			}
		}
	}

}
</style>