<template>
    <view class="mask-popup" v-show="show" @click="close">
        <view class="mask-content" @click.stop>
            <view class="title">
                请选择支付方式
                <text class="new-iconfont icon-cuo" @click.stop="close"></text>
            </view>
            <view class="payList">
                <radio-group >
                <view class="item" v-for="item in 2" :key="item">
                    <view class="flex">
                        <image class="pay-img" src=""/>
                        微信支付
                    </view>
                    <radio :value="item"  />
                </view>
            </radio-group>
            </view>

            <view class="bottom-footer">
                <view class="num">
                    <text>实付款：￥</text>
                    699.0
                </view>
                <view class="btn">
                    立即购买
                </view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    props:{
        show: {
            type: Boolean,
            default: false
        }
    },
    methods:{
        close(){
            this.$emit('close')
        }
    }
}
</script>
<style lang="scss" scoped>

.mask-popup{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #00000066;
    .mask-content{
        background: #fff;
        padding: 30rpx;
        position: fixed;
        bottom: 0;
        z-index: 2;
        left: 0;
        right: 0;

        .title{
            position: relative;
            text-align: center;
            padding: 20rpx 0 ;
            color: #666;
            .new-iconfont{
                position: absolute;
                right: 0;
                top: 0rpx;
                font-size: 50rpx;
                color: #bbb;
            }
        }

        .payList{
            padding-bottom: 30rpx;
            .item{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: 30rpx;
                border-bottom: 2rpx solid #eee;
                padding-top: 30rpx;
                .flex{
                    display: flex;
                    align-items: center;
                    .pay-img{
                        width: 50rpx;
                        height: 50rpx;
                        background: red;
                        margin-right: 16rpx;
                    }
                }
            }
        }

        .bottom-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
        
            .num {
                color: #C1A06B;
                font-size: 40rpx;
        
                .font666 {
                    color: #666;
                }
        
                text {
                    font-size: 28rpx;
                }
            }
        
            .btn {
                height: 80rpx;
                background-color: #C1A06B;
                color: #fff;
                width: 250rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 20rpx;
            }
        }
    }
}
</style>