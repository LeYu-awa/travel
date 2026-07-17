<template>
  <!-- 个人资料 -->
	<view>
		<form @submit="formSubmit">
			<view class='personal-data' :style="viewColor">
				<view class='list'>
					<view class='item acea-row row-between-wrapper'>
						<view>头像</view>
						<!-- <view class="avatar-box" @click="uploadpic">
							<image :src="userInfo.avatar || '/static/images/f.png'"></image>
						</view> -->
						
						<view class="avatar-box" v-if="!mp_is_new" @click="uploadpic">
							<image :src="userInfo.avatar || '/static/images/f.png'"></image>
						</view>
					</view>
					<view class='item acea-row row-between-wrapper'>
						<view>昵称</view>
						<view class='input acea-row row-between-wrapper'>
							<input type='nickname' name='nickname' v-model='userInfo.nickname' maxlength="16" class='id'></input>
							<!-- <text class='iconfont icon-suozi'></text> -->
						</view>
					</view>
					<view class='item acea-row row-between-wrapper'>
						<view>手机号码</view>
						<navigator url="/pages/users/user_phone/index" hover-class="none" class="input"
							v-if="!userInfo.phone">
							点击绑定手机号<text class="iconfont icon-xiangyou"></text>
						</navigator>
						<view class='input acea-row row-between-wrapper' v-else>
							<input type='text' disabled='true' name='phone' :value='userInfo.phone' class='id'></input>
							<text class='iconfont icon-suozi'></text>
						</view>
					</view>
					<view class='item acea-row row-between-wrapper'>
						<view>ID号</view>
						<view class='input acea-row row-between-wrapper'>
							<input type='text' :value='userInfo.uid' disabled='true' class='id'></input>
							<text class='iconfont icon-suozi'></text>
						</view>
					</view>
					<view class='item acea-row row-between-wrapper'  v-for="(item,index) in userInfo.extend_info" :key="index">
						<view class="acea-row row-middle">{{item.title}}<text v-if="item.is_require==1" class="asterisk iconfont icon-xinghao"></text></view>
						<!-- text -->
						<view class='input' v-if="item.type == 'input'">
							<input type='text' v-model="item.value" :placeholder="item.msg" placeholder-class="placeholder"></input>
						</view>
						<!-- number -->
						<view class='input' v-if="item.type == 'int'">
							<input type='number' v-model="item.value" :placeholder="item.msg" placeholder-class="placeholder"></input>
						</view>
						<!-- email -->
						<view class='input' v-if="item.type == 'email'">
							<input type='text' v-model="item.value" :placeholder="item.msg" placeholder-class="placeholder"></input>
						</view>
						<!-- data -->
						<view class="input acea-row row-middle row-right" v-if="item.type=='date'">
							<picker mode="date" :value="item.value" start="1970-01-01" @change="bindDateChange($event,index)">
								<input type="text" v-model="item.value" :placeholder="item.msg" placeholder-class='placeholder' />
							</picker>
							<text class='iconfont icon-xiangyou'></text>
						</view>
						<!-- id -->
						<view class='input' v-if="item.type == 'id_card'">
							<input type='idcard' v-model="item.value" :placeholder="item.msg" placeholder-class="placeholder"></input>
						</view>
						<!-- phone -->
						<view class='input' v-if="item.type == 'phone'">
							<input type='tel' v-model="item.value" :placeholder="item.msg" placeholder-class="placeholder"></input>
						</view>
						<!-- radio -->
						<view class="input" v-if="item.type=='radio'">
							<radio-group @change="radioChange($event, item)">
								<label class="label" v-for="(itm,idx) in item.content" :key="idx">
									<radio :value="idx.toString()" :checked="item.value == idx.toString()">{{itm}}</radio>
								</label>
							</radio-group>
						</view>
						<!-- address -->
						<view class="input acea-row row-middle row-right" v-if="item.type=='address'">
							<input type='text' v-model="item.value" :placeholder="item.msg" placeholder-class="placeholder"></input>
						</view>
					</view>
				</view>
				<button class='modifyBnt' formType="submit">保存修改</button>
			</view>
		</form>
		<canvas canvas-id="canvas" v-if="canvasStatus"
			:style="{width: canvasWidth + 'px', height: canvasHeight + 'px',position: 'absolute',left:'-100000px',top:'-100000px'}"></canvas>
	</view>
</template>

