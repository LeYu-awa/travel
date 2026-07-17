# 旅游模块差异核对（已代码复核）

- 核对日期：2026-03-19
- 参考实现：`travel_wxapp/pagesB/travel/travelDetail.*`、`travel_wxapp/pagesB/travel/confirmOrder.*`
- 当前实现：`qihuang_uniapp/pages/travel/product/list.vue`、`product/detail.vue`、`order/confirm.vue`
- 当前后端：`backend/app/controller/api/travel/*` + `backend/app/common/repositories/travel/*`
- 重要说明：参考小程序与当前项目后端不是同一套接口体系。参考小程序走 `/api/travel/saveOrder`、`/api/reserve/order/queryPayDetail` 等接口；当前项目走 `travel/order/price-preview`、`travel/order/create`。本文将“参考能力”与“当前可支持能力”分开写，避免误判。
- 补充（已实测）：现有页面 API 调用链路总体可通。本文识别的问题主要是“字段与业务规则能力差异”，不是“接口不通”。

---

## 一、已知问题核对结论

| 问题 | 结论 | 代码证据 | 说明 |
|---|---|---|---|
| 产品列表价格为0 | **已确认** | `qihuang_uniapp/pages/travel/product/list.vue:80-89`、`backend/app/common/dao/travel/TravelProductDao.php:67-73` | 列表价格取 `product` 表字段（`adult_price/child_price/...`），未取团期最低价；若产品基础价未维护会显示 0。 |
| 团期每天价格未展示 | **已确认** | `qihuang_uniapp/pages/travel/product/detail.vue:29-40` vs `travel_wxapp/pagesB/travel/travelDetail.wxml:83-88` | 当前只展示日期/状态/余位，不展示当日价格；参考实现展示“¥当日价/实时计价”。 |
| `product/detail` 缺少“最多4人、每成人最多2儿童、联系客服”提示与约束 | **已确认** | 参考：`travel_wxapp/pagesB/travel/travelDetail.wxml:289-291`、`travelDetail.js:170-178`；当前：`qihuang_uniapp/pages/travel/product/detail.vue:227-250` | 当前仅校验产品 min/max 与余位，不含 4 人上限、2 儿童/成人规则，也无“联系客服”入口。 |
| 成人/儿童人数变化应有差异化定价 | **部分缺失（当前仅基础版）** | `qihuang_uniapp/pages/travel/product/detail.vue:117-121`、`order/confirm.vue:222-231` | 当前只算成人+儿童；`big/mid/small child` 在前端固定传 0。后端虽支持这些字段，但前端未使用。 |
| `order/confirm` 缺少房型（大床/双床）及库存逻辑 | **已确认** | 参考：`confirmOrder.wxml:78-113`、`confirmOrder.js:1362-1395,1635-1639`；当前：`qihuang_uniapp/pages/travel/order/confirm.vue`（无房型UI） | 当前只有“房间数/单房差数量”，无房型选择、无房型库存、无无库存提示。 |
| “若意向房型无库存…”提示缺失 | **已确认** | 参考：`travel_wxapp/pagesB/travel/confirmOrder.wxml:113` | 当前页面无该提示。 |
| “您所选的出行日期没有大床房”提示缺失 | **已确认** | 参考：`travel_wxapp/pagesB/travel/confirmOrder.js:1635-1639` | 参考点击无库存房型会提示“您所选的出行日期没有{房型名}”；当前无此能力。 |
| 单房差用途不清晰 | **已定位** | 参考：`confirmOrder.js:296-301`；当前：`qihuang_uniapp/pages/travel/order/confirm.vue:251-259`、`backend/.../TravelOrderRepository.php:94-106` | 当前是“手工输入数量 x 团期单房差单价”；没有自动计算与后端一致性校验。 |

---

## 二、重点差异明细

### 2.1 产品定价系统（列表、详情、试算）

#### 参考实现（travel_wxapp）

1. 团期卡片展示当日价格或“实时计价”。
- `travel_wxapp/pagesB/travel/travelDetail.wxml:83-88`

