<template>
	<view class="user_store_attention" :style="viewColor">
		<block v-if="list.length > 0">
			<view class="user_plant_item" v-for="(item,index) in list" :key="index" @click="goHomepage(item)">
				<image :src="(item.focus&&item.focus.avatar) || '/static/images/f.png'" mode=""></image>
				<view v-if="item.focus" class="info">
					<view class="line1">
						<text class="name line1">{{(item.focus && item.focus.nickname) || '用户已注销'}}</text>
					</view>
					<view v-if="item.focus" class="acea-row plant-des">
						<view class="des">
							内容<text>{{(item.focus.count_content<10000&&item.focus.count_content>0) ? item.focus.count_content : item.focus.count_content>1000 ? (item.focus.count_content/10000).toFixed(2)+'万' : 0}}</text>
						</view>
						<view class="des">
							粉丝<text>{{(item.focus.count_fans<10000&&item.focus.count_fans>0) ? item.focus.count_fans : item.focus.count_fans>1000 ? (item.focus.count_fans/10000).toFixed(2)+'万' : 0}}</text>
						</view>
					</view>
					<view class="btn" :class="item.is_fans ? 'focusBtn' : ''" @click.stop="focusToggle(item)">
						<text v-if="item.is_fans" class="iconfont icon-jiahao2"></text>
						{{item.is_fans ? '关注' : '已关注'}}
					</view>
				</view>
			</view>
		</block>
		<view :hidden="!loading" class="acea-row row-center-wrapper loadingicon">
			<text class="iconfont icon-jiazai loading"></text>
		</view>
		<view class="no_content" v-if="list.length == 0 && !loading">
			<view class="count">
				<image src="../static/images/no_attention.png"></image>
				<text>暂未关注任何人哦~</text>
			</view>
		</view>
	</view>
</template>

<script>
	let app = getApp();
	import { mapGetters } from "vuex";
	import { myFocusLst, followAuthorApi } from '@/api/community.js'
	export default{
		data(){
			return {
				list:[],
				isScroll:true,
				loading: false,
				page:1,
				limit:20,
			}
		},
		computed: {
			...mapGetters(['isLogin', 'uid', 'viewColor']),
		},
		onLoad() {
			this.getList()
		},
		mounted: function() {},
		methods:{	
			getList(){
				if(!this.isScroll || this.loading) return
				this.loading = true;
				myFocusLst({
					page:this.page,
					limit:this.limit
				}).then(res=>{
					this.loading = false
					this.isScroll = res.data.list.length>=this.limit
					this.list = this.list.concat(res.data.list)
					this.page+=1
				})
			},
			/*关注*/
			focusToggle(item){
				let status = item.is_fans ? 1 : 0
				followAuthorApi(item.right_id,{status: status}).then(res => {
					if (res.status === 200) {
						item.is_fans = item.is_fans ? false : true
					}
					this.$util.Tips({
						title: res.message
					});
				}).catch(err => {
					this.$util.Tips({
						title: err
					});
				})
			},
			goHomepage(item){
			
				uni.navigateTo({
						url: '/pages/plantGrass/plant_user/index?id='+item.focus.uid
				})
			}
		},
		onReachBottom() {
			this.getList()
		}
	}
</script>

<style lang="scss" scoped>
@import '../style/main.scss';
.focusBtn{
	color: var(--view-theme)!important;
	border-color: var(--view-theme)!important;
}
.no_content,.main{
	min-height: 100vh;
	background: #fff;
	position: relative;
	.count{
		position: absolute;
		text-align: center;
		width: 100%;
		top: 50%;
		margin-top: -300rpx;
		image,uni-image{
			width: 424rpx;
			height: 305rpx;
		}
		text{
			display: block;
			color: #999999;
			font-size: 26rpx;
		}
	}
}
</style>
