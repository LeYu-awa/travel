# 旅游线路预定模块迁移计划（修订版）

- 修订日期：2026-03-17  
- 修订依据：`travel_wxapp` 实际页面代码 + 当前仓库实际技术栈（`qihuang_uniapp`、`backend`、`qihuangbackend_vue`）  
- 目标：在现有商城中落地“旅游线路预定”完整闭环（前端 + API + 平台管理后台）

---

## 0. 修订结论（关键矛盾已修正）

1. 目标小程序路径修正为：`D:\prj\qihuang_crmeb_mer\qihuang_uniapp`（原计划写成 `jubao_dianda_uniapp`，错误）。  
2. 请求方式修正为：`@/utils/request.js` + `api/*.js`（原计划 `app.get/app.post` 不符合当前项目）。  
3. 删除不存在的源页面：`pagesB/travel/travelList`（源码中无该文件）。  
4. 确认订单映射修正为：`pagesB/travel/confirmOrder`（不是 `pagesC/order/bookInfo`）。  
5. API 命名统一为：`/api/travel/...`，不再混用 `ApiTravel/...`。  
6. 补全后台“多情景定价”能力：团期日历价、人群价、单房差、季节/星期规则、优惠叠加规则。  
7. 支付链路补全回调设计：增加 `travel_order` attach 类型与事件监听，避免“能发起支付但回调不落单”。

---

## 1. 项目基线与硬性约束

## 1.1 路径与技术栈（按当前仓库）

| 项目 | 路径 | 技术栈 |
|---|---|---|
| 源小程序 | `D:\prj\qihuang_crmeb_mer\travel_wxapp` | uni-app（Vue3 编译产物） |
| 目标小程序 | `D:\prj\qihuang_crmeb_mer\qihuang_uniapp` | uni-app（Vue2） |
| 后端 | `D:\prj\qihuang_crmeb_mer\backend` | ThinkPHP6 + PHP7.2 |
| 平台后台 | `D:\prj\qihuang_crmeb_mer\qihuangbackend_vue` | Vue2 + ElementUI |

## 1.2 你的约束（纳入执行）

1. 新增页面全部放独立 `travel` 分包。  
2. 迁移页面有限，优先复用现有组件；无法复用的逻辑直接写页面，不额外拆新组件。  
3. 后端与现有业务尽量解耦，独立 `travel` 目录（仅用户体系复用）。  
4. 必须包含“旅游产品列表入口”。  
5. 支付优先复用现有订单支付能力，按旅游订单参数改造。  
6. 前端沿用现有请求封装，不新增请求基础层。  
7. 旅游订单列表在 travel 分包内。  
8. 修订后需确保计划前后无矛盾（本文件最后给出自检结果）。

---

## 2. 源小程序真实功能映射（按实际代码）

## 2.1 源页面与目标页面映射

| 源页面 | 作用 | 是否迁移 | 目标页（`qihuang_uniapp`） |
|---|---|---|---|
| `pages/travels/travels` | 入口跳转到预订首页 | 是（入口逻辑） | `pages/travel/entry/index` |
| `pages/travel/index` | 预订主页/产品聚合入口 | 是（入口能力） | `pages/travel/product/list` |
| `pagesB/travel/travelDetail` | 详情 + 团期 + 人数 | 是 | `pages/travel/product/detail` |
| `pagesB/travel/confirmOrder` | 确认订单 + 联系人 + 优惠 + 提交 | 是 | `pages/travel/order/confirm` |
| `pagesB/travel/orderGuest` | 订单出行人选择 | 是 | `pages/travel/order/guest` |
| `pagesB/travel/travelersInfo` | 常用出行人增改 | 是 | `pages/travel/guest/edit` |
| `pagesB/travel/tips` | 签约前提示 + 跳签约平台 | 是 | `pages/travel/contract/redirect` |
| `pagesB/travel/contract` | 合同中转/签约等待页 | 是 | `pages/travel/contract/index` |
| `pagesB/travel/contractConfirm` | 签约完成确认页 | 是 | `pages/travel/contract/confirm` |
| `pagesB/other/pay` | 通用支付页（旅游共用） | 是（复制改造） | `pages/travel/order/pay` |
| `pagesB/travel/paySuccess` | 支付成功 | 是 | `pages/travel/order/paySuccess` |
| `pagesB/travel/orderDetail` | 旅游订单详情 | 是 | `pages/travel/order/detail` |
| `pagesB/travel/orderDetail（附件区）` | 保险单入口（保单查看/下载） | 是 | `pages/travel/insurance/detail` |
| `pages/member/orderList` | 订单列表（含旅游） | 是（拆独立） | `pages/travel/order/list` |
| `pagesB/travel/orderCancel` | 取消页 | 可选（保留） | `pages/travel/order/cancel` |

