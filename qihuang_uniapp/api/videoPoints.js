import request from "@/utils/request.js";
//积分配置
export function getVideoConfig(data) {
  return request.get('getVideoConfig', data);
}
//获取视频积分
export function getRewardByVide(data) {
  return request.get('getRewardByVide', data);
}
