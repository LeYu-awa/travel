import Layout from '@/layout'
import { roterPre } from '@/settings'
const stationRouter  =
  {
    path: `${roterPre}/station`,
    name: 'station',
    meta: {
      icon: '',
      title: '公告列表'
    },
    alwaysShow: true,
    component: Layout,
    children: [
      {
        path: 'notice',
        name: 'stationNotice',
        meta: {
          title: '公告列表'
        },
        component: () => import('@/views/station/notice/index')
      }
    ]
  }
export default stationRouter
