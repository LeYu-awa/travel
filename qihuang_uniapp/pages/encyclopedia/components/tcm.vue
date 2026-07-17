<template>

    <view class="other-content">
        <view class="topList">
            <view class="item" v-for="item, index in topList" :key="index" @click="goNextPage(item)">
                <image class="border" src="@/static/images/encyclopedia/border.png"></image>
                <view class="flex">
                    {{ item.title }}
                    <image class="logo" :src="item.logo"></image>
                </view>
            </view>
        </view>
        <view class="bottomList">
            <view class="item" v-for="item, index in bottomList" :key="index" @click="$goNextPage('/pages/encyclopedias/tcmDetail?id=' + item.id)">
                <image class="logo" :src="item.logo"></image>
                <view class="text">
                    {{ item.name }}
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { otherArticleCategoryList } from "@/api/encyclopedia"
export default {
    data() {
        return {
            topList: [{
                title: '食材',
                logo: '/static/images/encyclopedia/1.png',
                url: '/pages/encyclopedias/common?type=food1'
            },
            {
                title: '中草药',
                logo: '/static/images/encyclopedia/2.png',
                url: '/pages/encyclopedias/common?type=food2'
            },
            {
                title: '药膳',
                logo: '/static/images/encyclopedia/8.png',
                url: '/pages/encyclopedias/common?type=medicinalDiet'
            },
            {
                title: '古代医家',
                logo: '/static/images/encyclopedia/7.png',
                url: '/pages/encyclopedias/indexList?type=doctor'
            },
            {
                title: '藏书阁',
                logo: '/static/images/encyclopedia/4.png',
                url: '/pages/encyclopedias/common?type=book'
            },
            {
                title: '中医术语',
                logo: '/static/images/encyclopedia/6.png',
                url: '/pages/encyclopedias/indexList?type=term'
            },
                // {
                //     title: '中医基础',
                //     logo: '/static/images/encyclopedia/1.png',
                //     url: '/pages/encyclopedias/common'
                // },
                // {
                //     title: '针灸歌赋',
                //     logo: '/static/images/encyclopedia/1.png',
                //     url: '/pages/encyclopedias/songfu'
                // },
            ],
            bottomList: [
                // {
                //     title: '五运六气',
                //     logo: '/static/images/encyclopedia/1.png',
                //     url: '/pages/encyclopedias/common'
                // },
                // {
                //     title: '毫针刺法',
                //     logo: '/static/images/encyclopedia/1.png',
                //     url: '/pages/encyclopedias/common'
                // },
                // {
                //     title: '归经',
                //     logo: '/static/images/encyclopedia/1.png',
                //     url: '/pages/encyclopedias/common'
                // },
                // {
                //     title: '中医基础理论',
                //     logo: '/static/images/encyclopedia/1.png',
                //     url: '/pages/encyclopedias/common'
                // },
                // {
                //     title: '穴位由来',
                //     logo: '/static/images/encyclopedia/1.png',
                //     url: '/pages/encyclopedias/common'
                // },
                // {
                //     title: '中医诊断方法',
                //     logo: '/static/images/encyclopedia/1.png',
                //     url: '/pages/encyclopedias/common'
                // },
                // {
                //     title: '五运六气',
                //     logo: '/static/images/encyclopedia/1.png',
                //     url: '/pages/encyclopedias/common'
                // },
                // {
                //     title: '五运六气',
                //     logo: '/static/images/encyclopedia/1.png',
                //     url: '/pages/encyclopedias/common'
                // },
                // {
                //     title: '五运六气',
                //     logo: '/static/images/encyclopedia/1.png',
                //     url: '/pages/encyclopedias/common'
                // },
            ],
        }
    },
    created() {
        this.getotherArticleCategoryList()
    },
    methods: {
        async getotherArticleCategoryList() {
            let { data } = await otherArticleCategoryList()
            // console.log(data)
            this.bottomList = data
        },
        goNextPage(item) {
            uni.navigateTo({
                url: item.url
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.other-content {
    padding: 30rpx;

    .topList {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .item {
            // border: 6rpx solid var(--main-color);
            width: calc(50% - 15rpx);
            padding: 0 30rpx;
            margin-bottom: 30rpx;
            border-radius: 20rpx;
            position: relative;

            .border {
                width: 100%;
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                height: 172rpx;
            }

            .flex {
                height: 172rpx;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .logo {
                width: 100rpx;
                height: 100rpx;
            }
        }
    }

    .bottomList {
        display: flex;
        align-items: center;
        // justify-content: space-between;
        flex-wrap: wrap;

        .item {
            text-align: center;
            width: calc(33% - 30rpx);
            margin-bottom: 30rpx;
            margin-right: 30rpx;

            .logo {
                width: 150rpx;
                height: 150rpx;
            }
        }
    }
}
</style>