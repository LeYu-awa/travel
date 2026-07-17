import Layout from '@/layout'
import { roterPre } from '@/settings'
const safeRouter =
  {
    path: `${roterPre}/safe`,
    name: 'Safe',
    meta: {
      icon: '',
      title: '维护'
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'pageLinks',
        name: 'PageLinks',
        meta: {
          title: '页面链接'
        },
        component: () => import('@/views/safe/pageLinks/index')
      },
      {
        path: 'pcLinks',
        name: 'PcLinks',
        meta: {
          title: 'PC商城页面链接'
        },
        component: () => import('@/views/safe/pcLinks/index')
      }
    ]
  }

export default safeRouter
