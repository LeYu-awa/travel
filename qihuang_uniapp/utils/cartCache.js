import { CART_TIME,CART_ID} from '@/config/cache';
import Cache from '../utils/cache';
export function checkCart() {
	let cartTime = 0
	if(Cache.get(CART_TIME)){
		let time = Cache.get(CART_TIME)
		cartTime = time + (2 * 60 * 60 * 1000); // 计算两个小时之后的时间戳
	}
	let newTime = Date.now();
	if (cartTime < newTime) {
		Cache.clear(CART_ID);
		Cache.clear(CART_TIME);
		return false;
	} else {
		return true;
	}
}