<template>
	<view class="wrap" v-if="info">
		<view class="user-info">
			<image class="user-head" :src="info.avatar ? info.avatar : '/static/images/f.png'"></image>
			<view class="nicakname">
				{{info.nickname}}
			</view>
		</view>
		<view class="basic-info">
			<view>性别： {{info.sex==1?'男':info.sex==2?'女':'未知'}}</view>
		</view>
	</view>
</template>

<script>
	import {
		getUserDetails
	} from '@/api/liveBroadcast.js';
	export default {
		data() {
			return {
				info: null
			}
		},
		onLoad(options) {
			getUserDetails({
				uid: options.uid
			}).then(res => {
				if (res.status == 200) {
					this.info = res.data;
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 32rpx;
	}

	.user-info {
		display: flex;
		align-items: center;
	}

	.user-head {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.nicakname {
		font-size: 32rpx;
		font-weight: bold;
		margin-left: 10rpx;
	}
	.basic-info{
		margin-top: 10rpx;
	}
</style>