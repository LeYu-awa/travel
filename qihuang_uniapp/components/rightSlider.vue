<template>
	<view class="right-wrapper" @touchmove.stop.prevent="moveStop" :style="viewColor">
		<view class="control-wrapper animated" :class="showBox?'slideInRight':''">
			<view class="wrapper-count">
				<view class="header">
					<view class="title">价格区间</view>
					<view class="input-wrapper">
						<input placeholder="最低价" v-model="min" type="number"/>
						<view class="line"></view>
						<input placeholder="最高价" v-model="max" type="number"/>
					</view>
				</view>
				<view class="store_type content-border">
					<view class="title">商户类别</view>
					<view class="brand-wrapper">
						<view class="wrapper">			
							<view class="item line1" v-for="(item,index) in storeCateList" :key="index" :class="item.check?'on':''" @tap="bindChenckType(item,index)">
								{{item.name}}
							</view>				
						</view>
					</view>
				</view>
				<view class="content-box">
					<view class="content-title">
						<view class="title">品牌</view>
						<view v-if="list.length>3">
							<view class="btns" @click="isShowBrand = !isShowBrand">{{isShowBrand?'收起':'展开'}}<text class="iconfont" :class="isShowBrand ? 'icon-xiangshang' : 'icon-xiangxia'"></text></view>
						</view>
					</view>
					<view class="brand-wrapper">
						<scroll-view :style="{'max-height':isShowBrand?'90%':'100rpx'}" :scroll-y="isShowBrand">
							<view class="wrapper">			
								<view class="item line1" v-for="(item,index) in list" :key="index" :class="item.check?'on':''" @tap="bindChenck(item,'brand')">
									{{item.brand_name}}
								</view>				
							</view>
						</scroll-view>
					</view>
				</view>
				<!--店铺类型-->
				<view class="content-box">	
					<view class="content-title">
						<view class="title">店铺类型</view>
						<view v-if="storeTypeList.length>3">
							<view class="btns" @click="isShowType = !isShowType">{{isShowType?'收起':'展开'}}<text class="iconfont" :class="isShowType ? 'icon-xiangshang' : 'icon-xiang'"></text></view>
						</view>
					</view>
					<view class="brand-wrapper">
						<scroll-view :scroll-y="isShowType">
							<view class="wrapper">			
								<view class="item line1" v-for="(item,index) in storeTypeList" :key="index" :class="item.check?'on':''" @tap="bindChenck(item)">
									{{item.type_name}}
								</view>				
							</view>
						</scroll-view>	
					</view>
				</view>	
				<!--商品参数-->
				<view class="content-border">
					<scroll-view style="max-height:400rpx" scroll-y="true">
						<view class="content-box" v-for="(item,index) in productParmasList">
							<view class="content-title">
								<view class="title">{{item.name}}</view>
								<view>
									<view class="btns" @click="getParmasValue(item)">{{item.showValue?'收起':'展开'}}<text class="iconfont" :class="item.showValue ? 'icon-xiangshang' : 'icon-xiangxia'"></text></view>
								</view>
							</view>
							<view v-if="item.parmasValue.length>0 && item.showValue" class="brand-wrapper">
								<scroll-view :scroll-y="isShowParmas">
									<view class="wrapper">		
										<view class="item line1" v-for="(itm,idx) in item.parmasValue" :key="idx" :class="itm.check?'on':''" @tap="bindChenck(itm)">
											{{itm.value}}
										</view>				
									</view>
								</scroll-view>
							</view>
						</view>
					</scroll-view>	
				</view>
			</view>
			<view class="foot-btn">
				<view class="btn-item" @click="reset">重置</view>
				<view class="btn-item confirm" @click="confirm">确定</view>
			</view>
		</view>
		<view class="right-bg" @click="close"></view>
	</view>
</template>

<script>
	import { mapGetters } from "vuex";
	import { getParmasValue } from '@/api/store.js';
	export default{
		props: {
			brandList: {
				type: Array,
			},
			storeTypeArr: { //店铺类型
				type: Array,
			},
			parmasList: { //商品参数
				type: Array,
			},
			status:{
				type:Boolean,
				default:false
			},
			isCate:{
				type:Boolean,
				default:false
			},
			price_on:{
				type:String,
				default:''
			},
			price_off:{
				type:String,
				default:''
			},
			activeIndex:{
				type:Number,
				default:0
			}
		},
		computed: mapGetters(['viewColor']),
		data(){
			return {
				min: '',
				max:'',
				is_trader: '',
				isShow:false,
				isShowBrand: false,
				isShowType: false,
				isShowParmas: false,
				list:[],
				storeTypeList: [],
				productParmasList: [],
				storeCateList: [
					{name: '全部', value: '',check: true},
					{name: '自营', value: 'trader',check: false},
					{name: '非自营', value: 'trader',check: false},
				],
				activeList:[],
				showBox:false,
				index: this.activeIndex
			}
		},
		mounted() {
			// 重要组件挂载后
			this.list =  this.brandList
			this.storeTypeList = this.storeTypeArr
			this.productParmasList = this.parmasList
			this.showBox = this.status
			this.min = this.price_on
			this.max = this.price_off
			this.bindChenckType({},this.activeIndex)
		},
		methods:{	
			bindChenck(item,key){
				item.check = !item.check
				// this.arrFilter()
			},	
			bindChenckType(item,index){	
				this.storeCateList = [
					{name: '全部', value: '',check: false},
					{name: '自营', value: 'trader',check: false},
					{name: '非自营', value: 'trader',check: false},
				]
				this.storeCateList[index]['check'] = true
				this.is_trader = this.storeCateList[0]['check'] ? '' : this.storeCateList[1]['check'] ? 1 : 0
				this.index = index
			}, 
			/*获取参数值*/
			getParmasValue(item){
				item.showValue = !item.showValue
				getParmasValue(item.parameter_id).then(res => {
					res.data.forEach((data, index) => {
						data.check = false
					})
					if(item.parmasValue.length>0)return
					item.parmasValue =  res.data
				});
			},
			arrFilter(list){
				let arr = []
				arr = list.filter(item=>{
					return item.check == true
				})
				return arr
			},
			reset(){
				this.list.forEach((el,index)=>{
					el.check = false
				})
				this.storeTypeList.forEach((el,index)=>{
					el.check = false
				})
				this.productParmasList.forEach((item,index)=>{
					item.parmasValue.forEach((el,idx)=>{
						el.check = false
					})
				})
				this.storeCateList = [
					{name: '全部', value: '',check: true},
					{name: '自营', value: 'trader',check: false},
					{name: '非自营', value: 'trader',check: false}
				]
				this.min = this.max = ''
				// this.arrFilter()
			},
			confirm(){
				let parmas = {}
				this.productParmasList.forEach((item,index)=>{
					parmas[item.parameter_id]=[]
					item.parmasValue.forEach((el,idx)=>{
						if(el.check){
							parmas[item.parameter_id].push(el.value)
						}
					})
				})
				let obj = {
					brandList: this.arrFilter(this.list),
					typeList: this.arrFilter(this.storeTypeList),
					parmasList: parmas,
					price_on: this.min,
					price_off: this.max,
					status: false,
					is_trader: this.is_trader
				}
				this.showBox = false
				this.$emit('confirm',obj,this.index)				
			},
			close(){
				this.showBox = false
				this.$emit('close')
			},
			moveStop(){}
		}
	}
