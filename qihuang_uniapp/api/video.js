import request from "@/utils/request.js";
/**
 * 直播列表
 */
export function GetLiveListApi(data) {
	return request.get(`getLiveList`, data, { login: false,noAuth: true });
}
/**
 * 直播信息
 */
export function GetLiveShowUrlApi(data) {
	return request.get(`getLiveData`, data, { login: false,noAuth: true });
}

