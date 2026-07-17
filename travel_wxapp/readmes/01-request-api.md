# 请求封装与API接口文档

## 1. 请求封装 (utils/request.js)

### 1.1 基础配置

```javascript
// API域名配置
const domainConfig = {
  default: 'https://apiwx.songtsam.com/guardian',  // 商城API（默认）
  st: ''  // 预留扩展
};
```

### 1.2 请求方法

支持所有HTTP方法，统一通过 `request` 对象调用：

```javascript
request.get(url, data, headers, options)
request.post(url, data, headers, options)
request.put(url, data, headers, options)
request.delete(url, data, headers, options)
// ... 其他HTTP方法
```

### 1.3 请求参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| url | string | 接口地址（相对路径或完整URL） |
| data | object | 请求参数 |
| headers | object | 请求头 |
| options | object | 额外配置 |

### 1.4 Options配置项

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| module | string | 'default' | API模块，对应domainConfig的key |
| newModel | boolean | false | 是否使用新版错误处理模式 |
| hasGroupCode | boolean | false | 是否自动注入hotelGroupCode |
| showToast | boolean | true | 是否显示错误提示 |
| weLevel | number | - | 性能监控级别 |

### 1.5 请求处理流程

```
1. URL处理
   ├── 相对路径 → 拼接domainConfig对应域名
   └── 完整URL → 直接使用

2. 参数注入
   ├── memberId存在 → 自动注入memberToken
   ├── hasGroupCode=true → 自动注入hotelGroupCode
   └── rsapi接口 → 注入hotelCode、usercode、channel等

3. 请求签名
   ├── 获取appkey、appsecret
   ├── 调用signature.js生成签名
   └── 添加到请求参数

4. 发送请求
   ├── uni.request发起请求
   ├── 性能监控开始计时
   └── 返回Promise

5. 响应处理
   ├── 成功 → resolve(data)
   ├── 失败 → reject(error) + showToast
   └── 性能监控上报
```

### 1.6 自动注入参数

| 参数 | 条件 | 说明 |
|------|------|------|
| memberToken | data.memberId存在 | 用户认证token |
| hotelGroupCode | hasGroupCode=true | 酒店集团代码 |
| hotelCode | rsapi接口 | 酒店代码 |
| usercode | rsapi接口 | 用户代码（默认guest） |
| channel | rsapi接口 | 渠道（默认HKApp） |

### 1.7 响应格式

```javascript
// 成功响应
{
  result: 1,        // 1=成功
  retVal: {...},    // 返回数据
  code: 0           // 状态码
}

// 失败响应
{
  result: 0,        // 0=失败
  msg: "错误信息",
  code: xxxxx       // 错误码
}
```

### 1.8 错误码

| 错误码 | 说明 |
|--------|------|
| 10240001 | 请求失败（网络错误等） |
| 10240002 | 业务错误（code非0） |
| 429 | 请求限流 |

## 2. 存储管理 (utils/wxuser.js)

### 2.1 方法列表

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| getStorage | key: string | any | 获取本地存储 |
| setStorage | key, value | void | 设置本地存储 |
| removeStorage | key | Promise | 删除本地存储 |
| login | - | Promise | 微信登录获取code |

### 2.2 存储Key说明

| Key | 类型 | 说明 |
|-----|------|------|
| config | object | 系统配置（appkey、appsecret等） |
| user | object | 用户信息（memberToken、memberId等） |
| wxuser | object | 微信用户信息（openid、session_key） |
| cardSrc | string | 用户来源渠道 |
| partnerId | string | 合作伙伴ID |
| navList | array | 导航缓存 |
| isOpenH5Refresh | string | 是否开启H5刷新 |
| wmOrderListUrl | string | 微盟订单列表URL |
| wmCardListUrl | string | 微盟卡片列表URL |

## 3. API接口列表 (utils/api.js)

### 3.1 会员相关接口

