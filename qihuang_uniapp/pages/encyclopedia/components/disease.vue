<template>
    <div class="content">
        <view class="left">
            <view class="item" @click="selectDiseaseCategory(item, index)" :class="CategoryKey == index ? 'select' : ''"
                v-for="(item, index) in Category" :key="index">
                {{ item.name }}
            </view>
        </view>
        <view class="right">
            <view class="category" v-if="CategoryList.length">
                <view class="tags">
                    <view class="item" v-for="item, index in CategoryList" :key="index" @click="goDetails(item)">
                        {{ item.name }}
                    </view>
                </view>
            </view>

            <emptyPage v-else title="暂无历史记录" />
        </view>
    </div>
</template>
<script>
import emptyPage from "@/components/emptyPage.vue"
import {
    diseaseListByCategory,
    diseaseCategoryList,
} from "@/api/encyclopedia.js";
export default {
    components: {
        emptyPage
    },
    data() {
        return {
            CategoryKey: 0,
            Category: [], // 病症 - 左边分类
            CategoryList: [], // 病症 - 分类 - 右边列表
        }
    },
    created() {
        this.getDisease()
    },
    methods: {
        async selectDiseaseCategory(item, index) {
            this.CategoryKey = index
            let {
                data: {
                    list
                }
            } = await diseaseListByCategory({
                category_id: item.id
            })
            this.CategoryList = list
        },
        goDetails(item) {
            uni.navigateTo({
                url: '/pages/encyclopedias/diseaseDetails?id=' + item.id
            })
        },
        // 获取病症内容
        async getDisease() {
            let {
                data
            } = await diseaseCategoryList()
            this.Category = data.list
            let {
                data: {
                    list
                }
            } = await diseaseListByCategory({
                category_id: this.Category[0].id
            })
            this.CategoryList = list
        },
    },
}
</script>
<style lang="scss" scoped>
.content {
    display: flex;
    height: 100%;

    .left {
        background-color: #EFE9DD;
        width: 200rpx;
        height: 100%;

        .item {
            padding: 20rpx;
            border-left: 6rpx solid #EFE9DD;

            &.select {
                background-color: #fff;
                color: var(--main-color);
                border-color: var(--main-color);
            }
        }
    }

    .right {
        width: calc(100% - 200rpx);
        padding-top: 20rpx;
        padding-left: 20rpx;
        height: 100%;
        overflow-y: auto;

        .top-tags {
            display: flex;


            .item {
                background-color: #eee;
                color: #999;
                padding: 10rpx 20rpx;
                border-radius: 10rpx;
                white-space: nowrap;
                margin-right: 20rpx;

                &.select {
                    background-color: var(--main-bg-color);
                    color: var(--main-color);
                }
            }
        }

        .category {

            padding-right: 20rpx;

            .title {
                background-color: var(--main-color);
                color: #fff;
                padding: 10rpx 20rpx;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 20rpx;
            }

            .tags {
                background-color: #FAFAFA;
                padding: 20rpx;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;

                .item {
                    min-width: 30%;
                    border: 2rpx solid #eee;
                    text-align: center;
                    height: 60rpx;
                    line-height: 60rpx;
                    margin-bottom: 16rpx;
                    border-radius: 10rpx;
                    background-color: #fff;
                }
            }
        }
    }
}
</style>