<template>
	<view>
		<form>
			<view class='personal-data' :style="viewColor">
				<view v-if="activityData" class='list'>
					<view class='wrapper'>
						<view class="page-title">
							<image :src="`${domain}/static/images/page_title.png`" mode="widthFix"></image>
							<view class="activity-name">{{activityData.name}}</view>
						</view>
						
						<block v-if="formData.length">
							<view class='item acea-row row-between-wrapper' :class="{on:(item.name=='radios' || item.name=='checkboxs'),on2:item.name == 'dateranges',on3:item.name == 'citys'}" v-for="(item,index) in formData" :key="index">
							  <view class="name">
							    {{ item.titleConfig.value }}
									<span class="asterisk" v-if="item.titleShow.val">*</span>
							  </view>
								<!-- radio -->
								<view v-if="item.name=='radios'" class="discount">
									<radio-group disabled class="acea-row row-middle row-right item-select" :class="disabled == 1 ? 'disabled' : ''">
										<label class="radio" v-for="(j,jindex) in item.wordsConfig.list" :key="jindex">
											<view class="acea-row row-middle">
												<!-- #ifndef MP -->
												<radio :value="jindex.toString()" :checked='j.show'/>
												<!-- #endif -->
												<!-- #ifdef MP -->
												<radio :value="jindex" :checked='j.show'/>
												<!-- #endif -->
												<view>{{j.val}}</view>
											</view>
										</label>
									</radio-group>
								</view>
								<!-- checkbox -->
								<view v-if="item.name=='checkboxs'" class="discount">
									<checkbox-group class="acea-row row-middle row-right item-select" disabled>
										<label class="radio" v-for="(j,jindex) in item.wordsConfig.list" :key="jindex">
											<view class="acea-row row-middle">
												<!-- #ifndef MP -->
												<checkbox :value="jindex.toString()" :checked="j.show" style="transform:scale(0.9)" />
												<!-- #endif -->
												<!-- #ifdef MP -->
												<checkbox :value="jindex" :checked="j.show" style="transform:scale(0.9)" />
												<!-- #endif -->
												<view>{{j.val}}</view>
											</view>
										</label>
									</checkbox-group>
								</view>
								<!-- text -->
								<view v-if="item.name=='texts' && item.valConfig.tabVal == 0" class="discount">
									<input type="text" :placeholder="item.tipConfig.value" placeholder-class="placeholder" v-model="item.value" disabled/>
								</view>
								<!-- number -->
								<view v-if="item.name=='texts' && item.valConfig.tabVal == 4" class="discount">
									<input type="number" :placeholder="item.tipConfig.value" placeholder-class="placeholder" v-model="item.value" disabled/>
								</view>
								<!-- email -->
								<view v-if="item.name=='texts' && item.valConfig.tabVal == 3" class="discount">
									<input type="text" :placeholder="item.tipConfig.value" placeholder-class="placeholder" v-model="item.value" disabled/>
								</view>
								<!-- data -->
								<view v-if="item.name=='dates'" class="discount" :class="item.value.length ? '' : 'placeholder'">
									<picker mode="date" :value="item.value" disabled>
										<view class="acea-row row-between-wrapper">
											<view v-if="item.value == ''">{{item.tipConfig.value}}</view>
											<view v-else>{{item.value}}</view>
											<text class='iconfont icon-jiantou'></text>
										</view>
									</picker>
								</view>
								<!-- dateranges -->
								<view v-if="item.name=='dateranges'" class="discount" :class="item.value.length ? '' : 'placeholder'">
									<uni-datetime-picker v-model="item.value" type="daterange" disabled>
										{{item.value.length?item.value[0]+' - '+item.value[1]:item.tipConfig.value}}
									<text class='iconfont icon-jiantou'></text>
									</uni-datetime-picker>
								</view>
								<!-- time -->
								<view v-if="item.name=='times'" class="discount" :class="item.value.length ? '' : 'placeholder'">
									<picker mode="time" :value="item.value"
										:placeholder="item.tipConfig.value" disabled>
										<view class="acea-row row-between-wrapper">
											<view v-if="item.value == ''">{{item.tipConfig.value}}</view>
											<view v-else>{{item.value}}</view>
											<text class='iconfont icon-jiantou'></text>
										</view>
									</picker>
								</view>
								<!-- timeranges -->
								<view v-if="item.name=='timeranges'" class="discount acea-row row-between-wrapper" :class="item.value.length ? '' : 'placeholder'">
									<view v-if="item.value">{{item.value}}</view>
									<view v-else>{{item.tipConfig.value}}</view>
									<text class='iconfont icon-jiantou'></text>
								</view>
								<!-- select -->
								<view v-if="item.name=='selects'" class="discount">
									<picker :value="item.value" :range="item.wordsConfig.list" range-key="val" >
										<view class="acea-row row-between-wrapper">
											<view v-if="item.value">{{item.value}}</view>
											<view v-else class="placeholder">请选择</view>
											<text class='iconfont icon-jiantou'></text>
										</view>
									</picker>
								</view>
								<!-- city -->
								<view v-if="item.name=='citys'" class="discount" disabled>
									<view class="acea-row row-middle row-right">
										<view class="city" v-if="item.value == ''">{{item.tipConfig.value}}</view>
										<view class="city item-select" v-else>{{item.value}}</view>
										<text class='iconfont icon-jiantou'></text>
									</view>
								</view>
								<!-- id -->
								<view v-if="item.name=='texts' && item.valConfig.tabVal == 2" class="discount">
									<input type="idcard" :placeholder="item.tipConfig.value" placeholder-class="placeholder" v-model="item.value" disabled />
								</view>
								<!-- phone -->
								<view v-if="item.name=='texts' && item.valConfig.tabVal == 1" class="discount">
									<input type="number" :placeholder="item.tipConfig.value" placeholder-class="placeholder" v-model="item.value" disabled />
								</view>
								<!-- img -->
								<view v-if="item.name=='uploadPicture'" class="confirmImg" style="padding-bottom: 0;">
									<view class='upload acea-row row-middle'>
										<view class='pictrue' v-for="(items,indexs) in item.value" :key="indexs">
											<image :src='items' mode="aspectFill"></image>
											<view class="close acea-row row-center-wrapper">
												<view class="iconfont icon-guanbi5"></view>
											</view>
										</view>
										<view class='pictrue acea-row row-center-wrapper row-column'
											v-if="item.value.length < item.numConfig.val">
											<text class='iconfont icon-icon25201'></text>
											<view>上传图片</view>
										</view>
									</view>
								</view>
							</view>
						</block>
					</view>
				</view>				
			</view>
		</form>
	</view>
