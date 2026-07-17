<template>
    <view class="page">
        <rich-text :nodes="details.detail[type]">
        </rich-text>
    </view>
   
</template>
<script>
import {
    acupointDetail
} from "@/api/encyclopedia.js";
export default {
    data() {
        return {
            details: {},
            type: '',
        }
    },
    async onLoad(e) {
        this.type = e.type
        let {
            data
        } = await acupointDetail({
            id: e.id
        })
        this.details = data

        uni.setNavigationBarTitle({
            title: this.details.name || ''
        })
    }
}
</script>
<style lang="scss" scoped>
.page{
    padding: 30rpx;
}
</style>