| 方法 | 请求方式 | 接口路径 | 说明 |
|------|----------|----------|------|
| memberLoginOpen | GET | /api/member/memberLoginOpen.json | 静默登录 |
| memberLoginByMobileAndOpenId | GET | /api/member/memberLoginByMobileAndOpenId.json | 手机号+OpenId登录 |
| memberLoginByMobileCode | POST | /api/member/memberLoginByMobileCode.json | 手机验证码登录 |
| verifyCode | GET | /api/member/createIdentifyCode.json | 获取验证码 |
| verifyIdentifyCode | GET | /api/member/verifyIdentifyCode.json | 验证验证码 |
| refreshMemberInfo | GET | /api/member/refreshMemberInfo.json | 刷新会员信息 |
| update | POST | /api/member/updateMemberBaseInfo.json | 更新会员信息 |
| updateMemberInfoForWeiXin | POST | /api/member/updateMemberInfoForWeiXin.json | 更新微信信息 |
| fastRegister | POST | /api/member/fastRegister.json | 快速注册 |
| bindOpenId | GET | /api/member/bindOpenId.json | 绑定OpenId |
| removeOpenId | POST | /api/member/removeOpenId.json | 解绑OpenId |
| getAllCardLevel | GET | /api/member/getAllCardLevel.json | 获取所有卡等级 |
| queryMemberCardByCondition | POST | /api/member/queryMemberCardByCondition.json | 查询会员卡 |
| bindCardToMember | POST | /api/member/bindCardToMember.json | 绑定会员卡 |
| listAccount | GET | /api/member/getAccountIncludeTreatList.json | 获取账户列表 |
| listPoint | GET | /api/member/listPoint.json | 获取积分列表 |
| listPointByMemberId | GET | /api/member/listPointByMemberId.json | 按会员ID获取积分 |
| queryPointsExpiredRemindData | POST | /api/member/queryPointsExpiredRemindData.json | 积分过期提醒 |
| queryMemberUpgradeInfo | POST | /api/member/queryMemberUpgradeInfo.json | 会员升级信息 |
| isUpdateMemberBaseInfo | POST | /api/member/isUpdateMemberBaseInfo.json | 检查是否可更新 |
| threeMetaCheck | POST | /api/member/threeMetaCheck.json | 三元验证 |
| membercardInterestDesc | GET | /api/member/membercardInterestDesc.json | 会员卡权益说明 |
| getMemberInfoByCardNo | GET | /api/member/getMemberInfoByCardNo | 按卡号获取会员信息 |
| cmbchinaUserDataDes | POST | /api/tfMember/userDataDes.json | 招商银行用户数据 |
| cmbchinaGetAuthInfo | GET | /api/tfMember/getAuthInfo.json | 招商银行认证信息 |

### 3.2 优惠券相关接口

| 方法 | 请求方式 | 接口路径 | 说明 |
|------|----------|----------|------|
| getPresentCouponDetail | GET | /api/coupon/getPresentCouponDetail.json | 获取赠送券详情 |
| receiveGiftCoupon | GET | /api/coupon/receiveGiftCoupon.json | 领取赠送券 |
| presentGiftCoupon | GET | /api/coupon/presentGiftCoupon.json | 赠送优惠券 |
| findCouponDetailListByCouponNo | GET | /api/member/findCouponDetailListByCouponNo.json | 按券号查询 |
| findCouponDetailListByCondi | GET | /api/member/findCouponDetailListByCondi.json | 条件查询优惠券 |
| listCouponWithHistoryByCardNo | GET | /api/member/listCouponWithHistoryByCardNoV2 | 优惠券历史 |
| maxDiscount | POST | /api/coupon/compute/maxDiscount | 最大优惠计算 |
| checkCouponExclusion | POST | /api/coupon/checkCouponExclusion | 优惠券互斥检查 |
| getCanReceivedListNew | GET | /api/shop/getCanReceivedListNew.json | 可领取优惠券 |
| receiveSCCouponNew | POST | /api/shop/receiveSCCouponNew | 领取优惠券 |
| receiveSCCouponNewTransfer | POST | /api/shop/receiveSCCouponNewTransfer | 领取优惠券(转发) |
| bindCouponToMemberForPlatform | GET | /api/coupon/bindCouponToMemberForPlatform.json | 绑定优惠券 |

