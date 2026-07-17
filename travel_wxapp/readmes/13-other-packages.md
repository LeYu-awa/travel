# 其他分包页面文档

## 1. 分包Activity - 会员兑换活动

| 序号 | 页面路径 | 功能 |
|------|----------|------|
| 1 | member-exchange/auth | 会员兑换认证 |
| 2 | member-exchange/signup | 会员兑换报名 |
| 3 | member-exchange/signup-result | 会员兑换结果 |

### 接口列表

#### 1. getMemberExchangeActivityInfo - 会员兑换活动信息
- **服务**: `services/member.js`
- **接口路径**: `GET /member-activity-center/member/interflow/activity/info`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | hotelGroupCode | string | 是 | 酒店集团代码 |
  | memberNo | string | 是 | 会员编号 |

#### 2. jumpJoinMemberExchangeActivity - 加入会员兑换
- **服务**: `services/member.js`
- **接口路径**: `POST /member-activity-center/api/jump/brand/member`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | hotelGroupCode | string | 是 | 酒店集团代码 |
  | memberNo | string | 是 | 会员编号 |
  | activityNo | string | 是 | 活动编号 |

---

## 2. 分包Common - 公共页面

| 序号 | 页面路径 | 功能 |
|------|----------|------|
| 1 | test/index | 测试页面 |
| 2 | midTrans | 中转页面 |
| 3 | content/audio | 音频内容 |
| 4 | content/video | 视频内容 |

---

## 3. 分包TravelAssistant - 旅行助手

| 序号 | 页面路径 | 功能 |
|------|----------|------|
| 1 | journey/edit | 行程编辑 |
| 2 | journey/destination | 目的地选择 |
| 3 | journey/recommend | 推荐 |
| 4 | journey/map | 地图 |
| 5 | plan/detail | 行程规划详情 |
| 6 | travel/index | 旅行首页 |

### 接口列表

#### 1. getTripRecommendFeed - 行程推荐
- **服务**: `services/trip.js`
- **接口路径**: `POST /shopapi/marketingActivity/tripAssistantRecommendation`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | hotelGroupCode | string | 是 | 酒店集团代码 |
  | memberId | string | 否 | 会员ID |
  | firstResult | number | 否 | 起始位置 |
  | pageSize | number | 否 | 每页数量 |

#### 2. getAdvertiseProductGroup - 广告产品组
- **服务**: `services/trip.js`
- **接口路径**: `POST /shop-api/productGroup/getAdvertiseProductGroupVo`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | hotelGroupCode | string | 是 | 酒店集团代码 |
  | productGroupCode | string | 是 | 产品组代码 |

#### 3. getProductGroupGoodsDataList - 产品组商品
- **服务**: `services/trip.js`
- **接口路径**: `POST /shop-api/productGroup/getProductGroupGoodsDataList`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | hotelGroupCode | string | 是 | 酒店集团代码 |
  | productGroupCode | string | 是 | 产品组代码 |
  | firstResult | number | 否 | 起始位置 |
  | pageSize | number | 否 | 每页数量 |

---

## 4. 分包Micro - 微页面

| 序号 | 页面路径 | 功能 |
|------|----------|------|
| 1 | index | 微页面 |

### 功能描述
微页面/H5页面展示

---

## 5. 分包（components内页面组件）

### 5.1 旅行相关组件 (pagesB/components)

| 组件名 | 功能 |
|------|------|
| dailyPrice | 每日价格日历 |
| ExchangeListBox | 优惠券兑换列表框 |
| CategorySubInfo | 分类子信息 |

### 5.2 会员相关组件 (pagesA/components)

| 组件名 | 功能 |
|------|------|
| accountItem | 账户项 |

### 5.3 行程相关组件 (pagesD/components)

| 组件名 | 功能 |
|------|------|
| ConfirmationDialog | 确认对话框 |
| myTrip | 我的行程 |
| PlanClassifyTabs | 计划分类标签 |
| ss-download | 下载组件 |
| v-previewImage | 图片预览 |

---

## 6. 通用数据字典

### 6.1 订单状态 (orderStatus)

| 状态值 | 说明 |
|--------|------|
| PENDING | 待支付 |
| PAID | 已支付 |
| CONFIRMED | 已确认 |
| CANCELLED | 已取消 |
| COMPLETED | 已完成 |
| REFUNDED | 已退款 |

### 6.2 优惠券状态 (couponStatus)

| 状态值 | 说明 |
|--------|------|
| UNUSED | 未使用 |
| USED | 已使用 |
| EXPIRED | 已过期 |
| TRANSFERRED | 已转赠 |

### 6.3 服务订单类型 (orderType)

| 类型值 | 说明 |
|--------|------|
| CLEAN | 清洁服务 |
| BORROW | 借用物品 |
| PURCHASE | 购买商品 |
| CONSULTATION | 咨询服务 |
| COMPLAINT | 投诉建议 |

### 6.4 广告位类型 (AdFileType)

| 类型值 | 说明 |
|--------|------|
| IMAGE | 图片 |
| VIDEO | 视频 |

### 6.5 卡等级 (CardLevel)

| 等级 | 说明 |
|------|------|
| NORMAL | 普通会员 |
| SILVER | 银卡会员 |
| GOLD | 金卡会员 |
| PLATINUM | 白金会员 |
| DIAMOND | 钻石会员 |

---

*文档完成*
