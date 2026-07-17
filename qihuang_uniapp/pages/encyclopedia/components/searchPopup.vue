<template>
    <view class="mask-popup" v-show="show" @click="close">
        <view class="mask-content" @click.stop>
            <view class="title">
                筛选
                <text class="iconfont icon-cuo" @click.stop="close"></text>
            </view>
			<scroll-view scroll-y="true" >
				<view class="block" v-for="item in 5">
					<view class="title">
						<view class="flex end">
							<view class="border"></view>
							<text>搜索历史</text>
						</view>
					</view>
					<view class="content">
						<view class="item" v-for="item in 5">
							哈哈哈
						</view>
					</view>
				</view>
			</scroll-view>
            

            <view class="bottom-footer">
                <view class="btn reset">
                    <text class="iconfont icon-right"></text>
					重置
                </view>
                <view class="btn">
                    <text class="iconfont  icon-right"></text>
                    查看 400 个穴位
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
	z-index: 1000;
    .mask-content{
        background: #fff;
        padding: 30rpx 0 0;
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
            .iconfont{
                position: absolute;
                right: 0;
                top: 0rpx;
                font-size: 50rpx;
                color: #bbb;
            }
        }

        .block{
			padding: 30rpx 30rpx 0;
        	.title{
        		display: flex;
        		justify-content: space-between;
				padding: 0;
        		.end{
        			align-items: end;
        			position: relative;
        			left: 0;
        			.border{
        				width: 20rpx;
        				height: 20rpx;
        				background-color: var(--main-color);
        				position: absolute;
        				z-index: 0;
        			}
        			text{
        				position: relative;
        				margin-left: 10rpx;
        			}
        		}
        		
        	}
        	
        	.content{
        		display: flex;
        		flex-wrap: wrap;
        		.item{
        			min-width: 110rpx;
        			margin-right: 20rpx;
        			border-radius: 10rpx;
        			margin-top: 20rpx;
        			height: 60rpx;
        			display: flex;
        			align-items: center;
        			justify-content: center;
        			background-color: #eee;
        			font-size: 26rpx;
        		}
        		&.hot{
        			.item{
        				background-color: var(--main-tag-bg-color);
        				color: var(--main-color);
        			}
        		}
        	}
        }
        

        .bottom-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
        	padding-top: 30rpx;
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
                width: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
				.iconfont{
					margin-right: 10rpx
					;
				}
				&.reset{
					background-color: #55311B;
				}
            }
        }
    }
}
</style>