</template>
<script>
	import { systemFormData } from '@/api/user.js';
	import { mapGetters } from "vuex";
	import { HTTP_REQUEST_URL } from '@/config/app';
	import dayjs from "@/plugin/dayjs/dayjs.min.js";
	export default {
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				activityData: {},
				formData: {},
				form_id: "",
				disabled: false,
			};
		},
		components: {},
		computed:{
			...mapGetters(['viewColor','keyColor']),
		},
		watch: {
	
		},
		onLoad(option) {
			this.form_id = option.form_id
			
		},
		onShow() {
			this.formDetail();
		},
		methods: {		
			/**
			 * 获取表单数据详情
			 */
			formDetail: function() {
				let that = this;
				uni.showLoading()
				systemFormData(that.form_id).then(res => {
					uni.hideLoading()
					let data = res.data;
					that.$set(that, 'activityData', data);
					let formData = that.objToArr(data.value)
					that.filterData(formData)	
				}).catch(err => {
					uni.hideLoading();
				})
			},
			filterData(formData){
				let that = this;
				formData.forEach((item, index, arr)=>{
					that.$set(item, 'value', "");
					if(item.name == 'texts'){
					  if(item.defaultValConfig.value){
						  item.value = item.defaultValConfig.value
					  }else{
						  item.value = ''
					  }
					}else if(item.name == 'radios'){
						item.value = item.wordsConfig.list[0].val
					}else if(item.name == 'uploadPicture'){
					  item.value = [];
					}else if(item.name == 'dateranges'){
						if(item.valConfig.tabVal==0){
						  if(item.valConfig.tabData==0){
							 let obj = dayjs(new Date(Number(new Date().getTime()))).format('YYYY-MM-DD');
							 item.value = [obj,obj]
						  }else{
							  let data1 = dayjs(new Date(Number(new Date(item.valConfig.specifyDate[0]).getTime()))).format('YYYY-MM-DD');
							  let data2 = dayjs(new Date(Number(new Date(item.valConfig.specifyDate[1]).getTime()))).format('YYYY-MM-DD');
						      item.value = [data1,data2];
						  }
						}else{
						  item.value = [];  
						}
					}else{
						if(['times','dates','timeranges'].indexOf(item.name) != -1){
						  if(item.valConfig.tabVal==0){
							  if(item.valConfig.tabData==0){
									if(item.name == 'times'){
										item.value = dayjs(new Date(Number(new Date().getTime()))).format('HH:mm');
									}else if(item.name == 'dates'){
										item.value = dayjs(new Date(Number(new Date().getTime()))).format('YYYY-MM-DD');
									}else{
										let current = dayjs(new Date(Number(new Date().getTime()))).format('HH:mm');
										item.value = current+' - '+current;
									}
									}else{
									if(item.name == 'times' || item.name == 'dates'){
										item.value = item.valConfig.specifyDate;
									}else{
										item.value = item.valConfig.specifyDate[0]+' - '+item.valConfig.specifyDate[1];
									}
							  }
						  }else{
								item.value = '';  
						  }
						}else if(item.name == 'city'){
							item.value = '';
						}else{
						  item.value = '';
						}
					}
				})
				function sortNumber(a, b) {
					return a.timestamp - b.timestamp;
				}
				formData.sort(sortNumber);
				that.$set(that, 'formData', formData);
			},
			// 对象转数组
			objToArr(data) {
				let obj = Object.keys(data);
				let m = obj.map(key => data[key]);
				return m;
			},
		}
	}
