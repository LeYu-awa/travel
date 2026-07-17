<template>
	<view class="page">
		<Header :title="details.name">
			<template #rightIcon>
				<view class="flex">
					<view @click="$goNextPage('./search')" class="new-iconfont icon-sousuo"></view>
					<!-- <view class="new-iconfont icon-shanchu"></view> -->
				</view>
			</template>
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
		<Footer :title="details.name" :mp3Url="details.audio_url" :id="id" :type="type" @change="changeFooter" :isRead="false" @changeScroll="change"
			:catalogue="getCatalogue" />
	</view>
</template>

<script>
import customTab from "@/components/customTab";
import Tab from "@/components/tab";
import Header from "@/components/header.vue"
import Footer from "./components/footer.vue"
import Mp3 from "./components/mp3.vue"
import {
	base64ToPath
} from "@/uni_modules/sp-html2canvas-render/utils/index.js";

import {
	foodDetail,
	doctorDetail,
	termDetail,
	dongPointDetail,
	medicinalDietDetail,
	toggleCollection,
	isCollected
} from "@/api/encyclopedia.js";
import { computed } from "vue";
export default {
	components: {
		Header,
		customTab,
		Tab,
		Mp3,
		Footer
	},
	data() {
		return {
			id: '',
			scrollTop: 0,
			click: false,
			details: {},
			contentList: [],
			foodList: [{
				label: '',
				type: 'image',
				key: 'image'
			},
			{
				label: '科属与学名',
				type: 'text',
				key: 'family'
			}, {
				label: '别名与产地',
				type: 'text',
				key: 'alias_origin'
			}, {
				label: '性味与归经',
				type: 'text',
				key: 'property_meridian'
			}, {
				label: '功效',
				type: 'text',
				key: 'effect'
			}, {
				label: '临床应用',
				type: 'text',
				key: 'clinical'
			}, {
				label: '成分与营养',
				type: 'text',
				key: 'ingredient_nutrition'
			}, {
				label: '文献摘要',
				type: 'text',
				key: 'literature'
			}, {
				label: '按语',
				type: 'text',
				key: 'comment'
			}, {
				label: '附录',
				type: 'text',
				key: 'appendix'
			}, {
				label: '详细描述',
				type: 'text',
				key: 'description'
			}, {
				label: '药性',
				type: 'text',
				key: 'property'
			}, {
				label: '适宜人群',
				type: 'text',
				key: 'suitable_people'
			}, {
				label: '禁忌人群',
				type: 'text',
				key: 'taboo_people'
			}, {
				label: '使用注意',
				type: 'text',
				key: 'usage_attention'
			}, {
				label: '古籍摘要',
				type: 'text',
				key: 'ancient_literature'
			}, {
				label: '现代研究',
				type: 'text',
				key: 'modern_research'
			},
			],
			dongList: [{
				label: '定位图',
				type: 'image',
				key: 'location_image'
			},
			{
				label: '取穴视频',
				type: 'video',
				key: 'locate_video'
			},
			{
				label: '部位',
				type: 'text',
				key: 'position'
			},
			{
				label: '解刨',
				type: 'text',
				key: 'anatomy'
			},
			{
				label: '主治',
				type: 'text',
				key: 'indication'
			},
			{
				label: '取穴',
				type: 'text',
				key: 'locate_video_desc'
			},
			{
				label: '操作',
				type: 'text',
				key: 'operation'
			},
			{
				label: '取穴方法',
				type: 'text',
				key: 'location'
			},
			// {
			// 	label: '经验',
			// 	type: 'text',
			// 	key: ''
			// },
			{
				label: '说明',
				type: 'text',
				key: 'summary'
			}
			],
			termList: [{
				label: '姓名',
				type: 'text',
				key: 'name'
			}, {
				label: '类别',
				type: 'text',
				key: 'category'
			}, {
				label: '概念',
				type: 'text',
				key: 'concept'
			}, {
				label: '解读',
				type: 'text',
				key: 'explanation'
			}, {
				label: '应用领域',
				type: 'text',
				key: 'application'
			}, {
				label: '参考文献',
				type: 'text',
				key: 'reference'
			}, {
				label: '描述',
				type: 'text',
				key: 'description'
			},],
			doctorList: [{
				label: '',
				type: 'image',
				key: 'avatar'
			},
			{
				label: '姓名',
				type: 'text',
				key: 'name'
			},
			{
				label: '字/别名',
				type: 'text',
				key: 'alias'
			},
			{
				label: '所在朝代',
				type: 'text',
				key: 'dynasty'
			},
			{
				label: '出生地',
				type: 'text',
				key: 'birthplace'
			},
			{
				label: '代表作',
				type: 'text',
				key: 'representative'
			},
			{
				label: '擅长',
				type: 'text',
				key: 'specialty'
			},
			{
				label: '人物简介',
				type: 'text',
				key: 'profile'
			},
			{
				label: '主要经历',
				type: 'text',
				key: 'experience'
			},
			{
				label: '学术内容',
				type: 'text',
				key: 'academic'
			},
			{
				label: '临床应用',
				type: 'text',
				key: 'clinical'
			},
			{
				label: '轶事典故',
				type: 'text',
				key: 'anecdote'
			},
			{
				label: '后世影响',
				type: 'text',
				key: 'influence'
			},

			],
			medicinalDietList: [{
				label: '',
				type: 'image',
				key: 'image'
			}, {
				label: '名称',
				type: 'text',
				key: 'name'
			}, {
				label: '来源',
				type: 'text',
				key: 'source'
			}, {
				label: '功效描述',
				type: 'text',
				key: 'effect'
			}, {
				label: '配方',
				type: 'text',
				key: 'formula'
			}, {
				label: '适宜人群',
				type: 'text',
				key: 'suitable_people'
			}, {
				label: '食用方法',
				type: 'text',
				key: 'usage'
			}, {
				label: '相关配伍',
				type: 'text',
				key: 'compatibility'
			}, {
				label: '药膳功效',
				type: 'text',
				key: 'efficacy_names'
			}, {
				label: '详细描述',
				type: 'text',
				key: 'description'
			},],
		};
	},
	onShow() { },
	onLoad(e) {
		this.id = e.id
		this.type = e.type
		this.contentList = this[this.type + 'List']
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
	computed: {
		getCatalogue() {
			return this.contentList.filter(v => {
				return this.details[v.key] && v.label ? v : ''
			})
		}
	},
	methods: {
		change(index, item) {

			this.click = true
			uni.createSelectorQuery().select(`#${item.key}`).boundingClientRect((rect) => {
				if (rect) {
					uni.pageScrollTo({
						scrollTop: rect.top - 36 + this.scrollTop,
						duration: 300
					});
					this.tabKey = index;
					setTimeout(() => {

						this.click = false
					}, 500);
				}
			}).exec();
		},
		changeFooter(e) {
			switch (e) {
				case 'share': // 分享
					this.cusRenderDom()
					break;
			}
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
		async getDetails() {
			switch (this.type) {
				case 'food': // 药食材
					let food = await foodDetail({
						id: this.id
					})
					this.details = food.data
					break;
				case 'doctor': // 医家
					let doctor = await doctorDetail({
						id: this.id
					})
					this.details = doctor.data
					break;
				case 'dong': // 董氏详情
					let dong = await dongPointDetail({
						id: this.id
					})
					this.details = dong.data
					break;
				case 'term': // 术语
					let term = await termDetail({
						id: this.id
					})
					this.details = term.data
					break;
				case 'medicinalDiet': // 药膳
					let medicinalDiet = await medicinalDietDetail({
						id: this.id
					})
					this.details = medicinalDiet.data
					break;
			}
			uni.setNavigationBarTitle({
				title: this.details.name || ''
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