### 3.3 订单相关接口

| 方法 | 请求方式 | 接口路径 | 说明 |
|------|----------|----------|------|
| saveOrder | POST | /api/travel/saveOrder | 保存旅行订单 |
| orderDetail | GET | /api/travel/orderDetail | 订单详情 |
| orderQueryStatusApi | GET | /api/travel/orderQueryStatus | 订单状态查询 |
| travelPay | POST | /api/travel/pay.json | 旅行支付 |
| orderAggregation | GET | /api/orderAggregation/orderList.json | 订单聚合列表 |
| getCancelRule | POST | /api/wxMiniApp/getCancelRule.json | 获取取消规则 |
| resrvCheck | POST | /api/hotel/product/resrvCheck.json | 预订检查 |
| makeOrder | POST | /api/hotel/product/makeOrder.json | 创建订单 |
| showOrder | GET | /api/hotel/product/showOrder.json | 订单展示 |
| submitOrder | POST | /api/shop/submitOrder.json | 提交商城订单 |
| shopOrderDetail | GET | /api/shop/orderDetail.json | 商城订单详情 |
| shopPay | POST | /api/shop/pay.json | 商城支付 |
| shopOrderListSearch | POST | /memberapi/weiMobCloudShopOrder/shopOrderListSearch | 商城订单搜索 |

### 3.4 酒店相关接口

| 方法 | 请求方式 | 接口路径 | 说明 |
|------|----------|----------|------|
| hotelInfo | GET | /api/hotel/info.json | 酒店信息 |
| hotelListAll | POST | /api/hotel/hotelListAllNew.json | 酒店列表 |
| findHotel | POST | /api/hotel/findHotelByCondition.json | 条件查询酒店 |
| pageHotelListForApp | GET | /hotelapi/aggregateProductList/pageHotelListForApp | App酒店列表 |

### 3.5 支付相关接口

| 方法 | 请求方式 | 接口路径 | 说明 |
|------|----------|----------|------|
| pay | GET | /api/pay/pay.json | 支付 |
| xhsPay | POST | /redminiapi/deal/query_pay_token | 小红书支付 |
| activityPay | POST | /api/singleActivity/pay | 活动支付 |
| getPayDetail | GET | /api/singleActivity/payDetail | 支付详情 |

### 3.6 行程相关接口

| 方法 | 请求方式 | 接口路径 | 说明 |
|------|----------|----------|------|
| getMyTravelList | POST | /api/team/order/myTravelList | 我的旅行列表 |

### 3.7 活动相关接口

| 方法 | 请求方式 | 接口路径 | 说明 |
|------|----------|----------|------|
| activityOrder | GET | /api/singleActivity/querySingleActivityOrder | 活动订单查询 |
| saveActivityOrder | POST | /api/singleActivity/saveSingleActivityOrder | 保存活动订单 |
| cancelSingleActivityOrder | GET | /api/singleActivity/cancelSingleActivityOrder | 取消活动订单 |
| calculatePrice | POST | /api/singleActivity/getSingleActivityOrderPrice | 计算价格 |
| activityTaskList | POST | /activityapi/tasketCenter/selectMarketTaskCentersH5 | 活动任务列表 |
| marketingActivityPage | POST | /shopapi/sz/marketingActivityPage | 营销活动分页 |
| listMarketingProducts | GET | /shopapi/marketingActivity/listMarketingProducts | 营销产品列表 |
| queryMarketingProducts | POST | /shopapi/marketingActivity/listMarketingProductsByCodes | 按编码查询产品 |
| checkWhitelist | GET | /api/marketingActivity/whitelist/checkWhitelist | 检查白名单 |

### 3.8 商城相关接口

