<template>
    <div class="dong-content">
        <view class="right">
            <scroll-view :scroll-x="true" :show-scrollbar="false">
                <view class="top-tags">
                    <view class="item" :class="scrollCategoryKey == index ? 'select' : ''"
                        @click="changeTag(index, item)" v-for="item, index in Category" :key="item.id">
                        {{ item.name }}
                    </view>
                </view>
            </scroll-view>
            <scroll-view :scroll-y="true" :scroll-top="scrollCategory" :show-scrollbar="false" @scroll="scroll"
                style="height: calc(100% - 30px);">
                <view class="category" v-for="item in CategoryList" :key="item.id" :id="'category' + item.category_id">
                    <!-- {{ item }} -->
                    <view class="title">
                        {{ item.category_name }}
                    </view>
                    <view class="tags">
                        <view class="item" v-for="tag in item.points" :key="tag.id" @click="goDetails(tag, 'dong')">
                            {{ tag.name }}
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </div>
</template>
<script>
import emptyPage from "@/components/emptyPage.vue"
import {
    dongCategoryList,
    dongPointGroupList,
} from "@/api/encyclopedia.js";
export default {
    components: {
        emptyPage
    },
    props: {
        topHeight: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            scrollTop: 0,
            scrollCategory: 0,
            scrollCategoryKey: 0,
            click: false,
            CategoryKey: 0,
            Category: [], // 病症 - 左边分类
            CategoryList: [], // 病症 - 分类 - 右边列表
        }
    },
    created() {
        this.getDong()
    },
    methods: {
        scroll(e) {
            this.scrollTop = e.target.scrollTop
            uni.createSelectorQuery().selectAll('.category').boundingClientRect((rects) => {
                if (rects && rects.length && !this.click) {
                    for (let i = 0; i < rects.length; i++) {
                        if (rects[i].top <= 100 && rects[i].bottom > 100) {
                            this.scrollCategoryKey = `${i}`;
                            break;
                        }
                    }


                }
            }).exec();
        },
        goDetails(item) {
            uni.navigateTo({
                url: '/pages/encyclopedias/commonDetails?type=dong&id=' + item.id
            })
        },
        changeTag(index, item) {
            this.click = true
            uni.createSelectorQuery().select(`#category${item.id}`).boundingClientRect((rect) => {
                if (rect) {
                    this.scrollCategory = rect.top - this.topHeight - 30 + this.scrollTop
                    this.scrollCategoryKey = index;
                    setTimeout(() => {

                        this.click = false
                    }, 500);
                }
            }).exec();
        },
        // 获取内容
        async getDong() {
            // let {
            //     data
            // } = await dongCategoryList()
            // this.Category = data.list
            let {
                data: {
                    list
                }
            } = await dongPointGroupList()
            let arr = []
            list.filter(v => {
                arr.push({
                    id: v.category_id,
                    name: v.category_name,
                })
            })
            this.Category = arr
            this.CategoryList = list
        },
    },
}
</script>
<style lang="scss" scoped>
.dong-content {
    height: 100%;

    .right {
        width: 100%;
        height: 100%;
        padding-top: 20rpx;
        padding-left: 20rpx;

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
            padding: 20rpx 20rpx 20rpx 0;

            .title {
                background-color: var(--main-color);
                color: #fff;
                padding: 10rpx 20rpx;
                display: flex;
                justify-content: space-between;
                align-items: center;
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