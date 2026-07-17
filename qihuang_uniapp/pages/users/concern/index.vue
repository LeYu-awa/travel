<template>
	<view class="content">
		<Header>
			<template #title>
				<view class="tabs">
					<view class="item" :class="pageQuery.type == 'followers' ? 'select' : ''"
						@click="change('followers')">
						粉丝
					</view>
					<view class="item" :class="pageQuery.type == 'following' ? 'select' : ''"
						@click="change('following')">
						关注
					</view>
				</view>
			</template>
		</Header>
		<template v-if="list.length">
			<view class="item" v-for="item,index in list" :key="item.id"
				@click="$goNextPage('/pages/users/user_index/index?uid=' + item.follow_uid)">
				<view class="left">
					<image class="headimg" :src="item.avatar || '/static/images/f.png'">
					</image>
				</view>
				<view class="right">
					<view class="right-content">
						<view class="name">
							<text>{{item.nickname}}</text>
						</view>
						<!-- <view class="time">
							{{item.follow_time}} 关注了你
						</view> -->

					</view>
					<view class="right-btn " @click.stop="follow(item, index)"
						:class="item.is_following_each_other || !item.noFollowing ? 'btn-followed' : 'btn-follow'">
						{{getValue(item)}}
					</view>
				</view>
			</view>

		</template>

		<emptyPage title="暂无数据" v-else />
	</view>

</template>

<script>
	import Header from "@/components/header.vue"
	import emptyPage from "@/components/emptyPage.vue"
	import {
		markSystemMessageAsRead 
	} from "@/api/message.js"
	import {
		getMyFollowing,
		getMyFollowers
	} from "@/api/user.js"
	import {
		unfollowUser,
		followUser
	} from "@/api/index.js"
	export default {
		components: {
			Header,
			emptyPage
		},
		data() {
			return {
				total: 0, 
				pageQuery: {
					page: 1,
					limit: 20,
					type: 'followers'
				},
				list: []
			}
		},
		async onLoad(e) {
			if(e.read){
				await markSystemMessageAsRead({
					message_type: 'new_followers'
				})
			}
			this.pageQuery.type = e.type
			this.getList()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.pageQuery.page = 1
			this.getList()
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		// 触底加载
		async onReachBottom() {
			if(this.list.length < this.total){
				this.pageQuery.page += 1
				this.getList()
			}else{
				uni.showToast({
					title: '没有更多了',
					icon: 'none'
				})
			}
		},
		methods: {
			change(type) {
				this.pageQuery.type = type
				this.pageQuery.page = 1
				this.getList()
			},
			getValue(item) {
				if (item.is_following_each_other) {
					return '互相关注'
				}
				// 粉丝
				if (this.pageQuery.type == 'followers') {
					return '回关'
				} else {
					if (item.noFollowing) {
						return '关注'
					} else {
						return '已关注'
					}
				}
			},
			async follow(item, index) {
				// 互相关注:需要取消互相关注
				if (item.is_following_each_other) {
					await unfollowUser({
						follow_uid: item.follow_uid
					})
					item.is_following_each_other = false
					// 再关注页面,就会变成待关注
					if (this.pageQuery.type == 'following') {
						item.noFollowing = true
					}
				} else {
					if (this.pageQuery.type == 'followers') {
						await followUser({
							follow_uid: item.follow_uid
						})
						item.is_following_each_other = true
					} else {
						if (item.noFollowing) {
							await followUser({
								follow_uid: item.follow_uid
							})
							item.noFollowing = false
						} else {
							await unfollowUser({
								follow_uid: item.follow_uid
							})
							item.noFollowing = true
						}
					}
				}
				this.list[index] = item 
				this.list = Object.assign([], this.list)
			},
			async getList() {
				let data
				if (this.pageQuery.type == 'followers') {
					data = await getMyFollowers(this.pageQuery)
				} else {
					data = await getMyFollowing(this.pageQuery)
				}
				this.total = data.data.count
				if (this.pageQuery.page == 1) {
					this.list = data.data.list
				} else {
					this.list = [...this.list, ...data.data.list]
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabs {
		display: flex;
		justify-content: center;
		width: 100%;

		.item {
			margin: 0 30rpx;

			&.select {
				position: relative;

				&::after {
					content: '';
					left: 0;
					right: 0;
					margin: auto;
					height: 8rpx;
					position: absolute;
					bottom: 0rpx;
					background: linear-gradient(180.00deg, rgba(38, 67, 127, 1), rgba(7, 16, 47, 1) 100%);
					width: 50rpx;
					border-radius: 10rpx;
				}
			}
		}
	}

	.content {
		min-height: 100vh;
		background: #fff;

		.item {
			display: flex;
			margin-left: 20rpx;
			padding: 20rpx;

			.left {
				.headimg {

					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}
			}

			.right {
				margin-left: 30rpx;
				border-bottom: 2rpx solid #eee;
				padding-bottom: 20rpx;
				width: calc(100% - 100rpx);
				display: flex;
				justify-content: space-between;

				.right-content {
					font-size: 26rpx;

					.name {
						font-size: 32rpx;
						font-weight: bold;
					}

					.time {
						margin-top: 20rpx;
					}
				}

				.right-btn {
					border-radius: 20rpx;
					width: 120rpx;
					height: 60rpx;
					margin: 20rpx 40rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 26rpx;
				}

				// 未关注状态
				.btn-follow {
					color: #fff;
					background-color: #EE1D52;
				}


				.btn-followed {
					color: #666666;
					background-color: #80808030;
				}

				// 互相关注状态
				.btn-mutual {
					color: #666666;
					background-color: #80808030;
				}
			}
		}

	}
</style>