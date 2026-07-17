# 分包A - 会员相关页面

## 页面概览

| 序号 | 页面路径 | 功能 |
|------|----------|------|
| 1 | member/setting | 设置页面 |
| 2 | member/policy | 隐私政策 |
| 3 | member/memberRight | 会员权益 |
| 4 | member/collectionCenter | 收藏中心 |
| 5 | member/memberInfo | 会员信息 |
| 6 | member/memberListPoint | 积分列表 |
| 7 | member/memberAccount | 会员账户 |
| 8 | member/couponList | 优惠券列表 |
| 9 | member/couponInfo | 优惠券详情 |
| 10 | member/couponReciveResult | 优惠券领取结果 |
| 11 | member/memberAuth | 会员认证 |
| 12 | member/couponHistory | 优惠券历史 |
| 13 | member/authSucceed | 认证成功 |
| 14 | member/myCollection | 我的收藏 |
| 15 | member/memberAccountInfo | 账户信息 |
| 16 | member/memberAccountExpire | 账户到期 |
| 17 | member/tradeInfo | 交易信息 |
| 18 | member/travelPreference | 旅行偏好 |
| 19 | other/codeText | 代码文本 |
| 20 | other/webview2Mp | H5转小程序 |
| 21 | member/travelersList | 旅行者列表 |

---

## 1. member/setting - 设置页面

### 功能描述
用户设置页面，包含：
- 账号设置
- 隐私设置
- 通知设置
- 退出登录

### 接口列表
无特殊接口，主要使用本地存储操作

### 页面跳转
- **跳转至**: member/policy

---

## 2. member/policy - 隐私政策

### 功能描述
展示隐私政策和使用条款

---

## 3. member/memberRight - 会员权益

### 功能描述
展示会员等级权益说明

### 接口列表

#### 1. getAllCardLevel - 获取所有卡等级
- **接口路径**: `GET /api/member/getAllCardLevel.json`

#### 2. getMemberCardInfo - 获取会员卡权益信息
- **服务**: `services/member.js`
- **接口路径**: `GET /api/member/membercardInterestDesc.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | cardType | string | 否 | 卡类型 |
  | cardLevel | string | 否 | 卡等级 |

---

## 4. member/collectionCenter - 收藏中心

### 功能描述
用户收藏管理入口

### 接口列表

#### 1. getGoodsCollection - 获取收藏列表
- **接口路径**: `GET /api/shop/getGoodsCollection.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | memberId | string | 是 | 会员ID |
  | firstResult | number | 否 | 起始位置 |
  | pageSize | number | 否 | 每页数量 |

---

## 5. member/memberInfo - 会员信息

### 功能描述
会员个人信息展示和编辑

### 接口列表

#### 1. update - 更新会员信息
- **接口路径**: `POST /api/member/updateMemberBaseInfo.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | memberId | string | 是 | 会员ID |
  | name | string | 否 | 姓名 |
  | mobile | string | 否 | 手机号 |
  | email | string | 否 | 邮箱 |
  | birthday | string | 否 | 生日 |
  | gender | string | 否 | 性别 |
  | hotelGroupId | number | 是 | 酒店集团ID |

#### 2. threeMetaCheck - 三元验证
- **接口路径**: `POST /api/member/threeMetaCheck.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | name | string | 是 | 姓名 |
  | idCard | string | 是 | 身份证号 |
  | mobile | string | 是 | 手机号 |

---

## 6. member/memberListPoint - 积分列表

### 功能描述
会员积分明细列表

### 接口列表

#### 1. listPointByMemberId - 按会员ID获取积分
- **接口路径**: `GET /api/member/listPointByMemberId.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | memberId | string | 是 | 会员ID |
  | firstResult | number | 否 | 起始位置 |
  | pageSize | number | 否 | 每页数量 |

#### 2. queryPointsExpiredRemindData - 积分过期提醒
- **接口路径**: `POST /api/member/queryPointsExpiredRemindData.json`

---

## 7. member/memberAccount - 会员账户

### 功能描述
会员账户总览页面

### 接口列表

#### 1. listAccount - 获取账户列表
- **接口路径**: `GET /api/member/getAccountIncludeTreatList.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | cardNo | string | 是 | 会员卡号 |

