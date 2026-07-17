<template>
	<view class="user_store_attention" :style="viewColor">
		<block v-if="list.length >0">
			<view class="user_plant_item" v-for="(item,index) in list" :key="index" @click="goHomepage(item)">
				<image :src="(item.fans && item.fans.avatar) || '/static/images/f.png'" mode=""></image>
				<view class="info">
					<view class="line1">
						<text class="name line1">{{(item.fans && item.fans.nickname) || '用户已注销'}}</text>	
					</view>
					<view v-if="item.fans" class="acea-row plant-des">
						<view class="des">
							内容<text>{{(item.fans.count_content<10000&&item.fans.count_content>0) ? item.fans.count_content : item.fans.count_content>1000 ? (item.fans.count_content/10000).toFixed(2)+'万' : 0}}</text>
						</view>
						<view class="des">
							粉丝<text>{{(item.fans.count_fans<10000&&item.fans.count_fans>0) ? item.fans.count_fans : item.fans.count_fans>1000 ? (item.fans.count_fans/10000).toFixed(2)+'万' : 0}}</text>
						</view>
					</view>
					<view  @click.stop="focusToggle(item)" class="btn" :class="item.is_start ? '' : 'focusBtn'">
						<text v-if="!item.is_start" class="iconfont icon-jiahao2"></text>
						{{item.is_start ? '已关注' : '关注'}}
					</view>
				</view>
			</view>
		</block>
		<view :hidden="!loading" class="acea-row row-center-wrapper loadingicon">
			<text class="iconfont icon-jiazai loading"></text>
		</view>
		<view class="no_content" v-if="list.length == 0 && !loading">
			<view class="count">
				<image src="../static/images/no_fans.png"></image>
				<text>你还没有粉丝哦~</text>
			</view>
		</view>
	</view>
</template>

<script>
	let app = getApp();
	import { mapGetters } from "vuex";
	import { myFansLst, followAuthorApi } from '@/api/community.js'
	export default{
		data(){
			return {
				list:[],
				isScroll:true,
				page:1,
				limit:20,
				loading: false,
			}
		},
		computed: {
			...mapGetters(['isLogin', 'uid', 'viewColor']),
		},
		onLoad() {
			this.getList()
		},
		onReady(){},
		mounted: function() {},
		methods:{	
			getList(){
				if(!this.isScroll || this.loading) return
				this.loading = true;
				myFansLst({
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
				let status = item.is_start ? 0 : 1
				followAuthorApi(item.left_id,{status: status}).then(res => {
					if (res.status === 200) {
						item.is_start = item.is_start ? false : true
					}
					this.$util.Tips({
						title: res.message
					});
				}).catch((err)=>{
					this.$util.Tips({
						title: err
					});
				})
			}
		},
		onReachBottom() {
			this.getList()
		}
	}
</script>

<style lang="scss" acoped>
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
