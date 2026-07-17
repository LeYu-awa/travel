<template>
	<view>
		<yz-qr style="position: absolute;top: -1000000rpx;" :text="`http://app-qh.cg24.cn?spid=${uid}`"
			:qrPath.sync="qrPath" @change="share"></yz-qr>
		<FCanvas ref="CanvasImgref" @changeImage="changeImage" :model="canvasMode" />
		<view class="popup-tips">
			<image style="width: 600rpx;height: 1000rpx;display: block;margin: auto;" show-menu-by-longpress mode="widthFix" :src="img" />
			<view class="saveQcode" @click="dowmImage(img)">
				保存邀请码
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getSystemGroupData,
	} from "@/api/user.js"
	import FCanvas from "@/components/fei-canvas/canvas-vue2.vue";
	import {
		mapGetters
	} from 'vuex';
	import {
		configMap
	} from '@/utils';
	import {
		dowmImage
	} from "@/components/fei-canvas/canvas-vue2.js";
	export default {
		components: {
			FCanvas
		},
		data() {
			return {
				dowmImage,
				pic: '',
				img: '',
				canvasMode: {},
				qrPath: '',
			};
		},
		computed: configMap({
			community_reply_status: 0
		}, mapGetters(['isLogin', 'uid'])),
		async onLoad() {
			
			uni.showLoading({
				title: '加载中'
			});
			let {
				data
			} = await getSystemGroupData()
			this.pic = data.data.pic
		},
		methods: {

			changeImage(e) {
				this.img = e;
			},
			share() {
				let that = this
				this.canvasMode = {
					width: 600,
					height: 1000,
					data: [{
							type: 'image', // 绘制图片类型
							x: 0,
							y: 0,
							width: 600,
							height: 1000,
							url: this.pic //'/static/images/share.png' // 背景图
						},
						{
							type: "text", // 绘制文本类型
							text: "邀请码",
							x: 40, // 如果对其方式是center，那么就是再308的位置开始居中展示
							y: 760,
							textAlign: "left", // 对其方式
							fontsize: 40, // 字体大小
							color: "#000",
						},
						{
							type: "text", // 绘制文本类型
							text: '【' + that.uid.toString() + '】',
							x: 20, // 如果对其方式是center，那么就是再308的位置开始居中展示
							y: 830,
							textAlign: "left", // 对其方式
							fontsize: 40, // 字体大小
							color: "#000",
						},
						{
							type: 'image', // 绘制图片类型
							x: 380,
							y: 760,
							width: 150,
							height: 150,
							url: this.qrPath // 背景图
						},
					]
				}

				setTimeout(() => {

					// < !--延迟执行 -->
					that.$refs.CanvasImgref.getCanvas();
					uni.hideLoading()
				}, 20);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-tips {
		padding-top: 30rpx;
		height: 1000rpx;
		.saveQcode {
			background: linear-gradient(180.00deg, rgba(67, 106, 188, 1), rgba(42, 55, 99, 1) 100%);
			width: 342rpx;
			height: 88rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			left: 0;
			font-size: 32rpx;
			font-weight: 700;
			right: 0;
			border-radius: 88rpx;
			// bottom: 42rpx;
			color: #fff;
			margin: 20rpx auto 0;
		}
	}
</style>