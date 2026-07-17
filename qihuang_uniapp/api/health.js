import request from "@/utils/request.js";

// 获取症状列表
export function getSymptoms(data) {
	return request.get("getSymptoms", data);
}

// 获取专科直播预约列表
export function getLiveAppointmentList(data) {
	return request.get("getLiveAppointmentList", data);
}
//获取身体部位列表 
export function getBodyParts(data) {
	return request.get("getBodyParts", data);
}
// 获取健康视频课程列表 (getVideoCourses)
export function getVideoCourses(data) {
	return request.get("getVideoCourses", data);
}


//  创建健康视频订单接口 
export function createHealthVideoOrder(data) {
	return request.post("createHealthVideoOrder", data);
}

// 获取健康视频订单列表接口
export function getHealthVideoOrderList(data) {
	return request.get("getHealthVideoOrderList", data);
}

// 直播分类
export function getLiveTypeList(data) {
	return request.get("getLiveTypeList", data);
}
//  创建直播订单接口 
export function createAppointmentOrder(data) {
	return request.get("createAppointmentOrder", data);
}

//  更新/创建观看进度 
export function updateVideoProgress(data) {
	return request.post("updateVideoProgress", data);
}