> 说明：`pagesB/travel/travelList` 在源码中不存在，原计划此处错误，已修正。

## 2.2 源接口行为（用于 API 设计映射）

| 源调用（节选） | 主要用途 | 目标 API（建议） |
|---|---|---|
| `/api/travelGroup/findTravelProductForWechatDetail` | 线路详情 | `GET /api/travel/product/detail/:id` |
| `/api/travelGroup/listTravelProductDailyDetail` | 团期日历 | `GET /api/travel/departure/calendar` |
| `/api/reserve/order/queryPayDetail` | 试算金额 | `POST /api/travel/order/price-preview` |
| `api.saveOrder` | 创建订单 | `POST /api/travel/order/create` |
| `/api/reserve/order/saveOrderGuests` | 绑定订单出行人 | `POST /api/travel/order/:id/guests` |
| `listGuestLinkExtraInfoWithMemberIdOrOpenId` | 常用出行人列表 | `GET /api/travel/guest/list` |
| `saveMemberGuestLinkRelation` | 常用出行人保存 | `POST /api/travel/guest/save` |
| `deleteGuestLinkRelation` | 常用出行人删除 | `POST /api/travel/guest/delete` |
| `invokeExtSign` | 跳转合同签约平台 | `POST /api/travel/contract/start` |
| `orderDetail` | 订单详情 | `GET /api/travel/order/detail/:id` |
| `travelPay` | 发起支付 | `POST /api/travel/order/pay/:id` |
| `/api/fdd/insuranceDownload?insuranceNo=...` | 保险单下载 | `GET /api/travel/insurance/download/:insuranceNo` |

---

## 3. 下单流程（按你的 5 步要求对齐）

## 第一步：选择产品

- 页面：`pages/travel/product/list`。  
- 能力：产品筛选、排序、进入详情，作为 travel 分包主入口。  

## 第二步：选择可预订团期

- 页面：`pages/travel/product/detail`。  
- 能力：  
  - 团期与后台上架团期一致；  
  - 展示状态：可订/满员/可预约/已过期；  
  - 展示剩余名额；  
  - 团期价覆盖基础价。  

## 第三步：选择出行人数（成人/儿童拆分）

- 页面：`pages/travel/order/confirm`。  
- 校验：  
  - 成人/儿童数量上下限；  
  - 与团期库存联动；  
  - 与产品购买限制联动。  

## 第四步：确认订单信息

- 页面：`pages/travel/order/confirm` + `pages/travel/order/guest` + `pages/travel/guest/edit`。  
- 能力：  
  - 房间数、联系人信息；  
  - 出行人信息（按下单人数动态要求条目）；  
  - “出行人字段是否必填”后台可配置。  

## 第五步：先签约后支付

- 页面：`pages/travel/contract/redirect` → `pages/travel/contract/index` → 签约平台 → `pages/travel/contract/confirm` → `pages/travel/order/pay`。  
- 规则：`contract_required=1` 时，未签约不可支付。

## 第六步：订单详情查看合同与保险

- 页面：`pages/travel/order/detail` → `pages/travel/insurance/detail`。  
- 能力：  
  - 查看合同附件（线路合同）；  
  - 查看保险单（存在 `chitNo` 时展示）；  
  - 保单支持下载/跳转查看。  

