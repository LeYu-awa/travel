<!-- 弹幕 -->
<template>
	<view>
    <view class="content">
      <scroll-view scroll-y="true" class="scroll-Y" :show-scrollbar="false" ref="scrollView" :scroll-top="scrollyTop" @scroll="handleScroll">
        <view  class="scroll-view">
          <view v-for="(item,index) in listData" :key="index">
            <view class="list" v-if="!item.fans">
              <!-- <image src="/static/images/liveRoom/icon.png"></image> -->
              <text>{{item.nickname}}：</text>
              {{item.content}}
            </view>
            <view class="fans" v-else>
              <!-- <image src="/static/images/liveRoom/icon.png"></image> -->
              <view class="fans-icon">粉丝团</view>
              <text>{{item.nickname}}：</text>
              {{item.content}}
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>
<script>
	export default {
		name: 'bulletChat',
		data() {
      return {
        minTop: 0,
        maxTop: 60,
        hrackH:40,
        listData: [],
        hrackNum: 0,
        scrollyTop:0
			};
    },
  created() { },
  mounted() {
			//leftBottom 使用参数
			if (this.type === 'leftBottom') {
				this.hrackNum = Math.floor(this.maxTop / this.hrackH);
			}
		},
    methods: { 
      handleScroll(e) {
        this.scrollyTop = e.detail.scrollTop
      },
      add(data) {
        let objData = {
            content: data.item,
            fans: data.fans,
            nickname:data.nickname,
						type: 'leftBottomEnter',
						style: {
							transition: `all 0.5s`,
							animationDuration: `0.5s`,
							transform: `translateX(0%)`,
							bottom: `${this.minTop}px`
						}
					}
					let listLen = this.listData.length;
					let hrackNum = this.hrackNum;
					for (let i in this.listData) {
						if(this.listData[i].status === 'reuse'){ //重用
							this.$set(this.listData,i,objData);
						}else if(this.listData[i].status === 'reset'){ //重置
							this.listData[i].style.transition = 'none';
							this.listData[i].style.bottom = 0;
							this.listData[i].status = 'reuse';
						}else if(this.listData[i].status === 'recycle'){ //回收
							this.listData[i].type = 'leftBottomExit';
							this.listData[i].status = 'reset';
						}else{
							this.listData[i].style.bottom = parseInt(this.listData[i].style.bottom) + this.hrackH + 'px';
						}
						if(parseInt(this.listData[i].style.bottom) >= (this.maxTop - this.hrackH) && this.listData[i].status !== 'reset'){ //需要回收
							this.listData[i].status = 'recycle';
						}
        }
        this.listData.push(objData);
        this.$nextTick(() => {
            const query = uni.createSelectorQuery().in(this)
            query.select('.scroll-view').boundingClientRect()
            query.exec(res => {
              const scrollViewHeight = res[0].height
              this.scrollyTop = scrollViewHeight
            })
        })
					// if(listLen < hrackNum + 2){
					// 	this.listData.push(objData);
					// }
        }
    }
}
</script>

<style scoped lang="scss">
.content{
  width: 100%;
  height: 360rpx;
  padding: 0 30rpx;
  box-sizing: border-box;
  .list{
    max-width: 85%;
    padding: 15rpx 18rpx;
    box-sizing: border-box;
    color: #ffffff;
    background: rgba(0,0,0,0.35);
    border-radius: 35rpx;
    position: relative;
    display: inline-block;
    font-size: 26rpx;
    margin-bottom: 12rpx;
    line-height: 40rpx;
    image{
      position: absolute;
      left: 12rpx;
      top: 18rpx;
      width: 40rpx;
      height: 40rpx;
    }
    text{
      // padding-left: 35rpx;
      color: #3ccfc2;
    }
  }
  .fans{
    max-width: 85%;
    padding: 15rpx 18rpx;
    box-sizing: border-box;
    color: #ffffff;
    background: rgba(235,173,76,0.6);
    border-radius: 35rpx;
    position: relative;
    display: inline-block;
    font-size: 26rpx;
    margin-bottom: 12rpx;
    line-height: 40rpx;
    image{
      position: absolute;
      left: 12rpx;
      top: 18rpx;
      width: 40rpx;
      height: 40rpx;
    }
    text{
      padding-left: 12rpx;
      color: #ebad4c;
    }
    .fans-icon{
      width: 70rpx;
      height: 35rpx;
      border: 1rpx solid #ffffff;
      box-sizing: border-box;
      line-height: 35rpx;
      text-align: center;
      color: #ffffff;
      font-size: 18rpx;
      margin-left: 35rpx;
      display: inline-block;
      background: #ff4e5f;
      border-radius: 6rpx;
    }
  }
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
