import request from "@/utils/request.js";
/**获取直播分类*/
export function getLiveTypeList(data) {
  return request.get('getLiveTypeList', data, { noAuth: true });
}
/**获取直播间列表*/
export function getLiveList(data) {
  return request.get('getLiveList', data, { noAuth: true });
}
/**获取轮播图*/
export function getCarouselImage(data) {
  return request.get('getCarouselImage', data, { noAuth: true });
}
/**获取直播间信息*/
export function getLiveData(data) {
  return request.get('getLiveData', data);
}
/**关注/取消关注*/
export function attentionLive(data) {
  return request.get('attentionLive', data);
}
/**获取直播商品列表*/
export function getLiveGoods(data) {
  return request.post('getLiveGoods', data);
}
/**获取消息*/
export function getChat(data) {
  return request.get('getChat', data);
}
/**发送消息*/
export function sendChat(data) {
  return request.get('sendChat', data);
}
/**获取礼物列表*/
export function getGiftList(data) {
  return request.get('getGiftList', data);
}
/**预约/取消预约*/
export function reservation(data) {
  return request.get('reservation', data);
}

/*获取副播列表*/
export function getLiveManage(data) {
  return request.get('getLiveManage', data);
}

/*副播处罚*/
export function sanction(data) {
  return request.get('sanction', data);
}
/*获取副播查看商品列表*/
export function getManageGoods(data) {
  return request.get('getManageGoods', data);
}
/*兑换码进入直播间*/
export function getLiveByCode(data) {
  return request.get('getLiveByCode', data);
}

/*查询投诉列表*/
export function getLiveReportList(data) {
  return request.get('getReportTerm', data);
}

/*投诉*/
export function liveReport(data) {
  return request.post('liveReport', data);
}

//直播间在线观众列表
export function getUserList(data) {
  return request.get('getUserList', data);
}
//获取在线观众用户详情
export function getUserDetails(data) {
  return request.get('getUserDetails', data);
}

//获取直播播放器配置
export function getLivePlayerConfig() {
  return request.get('getLivePlayerConfig');
}