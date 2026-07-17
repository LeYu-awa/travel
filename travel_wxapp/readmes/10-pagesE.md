# 分包E - 日常活动页面

## 页面概览

| 序号 | 页面路径 | 功能 |
|------|----------|------|
| 1 | dailyActivity/dailyActivityDetail | 活动详情 |
| 2 | dailyActivity/submitOrder | 提交订单 |
| 3 | dailyActivity/dailyOrderDetail | 活动订单详情 |
| 4 | consultationForm/index | 咨询表单首页 |
| 5 | consultationForm/submitSucceed | 提交成功 |
| 6 | consultationForm/consultList | 咨询列表 |

---

## 1. dailyActivity/dailyActivityDetail - 活动详情

### 功能描述
日常活动详情页，展示：
- 活动图片/视频
- 活动名称、时间、地点
- 活动介绍
- 价格信息
- 报名/预订按钮

### 接口列表

#### 1. activityOrder - 活动订单查询
- **接口路径**: `GET /api/singleActivity/querySingleActivityOrder`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | activityCode | string | 是 | 活动代码 |
  | memberId | string | 否 | 会员ID |

#### 2. listMarketingProducts - 营销产品列表
- **接口路径**: `GET /shopapi/marketingActivity/listMarketingProducts`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | activityCode | string | 是 | 活动代码 |
  | hotelGroupCode | string | 是 | 酒店集团代码 |

---

## 2. dailyActivity/submitOrder - 提交订单

### 功能描述
活动订单提交页面

### 接口列表

#### 1. saveActivityOrder - 保存活动订单
- **接口路径**: `POST /api/singleActivity/saveSingleActivityOrder`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | activityCode | string | 是 | 活动代码 |
  | memberId | string | 是 | 会员ID |
  | quantity | number | 是 | 数量 |
  | contactName | string | 是 | 联系人姓名 |
  | contactMobile | string | 是 | 联系人手机 |
  | remark | string | 否 | 备注 |

#### 2. calculatePrice - 计算价格
- **接口路径**: `POST /api/singleActivity/getSingleActivityOrderPrice`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | activityCode | string | 是 | 活动代码 |
  | quantity | number | 是 | 数量 |
  | couponNo | string | 否 | 优惠券编号 |

---

## 3. dailyActivity/dailyOrderDetail - 活动订单详情

### 功能描述
活动订单详情展示

### 接口列表

#### 1. activityOrder - 活动订单查询
- **接口路径**: `GET /api/singleActivity/querySingleActivityOrder`

#### 2. cancelSingleActivityOrder - 取消活动订单
- **接口路径**: `GET /api/singleActivity/cancelSingleActivityOrder`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | orderNo | string | 是 | 订单编号 |

#### 3. activityPay - 活动支付
- **接口路径**: `POST /api/singleActivity/pay`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | orderNo | string | 是 | 订单编号 |
  | memberId | string | 是 | 会员ID |

---

## 4. consultationForm/index - 咨询表单首页

### 功能描述
咨询表单填写页面

### 接口列表

#### 1. createServerOrder - 创建服务订单
- **接口路径**: `POST /rsapi/rsOrder/createServerOrderV2`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | hotelCode | string | 是 | 酒店代码 |
  | hotelGroupCode | string | 是 | 酒店集团代码 |
  | orderType | string | 是 | 订单类型 |
  | content | string | 是 | 咨询内容 |
  | contactName | string | 是 | 联系人 |
  | contactMobile | string | 是 | 联系电话 |

---

## 5. consultationForm/consultList - 咨询列表

### 功能描述
用户咨询记录列表

### 接口列表

#### 1. orderList - 订单列表
- **接口路径**: `POST /rsapi/rsOrder/list`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | memberId | string | 是 | 会员ID |
  | orderType | string | 否 | 订单类型 |
  | firstResult | number | 否 | 起始位置 |
  | pageSize | number | 否 | 每页数量 |

---

*待续: 分包F-G页面分析*
