# 主包页面文档

## 页面概览

| 序号 | 页面路径 | 功能 | TabBar |
|------|----------|------|--------|
| 1 | pages/travel/index | 预订首页 | 是 |
| 2 | pages/travel/destinations | 目的地 | 否 |
| 3 | pages/travel/preIndex | 预订预首页 | 否 |
| 4 | pages/trip/index | 行程首页 | 否 |
| 5 | pages/trip/ground-activities | 出发/地面活动 | 是 |
| 6 | pages/member/memberCenter | 会员中心 | 是 |
| 7 | pages/travels/travels | 旅行列表 | 否 |
| 8 | pages/member/memberLogin | 会员登录 | 否 |
| 9 | pages/member/orderList | 订单列表 | 否 |
| 10 | pages/mall/webview | 商城H5页面 | 否 |
| 11 | pages/scenery/scenery | 风物页面 | 是 |
| 12 | pages/search/index | 搜索首页 | 否 |
| 13 | pages/search/result | 搜索结果 | 否 |
| 14 | pages/search/result-hotel | 搜索结果-酒店 | 否 |
| 15 | pages/guide/guide | 指南页面 | 否 |
| 16 | pages/qw-active-code/index | 活动代码页 | 否 |

---

## 1. pages/travel/index - 预订首页

### 功能描述
小程序首页/预订首页，展示酒店/旅行产品的入口页面，包含：
- 顶部轮播广告
- 登录会员广告位
- 目的地栅栏（上左、上右1/上右2/下左1/下左2/下右）
- 松赞介绍位
- 热门推荐栅栏
- 探索更多栅栏
- 全屏弹窗广告

### 文件位置
- `pages/travel/index.js`
- `pages/travel/index.json`
- `pages/travel/index.wxml`
- `pages/travel/index.wxss`

### 组件依赖
| 组件名 | 功能 |
|------|------|
| bottomNav | 底部导航TabBar |
| ErrorLimiting | 错误限流组件 |
| SafeArea | 安全区域组件 |
| StAd | 广告组件 |
| StButton | 按钮组件 |
| SearchBarView | 搜索栏视图 |
| AdPopup | 广告弹窗 |
| Banner | 轮播图 |
| UserAgreement | 用户协议 |

### 生命周期
- **onLoad**: 初始化页面
- **onShow**: 刷新用户信息，重新加载广告数据
- **onPullDownRefresh**: 下拉刷新

### 接口列表

#### 1. getAdData - 获取广告数据
- **服务**: `services/home.js`
- **接口路径**: `GET /shopapi/sz/advertisementPage/v2`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | hotelGroupCode | string | 是 | 酒店集团代码 |
  | showLocation | string | 是 | 展示位置(1,2,3,4,5,6,7) |
  | clientTypes | string | 否 | 客户端类型 |
  | memberId | string | 否 | 会员ID（登录后） |
  | channel | string | 否 | 渠道 |

- **出参**:
  | 字段名 | 类型 | 说明 |
  |--------|------|------|
  | result | number | 1=成功 |
  | retVal | array | 广告数据数组 |
  | retVal[].location | number | 位置编号 |
  | retVal[].infos | string | JSON字符串广告信息 |

### 广告位说明
| 位置 | showLocation | 说明 |
|------|-------------|------|
| 顶部轮播 | 1 | 首页顶部Banner轮播 |
| 登录会员 | 2 | 已登录用户展示的广告 |
| 松赞介绍 | 3 | "什么是松赞"介绍区域 |
| 目的地 | 4 | 目的地栅栏（ul/ur1/ur2/dl1/dl2/dr） |
| 热门推荐Top | 5 | 热门推荐上方 |
| 热门推荐Swiper | 5(down1-4) | 热门推荐轮播 |
| 探索更多 | 6 | 旅行类型探索 |
| 全屏弹窗 | 7 | 全屏广告弹窗 |

### 页面跳转
- **跳转至**:
  - `/pages/travel/destinations` - 目的地页面
  - `/pages/member/memberLogin` - 登录页面
  - 各广告链接对应的path

---

## 2. pages/travel/destinations - 目的地

### 功能描述
目的地列表页面，展示所有可预订的目的地

### 文件位置
- `pages/travel/destinations.js`
- `pages/travel/destinations.json`

### 接口列表

#### 1. getDestinationsConfigSeries - 获取目的地配置
- **服务**: `services/home.js`
- **接口路径**: `GET /shop-api/productShelfApp/getProductShelfConfigApp`

#### 2. getDestinationsProductsByTab - 按Tab获取目的地产品
- **服务**: `services/home.js`
- **接口路径**: `POST /shop-api/productShelfApp/getProductShelfInfoList`

---

## 3. pages/travel/preIndex - 预订预首页

### 功能描述
预订流程的预首页/中转页

### 文件位置
- `pages/travel/preIndex.js`

---

## 4. pages/trip/index - 行程首页

### 功能描述
行程管理首页，展示用户的行程列表

### 接口列表

