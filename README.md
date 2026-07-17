# Travel - 旅游项目工作空间

本仓库包含多个围绕旅游出行场景的前端/小程序项目，以及配套的设计资源和工具。

---

## 项目一览

| 目录 | 技术栈 | 说明 |
|------|--------|------|
| `Pai_travel/` | Taro + React + TypeScript + Sass | 跨端小程序（微信/百度/支付宝/头条/H5） |
| `travel_wxapp/` | 微信小程序原生 | 完整旅游预订小程序（主应用） |
| `qihuang_uniapp/` | UniApp + Vue | 多端旅游综合服务应用 |
| `qihuangbackend_vue/` | Vue + Element UI | 后台管理系统（内容/订单/用户管理） |
| `merchant_backend_vue/` | Vue + Element UI | 商家后台管理系统 |
| `lanhu-mcp/` | Python + FastMCP | 蓝湖设计稿提取 MCP 服务 |

---

### 1. `Pai_travel/` — 跨端小程序（Taro + React）

基于 **Taro 3.x** 构建的跨端小程序，支持微信、百度、支付宝、抖音、H5 等多端编译。

**核心页面：**
- **首页** / **关注** / **购物车** / **消息** / **我的** — 底部 Tab 主页面
- **商品列表 & 详情** — 商品展示与购买
- **直播 & 直播间** — 直播带货模块
- **AI 智能体** — AI 功能页面
- **VIP/SVIP 会员** — 会员权益与订阅
- **UP 主** — 创作者中心（详情/视频/编辑/资料）
- **品牌专区 / 定制板块 / 智囊团 / 导游 / 趣味玩法 / 发布 / 六大派 / 众创空间**

**构建：**
```bash
cd Pai_travel
npm install
npm run build:weapp   # 编译为微信小程序
npm run dev:h5        # H5 开发
```

---

### 2. `travel_wxapp/` — 微信小程序（原生开发）

完整旅游预订微信小程序，使用原生微信小程序框架开发。

**功能模块：**
- **预订** — 旅游线路搜索、目的地查询、攻略浏览
- **出发** — 地面活动、行程管理
- **风物** — 景区景点展示
- **我的** — 会员中心、订单管理、收藏、优惠券
- **旅游助手** — 行程规划、地图、推荐（含目的地/编辑/推荐/地图子页面）
- **微页面** — 内容聚合展示
- **订单系统** — 酒店预订、商品购买、借用/归还、建议反馈

**已安装组件：** `mp-html`（富文本渲染）、`lime-painter`（海报绘制）、`uni-swipe-action`（滑动操作）

**目录结构：**
- `pages/` — 主包页面
- `pagesA/`~`pagesG/` — 分包（会员、旅游、订单、行程、活动等）
- `pagesTravelAssistant/` — 旅游助手分包
- `pagesMicro/` — 微页面分包
- `services/` — 接口服务层
- `store/` — 状态管理
- `utils/` — 工具库（请求、埋点、登录、分享等）

---

### 3. `qihuang_uniapp/` — UniApp 多端应用

基于 **UniApp** 构建的跨端旅游综合服务应用，支持 H5 和微信小程序。

**功能模块：**
- 短视频（抖音风格信息流）
- 直播/直播间（含礼物打赏）
- 社区/百科/健康
- 活动报名与管理
- 积分商城/商品
- 用户中心/订单
- 旅游线路

**构建：**
```bash
cd qihuang_uniapp
npm install
npm run dev:h5          # H5 开发
npm run dev:mp-weixin   # 微信小程序开发
```

---

### 4. `qihuangbackend_vue/` — 后台管理系统

基于 **Vue Element Admin** 的企业级后台管理界面。

**功能模块：**
- 内容管理（CMS）
- 订单管理
- 用户管理
- 短信管理
- 自定义页面装修
- 应用/首页配置

**构建：**
```bash
cd qihuangbackend_vue
npm install
npm run dev              # 开发
npm run build:prod       # 生产构建
```

---

### 5. `merchant_backend_vue/` — 商家后台管理系统

同样基于 **Vue Element Admin** 框架，面向商家角色的管理后台。

**功能模块：**
- 商家应用管理
- 自定义页面 DIY
- 店铺装修

**构建：**
```bash
cd merchant_backend_vue
npm install
npm run dev              # 开发
npm run build:prod       # 生产构建
```

---

### 6. `lanhu-mcp/` — 蓝湖 MCP 服务

基于 **FastMCP** 框架的 Python MCP 服务端，用于自动从蓝湖 Axure 原型提取设计数据。

**功能：**
- 自动登录蓝湖并获取设计稿数据
- 提取图层、颜色、文字样式等设计信息
- 支持 Axure 文档解析
- 支持 Docker 部署

**运行：**
```bash
cd lanhu-mcp
pip install -r requirements.txt
python lanhu_mcp_server.py
```

---

## 排除在版本控制之外的目录

| 目录 | 说明 |
|------|------|
| `app/` | PSD 设计稿源文件（约 4GB，仅本地使用） |
| `.venv/` | Python 虚拟环境 |
| `node_modules/` | Node.js 依赖（每个项目单独安装） |
| `Pai_travel/dist/` | Taro 构建产物 |
| `feishu-mcp-server/` | 飞书 MCP 服务（独立仓库） |
