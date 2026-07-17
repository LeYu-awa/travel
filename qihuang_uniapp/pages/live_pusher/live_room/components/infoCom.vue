<template>
	<uni-popup ref="costShow" type="bottom" @change="close">
    <view class="popUp">
      <view class="content">
        <view class="item" v-for="(item,index) in list" :key="index" @click="onclick(item.url)">
          <view class="item-image"><image :src="item.image"></image></view>
          <view class="item-title">{{item.name}}</view>
        </view>
      </view>
    </view>  
  </uni-popup>
</template>
<script>
// import {  getLiveGoods } from '@/api/liveBroadcast.js';  
import {  imageBase64 } from '@/api/public.js';  

	export default {
		name: 'infoCom',
		props: { 
			show: {
				type: Boolean,
				default: false,
      },
      roomId: {
        type: String,
				default: '',
      }
		},
		data() {
      return {
        list: [
          { name: '分享',image:'/static/images/liveRoom/info1.png',url:'分享'},
          { name: '举报',image:'/static/images/liveRoom/info2.png',url:'举报'  },
          { name: '订单',image:'/static/images/liveRoom/info3.png' ,url:'/pages/users/order_list/index?status=-1'},
          { name: '优惠券',image:'/static/images/liveRoom/info4.png',url:'/pages/users/user_coupon/index' },
          { name: '助力',image:'/static/images/liveRoom/info5.png',url:'/pages/activity/assist_record/index' },
          { name: '活动报名',image:'/static/images/liveRoom/info6.png',url:'/pages/activity/my_registrate/index' },
          { name: '秒杀',image:'/static/images/liveRoom/info7.png',url:'/pages/activity/goods_seckill/index' },
          { name: '拼团',image:'/static/images/liveRoom/info8.png',url:'/pages/activity/combination/index' },
          { name: '我的积分',image:'/static/images/liveRoom/info9.png',url:'/pages/users/user_integral/index' },
        ],
        imageurl:''
			};
    },
    watch: {
      show(newVal) {
        if (newVal) {
          this.$refs.costShow.open()
        }
      }, 
    },
    created() {

    },
    methods: {  
      
      close() {
        this.$emit('close', false)
      },
      onclick(url) {
        if (url == '举报') {
          this.$emit('onclick',1)
          this.$refs.costShow.close()
        }else if (url == '分享') {
          this.$emit('onclick',2)
          this.$refs.costShow.close()
        } else {
          uni.navigateTo({
            url: url
          })
        }
        
        // this.$refs.costShow.close()
      }
	}
}
</script>

<style scoped lang="scss">
	.popUp{ 
    width: 100%;
    // height: 700rpx;
    background: #ffffff;
    // background: rgba(255, 255, 255, 0.3); /* 半透明白色背景 */
    backdrop-filter: blur(10px); /* 添加背景模糊效果 */
    -webkit-backdrop-filter: blur(10px); /* 兼容WebKit内核的浏览器，如Safari */
    // padding: 16rpx 32rpx 54rpx 32rpx;
    padding: 30rpx 26rpx 54rpx 26rpx;
    box-sizing: border-box;
    border-radius: 12rpx 12rpx 0 0;
  }
  .content{
    display: flex;
		flex-flow:row wrap;
		justify-content: space-between;

    .item{
      width: 138rpx;
      height: 125rpx;
      margin-bottom: 38rpx;
      .item-image{
        display: flex;
        justify-content: center;
        
        image{
          width: 95rpx;
          height: 95rpx;
          background: #f3f6ff;
          border-radius: 50%;
        }
      }
      .item-title{
        font-size: 20rpx;
        height: 27rpx;
        line-height: 27rpx;
        margin-top: 5rpx;
        text-align: center;
      }
    }
  }
  .content:after {
		content: "";
		width: 20%;
	}

  .scroll-Y{
    height: 100%;
    ::-webkit-scrollbar {
      display: none;
    }

    /* 对于Firefox */
   scrollbar-width: none; /* Firefox 64+ */
  }
</style>
