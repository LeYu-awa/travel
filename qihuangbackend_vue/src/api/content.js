import request from "./request";

/**
 * @description 内容  --  课程管理 -- 课程分类 -- 列表
 */
export function getLessonList(data) {
  return request.get("community/topic/getLessonList", data);
}

/**
 * @description 内容  --  课程管理 -- 课程分类 -- 编辑
 */
export function editLesson(data) {
  return request.get("community/topic/editLesson", data);
}

/**
 * @description 内容  --  课程管理 -- 课程分类 -- 删除
 */
export function deleteLesson(id) {
  return request.get("community/topic/deleteLesson?id=" + id);
}

/**
 * @description 内容  --  课程管理 -- 课程分类 -- 添加
 */
export function addLesson(data) {
  return request.get("community/topic/addLesson", data);
}


/**
 * @description 内容  --  课程管理 -- 课程素材 -- 列表
 */
export function materialList(data) {
  return request.get("community/topic/materialList", data);
}

/**
 * @description 内容  --  课程管理 -- 课程素材 -- 编辑
 */
export function materialEdit(data) {
  return request.post("community/topic/materialEdit/"+ data.id, data);
}

/**
 * @description 内容  --  课程管理 -- 课程素材 -- 删除
 */
export function materialDelete(id) {
  return request.post("community/topic/materialDelete/" + id);
}

/**
 * @description 内容  --  课程管理 -- 课程素材 -- 添加
 */
export function materialAdd(data) {
  return request.post("community/topic/materialAdd", data);
}

/**
 * @description 内容  --  课程管理 -- 专题 -- 列表
 */
export function getLessonSubjectList(data) {
  return request.get("community/topic/getLessonSubjectList", data);
}
/**
 * @description 内容  --  课程管理 -- 专题 -- 详情
 */
export function getLessonSubjectDetail(id) {
  return request.get("community/topic/getLessonSubjectDetail/" + id);
}

/**
 * @description 内容  --  课程管理 -- 专题 -- 新增
 */
export function addLessonSubject(data) {
  return request.post("community/topic/addLessonSubject", data);
}

/**
 * @description 内容  --  课程管理 -- 专题 -- 修改
 */
export function editLessonSubject(data, id) {
  return request.post("community/topic/editLessonSubject/" + id, data);
}

/**
 * @description 内容  --  课程管理 -- 专题 -- 删除
 */
export function deleteLessonSubject(id) {
  return request.post("community/topic/deleteLessonSubject/" + id);
}

/**
 * @description 内容  --  百科管理 -- 术语 -- 列表
 */
export function termList(data) {
  return request.get("community/topic/termList", data);
}

/**
 * @description 内容  --  百科管理 -- 术语 -- 编辑
 */
export function termEdit(data) {
  return request.post("community/topic/termEdit/" + data.id, data);
}

/**
 * @description 内容  --  百科管理 -- 术语 -- 删除
 */
export function termDelete(id) {
  return request.post("community/topic/termDelete/" + id);
}

/**
 * @description 内容  --  百科管理 -- 术语 -- 添加
 */
export function termAdd(data) {
  return request.post("community/topic/termAdd", data);
}

/**
 * @description 内容  --  百科管理 -- 医书 -- 列表
 */
export function bookList(data) {
  return request.get("community/topic/bookList", data);
}

/**
 * @description 内容  --  百科管理 -- 医书 -- 编辑
 */
export function bookEdit(data) {
  return request.post("community/topic/bookEdit/" + data.id, data);
}

/**
 * @description 内容  --  百科管理 -- 医书 -- 删除
 */
export function bookDelete(id) {
  return request.post("community/topic/bookDelete/" + id);
}

/**
 * @description 内容  --  百科管理 -- 医书 -- 添加
 */
export function bookAdd(data) {
  return request.post("community/topic/bookAdd", data);
}

/**
 * @description 内容  --  百科管理 -- 医书 -- 目录 -- 列表
 */
export function bookCatalogList(data) {
  return request.get("community/topic/bookCatalogList", data);
}

/**
 * @description 内容  --  百科管理 -- 医书 -- 目录 -- 编辑
 */
export function bookCatalogEdit(data) {
  return request.post("community/topic/bookCatalogEdit/" + data.id, data);
}

/**
 * @description 内容  --  百科管理 -- 医书 -- 目录 -- 删除
 */
export function bookCatalogDelete(id) {
  return request.post("community/topic/bookCatalogDelete/" + id);
}

/**
 * @description 内容  --  百科管理 -- 医书 -- 目录 -- 添加
 */
export function bookCatalogAdd(data) {
  return request.post("community/topic/bookCatalogAdd", data);
}

