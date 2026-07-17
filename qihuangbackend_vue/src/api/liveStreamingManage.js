import request from './request'

/**
 * @description 获取礼物列表
 */
export function getGift(data) {
  return request.post('community/topic/getGift', data)
}

/**
 * @description 添加礼物
 */
export function addGift(data) {
  return request.get('community/topic/addGift', data)
}
/**
 * @description 删除礼物
 */
export function delGift(data) {
  return request.get('community/topic/deleteGift', data)
}
/**
 * @description 编辑礼物
 */
export function editGift(data) {
  return request.get('community/topic/editGift', data)
}
/**
 * @description 获取直播间分类列表
 */
export function getLiveType(data) {
  return request.get('community/topic/getLiveType', data)
}
/**
 * @description 获取直播间列表
 */
export function getLiveList(data) {
  return request.post('community/topic/getLiveList', data)
}
/**
 * @description 获取活动列表
 */
export function getActivityList(data) {
  return request.get('activity/form/lst', data)
}

/**
 * @description 添加直播间
 */
export function addLive(data) {
  return request.post('community/topic/addLive', data)
}
/**
 * @description 编辑直播间
 */
export function editLive(data) {
  return request.post('community/topic/editLive', data)
}

/**
 * @description 修改直播间状态
 */
export function changeLiveInfo(data) {
  return request.get('community/topic/changeLiveInfo', data)
}
/**
 * @description 直播间详情
 */
export function getLiveDetails(data) {
  return request.post('community/topic/getLiveDetails', data)
}

/**
 * @description 删除直播
 */
export function deleteLive(data) {
  return request.get('community/topic/deleteLive', data)
}

/**
 * @description 去直播
 */
export function goLive(data) {
  return request.get('community/topic/goLive', data)
}

/**
 * @description 投诉列表
 */
export function getLiveReportList(data) {
  return request.post('community/topic/getLiveReportList', data)
}

/**
 * @description 获取副播列表
 */
export function getPermission(data) {
  return request.get('community/topic/getPermission', data)
}

/**
 * @description 添加副播
 */
export function addPermission(data) {
  return request.get('community/topic/addPermission', data)
}

/**
 * @description 删除副播
 */
export function deletePermission(data) {
  return request.get('community/topic/deletePermission', data)
}

/**
 * @description 获取直播配置列表
 */
export function getLiveSettingList(data) {
  return request.get('community/live_setting/lst', data)
}

/**
 * @description 保存直播配置
 */
export function saveLiveSetting(data) {
  return request.post('community/live_setting/save', data)
}

/**
 * @description 获取直播回放列表
 */
export function getLiveReplayList(data) {
  return request.get('community/topic/getLiveReplayList', data)
}

/**
 * @description 保存回放开关设置
 */
export function saveReplaySetting(data) {
  return request.post('community/topic/saveReplaySetting', data)
}

/**
 * @description 获取回放开关设置
 */
export function getReplaySetting() {
  return request.get('community/topic/getReplaySetting')
}
