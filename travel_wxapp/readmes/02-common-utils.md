# 公共工具函数文档

## 1. 工具函数概览

| 文件 | 说明 |
|------|------|
| utils/utils.js | 通用工具函数 |
| utils/helper.js | 辅助工具（图片处理、样式转换） |
| utils/index.js | 基础工具（URL构建、登录跳转） |
| utils/wxuser.js | 微信用户存储管理 |
| utils/user.js | 用户服务（登录、登出、信息更新） |
| utils/config.js | 全局配置 |
| utils/api.js | API接口定义 |
| utils/request.js | 网络请求封装 |
| utils/signature.js | 请求签名 |
| utils/log.js | 日志工具 |
| utils/qdTracker.js | 起点追踪 |
| utils/umengAdaptor.js | 友盟适配器 |
| utils/aplus.js | 阿里云APlus监控 |
| utils/channelLinkParse.js | 渠道链接解析 |
| utils/routingIntercept.js | 路由拦截 |
| utils/makeOrder.js | 下单工具 |
| utils/md5.js | MD5加密 |
| utils/qqmap-wx-jssdk.min.js | 腾讯地图SDK |
| utils/filter.js | 过滤器 |
| utils/getMemberUI.js | 会员UI获取 |
| utils/miniProgram.js | 小程序工具 |
| utils/platform.js | 平台检测 |
| utils/preventScroll.js | 防滚动 |
| utils/uploadFile.js | 文件上传 |
| utils/url.js | URL处理 |
| utils/validation.js | 表单验证 |

## 2. utils/utils.js - 通用工具函数

### 2.1 页面导航

#### goPage(url, isRedirect)
页面跳转

| 参数 | 类型 | 说明 |
|------|------|------|
| url | string | 跳转地址（支持小程序页面和HTTP链接） |
| isRedirect | boolean | 是否重定向（默认false） |

**特性**：
- HTTP链接自动跳转到webview页面
- 支持跳转其他小程序（URL含appid参数）
- 自动处理TabBar页面

#### goPageWithUser(url)
需登录的页面跳转

| 参数 | 类型 | 说明 |
|------|------|------|
| url | string | 跳转地址 |

**逻辑**：
- 已登录：直接跳转
- 未登录：跳转登录页

#### toLogin(options)
跳转登录页

| 参数 | 类型 | 说明 |
|------|------|------|
| options | object | 登录选项 |
| options.redirect_url | string | 登录后重定向地址 |
| options.mode | string | 'back'返回上一页 |

#### toLoginBack()
登录后返回上一页

#### goWmUrl(type)
跳转微盟URL

| 参数 | 类型 | 说明 |
|------|------|------|
| type | string | 'showCard'卡包 / 'orderList'订单列表 |

### 2.2 URL处理

#### createUrl(params)
构建URL查询字符串

| 参数 | 类型 | 返回值 |
|------|------|--------|
| params | object | string |

```javascript
// 示例
createUrl({ id: 1, name: 'test' }) // "id=1&name=test"
```

#### getUrlParams(url)
解析URL参数

| 参数 | 类型 | 返回值 |
|------|------|--------|
| url | string | object |

```javascript
// 示例
getUrlParams('pages/index?id=1&name=test') // { id: '1', name: 'test' }
```

#### getUrl(url)
为URL添加openid和appid参数

| 参数 | 类型 | 返回值 |
|------|------|--------|
| url | string | string |

#### urlEncode(data, key, prefix)
URL编码（支持嵌套对象）

### 2.3 数值计算

#### addNum(a, b)
精确加法（避免浮点误差）

```javascript
addNum(0.1, 0.2) // 0.3
```

#### subtraction(a, b)
精确减法

```javascript
subtraction(0.3, 0.1) // 0.2
```

### 2.4 DOM操作

#### getRect(context, selector)
获取元素 boundingClientRect

| 参数 | 类型 | 返回值 |
|------|------|--------|
| context | object | 组件上下文 |
| selector | string | CSS选择器 |

返回：`Promise<ClientRect>`

#### getAllRect(context, selector)
获取多个元素 boundingClientRect

#### getBoundingClientRect(selector)
获取单个元素的boundingClientRect（无需context）

### 2.5 会员相关

#### getCurrentCard()
获取当前会员卡

返回：`[cardInfo, cardIndex]`

#### refreshMemberInfo(callback)
刷新会员信息