/**
 * @description 内容  --  百科管理 -- 医书 -- 目录小节 -- 列表
 */
export function bookChapterList(data) {
  return request.get("community/topic/bookChapterList", data);
}

/**
 * @description 内容  --  百科管理 -- 医书 -- 目录小节 -- 编辑
 */
export function bookChapterEdit(data) {
  return request.post("community/topic/bookChapterEdit/" + data.id, data);
}

/**
 * @description 内容  --  百科管理 -- 医书 -- 目录小节 -- 删除
 */
export function bookChapterDelete(id) {
  return request.post("community/topic/bookChapterDelete/" + id);
}

/**
 * @description 内容  --  百科管理 -- 医书 -- 目录小节 -- 添加
 */
export function bookChapterAdd(data) {
  return request.post("community/topic/bookChapterAdd", data);
}

/**
 * @description 内容  --  百科管理 -- 医家 -- 列表
 */
export function doctorList(data) {
  return request.get("community/topic/doctorList", data);
}

/**
 * @description 内容  --  百科管理 -- 医家 -- 编辑
 */
export function doctorEdit(data) {
  return request.post("community/topic/doctorEdit/" + data.id, data);
}

/**
 * @description 内容  --  百科管理 -- 医家 -- 删除
 */
export function doctorDelete(id) {
  return request.post("community/topic/doctorDelete/" + id);
}

/**
 * @description 内容  --  百科管理 -- 医家 -- 添加
 */
export function doctorAdd(data) {
  return request.post("community/topic/doctorAdd", data);
}

/**
 * @description 内容  --  百科管理 -- 穴位 -- 列表
 */
export function acupointList(data) {
  return request.get("community/topic/acupointList", data);
}

/**
 * @description 内容  --  百科管理 -- 穴位 -- 详情
 */
export function acupointDetail(id) {
  return request.get("community/topic/acupointDetail/" + id);
}

/**
 * @description 内容  --  百科管理 -- 穴位 -- 编辑
 */
export function acupointEdit(data) {
  return request.post("community/topic/acupointEdit/" + data.id, data);
}

/**
 * @description 内容  --  百科管理 -- 穴位 -- 删除
 */
export function acupointDelete(id) {
  return request.post("community/topic/acupointDelete/" + id);
}

/**
 * @description 内容  --  百科管理 -- 穴位 -- 添加
 */
export function acupointAdd(data) {
  return request.post("community/topic/acupointAdd", data);
}

/**
 * @description 内容  --  百科管理 -- 功效 -- 列表
 */
export function efficacyList(data) {
  return request.get("community/topic/efficacyList", data);
}

/**
 * @description 内容  --  百科管理 -- 功效 -- 编辑
 */
export function efficacyEdit(data) {
  return request.post("community/topic/efficacyEdit/" + data.id, data);
}

/**
 * @description 内容  --  百科管理 -- 功效 -- 删除
 */
export function efficacyDelete(id) {
  return request.post("community/topic/efficacyDelete/" + id);
}

/**
 * @description 内容  --  百科管理 -- 功效 -- 添加
 */
export function efficacyAdd(data) {
  return request.post("community/topic/efficacyAdd", data);
}


/**
 * @description 内容  --  百科管理 -- 手足阴阳 -- 列表
 */
export function handfootList(data) {
  return request.get("community/topic/handfootList", data);
}

/**
 * @description 内容  --  百科管理 -- 手足阴阳 -- 编辑
 */
export function handfootEdit(data) {
  return request.post("community/topic/handfootEdit/" + data.id, data);
}

/**
 * @description 内容  --  百科管理 -- 手足阴阳 -- 删除
 */
export function handfootDelete(id) {
  return request.post("community/topic/handfootDelete/" + id);
}

/**
 * @description 内容  --  百科管理 -- 手足阴阳 -- 添加
 */
export function handfootAdd(data) {
  return request.post("community/topic/handfootAdd", data);
}


/**
 * @description 内容  --  百科管理 -- 药膳 -- 列表
 */
export function medicinalDietList(data) {
  return request.get("community/topic/medicinalDietList", data);
}

/**
 * @description 内容  --  百科管理 -- 药膳 -- 编辑
 */
export function medicinalDietEdit(data) {
  return request.post("community/topic/medicinalDietEdit/" + data.id, data);
}

/**
 * @description 内容  --  百科管理 -- 药膳 -- 删除
 */
export function medicinalDietDelete(id) {
  return request.post("community/topic/medicinalDietDelete/" + id);
}

/**
 * @description 内容  --  百科管理 -- 药膳 -- 添加
 */
export function medicinalDietAdd(data) {
  return request.post("community/topic/medicinalDietAdd", data);
}


