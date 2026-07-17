import request from "@/utils/request.js";

/**获取经络穴位列表*/
export function acupointGroupList(data) {
  return request.get('acupointGroupList', data);
}
/**获取经络穴位详情*/
export function acupointDetail(data) {
  return request.get('acupointDetail', data);
}
/**根据病症分类查询病症列表*/
export function diseaseListByCategory(data) {
  return request.get('diseaseListByCategory', data);
}
// 获取病症分类列表
export function diseaseCategoryList(data) {
  return request.get('diseaseCategoryList', data);
}
// 获取病症详情
export function diseaseDetail(data) {
  return request.get('diseaseDetail', data);
}
//获取董氏奇穴分类
export function dongCategoryList(data) {
  return request.get('dongCategoryList', data);
}

//董氏奇穴分组
export function dongPointGroupList(data) {
  return request.get('dongPointGroupList', data);
}
//获取董氏奇穴详情
export function dongPointDetail(data) {
  return request.get('dongPointDetail', data);
}


//获取药膳列表
export function medicinalDietList(data) {
  return request.get('medicinalDietList', data);
}

//获取药膳详情
export function medicinalDietDetail(data) {
  return request.get('medicinalDietDetail', data);
}

//获取药膳功效列表
export function medicinalDietEfficacyList(data) {
  return request.get('medicinalDietEfficacyList', data);
}

//获取药食材功效分类
export function medicineFoodEfficacyCategoryList(data) {
  return request.get('medicineFoodEfficacyCategoryList', data);
}

//获取药食材列表
export function foodList(data) {
  return request.get('foodList', data);
}
//获取药食材详情
export function foodDetail(data) {
  return request.get('foodDetail', data);
}


//获取药食材品类列表
export function foodCategoryList(data) {
  return request.get('foodCategoryList', data);
}


//获取医家列表
export function doctorList(data) {
  return request.get('doctorList', data);
}

//获取医家详情
export function doctorDetail(data) {
  return request.get('doctorDetail', data);
}

//获取术语列表
export function termList(data) {
  return request.get('termList', data);
}

//获取术语详情
export function termDetail(data) {
  return request.get('termDetail', data);
}


//查询书籍列表
export function searchBookList(data) {
  return request.get('searchBookList', data);
}
//查询书籍详情
export function bookDetail(data) {
  return request.get('bookDetail', data);
}
//查询书籍章节详情
export function getBookCatalogDetail(data) {
  return request.get('getBookCatalogDetail', data);
}

//全局收藏
export function toggleCollection(data) {
  return request.post('toggleCollection', data);
}

//热门搜索
export function searchStatTop(data) {
  return request.get('searchStatTop', data);
}

//关键字搜索
export function globalSearch(data) {
  return request.get('globalSearch', data);
}

//是否收藏
export function isCollected(data) {
  return request.get('isCollected', data);
}

//其他 - 分类
export function otherArticleCategoryList(data) {
  return request.get('otherArticleCategoryList', data);
}
//其他 - 分类 - 详情
export function otherArticleCategoryDetail(data) {
  return request.get('otherArticleCategoryDetail', data);
}

//其他 - 关键字 - 详情
export function otherArticleDetail(data) {
  return request.get('otherArticleDetail', data);
}