2. 价格模型支持多种模式（PEOPLE/PACKAGE/FAMILY）和 payType。
- `travel_wxapp/pagesB/travel/travelDetail.js:1477-1547`
- `travel_wxapp/pagesB/travel/confirmOrder.js:1275-1287`

3. 提交前通过 `queryPayDetail` 拉取完整价格分解。
- `travel_wxapp/pagesB/travel/confirmOrder.js:446-470`

#### 当前实现（qihuang_uniapp + backend）

1. 列表价来源于产品基础字段，不是团期最低价。
- `qihuang_uniapp/pages/travel/product/list.vue:80-89`
- `backend/app/common/dao/travel/TravelProductDao.php:67-73`

2. 详情合计仅按“成人价 + 儿童价”实时相乘。
- `qihuang_uniapp/pages/travel/product/detail.vue:117-121`

3. 下单试算虽然有 `big/mid/small child` 字段，但前端固定传 0。
- `qihuang_uniapp/pages/travel/order/confirm.vue:222-231`
- `backend/app/common/repositories/travel/TravelOrderRepository.php:87-91`

#### 影响

- 只在团期层设置价格时，列表页会出现“起价 0”。
- 多儿童年龄层、套餐/家庭模式能力在当前 uniapp 下单链路不可达。

---

### 2.2 人数规则与提示（`product/detail`）

#### 参考实现

1. 文案提示（含客服入口）存在：
- `travel_wxapp/pagesB/travel/travelDetail.wxml:289-291`

2. PEOPLE 模式真实约束逻辑：
- 成人变化：`childrenMax = min(2, 4-成人数, 余位-成人数)`
- 儿童变化：`adultMax = min(4-儿童数, 余位-儿童数)`
- 代码：`travel_wxapp/pagesB/travel/travelDetail.js:170-178`

#### 当前实现

- 仅校验产品 `min/max_adult`, `min/max_child` 和团期余位。
- 无“每单最多4人、每成人最多2儿童”约束。
- 无“联系客服”入口和提示文案。
- 代码：`qihuang_uniapp/pages/travel/product/detail.vue:227-255`

---

### 2.3 房间定价/库存（`order/confirm`）

#### 参考实现

1. 房型意向（大床/双床）选择存在：
- `travel_wxapp/pagesB/travel/confirmOrder.wxml:78-90`

2. 无库存点击提示：
- `travel_wxapp/pagesB/travel/confirmOrder.js:1635-1639`

3. 页面底部提示文案存在：
- `travel_wxapp/pagesB/travel/confirmOrder.wxml:113`

4. 房型库存由后端接口返回并标记禁用：
- `travel_wxapp/pagesB/travel/confirmOrder.js:1362-1395`

#### 当前实现

1. 无房型选择 UI，仅房间数 + 单房差数量。
- `qihuang_uniapp/pages/travel/order/confirm.vue:20-37`

2. 后端 `travel_departure` 返回字段不含房型库存（仅总库存）。
- `backend/app/common/repositories/travel/TravelDepartureRepository.php:39-52`

3. `room_num` 在当前后端试算中不参与价格计算，也不参与库存校验。
- 入参定义：`backend/app/controller/api/travel/Order.php:48`
- 试算公式：`backend/app/common/repositories/travel/TravelOrderRepository.php:87-106`
- 库存校验仅按总人数：`TravelOrderRepository.php:130-138`

#### 结论

- 当前系统无法实现“按房型库存”下单控制。
- 仅靠前端补 UI 不够，必须补后端数据结构与校验。

---

### 2.4 单房差与订单总价计算

#### 参考实现（自动化）

- PEOPLE + 独享房时自动算单房差份数：`max(0, 2*房间数 - 总人数)`。
- 代码：`travel_wxapp/pagesB/travel/confirmOrder.js:296-301`

#### 当前实现（手动输入）

1. 前端手工调 `singleRoomNum`，仅限制 `<= roomNum`。
- `qihuang_uniapp/pages/travel/order/confirm.vue:251-259`