/**
 * @description 内容  --  百科管理 -- 药膳 -- 功效 -- 列表
 */
export function medicinalDietEfficacyList(data) {
  return request.get("community/topic/medicinalDietEfficacyList", data);
}

/**
 * @description 内容  --  百科管理 -- 药膳 -- 功效 -- 编辑
 */
export function medicinalDietEfficacyEdit(data) {
  return request.post("community/topic/medicinalDietEfficacyEdit/" + data.id, data);
}

/**
 * @description 内容  --  百科管理 -- 药膳 -- 功效 -- 删除
 */
export function medicinalDietEfficacyDelete(id) {
  return request.post("community/topic/medicinalDietEfficacyDelete/" + id);
}

/**
 * @description 内容  --  百科管理 -- 药膳 -- 功效 -- 添加
 */
export function medicinalDietEfficacyAdd(data) {
  return request.post("community/topic/medicinalDietEfficacyAdd", data);
}



/**
 * @description 内容  --  百科管理 -- 药食材 --分类 -- 列表
 */
export function medicineFoodCategoryList(data) {
  return request.get("community/topic/medicineFoodCategoryList", data);
}

/**
 * @description 内容  --  百科管理 -- 药食材 --分类-- 编辑
 */
export function medicineFoodCategoryEdit(data) {
  return request.post("community/topic/medicineFoodCategoryEdit/" + data.id, data);
}

/**
 * @description 内容  --  百科管理 -- 药食材--分类 -- 删除
 */
export function medicineFoodCategoryDelete(id) {
  return request.post("community/topic/medicineFoodCategoryDelete/" + id);
}

/**
 * @description 内容  --  百科管理 -- 药食材 --分类-- 添加
 */
export function medicineFoodCategoryAdd(data) {
  return request.post("community/topic/medicineFoodCategoryAdd", data);
}




/**
 * @description 内容  --  百科管理 -- 药食材 --功效 -- 列表
 */
export function medicineFoodEfficacyCategoryList(data) {
  return request.get("community/topic/medicineFoodEfficacyCategoryList", data);
}

/**
 * @description 内容  --  百科管理 -- 药食材 --功效-- 编辑
 */
export function medicineFoodEfficacyCategoryEdit(data) {
  return request.post("community/topic/medicineFoodEfficacyCategoryEdit/" + data.id, data);
}

/**
 * @description 内容  --  百科管理 -- 药食材--功效 -- 删除
 */
export function medicineFoodEfficacyCategoryDelete(id) {
  return request.post("community/topic/medicineFoodEfficacyCategoryDelete/" + id);
}

/**
 * @description 内容  --  百科管理 -- 药食材 --功效- 添加
 */
export function medicineFoodEfficacyCategoryAdd(data) {
  return request.post("community/topic/medicineFoodEfficacyCategoryAdd", data);
}



/**
 * @description 内容  --  百科管理 -- 药食材 -- 列表
 */
export function medicineFoodList(data) {
  return request.get("community/topic/medicineFoodList", data);
}

/**
 * @description 内容  --  百科管理 -- 药食材 - 编辑
 */
export function medicineFoodEdit(data) {
  return request.post("community/topic/medicineFoodEdit/" + data.id, data);
}

/**
 * @description 内容  --  百科管理 -- 药食材 -- 删除
 */
export function medicineFoodDelete(id) {
  return request.post("community/topic/medicineFoodDelete/" + id);
}

/**
 * @description 内容  --  百科管理 -- 药食材 -- 添加
 */
export function medicineFoodAdd(data) {
  return request.post("community/topic/medicineFoodAdd", data);
}


/**
 * @description 内容  --  百科管理 -- 食材 -- 列表
 */
export function foodCategoryList(data) {
  return request.get("community/topic/foodCategoryList", data);
}

/**
 * @description 内容  --  百科管理 -- 食材 -- 编辑
 */
export function foodCategoryEdit(data) {
  return request.post("community/topic/foodCategoryEdit/" + data.id, data);
}

/**
 * @description 内容  --  百科管理 -- 食材 -- 删除
 */
export function foodCategoryDelete(id) {
  return request.post("community/topic/foodCategoryDelete/" + id);
}

/**
 * @description 内容  --  百科管理 -- 食材 -- 添加
 */
export function foodCategoryAdd(data) {
  return request.post("community/topic/foodCategoryAdd", data);
}




/**
 * @description 内容  --  百科管理 -- 董氏奇穴 -- 列表
 */
export function dongPointList(data) {
  return request.get("community/topic/dongPointList", data);
}

/**
 * @description 内容  --  百科管理 -- 董氏奇穴 -- 编辑
 */
