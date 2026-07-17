# 旅游模块改造任务单审阅与修复（2026-03-22）

## 1. 审阅范围

基于 `travel_wxapp/readmes/travel-module-glm-task.md` 对以下实现做了代码级审阅：

1. UniApp 端：`pages/travel/product/*`、`pages/travel/order/*`、`api/travel.js`
2. 后端 API：`backend/app/controller/api/travel/*`
3. 后端仓储/DAO：`backend/app/common/repositories/travel/*`、`backend/app/common/dao/travel/*`
4. 支付链路重点：旅游订单支付页与项目现有支付机制的一致性（App/H5/微信小程序、余额支付）

---

## 2. 审阅结论

任务单中 P0/P1 的大部分业务能力已实现（团期价格、人数规则、房型库存、单房差自动计算、价格试算与下单复算等）。

但在“支付链路”存在两个关键问题：

1. **余额支付未真正打通**
   - 前端旅游支付页没有余额支付入口。
   - 后端旅游支付接口收到 `balance` 直接返回“暂不支持余额支付”。

2. **跨端支付通道细分不足**
   - H5 场景未区分“微信内 H5（JSAPI）”与“微信外 H5（MWEB）”。
   - 支付宝 `alipayQr`（小程序场景）未在旅游支付页中统一处理。

---

## 3. 本次修复内容

## 3.1 后端修复：旅游订单支持余额支付

文件：`backend/app/controller/api/travel/Order.php`

修复点：

1. 新增余额支付处理方法 `payByBalance()`：
   - 校验 `yue_pay_status` 开关；
   - 加锁校验订单状态（必须 `pending`）；
   - 加锁校验用户余额；
   - 扣减用户余额；
   - 写入 `UserBillRepository::decBill(..., 'now_money', 'pay_product', ...)` 账单；
   - 调用 `TravelOrderRepository::paySuccess(...)` 更新旅游订单为已支付；
   - 返回标准支付成功结构：`app('json')->status('success', '余额支付成功', ['order_id' => ...])`。

2. 补强支付通道映射 `resolvePayChannel()`：
   - 微信支付支持 `from=weixin|h5|mini|app` 的细分；
   - 支付宝支持 `alipay|alipayApp|alipayQr` 映射；
   - `balance` 正常映射为余额通道。

## 3.2 前端修复：旅游支付页对齐通用支付能力

文件：`qihuang_uniapp/pages/travel/order/pay.vue`

修复点：

1. 新增支付方式入口：
   - 微信支付；
   - 支付宝支付（按 `globalData.alipay_open` 控制）；
   - 余额支付（按 `globalData.yue_pay_status` 控制，展示可用余额）。

2. 接入用户余额读取：
   - 调用 `getUserInfo()` 获取 `now_money`；
   - 余额支付前先做前端余额不足提示。

3. 优化跨端通道判定：
   - H5 下区分微信内外：
     - 微信内：`from=weixin`
     - 微信外：`from=h5`
   - App：`from=app`
   - 小程序：`from=mini`

4. 对齐支付结果处理：
   - 统一识别 `status/result` 响应结构；
   - 支持 `success/error/routine/weixin/weixinApp/h5/alipay/alipayQr/alipayApp`；
   - 支持 `alipayQr` 跳转 `order_pay_back`；
   - H5 MWEB 自动补 `redirect_url` 回跳到旅游订单详情页。

5. 取消支付交互改进：
   - 将取消支付标记为 `__cancel`，避免误弹“支付失败”。

---

## 4. 与现有支付体系的一致性说明

本次修复遵循了项目现有支付链路的核心模式：

1. 后端统一返回 `app('json')->status(...)` 的支付响应结构；
2. 前端按 `status + result` 分支处理；
3. H5/MP/APP 维持与现有页面一致的支付方式映射；
4. 余额支付复用项目现有账单记录规则（`UserBillRepository`）。

---

## 5. 兼容性矩阵（旅游支付页）

| 端 | 微信支付 | 支付宝支付 | 余额支付 |
|---|---|---|---|
| H5（微信内） | `weixin` | `alipay`（跳中转页） | 支持 |
| H5（微信外） | `h5`（MWEB） | `alipay`（跳中转页） | 支持 |
| 微信小程序 | `routine` | `alipayQr`（跳中转页/复制链接） | 支持 |
| App | `weixinApp` | `alipayApp` | 支持 |

---

## 6. 验证与建议用例

建议至少执行以下用例（按端分组）：

1. H5 微信外：微信支付下单，能跳转 MWEB，支付后回到旅游订单详情。
2. H5 微信内：微信支付下单，能调起 JSAPI。
3. 小程序：微信支付成功，状态落库为已支付。
4. 小程序：支付宝通道返回 `alipayQr`，可跳转到中转页完成引导。
5. 任意端：余额充足时，余额支付直接成功并更新订单状态。
6. 任意端：余额不足时，前端拦截提示；后端也能防绕过校验。
7. 合同前置订单：未签约时不可支付，签约后可支付。
8. 支付取消场景：页面可继续发起支付，不会锁死在“支付中”。

---

## 7. 备注

本次修复聚焦于任务单要求中“支付链路兼容性与余额支付”缺口，未改动旅游价格与库存主业务逻辑。
