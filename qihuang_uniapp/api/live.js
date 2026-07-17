import request from "@/utils/request.js";

 // 获取专科直播预约列表 
export function getLiveAppointmentList(data) {
	return request.get("getLiveAppointmentList", data);
}


 // 获取预约详情 
export function getAppointmentDetail(data) {
	return request.get("getAppointmentDetail", data);
}

 //  获取用户预约列表 
export function getUserAppointmentList(data) {
	return request.get("getUserAppointmentList", data);
}

 //  使用预约码 
export function appointmentWithInviteCode(data) {
	return request.get("appointmentWithInviteCode", data);
}
 //  取消预约码 
export function cancelAppointment(data) {
	return request.get("cancelAppointment", data);
}
