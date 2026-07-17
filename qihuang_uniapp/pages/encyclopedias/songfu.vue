<template>
	<view class="page">
		<!-- 顶部搜索栏 -->
		<!-- 内容区：左侧导航 + 右侧列表 -->
		<view class="flex">
			<!-- 左侧导航 -->
			<view class="nav-column">
				<view v-for="(nav, index) in navList" :key="nav.id" class="nav-item"
					:class="{ active: nav.id === activeNavId }" @click="handleNavClick(nav.id)">
					{{ nav.title }}
				</view>
			</view>


			<!-- 右侧内容列表 -->
			<view class="right">
				<view class="main-column">
					<view v-for="(item, index) in mainData[activeNavId]" :key="item.id" class="meridian-item" 
						@click="goNextPage(item.id)">
						<view class="title" :class="item.title.length > 6 ? 'len6' : ''">{{ item.title }}</view>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {


				// 左侧导航数据
				navList: [{
						id: 1,
						title: '十二经脉歌'
					},
					{
						id: 2,
						title: '奇经八脉歌'
					},
					{
						id: 3,
						title: '辩证循经取穴歌'
					},
					{
						id: 4,
						title: '十四经穴歌'
					},
					{
						id: 5,
						title: '十四经穴分寸歌'
					},
					{
						id: 6,
						title: '十四经穴分寸歌'
					},
					{
						id: 7,
						title: '十四经穴分寸歌'
					},
					{
						id: 8,
						title: '十四经穴分寸歌'
					},
					{
						id: 9,
						title: '十四经穴分寸歌'
					},
					{
						id: 10,
						title: '十四经穴分寸歌'
					},
					{
						id: 11,
						title: '十四经穴分寸歌'
					},
					{
						id: 12,
						title: '十四经穴分寸歌'
					},
					{
						id: 13,
						title: '十四经穴分寸歌'
					},
				],

				// 右侧内容数据
				mainData: {
					1: [{
							id: 110,
							title: '手太阴肺经',
							content: '经脉循行路线及主治病症'
						},
						{
							id: 111,
							title: '手阳明大肠经',
							content: '经脉循行路线及主治病症'
						},
						{
							id: 112,
							title: '足阳明胃经',
							content: '经脉循行路线及主治病症'
						},
						{
							id: 113,
							title: '足太阴脾经',
							content: '经脉循行路线及主治病症'
						},
						{
							id: 114,
							title: '手少阴心经',
							content: '经脉循行路线及主治病症'
						},
						{
							id: 115,
							title: '手太阳小肠经',
							content: '经脉循行路线及主治病症'
						},
						{
							id: 116,
							title: '足太阳膀胱经',
							content: '经脉循行路线及主治病症'
						},
						{
							id: 117,
							title: '足少阴肾经',
							content: '经脉循行路线及主治病症'
						},
						{
							id: 118,
							title: '手厥阴心包经',
							content: '经脉循行路线及主治病症'
						},
						{
							id: 119,
							title: '手少阳三焦经',
							content: '经脉循行路线及主治病症'
						},
						{
							id: 120,
							title: '足少阳胆经',
							content: '经脉循行路线及主治病症'
						},
						{
							id: 121,
							title: '足厥阴肝经',
							content: '经脉循行路线及主治病症'
						},
						{
							id: 122,
							title: '脏腑十二经穴起止歌',
							content: '肺起中府止少商，大肠商阳止迎香'
						},
						{
							id: 123,
							title: '任脉歌',
							content: '任脉中行二十四，会阴潜伏二阴间'
						},
						{
							id: 124,
							title: '督脉歌',
							content: '督脉行于脊中央，二十八穴始长强'
						},
					],
					2: [{
							id: 21,
							title: '手少阴心经',
							content: '经脉循行路线及主治病症'
						},
						{
							id: 22,
							title: '手太阳小肠经',
							content: '经脉循行路线及主治病症'
						},
						{
							id: 23,
							title: '足太阳膀胱经',
							content: '经脉循行路线及主治病症'
						},
						{
							id: 24,
							title: '足少阴肾经',
							content: '经脉循行路线及主治病症'
						},
					],
					3: [{
							id: 31,
							title: '手厥阴心包经',
							content: '经脉循行路线及主治病症'
						},
						{
							id: 32,
							title: '手少阳三焦经',
							content: '经脉循行路线及主治病症'
						},
						{
							id: 33,
							title: '足少阳胆经',
							content: '经脉循行路线及主治病症'
						},
						{
							id: 34,
							title: '足厥阴肝经',
							content: '经脉循行路线及主治病症'
						},
					],
					4: [{
							id: 41,
							title: '脏腑十二经穴起止歌',
							content: '肺起中府止少商，大肠商阳止迎香'
						},
						{
							id: 42,
							title: '胃经起于承泣穴',
							content: '胃经承泣厉兑终，四十五穴次第明'
						},
					],
					5: [{
							id: 51,
							title: '任脉歌',
							content: '任脉中行二十四，会阴潜伏二阴间'
						},
						{
							id: 52,
							title: '督脉歌',
							content: '督脉行于脊中央，二十八穴始长强'
						},
					],
				},

				// 当前激活的导航ID
				activeNavId: 1,
			}
		},

		methods: {
			// 导航切换事件
			handleNavClick(navId) {
				this.activeNavId = navId;
			},

			// 跳转详情页
			goNextPage(id) {
				uni.navigateTo({
					url: `./songfuin?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background-color: #EFE9DD;
		min-height: 100vh;
	}

	// 新增：内容区flex布局
	// .flex-container {
	// 	display: flex;
	// }

	// 新增：左侧导航样式
	.nav-column {
		width: 140rpx;
		border-right: 2rpx solid #DBD5C9;
		overflow-y: auto;
		height: 100vh;


		.nav-item {
			width: 60rpx;
			padding: 20rpx 10rpx;
			text-align: center;
			margin: 20rpx auto;
			border-radius: 30rpx;
			// border-bottom: 2rpx solid #eee;

			font-size: 28rpx;
			background-color: #fff;


			&.active {
				background-color: #BDA16F;
				color: #fff;
				font-weight: bold;
			}
		}
	}

	.right{
		width: calc(100% - 160rpx);
	}

	// 新增：右侧内容样式
	.main-column {
		flex: 1;
		padding: 30rpx;
		overflow-y: auto;
		// height: 100vh;
		display: flex;
		flex-wrap: wrap;

		.meridian-item {
			padding-top: 30rpx;
			width: 25%;

			.title {
				width: 90rpx;
				background-color: #fff;
				padding: 20rpx;
				height: 100%;
				display: flex;
				justify-content: center;
				text-align: center;
				max-height: 270rpx;
				min-height: 230rpx;
				border-radius: 30rpx;
				&.len6{
					width: 90rpx;
					padding: 20rpx 10rpx;
					font-size: 26rpx;
				}
			}
		}
	}
</style>