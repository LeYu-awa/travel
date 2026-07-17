<template>
	<uni-popup ref="costShow" type="bottom" @change="close">
    <view class="popUp" v-show="popshow">
      <view class="poptitle">举报本场直播</view>
      <view class="content">
        <view class="item" v-for="(item,index) in list" :key="index" @click="ontab(index)">
          {{ item.term }}
        </view>
      </view>
      <view class="btn" :style="{'background': tabindex!=-1?'#fe2b54':'#ffb7c5'}">
        提交
      </view>
    </view>  
    <view class="popUp" v-if="!popshow">
      <view class="poptitle">举报本场直播</view>
      <view class="reason">举报原因</view>
      <view class="reason-cont">{{list[tabindex].term}}<text @click="popshow=true">重选原因</text></view>
      <view class="tips">举报描述<text>选填</text></view>
      <view class="reason-input">
        <textarea name="" id="" cols="30" rows="10" placeholder="请指出涉嫌色情服务、隐晦低俗等不良内容，便于平台判断违规情况" v-model="value"></textarea>
      </view>
      <view class="reason-image">
        <view class="reason-item" v-for="(item,index) in uploadImg" :key="index" @click="deleteImg(index)">
        <image  :src="item"></image>
        </view>
        <view class="reason-item" @click="uploadpic">
          <uni-icons type="plusempty" size="30"></uni-icons>
        </view>
      </view>
      <!-- <view class="tips">举报并优化推荐<text>选填,支持多选</text></view>
      <view class="bottom-btn">
        <view>举报主播</view>
        <view>减少相似推荐</view>
      </view> -->
      <view class="btn" style="background:#fe2b54" @click="liveReport">
        提交
      </view>
    </view>
  </uni-popup>
</template>
<script>
import {  getLiveReportList,liveReport } from '@/api/liveBroadcast.js';  
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
        list: [],
        imageurl: '',
        tabindex: -1,
        popshow: true,
        uploadImg: [],
        value:''
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
      this.getLiveReportList()
    },
    methods: {  
      
      close() {
        this.$emit('close', false)
      },
      ontab(index) {
        this.popshow = false
        this.tabindex = index
      },
      getLiveReportList() {
        getLiveReportList({page:1,limit:99}).then(res => {
          console.log(res)
          this.list = res.data
        })
      },
      /**
			 * 上传文件
			 * 
			 */
			uploadpic(){
				let that = this;
				that.$util.uploadImageOne('upload/image', function(res) {
					console.log(res, '回调')
					that.uploadImg.push(res.data.path);
					// that.$set(that, 'uploadImg', that.uploadImg);
				});
			},
      liveReport() {
       let  strdata = {
          term_id:this.list[this.tabindex].id, // 举报项id
          room_id:this.roomId, // 直播间id
          describe: this.value, // 描述
         images: this.uploadImg.length > 0 ? this.uploadImg.join(','):'', // 图片
        }
        liveReport(strdata).then(res => {
          if (res.status == 200) {
            uni.showToast({
              title: '举报成功!',
              icon: 'success'
            });
            this.$emit('close', false)
            this.$refs.costShow.close()
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
        })
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
    padding: 30rpx 32rpx 54rpx 32rpx;
    box-sizing: border-box;
    border-radius: 12rpx 12rpx 0 0;
  }
  .poptitle{
    line-height: 47rpx;
    font-size: 30rpx;
    text-align: center;
    margin-bottom: 47rpx;
  }
  .content{
    display: flex;
		flex-flow:row wrap;
		justify-content: space-between;

    .item{
      width: 220rpx;
      height: 75rpx;
      margin-bottom: 15rpx;
      font-size: 23rpx;
      border: 1rpx solid #f4f4f4;
      border-radius: 12rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .content:after {
		content: "";
		width: 32%;
	}

  .btn{
    width: 100%;
    height: 90rpx;
    border-radius: 13rpx;
    font-size: 28rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffb7c5;
    margin-top: 20rpx;
    color: #ffffff;
  }
  .scroll-Y{
    height: 100%;
    ::-webkit-scrollbar {
      display: none;
    }

    /* 对于Firefox */
   scrollbar-width: none; /* Firefox 64+ */
  }

  .reason{
    line-height: 34rpx;
    font-size: 23rpx;
    color: #686868;
  }
  .reason-cont{
    line-height: 43rpx;
    margin-top: 15rpx;
    font-size: 26rpx;
    text{
      font-size: 23rpx;
      float: right;
      color: #ed345f;
    }
  }
  .tips{
    margin-top: 28rpx;
    font-size: 23rpx;
    color: #686868;
    text{
      font-size: 22rpx;
      color: #adadad;
      margin-left: 18rpx;
    }
  }
  .reason-input{
    width: 100%;
    height: 156rpx;
    background: #f8f8f8;
    border-radius: 12rpx;
    margin-top: 17rpx;
    textarea{
      padding: 23rpx 26rpx;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      font-size: 22rpx;
    }
  }
  .reason-image{
    display: flex;
		flex-flow:row wrap;
		justify-content: flex-start;
    margin-top: 50rpx;  
  }
  .reason-item{
      width: 128rpx;
      height: 128rpx;
      border-radius: 16rpx;
      background: #f8f8f8;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12rpx;
      image{
        width: 128rpx;
        height: 128rpx;
        border-radius: 16rpx;
        
      }
    }
  .bottom-btn{
    display: flex;
		flex-flow:row wrap;
		justify-content: space-between;
    margin-top: 18rpx;
    view{
      width: 337rpx;
      height: 73rpx;
      border: 2rpx solid #f3f3f3;
      font-size: 24rpx;
      border-radius: 16rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