---

## 8. member/couponList - 优惠券列表

### 功能描述
会员优惠券列表展示

### 接口列表

#### 1. listCouponWithHistoryByCardNo - 优惠券列表（含历史）
- **接口路径**: `GET /api/member/listCouponWithHistoryByCardNoV2`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | cardNo | string | 是 | 会员卡号 |
  | couponStatus | string | 否 | 优惠券状态 |
  | firstResult | number | 否 | 起始位置 |
  | pageSize | number | 否 | 每页数量 |

#### 2. findCouponDetailListByCondi - 条件查询优惠券
- **接口路径**: `GET /api/member/findCouponDetailListByCondi.json`

---

## 9. member/couponInfo - 优惠券详情

### 功能描述
单张优惠券详细信息

### 接口列表

#### 1. findCouponDetailListByCouponNo - 按券号查询
- **接口路径**: `GET /api/member/findCouponDetailListByCouponNo.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | couponNo | string | 是 | 优惠券编号 |

---

## 10. member/couponReciveResult - 优惠券领取结果

### 功能描述
优惠券领取/转赠结果展示

---

## 11. member/memberAuth - 会员认证

### 功能描述
会员实名认证页面

### 接口列表

#### 1. threeMetaCheck - 三元验证
- **接口路径**: `POST /api/member/threeMetaCheck.json`

---

## 12. member/couponHistory - 优惠券历史

### 功能描述
优惠券使用/转赠历史记录

---

## 13. member/authSucceed - 认证成功

### 功能描述
实名认证成功提示页

---

## 14. member/myCollection - 我的收藏

### 功能描述
收藏产品列表展示

### 接口列表

#### 1. getGoodsCollection - 收藏列表
- **接口路径**: `GET /api/shop/getGoodsCollection.json`

#### 2. deleteGoodsCollection - 删除收藏
- **接口路径**: `POST /api/shop/deleteGoodsCollection.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | goodsId | string | 是 | 商品ID |
  | memberId | string | 是 | 会员ID |

---

## 15. member/memberAccountInfo - 账户信息

### 功能描述
账户详细信息展示

---

## 16. member/memberAccountExpire - 账户到期

### 功能描述
账户/积分到期提醒

---

## 17. member/tradeInfo - 交易信息

### 功能描述
交易记录详情

---

## 18. member/travelPreference - 旅行偏好

### 功能描述
用户旅行偏好设置

---

## 19. other/codeText - 代码文本

### 功能描述
展示代码/文本内容

---

## 20. other/webview2Mp - H5转小程序

### 功能描述
H5页面跳转到小程序页面的中转页

---

## 21. member/travelersList - 旅行者列表

### 功能描述
常用出行人管理

### 接口列表

#### 1. listGuestLinkExtraInfoWithMemberIdOrOpenId - 旅客信息列表
- **接口路径**: `POST /memberapi/guestBase/listGuestLinkExtraInfoWithMemberIdOrOpenId`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | memberId | string | 否 | 会员ID |
  | openId | string | 否 | OpenID |

#### 2. saveGuestBase - 保存旅客信息
- **接口路径**: `POST /memberapi/guestBase/saveGuestBase`

#### 3. updateGuestBase - 更新旅客信息
- **接口路径**: `POST /memberapi/guestBase/updateGuestBase`

#### 4. deleteGuestLinkRelation - 删除旅客关系
- **接口路径**: `POST /memberapi/guestBase/deleteGuestLinkRelation`

#### 5. recognizeIdcardV2 - 身份证识别
- **接口路径**: `POST /memberapi/guestBase/recognizeIdcardV2`

---

*待续: 分包B-G 及其他分包页面分析*