<script>
	import { getUserSetting, userSettingEdit, editAvatar  } from '@/api/user.js';
	import { toLogin } from '@/libs/login.js';
	import { configMap } from '@/utils';
	import { mapGetters } from "vuex";
	import dayjs from "@/plugin/dayjs/dayjs.min.js";
	export default {
		data() {
			return {
				userInfo: {},
				loginType: 'h5', //app.globalData.loginType
				userIndex: 0,
				canvasWidth: "",
				canvasHeight: "",
				canvasStatus: false,
				mp_is_new: this.$Cache.get('MP_VERSION_ISNEW') || false,
			};
		},
		components: {},
		computed: configMap({open_update_info: 0} ,mapGetters(['isLogin','viewColor','keyColor'])),
		watch: {},
		onLoad() {
			if (this.isLogin) {
				this.getUserSetting();
			}else{
				toLogin()
			}
		},
		onShow() {},
		methods: {
			radioChange(e,item){
				item.value = e.detail.value
			},
			bindDateChange: function(e, index) {
				this.userInfo['extend_info'][index].value = e.detail.value
			},
			/**
			 * 获取用户详情
			 */
			getUserSetting: function() {
				let that = this;
				getUserSetting().then(res => {
					that.$set(that, 'userInfo', res.data);
				});
			},
			/**
			 * 上传文件
			 * 
			 */
			uploadpic: function() {
				let that = this;
				console.log(111)
				// that.canvasStatus = true
				that.$util.uploadImageOne('upload/image', (res) => {
					that.userInfo.avatar = res.data.path;
					// that.canvasStatus = false
					editAvatar({avatar:res.data.path})
				});
			},
			// 微信头像获取
			onChooseAvatar(e) {
				const {
					avatarUrl
				} = e.detail
				this.$util.uploadImgs('upload/image', avatarUrl, (res) => {
					this.userInfo.avatar = res.data.url
				}, (err) => {
					console.log(err)
				})
			},
			/**
			 * 提交修改
			 */
			formSubmit: function(e) {
				let that = this,
				value = e.detail.value;
				if (!value.nickname) return that.$util.Tips({
					title: '用户姓名不能为空'
				});
				value.avatar = this.userInfo.avatar;
				for (var i = 0; i < that.userInfo.extend_info.length; i++) {
					let data = that.userInfo.extend_info[i]
					if (data.is_require || data.value) {
						if (data.type === 'date' || data.type === 'address') {
							if (!data.value) {
								return that.$util.Tips({
									title: `${data.msg}`
								});
							}
						}
						if(data.type === 'input'){
							if (!data.value.trim()) {
								return that.$util.Tips({
									title: `${data.msg}`
								});
							}
						}
						if (data.type === 'int') {
							if (data.value <= 0) {
								return that.$util.Tips({
									title: `${data.msg}`
								});
							}
						}
						if (data.type === 'email') {
							if (data.is_require) {
								if (!data.value) {
									return that.$util.Tips({
										title: `${data.msg}`
									});
								}
							}
							if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(data.value)) {
								return that.$util.Tips({
									title: '请填写正确的邮箱'
								});
							}
						}
						if (data.type === 'phone') {
							if (data.is_require) {
								if (!data.value) {
									return that.$util.Tips({
										title: `${data.msg}`
									});
								}
							}
							if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(data.value)) {
								return that.$util.Tips({
									title: `${data.msg}`
								});
							}
						}
						if (data.type === 'id_card') {
							if (data.is_require) {
								if (!data.value) {
									return that.$util.Tips({
										title: `${data.msg}`
									});
								}
							}
							if (!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/i.test(data.value)) {
								return that.$util.Tips({
									title: '请填写正确的身份证号码'
								});
							}
						}
					}
				}
				value.extend_info = that.userInfo.extend_info;
				editAvatar({
					nickname: this.userInfo.nickname
				})
				userSettingEdit(value).then(res => {
					that.$util.Tips({
						title: res.message,
						icon: 'success'
					});
					setTimeout(()=>{
						uni.switchTab({
							url: '/pages/user/index'
						})
					},500)
				}).catch(msg => {
					return that.$util.Tips({
						title: msg || '保存失败，您并没有修改'
					});
				});
			}
		}
	}
</script>
<style>
	.placeholder{
		color: #ccc;
		font-size: 30rpx;
	}
