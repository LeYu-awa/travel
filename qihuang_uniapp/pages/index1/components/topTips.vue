<template>
	<view>
    <view class="cont">
      <view 
      :class="index==3?'item':'item active'"
      v-for="(item,index) in tablist" 
      :key="index"
      >{{ item.name }}</view>
    </view>
	</view>
</template>
<script>
	export default {
		name: 'topCom',
		props: { 
			
		},
		data() {
      return {
				tablist:[
          { name: '岐黄正脉' },
          { name: '古法今承' },
          { name: '守正固元' },
          { name: '道地循经' }
        ]
			};
		},
		created() {},
		methods: {
      
		}
	}
</script>

<style scoped lang="scss">
	.cont{
    padding:0 10rpx;
    box-sizing: border-box;
    margin-top: 20rpx;
    display: flex;
		flex-flow:row wrap;
		justify-content: space-between;
    .item{
      width: 146rpx;
      height: 55rpx;
      line-height: 55rpx;
      text-align: center;
      padding-right: 20rpx;
      position: relative;
      font-size: 22rpx;
    }
    .active::after{
      content: '';
      width: 2rpx;
      height: 20rpx;
      background: #999999;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(0,-50%);
    }
  }
</style>
