# 分包C - 订单相关页面

## 页面概览

| 序号 | 页面路径 | 功能 |
|------|----------|------|
| 1 | order/hotelList | 酒店列表 |
| 2 | order/hotel | 酒店详情 |
| 3 | order/bookInfo | 预订信息 |
| 4 | order/orderInfo | 订单信息 |

---

## 1. order/hotelList - 酒店列表

### 功能描述
酒店列表页面，展示可预订的酒店

### 组件依赖
| 组件名 | 功能 |
|------|------|
| coustomHead | 自定义头部 |
| searchInput | 搜索输入 |
| roomList | 房间列表 |
| noData | 无数据 |

### 接口列表

#### 1. hotelListAll - 酒店列表
- **接口路径**: `POST /api/hotel/hotelListAllNew.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | appid | string | 是 | 小程序AppID |
  | componentAppid | string | 否 | 组件AppID |
  | hotelGroupCode | string | 是 | 酒店集团代码 |
  | hotelName | string | 否 | 酒店名称（搜索） |
  | firstResult | number | 否 | 起始位置 |
  | pageSize | number | 否 | 每页数量 |

- **出参**:
  | 字段名 | 类型 | 说明 |
  |--------|------|------|
  | result | number | 1=成功 |
  | retVal | array | 酒店列表 |
  | retVal[].hotelCode | string | 酒店代码 |
  | retVal[].hotelName | string | 酒店名称 |
  | retVal[].hotelImg | string | 酒店图片 |
  | retVal[].address | string | 地址 |
  | retVal[].tel | string | 电话 |

---

## 2. order/hotel - 酒店详情

### 功能描述
酒店详情页面，展示酒店信息和房型

### 组件依赖
| 组件名 | 功能 |
|------|------|
| swiperBox | 轮播图 |
| bottomDialog | 底部对话框 |
| calendar | 日历组件 |
| dailyPrice | 每日价格 |

### 接口列表

#### 1. hotelInfo - 酒店信息
- **接口路径**: `GET /api/hotel/info.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | hotelCode | string | 是 | 酒店代码 |
  | hotelGroupCode | string | 是 | 酒店集团代码 |

- **出参**:
  | 字段名 | 类型 | 说明 |
  |--------|------|------|
  | result | number | 1=成功 |
  | retVal | object | 酒店信息 |
  | retVal.hotelCode | string | 酒店代码 |
  | retVal.hotelName | string | 酒店名称 |
  | retVal.hotelImg | string | 酒店图片 |
  | retVal.description | string | 描述 |
  | retVal.facilities | array | 设施列表 |
  | retVal.rooms | array | 房型列表 |

#### 2. findHotel - 条件查询酒店
- **接口路径**: `POST /api/hotel/findHotelByCondition.json`

---

## 3. order/bookInfo - 预订信息

### 功能描述
预订信息填写页面

### 接口列表

#### 1. resrvCheck - 预订检查
- **接口路径**: `POST /api/hotel/product/resrvCheck.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | appid | string | 是 | AppID |
  | componentAppid | string | 否 | 组件AppID |
  | hotelCode | string | 是 | 酒店代码 |
  | roomTypeCode | string | 是 | 房型代码 |
  | checkInDay | string | 是 | 入住日期 |
  | checkOutDay | string | 是 | 离店日期 |

#### 2. makeOrder - 创建订单
- **接口路径**: `POST /api/hotel/product/makeOrder.json`

---

## 4. order/orderInfo - 订单信息

### 功能描述
酒店订单详情页面

### 接口列表

#### 1. showOrder - 订单展示
- **接口路径**: `GET /api/hotel/product/showOrder.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | orderNo | string | 是 | 订单编号 |

---

*待续: 分包D-G页面分析*
