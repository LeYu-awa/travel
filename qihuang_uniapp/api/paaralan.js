import request from "@/utils/request.js";

/**
 * 获取课程分类列表接口
 * 
 */
export function getTypeList(data) {
	return request.get('getTypeList', data);
}

/**
 * 获取首页显示分类列表
 * 
 */
export function getLessonTypeShowList(data) {
	return request.get('getLessonTypeShowList', data);
}

/**
 * 获取收藏列表
 * 
 */
export function getCollectionList(data) {
	return request.get('getCollectionList', data);
}

/**
 * 获取浏览记录列表
 * 
 */
export function getSubjectViewList(data) {
	return request.get('getSubjectViewList', data);
}

/**
 * 获取最近一次浏览记录
 * 
 */
export function getLastSubjectView(data) {
	return request.get('getLastSubjectView', data);
}

/**
 * 获取专题详情、素材和支付状态
 * 
 */
export function getSubjectDetailWithMaterials(data) {
	return request.get('getSubjectDetailWithMaterials', data);
}

/**
 * 收藏/取消收藏专题
 * 
 */
export function toggleSubjectCollection(data) {
	return request.get('toggleSubjectCollection', data);
}

/**
 * 获取导航栏及其关联课程列表
 * 
 */
export function getNavList(data) {
	return request.get('getNavList', data);
}

/**
 * 根据分类ID获取课程列表-type_id=2
 * 
 */
export function getSubjectListByType(data) {
	return request.get('getSubjectListByType', data);
}



/**
 * 清空/删除收藏记录接口
 * 
 */
export function clearSubjectCollectionList(data) {
	return request.get('clearSubjectCollectionList', data);
}


/**
 * 清空/删除浏览记录接口
 * 
 */
export function clearCollectionList(data) {
	return request.post('clearCollectionList', data);
}

/**
 * 记录用户浏览课程专题
 * 
 */
export function addSubjectView(data) {
	return request.get('addSubjectView', data);
}