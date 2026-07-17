<template>
	<view class="page">
		<Header :title="details.name">
			<template #rightIcon>
				<view class="flex">
					<view @click="settoggleCollection" class="new-iconfont"
						:class="is_collected ? 'icon-shoucang1' : 'icon-shoucang'"></view>
					<!-- <view class="new-iconfont icon-shanchu"></view> -->
				</view>
			</template>
		</Header>
		<view class="">
			<view class="block top">
				<view class="flex items-center">
					<image mode="widthFix" class="img" :src="details.cover"></image>
					<view class="top-right">
						<view class="title">
							{{ details.name }}
						</view>
						<view class="author">
							{{ details.author }}
						</view>
						<view class="tags">
							<view class="tag">
								{{ details.category }}
							</view>
						</view>
						<view class="money">
							纸书定价（供参考）：￥{{ details.price }}
						</view>
					</view>
				</view>
				<view class="flex top-info">
					<view class="item">
						<view class="label">
							出版信息
						</view>
						<view class="num">
							©
						</view>
						<view class="text">
							{{ details.publisher || '人民出版社' }}
						</view>

					</view>
					<view class="item">
						<view class="label">
							书籍字数
						</view>
						<view class="num">
							{{ details.word_count }}
						</view>
						<view class="text">
							万字
						</view>

					</view>
					<view class="item">
						<view class="label">
							出版时间
						</view>
						<view class="num">
							{{ details.publish_date }}
						</view>
						<view class="text">
							正版
						</view>

					</view>
				</view>
			</view>

			<view class="block introduction" v-if="details.introduction">
				<view class="title">
					<view class="height"></view>简介
				</view>
				<rich-text :nodes="details.introduction"></rich-text>
			</view>
			<view class="block catalogs">
				<view class="title">
					<view class="height"></view>目录
				</view>
				<view class="content">
					<view class="cell" v-for="item in details.catalogs" :key="item.id">
						<view @click="goNextPage(item)" class="main">{{ item.name }}</view>
						<view v-for="v in item.children" :key="v.id" class="children" @click="goNextPage(v)">
							{{ v.name }}
						</view>
					</view>
				</view>
			</view>
			<view class="tips">
				知源经络穴位内容仅供中医科普使用，不能作为诊断治疗依据，具体请遵医嘱。<text>数据来源说明</text>
			</view>
		</view>
		<!-- <Footer /> -->
		<view class="footer">
			<view class="btn" @click="goNextPage(details.catalogs[0])">
				立即阅读
			</view>
		</view>
	</view>
</template>

<script>
	import customTab from "@/components/customTab";
	import Header from "@/components/header.vue"
	import Footer from "./components/footer.vue"
	import {
		bookDetail,
		toggleCollection,
		isCollected
	} from "@/api/encyclopedia.js";
	export default {
		components: {
			Header,
			customTab,
			Footer
		},
		data() {
			return {
				id: '',
				is_collected: '',
				details: {},
			}
		},
		onShow() {},
		onLoad(e) {
			this.id = e.id
			this.getDetails()
		},
		methods: {
			async getisCollected() {
				let {
					data
				} = await isCollected({
					type: 'book',
					target_id: this.id
				})
				this.is_collected = data.is_collected
			},
			async settoggleCollection() {
				await toggleCollection({
					type: 'book',
					target_id: this.id
				})
				this.is_collected = !this.is_collected
			},
			goNextPage(item) {
				uni.navigateTo({
					url: './novel?id=' + item.id + '&book_id=' + this.id
				})
			},
			async getDetails() {
				let term = await bookDetail({
					id: this.id
				})
				this.details = term.data
				this.getisCollected()
				uni.setNavigationBarTitle({
					title: this.details.name || ''
				})
			},
		}
	}
</script>
<style scoped lang="scss">
	.block {
		padding: 30rpx;
		background-color: #fff;
		margin-bottom: 10rpx;

		.title {
			font-size: 32rpx;
			display: flex;
			align-items: end;

			.height {
				width: 16rpx;
				height: 16rpx;
				background-color: var(--main-color);
				margin-bottom: 6rpx;
				margin-right: -6rpx;
			}
		}
	}

	.top {

		.items-center {
			align-items: center;
		}

		.img {
			width: 200rpx;
			margin-right: 20rpx;
		}

		.top-right {

			.author {
				font-size: 26rpx;
				color: #666;
				padding: 10rpx 0;
			}

			.tags {
				display: flex;
				flex-wrap: wrap;

				.tag {
					font-size: 20rpx;
					color: #888;
					background-color: #efefef;
					padding: 6rpx 20rpx;
					border-radius: 10rpx;
				}
			}

			.money {
				color: var(--main-color);
				font-size: 26rpx;
				margin-top: 10rpx;
				text-decoration: line-through;
			}
		}

		.top-info {
			justify-content: space-between;
			text-align: center;
			color: #777;
			border-top: 2rpx solid #eee;
			padding-top: 40rpx;
			margin-top: 40rpx;

			font-size: 24rpx;

			.item {
				border-right: 2rpx solid #eee;
				width: 33%;

				&:last-of-type {
					border-right: 0;
				}
			}

			.label {
				font-weight: 700;
			}

			.num {
				color: #000;
				font-size: 28rpx;
				font-weight: 700;
				padding: 10rpx 0;
			}
		}
	}

	.catalogs {
		.content {
			.cell {

				.main,
				.children {
					border-bottom: 2rpx solid #eee;
					font-weight: 700;
					padding: 20rpx 0;
				}

				.children {
					padding-left: 50rpx;
				}
			}
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

	.new-iconfont {
		font-size: 40rpx;
		margin-left: 20rpx;
	}

	.icon-shoucang1 {
		color: var(--main-color);
	}
	
	.footer {
		position: sticky;
		bottom: 0;
		background-color: #fff;
		padding: 20rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		text-align: center;
		font-size: 30rpx;
		color: #666;
		
		.btn{
			background-color: var(--main-color);
			color: #fff;
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 10rpx;
		}
	}
</style>