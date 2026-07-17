import Layout from '@/layout'
import { roterPre } from '@/settings'
console.log(roterPre);
const communityRouter =
{
  path: `${roterPre}/community`,
  name: 'community',
  meta: {
    icon: 'dashboard',
    title: '社区'
  },
  alwaysShow: true,
  component: Layout,
  children: [
    {
      path: 'category',
      name: 'CommunityClassify',
      meta: {
        title: '社区分类',
        noCache: true
      },
      component: () => import('@/views/community/communityClassify')
    },
    {
      path: 'topic',
      name: 'CommunityTopic',
      meta: {
        title: '社区话题',
        noCache: true
      },
      component: () => import('@/views/community/communityTopic')
    },
    {

      path: 'batchImport',
      name: 'BatchImport',
      meta: {
        title: '批量导入',
        noCache: true
      },
      component: () => import('@/views/community/batchImport')
    },
    {
      path: 'list',
      name: 'communityList',
      meta: {
        title: '社区内容',
        noCache: true
      },
      component: () => import('@/views/community/communityList')
    },
    {
        path: 'reply',
        name: 'communityReply',
        meta: {
          title: '社区评论',
          noCache: true
        },
        component: () => import('@/views/community/communityComment')
      }
  ]
}

export default communityRouter
