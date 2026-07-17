# 分包F - 奖品发票页面

## 页面概览

| 序号 | 页面路径 | 功能 |
|------|----------|------|
| 1 | prize/prizeList | 奖品列表 |
| 2 | prize/receivePrize | 领取奖品 |
| 3 | prize/receiveSuccess | 领取成功 |
| 4 | address/addressList | 地址列表 |
| 5 | address/addAddress | 添加地址 |
| 6 | invoice/applyInvoice | 申请发票 |
| 7 | invoice/invoiceDetails | 发票详情 |
| 8 | invoice/invoiceInfo | 发票信息 |
| 9 | invoice/invoiceInfoList | 发票信息列表 |
| 10 | invoice/finishSucceed | 开票成功 |

---

## 1. prize/prizeList - 奖品列表

### 功能描述
用户中奖奖品列表

### 接口列表

#### 1. prizewinner - 中奖者信息
- **接口路径**: `GET /api/wechat/platform/game/prizewinner.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | openId | string | 是 | OpenID |
  | gameCode | string | 是 | 游戏代码 |

#### 2. rewardlist - 奖品列表
- **接口路径**: `GET /api/wechat/platform/game/rewardlist.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | gameCode | string | 是 | 游戏代码 |

---

## 2. prize/receivePrize - 领取奖品

### 功能描述
奖品领取页面，填写收货地址

### 接口列表

#### 1. savePrizeAddress - 保存奖品地址
- **接口路径**: `GET /api/wechat/platform/game/savePrizeAddress.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | prizeId | string | 是 | 奖品ID |
  | addressId | string | 是 | 地址ID |
  | openId | string | 是 | OpenID |

---

## 3. address/addressList - 地址列表

### 功能描述
用户收货地址列表

### 接口列表

#### 1. getMemberAddress - 获取会员地址
- **接口路径**: `GET /api/member/shippingAddress.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | memberId | string | 是 | 会员ID |

---

## 4. address/addAddress - 添加地址

### 功能描述
添加/编辑收货地址

### 接口列表

#### 1. addAddress - 添加地址
- **接口路径**: `POST /api/member/shippingAddress.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | memberId | string | 是 | 会员ID |
  | receiverName | string | 是 | 收货人姓名 |
  | receiverMobile | string | 是 | 收货人手机 |
  | province | string | 是 | 省份 |
  | city | string | 是 | 城市 |
  | district | string | 是 | 区/县 |
  | address | string | 是 | 详细地址 |
  | isDefault | boolean | 否 | 是否默认 |

#### 2. deleteAddress - 删除地址
- **接口路径**: `DELETE /api/member/shippingAddress.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | id | string | 是 | 地址ID |
  | memberId | string | 是 | 会员ID |

---

## 5. invoice/applyInvoice - 申请发票

### 功能描述
发票申请页面

### 接口列表

#### 1. getOrderInvoiceSta - 订单发票状态
- **接口路径**: `GET /api/invoice/getOrderInvoiceSta.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | orderNo | string | 是 | 订单编号 |

#### 2. applyInvoice - 申请发票
- **接口路径**: `GET /api/invoice/applyInvoice.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | orderNo | string | 是 | 订单编号 |
  | invoiceType | string | 是 | 发票类型 |
  | invoiceTitle | string | 是 | 发票抬头 |
  | taxNo | string | 否 | 税号 |
  | email | string | 是 | 邮箱 |

---

## 6. invoice/invoiceInfo - 发票信息

### 功能描述
发票抬头信息管理

### 接口列表

#### 1. memberInvoice - 会员发票信息
- **接口路径**: `GET /api/member/memberInvoice.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | memberId | string | 是 | 会员ID |

#### 2. saveOrUpdateMemberInvoice - 保存发票信息
- **接口路径**: `POST /api/member/saveOrUpdateMemberInvoice.json`
- **入参**:
  | 参数名 | 类型 | 必填 | 说明 |
  |--------|------|------|------|
  | memberId | string | 是 | 会员ID |
  | invoiceType | string | 是 | 发票类型（个人/企业） |
  | invoiceTitle | string | 是 | 发票抬头 |
  | taxNo | string | 否 | 税号（企业必填） |
  | bankName | string | 否 | 开户银行 |
  | bankAccount | string | 否 | 银行账号 |
  | address | string | 否 | 地址 |
  | phone | string | 否 | 电话 |
  | isDefault | boolean | 否 | 是否默认 |

#### 3. deleteMemberInvoice - 删除发票信息
- **接口路径**: `GET /api/member/deleteMemberInvoice.json`

---

## 7. invoice/invoiceDetails - 发票详情

### 功能描述
发票详情展示

### 接口列表

#### 1. getInvoiceOrder - 发票订单
- **接口路径**: `GET /api/invoice/getInvoiceOrder.json`

---

## 8. invoice/finishSucceed - 开票成功

### 功能描述
发票开具成功提示页

---

*待续: 分包G及其他分包页面分析*
