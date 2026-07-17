import request from "@/utils/request.js";

// 点赞
export function toggleCommunityLike(data) {
	return request.post("toggleCommunityLike", data);
}

// 关注用户
export function followUser(data) {
	return request.post("followUser", data);
}

// 取消关注
export function unfollowUser(data) {
	return request.post("unfollowUser", data);
}
// 获取是否关注
export function getFollowStatus(data) {
	return request.get("getFollowStatus", data);
}