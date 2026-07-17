# 分包D - 行程相关页面

## 页面概览

| 序号 | 页面路径 | 功能 |
|------|----------|------|
| 1 | trip/tripDetail | 行程详情 |
| 2 | trip/tripList | 行程列表 |
| 3 | trip/tripHotel | 行程酒店 |
| 4 | trip/allServices | 所有服务 |
| 5 | trip/hotelInfo | 酒店信息 |
| 6 | trip/album | 行程相册 |
| 7 | trip/albumDetail | 相册详情 |
| 8 | trip/hotelAlbumDetail | 酒店相册详情 |
| 9 | trip/houseKeep | 房务服务 |
| 10 | trip/takeInfo | 接送信息 |
| 11 | trip/moreTrip | 更多行程 |
| 12 | mobileCheckIn/checkIn | 入住登记 |
| 13 | mobileCheckIn/checkInSucceed | 入住登记成功 |
| 14 | baggage/addBaggage | 添加行李 |
| 15 | baggage/bindBaggage | 绑定行李 |
| 16 | baggage/historyBaggage | 行李历史 |
| 17 | trip/tripChange | 行程变更 |
| 18 | trip/tripChangeLetter | 变更函 |

---

## 1. trip/tripDetail - 行程详情

### 功能描述
行程详情页面，展示：
- 行程概览
- 每日行程安排
- 酒店信息
- 交通信息
- 服务列表

### 组件依赖
| 组件名 | 功能 |
|------|------|
| swiperBox | 轮播图 |
| tripNav | 行程导航 |
| bottomDialog | 底部对话框 |
| moreText | 更多文本 |
| coustomHead | 自定义头部 |
| v-previewImage | 图片预览 |

### 接口列表

#### 1. interfaceTransfer - 行程数据获取
- **接口路径**: `POST /api/sync/interfaceTransfer`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | query | object | 是 | 查询参数 |
  | query.type | string | 是 | 类型：Transportation |
  | query.unitCode | string | 是 | 单位代码 |
  | config | object | 是 | 接口配置 |
  | config.interfaceType | string | 是 | GET |
  | config.interfaceModule | string | 是 | GC_INFOMATION_CENTER |
  | config.interfaceMethod | string | 是 | api/codeBaseapi/listCodeBase |
  | config.interfaceFrom | string | 是 | GC |
  | config.hotelGroupCode | string | 是 | 酒店集团代码 |

---

## 2. trip/tripList - 行程列表

### 功能描述
用户的行程列表页面

### 接口列表

#### 1. getMyTravelList - 我的旅行列表
- **接口路径**: `POST /api/team/order/myTravelList`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | memberId | string | 是 | 会员ID |
  | firstResult | number | 否 | 起始位置 |
  | pageSize | number | 否 | 每页数量 |

---

## 3. trip/tripHotel - 行程酒店

### 功能描述
行程中的酒店信息展示

### 接口列表

#### 1. hotelInfo - 酒店信息
- **接口路径**: `GET /api/hotel/info.json`

---

## 4. trip/allServices - 所有服务

### 功能描述
酒店服务列表

### 接口列表

#### 1. listHotelServiceBySta - 酒店服务列表
- **接口路径**: `GET /hotelapi/hotelServiceManage/listHotelServiceBySta`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | hotelCode | string | 是 | 酒店代码 |
  | hotelGroupCode | string | 是 | 酒店集团代码 |

---

## 5. trip/album - 行程相册

### 功能描述
行程相册展示页面

### 接口列表

#### 1. listRootCategory - 相册根分类
- **接口路径**: `GET /api/albumCategory/listRootCategory`

---

## 6. trip/houseKeep - 房务服务

### 功能描述
房务服务请求页面（清洁、借用等）

### 接口列表

#### 1. createServerOrder - 创建服务订单
- **接口路径**: `POST /rsapi/rsOrder/createServerOrderV2`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | hotelCode | string | 是 | 酒店代码 |
  | hotelGroupCode | string | 是 | 酒店集团代码 |
  | serviceType | string | 是 | 服务类型 |
  | serviceTime | string | 是 | 服务时间 |
  | remark | string | 否 | 备注 |

---

## 7. trip/takeInfo - 接送信息

### 功能描述
接送机信息展示

### 接口列表

#### 1. interfaceTransfer - 获取接送信息
- **接口路径**: `POST /api/sync/interfaceTransfer`

---

## 8. mobileCheckIn/checkIn - 入住登记

### 功能描述
手机端入住登记页面

### 接口列表

#### 1. guestCheck - 客人检查
- **接口路径**: `POST /api/selfBook/guestCheck.json`

---

## 9. baggage/addBaggage - 添加行李

### 功能描述
添加行李信息

### 接口列表

#### 1. saveRecomm - 保存推荐
- **接口路径**: `POST /rsapi/rhkMiniapp/saveRecommV2`

---

## 10. baggage/bindBaggage - 绑定行李

### 功能描述
绑定行李标签

---

## 11. trip/tripChange - 行程变更

### 功能描述
行程变更申请页面

---

## 12. trip/tripChangeLetter - 变更函

### 功能描述
行程变更确认函页面

---

*待续: 分包E-G页面分析*
