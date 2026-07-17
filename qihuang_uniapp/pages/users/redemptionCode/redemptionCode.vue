<template>
	<view>
		<view class="entrance-box">
		    <!-- <view class="entrance-top-img">
		      <image src="/static/images/f.png">
		    </view> -->
		    <view class="entrance-title">请输入兑换码</view>
		   <view class="entrance-input">
		      <input type="text" placeholder="请输入兑换码" v-model="value">
		    </view>
		    <view class="entrance-btn" @click="userExchange">确认</view>
		</view>
	</view>
</template>

<script>
	import { getLiveByCode } from '@/api/liveBroadcast.js';  
	export default {
		data() {
			return {
				value:''
			};
		},
		methods:{
			userExchange(){
				if(!this.value)return uni.showToast({title: '请输入兑换码',icon: 'none'});
				getLiveByCode({code:this.value}).then(res=>{
					console.log(res)
					if(res.status==200){
						if(res.data.is_live==1){
							uni.navigateTo({
							  url:'/pages/live_pusher/live_room/live_room?roomId='+res.data.room_id
							})
						}else{
							uni.showToast({title: '兑换成功',icon: 'none'});
						}
						this.value = ''
					}else{
						uni.showToast({title: res.message,icon: 'none'});
					}
				})
			}
		}
	}
</script>
<style>
	page{
		background: #ffffff;
	}
</style>
<style scoped lang="less">
.entrance-box{
  padding: 0 55rpx;
  box-sizing: border-box;
}
.entrance-top-img{
  display: flex;
  justify-content: center;
  margin-top: 80rpx;
  img{
    width: 66rpx;
    height: 66rpx;
    object-fit: cover;
    border-radius: 50%;
  }
}
.entrance-title{
  line-height: 35rpx;
  text-align: center;
  font-size: 28rpx;
  font-weight: 500;
  margin-top: 280rpx;
}
.entrance-input{
  margin-top: 36rpx;
  input{
    width: 100%;
    height: 85rpx;
    padding:0 20rpx;
    box-sizing: border-box;
    border: 2rpx solid #c9c9c9;
    border-radius: 16rpx;
  }
}
.entrance-btn{
  width: 100%;
  height: 75rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26rpx;
  color: #ffffff;
  border-radius: 20rpx;
  background: #587ff7;
  margin-top: 58rpx;
}
</style>
