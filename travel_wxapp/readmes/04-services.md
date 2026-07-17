# 服务层文档

services/

## 1. 服务层概览

| 服务文件 | 说明 |
|---------|------|
| services/common.js | 通用服务（广告上报、推荐产品、系统配置） |
| services/member.js | 会员服务（会员兑换活动、会员卡信息） |
| services/trip.js | 行程服务（广告产品组/产品组商品/行程推荐） |
| services/home.js | 首页服务（广告数据/目的地配置/搜索） |
| services/user.js | 用户服务（登录/验证码刷新） |
| services/request/request.js | 请求封装（带拦截器/Token管理） |
| services/request/tokenManager.js | Token管理器 |
| services/channelManage.js | 渠道管理 |
| services/micro.js | 微页面服务 |

## 2. services/common.js - 通用服务

### 2.1 adReport(data, options)
广告上报

**请求方式**: POST
**接口路径**: `/advertise-server/app-api/advertise/app/appReport`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| data | object | 是 | 上报数据 |

### 2.2 getRecommendProducts(data)
获取推荐产品

**请求方式**: POST
**接口路径**: `/shopapi/marketingActivity/payCompletionPageRecommendation`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| data | object | 是 | 查询参数 |

### 2.3 getSysOptionsByCode(params)
按代码获取系统配置

**请求方式**: GET
**接口路径**: `/api/travel/getSysOptionsByCode`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| code | string | 是 | 配置代码 |

**返回值**:
```json
{
  "result": 1,
  "retVal": {
    "code": "xxx",
    "value": "xxx"
  }
}
```

### 2.4 refreshQtPageConfigData({ timeStamp })
刷新页面配置数据（从OSS获取）

**请求方式**: GET
**接口路径**: `https://songtsam-internal-static.oss-cn-chengdu.aliyuncs.com/mobile/qt-page-config.json`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| timeStamp | number | 是 | 时间戳（用于缓存刷新） |

## 3. services/member.js - 会员服务

### 3.1 getJumpMemberExchangeActivityInfo(params, options)
获取JUMP会员兑换活动信息

**请求方式**: GET
**接口路径**: `/member-activity-center/api/jump/brand/config`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| hotelGroupCode | string | 是 | 酒店集团代码 |
| hotelGroupId | number | 是 | 酒店集团ID |

### 3.2 getMemberCardInfo(params)
获取会员卡权益信息

**请求方式**: GET
**接口路径**: `/api/member/membercardInterestDesc.json`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| cardType | string | 否 | 卡类型 |
| cardLevel | string | 否 | 卡等级 |

### 3.3 getMemberExchangeActivityInfo(params, options)
获取会员兑换活动信息

**请求方式**: GET
**接口路径**: `/member-activity-center/member/interflow/activity/info`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| hotelGroupCode | string | 是 | 酒店集团代码 |
| memberNo | string | 是 | 会员编号 |

### 3.4 jumpBackJoinMemberExchangeActivity(params, options)
JUMP后台加入会员兑换活动

**请求方式**: POST
**接口路径**: `/member-activity-center/member/interflow/jump/info`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| hotelGroupCode | string | 是 | 酒店集团代码 |
| memberNo | string | 是 | 会员编号 |
| activityNo | string | 是 | 活动编号 |

### 3.5 jumpJoinMemberExchangeActivity(params)
JUMP加入会员兑换活动

**请求方式**: POST
**接口路径**: `/member-activity-center/api/jump/brand/member`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| hotelGroupCode | string | 是 | 酒店集团代码 |
| memberNo | string | 是 | 会员编号 |
| activityNo | string | 是 | 活动编号 |

## 4. services/trip.js - 行程服务

### 4.1 getAdvertiseProductGroup(params, options)
获取广告产品组

**请求方式**: POST
**接口路径**: `/shop-api/productGroup/getAdvertiseProductGroupVo`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| hotelGroupCode | string | 是 | 酒店集团代码 |
| showLocation | string | 否 | 展示位置 |

### 4.2 getProductGroupGoodsDataList(params, options)
获取产品组商品数据列表

**请求方式**: POST
**接口路径**: `/shop-api/productGroup/getProductGroupGoodsDataList`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| hotelGroupCode | string | 是 | 酒店集团代码 |
| productGroupCode | string | 是 | 产品组代码 |
| firstResult | number | 否 | 起始位置（默认0） |
| pageSize | number | 否 | 每页数量（默认10） |

### 4.3 getTripRecommendFeed(params)
获取行程推荐Feed

**请求方式**: POST
**接口路径**: `/shopapi/marketingActivity/tripAssistantRecommendation`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| hotelGroupCode | string | 是 | 酒店集团代码 |
| memberId | string | 否 | 会员ID |
| firstResult | number | 否 | 起始位置 |
| pageSize | number | 否 | 每页数量 |

## 5. services/home.js - 首页服务

### 5.1 getAdData(params, options)
获取广告数据

**请求方式**: GET
**接口路径**: `/shopapi/sz/advertisementPage/v2`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| hotelCode | string | 否 | 酒店代码 |
| hotelGroupCode | string | 是 | 酒店集团代码 |
| showLocation | string | 是 | 展示位置标识 |
| clientTypes | string | 否 | 客户端类型 |
| firstResult | number | 否 | 起始位置（默认0） |
| pageSize | number | 否 | 每页数量（默认10） |

**返回值**:
```json
{
  "result": 1,
  "retVal": {
    "datas": [
      {
        "infos": "[{\"imageUrl\":\"...\", \"linkUrl\":\"...\", ...}]"
      }
    ]
  }
}
```