export function dongPointEdit(data) {
  return request.post("community/topic/dongPointEdit/" + data.id, data);
}

/**
 * @description 内容  --  百科管理 -- 董氏奇穴 -- 删除
 */
export function dongPointDelete(id) {
  return request.post("community/topic/dongPointDelete/" + id);
}

/**
 * @description 内容  --  百科管理 -- 董氏奇穴 -- 添加
 */
export function dongPointAdd(data) {
  return request.post("community/topic/dongPointAdd", data);
}



/**
 * @description 内容  --  百科管理 -- 董氏奇穴 -- 分类  -- 列表
 */
export function dongCategoryList(data) {
  return request.get("community/topic/dongCategoryList", data);
}

/**
 * @description 内容  --  百科管理 -- 董氏奇穴 -- 分类 -- 编辑
 */
export function dongCategoryEdit(data) {
  return request.post("community/topic/dongCategoryEdit/" + data.id, data);
}

/**
 * @description 内容  --  百科管理 -- 董氏奇穴 -- 分类 -- 删除
 */
export function dongCategoryDelete(id) {
  return request.post("community/topic/dongCategoryDelete/" + id);
}

/**
 * @description 内容  --  百科管理 -- 董氏奇穴  -- 分类 -- 添加
 */
export function dongCategoryAdd(data) {
  return request.post("community/topic/dongCategoryAdd", data);
}



/**
 * @description 内容  --  百科管理 -- 病症 -- 列表
 */
export function diseaseList(data) {
  return request.get("community/topic/diseaseList", data);
}
/**
 * @description 内容  --  百科管理 -- 病症 -- 编辑
 */
export function diseaseEdit(data) {
  return request.post("community/topic/diseaseEdit/" + data.id, data);
}
/**
 * @description 内容  --  百科管理 -- 病症 -- 删除
 */
export function diseaseDelete(id) {
  return request.post("community/topic/diseaseDelete/" + id);
}

/**
 * @description 内容  --  百科管理 -- 病症 -- 添加
 */
export function diseaseAdd(data) {
  return request.post("community/topic/diseaseAdd", data);
}

/**
 * @description 内容  --  百科管理 -- 病症 -- 分类 -- 列表
 */
export function diseaseCategoryList(data) {
  return request.get("community/topic/diseaseCategoryList", data);
}

/**
 * @description 内容  --  百科管理 -- 病症 -- 分类 -- 编辑
 */
export function diseaseCategoryEdit(data) {
  return request.post("community/topic/diseaseCategoryEdit/" + data.id, data);
}

/**
 * @description 内容  --  百科管理 -- 病症 -- 分类 -- 删除
 */
export function diseaseCategoryDelete(id) {
  return request.post("community/topic/diseaseCategoryDelete/" + id);
}

/**
 * @description 内容  --  百科管理 -- 病症 -- 分类 -- 添加
 */
export function diseaseCategoryAdd(data) {
  return request.post("community/topic/diseaseCategoryAdd", data);
}




/**
 * @description 内容  --  百科管理 -- 其他 -- 列表
 */
export function otherArticleList(data) {
  return request.get("community/topic/otherArticleList", data);
}
/**
 * @description 内容  --  百科管理 -- 其他 -- 编辑
 */
export function otherArticleEdit(data) {
  return request.post("community/topic/otherArticleEdit/" + data.id, data);
}
/**
 * @description 内容  --  百科管理 -- 其他 -- 删除
 */
export function otherArticleDelete(id) {
  return request.post("community/topic/otherArticleDelete/" + id);
}

/**
 * @description 内容  --  百科管理 -- 其他 -- 添加
 */
export function otherArticleAdd(data) {
  return request.post("community/topic/otherArticleAdd", data);
}

/**
 * @description 内容  --  百科管理 -- 其他 -- 分类 -- 列表
 */
export function otherArticleCategoryList(data) {
  return request.get("community/topic/otherArticleCategoryList", data);
}

/**
 * @description 内容  --  百科管理 -- 其他 -- 分类 -- 编辑
 */
export function otherArticleCategoryEdit(data) {
  return request.post("community/topic/otherArticleCategoryEdit/" + data.id, data);
}

/**
 * @description 内容  --  百科管理 -- 其他 -- 分类 -- 删除
 */
export function otherArticleCategoryDelete(id) {
  return request.post("community/topic/otherArticleCategoryDelete/" + id);
}

/**
 * @description 内容  --  百科管理 -- 其他 -- 分类 -- 添加
 */
export function otherArticleCategoryAdd(data) {
  return request.post("community/topic/otherArticleCategoryAdd", data);
}