| 方法 | 请求方式 | 接口路径 | 说明 |
|------|----------|----------|------|
| goodsDetail | GET | /api/shop/goodsDetail.json | 商品详情 |
| goodsSku | GET | /api/shop/goodsSku.json | 商品SKU |
| listGoods | GET | /api/shop/listGoods.json | 商品列表 |
| shopGoodsPage | GET | /shopapi/sz/shopGoodsPage | 商品分页 |
| shopGoodsTemplate | GET | /api/shop/shopGoodsTemplate.json | 商品模板 |
| getScrollPic | GET | /api/shop/getScrollPic.json | 滚动图片 |
| getShopButtonConfig | GET | /api/shop/getShopButtonConfig.json | 商城按钮配置 |
| getShopMemberCenterConfig | GET | /api/shop/getShopMemberCenterConfig | 会员中心配置 |
| batchQueryShopConfig | GET | /api/shop/batchQueryShopConfig.json | 批量查询配置 |
| getWxacodeParams | GET | /api/shop/getWxacodeParams.json | 小程序码参数 |
| getCodeInfo | GET | /api/shop/getCodeInfo.json | 代码信息 |
| getWjxUrl | GET | /api/shop/getWjxUrl | 问卷星URL |

### 3.9 收藏相关接口

| 方法 | 请求方式 | 接口路径 | 说明 |
|------|----------|----------|------|
| addGoodsCollection | POST | /api/shop/addGoodsCollection.json | 添加收藏 |
| deleteGoodsCollection | POST | /api/shop/deleteGoodsCollection.json | 删除收藏 |
| getGoodsIsCollection | GET | /api/shop/getGoodsIsCollection.json | 是否已收藏 |
| getGoodsCollection | GET | /api/shop/getGoodsCollection.json | 收藏列表 |
| shopAddGoodsCollection | POST | /api/shop/addGoodsCollection | 添加收藏(新版) |
| shopDeleteGoodsCollection | POST | /api/shop/deleteGoodsCollection | 删除收藏(新版) |
| shopGetGoodsIsCollection | GET | /api/shop/getGoodsIsCollection | 是否已收藏(新版) |
| shopGetGoodsCollection | GET | /api/shop/getGoodsCollection | 收藏列表(新版) |

### 3.10 地址相关接口

| 方法 | 请求方式 | 接口路径 | 说明 |
|------|----------|----------|------|
| addAddress | POST | /api/member/shippingAddress.json | 添加地址 |
| getMemberAddress | GET | /api/member/shippingAddress.json | 获取地址列表 |
| deleteAddress | DELETE | /api/member/shippingAddress.json | 删除地址 |

### 3.11 发票相关接口

| 方法 | 请求方式 | 接口路径 | 说明 |
|------|----------|----------|------|
| getOrderInvoiceSta | GET | /api/invoice/getOrderInvoiceSta.json | 订单发票状态 |
| applyInvoice | GET | /api/invoice/applyInvoice.json | 申请发票 |
| saveOrUpdateMemberInvoice | POST | /api/member/saveOrUpdateMemberInvoice.json | 保存发票信息 |
| memberInvoice | GET | /api/member/memberInvoice.json | 会员发票信息 |
| deleteMemberInvoice | GET | /api/member/deleteMemberInvoice.json | 删除发票 |
| saveOrUpdateOrderInvoice | GET | /api/invoice/saveOrUpdateOrderInvoice.json | 保存订单发票 |
| getInvoiceOrder | GET | /api/invoice/getInvoiceOrder.json | 发票订单 |
| getInvoiceAmountAndMsg | GET | /api/invoice/getInvoiceAmountAndMsg.json | 发票金额和消息 |

### 3.12 奖品相关接口

| 方法 | 请求方式 | 接口路径 | 说明 |
|------|----------|----------|------|
| prizewinner | GET | /api/wechat/platform/game/prizewinner.json | 中奖者信息 |
| rewardlist | GET | /api/wechat/platform/game/rewardlist.json | 奖品列表 |
| savePrizeAddress | GET | /api/wechat/platform/game/savePrizeAddress.json | 保存奖品地址 |

### 3.13 合同相关接口