### 5.2 getDestinationsConfigSeries(params, options)
获取目的地配置系列

**请求方式**: GET
**接口路径**: `/shop-api/productShelfApp/getProductShelfConfigApp`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| hotelGroupCode | string | 是 | 酒店集团代码 |
| type | string | 否 | 类型 |

### 5.3 getDestinationsProductsByTab(params, options)
按Tab获取目的地产品

**请求方式**: POST
**接口路径**: `/shop-api/productShelfApp/getProductShelfInfoList`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| hotelGroupCode | string | 是 | 酒店集团代码 |
| productShelfCode | string | 是 | 产品货架代码 |
| firstResult | number | 否 | 起始位置 |
| pageSize | number | 否 | 每页数量 |

### 5.4 getSearchHotWordList(params, options)
获取搜索热词列表

**请求方式**: GET
**接口路径**: `/shopapi/search/getHomeHotWordList`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| hotelGroupCode | string | 是 | 酒店集团代码 |
| pageSize | number | 否 | 每页数量 |

### 5.5 quickSearch(params, options)
快速搜索（按标题）

**请求方式**: POST
**接口路径**: `/shopapi/search/product/title`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| hotelGroupCode | string | 是 | 酒店集团代码 |
| keyword | string | 是 | 关键词 |
| firstResult | number | 否 | 起始位置 |
| pageSize | number | 否 | 每页数量 |

### 5.6 search(params, options)
产品搜索

**请求方式**: POST
**接口路径**: `/shopapi/search/product`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| hotelGroupCode | string | 是 | 酒店集团代码 |
| keyword | string | 是 | 关键词 |
| searchType | string | 否 | 搜索类型 |
| firstResult | number | 否 | 起始位置 |
| pageSize | number | 否 | 每页数量 |

## 6. services/user.js - 用户服务

### 6.1 loginByAuthorization(params, options)
授权登录

**请求方式**: POST
**接口路径**: `/auth-center/api/login/authorization`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| code | string | 是 | 微信登录code |
| hotelGroupCode | string | 是 | 酒店集团代码 |
| appid | string | 是 | 小程序AppID |

**返回值**:
```json
{
  "success": true,
  "data": {
    "accessToken": "xxx",
    "refreshToken": "xxx",
    "userInfo": {...}
  }
}
```

### 6.2 loginByVerificationCode(params, options)
验证码登录

**请求方式**: POST
**接口路径**: `/auth-center/api/login/verification/code`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| mobile | string | 是 | 手机号 |
| code | string | 是 | 验证码 |
| hotelGroupCode | string | 是 | 酒店集团代码 |

### 6.3 refreshToken()
刷新Token

**请求方式**: POST
**接口路径**: `/auth-center/api/auth/refresh/token`

**说明**: 自动使用存储的refreshToken刷新accessToken

## 7. services/request/request.js - 请求封装

### 7.1 请求拦截器

**请求拦截器**:
- 自动注入accessToken和refreshToken到headers
- 显示loading

**响应拦截器**:
- 处理成功响应（status=200, success: true）
- 处理失败响应
- Token过期自动刷新
- 限流处理（status 429）
- 错误提示

### 7.2 配置选项

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| showLoading | boolean | false | 是否显示加载中 |
| showErrorToast | boolean | true | 是否显示错误提示 |
| retryCount | number | 0 | 重试次数 |
| _retry | boolean | false | 是否是重试请求 |
| _isTokenRefresh | boolean | false | 是否是Token刷新请求 |
| isReturnRawData | boolean | false | 是否返回原始数据 |
| skipErrorHandler | boolean | false | 跳过错误处理 |

### 7.3 Token刷新流程

```
1. 检测Token过期（isTokenExpired）
2. 裦查是否是重试请求
3. 调用refreshTokenAndRetry
4. 更新headers中的token
5. 重新发起请求
```

## 8. services/request/tokenManager.js - Token管理器

### 8.1 主要功能

| 方法 | 说明 |
|------|------|
| isTokenExpired(response) | 检查Token是否过期 |
| refreshTokenAndRetry() | 刷新Token并重试 |

### 8.2 Token过期判断

```javascript
// Token过期条件
response.status === 401
|| response.data?.code === 'TOKEN_EXPIRED'
|| response.data?.code === 'UNAUTHORIZED'
```

## 9. 使用示例

### 9.1 鐜索产品

```javascript
import { search, quickSearch } from '@/services/home';

// 搜索产品
const result = await search({
  hotelGroupCode: 'SONGTSAM',
  keyword: '松赞',
  firstResult: 0,
  pageSize: 10
});

// 快速搜索（按标题)
const quickResult = await quickSearch({
  hotelGroupCode: 'SONGTSAM',
  keyword: '拉萨',
  firstResult: 0,
  pageSize: 10
});
```

### 9.2 获取广告数据

```javascript
import { getAdData } from '@/services/home';

const adData = await getAdData({
  hotelGroupCode: 'SONGTSAM',
  showLocation: 'HOME_BANNER',
  pageSize: 10
});
```

### 9.3 用户登录

```javascript
import { loginByAuthorization, loginByVerificationCode } from '@/services/user';

// 微信授权登录
const loginResult = await loginByAuthorization({
  code: wxLoginCode,
  hotelGroupCode: 'SONGTSAM',
  appid: 'wxf26084f7c2585736'
});

// 验证码登录
const loginResult = await loginByVerificationCode({
  mobile: '13800138000',
  code: '123456',
  hotelGroupCode: 'SONGTSAM'
});
```
