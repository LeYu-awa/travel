/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'
import { roterPre } from '@/settings'

const travelRouter = {
  path: `${roterPre}/travel`,
  component: Layout,
  redirect: `${roterPre}/travel/product`,
  name: 'Travel',
  meta: {
    title: '旅游管理',
    icon: 'guide'
  },
  children: [
    {
      path: 'category',
      component: () => import('@/views/travel/category/index'),
      name: 'TravelCategory',
      meta: { title: '产品分类', icon: 'tree' }
    },
    {
      path: 'product',
      component: () => import('@/views/travel/product/index'),
      name: 'TravelProduct',
      meta: { title: '旅游产品', icon: 'shopping' }
    },
    {
      path: 'order',
      component: () => import('@/views/travel/order/index'),
      name: 'TravelOrder',
      meta: { title: '旅游订单', icon: 'list' }
    },
    {
      path: 'contract',
      component: () => import('@/views/travel/contract/index'),
      name: 'TravelContract',
      meta: { title: '合同管理', icon: 'documentation' }
    },
    {
      path: 'insurance',
      component: () => import('@/views/travel/insurance/index'),
      name: 'TravelInsurance',
      meta: { title: '保险管理', icon: 'skill' }
    }
  ]
}

export default travelRouter
