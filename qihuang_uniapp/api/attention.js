import request from "@/utils/request.js";
/**获取礼物列表*/
export function getAttentionLiveList(data) {
  return request.get('getAttentionLiveList', data);
}
// 关注/取消关注
export function attentionLive(data) {
  return request.get('attentionLive', data);
}
//直播列表
export function getLiveList(data) {
  return request.get('getLiveList', data);
}