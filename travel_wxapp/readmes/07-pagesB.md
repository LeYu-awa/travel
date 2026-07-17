# 分包B - 旅行相关页面

## 页面概览

| 序号 | 页面路径 | 功能 |
|------|----------|------|
| 1 | travel/travelDetail | 旅行产品详情 |
| 2 | other/question | 查询问答 |
| 3 | other/questionDetail | 查询问答详情 |
| 4 | other/pay | 支付页面 |
| 5 | other/browserPay | 浏览器支付 |
| 6 | other/xhsPayBridge | 小红书支付桥接 |
| 7 | travel/theme | 主题页面 |
| 8 | travel/confirmOrder | 确认订单 |
| 9 | travel/travelersInfo | 旅行者信息 |
| 10 | travel/orderGuest | 订单客人 |
| 11 | travel/orderGuestSuccess | 订单客人成功 |
| 12 | travel/tips | 旅行提示 |
| 13 | travel/contract | 合同页面 |
| 14 | travel/contractConfirm | 合同确认 |
| 15 | travel/paySuccess | 支付成功 |
| 16 | travel/orderCancel | 订单取消 |
| 17 | invite/invite | 邀请页面 |
| 18 | invite/inviteShare | 邀请分享 |
| 19 | travel/orderDetail | 订单详情 |
| 20 | exchangeCoupon/exchangeCouponDetail | 优惠券兑换详情 |
| 21 | exchangeCoupon/exchangeList | 优惠券兑换列表 |
| 22 | （由orderDetail进入）保险单查看 | 保险单下载/查看（非独立源页面） |

---

## 合同与保险流程补充

建议在迁移时按如下链路实现：

1. 确认订单后进入 `travel/tips`（签约前提示）。  
2. 调用签约接口后进入 `travel/contract`（签约中转/等待）。  
3. 签约完成进入 `travel/contractConfirm`。  
4. 再进入支付页 `other/pay` 完成支付。  
5. 支付后在 `travel/orderDetail` 查看合同附件与保险单（如有）。  

---

## 1. travel/travelDetail - 旅行产品详情

### 功能描述
旅行产品详情页，展示：
- 产品轮播图/视频
- 产品基本信息（名称、价格、标签）
- 行程介绍（mp-html富文本）
- 价格日历
- 预订须知
- 底部操作栏（收藏、立即预订）

### 组件依赖
| 组件名 | 功能 |
|------|------|
| backToTop | 返回顶部 |
| bottomDialog | 底部对话框 |
| collapse | 折叠面板 |
| coustomHead | 自定义头部 |
| kfDialog | 客服对话框 |
| ErrorLimiting | 错误限流 |
| LimitingRetryDialog | 限流重试对话框 |
| Stepper | 步进器 |
| noData | 无数据 |
| share | 分享 |
| swiperBox | 轮播框 |
| dailyPrice | 每日价格 |
| CategorySubInfo | 分类子信息 |
| mp-html | 富文本解析 |

### 接口列表

