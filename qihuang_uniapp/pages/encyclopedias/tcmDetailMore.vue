<template>
    <view class="page">
        <view class="title">
            <view class="border"></view>{{ details.name }}
        </view>
        <rich-text v-if="details.content" :nodes="details.content" @itemclick="handleRichTextClick" />
        
		<emptyPage v-else title="暂无内容" />
    </view>
</template>
<script>

import emptyPage from "@/components/emptyPage.vue"
import { otherArticleDetail } from "@/api/encyclopedia"
export default {
    components: {
        emptyPage
    },
    data() {
        return {
            text: '',
            details: {}
        }
    },
    onLoad(e) {
        this.text = e.text
        this.getDetails()
    },
    methods: {
        async getDetails() {
            let { data } = await otherArticleDetail({ name: this.text })
            this.details = data
            uni.setNavigationBarTitle({
                title: this.details.name || ''
            })
        },
        handleRichTextClick(e) {
            let data = e.detail.node
            if (data.name == 'a') {
                uni.navigateTo({
                    url: './tcmDetailMore?text=' + data.attrs.href
                })
            }

        },
    },
}

</script>
<style lang="scss" scoped>
.page {
    padding: 30rpx;

    .title {
        display: flex;
        align-items: center;
        color: #000;
        font-size: 32rpx;
        font-weight: 700;
        padding: 30rpx 0;

        .border {
            background-color: var(--main-color);
            width: 20rpx;
            height: 20rpx;
            margin-right: 10rpx;
        }
    }
}
</style>