</style>
<style scoped lang="scss">
	/deep/radio .wx-radio-input.wx-radio-input-checked,
	/deep/uni-radio .uni-radio-input.uni-radio-input-checked {
	 border: 1px solid #19336B !important;
	 background-color: #19336B !important;
	}
	/deep/checkbox .uni-checkbox-input.uni-checkbox-input-checked,
	/deep/checkbox .wx-checkbox-input.wx-checkbox-input-checked {
	  border: 1px solid #19336B !important;
	  background-color: #19336B !important;
	  color: #fff!important;
	}
	.personal-data{
		padding-bottom: 50rpx;
	}
	.dater{
		width: 400rpx;
	}
	.grab{
		color: #ccc !important;
	}
	.asterisk{
		color: red;
		font-size: 20rpx;
		margin-left: 6rpx;
	}
	
	.cartcolor {
		color: #19336B;
		border: 1px solid #19336B;
	}
	.personal-data .wrapper {
		margin: 10rpx 0;
		background-color: #fff;
		padding: 36rpx 30rpx 13rpx 30rpx;
	}
	.personal-data .wrapper .title {
		margin-bottom: 30rpx;
		font-size: 32rpx;
		color: #282828;
	}
	.personal-data .wrapper .wrapList .item {
		width: 690rpx;
		height: 160rpx;
		background-color: #f8f8f8;
		border-radius: 20rpx;
		margin-bottom: 22rpx;
		padding: 0 30rpx;
		position: relative;
		border: 2rpx solid #f8f8f8;
		box-sizing: border-box;
	}
	.personal-data .wrapper .wrapList .item.on {
		border-color: #e93323;
		border-radius: 20rpx;
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArIAAACgCAYAAADw+I85AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0QzNkY3NzlCNzJCMTFFOTgyNEU4QzhGQTRFRUY2REQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0QzNkY3N0FCNzJCMTFFOTgyNEU4QzhGQTRFRUY2REQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozRDM2Rjc3N0I3MkIxMUU5ODI0RThDOEZBNEVFRjZERCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozRDM2Rjc3OEI3MkIxMUU5ODI0RThDOEZBNEVFRjZERCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pn3rJMAAAArUSURBVHja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");
		background-size: 100% 100%;
		background-color: #fff9f9;
		background-repeat: no-repeat;
	}
	.personal-data .wrapper .wrapList .item .picTxt {
		width: 445rpx;
	}
	.personal-data .wrapper .wrapList .item .picTxt .pictrue {
		width: 96rpx;
		height: 96rpx;
		position: relative;
	}
	.personal-data .wrapper .wrapList .item .picTxt .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.personal-data .wrapper .wrapList .item .picTxt .pictrue .alter {
		width: 30rpx;
		height: 30rpx;
		border-radius: 50%;
		position: absolute;
		bottom: 0;
		right: 0;
	}
	.personal-data .wrapper .wrapList .item .picTxt .text {
		width: 325rpx;
	}
	.personal-data .wrapper .wrapList .item .picTxt .text .name {
		width: 100%;
		font-size: 30rpx;
		color: #282828;
	}
	.personal-data .wrapper .wrapList .item .picTxt .text .phone {
		font-size: 24rpx;
		color: #999;
		margin-top: 10rpx;
	}
	.personal-data .wrapper .wrapList .item .bnt {
		font-size: 24rpx;
		background-color: #fff;
		border-radius: 27rpx;
		width: 140rpx;
		height: 54rpx;
		border: 2rpx solid #e93323;
	}
	.personal-data .wrapper .wrapList .item .currentBnt {
		position: absolute;
		right: 0;
		top: 0;
		font-size: 26rpx;
		background-color: rgba(233, 51, 35, 0.1);
		width: 140rpx;
		height: 48rpx;
		border-radius: 0 20rpx 0 20rpx;
	}
	.personal-data .list {
		margin-top: 15rpx;
		background-color: #fff;
	}
	.personal-data .list .item {
		padding: 30rpx 30rpx 30rpx 0;
		border-bottom: 1rpx solid #f2f2f2;
		margin-left: 30rpx;
		font-size: 30rpx;
		color: #282828;
		.label{
			margin-right: 30rpx;
		}
	}
	.personal-data .list .item .phone {
		width: 160rpx;
		height: 56rpx;
		font-size: 24rpx;
		color: #fff;
		line-height: 56rpx;
		border-radius: 32rpx
	}
	.personal-data .list .item .pictrue {
		width: 88rpx;
		height: 88rpx;
	}
	.personal-data .list .item .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.personal-data .list .item .input {
		width: 460rpx;
		text-align: right;
		color: #cccccc;
		input{
			text-align: right;
		}
		.picker{
			width: 400rpx;
		}
	}
	.personal-data .list .item .input .id {
		width: 414rpx;
	}
	.personal-data .list .item .input .iconfont {
		font-size: 28rpx;
		color: #cccccc;
		margin-left: 10rpx;
	}
	.personal-data .modifyBnt {
		font-size: 32rpx;
		color: #fff;
		width: 690rpx;
		height: 90rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 90rpx;
		margin: 76rpx auto 0 auto;
		background: linear-gradient(180.00deg, rgba(67, 106, 188, 1), rgba(42, 55, 99, 1) 100%);
	}
	.personal-data .logOut {
		font-size: 32rpx;
		text-align: center;
		width: 690rpx;
		height: 90rpx;
		border-radius: 45rpx;
		margin: 30rpx auto 0 auto;
	}
	.avatar-box {
		width: 96rpx;
		height: 96rpx;
		image {
			width: 100%;
			height: 100%;
			border-radius: 50%;
			border: 1px solid #eee;
		}
	}
</style>
