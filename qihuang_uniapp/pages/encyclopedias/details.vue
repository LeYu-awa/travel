<template>
	<view class="page">
		<Header title="手太阴肺经">
			<template #rightIcon>
				<view class="flex">
					<view @click="$goNextPage('./search')" class="new-iconfont icon-sousuo"></view>
					<!-- <view class="new-iconfont icon-shanchu"></view> -->
				</view>
			</template>
			<Tab :tablist="detailsList" @change="change" :tabKey="tabKey" />
		</Header>
		<view class="content">
			<view class="block" id="render-dom">
				<template v-for="val in detailsList">
					<template v-for="item in val.arr">
						<view class="item section" v-if="details.detail[item.key] && tabKey == item.pid" :id="item.key">
							<view class="title">{{ item.label }}<text v-if="details.detail[item.url]"
								@click="$goNextPage('./historyDetails?id=' + details.id + '&type=' + item.url)">历代{{
								item.label }} <text 
										class="new-iconfont icon-right"></text></text>
							</view>
							<view class="content-item">
								<image v-if="item.type == 'image'" mode="widthFix" style="width: 100%;"
									:src="details.detail[item.key]" />
								<video v-else-if="item.type == 'video'" class="video" id="myVideo"
									:src="details.detail[item.key]" :autoplay="true" show-mute-btn></video>
								<rich-text v-else class="text" :nodes="details.detail[item.key]">
								</rich-text>
							</view>
						</view>
					</template>
				</template>
			</view>
			<view class="btns">
				<view @click="changeBtn('upper')" class="btn upper" v-if="tabKey != 'overview'">
					上一节：{{ getText('upper') }}
				</view>
				<view @click="changeBtn('next')" class="btn next" v-if="tabKey != 'more'">
					下一节：{{ getText('next') }}
				</view>
			</view>
			<view class="tips">
				知源经络穴位内容仅供中医科普使用，不能作为诊断治疗依据，具体请遵医嘱。<text>数据来源说明</text>
			</view>
		</view>
		<sp-html2canvas-render domId="render-dom" ref="renderRef" @renderOver="renderOver"></sp-html2canvas-render>
		<Footer :title="details.name" :mp3Url="details.detail ? details.detail.audio_url : ''" :id="id" type="acupoint" @change="changeFooter"
			:isRead="false" @changeScroll="change" :moreCatalogue="detailsList" />
	</view>
</template>

