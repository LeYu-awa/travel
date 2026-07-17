<!-- 名医直播 -->
<template>
	<view class="box">
		<view class="top-image">
			<!-- <image src="/static/images/index/networkDoctor1.jpg"></image> -->
			<swiper class="swiper" circular :autoplay="true" :interval="interval" :duration="duration"
				indicator-color="rgba(255,255,255,0.6)" indicator-active-color="#fff">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image class="swiper-item" :src="item.image" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<template v-if="isSee==1">
			<view class="title">
				<view class="title-left">
					<image src="/static/images/index/hotLogo.jpg"></image>互联网医院
				</view>
				<view class="title-right">查看更多<image src="/static/images/index/right.jpg"></image>
				</view>
			</view>
			<view class="department">
				<view class="department-left">
					<image class="department-left-bj" src="/static/images/index/department.jpg"></image>
					<view class="department-left-title">按科室找</view>
					<view class="department-left-tips">覆盖97个科室</view>
					<view class="department-left-btn">
						<view>去找专家</view>
					</view>
				</view>
				<view class="department-right">
					<view class="item" v-for="(item,index) in departmentList" :key="index">
						<image :src="item.image"></image>
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="disease">
				<view class="disease-left">
					<image class="disease-left-bj" src="/static/images/index/disease.jpg"></image>
					<view class="disease-left-title">按科室找</view>
					<view class="disease-left-tips">覆盖97个疾病</view>
					<view class="disease-left-btn">
						<view>去找专家</view>
					</view>
				</view>
				<view class="disease-right">
					<view class="item" v-for="(item,index) in departmentList" :key="index">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="hospital">
				<view class="hospital-left">
					<image class="hospital-left-bj" src="/static/images/index/hospital.jpg"></image>
					<view class="hospital-left-title">按科室找</view>
					<view class="hospital-left-tips">三甲医院</view>
					<view class="hospital-left-btn">
						<view>去找专家</view>
					</view>
				</view>
				<view class="hospital-right">
					<view class="hospital-item">
						<view class="hospital-teim-title">
							<image></image>全国
						</view>
						<view class="hospital-teim-text">附近好医院</view>
					</view>
					<view class="hospital-item">
						<view class="hospital-teim-title">
							<image></image>全国
						</view>
						<view class="hospital-teim-text">附近好医院</view>
					</view>
					<view class="hospital-item">
						<view class="hospital-teim-title">
							<image></image>全国
						</view>
						<view class="hospital-teim-text">附近好医院</view>
					</view>
				</view>
			</view>
			<view class="bottom">
				<image src="/static/images/index/networkDoctorBottom1.jpg"></image>
				<image src="/static/images/index/networkDoctorBottom2.jpg"></image>
				<image src="/static/images/index/networkDoctorBottom3.jpg"></image>
			</view>
		</template>
		<view class="line"></view>
		<view class="bottom-image">
			<!-- <image src="/static/images/index/networkDoctor2.jpg"></image> -->
			<swiper class="swiper" circular :autoplay="true" :interval="interval" :duration="duration"
				indicator-color="rgba(255,255,255,0.6)" indicator-active-color="#fff">
				<swiper-item v-for="(item,index) in swiperBottomList" :key="index">
					<image class="swiper-item" :src="item.image" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'networkDoctor',
		props: {
			swiperList: {
				type: Array,
				default () {
					return []
				}
			},
			swiperBottomList: {
				type: Array,
				default () {
					return []
				}
			},
			isSee:{
				type: [String,Number],
				default:0
			}
		},
		data() {
			return {
				departmentList: [{
						name: '妇科',
						image: '/static/images/index/department1.jpg'
					},
					{
						name: '消化科',
						image: '/static/images/index/department2.jpg'
					},
					{
						name: '儿科',
						image: '/static/images/index/department3.jpg'
					},
					{
						name: '男科',
						image: '/static/images/index/department4.jpg'
					},
					{
						name: '皮肤科',
						image: '/static/images/index/department5.jpg'
					},
					{
						name: '全科',
						image: '/static/images/index/department6.jpg'
					},
				],
				interval: 5000,
				duration: 500
			};
		},
		watch: {

		},
		mounted() {

		},
		methods: {

		}
	}