</script>

<style lang="scss">
	.slideInRight{
		animation-duration:.5s
	}
	.right-wrapper{
		z-index: 99;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		.control-wrapper{
			z-index: 90;
			position: absolute;
			right: 0;
			top: 0;
			display: flex;
			flex-direction: column;
			width: 635rpx;
			height: 100%;
			background-color: #FFFFFF;
			.wrapper-count{
				height: calc(100% - 120rpx);
				overflow-y: auto;
			}
			.header{
				padding: 50rpx 26rpx 40rpx;
				background-color: #fff;
				.content-title{
					display: flex;
					align-items: center;
					justify-content: space-between;
				}
				.title{
					font-size: 26rpx;
					font-weight: bold;
					color: #282828;
				}	
				.input-wrapper{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 28rpx;
					input{
						width:260rpx;
						height:56rpx;
						padding: 0 10rpx;
						background:rgba(242,242,242,1);
						border-radius:28rpx;
						font-size: 22rpx;
						text-align: center;
					}
					.line{
						width:15rpx;
						height:2rpx;
						background:#7D7D7D;
					}
				}
			}
			.content-border{
				border-top: 20rpx solid #f5f5f5;
			}
			.content-box{
				position: relative;
				display: flex;
				flex-direction: column;
				padding: 0 26rpx;		
				.content-title{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 40rpx 0 20rpx;
					.title{
						font-size: 26rpx;
						font-weight: bold;
						color: #282828;
					}
					.btns{
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 22rpx;
						color: #999;
						.iconfont{
							margin-left: 10rpx;
							margin-top: 5rpx;
							font-size: 20rpx;
						}
					}
				}
				.brand-wrapper{
					flex: 1;
					overflow: hidden;
					.wrapper{
						display: flex;
						flex-wrap: wrap;
						padding-bottom: 20rpx;
					}
					.item{
						display: block;
						width:186rpx;
						height:56rpx;
						line-height: 56rpx;
						text-align: center;
						background:rgba(242,242,242,1);
						border-radius:28rpx;
						margin-top: 25rpx;
						padding: 0 10rpx;
						margin-right: 12rpx;
						&:nth-child(3n){
							margin-right: 0;
						}
						&.on{
							background: var(--view-minorColor);
							border:1px solid var(--view-theme);
							color: var(--view-theme);
						}
					}		
				}			
			}
			.foot-btn{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-bottom: 30rpx;
				position: absolute;
				bottom: 0;
				left: 20rpx;
				
				.btn-item{
					display: flex;
					align-items: center;
					justify-content: center;
					width:286rpx;
					height:68rpx;
					background:rgba(255,255,255,1);
					border:1px solid rgba(170,170,170,1);
					border-radius:34rpx;
					font-size: 26rpx;
					color: #282828;
					&.confirm{
						background: var(--view-theme);
						border-color: var(--view-theme);
						color: #fff;
						margin-left: 20rpx;
					}
				}
			}
			.store_type{
				position: relative;
				border-top: 20rpx solid #f5f5f5;
				padding: 0 26rpx;		
				.title{
					padding: 40rpx 0 20rpx;
					font-size: 26rpx;
					font-weight: bold;
					color: #282828;
				}
				.brand-wrapper{
					overflow: hidden;
					.wrapper{
						display: flex;
						flex-wrap: wrap;
					}
					.item{
						display: block;
						width:186rpx;
						height:56rpx;
						line-height: 56rpx;
						text-align: center;
						background:rgba(242,242,242,1);
						border-radius:28rpx;
						margin-top: 25rpx;
						padding: 0 10rpx;
						margin-right: 12rpx;
						&:nth-child(3n){
							margin-right: 0;
						}
						&.on{
							background: var(--view-minorColor);
							border:1px solid var(--view-theme);
							color: var(--view-theme);
						}
					}
					
				}
				
			}
		}
		.right-bg{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,.5);
		}
	}
</style>