<script>
import customTab from "@/components/customTab";
import Tab from "@/components/tab";
import Header from "@/components/header.vue"
import Footer from "./components/footer.vue"
import {
	base64ToPath
} from "@/uni_modules/sp-html2canvas-render/utils/index.js";
import {
	acupointDetail
} from "@/api/encyclopedia.js";
export default {
	components: {
		Header,
		customTab,
		Tab,
		Footer
	},
	data() {
		return {
			type: '',
			id: '',
			details: {},
			detailsList: [],
			tabKey: 'overview',
			tablist: [{
				name: '概述',
				key: 'overview',
				arr: [{
					label: '主治',
					key: 'indication',
					type: 'text',
					pid: 'overview',
					url: 'history_indication'
				},
				{
					label: '定位',
					key: 'location',
					type: 'text',
					pid: 'overview',
					url: 'history_location'
				},
				{
					label: '取穴视频',
					key: 'locate_video',
					type: 'video',
					pid: 'overview'
				},
				// {label: '取穴视频说明', key: 'locate_video_desc', type: 'text', pid: 'overview'},
				{
					label: '更多取法',
					key: 'more_location',
					type: 'text',
					pid: 'overview'
				},
				{
					label: '穴点解',
					key: 'acupoint_name_explain',
					type: 'text',
					pid: 'overview'
				},
				],
			}, {
				name: '操作',
				key: 'operate',
				arr: [{
					label: '针灸',
					key: 'acupuncture',
					type: 'text',
					pid: 'operate'
				},
				{
					label: '针刺演示（真人）',
					key: 'acupuncture_demo',
					type: 'text',
					pid: 'operate'
				},
				{
					label: '进针动画',
					key: 'acupuncture_animation',
					type: 'text',
					pid: 'operate'
				},
				{
					label: '配伍',
					key: 'compatibility',
					type: 'text',
					pid: 'operate'
				},
				{
					label: '艾灸',
					key: 'moxibustion',
					type: 'text',
					pid: 'operate'
				},
				// {label: '历代针灸', key: '', type: 'text', pid: 'overview'},
				{
					label: '推拿按摩',
					key: 'massage',
					type: 'text',
					pid: 'operate'
				},
				]
			}, {
				name: '讲解',
				key: 'explain',
				arr: [{
					label: '名家视频讲解',
					key: 'locate_video_desc',
					type: 'text',
					pid: 'explain'
				},]
			}, {
				name: '解剖',
				key: 'anatomy',
				arr: [{
					label: '3D位置',
					key: 'position_3d',
					type: 'text',
					pid: 'anatomy'
				},
				{
					label: '解剖图',
					key: 'anatomy_image',
					type: 'text',
					pid: 'anatomy'
				},
				{
					label: '针刺层次',
					key: 'acupuncture_layer',
					type: 'text',
					pid: 'anatomy'
				},
				// {label: '肌肉', key: '', type: 'text', pid: 'overview'},
				{
					label: '血管',
					key: 'vessel',
					type: 'text',
					pid: 'anatomy'
				},
				{
					label: '神经',
					key: 'nerve',
					type: 'text',
					pid: 'anatomy'
				},
				]
			}, {
				name: '更多',
				key: 'more',
				arr: [{
					label: '更多内容',
					key: 'more',
					type: 'text',
					pid: 'more'
				},]
			},],
		};
	},
	onShow() { },
	computed: {
		// getContentList() {
		// 	let arr = []
		// 	this.dataList.filter(v=>{
		// 		if(){}
		// 	})
		// 	return this.contentList.filter((item) => { return this.details[item.key] ? item : '' })
		// },
	},
	onLoad(e) {
		this.id = e.id
		this.type = e.type
		this.init()
	},
	methods: {
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
		getText(type) {
			let title
			this.tablist.filter((v, i) => {
				if (v.key == this.tabKey) {
					if (i == 0) {
						if (type == 'next') {
							title = this.tablist[i + 1].name
						}
					} else if (i == this.tablist.length - 1) {
						if (type == 'upper') {
							title = this.tablist[i - 1].name
						}
					} else {
						if (type == 'next') {
							title = this.tablist[i + 1].name
						} else {
							title = this.tablist[i - 1].name
						}
					}
				}

			})
			return title
		},
		changeBtn(type) {
			let key
			this.tablist.filter((v, i) => {
				if (v.key == this.tabKey) {
					if (i == 0) {
						if (type == 'next') {
							key = this.tablist[i + 1].key
						}
					} else if (i == this.tablist.length - 1) {
						if (type == 'upper') {
							key = this.tablist[i - 1].key
						}
					} else {
						if (type == 'next') {
							key = this.tablist[i + 1].key
						} else {
							key = this.tablist[i - 1].key
						}
					}
				}
			})
			this.tabKey = key
		},
		async init() {
			let {
				data
			} = await acupointDetail({
				id: this.id
			})
			this.details = data
			uni.setNavigationBarTitle({
				title: this.details.name || ''
			})
			let arr = []
			this.tablist.filter(v => {
				let flag = false

				let cArr = []
				v.arr.filter(j => {
					if (this.details.detail[j.key]) {
						cArr.push(j)
						flag = true
					}
				})
				if (flag) {
					arr.push({
						...v, arr: cArr
					})
				}
			})
			this.detailsList = arr
		},
		goNextPage(item) {
			// uni
		},
		change(index, item) {
			this.tabKey = item.key;
			uni.createSelectorQuery().select(`#${item.key}`).boundingClientRect((rect) => {
				console.log(rect)
				if (rect) {
					uni.pageScrollTo({
						scrollTop: rect.top - 96 + this.scrollTop,
						duration: 300
					});
					this.tabKey = item.pid;
				}
			}).exec();
		},
	}
}
</script>
<style scoped lang="scss">
.content {
	min-height: 90vh;
	// height: 200vh;

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
			display: flex;
			justify-content: space-between;
			align-items: center;

			text {
				color: var(--main-color);
				font-size: 28rpx;
			}
		}
	}





	.btns {
		display: flex;
		justify-content: space-around;
		padding-top: 30rpx;

		.btn {
			width: 300rpx;
			background-color: var(--main-color);
			color: #fff;
			height: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 20rpx;
			border: 2rpx solid var(--main-color);

			&.upper {
				background-color: #fff;
				color: var(--main-color);
			}
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
}

.new-iconfont {
	font-size: 42rpx;
}
</style>