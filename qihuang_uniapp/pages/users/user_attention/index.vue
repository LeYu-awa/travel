<template>
	<view class="wrap">
		<!-- 搜索 -->
		<view class='search'>
			<view class='input' :class="focus?'input-focus':'input-default'">
				<text class='iconfont icon-sousuo2'></text>
				<input type='text' :value='nickname' :focus="focus" placeholder='搜索用户备注或名字'
					placeholder-class='placeholder' @focus="focusInput" @input="setValue" confirm-type="search"
					@confirm="searchBut()"></input>
			</view>
			<view class='bnt' @tap='searchCancle' v-show="focus">取消</view>
		</view>

		<!-- 菜单 -->
		<view class="menus-box">
			<block v-for="(item,index) in menus" :key="index">
				<navigator :url="item.url">
					<view class="m-item">
						<image :src="item.img" class="img"></image>
						<view class="title">{{item.title}}</view>
					</view>
				</navigator>
			</block>
		</view>

		<!-- 列表 -->
		<template v-if="list.length!==0">
			<view class="list-box">
				<view class="l-item" v-for="(item,index) in list" :key="index" @click="oninfo(item)">
					<view class="head">
						<image :src="item.room_image" class="img"></image>
						<view class="label" v-if="item.is_live==1">直播中</view>
					</view>
					<view class="center">
						<view class="name">{{item.title}}</view>
						<view class="live-status" v-if="item.is_live==1">正在直播</view>
					</view>
					<view class="attention-status" :class="item.attention_status==1?'default': 'active'"
						@click.stop="changeAttentionStatus(item,index)">
						{{item.attention_status==1?'取消关注':'关注'}}
					</view>
				</view>
			</view>
		</template>
		
		<!-- 空数据 -->
		<view class='noCommodity' v-if="list.length==0">
			<view class='pictrue'>
				<image :src="`${domain}/static/images/noCart.png`"></image>
				<view>暂无数据</view>
			</view>
		</view>
	</view>
</template>

<script>
	let app = getApp();
	import {
		getAttentionLiveList,
		attentionLive
	} from '@/api/attention.js';
	import {
		mapGetters
	} from "vuex";
	import {
		HTTP_REQUEST_URL
	} from '@/config/app';
	import {
		toLogin
	} from '@/libs/login.js';
	export default {
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				nickname: '', //搜索值
				focus: false, //输入框聚焦状态
				menus: [{
					img: '/static/images/zhibo.png',
					title: '直播中',
					url: '/pages/living/index?is_live=1'
				}, {
					img: '/static/images/no-zhibo.png',
					title: '未直播',
					url: '/pages/living/index?is_live=0'
				}],
				list: []
			}
		},
		computed: {
			...mapGetters(['isLogin'])
		},
		onLoad() {
			this.getList()
		},
		methods: {
			setValue: function(event) {
				this.$set(this, 'nickname', event.detail.value);
			},
			focusInput() {
				this.focus = true
			},
			searchCancle() {
				this.focus = false
			},
			searchBut() {
				this.getList({
					nickname: this.nickname
				})
			},
			getList(params) {
				getAttentionLiveList({
					is_live: 'all',
					...params
				}).then(res => {
					res.data.forEach(item => {
						item['attention_status'] = 1
					})
					this.list = res.data;
				})
			},
			changeAttentionStatus(item, index) {
				attentionLive({
					room_id: item.room_id
				}).then(res => {
					if (res.status == 200) {
						if (this.list[index].attention_status == 0) {
							uni.showToast({
								title: '关注成功',
								icon: 'none'
							});
							this.list[index].attention_status = 1
						} else {
							uni.showToast({
								title: '取消成功',
								icon: 'none'
							});
							this.list[index].attention_status = 0
						}

					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				})
			},
			oninfo(data) {
				if (!this.isLogin) {
					toLogin()
					return
				}
				if (data.is_live == 0) {
					return uni.showToast({
						title: '暂未开播',
						duration: 2000
					});
				}
				if ((data.can_see == 2 || data.can_see == 3) && data.is_allow ==
					0) { //can_see 等于2会员或者3付费的时候  用is_allow 来判断
					return uni.showToast({
						title: '请付费',
						duration: 2000
					});
				}
				uni.navigateTo({
					url: '/pages/live_pusher/live_room/live_room?roomId=' + data.room_id
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 0 30rpx;
	}

	.search {
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;

		.input {
			background-color: #eaeaea;
			border-radius: 10rpx;
			padding: 0 35rpx;
			box-sizing: border-box;
			height: 66rpx;
			display: flex;
			line-height: 66rpx;

			input {
				width: 472rpx;
				height: 100%;
				font-size: 28rpx;
				text-align: left;
				margin-left: 10rpx;
			}

			.placeholder {
				color: #bbb;
			}

			.iconfont {
				color: #000;
				font-size: 35rpx;
			}
		}

		.input-default {
			width: 100%;
		}

		.input-focus {
			flex: 1;
		}

		.bnt {
			margin-left: 20rpx;
			text-align: center;
			height: 66rpx;
			line-height: 66rpx;
			font-size: 30rpx;
			color: #282828;
		}
	}

	.menus-box {
		margin-top: 40rpx;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: auto;
		gap: 20rpx;
		width: 100%;
		height: 140rpx;

		.m-item {
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border: 1px solid #e8e8e8;
			border-radius: 20rpx;

			.img {
				width: 40rpx;
				height: 40rpx;
			}

			.title {
				margin-top: 10rpx;
			}

		}
	}

	.list-box {
		margin-top: 60rpx;

		.l-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 20rpx 0;

			.head {
				width: 120rpx;
				height: 120rpx;
				position: relative;

				.img {
					border: 6rpx solid #587ff7;
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}

				.label {
					position: absolute;
					left: 50%;
					bottom: -10rpx;
					transform: translateX(-50%);
					width: 80rpx;
					height: 34rpx;
					padding: 0 4rpx;
					border: 2rpx solid #ffffff;
					background: #587ff7;
					font-size: 22rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #ffffff;
					border-radius: 35rpx;
				}
			}

			.center {
				flex: 1;
				margin: 0 20rpx;

				.name {
					flex: 1;
					font-size: 32rpx;
					font-weight: bold;
					text-align: left;
				}

				.live-status {
					display: inline-block;
					width: auto;
					padding: 4rpx 10rpx;
					margin-top: 8rpx;
					border-radius: 6rpx;
					background-color: #e5e5e5;
					font-size: 24rpx;
					color: #909090;
				}
			}

			.attention-status {
				width: 140rpx;
				height: 60rpx;
				text-align: center;
				line-height: 60rpx;
				border-radius: 8rpx;
			}

			.default {
				background-color: #e8e8e8;
			}

			.active {
				background-color: #E93323;
				color: #fff;
			}
		}
	}
</style>