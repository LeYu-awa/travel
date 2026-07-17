<template>
	<uni-popup ref="costShow" type="bottom" @change="close">
		<view class="popUp">
		 <view class="keyboard-popup" @touchmove.prevent :style="{'bottom':bottom+'rpx'}"> 
		 	<view class="keyboard-popup_input">
		 		<textarea placeholder="说点什么" focus auto-height :adjust-position="false" auto-blur v-model="value"></textarea>
		 	</view>
		 	<view 
			class="keyboard-popup_send" 
			@click="sendChat" 
			:style="{'background-color':value?'#fd502f':'rgba(253,80,47,0.6)'}"
			>发送</view>
		 </view>
		</view>
  </uni-popup>
</template>
<script>
import { string } from '../../../../plugin/clipboard/clipboard';
import {  sendChat } from '@/api/liveBroadcast.js';  
export default {
	name: 'sendMessage',
	props: { 
		show: {
			type: Boolean,
			default: false,
		},
		roomId:{
			type: String,
			default: false,
		}
	},
	data() {
		return {
      value: '',
      bottom:0
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
      uni.onKeyboardHeightChange((res) => {
					console.log('键盘高度:', res.height); // 键盘弹起或收起时触发
          if (res.height) {
            this.bottom = (res.height*2) - 25
          } else {
            this.bottom = 0
          }
				});
    },
    methods: { 
      close() {
        this.$emit('close', false)
      },
      sendChat() {
        this.$emit('sendChat', this.value)
        this.$refs.costShow.close()
				this.value = ''
		  // let str={
		  // 	type:'1',
		  // 	room_id:this.roomId,
		  // 	content:this.value
		  // }
	  	// sendChat(str).then(res=>{
	  	// 	console.log(res)
			// if(res.status==200){
			// 	this.$emit('sendChat', false)
			// 	this.$refs.costShow.close()
			// 	this.value = ''
			// }else{
				
			// }
	  	// 	// this.setVideoItem(this.giftdata)
	  	// })
	  },
	}
}
</script>

<style scoped lang="scss">
	.popUp{ 
    width: 100%;
    // height: 700rpx;
    background: rgba(255, 255, 255, 0.3); /* 半透明白色背景 */
    backdrop-filter: blur(10px); /* 添加背景模糊效果 */
    -webkit-backdrop-filter: blur(10px); /* 兼容WebKit内核的浏览器，如Safari */
    // padding: 16rpx 32rpx 54rpx 32rpx;
    padding: 16rpx 0 54rpx 0;
    box-sizing: border-box;
    border-radius: 12rpx 12rpx 0 0;
  }
  .keyboard-popup {
  	width: 750rpx;
  	height: 100rpx;
  	background-color: #ffffff;
  	display: flex;
  	flex-direction: row;
  	justify-content: space-between;
  	align-items: center;
  	position: absolute;
  	bottom: 0;
  	left: 0;
  	z-index: 9999;
  }
  .keyboard-popup_input {
  	flex: 1;
  	padding: 0 30rpx;
  	height: 80rpx;
  	border: 1px solid #ccc;
  	border-radius: 50rpx;
  	color: #222222;
  	display: flex;
	align-items: center;
  }
  .keyboard-popup_input textarea {
  	width: 100%;
  	height: 100%;
  	color: #222222;
  }
  .keyboard-popup_send {
  	width: 150rpx;
  	height: 80rpx;
  	background-color: #fd502f;
  	border-radius: 35rpx;
  	margin-left: 20rpx;
  	text-align: center;
  	line-height: 80rpx;
  	font-size: 32rpx;
  	color: #ffffff;
  	display: flex;
  	flex-direction: row;
  	justify-content: center;
  	align-items: center;
  }
</style>
