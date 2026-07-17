import Layout from '@/layout'
import { roterPre } from '@/settings'
const maintainRouter =
  {
    path: `${roterPre}/maintain`,
    name: 'maintain',
    meta: {
      title: '安全维护'
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'dataBackup',
        name: 'DataBackup',
        meta: {
          title: '数据备份',
          noCache: true
        },
        component: () => import('@/views/maintain/dataBackup/index')
      },
      // {
      //   path: 'auth',
      //   name: 'MaintainAuth',
      //   meta: {
      //     title: '商业授权',
      //     noCache: true
      //   },
      //   component: () => import('@/views/maintain/auth/index')
      // },
      {
        path: 'cache',
        name: 'MaintainCache',
        meta: {
          title: '清除缓存',
          noCache: true
        },
        component: () => import('@/views/maintain/cache/index')
      },
      {
        path: 'copyRight',
        name: 'MaintainCopyRight',
        meta: {
          title: '去版权',
          noCache: true
        },
        component: () => import('@/views/maintain/copyRight/index')
      },
    ]
  }

export default maintainRouter