---

## 4. 前端迁移方案（`qihuang_uniapp`）

## 4.1 分包目录（统一独立 travel 包）

```text
qihuang_uniapp/pages/travel/
├─ entry/index.vue
├─ product/list.vue
├─ product/detail.vue
├─ order/confirm.vue
├─ order/guest.vue
├─ order/pay.vue
├─ order/paySuccess.vue
├─ order/list.vue
├─ order/detail.vue
├─ order/cancel.vue
├─ guest/edit.vue
├─ insurance/detail.vue
├─ contract/index.vue
├─ contract/redirect.vue
└─ contract/confirm.vue
```

## 4.2 `pages.json` 配置（示例）

```json
{
  "subPackages": [
    {
      "root": "pages/travel",
      "name": "travel",
      "pages": [
        { "path": "entry/index", "style": { "navigationBarTitleText": "旅游预订" } },
        { "path": "product/list", "style": { "navigationBarTitleText": "旅游线路" } },
        { "path": "product/detail", "style": { "navigationStyle": "custom" } },
        { "path": "order/confirm", "style": { "navigationBarTitleText": "确认订单" } },
        { "path": "order/guest", "style": { "navigationBarTitleText": "出行人" } },
        { "path": "guest/edit", "style": { "navigationBarTitleText": "新增/编辑出行人" } },
        { "path": "contract/redirect", "style": { "navigationBarTitleText": "签约中" } },
        { "path": "contract/index", "style": { "navigationBarTitleText": "合同签约" } },
        { "path": "contract/confirm", "style": { "navigationBarTitleText": "签约确认" } },
        { "path": "order/pay", "style": { "navigationBarTitleText": "支付订单" } },
        { "path": "order/paySuccess", "style": { "navigationBarTitleText": "支付成功" } },
        { "path": "order/list", "style": { "navigationBarTitleText": "旅游订单" } },
        { "path": "order/detail", "style": { "navigationBarTitleText": "订单详情" } },
        { "path": "insurance/detail", "style": { "navigationBarTitleText": "保险单" } }
      ]
    }
  ]
}
```

## 4.3 请求方式（必须沿用现有）

- 新增 `qihuang_uniapp/api/travel.js`，只封装业务接口。  
- 请求统一 `import request from "@/utils/request.js"`。  
- 不新增新的请求基础层。

示例：

```js
import request from "@/utils/request.js";

export function travelProductList(params) {
  return request.get("travel/product/list", params, { noAuth: true });
}

export function travelOrderCreate(data) {
  return request.post("travel/order/create", data);
}
```

## 4.4 组件策略（按你的要求）

1. 优先复用现有组件（例如支付弹层、日历、弹窗）。  
2. 不额外拆新的独立业务组件；局部复杂 UI 直接落在页面。  
3. 无法替代时，使用 `uni-ui` 通用组件（如 `uni-popup`），不引入新基础框架。

## 4.5 支付页改造策略

1. 以现有支付模式为基线（参考 `components/payment/index.vue` 与已用 `customizePayUrl` 场景）。  
2. `pages/travel/order/pay` 可复制现有独立支付页逻辑并改造参数：`order_id`、`order_type=travel`。  
3. 支付方式遵循商城现有配置开关（微信/余额/支付宝），避免旅游模块自建支付配置体系。

---

## 5. 后端模块方案（ThinkPHP6 + Router）

## 5.1 目录结构（解耦）

```text
backend/app/controller/api/travel/
├─ TravelProduct.php
├─ TravelDeparture.php
├─ TravelOrder.php
├─ TravelGuest.php
├─ TravelContract.php
└─ TravelInsurance.php

backend/app/controller/admin/store/travel/
├─ TravelProduct.php
├─ TravelDeparture.php
├─ TravelPriceRule.php
├─ TravelOrder.php
├─ TravelContract.php
└─ TravelSetting.php

backend/app/common/model/travel/
backend/app/common/dao/travel/
backend/app/common/repositories/travel/
```