#### queryOrderGuestIsAll(orderNo, callback)
查询订单客人是否全部添加

### 2.6 其他工具

#### getQuery()
获取当前页面参数

返回：`object`

#### getReallyPx(px)
转换为实际像素（基于375设计稿）

#### getMaxWidthContent(html)
处理HTML图片最大宽度

#### genSessionId(length)
生成会话ID

| 参数 | 类型 | 说明 |
|------|------|------|
| length | number | ID长度（默认64字符） |

#### hexToRgba(hex, alpha)
十六进制转RGBA

```javascript
hexToRgba('#ffffff', 0.5) // "rgba(255,255,255, 0.5)"
```

#### convertToCSSColor(number)
数字转CSS颜色

#### hasIllegalInputValue(str)
检查是否包含非法字符（Emoji等）

#### requestMsg(tmplIds)
请求订阅消息

返回：`Promise`

#### isCmbchina()
是否招商银行渠道（当前返回false）

## 3. utils/helper.js - 辅助工具

### 3.1 图片处理

#### imageView2(options)
腾讯云图片处理 - imageView2接口

| 参数 | 类型 | 说明 |
|------|------|------|
| options.url | string | 图片URL |
| options.mode | number | 处理模式（0-5） |
| options.width | number | 宽度 |
| options.height | number | 高度 |

```javascript
// 示例
imageView2({ url: 'xxx.jpg', mode: 1, width: 200 })
// "xxx.jpg?imageView2/1/w/200"
```

#### imageMogr2(url, thumbnail)
腾讯云图片处理 - imageMogr2接口

| 参数 | 类型 | 说明 |
|------|------|------|
| url | string | 图片URL |
| thumbnail | string | 缩略图参数 |

```javascript
// 示例
imageMogr2('xxx.jpg', '200x') // "xxx.jpg?imageMogr2/thumbnail/200x"
```

#### shareImageTransfrom(url, type, size)
分享图片转换

| 参数 | 类型 | 说明 |
|------|------|------|
| url | string | 图片URL |
| type | string | 'message'消息 / 'timeline'朋友圈 |
| size | number | 尺寸（默认message:320, timeline:120） |

#### transformHttps(url)
HTTP转HTTPS

### 3.2 样式工具

#### pxTransform(value, designWidth, returnNumber)
px转换（基于设计稿）

| 参数 | 类型 | 说明 |
|------|------|------|
| value | number | 设计稿像素值 |
| designWidth | number | 设计稿宽度（默认750） |
| returnNumber | boolean | 是否返回数值 |

```javascript
// 示例（屏幕宽度375）
pxTransform(100, 750) // "50px"
pxTransform(100, 750, true) // 50
```

#### addCssUnit(value, unit)
添加CSS单位

```javascript
addCssUnit(100) // "100px"
addCssUnit(100, 'rpx') // "100rpx"
```

### 3.3 异步工具

#### waitTime(ms)
等待指定时间

```javascript
await waitTime(1000) // 等待1秒
```

## 4. utils/index.js - 基础工具

#### createUrl(params)
构建URL参数（同utils.js）

#### genSessionId(length)
生成会话ID

#### jumpLogin(options)
跳转登录页

| 参数 | 类型 | 说明 |
|------|------|------|
| options.pageQuery | object | 页面参数 |
| options.query | object | 登录页参数 |
| options.backPrevPage | boolean | 是否返回上一页（默认true） |

## 5. utils/wxuser.js - 存储管理

### 5.1 方法列表

#### getStorage(key)
获取本地存储

| 参数 | 类型 | 返回值 |
|------|------|--------|
| key | string | any |

**特殊处理**：
- `key='config'`：返回config配置，优先取extConfig

#### setStorage(key, value)
设置本地存储

| 参数 | 类型 | 返回值 |
|------|------|--------|
| key | string | void |
| value | any | - |

#### removeStorage(key)
删除本地存储

返回：`Promise`

#### login()
微信登录

返回：`Promise<{code: string}>`

### 5.2 存储Key常量

| Key | 类型 | 说明 |
|-----|------|------|
| config | object | 系统配置 |
| user | object | 用户信息 |
| wxuser | object | 微信用户信息 |
| cardSrc | string | 用户来源 |
| partnerId | string | 合作伙伴ID |
| navList | array | 导航缓存 |
| isOpenH5Refresh | string | H5刷新开关 |
| wmOrderListUrl | string | 微盟订单URL |
| wmCardListUrl | string | 微盟卡片URL |
| access_token | string | 访问令牌 |
| refresh_token | string | 刷新令牌 |

