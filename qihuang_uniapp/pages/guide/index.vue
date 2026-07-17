<template>
	<view class="main">
		<guide v-if="guidePages" :advData="advData"></guide>
	</view>
</template>

<script>
	import guide from '@/components/guide/index.vue'
	import Cache from '@/utils/cache';
	import { setStorage } from '@/libs/uniApi.js';
	import {
		getOpenAdv
	} from '@/api/api.js'
	export default {
		components: {
			guide
		},
		data() {
			return {
				guidePages: false,
				frequency: '',
				advData: []
			}
		},
		onLoad(options) {
			if(options.spid)setStorage('spid', options.spid);
		},
		onShow() {
			// #ifdef H5
			if(this.$wechat.isWeixin()){
				this.$wechat.wechat();
			}
			// #endif
			this.loadExecution()
		},
		methods: {
			loadExecution() {
				getOpenAdv().then(res => {
					this.frequency = res.data.config.open_screen_space
					const tagDate = uni.getStorageSync('guideDate') || '',
					nowDate = new Date();
					if(tagDate >= nowDate && res.data.config.open_screen_space!=0){
						// #ifdef APP
						uni.switchTab({ url: '/pages/short_video/appSwiper/index' });
						// #endif
						// #ifndef APP
						uni.switchTab({ url: '/pages/short_video_index/index' });
						// #endif
						return
					}else{
						if (res.data.config.open_screen_switch == "" || res.data.list.length == 0) {
							// #ifdef APP
							uni.switchTab({ url: '/pages/short_video/appSwiper/index' });
							// #endif
							// #ifndef APP
							uni.switchTab({ url: '/pages/short_video_index/index' });
							// #endif
						} else if (res.data.config.open_screen_switch && res.data.list.length) {
							this.advData = res.data
							let curTime = new Date(), addHour = curTime.setHours(curTime.getHours()+res.data.config.open_screen_space);
							uni.setStorageSync('guideDate', new Date(addHour))
							this.guidePages = true
						}
					}
				}).catch(err => {
					// #ifdef APP
					uni.switchTab({ url: '/pages/short_video/appSwiper/index' });
					// #endif
					// #ifndef APP
					uni.switchTab({ url: '/pages/short_video_index/index' });
					// #endif
				})
			}
		},
		onHide() {
			this.guidePages = false
		}
	}
</script>

<style>
	page,
	.main {
		width: 100%;
		height: 100%;
	}
</style>
