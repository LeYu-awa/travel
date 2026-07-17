<template>
	<view :style="'background-color: '+activityData.color">
		<form v-if="!posterStatus" @submit="formSubmit">
			<view v-if="activityData.activity_name" class='personal-data' :style="viewColor">
				<view class='list'>
					<!--活动背景图-->
					<view class="activity-pic">
						<image :src="activityData.pic" class="image" mode="widthFix"></image>
					</view>
					<view class="wrapper">
						<view class="text-info">
							<view class="acea-row activity-name">
								<view class="title line2">{{activityData.activity_name}}</view>
								<view class="share" @click="listenerActionSheet">
									<i class="iconfont icon-fenxiang4"></i>
									分享
								</view>
							</view>
							<view class="activity-item">
								<view class="iconfont icon-huodong-shijian"></view>
								<view v-if="activityData.start_time&&activityData.end_time" class="info">
									{{formatDate(new Date(activityData.start_time))}} - {{formatDate(new Date(activityData.end_time))}}
								</view>
							</view>
								<view class="activity-item">
									<view class="iconfont icon-huodong-renshu"></view>
									<view class="info">{{activityData.count == 0 ? '不限人数' : activityData.count+'人'}}</view>
								</view>
								<view class="activity-item">
									<view class="iconfont icon-huodong-renshu"></view>
									<view class="info info-theme">
										{{activityData.total}}人
									</view>
								</view>
								<view class="acea-row">
									<view class="iconfont icon-huodong-jianjie"></view>
									<view class="info acea-info">{{activityData.info}}</view>
								</view>
							</view>
						</view>		
					<view class='wrapper' :class="{'form-wrapper' : disabled}" v-if="formData.length">
					  <view class='item acea-row row-between-wrapper' :class="{on:(item.name=='radios' || item.name=='checkboxs'),on2:item.name == 'dateranges',on3:item.name == 'citys'}" v-for="(item,index) in formData" :key="index">
					    <view class="name">
					      {{ item.titleConfig.value }}
								<span class="asterisk" v-if="item.titleShow.val">*</span>
					    </view>
							<!-- radio -->
							<view v-if="item.name=='radios'" class="discount">
								<radio-group @change="radioChange($event, index, item)" class="acea-row row-middle row-right item-select" :class="disabled == 1 ? 'disabled' : ''">
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
								<checkbox-group @change="checkboxChange($event, index, item)" class="acea-row row-middle row-right item-select" :class="disabled == 1 ? 'disabled' : ''">
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
								<input type="text" :placeholder="item.tipConfig.value" placeholder-class="placeholder" v-model="item.value" :disabled="disabled"/>
							</view>
							<!-- number -->
							<view v-if="item.name=='texts' && item.valConfig.tabVal == 4" class="discount">
								<input type="number" :placeholder="item.tipConfig.value" placeholder-class="placeholder" v-model="item.value" :disabled="disabled"/>
							</view>
							<!-- email -->
							<view v-if="item.name=='texts' && item.valConfig.tabVal == 3" class="discount">
								<input type="text" :placeholder="item.tipConfig.value" placeholder-class="placeholder" v-model="item.value" :disabled="disabled"/>
							</view>
							<!-- date -->
							<view v-if="item.name=='dates'" class="discount">
								<picker mode="date" :value="item.value" @change="bindDateChange($event,index)" :class="item.value.length ? '' : 'placeholder'">
									<view class="acea-row row-between-wrapper">
										<view v-if="item.value == ''">{{item.tipConfig.value}}</view>
										<view v-else>{{item.value}}</view>
										<text class='iconfont icon-jiantou'></text>
									</view>
								</picker>
							</view>
							<!-- dateranges -->
							<view v-if="item.name=='dateranges'" class="discount" :class="item.value.length ? '' : 'placeholder'">
								<uni-datetime-picker v-model="item.value" type="daterange" @maskClick="maskClick" :class="disabled == 1 ? 'disabled' : ''">
									{{item.value.length?item.value[0]+' - '+item.value[1]:item.tipConfig.value}}
								<text class='iconfont icon-jiantou'></text>
								</uni-datetime-picker>
							</view>
							<!-- time -->
							<view v-if="item.name=='times'" class="discount" :class="item.value.length ? '' : 'placeholder'">
								<picker mode="time" :value="item.value" @change="bindTimeChange($event,index)"
									:placeholder="item.tipConfig.value" :class="disabled == 1 ? 'disabled' : ''">
									<view class="acea-row row-between-wrapper">
										<view v-if="item.value == ''">{{item.tipConfig.value}}</view>
										<view v-else>{{item.value}}</view>
										<text class='iconfont icon-jiantou'></text>
									</view>
								</picker>
							</view>
							<!-- timeranges -->
							<view v-if="item.name=='timeranges'" class="discount acea-row row-between-wrapper" @click="getTimeranges(index)" :class="item.value.length ? '' : 'placeholder'">
								<view v-if="item.value">{{item.value}}</view>
								<view v-else>{{item.tipConfig.value}}</view>
								<text class='iconfont icon-jiantou'></text>
							</view>
							<!-- select -->
							<view v-if="item.name=='selects'" class="discount">
								<picker :value="item.value" :range="item.wordsConfig.list" @change="bindSelectChange($event,index,item)" range-key="val" :class="disabled ? 'disabled' : ''">
									<view class="acea-row row-between-wrapper">
										<view v-if="item.value">{{item.value}}</view>
										<view v-else class="placeholder">请选择</view>
										<text class='iconfont icon-jiantou'></text>
									</view>
								</picker>
							</view>
							<!-- city -->
							<view v-if="item.name=='citys'" class="discount" @click="changeRegion(index)" :class="disabled ? 'disabled' : ''">
								<view class="acea-row row-middle row-right">
									<view class="city" v-if="item.value == ''">{{item.tipConfig.value}}</view>
									<view class="city item-select" v-else>{{item.value}}</view>
									<text class='iconfont icon-jiantou'></text>
								</view>
							</view>
							<!-- id -->
							<view v-if="item.name=='texts' && item.valConfig.tabVal == 2" class="discount">
								<input type="idcard" :placeholder="item.tipConfig.value" placeholder-class="placeholder" v-model="item.value" :disabled="disabled" />
							</view>
							<!-- phone -->
							<view v-if="item.name=='texts' && item.valConfig.tabVal == 1" class="discount">
								<input type="number" :placeholder="item.tipConfig.value" placeholder-class="placeholder" v-model="item.value" :disabled="disabled" />
							</view>
							<!-- img -->
							<view v-if="item.name=='uploadPicture'" class="confirmImg" style="padding-bottom: 0;">
								<view class='upload acea-row row-middle'>
									<view class='pictrue' v-for="(items,indexs) in item.value" :key="indexs">
										<image :src='items' mode="aspectFill"></image>
										<view v-if="!disabled" class="close acea-row row-center-wrapper" @tap='DelPic(index,indexs)'>
											<view class="iconfont icon-guanbi5"></view>
										</view>
									</view>
									<view class='pictrue acea-row row-center-wrapper row-column' @tap.stop='uploadpic(index)'
										v-if="item.value.length < item.numConfig.val && !disabled">
										<text class='iconfont icon-icon25201'></text>
										<view>上传图片</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="footer">
					<button v-if="activityData.time_status==-1" class='modifyBnt disabled'>已结束</button>
					<button v-else-if="activityData.count==activityData.total && activityData.count!=0" class='modifyBnt disabled'>已报满</button>
					<button v-else-if="disabled && activityData.time_status==1" class='modifyBnt' @click="listenerActionSheet">分享好友</button>
					<block v-else>
						<button v-if="activityData.time_status==1" class='modifyBnt' formType="submit">提交报名</button>
						<button v-else-if="activityData.time_status==0" class='modifyBnt disabled'>未开始</button>
					</block>	
				</view>	
			</view>
		</form>
		<timeranges :isShow='isShow' :time='timeranges' @confrim="confrim" @cancel="cancels"></timeranges>
		<!--提交成功弹窗-->
		<view class="success" v-if="isShowbox">
			<view class="bg" @click="isShowbox=false"></view>
			<view class="con">
				<image :src="domain+'/static/images/sign_success.png'" mode=""></image>
				<view class="title">报名成功</view>
				<view class="text">感谢参与，您已完成报名！</view>
				<view class="foot">
					<navigator url="/pages/activity/my_registrate/index" hover-class='none' class="btn">查看详情</navigator>
					<view class="btn" @click="listenerActionSheet">分享报名</view>
				</view>
			</view>
		</view>
		<!-- 分享按钮 -->
		<view class="generate-posters acea-row row-middle" :class="posters ? 'on' : ''">
			<!-- #ifndef MP -->
			<button class="item" :class="weixinStatus ? 'item3' : ''" hover-class='none' v-if="weixinStatus === true" @click="H5ShareBox=true;posters=false;">
				<view class="iconfont icon-weixin3"></view>
				<view class="">发送给朋友</view>
			</button>
			<!-- #endif -->
			<!-- #ifdef MP -->
			<button class="item" :class="weixinStatus ? 'item3' : ''" open-type="share" hover-class='none' @click="goFriend">
				<view class="iconfont icon-weixin3"></view>
				<view class="">发送给朋友</view>
			</button>
			<!-- #endif -->
			<button class="item" :class="weixinStatus ? 'item3' : ''" hover-class='none' @tap="goPoster">
				<view class="iconfont icon-haibao"></view>
				<view class="">生成海报</view>
			</button>
		</view>
		<view class="mask" v-if="posters" @click="listenerActionClose"></view>
		<!-- 发送给朋友图片 -->
		<view class="share-box" v-if="H5ShareBox">
			<image :src="`${domain}/static/images/share-info.png`" @click="H5ShareBox=false;"></image>
		</view>
		<areaWindow ref="areaWindow" :display="display" :address='addressInfoArea' :cityShow='cityShow' @submit="OnAreaAddress" @changeClose="changeAddressClose"></areaWindow>	
		<!--分享海报-->
		<view class='distribution-posters' v-if="posterStatus">
			<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="circular" :interval="interval" :duration="duration"
			 @change="bindchange" previous-margin="40px" next-margin="40px">
				<block v-for="(item,index) in spreadData" :key="index" class="img-list">
					<swiper-item class="aaa">
						<div class="box" ref="bill" :class="swiperIndex == index ? 'active' : 'quiet'">
							<view class="user-msg">
								<view class="user-code">
									<image class="canvas" :style="{height:hg+'px'}" :src="posterImage[index]"
										v-if="posterImage[index]"></image>
									<canvas class="canvas" :style="{height:hg+'px'}" :canvas-id="'myCanvas'+ index"
										v-else></canvas>				
								</view>
							</view>
						</div>
						<!-- <image :src="item.wap_poster" class="slide-image" :class="swiperIndex == index ? 'active' : 'quiet'" mode='aspectFill' /> -->
					</swiper-item>
				</block>
			</swiper>
			<!-- #ifndef H5  -->
			<view class='keep b-color' @click='savePosterPath(posterImage[swiperIndex])' :style="viewColor">保存海报</view>
			<!-- #endif -->
		</view>
	</view>
