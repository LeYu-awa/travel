<template>
	<view class="page">
		<Header :title="details.name">
			<template #rightIcon>
				<view class="flex">
					<view @click="$goNextPage('./search')" class="new-iconfont icon-sousuo"></view>
					<!-- <view class="new-iconfont icon-shanchu"></view> -->
				</view>
			</template>
			<view style="padding: 0 30rpx">
				<Tab :tablist="getContentList" @change="change" :tabKey="tabKey" />
			</view>
		</Header>
		<sp-html2canvas-render domId="render-dom" ref="renderRef" @renderOver="renderOver"></sp-html2canvas-render>

		<view class="">
			<view class="block" id="render-dom">
				<template v-for="item in contentList">
					<view class="item section" v-if="details[item.key]" :id="item.key">
						<view class="title">{{ item.label }}</view>
						<view class="content">
							<image v-if="item.type == 'image'" mode="widthFix" style="width: 100%;"
								:src="details[item.key]" />
							<video v-else-if="item.type == 'video'" class="video" id="myVideo" :src="details[item.key]"
								:autoplay="true" show-mute-btn></video>
							<rich-text v-else class="text" :nodes="details[item.key]">
								<!-- {{ details[item.key] }} -->
							</rich-text>
						</view>
					</view>
				</template>
			</view>
			<view class="tips">
				知源经络穴位内容仅供中医科普使用，不能作为诊断治疗依据，具体请遵医嘱。<text>数据来源说明</text>
			</view>
		</view>
		<Footer :catalogue="getContentList" :id="id" type="disease" @change="changeFooter" @changeScroll="change" :isRead="false" />

	</view>
</template>

<script>
import customTab from "@/components/customTab";
import Tab from "@/components/tab";
import Header from "@/components/header.vue"
import Footer from "./components/footer.vue"
import {
	diseaseDetail, toggleCollection, isCollected
} from "@/api/encyclopedia.js";
import {
	base64ToPath
} from "@/uni_modules/sp-html2canvas-render/utils/index.js";
export default {
	components: {
		Header,
		customTab,
		Tab,
		Footer,
	},
	computed: {
		getContentList() {
			return this.contentList.filter((item) => { return this.details[item.key] ? item : '' })
		},
	},
	data() {
		return {
			id: '',
			tabKey: 0,

			click: false,
			is_collected: false,
			scrollTop: 0,
			details: {},
			contentList: [
				{
					label: '简介',
					type: 'text',
					key: 'summary'
				},
				{
					label: '病因',
					type: 'text',
					key: 'cause'
				},
				{
					label: '诊断',
					type: 'text',
					key: 'diagnosis'
				},
				{
					label: '辩证',
					type: 'text',
					key: 'dialectics'
				},
				{
					label: '针灸',
					type: 'text',
					key: 'acupuncture'
				},
				{
					label: '按语',
					type: 'text',
					key: 'comment'
				},
				{
					label: '治疗',
					type: 'text',
					key: 'treatment'
				},
				{
					label: '预后',
					type: 'text',
					key: 'prognosis'
				},
				{
					label: '推拿',
					type: 'text',
					key: 'massage'
				},
				{
					label: '艾灸',
					type: 'text',
					key: 'moxibustion'
				},
				{
					label: '医案',
					type: 'text',
					key: 'medical_case'
				}, {
					label: '按摩',
					type: 'text',
					key: 'anmo'
				},
			]
		};
	},
	onShow() { },
	onLoad(e) {
		this.id = e.id
		this.getDetails()
	},
	// 监听页面滚动，更新当前激活的锚点
	onPageScroll(e) {
		this.scrollTop = e.scrollTop
		uni.createSelectorQuery().selectAll('.section').boundingClientRect((rects) => {
			if (rects && rects.length && !this.click) {
				for (let i = 0; i < rects.length; i++) {
					if (rects[i].top <= 100 && rects[i].bottom > 100) {
						this.tabKey = `${i}`;
						break;
					}
				}
			}
		}).exec();
	},
	methods: {
		async getisCollected() {
			let { data } = await isCollected({
				type: 'disease',
				target_id: this.id
			})
			this.is_collected = data.is_collected
		},
		changeFooter(e) {
			switch (e) {
				case 'share': // 分享
					this.cusRenderDom()
					break;
				case 'collection': // 收藏
					// this.cusRenderDom()
					this.settoggleCollection()
					break;
			}
		},
		async settoggleCollection() {
			await toggleCollection({
				type: 'disease',
				target_id: this.id
			})
			this.is_collected = !this.is_collected
		},
		cusRenderDom() {
			// 调用组件实例中h2cRenderDom方法
			this.$refs.renderRef.h2cRenderDom();
		},
		renderOver(e) {
			let that = this
			// that.image = e
			// console.log("==== renderOver :", e);
			// e为导出图片的base64
			base64ToPath(e).then((res) => {
				uni.navigateTo({
					url: './share?url=' + res + '&title=' + this.details.name
				})
			});
		},
		change(index, item) {

			this.click = true
			uni.createSelectorQuery().select(`#${item.key}`).boundingClientRect((rect) => {
				if (rect) {
					uni.pageScrollTo({
						scrollTop: rect.top - 96 + this.scrollTop,
						duration: 300
					});
					this.tabKey = index;
					setTimeout(() => {

						this.click = false
					}, 500);
				}
			}).exec();
		},
		async getDetails() {
			this.getisCollected()
			let { data } = await diseaseDetail({ id: this.id })
			this.details = data
			uni.setNavigationBarTitle({
				title: data.name || ''
			})
		},
	}
}
</script>
<style scoped lang="scss">
.new-iconfont {
	font-size: 40rpx;
	margin-left: 20rpx;
}

.block {
	background-color: #fff;
	padding: 0 30rpx 30rpx;

	.item {
		padding: 20rpx 0;
	}

	.title {
		font-size: 32rpx;
		font-weight: 700;
		padding: 10rpx 0 20rpx;
	}
}

.tips {
	padding: 30rpx;
	color: #999;
	font-size: 26rpx;

	text {
		color: var(--main-color);
	}
}
</style>