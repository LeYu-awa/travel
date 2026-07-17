# 其他分包页面文档（续）

## 2. 分包Common - 公共页面

| 序号 | 页面路径 | 功能 |
|------|----------|------|
| 1 | test/index | 测试页面 |
| 2 | midTrans | 中转页面 |
| 3 | content/audio | 音频内容 |
| 4 | content/video | 视频内容 |

---

## 3. 分包TravelAssistant - 旅行助手

| 序号 | 页面路径 | 功能 |
|------|----------|------|
| 1 | journey/edit | 行程编辑 |
| 2 | journey/destination | 目的地选择 |
| 3 | journey/recommend | 推荐页面 |
| 4 | journey/map | 地图页面 |
| 5 | plan/detail | 行程规划详情 |
| 6 | travel/index | 旅行首页 |

### 接口列表

#### 1. getTripRecommendFeed - 行程推荐
- **服务**: `services/trip.js`
- **接口路径**: `POST /shopapi/marketingActivity/tripAssistantRecommendation`

#### 2. getAdvertiseProductGroup - 广告产品组
- **服务**: `services/trip.js`
- **接口路径**: `POST /shop-api/productGroup/getAdvertiseProductGroupVo`

#### 3. getProductGroupGoodsDataList - 产品组商品列表
- **服务**: `services/trip.js`
- **接口路径**: `POST /shop-api/productGroup/getProductGroupGoodsDataList`

---

## 4. 分包Micro - 微页面

| 序号 | 页面路径 | 功能 |
|------|----------|------|
| 1 | index | 微页面首页 |

### 功能描述
微页面展示， 支持营销活动页面配置

---

## 5. 分包Activity - 会员兑换活动（详情见13-other-packages.md）

---

# 文档完成清单

## 已创建文档列表

| 文件名 | 内容 |
|--------|------|
| 00-project-architecture.md | 项目架构概述 |
| 01-request-api.md | 请求封装与API接口（325个） |
| 02-common-utils.md | 公共工具函数 |
| 03-components.md | 公共组件（75+） |
| 04-services.md | 服务层 |
| 05-main-pages.md | 主包页面（16个） |
| 06-pagesA.md | 分包A - 会员相关（21个） |
| 07-pagesB.md | 分包B - 旅行相关（21个） |
| 08-pagesC.md | 分包C - 订单相关（4个） |
| 09-pagesD.md | 分包D - 行程相关（18个） |
| 10-pagesE.md | 分包E - 日常活动（6个） |
| 11-pagesF.md | 分包F - 奖品发票（10个） |
| 12-pagesG.md | 分包G - 其他服务（8个） |
| 13-other-packages.md | 其他分包（Activity/Common/TravelAssistant/Micro） |
| 14-remaining-packages.md | 数据字典补充 |

## 页面统计

| 分类 | 数量 |
|------|------|
| 主包 | 16 |
| 分包A | 21 |
| 分包B | 21 |
| 分包C | 4 |
| 分包D | 18 |
| 分包E | 6 |
| 分包F | 10 |
| 分包G | 8 |
| 分包Activity | 3 |
| 分包Common | 4 |
| 分包TravelAssistant | 6 |
| 分包Micro | 1 |
| **总计** | **118** |

## 接口统计

| 模块 | 大致数量 |
|------|------|
| 会员相关 | 50+ |
| 订单相关 | 30+ |
| 优惠券相关 | 25+ |
| 酒店相关 | 15+ |
| 行程相关 | 20+ |
| 活动相关 | 15+ |
| 服务相关 | 20+ |
| 其他 | 150+ |
| **总计** | **325+** |

---

*文档编写完成，如需补充特定页面的详细信息，请继续追加到对应文档*
