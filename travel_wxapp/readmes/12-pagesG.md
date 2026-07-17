# 分包G - 其他服务页面

## 页面概览

| 序号 | 页面路径 | 功能 |
|------|----------|------|
| 1 | cleanup | 清洁服务 |
| 2 | borrowing | 借用物品 |
| 3 | purchase | 购买商品 |
| 4 | suggestions | 建议投诉 |
| 5 | suggest-detail | 建议详情 |
| 6 | confirm-order | 确认订单 |
| 7 | order/list/index | 订单列表 |
| 8 | order/detail/index | 订单详情 |

---

## 1. cleanup - 清洁服务

### 功能描述
房间清洁服务申请

### 接口列表

#### 1. createServerOrder - 创建服务订单
- **接口路径**: `POST /rsapi/rsOrder/createServerOrderV2`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | hotelCode | string | 是 | 酒店代码 |
  | hotelGroupCode | string | 是 | 酒店集团代码 |
  | orderType | string | 是 | 订单类型：CLEAN |
  | serviceTime | string | 是 | 服务时间 |
  | roomNo | string | 是 | 房间号 |
  | remark | string | 否 | 备注 |

---

## 2. borrowing - 借用物品

### 功能描述
物品借用申请（如充电器、雨伞等）

### 接口列表

#### 1. createServerOrder - 创建服务订单
- **接口路径**: `POST /rsapi/rsOrder/createServerOrderV2`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | hotelCode | string | 是 | 酒店代码 |
  | hotelGroupCode | string | 是 | 酒店集团代码 |
  | orderType | string | 是 | 订单类型：BORROW |
  | items | array | 是 | 借用物品列表 |
  | roomNo | string | 是 | 房间号 |

---

## 3. purchase - 购买商品

### 功能描述
酒店商品购买（如饮料、零食等）

### 接口列表

#### 1. createServerOrder - 创建服务订单
- **接口路径**: `POST /rsapi/rsOrder/createServerOrderV2`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | hotelCode | string | 是 | 酒店代码 |
  | hotelGroupCode | string | 是 | 酒店集团代码 |
  | orderType | string | 是 | 订单类型：PURCHASE |
  | items | array | 是 | 商品列表 |
  | roomNo | string | 是 | 房间号 |

---

## 4. suggestions - 建议投诉

### 功能描述
用户建议和投诉提交

### 接口列表

#### 1. getComplaintAndAdvice - 投诉建议
- **接口路径**: `POST /rsapi/frontend/getComplaintAndAdvice`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | hotelCode | string | 是 | 酒店代码 |
  | hotelGroupCode | string | 是 | 酒店集团代码 |
  | type | string | 是 | 类型（建议/投诉） |
  | content | string | 是 | 内容 |
  | images | array | 否 | 图片列表 |
  | contactName | string | 否 | 联系人 |
  | contactMobile | string | 否 | 联系电话 |

---

## 5. suggest-detail - 建议详情

### 功能描述
建议/投诉详情展示

---

## 6. confirm-order - 确认订单

### 功能描述
服务订单确认页面

---

## 7. order/list/index - 订单列表

### 功能描述
服务订单列表

### 接口列表

#### 1. orderList - 订单列表
- **接口路径**: `POST /rsapi/rsOrder/list`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | memberId | string | 是 | 会员ID |
  | orderType | string | 否 | 订单类型 |
  | orderStatus | string | 否 | 订单状态 |
  | firstResult | number | 否 | 起始位置 |
  | pageSize | number | 否 | 每页数量 |

- **出参**:
  | 字段名 | 类型 | 说明 |
  |--------|------|------|
  | result | number | 1=成功 |
  | retVal | array | 订单列表 |
  | retVal[].orderNo | string | 订单编号 |
  | retVal[].orderType | string | 订单类型 |
  | retVal[].orderStatus | string | 订单状态 |
  | retVal[].createTime | string | 创建时间 |
  | retVal[].items | array | 订单项列表 |

---

## 8. order/detail/index - 订单详情

### 功能描述
服务订单详情

### 接口列表

#### 1. updateOrder - 更新订单
- **接口路径**: `POST /rsapi/rsOrder/updateOrder`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | orderNo | string | 是 | 订单编号 |
  | orderStatus | string | 是 | 订单状态 |

---

*待续: 其他分包页面分析*