2. 后端按 `single_room_num * single_room_diff` 线性计价，不自动推导。
- `backend/app/common/repositories/travel/TravelOrderRepository.php:94-106`

3. 总价公式当前是：
- `total = product_price + single_room_price - rule_discount`
- 其中 `rule_discount` 当前固定 0（TODO 未实现）。
- `TravelOrderRepository.php:97-106`

4. 参考系统中的会员折扣/券包/积分/保底调整等，当前后端链路未实现。
- 参考：`travel_wxapp/pagesB/travel/confirmOrder.js:961-979,1969-2178`

---

## 三、对旧文档（glm版）的修正点

1. 不能把 `travel_wxapp` 的旧接口能力直接视为当前 `backend` 可用能力。
- 参考用 `/api/travel/saveOrder`、`/api/reserve/order/queryPayDetail`。
- 当前后端是 `travel/order/create`、`travel/order/price-preview`。

2. 当前后端并非“完全没有多儿童年龄层字段”。
- `TravelDepartureRepository`、`TravelOrderRepository` 已有 `big/mid/small child` 字段计算。
- 但当前 uniapp 前端没有输入入口（固定传 0），导致能力未生效。

3. “单房差自动计算已实现”这一类结论在当前项目不成立。
- 当前仅手工输入份数，后端不自动计算也不校验与人数/房间关系。

---

## 四、落地改造建议（按优先级）

### P0（必须）

1. 列表最低价改为“团期最低可售价”。
- 后端在 `travel/product/list` 返回 `min_departure_price`（按未来可售团期聚合）。
- 前端 `product/list.vue` 优先展示该字段。

2. `product/detail` 团期格子展示当日价格。
- 至少展示一个“当日成人价/起价”；若缺失则展示“实时计价”。

3. 补充人数限制提示与校验。
- 展示文案：`每单最多选择4名出行人，每个成人最多携带2名儿童...联系客服>`
- 校验放到前后端两层（前端交互 + 后端兜底）。

### P1（重要）

4. 房型库存体系补齐。
- 建议在团期维度引入 `king_room_stock/sold`、`twin_room_stock/sold`（或统一 JSON 库存结构）。
- `price-preview/create` 增加 `room_type`、库存校验和失败文案。

5. 单房差自动计算与解释。
- 前端默认自动推导：`max(0, 2*roomNum-totalPeople)`。
- 后端复算并兜底，避免前端篡改。
- 在 UI 增加“什么是单房差”说明。

### P2（优化）

6. 规则优惠落地。
- 接入 `TravelPriceRuleRepository` 到 `TravelOrderRepository::pricePreview()`。
- 返回完整 price breakdown（基础价、单房差、规则优惠、总价）。

7. 统一价格模型。
- 明确当前只支持 PEOPLE，还是要补 PACKAGE/FAMILY。
- 若要补，需要从 `product/detail` 到 `order/confirm` 全链路调整入参与校验。

---

## 五、关键证据文件

### 参考实现（travel_wxapp）

- `travel_wxapp/pagesB/travel/travelDetail.wxml:83-88,289-291`
- `travel_wxapp/pagesB/travel/travelDetail.js:170-178,1275-1289`
- `travel_wxapp/pagesB/travel/confirmOrder.wxml:78-113`
- `travel_wxapp/pagesB/travel/confirmOrder.js:296-301,446-470,1362-1395,1635-1639`

### 当前 uniapp

- `qihuang_uniapp/pages/travel/product/list.vue:80-89`
- `qihuang_uniapp/pages/travel/product/detail.vue:29-40,117-121,227-255`
- `qihuang_uniapp/pages/travel/order/confirm.vue:20-37,222-233,251-259`

### 当前 backend

- `backend/app/controller/api/travel/Order.php:37-74`
- `backend/app/common/repositories/travel/TravelOrderRepository.php:68-106,124-138,304-325`
- `backend/app/common/repositories/travel/TravelDepartureRepository.php:39-52`
- `backend/app/common/dao/travel/TravelProductDao.php:67-73`
