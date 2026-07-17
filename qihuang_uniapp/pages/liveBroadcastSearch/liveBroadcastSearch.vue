<template>
	<view>
		<view class='searchGood'>
			<view class='search acea-row row-between-wrapper'>
				<view class='input acea-row row-between-wrapper'>
					<text class='iconfont icon-sousuo2'></text>
					<input 
					type='text'
					 v-model='searchValue' 
					 :focus="focus" 
					 placeholder='点击搜索商品、店铺名称' 
					 placeholder-class='placeholder'
					 @input="setValue" 
					 @focus="onfocus"
					 @blur="onblur"
					 ></input>
				</view>
				<view class='bnt' @tap='searchBut'>搜索</view>
			</view>
			<view class="history-view" v-if="focus">
				<view class="history-view-box">
					<view class='title'>历史记录 <text class="iconfont icon-shanchu" @click="remove"></text></view>
					<view class='list acea-row' :style="{'height':historyBox?'auto':'150rpx'}" v-if="historyList.length > 0">
						<block v-for="(item,index) in historyList" :key="index">
							<view class='item line1' @click='setHotSearchValue(item)'>{{item}}</view>
						</block>
					</view>
					<view>
						<view class="more-btn" v-if="historyList.length>9 && !historyBox" @click="historyBox = true">
							展开全部<text class="iconfont icon-xiangxia"></text>
						</view>
						<view class="more-btn" v-if="historyList.length>9 && historyBox" @click="historyBox = false">
							收起<text class="iconfont icon-xiangshang"></text>
						</view>
					</view>
					<view v-if="historyList.length == 0" style="text-align: center; color: #999;">暂无搜索历史~</view>
				</view>
			</view>
			<view class="content">
				<itemCom :list="list"></itemCom>
			</view>
		</view>
	</view>
</template>

<script>
	import itemCom from '../liveBroadcast/component/itemCom.vue';
	import { getLiveList } from '@/api/liveBroadcast.js'
	export default {
		components: {
		  itemCom
		},
		data() {
			return {
				historyBox: false,
				searchValue:'',
				focus: true,
				historyList:['测试'],
				list:[]
			};
		},
		methods: {
		  setValue() {
		    // this.getLiveList()
		  },
		  searchBut(){
			this.getLiveList()
		  },
		  remove(){
			  
		  },
		  setHotSearchValue(data){
			  console.log(data,'----data--')
			  this.searchValue = data
			  this.getLiveList()
		  },
		  onfocus(e){
			  this.focus = true
		  },
		  onblur(e){
			  this.focus = false
		  },
		  getLiveList(){
		  	getLiveList({name:this.searchValue}).then(res=>{
		  		this.list = res.data
		  	})
		  }
		}
	}
</script>
<style>
	page {
		background-color: #fff;
	}
</style>
<style scoped lang="less">
.searchGood .search {
		padding-left: 30rpx;
	}
	.searchGood .search {
		margin-top: 20rpx;
	}
	.searchGood .search .input {
		width: 598rpx;
		background-color: #f7f7f7;
		border-radius: 33rpx;
		padding: 0 35rpx;
		box-sizing: border-box;
		height: 66rpx;
	}
	.searchGood .search .input input {
		width: 472rpx;
		font-size: 28rpx;
	}
	.searchGood .search .input .placeholder {
		color: #bbb;
	}
	.searchGood .search .input .iconfont {
		color: #000;
		font-size: 35rpx;
	}
	.searchGood .search .bnt {
		width: 120rpx;
		text-align: center;
		height: 66rpx;
		line-height: 66rpx;
		font-size: 30rpx;
		color: #282828;
	}
	.searchGood .title {
		position: relative;
		font-size: 28rpx;
		color: #282828;
		margin: 50rpx 30rpx 25rpx 30rpx;
		.icon-shanchu {
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			color: #999;
		}
	}
	.searchGood .list {
		padding: 0 10rpx;
		overflow: hidden;
	}
	.searchGood .list .item {
		font-size: 26rpx;
		color: #666;
		padding: 0 21rpx;
		height: 60rpx;
		background: rgba(242, 242, 242, 1);
		border-radius: 22rpx;
		line-height: 60rpx;
		margin: 0 0 20rpx 20rpx;
		max-width: 150rpx;
	}
	.searchGood .line {
		border-bottom: 1rpx solid #eee;
		margin: 20rpx 30rpx 0 30rpx;
	}
	.more-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 0 20rpx 20rpx;
		height: 60rpx;
		font-size: 24rpx;
		color: #999;
		.iconfont {
			font-size: 22rpx;
			margin-left: 10rpx;
		}
	}
	.history-view{
		position: relative;
		.history-view-box{
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 999;
			background: #fff;
			box-shadow: 0rpx 8rpx 8rpx 0rpx rgba(0,0,0,0.05);
		}
	}
	.content{
		padding: 30rpx 39rpx ;
		box-sizing: border-box;
	}
</style>
