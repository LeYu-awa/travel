<!-- tab -->
<template>
  <view>
	  <!-- :style="{'background-color':bgColor}" -->
    <view class="bj" ></view>
    <view class="top">
		名医直播
     <!-- <view 
      :class="tabindex==index?'top-item active':'top-item'" 
      v-for="(item,index) in tablist" 
      :key="index"
      @click="ontab(index)"
      >{{item.name}}</view> -->
      <view class="search-view" @click="onsearch">
		  <image src="/static/images/index/search.png"></image>
	</view>
    </view>
  </view>
</template> 

<script>
	import { getDiy } from '@/api/api.js';
export default {
  name: 'topCom',
  props: {
    
  },
  data() {
    return {
      tabindex: 0,
      // tablist: [
      //   { name: '推荐' },
      //   { name: '发现' }
      // ],
	  
	    bgColor:'#587ff7'
    };
  },
  watch: {

  },
  mounted() {
  	// this.getDiy()
  },
  methods: {
    ontab(index) {
      this.tabindex = index
      this.$emit('ontab', index)
    },
	onsearch(){
		uni.navigateTo({
			url:'/pages/liveBroadcastSearch/liveBroadcastSearch'
		})
	},
	getDiy(){
		let parmas = {
			id: 0,
			did: 0, 
			version: '221'
		}
		getDiy(parmas).then(res => {
			if (res.data.is_bg_color) {
				this.bgColor = data.color_picker
			}
		})
	}
  }
}
</script>

<style scoped lang="less">
.bj{
    width: 100%;
    height: 500rpx;
    position: absolute;
    top: 0;
    left: 0;
    z-index:-1;
    background: #fff;
	// background-image: linear-gradient(90deg, #FA6514 0%, #E93323 100%);
  }
  .top{
    width: 100%;
    height: 72rpx;
    padding-top: 10rpx;
    box-sizing: border-box;
    
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .top-item{
      width: 82rpx;
      height: 72rpx;
      line-height: 72rpx;
      color: #333;
      margin: 0 16rpx;
      
      text-align: center;
      font-size: 26rpx;
    }
    .active{
      font-size: 32rpx;
      position: relative;
    }
    .active::before{
      content: '';
      width: 34rpx;
      height: 8rpx;
      background: #ffffff;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%,0);

    }
    .search-view{
      position: absolute;
      right: 0;
      top: 50%;
	  transform: translateY(-50%);
      padding-right: 40rpx;
      display: flex;
      align-items: center;
      image{
        width: 43rpx;
        height: 43rpx;
      }
    }
  }
</style>
