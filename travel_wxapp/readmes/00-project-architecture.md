# 松赞旅行微信小程序 - 项目架构

## 1. 项目基本信息

| 属性 | 值 |
|------|-----|
| 项目名称 | 松赞旅行微信小程序 |
| 版本 | 3.1.0 |
| 酒店集团代码 | SONGTSAM |
| 酒店集团ID | 1 |
| AppID | wxf26084f7c2585736 |
| 主API域名 | https://api.songtsam.com |
| 商城API域名 | https://apiwx.songtsam.com/guardian |
| H5域名 | https://m.songtsam.com |

## 2. 目录结构

```
travel_wxapp/
├── app.js                    # 应用入口，Vue3 Composition API
├── app.json                  # 应用配置，页面路由、分包、TabBar
├── app.wxss                  # 全局样式
├── project.config.json       # 微信开发者工具配置
│
├── assets/                   # 静态资源（图片等）
│
├── base/                     # 基础配置和工具
│   ├── cityData/             # 城市数据
│   ├── jAlert/               # 弹窗组件
│   ├── aplusPageConfig.js    # 埋点页面配置
│   ├── channel.js            # 渠道配置
│   ├── common.js             # 公共常量
│   ├── defaultConfig.js      # 默认配置
│   ├── home.js               # 首页配置
│   └── product.js            # 产品相关
│
├── common/                   # 公共模块
│   └── vendor.js             # 第三方库统一导出
│
├── components/               # 公共组件（详见组件文档）
│
├── hooks/                    # Vue3 Composition API Hooks
│   └── useAdReport.js        # 广告追踪Hook
│
├── pages/                    # 主包页面（16个）
│   ├── travel/               # 预订相关
│   ├── trip/                 # 行程相关
│   ├── member/               # 会员相关
│   ├── travels/              # 旅行列表
│   ├── mall/                 # 商城
│   ├── scenery/              # 风物
│   ├── search/               # 搜索
│   ├── guide/                # 指南
│   └── qw-active-code/       # 活动码
│
├── pagesA/                   # 分包A - 会员相关（21个页面）
├── pagesB/                   # 分包B - 旅行相关（21个页面）
├── pagesC/                   # 分包C - 订单相关（4个页面）
├── pagesD/                   # 分包D - 行程相关（18个页面）
├── pagesE/                   # 分包E - 日常活动（6个页面）
├── pagesF/                   # 分包F - 奖品发票（10个页面）
├── pagesG/                   # 分包G - 其他服务（8个页面）
├── pagesActivity/            # 分包Activity（3个页面）
├── pagesCommon/              # 分包Common（4个页面）
├── pagesTravelAssistant/     # 分包TravelAssistant（6个页面）
├── pagesMicro/               # 分包Micro（1个页面）
│
├── services/                 # 服务层（API业务封装）
│   ├── request/              # 请求相关
│   ├── channelManage.js
│   ├── common.js
│   ├── home.js
│   ├── member.js
│   ├── micro.js
│   ├── trip.js
│   └── user.js
│
├── store/                    # Pinia状态管理
│
├── uni_modules/              # uni-app模块
│
└── utils/                    # 工具函数
    ├── api.js                # API接口定义（约325个）
    ├── config.js             # 全局配置
    ├── request.js            # 网络请求封装
    ├── signature.js          # 请求签名
    ├── wxuser.js             # 微信用户管理
    ├── user.js               # 用户服务
    ├── utils.js              # 通用工具
    ├── helper.js             # 辅助工具
    └── ...                   # 其他工具
```

## 3. 分包策略

### 3.1 分包概览

| 分包 | 路径 | 页面数 | 功能 |
|------|------|--------|------|
| 主包 | pages/ | 16 | 核心页面、TabBar页面 |
| 分包A | pagesA/ | 21 | 会员中心、优惠券、收藏 |
| 分包B | pagesB/ | 21 | 旅行详情、订单、支付、合同 |
| 分包C | pagesC/ | 4 | 酒店预订、订单信息 |
| 分包D | pagesD/ | 18 | 行程详情、酒店服务、行李 |
| 分包E | pagesE/ | 6 | 日常活动、咨询表单 |
| 分包F | pagesF/ | 10 | 奖品、地址、发票 |
| 分包G | pagesG/ | 8 | 清洁、借用、购买、建议 |
| 分包Activity | pagesActivity/ | 3 | 会员兑换活动 |
| 分包Common | pagesCommon/ | 4 | 测试页、音视频内容 |
| 分包TravelAssistant | pagesTravelAssistant/ | 6 | 旅行助手、行程规划 |
| 分包Micro | pagesMicro/ | 1 | 微页面 |

