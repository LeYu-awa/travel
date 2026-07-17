// ============================================
// 派旅行 - 通用类型定义
// ============================================

// 功能图标项
export interface FunctionIconItem {
  id: string
  name: string
  icon: string
}

// Banner 项
export interface BannerItem {
  id: string
  image: string
  searchPlaceholder: string
  logo?: string
  heroImage?: string
}

// 品牌商品
export interface BrandProduct {
  id: string
  image: string
  name: string
  price?: number
}

// 分类Tab项
export interface CategoryTabItem {
  id: string
  name: string
}

// 排行卡片
export interface RankingCardData {
  badge: string
  title: string
  subtitle: string
  bgImage?: string
}

// 底部Tab项
export interface BottomTabItem {
  id: string
  name: string
  icon: string
  isCenter?: boolean
}

// 用户信息
export interface UserInfo {
  id: string
  nickname: string
  avatar: string
  bio?: string
  level?: number
  isVip?: boolean
  followers?: number
  following?: number
  likes?: number
}

// 旅行产品
export interface TravelProduct {
  id: string
  title: string
  cover: string
  price: number
  originalPrice?: number
  tags: string[]
  rating: number
  sales: number
  location: string
  duration: string // e.g. "3天2晚"
  description?: string
  images?: string[]
}

// 直播信息
export interface LiveInfo {
  id: string
  title: string
  cover: string
  anchor: UserInfo
  viewerCount: number
  status: 'living' | 'preview' | 'ended'
  tags: string[]
}

// 动态/帖子
export interface Post {
  id: string
  user: UserInfo
  content: string
  images: string[]
  video?: string
  location?: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  createTime: string
}

// 消息
export interface Message {
  id: string
  type: 'chat' | 'system' | 'like' | 'comment' | 'follow'
  user?: UserInfo
  content: string
  time: string
  isRead: boolean
}

// 购物车项
export interface CartItem {
  id: string
  product: TravelProduct
  quantity: number
  selected: boolean
  spec?: string
}

// 导游
export interface Guide {
  id: string
  name: string
  avatar: string
  rating: number
  yearsOfExp: number
  tags: string[]
  description: string
  price: number
  trips: number
}

// VIP 会员
export interface VipPlan {
  id: string
  name: string
  price: number
  originalPrice: number
  duration: string
  benefits: string[]
  color: string
  isHot?: boolean
}

// UP主
export interface Creator {
  id: string
  user: UserInfo
  subscribers: number
  totalViews: number
  videos: number
  description: string
}