</template>
<script>
	const CACHE_CITY = {};
	import { registrateDetail, registrateCreate, registrateRecordDetail, 
		registratePoster, imgToBase  } from '@/api/user.js';
	import shareScence from '@/libs/spread';
	import { switchH5Login, getCity } from '@/api/api.js';
	import { mapGetters } from "vuex";
	import { toLogin } from '@/libs/login.js';
	import { HTTP_REQUEST_URL } from '@/config/app';
	import dayjs from "@/plugin/dayjs/dayjs.min.js";
	import areaWindow from '@/components/areaWindow';
	import timeranges from '@/components/timeranges';
	export default {
		data() {
			return {
				domain: HTTP_REQUEST_URL,
				userInfo: {},
				activityData: {},
				formData: {},
				loginType: 'h5', //app.globalData.loginType
				activity_id: "",
				isShowbox: false,
				selectIndex:0,
				timerangesIndex:0,
				newImg: [],
				display: false,
				cityShow: 2,
				addressInfoArea: [],
				timeranges: [],
				mp_is_new: this.$Cache.get('MP_VERSION_ISNEW') || false,
				posters: false,
				weixinStatus: false,
				posterStatus: false,
				H5ShareBox: false,
				disabled: false,
				isShow:false,
				imgUrls: [],
				indicatorDots: false,
				posterImageStatus: true,
				circular: false,
				autoplay: false,
				interval: 3000,
				duration: 500,
				swiperIndex: 0,
				spreadList: [],
				spid: "",
				poster: '',
				spreadData: [{}], //新海报数据
				nickName: "",
				siteName: "",
				mpUrl: "",
				canvasImageUrl: '',
				posterImage: [],
				//二维码参数
				codeShow: false,
				cid: '1',
				ifShow: true,
				val: "", // 要生成的二维码值
				size: 200, // 二维码大小
				unit: 'upx', // 单位
				background: '#FFF', // 背景色
				foreground: '#000', // 前景色
				pdground: '#32dbc6', // 角标色
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '', // 二维码生成后的图片地址或base64
				codeSrc: "",
				wd: 225,
				hg: 500
			};
		},
		components: {
			areaWindow,
			timeranges,
		},
		computed:{
			...mapGetters(['isLogin','viewColor','keyColor']),
		},
		watch: {
	
		},
		onLoad(option) {
			this.activity_id = option.id	
			this.spid = option.spid
			let current = (dayjs(new Date(Number(new Date().getTime()))).format('HH:mm')).split(':');
			let currentArray = current;
			currentArray.push(0);
			let arrayNew = [];
			[...currentArray,...current].forEach(item=>{
			 arrayNew.push(Number(item)) 
			})	
			this.timeranges = arrayNew;
			if (this.isLogin) {
				this.registrateDetail();
				shareScence(this.spid,this.isLogin)
			}else{
				toLogin()
			}
		},
		onShow() {
			
		},
		/**
		 * 用户点击右上角分享
		 */
		// #ifdef MP
		onShareAppMessage: function() {
			let that = this;
			that.$set(that, 'actionSheetHidden', !that.actionSheetHidden);
			return {
				title: that.activityData.activity_name || '',
				imageUrl: that.activityData.pic || '',
				path: '/activity/registrate_activity/index?id=' + that.activity_id + '&spid=' + that.uid,
			}
		},
		onShareTimeline: function() {
			let that = this;
			that.$set(that, 'actionSheetHidden', !that.actionSheetHidden);
			return {
				title: that.activityData.activity_name || '',
				query: {
					id: that.activity_id,
					spid: that.uid
				},
				imageUrl: that.activityData.pic || ''
			}
		},
		// #endif
		methods: {
			/*判断时间大小*/
			compareTime(time) {
			  var date1 = new Date(time);
			  var date2 = new Date();
			  if (date1 > date2) {
			    return true;
			  } else if (date1 <= date2) {
			    return false;
			  }
			},
			formatDate(date){
				let year = date.getFullYear();
				let month = date.getMonth()+1;  
				let day = date.getDate();
				let H = date.getHours(); 
				let M = date.getMinutes();
				let S = date.getSeconds();  
				month = month < 10 ?'0'+ month : month;  
				day = day < 10 ?'0'+ day : day; 
				H = H < 10 ?'0'+ H : H;
				M = M < 10 ?'0'+ M : M;
				S = S < 10 ?'0'+ S : S;
				return year+'.'+month+'.'+day +'.'+H +':'+M;
			},
			/**
			 * 获取表单数据详情
			 */
			registrateDetail: function() {
				let that = this;
				uni.showLoading()
				registrateDetail(that.activity_id).then(res => {
					uni.hideLoading()
					let data = res.data;
					if(data.activity_related_id){	
						that.disabled = true
						that.getRecordDetail(data.activity_related_id)
					}else{
						that.$set(that, 'activityData', data);
						that.disabled = that.compareTime(data.end_time) ? false : true
						if(that.disabled){
							return this.$util.Tips({
								title: '活动已结束'
							}, {
								tab: 3,
								url: 1
							})
						}
						if(data.systemForm&&data.systemForm.value){
							let formData = that.objToArr(data.systemForm.value)
							that.filterData(formData)
						}else{
							return this.$util.Tips({
								title: '关联表单已被删除'
							}, {
								tab: 3,
								url: 1
							})
						}
					}	
				}).catch(err => {
					uni.hideLoading();
					return this.$util.Tips({
						title: err
					}, {
						tab: 3,
						url: 1
					})
				})
			},
			getRecordDetail(id){
				let that = this
				registrateRecordDetail(id).then(res => {
					uni.hideLoading()
					let data = res.data;
					that.$set(that, 'activityData', data.activity);
					let formData = that.objToArr(data.form_value)
					formData.forEach((item, index)=>{
						for(var i in data.value){
							if(item['key'] == i){
								item.value = data.value[i]
								if(item['name']=='checkboxs' || item['name']=='radios'){
									let valueList = data.value[i].split(',')
									item['wordsConfig']['list'].forEach((list,idx)=>{
										valueList.forEach((val,i)=>{
											if(list['val'] == val){
												item['wordsConfig']['list'][idx]['show'] = true
											}
										})
									})
								}
							}
						}
					})
					function sortNumber(a, b) {
						return a.timestamp - b.timestamp;
					}
					formData.sort(sortNumber);
					that.$set(that, 'formData', formData);
				}).catch(err => {
					uni.hideLoading();
					return that.$util.Tips({
						title: err
					}, {
						tab: 3,
						url: 1
					})
				})
			},
			filterData(formData){
				let that = this;
				formData.forEach((item, index, arr)=>{
					that.$set(item, 'value', "");
					CACHE_CITY[index] = ''; //清空省市区
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
			// 单选
			radioChange(e, index, item){
				this.formData[index].value = item.wordsConfig.list[e.detail.value].val
			},
			clickTextArea() {
				this.$refs.textarea.focus()
			},
			bindDateChange(e, index) {
				this.formData[index].value = e.target.value
				this.$forceUpdate()
			},
			bindTimeChange(e, index) {	
				this.formData[index].value = e.target.value
			},
			bindSelectChange(e, index, item) {
				this.$set(this.formData[index], 'value', item.wordsConfig.list[e.detail.value].val);
			},
			getTimeranges(index){
				this.isShow = true
				this.timerangesIndex = index
			},
			confrim(e){
			  this.isShow = false;
			  this.formData[this.timerangesIndex].value = e.time;
				let arrayNew = [];
				e.val.forEach(item=>{
					arrayNew.push(Number(item))
				})
				this.timeranges = arrayNew;
			},
			cancels(){
				this.isShow = false;
			},
			// 多选
			checkboxChange(e, index, item){
				let obj = e.detail.value;
				let val = '';
				item.wordsConfig.list.forEach((j,jindex)=>{
				  obj.forEach(x=>{
					  if(jindex == x){
					  	val = val +(val?',':'') + j.val;	  
					  }
				  })
				})
				this.formData[index].value = val
			},
			OnAreaAddress(address){
			  let addr = '';
				addr = address.map(v=>v.name).join('/');
			  this.formData[this.timerangesIndex].value = addr;
			  CACHE_CITY[this.timerangesIndex] = address;
			},
			changeRegion(index){
			 if(!this.formData[index].value){
				this.addressInfoArea = [];
			 }
			 this.timerangesIndex = index;
			 this.cityShow = Number(this.formData[index].valConfig.tabVal) + 1;
			 this.display = true;
			 if(CACHE_CITY[index]){
				this.addressInfoArea = CACHE_CITY[index];  
			 }
			},
			// 关闭地址弹窗；
			changeAddressClose: function() {
				this.display = false;
			},
			/**上传文件*/
			uploadpic: function(index) {
			  let that = this;
			  this.$util.uploadImageOne('upload/image', function(res) {
			    that.newImg.push(res.data.path);

			    that.$set(that.formData[index], 'value', that.newImg);
			  });
			},
			/**
			 * 删除图片
			 * 
			 */
			DelPic: function(index, indexs) {
			  let that = this,
			    pic = this.formData[index].value;
			  that.formData[index].value.splice(indexs, 1);
			  that.$set(that.formData[index], 'value', that.formData[index].value);
			},
			/**
			 * 提交修改
			 */
			formSubmit: function(e) {
				let that = this,parmas={};
				if(!that.isLogin){
					toLogin()
				}else{
					for (var i = 0; i < that.formData.length; i++) {
					  let data = that.formData[i]
					  if (['radios'].indexOf(data.name) == -1 && (data.titleShow.val || (['uploadPicture','dateranges'].indexOf(data.name) == -1 && data.value && data.value.trim()))) {
					    if ((data.name === 'texts' && data.valConfig.tabVal == 0) || ['dates','times','selects','citys','checkboxs'].indexOf(data.name) != -1) {
								if (!data.value || (data.value && !data.value.trim())) {
					        return that.$util.Tips({
					          title: `请选择${data.titleConfig.value}`
					        });
					      }
					    }
						if(data.name === 'timeranges'){
							if(!data.value){
								return that.$util.Tips({
								  title: `请选择${data.titleConfig.value}`
								});
							}
						}
						if (data.name === 'dateranges') {
						  if (!data.value.length) {
						    return that.$util.Tips({
						      title: `请选择${data.titleConfig.value}`
						    });
						  }
						}
					    if (data.name === 'texts' && data.valConfig.tabVal == 4) {
					      if (data.value <= 0) {
					        return that.$util.Tips({
					          title: `请填写大于0的${data.titleConfig.value}`
					        });
					      }
					    }
					    if (data.name === 'texts' && data.valConfig.tabVal == 3) {
					      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(data.value)) {
					        return that.$util.Tips({
					          title: `请填写正确的${data.titleConfig.value}`
					        });
					      }
					    }
					    if (data.name === 'texts' && data.valConfig.tabVal == 1) {
					      if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(data.value)) {
					        return that.$util.Tips({
					          title: `请填写正确的${data.titleConfig.value}`
					        });
					      }
					    }
					    if (data.name === 'texts' && data.valConfig.tabVal == 2) {
					      if (!
					        /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/i
					        .test(data.value)) {
					        return that.$util.Tips({
					          title: `请填写正确的${data.titleConfig.value}`
					        });
					      }
					    }
					    if (data.name === 'uploadPicture') {
					      if (!data.value.length) {
					        return that.$util.Tips({
					          title: `请上传${data.titleConfig.value}`
					        });
					      }
					    }
					  }
						parmas[data.key]=data.value
					}	
				}
				uni.showLoading({
					title: '提交中',
					mask: true
				});
				registrateCreate(that.activity_id,parmas).then(res => {
					uni.hideLoading();
					that.isShowbox = true;
				}).catch(err => {
					uni.hideLoading();
					return that.$util.Tips({
						title: err
					});
				});
			},
			/**
			 * 分享打开
			 *
			 */
			listenerActionSheet: function() {
				if (this.isLogin == false) {
					toLogin()
				} else {
					// #ifdef H5
					if (this.$wechat.isWeixin() === true) {
						this.weixinStatus = true;
					}
					// #endif
					this.posters = !this.posters;
				}
			},
			// 分享关闭
			listenerActionClose: function() {
				this.posters = false;
			},
			bindchange(e) {
				this.swiperIndex = e.detail.current;
			},
			async goPoster() {
				var that = this;
				that.posters = false;
				that.posterStatus = true;
				this.isShowbox = false;
				this.$nextTick(() => {
					let selector = uni.createSelectorQuery().select('.aaa');
					selector.fields({
						size: true
					}, data => {
						console.log(data)
						this.wd = data.width
						this.hg = data.height
					}).exec();
				})
				await this.getPosters()
			},
			//获取图片
			async getPosters() {
				let that = this
				let rqData = {
					id: that.activityData.activity_id,
					// #ifdef MP
					type: 'routine',
					// #endif
					// #ifndef MP
					type: 'h5',
					// #endif
				}
				let res = await registratePoster(that.activityData.activity_id)
				that.spreadData = res.data.poster
				that.nickName = res.data.nickname
				// #ifdef MP || APP-PLUS
				let mpUrl = await that.downloadFilestoreImage(res.data.qrcode)
				// #endif
				// #ifdef H5 || APP-PLUS
				let qrCode = await that.imgToBase(res.data.qrcode)
				// #endif
				uni.showLoading({
					title: '海报生成中',
					mask: true
				});
				for (let i = 0; i < res.data.poster.length; i++) {
					let arr2
					// #ifdef MP || APP-PLUS	
					arr2 = [mpUrl, await that.downloadFilestoreImage(res.data.poster[i])]
					// #endif
					// #ifdef H5
					let img = await that.imgToBase(res.data.poster[i])
					arr2 = [qrCode, img]			
					// #endif
					that.$util.userPosterCanvas(arr2, res.data.nickname, res.data.mark, i, that.wd, that.hg, (tempFilePath) => {
						that.$set(that.posterImage, i, tempFilePath);
					});
					uni.hideLoading();
				}		
			},
			async imgToBase(url) {
				let res = await imgToBase({
					image: url
				})
				return res.data.image
			},
			//图片转符合安全域名路径
			downloadFilestoreImage(url) {
				return new Promise((resolve, reject) => {
					let that = this;
					uni.downloadFile({
						url: url,
						success: function(res) {
							resolve(res.tempFilePath);
						},
						fail: function() {
							return that.$util.Tips({
								title: ''
							});
						}
					});
				})
			},
			savePosterPath(url) {
				let that = this;
				// #ifdef MP
				uni.getSetting({
					success(res) {
						if (!res.authSetting['scope.writePhotosAlbum']) {
							uni.authorize({
								scope: 'scope.writePhotosAlbum',
								success() {
									uni.saveImageToPhotosAlbum({
										filePath: url,
										success: function(res) {
											that.$util.Tips({
												title: '保存成功',
												icon: 'success'
											});
										},
										fail: function(res) {
											that.$util.Tips({
												title: '保存失败'
											});
										}
									});
								}
							});
						} else {
							uni.saveImageToPhotosAlbum({
								filePath: url,
								success: function(res) {
									that.$util.Tips({
										title: '保存成功',
										icon: 'success'
									});
								},
								fail: function(res) {
									that.$util.Tips({
										title: '保存失败'
									});
								}
							});
						}
					}
				});
				// #endif
				// #ifdef APP-PLUS
				uni.saveImageToPhotosAlbum({
					filePath: url,
					success: function(res) {
						that.$util.Tips({
							title: '保存成功',
							icon: 'success'
						});
					},
					fail: function(res) {
						that.$util.Tips({
							title: '保存失败'
						});
					}
				});
				// #endif
			},
			// 小程序关闭分享弹窗；
			goFriend: function() {
				this.posters = false;
				// this.H5ShareBox = true
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
		padding-bottom: 150rpx;
		padding-bottom: calc(150rpx + constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		padding-bottom: calc(150rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		min-height: 100vh;
	}
	.personal-data .activity-pic{
		display: flex;
		align-items: center;
		justify-content: center;
		.image{
			width: 100%;
		}	
	}
	.personal-data .wrapper {
		background-color: #fff;
		width: 710rpx;
		border-radius: 16rpx;
		margin: 0 auto;
		position: relative;
		top: -20rpx;
		+.wrapper{
			margin-top: 20rpx;
		}
	}
	.form-wrapper{
		pointer-events: none;
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
	.personal-data .wrapper .disabled{
		pointer-events: none;
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
	.personal-data .wrapper .item.on .discount,
	.personal-data .wrapper .item.on3 .discount{
		width: 460rpx;
		text-align: right;
	}
	.personal-data .wrapper .item .item-select{
		color: #282828;
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
	  width: 450rpx;
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
	.footer{
		background: #ffffff;
		width: 750rpx;
		height: 126rpx;
		height: calc(126rpx + constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		height: calc(126rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		left: 0;
		bottom: 0;
	}
	.personal-data .modifyBnt {
		font-size: 32rpx;
		color: var(--view-theme);
		background-color: #ffffff;
		border: 1px solid var(--view-theme);
		width: 690rpx;
		height: 90rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 90rpx;
		&.disabled{
			color: #ffffff;
			background-color: #BBBBBB;
			border-color: #BBBBBB;
		}
	}
	.success {
		z-index: 10;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, .5);
		}
		.con {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 520rpx;
			height: 526rpx;
			background: #fff;
			border-radius: 10rpx;
			font-size: 34rpx;
			color: #282828;
			image {
				width: 214rpx;
				height: 180rpx;
			}
			.title{
				color: #282828;
				font-size: 32rpx;
				font-weight: bold;
			}
			.text{
				color: #999999;
				font-size: 26rpx;
				margin-top: 30rpx;
			}
			.foot {
				height: 78rpx;
				border-top: 1px solid #EAEAEA;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				position: absolute;
				bottom: 0;
				left: 0;
				.btn{
					color: #999999;
					font-size: 26rpx;	
					width: 50%;
					text-align: center;
					height: 78rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					+.btn{
						color: #E93323;
						position: relative;
						&::before{
							content: "";
							display: block;
							width: 1px;
							height: 78rpx;
							background: #EAEAEA;
							position: absolute;
							left: 0;
							top: 0;
						}
					}
				}
			}
		}
	}
	.generate-posters {
		width: 100%;
		height: 170rpx;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 301;
		transform: translate3d(0, 100%, 0);
		transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
		border-top: 1rpx solid #eee;
	}
	.generate-posters.on {
		transform: translate3d(0, 0, 0);
	}
	.generate-posters .item {
		/* #ifdef H5 */
		flex: 50%;
		/* #endif */
		/* #ifndef H5 */
		flex: 33.33%;
		/* #endif */
		text-align: center;
		font-size: 30rpx;
		&.item3{
			flex: 33.33%;
		}
	}
	.generate-posters .item .iconfont {
		font-size: 80rpx;
		color: #5eae72;
	}
	.generate-posters .item .iconfont.icon-haibao {
		color: #5391f1;
	}
	.generate-posters .item .iconfont.icon-fuzhikouling1 {
		color: #FBB324;
	}
	.distribution-posters{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #a3a3a3;
	}
	.canvas {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	.box {
		width: 100%;
		height: 100%;
		position: relative;
		border-radius: 18rpx;
		overflow: hidden;
		.user-msg {
			position: absolute;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			.user-code {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				justify-content: space-between;
				image {
					width: 100%;
				}
			}
		}
	}
	.img-list {
		margin-right: 40px;
	}
	.distribution-posters swiper {
		width: 100%;
		height: 1000rpx;
		position: relative;
		margin-top: 40rpx;
	}
	.distribution-posters .slide-image {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		border-radius: 15rpx;
	}
	.distribution-posters /deep/.active {
		transform: none;
		transition: all 0.2s ease-in 0s;
	}
	.distribution-posters /deep/ .quiet {
		transform: scale(0.8333333);
		transition: all 0.2s ease-in 0s;
	}
	.distribution-posters .keep {
		font-size: 30rpx;
		color: #fff;
		width: 600rpx;
		height: 80rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 80rpx;
		margin: 38rpx auto;
		background-color: var(--view-theme);
	}
	.share-box {
		z-index: 1000;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
