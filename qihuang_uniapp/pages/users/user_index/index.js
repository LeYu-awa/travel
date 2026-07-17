export default function(){
	const countList = [
		{label: '粉丝', key: 'followers_count', url: '/pages/users/concern/index?type=followers'},
		{label: '关注', key: 'following_count', url: '/pages/users/concern/index?type=following'},
		{label: '点赞', key: 'likes_count', url: ''},
		{label: '收藏', key: 'collections_count', url: ''},
	]
	const categoryList = [
		{ label: '商品订单', icon: 'icon-dingdan1', url: '/pages/users/order_list/index?status=-1'},
		{ label: '视频直播订单', icon: 'icon-15', url: '/pages/users/liveOrders/index'},
		{ label: '我的卡包', icon: 'icon-kabao', url: '/pages/users/card/index'},
		{ label: '积分中心', icon: 'icon-jifen', url: '/pages/users/user_integral/index'},
		{ label: '地址管理', icon: 'icon-dizhiguanli', url: '/pages/users/user_address_list/index'},
		{ label: '我的团队', icon: 'icon-tuandui', url: '/pages/users/promoter-list/index'},
		{ label: '我的提现', icon: 'icon-tixian', url: '/pages/users/user_cash/index'},
		{ label: '分享海报', icon: 'icon-fenxiang', url: ''},
		{ label: '更多功能', icon: 'icon-gengduo', url: ''},
	]
	const tabList = [
		{label: '作品', key: 'works'},
		// {label: '推荐', key: 'recommend'},
		// {label: '收藏', key: 'collect'},
		// {label: '喜欢', key: 'like'},
	]
	return {
		countList,
		categoryList,
		tabList
	}
}