#### 1. goodsDetail - 产品详情
- **接口路径**: `GET /api/shop/goodsDetail.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | goodsId | string | 是 | 产品ID |
  | hotelGroupCode | string | 是 | 酒店集团代码 |
  | memberId | string | 否 | 会员ID |

- **出参**:
  | 字段名 | 类型 | 说明 |
  |--------|------|------|
  | result | number | 1=成功 |
  | retVal | object | 产品详情对象 |
  | retVal.goodsId | string | 产品ID |
  | retVal.goodsName | string | 产品名称 |
  | retVal.price | number | 价格 |
  | retVal.originalPrice | number | 原价 |
  | retVal.images | array | 图片列表 |
  | retVal.detail | string | 详情HTML |
  | retVal.notice | string | 预订须知 |
  | retVal.tags | array | 标签列表 |

#### 2. getGoodsIsCollection - 是否已收藏
- **接口路径**: `GET /api/shop/getGoodsIsCollection.json`

#### 3. addGoodsCollection - 添加收藏
- **接口路径**: `POST /api/shop/addGoodsCollection.json`

#### 4. deleteGoodsCollection - 取消收藏
- **接口路径**: `POST /api/shop/deleteGoodsCollection.json`

### 页面跳转
- **跳转至**: `/pagesB/travel/confirmOrder`

---

## 2. travel/confirmOrder - 确认订单

### 功能描述
订单确认页面，包含：
- 产品信息展示
- 日期选择（日历组件）
- 房间数量选择
- 优惠券选择
- 联系人信息
- 提交订单

### 组件依赖
| 组件名 | 功能 |
|------|------|
| bottomDialog | 底部对话框 |
| calendar | 日历组件 |
| couponItem | 优惠券项 |
| coustomHead | 自定义头部 |
| empty | 空状态 |
| kfDialog | 客服对话框 |
| CustomerRetentionDialog | 客户留存对话框 |
| NumberTransition | 数字过渡动画 |
| Stepper | 步进器 |
| StRadio | 单选框 |
| radioBox | 单选框 |
| RetryModal | 重试弹窗 |

### 接口列表

#### 1. saveOrder - 保存订单
- **接口路径**: `POST /api/travel/saveOrder`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | goodsId | string | 是 | 产品ID |
  | memberId | string | 是 | 会员ID |
  | checkInDay | string | 是 | 入住日期 |
  | checkOutDay | string | 是 | 离店日期 |
  | roomNum | number | 是 | 房间数 |
  | adultNum | number | 是 | 成人数 |
  | childNum | number | 否 | 儿童数 |
  | couponNo | string | 否 | 优惠券编号 |
  | contactName | string | 是 | 联系人姓名 |
  | contactMobile | string | 是 | 联系人手机 |
  | remark | string | 否 | 备注 |

#### 2. getAvailableCoupon - 可用优惠券
- **接口路径**: `POST /api/shop/getAvailableCoupon`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | hotelGroupCode | string | 是 | 酒店集团代码 |
  | hotelGroupId | number | 是 | 酒店集团ID |
  | memberId | string | 是 | 会员ID |
  | goodsId | string | 是 | 产品ID |
  | amount | number | 是 | 订单金额 |

#### 3. maxDiscount - 最大优惠计算
- **接口路径**: `POST /api/coupon/compute/maxDiscount`

### 页面跳转
- **跳转至**:
  - `/pagesB/travel/paySuccess` - 支付成功
  - `/pagesB/travel/travelersInfo` - 填写旅行者信息

---

## 3. travel/orderDetail - 订单详情

### 功能描述
展示旅行订单详情

### 合同与保险展示（补充）

- 合同：可通过订单详情内的附件入口查看线路合同。  
- 保险：当旅客存在保单号（`chitNo`）时，订单详情会展示“保险单”附件入口。  

### 接口列表

#### 1. orderDetail - 订单详情
- **接口路径**: `GET /api/travel/orderDetail`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | orderNo | string | 是 | 订单编号 |

- **出参**:
  | 字段名 | 类型 | 说明 |
  |--------|------|------|
  | result | number | 1=成功 |
  | retVal | object | 订单详情 |
  | retVal.orderNo | string | 订单编号 |
  | retVal.orderStatus | string | 订单状态 |
  | retVal.goodsName | string | 产品名称 |
  | retVal.checkInDay | string | 入住日期 |
  | retVal.checkOutDay | string | 离店日期 |
  | retVal.totalAmount | number | 总金额 |
  | retVal.payAmount | number | 支付金额 |
  | retVal.guests | array | 客人列表 |

#### 2. getContractNoByGcRsvNo - 获取合同编号/合同地址
- **接口路径**: `GET /api/fdd/getContractNoByGcRsvNo.json`

#### 3. insuranceDownload - 保险单下载
- **接口路径**: `GET /api/fdd/insuranceDownload?insuranceNo={保险单号}&hotelGroupCode={集团代码}`

---

## 3.1 travel/contractConfirm - 合同确认

### 功能描述
签约完成后的确认页，倒计时后回到订单详情。

### 页面跳转
- **跳转至**: `/pagesB/travel/orderDetail?orderNo=xxx`

---

## 4. travel/paySuccess - 支付成功

### 功能描述
支付成功提示页

### 页面参数
| 参数名 | 类型 | 说明 |
|--------|------|------|
| orderNo | string | 订单编号 |

---

## 5. travel/orderCancel - 订单取消

### 功能描述
订单取消页面

### 接口列表

#### 1. getCancelRule - 获取取消规则
- **接口路径**: `POST /api/wxMiniApp/getCancelRule.json`

---

## 6. travel/travelersInfo - 旅行者信息

### 功能描述
填写出行人信息

### 接口列表

#### 1. saveGuestBase - 保存旅客信息
- **接口路径**: `POST /memberapi/guestBase/saveGuestBase`

#### 2. updateGuestBase - 更新旅客信息
- **接口路径**: `POST /memberapi/guestBase/updateGuestBase`

#### 3. recognizeIdcardV2 - 身份证识别
- **接口路径**: `POST /memberapi/guestBase/recognizeIdcardV2`

---

## 7. travel/orderGuest - 订单客人

### 功能描述
订单客人信息管理

### 接口列表

#### 1. guestCheck - 客人检查
- **接口路径**: `POST /api/selfBook/guestCheck.json`

---

## 8. travel/contract - 合同页面

### 功能描述
电子合同签署页面

### 接口列表

#### 1. invokeExtSign - 调用签署
- **接口路径**: `GET /api/fdd/invokeExtSign.json`

#### 2. getContractNoByGcRsvNo - 获取合同编号
- **接口路径**: `GET /api/fdd/getContractNoByGcRsvNo.json`

---

## 9. travel/tips - 旅行提示

### 功能描述
旅行提示/注意事项页面

---

## 10. other/pay - 支付页面

### 功能描述
通用支付页面

### 接口列表

#### 1. travelPay - 旅行支付
- **接口路径**: `POST /api/travel/pay.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | orderNo | string | 是 | 订单编号 |
  | payType | string | 是 | 支付类型 |
  | memberId | string | 是 | 会员ID |

- **出参**:
  | 字段名 | 类型 | 说明 |
  |--------|------|------|
  | result | number | 1=成功 |
  | retVal | object | 支付参数 |
  | retVal.timeStamp | string | 时间戳 |
  | retVal.nonceStr | string | 随机字符串 |
  | retVal.package | string | 订单信息 |
  | retVal.signType | string | 签名类型 |
  | retVal.paySign | string | 签名 |

---

## 11. invite/invite - 邀请页面

### 功能描述
邀请好友页面

### 接口列表

#### 1. selectInvitationSpoilRules - 邀请规则
- **接口路径**: `POST /activityapi/InvitationSpoil/selectInvitationSpoilRules`

---

## 12. exchangeCoupon/exchangeList - 优惠券兑换列表

### 功能描述
优惠券兑换列表

### 接口列表

#### 1. findCouponDetailListByCouponNo - 按券号查询
- **接口路径**: `GET /api/member/findCouponDetailListByCouponNo.json`

---

*待续: 分包C-G页面分析*