</script>

<style scoped lang="scss">
	/deep/radio .wx-radio-input.wx-radio-input-checked,
	/deep/uni-radio .uni-radio-input.uni-radio-input-checked {
	 border: 1px solid var(--view-theme)!important;
	 background-color: var(--view-theme)!important;
	}
	/deep/checkbox .uni-checkbox-input.uni-checkbox-input-checked,
	/deep/checkbox .wx-checkbox-input.wx-checkbox-input-checked {
	  border: 1px solid var(--view-theme)!important;
	  background-color: var(--view-theme)!important;
	  color: #fff!important;
	}
	.personal-data{
		pointer-events: none;
		padding-bottom: 150rpx;
		padding-bottom: calc(150rpx + constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		padding-bottom: calc(150rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		min-height: 100vh;
	}
	.personal-data .wrapper {
		background-color: #fff;
		border-radius: 16rpx;
		margin: 20rpx 20rpx 0;
		+.wrapper{
			margin-top: 20rpx;
		}
	}
	.page-title{
		image{
			width: 100%;
		}
		.activity-name{
			text-align: center;
			color: #333333;
			font-weight: bold;
			font-size: 30rpx;
			padding: 30rpx 0 20rpx;
			border-bottom: 1px solid #eee;
		}
	}
	.personal-data .wrapper .text-info{
		padding: 30rpx;
		>view{
			+view{
				margin-top: 30rpx;
			}
		}
		.activity-name{
			justify-content: space-between;
			.title{
				width: 580rpx;
				color: #282828;
				font-size: 32rpx;
				font-weight: bold;
			}
		}
		.share{
			text-align: center;
			color: #666666;
			font-size: 18rpx;
			cursor: pointer;
			.icon-fenxiang4{
				display: block;
				color: #282828;
				font-size: 34rpx;
				margin: 0 0 3rpx 0;
			}
		}
		.iconfont{
			margin-right: 17rpx;
		}
		.activity-item{
			display: flex;
			align-items: center;
		}
	}
	.personal-data .wrapper .text-info .iconfont{
		color: #666666;
	}
	.personal-data .wrapper .text-info .info{
		color: #282828;
		&.info-theme{
			color: var(--view-theme);
		}
	}
	.personal-data .wrapper .text-info .acea-info{
		width: 600rpx;
		text-align: justify;
		word-break: break-all;
	}
	.personal-data .wrapper .item .name {
	  position: relative;
		width: 190rpx;
	}
	.personal-data .wrapper .item {
	  padding: 27rpx 30rpx;
	  font-size: 28rpx;
	  color: #282828;
	  position: relative;
		&::after{
			content: "";
			width: 670rpx;
			border-bottom: 1px solid #eee;
			position: absolute;
			bottom: 0;
		}
	}
	.personal-data .wrapper .item.on{
		padding: 16rpx 30rpx;
		align-items: baseline;
	}
	.personal-data .wrapper .item.on3{
		align-items: baseline;  
	}
	.personal-data .wrapper .item .discount {
	  color: #282828;
		font-size: 30rpx;
	}
	.personal-data .wrapper .item .item-select{
		color: #282828;
	}
	.personal-data .wrapper .item.on .discount,
	.personal-data .wrapper .item.on3 .discount{
		width: 460rpx;
		text-align: right;
	}
	.personal-data .wrapper .item.on3 .discount .city{
		width: 400rpx;
		color: #ccc;
		&.item-select{
			color: #282828;
		}
	}
	.personal-data .wrapper .item .discount input {
	  text-align: right;
		font-size: 30rpx;
	  width: 450rpx;
		color: #282828;
	}
	.personal-data .wrapper .item .discount .iconfont {
	  color: #BBBBBB;
	  font-size: 28rpx;
	  margin-left: 15rpx;
	}
	.personal-data .wrapper .item .discount .num {
	  font-size: 32rpx;
	  margin-right: 20rpx;
	}	
	.personal-data .wrapper .item .discount .radio{
	  margin: 0 22rpx 0 22rpx;
	  padding: 10rpx 0;
	}
	.personal-data .wrapper .item .discount .radio /deep/uni-checkbox .uni-checkbox-input{
	  border-radius: 0;
	}
	.personal-data .wrapper .item textarea {
	  background-color: #f9f9f9;
	  width: 650rpx;
	  height: 140rpx;
	  border-radius: 3rpx;
	  margin-top: 30rpx;
	  padding: 25rpx 28rpx;
	  box-sizing: border-box;
	}
	.personal-data .wrapper .item .placeholder {
	  color: #ccc;
		font-size: 30rpx;
	}
	.asterisk{
		color: red;
	}
</style>