## 6. utils/user.js - 用户服务

### 6.1 方法列表

#### getWxUserInfo(defaultName)
获取微信用户信息

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| defaultName | string | '松赞家人' | 默认昵称 |

返回：`Promise<WxUserInfo>`

**流程**：
1. 检查缓存中的wxuser
2. 有session_key：直接返回
3. 无session_key：调用login获取code，请求api.getWxCode

#### updateUserInfo(userInfo)
更新用户信息

| 参数 | 类型 | 说明 |
|------|------|------|
| userInfo | object | 用户信息对象 |

**操作**：
- 存储到本地
- 更新qdTracker账户信息

#### getUserToken()
获取用户令牌

返回：`{ accessToken, refreshToken }`

#### setUserToken(tokens)
设置用户令牌

| 参数 | 类型 | 说明 |
|------|------|------|
| tokens.accessToken | string | 访问令牌 |
| tokens.refreshToken | string | 刷新令牌 |

#### removeUserToken()
删除用户令牌

#### removeLocalUserInfo()
删除本地用户信息（包含tokens和user）

#### removeOpenIdAndSignOut(silent, redirectUrl)
解绑OpenId并退出登录

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| silent | boolean | false | 是否静默退出 |
| redirectUrl | string | '/pages/member/memberCenter' | 重定向地址 |

返回：`Promise`

## 7. utils/config.js - 全局配置

```javascript
config = {
  env: 'production',           // 环境
  version: '3.1.0',            // 版本
  hotelGroupCode: 'SONGTSAM',  // 酒店集团代码
  hotelGroupId: 1,             // 酒店集团ID
  hotelCode: 0,                // 酒店代码
  hotelId: 0,                  // 酒店ID
  appid: 'wxf26084f7c2585736', // 小程序AppID
  hotelGroupName: '松赞旅行',   // 酒店集团名称
  componentAppid: '',          // 组件AppID
  isOpenHotelGroupBook: 'T',   // 开启集团预订
  isOpenDistribution: 'T',     // 开启分销
  isOpenAdvancedSearch: 'T',   // 开启高级搜索
  mallAppid: '',               // 商城AppID
  isOpenBook: 'T',             // 开启预订
  equipment: 'desktop',        // 设备类型
  isOpenHotelListBigPictureMode: 'T', // 开启大图模式
  domain: 'https://m.songtsam.com',   // H5域名
  baseUrlmall: 'https://apiwx.songtsam.com/guardian', // 商城API
  baseUrlApi: 'https://api.songtsam.com', // 主API
  appkey: '81756736',          // 应用Key
  appsecret: 'xxx',            // 应用密钥
  aplusQueueAppKey: 'xxx',     // APlus AppKey
  qidianAppkey: 'xxx',         // 起点AppKey
  qidianApiHost: 'https://event.songtsam.com', // 起点API
}
```

## 8. 使用示例

### 8.1 页面跳转

```javascript
import { goPage, goPageWithUser, toLogin } from '@/utils/utils';

// 普通跳转
goPage('/pages/travel/travelDetail?id=123');

// 需登录跳转
goPageWithUser('/pages/member/orderList');

// 跳转H5
goPage('https://m.songtsam.com/activity');

// 跳转登录
toLogin({ redirect_url: '/pages/member/orderList' });
```

### 8.2 图片处理

```javascript
import { imageView2, imageMogr2 } from '@/utils/helper';

// 缩略图
const thumbUrl = imageView2({ url: originalUrl, mode: 1, width: 200 });

// 压缩图
const compressUrl = imageMogr2(originalUrl, '100x');
```

### 8.3 存储操作

```javascript
import { getStorage, setStorage } from '@/utils/wxuser';

// 获取用户信息
const user = getStorage('user');
const config = getStorage('config');

// 设置存储
setStorage('cardSrc', 'WECHAT_MINI');
```

### 8.4 用户操作

```javascript
import { getWxUserInfo, updateUserInfo, removeLocalUserInfo } from '@/utils/user';

// 获取微信用户
const wxUser = await getWxUserInfo();

// 更新用户信息
await updateUserInfo(loginResult);

// 退出登录
removeLocalUserInfo();
```
