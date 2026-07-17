import request from '@/api/request'

// ==================== 分类管理 ====================
export function categoryList(params) {
  return request.get('travel/category/lst', params)
}

export function categoryDetail(id) {
  return request.get(`travel/category/detail/${id}`)
}

export function categoryCreate(data) {
  return request.post('travel/category/create', data)
}

export function categoryUpdate(id, data) {
  return request.post(`travel/category/update/${id}`, data)
}

export function categoryDelete(id) {
  return request.delete(`travel/category/delete/${id}`)
}

export function categoryStatus(id, status) {
  return request.post(`travel/category/status/${id}`, { status })
}

export function categoryOptions() {
  return request.get('travel/category/options')
}

// ==================== 产品管理 ====================
export function productList(params) {
  return request.get('travel/product/lst', params)
}

export function productDetail(id) {
  return request.get(`travel/product/detail/${id}`)
}

export function productCreate(data) {
  return request.post('travel/product/create', data)
}

export function productUpdate(id, data) {
  return request.post(`travel/product/update/${id}`, data)
}

export function productDelete(id) {
  return request.delete(`travel/product/delete/${id}`)
}

export function productStatus(id, status) {
  return request.post(`travel/product/status/${id}`, { status })
}

// 团期管理
export function departureList(productId) {
  return request.get(`travel/product/departures/${productId}`)
}

export function departureCreate(data) {
  return request.post('travel/product/departure/create', data)
}

export function departureBatch(data) {
  return request.post('travel/product/departure/batch', data)
}

export function departureUpdate(id, data) {
  return request.post(`travel/product/departure/update/${id}`, data)
}

export function departureDelete(id) {
  return request.delete(`travel/product/departure/delete/${id}`)
}

// ==================== 订单管理 ====================
export function orderList(params) {
  return request.get('travel/order/lst', params)
}

export function orderDetail(id) {
  return request.get(`travel/order/detail/${id}`)
}

export function orderStat() {
  return request.get('travel/order/stat')
}

export function orderGuests(id) {
  return request.get(`travel/order/guests/${id}`)
}

export function orderConfirm(id) {
  return request.post(`travel/order/confirm/${id}`)
}

export function orderCancel(id, data) {
  return request.post(`travel/order/cancel/${id}`, data)
}

export function orderExport(params) {
  return request.get('travel/order/export', params, { responseType: 'blob' })
}

// ==================== 合同管理 ====================
export function contractList(params) {
  return request.get('travel/contract/lst', params)
}

export function contractDetail(id) {
  return request.get(`travel/contract/detail/${id}`)
}

export function contractStat() {
  return request.get('travel/contract/stat')
}

export function contractResend(id) {
  return request.post(`travel/contract/resend/${id}`)
}

// ==================== 保险管理 ====================
export function insuranceList(params) {
  return request.get('travel/insurance/lst', params)
}

export function insuranceDetail(id) {
  return request.get(`travel/insurance/detail/${id}`)
}

export function insuranceStat() {
  return request.get('travel/insurance/stat')
}

export function insuranceIssue(id, data) {
  return request.post(`travel/insurance/issue/${id}`, data)
}

export function insuranceCancel(id) {
  return request.post(`travel/insurance/cancel/${id}`)
}
