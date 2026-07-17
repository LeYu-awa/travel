import Layout from '@/layout'
import { roterPre } from '@/settings'
const deliveryRouter =
  {
    path: `${roterPre}/delivery`,
    name: 'delivery',
    meta: {
      icon: '',
      title: '同城配送'
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'store_manage',
        name: 'StoreManage',
        meta: {
          title: '门店管理'
        },
        component: () => import('@/views/cityDelivery/storeManage/index')
      },
      {
        path: 'usage_record',
        name: 'UsageRecord',
        meta: {
          title: '使用记录'
        },
        component: () => import('@/views/cityDelivery/usageRecord/index')
      },
      {
        path: 'recharge_record',
        name: 'RechargeRecord',
        meta: {
          title: '充值记录'
        },
        component: () => import('@/views/cityDelivery/rechargeRecord/index')
      }
    ]
  }

export default deliveryRouter
