<template>
	<view class="video-page" :style="'height: calc(100vh - ' + height + 'px);'">
		<swiper :style="'width:100%; height: calc(100vh - ' + height + 'px);'" :vertical="true"
			@animationfinish="animationfinish" @change="change" :current="k" :indicator-dots="false">
			<swiper-item v-for="(list,index) in dataList" :style="'height: calc(100vh - ' + height + 'px)'">
				
				<!-- <list :loadmoreoffset="wHeight*1" :show-scrollbar="false"
					ref="listBox" :pagingEnabled="true" :scrollable="true">
					<cell v-for="(list,index) in dataList" > -->
				<!-- 视频的内容 -->
				<view class="video-content">
					<!-- 123 -->
					<video :id="list.community_id+''+index" :loop="true" :muted="list.isplay"
						:autoplay="index == k && isRoutine" :controls="false" :http-cache="true"
						:custom-cache="false" :page-gesture="false" :show-fullscreen-btn="false"
						:show-loading="false" :show-center-play-btn="false" :enable-progress-gesture="false"
						:src="list.video_link" @ended="ended" @play="play(index)"
						@click="tapVideoHover(list.state,$event,list.is_pay)" @waiting="waiting(index)"
						@timeupdate="timeupdate(list,index,$event)"
						style="width: 100%;height: 100%;" preload="auto"
						></video>
						<!-- <video :ref="'item'+index" :id="list.community_id" :loop="true"
							:autoplay="index == k&&isVideoAutoplay" :src="list.video_link" :muted="list.isplay"
							:enable-progress-gesture="false" :page-gesture="false" :controls="false"
							:show-loading="true" :show-fullscreen-btn="false" :show-center-play-btn="false"
							 preload="auto"
							@timeupdate="timeupdate(list, index, $event)"></video> -->
				</view>
				
				<!-- 底部的文字描述 -->
				<cover-view class="text-content">
					<cover-view class="cart">
						@{{list.author && list.author.nickname}}
					</cover-view>
					<view class="words">
						<view v-if="list.isMore || list.content.length<=15">
							<text class="info-content">{{list.content}}</text>
							<view class="close">
								<text v-if="list.isMore" class="more" @click="moreTap(index)">收起</text>
							</view>
						</view>
						<view class="wordsCon" v-else>
							<text class="info-content">{{list.content.slice(0,15)}}...</text>
							<text class="more" @click.stop="moreTap(index)">展开</text>
						</view>
					</view>
				</cover-view>
				<!-- 个人信息 -->
				<view class="info">
					<view class="avatar-info">
						<image class="avatar" :src="list.author&&list.author.avatar || '/static/images/f.png'" mode="aspectFill"></image>
						<view  v-if="!list.is_fans || !userInfo.uid" class="new-iconfont icon-right"></view>
					</view>
					<view class="item">
						<view class="new-iconfont icon-love"></view>
						<view class="">
							{{list.count_start > 0 ? list.count_start : '点赞'}}
						</view>
					</view>
					<view class="item">
						<view class="new-iconfont icon-liuyan"></view>
						<view class="">
							{{list.count_reply>0 ? list.count_reply : '评论'}}
						</view>
					</view>
					<view class="item">
						<view class="new-iconfont icon-shoucangsel"></view>
						<view class="">
							{{list.count_reply>0 ? list.count_reply : '收藏'}}
						</view>
					</view>
					<view class="item">
						<view class="new-iconfont icon-a-mianxingfenxiang"></view>
						<view class="">
							{{list.count_reply>0 ? list.count_reply : '分享'}}
						</view>
					</view>
				</view>
				<!-- </cell>
			</list> -->
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		videoList,
		myVideoList,
		graphicStartApi,
		followAuthorApi,
		getVideoCode,
		deletePlantApi,
		focusArticleLst,
		createVideoOrder,
		getPayStatus
	} from '@/api/community.js';
	export default {
		props: {
			height: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				k: 0, // 当前播放的视频数量，例如：当前播放第一个视频
				loadVideo: true,
				loadend: false,
				isVideoAutoplay: true, //视频是否自动播放
				isRoutine: true,
				limit: 6,
				page: 1,
				total: 0,
				dataList: [],
			}
		},
		created() {
			this.get()
		},
		methods: {
			get(){
				if(this.page != 1 && this.total == this.dataList.length){
					return
				}
				videoList({
					page: this.page,
					limit: this.limit
				}).then(res => {
					this.total = res.data.total
					if(this.page == 1){
						this.dataList = res.data.list
					}else{
						this.page = this.page + 1;
						this.dataList.push(...res.data.list)
					}
				}).catch(err => {
					return uni.showToast({
						title: err,
						icon: 'none',
						duration: 2000
					});
				})
			},
			moreTap(item) {
				console.log(item)
				this.dataList[item].isMore = !this.dataList[item].isMore
				this.dataList = Object.assign([], this.dataList)
			},
			change(event) {
				
					console.log('event',event)
				// this.k = event.detail.current;
				// this.posterImage = false;
				// if (this.isLogin && this.dataList[this.k]) {
				// 	this.downloadFilePromotionCode(this.dataList[this.k]['community_id']);
				// }
			},
			animationfinish(event) {
				console.log(event)
				// 1.这里进行判断，如果是最后一个视频就进入 get() 方法加载视频进入列表
				// if (this.k == this.dataList.length - 1) {
				// 	this.loadVideo = true;
				// 	this.currentNav == 1 ? this.GET() : this.getFocusList()
				// }
			},
			/* 获取产品分销二维码
			 * @param function successFn 下载完成回调
			 *
			 */
			downloadFilePromotionCode: function(id) {
				let that = this;
				let type;
				// #ifndef MP
				type = 'wechat'
				// #endif
				// #ifdef MP
				type = 'routine'
				// #endif
				getVideoCode(id, {
					type: type
				}).then(async res => {
					that.codeImg = res.data.url
				}).catch(err => {
					that.$set(that, 'PromotionCode', '');
				});
			},
			ended() {
				// 1.播放当前视频结束时触发，自动切换下一个视频
				// this.current = this.k+1
			},
			play(k) {
				console.log(' 播放了', k)
				this.dataList[k].isplay = false
				this.dataList[k].playIng = true
				this.dataList[k].state = 'play'
				this.dataList[k].loading = false
			},
			waiting(k) {
				console.log('视频缓冲了', k)
				this.dataList[k].loading = true
			},
			timeupdate(list, index, event) {
				if (index == this.k) {
					var currenttime = event.detail.currentTime
					this.timeNumber = Math.round(event.detail.duration)
					this.percent = currenttime / this.timeNumber
					// 当视频播放到 30%显示赠送积分字幕
					// if (this.percent >= 0.3 && this.dataList[index].is_reward == 0) {
					// 	this.getVideoPoints(list.community_id, index)
					// }
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.video-page {
		background-color: #000;
		position: relative;
		
		.video-content{
			width: 100%;
			height: 100%;
			// position: relative;
			
		}

		.text-content{
			position: absolute;
			color: #fff;
			line-height: 1.6;
			left: 30rpx;
			width: 590rpx;
			padding: 15rpx 0;
			bottom: 30rpx;
			z-index: 10;
			.time {
				font-size: 24rpx;
				color: rgba(255, 255, 255, 0.5);
				margin-left: 12rpx;
			}
			
			.cart {
				height: 48rpx;
				flex-direction: row;
			
				.cartName {
					font-size: 24rpx;
					color: #fff;
				}
			}
			.words {
				margin-top: 12rpx;
			
				.close {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: flex-end;
					margin-right: 20rpx;
			
					.imgClose {
						width: 18rpx;
						height: 10rpx;
						margin-left: 10rpx;
					}
				}
			
				.wordsCon {
					position: relative;
			
					.more {
						position: absolute;
						bottom: 0;
						right: 40rpx;
						font-size: 26rpx;
					}
			
					.img {
						width: 18rpx;
						height: 10rpx;
						margin-left: 4rpx;
						position: absolute;
						bottom: 7rpx;
						right: 15rpx;
					}
				}
			
				.info-content {
					color: #fff;
					font-size: 28rpx;
				}
			
				.more {
					font-size: 26rpx;
					color: #ffffff;
					font-weight: 400;
				}
			}
		}
		
		.info {
			position: absolute;
			right: 30rpx;
			bottom: 200rpx;
			z-index: 10;

			.avatar-info {
				position: relative;

				.avatar {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					border: 6rpx solid #fff;
				}

				.new-iconfont {
					position: absolute;
					left: 0;
					right: 0;
					margin: auto;
					bottom: 0rpx;
					width: 42rpx;
					height: 42rpx;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					background: linear-gradient(137.83deg, rgba(255, 230, 140, 1), rgba(220, 170, 90, 1) 100%);
				}
			}

			.item {
				font-size: 20rpx;
				color: #fff;
				text-align: center;
				margin-top: 40rpx;

				.new-iconfont {
					font-size: 64rpx;
					margin-bottom: 6rpx;
				}
			}
		}
	}
</style>