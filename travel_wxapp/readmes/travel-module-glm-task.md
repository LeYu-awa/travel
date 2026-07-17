# 旅游模块改造任务单（给 GLM 执行）

- 目标项目：`qihuang_uniapp` + `backend`
- 参考实现：`travel_wxapp/pagesB/travel/travelDetail.*`、`travel_wxapp/pagesB/travel/confirmOrder.*`
- 已确认前提：现有页面 API 链路基本可通；本次主要修复“业务能力差异”，不是联通性问题。
- 依据文档：`travel_wxapp/readmes/travel-module-diff-analysis.md`
- 工具规范：允许并建议 GLM 直接使用项目现有工具，见 `docs/ai/tools/README.md`

---

## 1. 任务目标

按“参考实现能力”补齐当前 uniapp 旅游下单链路，重点修复：

1. 产品列表价格显示为 0 的问题。
2. 产品详情团期未展示每日价格的问题。
3. 人数限制规则（每单最多 4 人，每成人最多 2 儿童）缺失的问题。
4. 订单确认页缺少房型选择、房型库存与库存提示的问题。
5. 单房差仅手工输入、未自动计算的问题。
6. 前后端总价计算与校验不一致风险。

---

## 1.1 GLM 工具使用要求（按此执行）

请优先使用 `docs/ai/tools/` 下的脚本，不要只做静态改码：

1. 数据库结构变更：
- 先生成迁移：`python docs/ai/tools/db_migrate.py --generate "travel房型库存字段"`
- 再执行迁移：`python docs/ai/tools/db_migrate.py migrations/<file>.sql`

2. 接口联调验证：
- `python docs/ai/tools/api_test.py --list`
- `python docs/ai/tools/api_test.py travel/product/list --method GET`
- `python docs/ai/tools/api_test.py travel/product/departure/calendar --method GET --data '{"product_id":1}'`
- `python docs/ai/tools/api_test.py travel/order/price-preview --method POST --data '<实际请求体>'`
- `python docs/ai/tools/api_test.py travel/order/create --method POST --data '<实际请求体>'`

3. 代码上传（如需远端验证）：
- 推荐 FTP：`python docs/ai/tools/ftp_upload.py app/... route/...`
- 备选 SSH：`python docs/ai/tools/deploy.py backend/...`

4. UniApp 构建检查（涉及前端改动时）：
- `python docs/ai/tools/uniapp_helper.py --check-style`
- 必要时：`python docs/ai/tools/uniapp_helper.py --build h5`

5. 工具使用注意：
- `ftp_upload.py` 路径需相对 `backend/`，即 `app/...`、`route/...`，不要写 `backend/app/...`
- `api_test.py` endpoint 不要带 `/api` 前缀

---

## 2. 必做范围（P0）

### 2.1 `product/list` 最低价修复

#### 后端
- 在 `travel/product/list` 返回字段里新增 `min_departure_price`（从未来可售团期计算）。
- 计算口径：
  - 团期范围：`date >= today` 且 `status in (available, reserve)` 且 `remaining > 0`
  - 价格取团期可用价中的最小值（成人/儿童/大中小童 > 0 的最小值）
  - 无有效价格时返回 `0`

#### 前端
- 文件：`qihuang_uniapp/pages/travel/product/list.vue`
- 展示逻辑：
  - 优先显示 `item.min_departure_price`
  - 兜底再走现有 `getMinPrice(item)`

---

### 2.2 `product/detail` 团期每日价格展示

- 文件：`qihuang_uniapp/pages/travel/product/detail.vue`
- 在团期格子中新增价格展示：
  - 若团期价格全为 0：显示 `实时计价`
  - 否则显示 `¥xxx`（建议展示成人价或团期最小价）
- 当前“日期/状态/余位”保留。

---

### 2.3 `product/detail` 人数规则 + 提示

- 文件：`qihuang_uniapp/pages/travel/product/detail.vue`
- 新增提示文案（可点击客服）：
  - `每单最多选择4名出行人，每个成人最多携带2名儿童，超出需分次下单或联系客服下单。联系客服>`
- 新增前端校验：
  - `adult + child <= 4`
  - `child <= adult * 2`
- 在加减人数和提交预订时都执行校验。

---

## 3. 必做范围（P1）

### 3.1 `order/confirm` 房型选择与库存

#### 前端
- 文件：`qihuang_uniapp/pages/travel/order/confirm.vue`
- 新增“房型意向”选择：`大床房 / 双床房`
- 新增提示文案：
  - 常驻提示：`若意向房型无库存，可下单后联系客服尝试调整房型`
  - 无库存提示：`您所选的出行日期没有大床房`（双床同理）