#### 1. getMyTravelList - 获取我的旅行列表
- **接口路径**: `POST /api/team/order/myTravelList`

---

## 5. pages/trip/ground-activities - 出发/地面活动

### 功能描述
TabBar页面之一，展示出发和地面活动信息

### 组件依赖
| 组件名 | 功能 |
|------|------|
| groundActivities/Tabs | 标签页组件 |
| groundActivities/Banner | Banner组件 |
| groundActivities/LineTab | 线路Tab |
| groundActivities/GoodsGroup | 商品分组 |

---

## 6. pages/member/memberCenter - 会员中心

### 功能描述
TabBar页面之一，会员中心首页

### 功能模块
- 会员信息展示
- 会员权益
- 积分管理
- 优惠券管理
- 订单入口
- 收藏管理

### 接口列表

#### 1. refreshMemberInfo - 刷新会员信息
- **接口路径**: `GET /api/member/refreshMemberInfo.json`

#### 2. getAllCardLevel - 获取所有卡等级
- **接口路径**: `GET /api/member/getAllCardLevel.json`

#### 3. getMemberCardInfo - 获取会员卡权益
- **服务**: `services/member.js`
- **接口路径**: `GET /api/member/membercardInterestDesc.json`

#### 4. listPointByMemberId - 获取积分列表
- **接口路径**: `GET /api/member/listPointByMemberId.json`

#### 5. listCouponWithHistoryByCardNo - 获取优惠券列表
- **接口路径**: `GET /api/member/listCouponWithHistoryByCardNoV2`

---

## 7. pages/travels/travels - 旅行列表

### 功能描述
展示旅行产品列表

---

## 8. pages/member/memberLogin - 会员登录

### 功能描述
会员登录页面，支持：
- 手机验证码登录
- 微信授权登录

### 接口列表

#### 1. memberLoginByMobileCode - 验证码登录
- **接口路径**: `POST /api/member/memberLoginByMobileCode.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | mobile | string | 是 | 手机号 |
  | code | string | 是 | 验证码 |
  | hotelGroupCode | string | 是 | 酒店集团代码 |

#### 2. verifyCode - 获取验证码
- **接口路径**: `GET /api/member/createIdentifyCode.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | mobile | string | 是 | 手机号 |

#### 3. memberLoginByMobileAndOpenId - OpenId登录
- **接口路径**: `GET /api/member/memberLoginByMobileAndOpenId.json`

---

## 9. pages/member/orderList - 订单列表

### 功能描述
展示用户的订单列表

### 接口列表

#### 1. orderAggregation - 订单聚合列表
- **接口路径**: `GET /api/orderAggregation/orderList.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | memberId | string | 是 | 会员ID |
  | orderStatus | string | 否 | 订单状态 |
  | firstResult | number | 否 | 起始位置 |
  | pageSize | number | 否 | 每页数量 |

---

## 10. pages/mall/webview - 商城H5页面

### 功能描述
内嵌H5页面的容器，用于展示外部H5页面

### 页面参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| url | string | 是 | H5页面URL |

---

## 11. pages/scenery/scenery - 风物页面

### 功能描述
TabBar页面之一，展示风物/商城产品

### 接口列表

#### 1. shopGoodsPage - 商品分页
- **接口路径**: `GET /shopapi/sz/shopGoodsPage`

#### 2. getGoodsCollection - 收藏列表
- **接口路径**: `GET /api/shop/getGoodsCollection.json`

---

## 12. pages/search/index - 搜索首页

### 功能描述
搜索入口页面

### 接口列表

#### 1. getSearchHotWordList - 搜索热词
- **服务**: `services/home.js`
- **接口路径**: `GET /shopapi/search/getHomeHotWordList`

#### 2. quickSearch - 快速搜索
- **服务**: `services/home.js`
- **接口路径**: `POST /shopapi/search/product/title`

---

## 13. pages/search/result - 搜索结果

### 功能描述
产品搜索结果页面

### 接口列表

#### 1. search - 产品搜索
- **服务**: `services/home.js`
- **接口路径**: `POST /shopapi/search/product`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | keyword | string | 是 | 搜索关键词 |
  | searchType | string | 否 | 搜索类型 |
  | firstResult | number | 否 | 起始位置 |
  | pageSize | number | 否 | 每页数量 |

---

## 14. pages/search/result-hotel - 搜索结果-酒店

### 功能描述
酒店搜索结果页面

### 接口列表

#### 1. hotelListAll - 酒店列表
- **接口路径**: `POST /api/hotel/hotelListAllNew.json`

---

## 15. pages/guide/guide - 指南页面

### 功能描述
使用指南/帮助页面

---

## 16. pages/qw-active-code/index - 活动代码页

### 功能描述
活动码验证/兑换页面

### 接口列表

#### 1. getCodeInfo - 获取代码信息
- **接口路径**: `GET /api/shop/getCodeInfo.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | code | string | 是 | 活动代码 |

---

*后续分包页面分析将追加到对应分包文档中*
