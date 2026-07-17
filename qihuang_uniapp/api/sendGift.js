import request from "@/utils/request.js";
/**获取送礼记录*/
export function getGiftLog(data) {
  return request.get('getGiftLog', data);
}