| 方法 | 请求方式 | 接口路径 | 说明 |
|------|----------|----------|------|
| invokeExtSign | GET | /api/fdd/invokeExtSign.json | 调用签署 |
| downloadContractNoByGcRsvNo | GET | /api/fdd/downloadContractNoByGcRsvNo.json | 下载合同 |
| getContractNoByGcRsvNo | GET | /api/fdd/getContractNoByGcRsvNo.json | 获取合同编号 |

### 3.14 客人相关接口

| 方法 | 请求方式 | 接口路径 | 说明 |
|------|----------|----------|------|
| listGuestLinkExtraInfoWithMemberIdOrOpenId | POST | /memberapi/guestBase/listGuestLinkExtraInfoWithMemberIdOrOpenId | 客人信息列表 |
| saveGuestBase | POST | /memberapi/guestBase/saveGuestBase | 保存客人信息 |
| updateGuestBase | POST | /memberapi/guestBase/updateGuestBase | 更新客人信息 |
| deleteGuestLinkRelation | POST | /memberapi/guestBase/deleteGuestLinkRelation | 删除客人关系 |
| recognizeIdcardV2 | POST | /memberapi/guestBase/recognizeIdcardV2 | 身份证识别 |
| saveMemberGuestLinkRelation | POST | /memberapi/guestBase/saveMemberGuestLinkRelation | 保存客人关系 |
| guestCheck | POST | /api/selfBook/guestCheck.json | 客人检查 |
| orderGuest | - | 页面 | 订单客人页面 |

### 3.15 服务相关接口

| 方法 | 请求方式 | 接口路径 | 说明 |
|------|----------|----------|------|
| createServerOrder | POST | /rsapi/rsOrder/createServerOrderV2 | 创建服务订单 |
| updateOrder | POST | /rsapi/rsOrder/updateOrder | 更新订单 |
| updateInstantRsOrder | POST | /rsapi/rsIsOrder/updateInstantRsOrder | 更新即时订单 |
| orderList | POST | /rsapi/rsOrder/list | 订单列表 |
| getListHotelService | GET | /hotelapi/hotelServiceManage/listHotelServiceBySta | 酒店服务列表 |
| listHotelServiceBySta | GET | /hotelapi/hotelServiceManage/listHotelServiceBySta | 酒店服务(按状态) |
| saveRecomm | POST | /rsapi/rhkMiniapp/saveRecommV2 | 保存推荐 |
| getComplaintAndAdvice | POST | /rsapi/frontend/getComplaintAndAdvice | 投诉建议 |
| queryUserInfo | GET | /rsapi/rsDuty/queryUserInfo | 查询用户信息 |

### 3.16 营销页面接口

| 方法 | 请求方式 | 接口路径 | 说明 |
|------|----------|----------|------|
| advertisementPage | GET | /shopapi/sz/advertisementPage | 广告页面 |
| marketingPage | POST | /shopapi/sz/marketingPage | 营销页面 |
| travelProductList | POST | /shopapi/sz/travelProductList | 旅行产品列表 |
| modePage | POST | /shopapi/sz/modePage | 模式页面 |
| msgPage | POST | /shopapi/sz/msgPage | 消息页面 |
| queryProductsByMarketingTags | GET | /shopapi/sz/queryProductsByMarketingTags.json | 按标签查询产品 |
| queryMarketingPageTags | GET | /shopapi/sz/queryMarketingPageTags.json | 查询营销页标签 |

### 3.17 系统配置接口

| 方法 | 请求方式 | 接口路径 | 说明 |
|------|----------|----------|------|
| getMultiSysOptionCommon | GET | /api/cache/sysOptions/getMultiSysOptionCommon.json | 获取系统配置 |
| interfaceTransfer | POST | /api/sync/interfaceTransfer | 接口转发 |
| getBaiduAk | GET | /service/BaiduApi/baiduAk | 百度地图AK |
| mapSysDic | GET | /rsapi/rhkMiniapp/mapSysDic | 系统字典 |
| checkPointCustomize | POST | /hotelapi/MapModeConfig/checkPointCustomize | 检查自定义点位 |