### 3.2 分包优势
- **按需加载**：用户访问时才下载对应分包
- **减少主包体积**：加快首次启动速度
- **功能模块化**：按业务功能划分分包

## 4. TabBar配置

使用**自定义TabBar**（custom: true），共4个Tab：

| Tab | 页面路径 | 文字 |
|-----|----------|------|
| 预订 | pages/travel/index | 预订 |
| 出发 | pages/trip/ground-activities | 出发 |
| 风物 | pages/scenery/scenery | 风物 |
| 我的 | pages/member/memberCenter | 我的 |

### TabBar配置详情
```json
{
  "tabBar": {
    "color": "#808080",
    "custom": true,
    "selectedColor": "#000000",
    "list": [
      { "pagePath": "pages/travel/index", "text": "预订" },
      { "pagePath": "pages/trip/ground-activities", "text": "出发" },
      { "pagePath": "pages/scenery/scenery", "text": "风物" },
      { "pagePath": "pages/member/memberCenter", "text": "我的" }
    ]
  }
}
```

## 5. 技术栈

| 技术 | 版本/说明 |
|------|----------|
| 前端框架 | Vue 3 + Composition API |
| 跨端框架 | uni-app |
| 状态管理 | Pinia |
| UI组件 | 自定义组件 |
| 网络请求 | 封装的 request.js |
| 埋点统计 | 友盟+ 诸葛IO + 起点CRM |
| 地图服务 | 腾讯地图 (qqmap-wx-jssdk) |
| 字体加载 | 动态加载自定义字体 |

## 6. 应用生命周期

### onLaunch (应用启动)
1. 加载自定义字体（Montserrat、思源宋体）
2. 发送页面展示埋点
3. 路由拦截初始化
4. 检查用户登录状态
   - 已登录：刷新会员信息，发送用户画像埋点
   - 未登录：尝试通过openid静默登录
5. 解析启动参数（partnerId、cardSrc）
6. 检查小程序更新
7. 获取系统配置

### onShow (应用显示)
1. 清除导航缓存
2. 初始化起点追踪

### onHide (应用隐藏)
1. 更新起点追踪数据

### onPageNotFound (页面不存在)
- 重定向到 `/pages/travel/preIndex`

## 7. 核心模块说明

### 7.1 用户认证流程
```
启动 → 获取wxuser(openid) → memberLoginOpen(静默登录)
      ↓
   有会员信息 → refreshMemberInfo → 发送用户画像
      ↓
   无会员信息 → 等待用户主动登录
```

### 7.2 埋点体系
- **友盟+ (umeng)**：用户行为追踪
- **诸葛IO**：数据分析
- **起点CRM (qdTracker)**：营销追踪
- **阿里云APlus**：性能监控

### 7.3 存储管理 (wxuser.js)
| Key | 说明 |
|-----|------|
| user | 用户信息（memberToken等） |
| wxuser | 微信用户信息（openid等） |
| config | 系统配置（appkey、appsecret） |
| cardSrc | 用户来源渠道 |
| partnerId | 合作伙伴ID |

## 8. 页面路由配置

### 主包页面（按app.json顺序）
1. `pages/travel/index` - 预订首页 ⭐TabBar
2. `pages/travel/destinations` - 目的地
3. `pages/travel/preIndex` - 预订预首页
4. `pages/trip/index` - 行程首页
5. `pages/trip/ground-activities` - 出发/地面活动 ⭐TabBar
6. `pages/member/memberCenter` - 会员中心 ⭐TabBar
7. `pages/travels/travels` - 旅行列表
8. `pages/member/memberLogin` - 会员登录
9. `pages/member/orderList` - 订单列表
10. `pages/mall/webview` - 商城H5页面
11. `pages/scenery/scenery` - 风物页面 ⭐TabBar
12. `pages/search/index` - 搜索首页
13. `pages/search/result` - 搜索结果
14. `pages/search/result-hotel` - 搜索结果-酒店
15. `pages/guide/guide` - 指南页面
16. `pages/qw-active-code/index` - 活动代码页

## 9. 开发注意事项

1. **请求签名**：所有API请求需使用appkey/appsecret签名
2. **用户状态**：通过wxuser.js管理登录状态和token
3. **埋点规范**：页面切换、关键操作需发送埋点
4. **分包限制**：单个分包不超过2MB，总包不超过20MB
5. **PHP兼容**：如需后端配合，注意PHP 7.2兼容性
