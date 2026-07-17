import request from './request'

/**
 * @description 添加兑换码活动
 */
export function addCodeActivity(data) {
  return request.post('community/topic/addCodeActivity', data)
}

/**
 * @description 获取兑换码活动列表
 */
export function getCodeActivityList(data) {
  return request.get('community/topic/getCodeActivityList', data)
}

/**
 * @description 兑换码列表
 */
export function getCodeList(data) {
  return request.post('community/topic/getCodeList', data)
}

/**
 * @description 激活/取消激活
 */
export function codeActivation(data) {
  return request.get('community/topic/codeActivation', data)
}


/**
 * @description 删除兑换码活动
 */
export function deleteCodeActivity(data) {
  return request.get('community/topic/deleteCodeActivity', data)
}