</script>
<style scoped lang="less">
	.box {
		padding: 0 20rpx;
		box-sizing: border-box;

		.top-image {
			box-shadow: 3rpx 8rpx 8rpx 3rpx rgba(0, 0, 0, 0.05);
			border-radius: 25rpx;

			.swiper {
				width: 100%;
				height: 289rpx;
				border-radius: 25rpx;
			}

			image {
				width: 100%;
				height: 289rpx;
				border-radius: 25rpx;
			}
		}

		.title {
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;
			height: 52rpx;
			margin: 45rpx 0 20rpx 0;

			.title-left {
				font-size: 32rpx;
				font-weight: 500;
				display: flex;
				align-items: center;

				image {
					width: 36rpx;
					height: 36rpx;
					margin-right: 8rpx;
				}
			}

			.title-right {
				font-size: 22rpx;
				color: #686868;
				display: flex;
				align-items: center;

				image {
					width: 12rpx;
					height: 14rpx;
				}
			}
		}

		.department {
			width: 690rpx;
			height: 152rpx;
			display: flex;
			align-items: center;
			box-shadow: 3rpx 8rpx 8rpx 3rpx rgba(0, 0, 0, 0.05);
			border-radius: 20rpx;

			.department-left {
				width: 160rpx;
				height: 152rpx;
				position: relative;
				z-index: 99;
				padding: 36rpx 0 0 19rpx;
				box-sizing: border-box;

				.department-left-bj {
					position: absolute;
					top: 0;
					left: 0;
					width: 160rpx;
					height: 152rpx;
					z-index: -1;
				}

				.department-left-title {
					line-height: 30rpx;
					font-size: 25rpx;
					font-weight: 500;
					color: #ffffff;
				}

				.department-left-tips {
					font-size: 16rpx;
					line-height: 25rpx;
					color: #ffffff;
				}

				.department-left-btn {
					margin-top: 20rpx;

					view {
						width: 90rpx;
						height: 28rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 18rpx;
						font-weight: 500;
						border-radius: 12rpx;
						color: #0f73fc;
						background: #ffffff;
					}
				}
			}

			.department-right {
				width: 530rpx;
				height: 152rpx;
				display: flex;
				flex-flow: row wrap;
				justify-content: space-between;
				padding: 30rpx 30rpx 8rpx 20rpx;
				box-sizing: border-box;

				.item {
					width: 150rpx;
					height: 45rpx;
					font-size: 20rpx;
					font-weight: 400;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 16rpx;

					image {
						width: 31rpx;
						height: 33rpx;
						margin-right: 9rpx;
					}
				}
			}

			.department-right:after {
				content: "";
				width: 30%;
			}

		}
	}

	.disease {
		width: 690rpx;
		height: 152rpx;
		display: flex;
		align-items: center;
		box-shadow: 3rpx 8rpx 8rpx 3rpx rgba(0, 0, 0, 0.05);
		border-radius: 20rpx;
		margin-top: 16rpx;

		.disease-left {
			width: 160rpx;
			height: 152rpx;
			position: relative;
			z-index: 99;
			padding: 36rpx 0 0 19rpx;
			box-sizing: border-box;

			.disease-left-bj {
				position: absolute;
				top: 0;
				left: 0;
				width: 160rpx;
				height: 152rpx;
				z-index: -1;
			}

			.disease-left-title {
				line-height: 30rpx;
				font-size: 25rpx;
				font-weight: 500;
				color: #ffffff;
			}

			.disease-left-tips {
				font-size: 16rpx;
				line-height: 25rpx;
				color: #ffffff;
			}

			.disease-left-btn {
				margin-top: 20rpx;

				view {
					width: 90rpx;
					height: 28rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 18rpx;
					font-weight: 500;
					border-radius: 12rpx;
					color: #fe551c;
					background: #ffffff;
				}
			}
		}

		.disease-right {
			width: 530rpx;
			height: 152rpx;
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;
			padding: 30rpx 30rpx 8rpx 20rpx;
			box-sizing: border-box;

			.item {
				width: 146rpx;
				height: 45rpx;
				font-size: 20rpx;
				font-weight: 400;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 16rpx;
				background: #fffaf6;
				border: 1rpx solid #ffebdb;
				border-radius: 8rpx;
			}
		}

		.disease-right:after {
			content: "";
			width: 30%;
		}
	}

	.hospital {
		width: 690rpx;
		height: 152rpx;
		display: flex;
		align-items: center;
		box-shadow: 3rpx 8rpx 8rpx 3rpx rgba(0, 0, 0, 0.05);
		border-radius: 20rpx;
		margin-top: 16rpx;

		.hospital-left {
			width: 160rpx;
			height: 152rpx;
			position: relative;
			z-index: 99;
			padding: 36rpx 0 0 19rpx;
			box-sizing: border-box;

			.hospital-left-bj {
				position: absolute;
				top: 0;
				left: 0;
				width: 160rpx;
				height: 152rpx;
				z-index: -1;
			}

			.hospital-left-title {
				line-height: 30rpx;
				font-size: 25rpx;
				font-weight: 500;
				color: #ffffff;
			}

			.hospital-left-tips {
				font-size: 16rpx;
				line-height: 25rpx;
				color: #ffffff;
			}

			.hospital-left-btn {
				margin-top: 20rpx;

				view {
					width: 90rpx;
					height: 28rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 18rpx;
					font-weight: 500;
					border-radius: 12rpx;
					color: #00bd70;
					background: #ffffff;
				}
			}
		}

		.hospital-right {
			padding: 25rpx 30rpx 0 22rpx;
			box-sizing: border-box;
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;
			width: 530rpx;

			.hospital-item {
				width: 146rpx;
				height: 106rpx;
				border: 1rpx solid #ffebdb;
				padding-top: 27rpx;
				box-sizing: border-box;
				border-radius: 20rpx;

				.hospital-teim-title {
					line-height: 25rpx;
					font-size: 18rpx;
					text-align: center;

					image {
						width: 17rpx;
						height: 25rpx;
						margin-right: 4rpx;
					}
				}

				.hospital-teim-text {
					line-height: 25rpx;
					font-size: 18rpx;
					text-align: center;
				}
			}
		}
	}

	.bottom {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		margin-top: 32rpx;

		image {
			width: 224rpx;
			height: 126rpx;
			border-radius: 15rpx;
		}
	}

	.line {
		width: 100%;
		height: 8rpx;
		background-color: #efefef;
		margin-top: 28rpx;
		margin-bottom: 16rpx;
		border-radius: 25rpx;
	}

	.bottom-image {
		box-shadow: 3rpx 8rpx 8rpx 3rpx rgba(0, 0, 0, 0.05);
		margin-bottom: 10rpx;

		.swiper {
			width: 100%;
			height: 289rpx;
			border-radius: 25rpx;

			image {
				width: 100%;
				height: 289rpx;
				border-radius: 25rpx;
			}
		}
	}
</style>