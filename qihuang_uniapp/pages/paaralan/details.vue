<template>
	<view class="page">
		<video class="video" id="myVideo" :src="last_view.file_url" :autoplay="true"
		@ended="ended"
			@timeupdate="timeupdate" :initial-time="last_view.view_duration" show-mute-btn></video>
			
		<view class="info">
			<view class="title">
				{{ details.name }}
				<view @click="house" :class="['new-iconfont', details.is_collected ? 'icon-shoucang1' : 'icon-shoucang']">
				</view>
			</view>
			<view class="texts">
				<view>
					{{details.view_num || 0}}次播放
				</view>
				<text>|</text>
				<view>
					时长：{{ formatTime(last_view.duration || 0) }}
				</view>
				<!-- <text>|</text>
				 <view>
					杏林明师发布
				</view> -->
			</view>
		</view>
		<view class="border"></view>
		<view class="content">
			<view class="tab">
				<view :class="['item ', { active: tabindex == 0 }]" @click="tabindex = 0">
					目录
				</view>
				<view :class="['item ', { active: tabindex == 1 }]" @click="tabindex = 1">
					详情
				</view>
			</view>
			<view class="scroll" v-if="details.type">
				<!-- 目录 -->
				<view class="catalogue" v-if="tabindex == 0">
					<!-- <view class="item active">
						<view class="label">
							1/asdfj h<text class="new-iconfont icon-shijian"></text>
						</view>
						<view class="time">
							时长：00:00:00
						</view> -->
					<!-- </view> -->
					<view v-for="item in details.materials[materialsType[details.type]]" :key="item.id"
						:class="['item', { active: last_view.id == item.id }]" @click="changeLastView(item)">
						<view class="label">
							{{ item.title }}<text
								:class="['new-iconfont', last_view.id == item.id ? 'icon-bofangzhong' : 'icon-bofang']"></text>
						</view>
						<view class="time">
							时长：{{ formatTime(item.duration || 0) }}
						</view>
					</view>
				</view>
				<!-- 详情 -->
				<view class="detail" v-if="tabindex == 1">
					<!-- <view class="name">
						主讲人：
					</view> -->
					<rich-text :nodes="details.details"></rich-text>
				</view>
			</view>
		</view>
		<view class="bottom-footer" v-if="details.price">
			<view class="num">
				<text class="font666">8讲/</text>
				<text>￥</text>
				{{ details.price }}
			</view>
			<view class="btn" @click="payShow = true">
				立即购买
			</view>
		</view>
		<payPopup :show="payShow" @close="payShow = false"></payPopup>
	</view>
</template>

<script>
	import {
		getSubjectDetailWithMaterials,
		toggleSubjectCollection,
		addSubjectView
	} from "@/api/paaralan.js";
	import payPopup from "./components/payPopup.vue";
	export default {
		components: {
			payPopup
		},
		data() {
			return {
				payShow: false,
				id: '',
				tabindex: 0,
				details: {},
				last_view: {},
				// 1是图文，2是音频，3是视频
				materialsType: {
					1: 'article',
					2: 'audio',
					3: 'video'
				}
			};
		},
		onShow() {},
		onUnload() {
			addSubjectView({
				subject_id: this.id,
				view_duration: this.last_view.currentTime,
				material_id: this.last_view.id
			})
		},
		onLoad(e) {
			this.id = e.id
			this.init()
		},
		methods: {
			changeLastView(item) {
				this.last_view = {
					...item,
					view_duration: 0,
				}
			},
			// 播放结束，需要播放下一级，当前如果是最后一集，则结束播放
			ended(){
				this.details.materials[this.materialsType[this.details.type]].filter((v, i)=>{
					if(this.last_view.id == v.id && i + 1 <= this.details.materials[this.materialsType[this.details.type]].length){
						this.last_view = this.details.materials[this.materialsType[this.details.type]][i+1]
					}
				})
			},
			timeupdate({
				detail
			}) {
				this.last_view = {
					...this.last_view,
					...detail,
					view_duration: detail.currentTime
				}
			},
			async init() {
				let {
					data
				} = await getSubjectDetailWithMaterials({
					id: this.id
				})
				this.details = data || {}
				this.last_view = data.last_view || this.details.materials[this.materialsType[this.details.type]][0]
			},
			async house() {
				await toggleSubjectCollection({
					subject_id: this.id
				})
				this.details.is_collected = !this.details.is_collected
			},

			formatTime(seconds) {
				const date = new Date(seconds * 1000); // 将秒转换为毫秒
				const hh = date.getUTCHours();
				const mm = date.getUTCMinutes();
				const ss = date.getSeconds();
				return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
			}
		}
	}
</script>
<style scoped lang="less">
	.page {
		min-height: 100vh;
		background-color: #fff;
	}

	.video {
		width: 100%;
		height: 500rpx;
	}

	.border {
		height: 8rpx;
		background-color: #f8f8f8;
		margin-top: 20rpx;
	}

	.info {
		padding: 20rpx 30rpx;

		.title {
			font-size: 36rpx;
			font-weight: 700;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.new-iconfont {
				font-size: 40rpx;
			}

			.icon-shoucang1 {
				color: #fcb51a;
			}
		}

		.texts {
			display: flex;
			align-items: center;
			font-size: 26rpx;
			margin-top: 16rpx;
			color: #777;

			text {
				padding: 0 30rpx;
				color: #eee;
			}
		}

		.ip-house {
			margin-top: 16rpx;
			font-size: 24rpx;
			display: flex;
			justify-content: space-between;
			color: #999;

			.new-iconfont {
				font-size: 32rpx;
				color: red;
			}
		}
	}

	.content {
		.tab {
			display: flex;
			justify-content: center;
			margin-top: 20rpx;
			margin-bottom: 16rpx;

			.item {
				width: 25%;
				height: 52rpx;
				text-align: center;
				line-height: 52rpx;
				font-size: 28rpx;
				color: #000;
				margin-right: 20rpx;

				&.active {

					font-size: 30rpx;
					font-weight: bold;
					position: relative;

					&::after {
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
			}
		}

		.scroll {
			height: 48vh;
			overflow-y: auto;
		}

		.catalogue {

			.item {
				padding: 20rpx 30rpx;

				.label {
					display: flex;
					justify-content: space-between;
					font-weight: 700;
					font-size: 30rpx;
				}

				.time {
					color: #777;
					font-size: 26rpx;
					margin-top: 16rpx;
				}

				&.active {
					background-color: #F4F3EF;

					.label {
						color: #CDB18B;
					}
				}
			}
		}

		.detail {
			padding: 20rpx 30rpx;

			.name {
				font-weight: 700;
				font-size: 32rpx;
				margin-bottom: 20rpx;
			}
		}
	}

	.bottom-footer {
		position: sticky;
		bottom: 0;
		background-color: #fff;
		padding: 20rpx 30rpx;
		box-shadow: 0 10rpx 40rpx #66666666;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.num {
			color: #C1A06B;
			font-size: 40rpx;

			.font666 {
				color: #666;
			}

			text {
				font-size: 28rpx;
			}
		}

		.btn {
			height: 80rpx;
			background-color: #C1A06B;
			color: #fff;
			width: 250rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 20rpx;
		}
	}
</style>