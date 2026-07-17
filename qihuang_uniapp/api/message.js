import request from "@/utils/request.js";

 // 获取系统消息列表 
export function getSystemMessageList(data) {
	return request.get("getSystemMessageList", data);
}
 // 获取互动消息列表 
export function getInteractiveMessages(data) {
	return request.get("getInteractiveMessages", data);
}

 // 标记系统消息为已读 
export function markSystemMessageAsRead(data) {
	return request.post("markSystemMessageAsRead", data);
}

 // 获取系统消息列表最新一条数据 
export function getLatestSystemMessage(data) {
	return request.get("getLatestSystemMessage", data);
}
