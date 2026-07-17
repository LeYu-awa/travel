import Layout from '@/layout'
import { roterPre } from '@/settings'
const freightRouter =
  {
    path: `${roterPre}/freight`,
    name: 'freight',
    meta: {
      title: '物流设置'
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'express',
        name: 'FreightExpress',
        meta: {
          title: '物流公司',
          noCache: true
        },
        component: () => import('@/views/freight/express/index')
      },
      {
        path: 'city/list',
        name: 'FreightCityList',
        meta: {
          title: '城市数据',
          noCache: true
        },
        component: () => import('@/views/freight/city/index')
      }
    ]
  }

export default freightRouter
