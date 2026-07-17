import request from '@/utils/request.js'

/**
 * 旅游产品列表（公开）
 */
export function travelProductList(params = {}) {
	return request.get('travel/product/list', params, { noAuth: true })
}

/**
 * 旅游产品详情（公开）
 */
export function travelProductDetail(id) {
	return request.get(`travel/product/detail/${id}`, {}, { noAuth: true })
}

/**
 * 团期日历（公开）
 */
export function travelDepartureCalendar(params = {}) {
	return request.get('travel/product/departure/calendar', params, { noAuth: true })
}

/**
 * 价格试算
 */
export function travelOrderPricePreview(data = {}) {
	return request.post('travel/order/price-preview', data)
}

/**
 * 创建订单
 */
export function travelOrderCreate(data = {}) {
	return request.post('travel/order/create', data)
}

/**
 * 订单详情
 */
export function travelOrderDetail(id) {
	return request.get(`travel/order/detail/${id}`)
}

/**
 * 保存订单出行人
 */
export function travelOrderSaveGuests(orderId, guests = []) {
	return request.post(`travel/order/save-guests/${orderId}`, { guests })
}

/**
 * 旅游订单列表
 */
export function travelOrderList(params = {}) {
	return request.get('travel/order/list', params)
}

/**
 * 取消订单
 */
export function travelOrderCancel(orderId, data = {}) {
	return request.post(`travel/order/cancel/${orderId}`, data)
}

/**
 * 订单支付
 */
export function travelOrderPay(orderId, data = {}) {
	return request.post(`travel/order/pay/${orderId}`, data)
}

/**
 * 发起签约
 */
export function travelContractStart(orderId) {
	return request.post('travel/contract/start', { order_id: Number(orderId || 0) })
}

/**
 * 查询签约状态
 */
export function travelContractStatus(orderId) {
	return request.get(`travel/contract/status/${orderId}`)
}

/**
 * 合同详情
 */
export function travelContractDetail(orderId) {
	return request.get(`travel/contract/detail/${orderId}`)
}

/**
 * 合同下载地址
 */
export function travelContractDownload(orderId) {
	return request.get(`travel/contract/download/${orderId}`)
}

/**
 * 保单列表
 */
export function travelInsuranceList(orderId) {
	return request.get(`travel/insurance/list/${orderId}`)
}

/**
 * 保单详情
 */
export function travelInsuranceDetail(insuranceNo) {
	return request.get(`travel/insurance/detail/${encodeURIComponent(insuranceNo)}`)
}

/**
 * 保单下载地址
 */
export function travelInsuranceDownload(insuranceNo) {
	return request.get(`travel/insurance/download/${encodeURIComponent(insuranceNo)}`)
}

/**
 * 常用出行人列表
 */
export function travelGuestList(params = {}) {
	return request.get('travel/guest/list', params)
}

/**
 * 常用出行人详情
 */
export function travelGuestDetail(id) {
	return request.get(`travel/guest/detail/${id}`)
}

/**
 * 保存常用出行人
 */
export function travelGuestSave(data = {}) {
	return request.post('travel/guest/save', data)
}

/**
 * 删除常用出行人
 */
export function travelGuestDelete(guestId) {
	return request.post(`travel/guest/delete/${guestId}`)
}

/**
 * 设为默认出行人
 */
export function travelGuestSetDefault(guestId) {
	return request.post(`travel/guest/default/${guestId}`)
}