### 3.18 微信相关接口

| 方法 | 请求方式 | 接口路径 | 说明 |
|------|----------|----------|------|
| getWxCode | POST | /api/microSoftWare/getOpenidSessionKeyV2.json | 获取OpenId |
| decrypt | POST | /api/wxMiniApp/decryptV2.json | 解密数据 |
| updateUserinfoByMiniOpenId | POST | /api/wxMiniApp/updateUserinfoByMiniOpenId.json | 更新微信用户信息 |
| saveUserViewPrivacyPop | GET | /api/wxMiniApp/saveUserViewPrivacyPop | 保存隐私弹窗 |
| getUserViewPrivacyPop | POST | /api/wxMiniApp/getUserViewPrivacyPop | 获取隐私弹窗 |
| getWxacodeUnlimitUrl | GET | /api/microSoftWare/admin/getWxacodeUnlimitUrl.json | 获取小程序码 |

### 3.19 其他接口

| 方法 | 请求方式 | 接口路径 | 说明 |
|------|----------|----------|------|
| getUserAvailableCardList | GET | /memberapi/weiMobCloudCard/getUserAvailableCardList | 用户可用卡列表 |
| getDiscountOfMember | POST | /api/distribution/getDiscountOfMember.json | 会员折扣 |
| weimoInterfaceTransfer | POST | /shopapi/weimobCloud/interfaceTransfer | 微盟接口转发 |
| listTravelDictionary | POST | /shopapi/marketingActivityPage/listTravelDictionary | 旅行字典 |
| deliveryMessageItemAjax | GET | /api/shop/deliveryMessageItemAjax.json | 配送消息 |
| firstOrderSourceRecorder | GET | /api/member/saveMemberFirstOrderSource.json | 首单来源记录 |

### 3.20 邀请相关接口

| 方法 | 请求方式 | 接口路径 | 说明 |
|------|----------|----------|------|
| selectInvitationSpoilRules | POST | /activityapi/InvitationSpoil/selectInvitationSpoilRules | 邀请规则 |
| saveInvitationYQHYRecord | POST | /activityapi/InvitationSpoil/saveInvitationYQHYRecord | 保存邀请记录 |
| saveInvitationJSYQRecord | POST | /activityapi/InvitationSpoil/saveInvitationJSYQRecord | 保存JS邀请记录 |
| findInvitationLandConfigByCodeH5 | GET | /activityapi/InvitationSpoil/findInvitationLandConfigByCodeH5 | 邀请落地页配置 |
| ifCanRewardGiveaways | POST | /activityapi/InvitationSpoil/ifCanRewardGiveaways | 是否可奖励赠品 |

## 4. 请求签名机制

### 4.1 签名流程

```
1. 获取 appkey 和 appsecret
2. 处理请求参数（undefined转为空字符串）
3. 调用 signature.js 生成签名
4. 签名参数附加到请求中
```

### 4.2 签名参数

| 参数 | 说明 |
|------|------|
| appkey | 应用标识 |
| appsecret | 应用密钥 |
| sign | 签名值 |
| timestamp | 时间戳 |

## 5. 性能监控

### 5.1 监控指标

| 指标 | 说明 |
|------|------|
| wxdata_perf_monitor_id | 请求ID（URL） |
| wxdata_perf_monitor_level | 监控级别 |
| wxdata_perf_error_code | 错误码 |
| wxdata_perf_error_msg | 错误信息 |
| wxdata_perf_cost_time | 耗时（ms） |
| wxdata_perf_extra_info1 | 额外信息（请求/响应详情） |

### 5.2 上报方式

```javascript
wx.reportEvent('wxdata_perf_monitor', {
  wxdata_perf_monitor_id: url,
  wxdata_perf_monitor_level: level,
  wxdata_perf_error_code: code,
  wxdata_perf_error_msg: msg,
  wxdata_perf_cost_time: duration,
  wxdata_perf_extra_info1: JSON.stringify(extra)
});
```