## 5.2 API 路由（`backend/route/api.php`）

> 注意：按当前项目模式放在 `/api` 大分组内，登录态接口放 `UserTokenMiddleware::class, true` 组。

### 非强制登录（读）

- `GET /api/travel/product/list`
- `GET /api/travel/product/detail/:id`
- `GET /api/travel/departure/calendar`
- `GET /api/travel/setting/public`

### 强制登录（写+个人数据）

- `POST /api/travel/order/price-preview`
- `POST /api/travel/order/create`
- `GET /api/travel/order/list`
- `GET /api/travel/order/detail/:id`
- `POST /api/travel/order/cancel/:id`
- `POST /api/travel/order/pay/:id`
- `GET /api/travel/guest/list`
- `POST /api/travel/guest/save`
- `POST /api/travel/guest/delete`
- `POST /api/travel/order/:id/guests`
- `POST /api/travel/contract/start`
- `GET /api/travel/contract/status/:orderId`
- `GET /api/travel/insurance/list/:orderId`
- `GET /api/travel/insurance/download/:insuranceNo`

## 5.3 平台后台路由（建议新文件：`backend/route/admin/travel.php`）

- 采用 admin 路由标准：`->name()` + `->option(['_alias'=>...])` + 分组 `_path`。  
- 建议菜单路径前缀：`/travel/...`（与营销模块并列）。  

---

## 6. 支付与回调集成（必须补齐）

## 6.1 问题点（原计划缺失）

- 仅“发起支付”不够，必须定义回调 attach 类型与监听器，否则支付成功无法落订单状态。

## 6.2 方案

1. 旅游支付参数通过 `PayService` 生成，`attach` 使用：`travel_order`。  
2. 在 `backend/app/event.php` 增加监听：
   - `'pay_success_travel_order' => [\crmeb\listens\pay\TravelOrderPaySuccessListen::class]`
3. 新增监听器：`backend/crmeb/listens/pay/TravelOrderPaySuccessListen.php`，内部调用 `TravelOrderRepository::paySuccess(...)`。  
4. `Common@alipayNotify` 的白名单增加 `travel_order`，使支付宝回调可进入事件分发。  
5. 回调幂等：按 `order_sn` + `paid` 状态二次校验，防重复入账。  

---

## 7. 数据库与多情景定价（管理后台增强重点）

## 7.1 建议表（最小可用）

1. `eb_travel_product`：产品主数据、人数限制、合同/出行人配置。  
2. `eb_travel_departure`：团期、库存、基础团期价、预约配置。  
3. `eb_travel_price_rule`：价格规则（日期/星期/季节/渠道/房型/人群）。  
4. `eb_travel_order`：订单主表（价格快照、状态、支付状态、签约状态）。  
5. `eb_travel_order_guest`：订单出行人。  
6. `eb_travel_guest`：用户常用出行人。  
7. `eb_travel_contract`：合同状态、签约链接、回调信息。  
8. `eb_travel_insurance`：保单信息（保单号、被保人、状态、下载地址）。  
9. `eb_travel_setting`：全局开关与默认规则。  

## 7.2 多情景定价能力（后台必须可配）

1. 按价格模型：`PEOPLE / PACKAGE / FAMILY`。  
2. 按团期日期：同产品不同发团日期不同价。  
3. 按人群：成人/大童/中童/幼童分价。  
4. 按房间与单房差：自动计算并可覆盖。  
5. 按季节/节假日/周末：规则加价或减价。  
6. 按提前天数（早鸟）/临期促销（last minute）。  
7. 按渠道/会员等级/合作方折扣。  
8. 优惠叠加规则（会员折扣与券是否互斥/可叠加）。  

## 7.3 价格计算优先级（统一）

1. 产品基础价  
2. 团期价覆盖  
3. 规则价调整（日期/星期/季节/渠道）  
4. 人群数量计算  
5. 房间与单房差  
6. 活动折扣  
7. 优惠券  
8. 会员/合作方折扣  
9. 输出应付金额 + 库存校验结果

