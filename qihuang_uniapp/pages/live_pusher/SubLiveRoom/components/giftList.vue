<!-- 弹幕 -->
<template>
	<view>
    <view class="content">
		
      <view class="list"  v-for="(item,index) in listData" :class="item.type" :style="item.style" :key="index">
        <view class="list-image"><image src=""></image></view>
        <view class="list-content">
          <view class="list-name">{{item.nickname}}</view>
          <view class="list-text">送{{item.name}}</view>
        </view>
        <view class="list-icon"><image :src="item.image"></image></view>
        <view class="list-number"><text>X</text>1</view>
      </view>
    </view>
  </view>
</template>
<script>
	export default {
  name: 'giftList',
  props: {
			//rightToLeft leftToRight leftBottom
			type: {
				type: String,
				default: 'rightToLeft'
			},
			list: {
				type: Array,
				default () {
					return []
				}
			},
			minTime: {
				type: Number,
				default: 4
			},
			maxTime: {
				type: Number,
				default: 9
			},
			minTop: {
				type: Number,
				default: 0
			},
			maxTop: {
				type: Number,
				default: 60
			},
			hrackH: { //轨道高度
				type: Number,
				default: 40
			}
		},
		data() {
		  return {
			listData: []
		};
    },
    mounted() {
			//leftBottom 使用参数
			if (this.type === 'leftBottom') {
				this.hrackNum = Math.floor(this.maxTop / this.hrackH);
			}
		},
    methods: {
			add(obj) {
				let data = {
					nickname: obj.nickname,
					image:obj.image,
					name:obj.name,
					id:Date.parse(new Date()),
					time: Math.ceil(Math.floor(Math.random() * (this.maxTime - this.minTime + 1) + this.minTime)),
					type: this.type
				}
        let objData = {
          nickname: data.nickname,
		  image:data.image,
		  name:data.name,
          type: 'leftBottomEnter',
          style: {
            transition: `all 0.5s`,
            animationDuration: `0.5s`,
            transform: `translateX(0%)`,
            top: `${this.minTop}px`
          }
        }
        this.listData.push(objData);
        // 根据数组长度调整数据
        if (this.listData.length >= 2) {
          // 删除第一条数据
          this.listData.shift();
        } 
		console.log(this.listData,'---this.listData--')
		// else if (this.listData.length > 2) {
  //         // 隐藏一条数据（这里我们通过添加一个样式类来实现隐藏）
  //         this.listData[this.listData.length - 1].style.display = 'none';
  //       }
        // let listLen = this.listData.length;
        // let hrackNum = this.hrackNum;
        // for (let i in this.listData) {
        //   if(this.listData[i].status === 'reuse'){ //重用
        //     this.$set(this.listData,i,objData);
        //   }else if(this.listData[i].status === 'reset'){ //重置
        //     this.listData[i].style.transition = 'none';
        //     this.listData[i].style.bottom = 0;
        //     this.listData[i].status = 'reuse';
        //   }else if(this.listData[i].status === 'recycle'){ //回收
        //     this.listData[i].type = 'leftBottomExit';
        //     this.listData[i].status = 'reset';
        //   }else{
        //     this.listData[i].style.bottom = parseInt(this.listData[i].style.bottom) + this.hrackH + 'px';
        //   }
        //   if(parseInt(this.listData[i].style.bottom) >= (this.maxTop - this.hrackH) && this.listData[i].status !== 'reset'){ //需要回收
        //     this.listData[i].status = 'recycle';
        //   }
        // }
        // if(listLen < hrackNum + 2){
        //   this.listData.push(objData);
        // }
			},
			repaint(index, type) {
				setTimeout(() => {
					this.listData[index].type = type;
				}, 100)
			}
		}
}
</script>

<style scoped lang="scss">
@keyframes leftBottomEnter {
		0% {
			transform: translateY(100%);
			opacity: 0;
		}

		100% {
			transform: translateY(0%);
			opacity: 1;
		}
	}

	@keyframes leftBottomExit {
		0% {
			transform: translateY(0%);
			opacity: 1;
		}
		
		100% {
			transform: translateY(-200%);
			opacity: 0;
		}
	}
.content{
  width: 100%;
  height: 200rpx;
  padding: 0 26rpx;
  box-sizing: border-box;
  position: relative;
  .list{
    position: absolute;
    left: 0;
    width: 508rpx;
    height: 92rpx;
    padding: 9rpx 14rpx;
    box-sizing: border-box;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    border-radius: 48rpx;
    transform: translateX(100%);
		animation-timing-function: linear;
    margin-bottom: 20rpx;
		&.leftBottomEnter {
			animation-name: leftBottomEnter;
		}
		&.leftBottomExit{
			animation-name: leftBottomExit;
			animation-fill-mode: forwards;
		}
    .list-image{
      width: 76rpx;
      height: 76rpx;
      margin-right: 10rpx;
      image{
        width: 76rpx;
        height: 76rpx;
        border-radius: 50%;
      }
    }
    .list-content{
      width: 250rpx;
      .list-name{
        line-height: 42rpx;
        font-size: 25rpx;
        color: #59aaa0;
      }
      .list-text{
        line-height: 36rpx;
        font-size: 22rpx;
        color: #b3aeaf;
      }
    }
    .list-icon{
      image{
        width: 77rpx;
        height: 77rpx;
      }
    }
    .list-number{
      font-size: 50rpx;
      font-weight: bold;
      color: #ffffff;
      line-height: 77rpx;
      margin-left: 18rpx;
      text{
        line-height: 22rpx;
        font-size: 28rpx;
        margin-right: 5rpx;
      }
    }
  }
}
</style>
