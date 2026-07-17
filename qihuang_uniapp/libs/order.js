export function goShopDetail(item,uid) {	
	return new Promise(resolve => {
		if (item.product_type === 1) {
			uni.navigateTo({
				url: `/pages/activity/goods_seckill_details/index?id=${item.product_id}&time=${item.stop_time}`
			})
		} else if (item.product_type === 2) {
			uni.navigateTo({
				url: `/pages/activity/presell_details/index?id=${item.activity_id}`
			})
		} else if (item.product_type === 0 || item.product_type === 10) {
			uni.navigateTo({
				url: `/pages/goods_details/index?id=${item.product_id}`
			})	
		}else if (item.product_type === 4) {
			uni.navigateTo({
				url: `/pages/activity/combination_details/index?id=${item.activity_id}`
			})
		}else if (item.product_type === 40) {
			uni.navigateTo({
				url: `/pages/activity/combination_status/index?id=${item.activity_id}`
			})
		}else {
			resolve(item);
		}
	});
}