> 订单创建时必须落地 `price_snapshot_json`，防止后续改价影响历史订单。

---

## 8. 平台管理后台（`qihuangbackend_vue`）增强方案

## 8.1 新增模块结构

```text
qihuangbackend_vue/src/router/modules/travel.js
qihuangbackend_vue/src/api/travel.js
qihuangbackend_vue/src/views/travel/
├─ product/list.vue
├─ product/edit.vue
├─ product/category.vue
├─ departure/calendar.vue
├─ priceRule/list.vue
├─ order/list.vue
├─ order/detail.vue
├─ insurance/list.vue
├─ contract/list.vue
└─ setting/index.vue
```

## 8.2 管理后台能力要求

1. 产品管理：基础信息、人数限制、出行人字段配置、合同开关。  
2. 团期管理：日历视图批量维护价格/库存/状态。  
3. 定价规则：可视化规则优先级、启停、冲突检测。  
4. 订单管理：订单筛选、改价（受限）、备注、退款/取消处理。  
5. 合同管理：待签/已签/签约失败重试。  
6. 保险管理：保单查询、下载、补录、异常状态标记。  
7. 全局设置：支付开关、预约规则、默认单房差策略、出行人字段默认模板。  

## 8.3 与现有权限体系对齐

- `src/router/index.js` 注册 `travelRouter`。  
- 后端 admin 路由全部提供权限名称与 `_path`，确保菜单/按钮权限可控。  

---

## 9. 分阶段实施

## 阶段 A：后端基础（3~4 天）

1. 建表 + Model/Dao/Repository。  
2. API 路由与控制器落地。  
3. 支付回调 attach 与监听器补齐。  
4. 合同签约接口打通（含回调/状态查询）。  

## 阶段 B：管理后台（2~3 天）

1. 路由 + API 文件。  
2. 产品/团期/定价规则/订单/设置页面。  
3. 权限点配置。  

## 阶段 C：小程序前端（4~5 天）

1. travel 分包创建与入口接入。  
2. 列表/详情/确认订单/出行人/签约/支付/订单页。  
3. 与后端联调。  

## 阶段 D：联调验收（2 天）

1. 全流程回归。  
2. 并发库存与支付幂等压测。  
3. 关键异常场景验证。  

---

## 10. 验收清单

## 10.1 前端

- [ ] 有独立 travel 分包且主包体积未异常增长。  
- [ ] 有旅游产品列表入口。  
- [ ] 团期显示可订/满员/预约/过期状态与剩余名额。  
- [ ] 成人/儿童人数限制有效，且与库存联动。  
- [ ] 出行人条目数量与下单人数一致。  
- [ ] 合同必签时，未签不可支付。  
- [ ] 订单详情可查看合同与保险单。  
- [ ] 支付后进入成功页，订单状态正确。  
- [ ] travel 包内可查看旅游订单列表与详情。  

## 10.2 后端

- [ ] `travel` 接口与其它业务解耦。  
- [ ] 价格试算支持多情景规则。  
- [ ] 库存扣减/回滚正确。  
- [ ] 支付回调幂等，重复通知不重复入账。  
- [ ] 合同状态与订单支付前置校验正确。  
- [ ] 保单列表与下载接口可用（订单维度可追溯）。  

## 10.3 平台后台

- [ ] 产品、团期、规则、订单、设置均可管理。  
- [ ] 定价规则冲突可识别。  
- [ ] 运营可配置“出行人字段必填/选填”。  

---

## 11. 本次修订后的“无矛盾检查”

1. 前端目标路径、请求方式、分包策略与当前仓库一致。  
2. 页面映射基于真实源码，不再引用不存在页面。  
3. API 命名、路由风格、权限方案已统一。  
4. 支付链路包含“发起 + 回调 + 幂等”完整闭环。  
5. 管理后台补齐多情景定价与运营配置，不再是“仅基础 CRUD”。  

> 结论：本修订版可直接作为实施蓝图，且已消除原计划中的关键冲突点。