#### 后端
- 需要扩展团期库存结构，支持按房型库存：
  - 方案建议：在 `travel_departure` 增加房型库存字段（如 `king_room_stock/sold`, `twin_room_stock/sold`）
  - 或使用可维护的 JSON 结构（需统一仓储层读写）
- `travel/product/departure/calendar` 返回房型库存剩余信息。
- `travel/order/price-preview`、`travel/order/create` 增加入参 `room_type`，并做房型库存校验。
- 无库存时返回明确报错文案（沿用上面的提示语）。

---

### 3.2 单房差自动计算

#### 前端
- 文件：`qihuang_uniapp/pages/travel/order/confirm.vue`
- 将单房差改为自动推导（默认不手工输入）：
  - `singleRoomNum = max(0, roomNum * 2 - totalPeople)`
- 页面展示“单房差数量（自动计算）”并加解释文案。

#### 后端
- 文件：`backend/app/common/repositories/travel/TravelOrderRepository.php`
- 在 `pricePreview/create` 中复算 `single_room_num`（不要仅信任前端传值），确保价格一致。

---

## 4. 总价与校验一致性（必须处理）

- 确保 `price-preview` 与 `create` 使用同一套计算逻辑：
  - `product_price`
  - `single_room_price`
  - `rule_discount`（当前可先维持 0，但结构保留）
  - `total_price`
- `create` 之前必须再次校验：
  - 团期总库存
  - 房型库存
  - 人数规则（4 人上限、儿童/成人比例）

---

## 5. 建议改动文件清单

### 前端（uniapp）
- `qihuang_uniapp/pages/travel/product/list.vue`
- `qihuang_uniapp/pages/travel/product/detail.vue`
- `qihuang_uniapp/pages/travel/order/confirm.vue`
- `qihuang_uniapp/api/travel.js`（如需新增字段/参数）

### 后端（api/repository/dao/model）
- `backend/app/controller/api/travel/Product.php`
- `backend/app/controller/api/travel/Order.php`
- `backend/app/common/repositories/travel/TravelProductRepository.php`
- `backend/app/common/repositories/travel/TravelDepartureRepository.php`
- `backend/app/common/repositories/travel/TravelOrderRepository.php`
- `backend/app/common/dao/travel/TravelProductDao.php`
- `backend/app/common/dao/travel/TravelDepartureDao.php`
- `backend/app/common/model/travel/TravelDeparture.php`
- （如有）数据库迁移文件：房型库存字段

---

## 6. 验收标准（必须逐条自测）

1. 产品列表不再普遍显示 `¥0.00`，能展示团期最低可售价格。
2. 产品详情团期格子能显示当日价格或“实时计价”。
3. 人数超 4 或儿童超 `成人*2` 时，前端即时拦截并提示。
4. 订单确认页可选 `大床房/双床房`，并能正确识别无库存状态。
5. 页面出现提示：
   - `若意向房型无库存，可下单后联系客服尝试调整房型`
   - `您所选的出行日期没有大床房`（或双床房）
6. 单房差自动计算正确，不依赖手工输入。
7. `price-preview` 和 `create` 返回/落库的价格一致。
8. 下单时后端会再次校验库存与人数规则，不能绕过前端限制。

---

## 7. 给 GLM 的交付要求

1. 直接改代码，不只给建议。
2. 输出“变更文件清单 + 每个文件改动点”。
3. 输出“新增/修改接口字段说明（入参、出参、兼容策略）”。
4. 给出最少 6 条手工测试用例及结果。
5. 如果涉及数据库字段变更，提供迁移 SQL 与回滚 SQL。
6. 输出实际执行过的工具命令与结果摘要（`db_migrate.py`、`api_test.py`、`uniapp_helper.py`、`ftp_upload.py/deploy.py`）。
7. 若某命令因环境限制无法执行，标注 `skipped` 并说明阻塞条件。

---

## 8. 参考证据（核对来源）

- 差异总文档：`travel_wxapp/readmes/travel-module-diff-analysis.md`
- 参考页：
  - `travel_wxapp/pagesB/travel/travelDetail.wxml`
  - `travel_wxapp/pagesB/travel/travelDetail.js`
  - `travel_wxapp/pagesB/travel/confirmOrder.wxml`
  - `travel_wxapp/pagesB/travel/confirmOrder.js`
- 当前页：
  - `qihuang_uniapp/pages/travel/product/list.vue`
  - `qihuang_uniapp/pages/travel/product/detail.vue`
  - `qihuang_uniapp/pages/travel/order/confirm.vue`
- 后端：
  - `backend/app/controller/api/travel/Product.php`
  - `backend/app/controller/api/travel/Order.php`
  - `backend/app/common/repositories/travel/TravelDepartureRepository.php`
  - `backend/app/common/repositories/travel/TravelOrderRepository.php`
