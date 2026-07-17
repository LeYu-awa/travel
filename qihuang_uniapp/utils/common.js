export const goNextPage = (url) => {
	uni.navigateTo({
		url
	})
}
// 日期格式化
export function format(timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
  // 处理秒级时间戳
  if (timestamp.toString().length === 10) {
    timestamp *= 1000;
  }
  
  const date = new Date(timestamp);
  
  // 获取时间各部分
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  // 替换格式字符串
  return format
    .replace('YYYY', year)
    .replace('MM', month.toString().padStart(2, '0'))
    .replace('DD', day.toString().padStart(2, '0'))
    .replace('HH', hours.toString().padStart(2, '0'))
    .replace('mm', minutes.toString().padStart(2, '0'))
    .replace('ss', seconds.toString().padStart(2, '0'));
}