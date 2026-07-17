import Layout from '@/layout'
import { roterPre } from '@/settings'
const marketingRouter =
{
  path: `${roterPre}/marketing`,
  name: 'marketing',
  meta: {
    title: '营销'
  },
  alwaysShow: true,
  component: Layout,
  children: [
    {
      path: 'coupon',
      name: 'Coupon',
      meta: {
        title: '优惠券',
        noCache: true
      },
      // redirect: 'noRedirect',
      component: () => import('@/views/marketing/coupon/index'),
      children: [
        {
          path: 'list',
          name: 'CouponList',
          meta: {
            title: '商户优惠劵列表',
            noCache: true,
          },
          component: () => import('@/views/marketing/coupon/couponList/index')
        },
        {
          path: 'user',
          name: 'CouponUser',
          meta: {
            title: '会员领取记录',
            noCache: true
          },
          component: () => import('@/views/marketing/coupon/couponUser/index')
        }
      ]
    },
    {
      path: 'platform_coupon',
      name: 'PlatformCoupon',
      meta: {
        title: '平台优惠券',
        noCache: true,

      },
      // redirect: 'noRedirect',
      component: () => import('@/views/marketing/platformCoupon/index'),
      children: [
        {
          path: 'list',
          name: 'PlatformCouponlist',
          meta: {
            title: '平台优惠劵列表',
            noCache: true,
            activeMenu: `${roterPre}/marketing/platform_coupon/list`
          },
          component: () => import('@/views/marketing/platformCoupon/couponList/index')
        },
        {
          path: 'couponRecord',
          name: 'CouponRecord',
          meta: {
            title: '优惠劵领取记录',
            noCache: true,
            activeMenu: `${roterPre}/marketing/platform_coupon/couponRecord`
          },
          component: () => import('@/views/marketing/platformCoupon/couponRecord/index')
        },
        {
          path: 'creatCoupon/:id?',
          name: 'CreatCoupon',
          meta: {
            title: '添加优惠劵',
            noCache: true,
            activeMenu: `${roterPre}/marketing/platform_coupon/list`
          },
          component: () => import('@/views/marketing/platformCoupon/couponList/creatCoupon')
        },
        {
          path: 'couponSend',
          name: 'CouponSend',
          meta: {
            title: '优惠券发送记录',
            noCache: true,
            activeMenu: `${roterPre}/marketing/platform_coupon/couponSend`
          },
          component: () => import('@/views/marketing/platformCoupon/couponSend/index')
        },
        {
          path: 'instructions',
          name: 'Instructions',
          meta: {
            title: '使用说明',
            noCache: true,
            activeMenu: `${roterPre}/marketing/platform_coupon/instructions`
          },
          component: () => import('@/views/marketing/platformCoupon/couponInstructions/index')
        }
      ]
    },
    {
      path: 'studio',
      name: 'Studio',
      meta: {
        title: '直播间',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/studio/index'),
      children: [
        {
          path: 'list',
          name: 'StudioList',
          meta: {
            title: '直播间列表',
            noCache: true
          },
          component: () => import('@/views/marketing/studio/studioList/index')
        }
      ]
    },
    {
      path: 'broadcast',
      name: 'Broadcast',
      meta: {
        title: '直播',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/broadcast/index'),
      children: [
        {
          path: 'list',
          name: 'BroadcastList',
          meta: {
            title: '直播商品列表',
            noCache: true
          },
          component: () => import('@/views/marketing/broadcast/broadcastList/index')
        }
      ]
    },
    {
      path: 'liveStreamingManage',
      name: 'LiveStreamingManage',
      meta: {
        title: '直播',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/liveStreamingManage/index'),
      children: [
        {
          path: 'liveList',
          name: 'LiveList',
          meta: {
            title: '直播列表',
            noCache: true
          },
          component: () => import('@/views/marketing/liveStreamingManage/liveList/index'),
        },
        {
          path: 'editpopUp/:id?',
          name: `EditpopUp`,
          meta: {
            title: '编辑直播',
            noCache: true,
            activeMenu: `${roterPre}/marketing/liveStreamingManage/LiveList`
          },
          component: () => import('@/views/marketing/liveStreamingManage/liveList/editpopUp')
        },
        {
          path: 'liveManage',
          name: 'LiveManage',
          meta: {
            title: '直播间管理',
            noCache: true
          },
          component: () => import('@/views/marketing/liveStreamingManage/liveManage/index')
        },
        {
          path: 'liveConfig',
          name: 'LiveConfig',
          meta: {
            title: '直播配置',
            noCache: true
          },
          component: () => import('@/views/marketing/liveStreamingManage/liveConfig/index'),

        },
        {
          path: 'giftManage',
          name: 'GiftManage',
          meta: {
            title: '直播礼物管理',
            noCache: true
          },
          component: () => import('@/views/marketing/liveStreamingManage/giftManage/index')
        },
        {
          path: 'complaintManage',
          name: 'ComplaintManage',
          meta: {
            title: '投诉管理',
            noCache: true
          },
          component: () => import('@/views/marketing/liveStreamingManage/complaintManage/index'),
        },
        {
          path: 'categoryManage',
          name: 'CategoryManage',
          meta: {
            title: '分类管理',
            noCache: true
          },
          component: () => import('@/views/marketing/liveStreamingManage/categoryManage/index'),
        },
      ]
    },
    {
      path: 'seckill',
      name: 'Seckill',
      meta: {
        title: '秒杀管理',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/seckill/index'),
      children: [
        {
          path: 'seckillConfig',
          name: 'SeckillConfig',
          meta: {
            title: '秒杀配置',
            noCache: true
          },
          component: () => import('@/views/marketing/seckill/seckillConfig/index')
        },
        {
          path: 'list',
          name: 'SpikeList',
          meta: {
            title: '秒杀列表',
            noCache: true
          },
          component: () => import('@/views/marketing/seckill/seckillGoods/index.vue')
        }
      ]
    },
    {
      path: 'presell',
      name: 'preSell',
      meta: {
        title: '预售商品管理',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/seckill/index'),
      children: [
        {
          path: 'list',
          name: `preSaleList`,
          meta: {
            title: '预售商品',
            noCache: true
          },
          component: () => import('@/views/marketing/preSale/index')
        },
        {
          path: 'agreement',
          name: `preSaleAgreement`,
          meta: {
            title: '预售协议',
            noCache: true
          },
          component: () => import('@/views/marketing/preSale/agreement')
        }
      ]
    },
    {
      path: 'assist',
      name: 'assist',
      meta: {
        title: '助力活动商品',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/assist/index'),
      children: [
        {
          path: 'goods_list',
          name: `assistProductList`,
          meta: {
            title: '助力活动商品',
            noCache: true
          },
          component: () => import('@/views/marketing/assist/assist_goods/index')
        },
        {
          path: 'list',
          name: `assist`,
          meta: {
            title: '助力活动列表',
            noCache: true
          },
          component: () => import('@/views/marketing/assist/assist_list/index')
        },
      ]
    },
    {
      path: 'combination',
      name: 'combinAtion',
      meta: {
        title: '拼团',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/combination/index'),
      children: [
        {
          path: 'combination_goods',
          name: `combinationGoods`,
          meta: {
            title: '拼团商品',
            noCache: true
          },
          component: () => import('@/views/marketing/combination/combination_goods/index')
        },
        {
          path: 'combination_list',
          name: `combinationList`,
          meta: {
            title: '拼团活动',
            noCache: true
          },
          component: () => import('@/views/marketing/combination/store_combination/index')
        },
        {
          path: 'combination_set',
          name: `combinationSet`,
          meta: {
            title: '拼团设置',
            noCache: true
          },
          component: () => import('@/views/marketing/combination/combination_set/index')
        },
      ]
    },
    {
      path: 'integral',
      name: 'Integral',
      meta: {
        title: '积分',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/integral/index'),
      children: [
        {
          path: 'config',
          name: `integralConfig`,
          meta: {
            title: '积分配置',
            noCache: true
          },
          component: () => import('@/views/marketing/integral/config/index')
        },
        {
          path: 'log',
          name: `integralLog`,
          meta: {
            title: '积分日志',
            noCache: true
          },
          component: () => import('@/views/marketing/integral/log/index')
        },
        {
          path: 'classify',
          name: `integralClassify`,
          meta: {
            title: '积分商品分类',
            noCache: true
          },
          component: () => import('@/views/marketing/integral/classify/index')
        },
        {
          path: 'proList',
          name: `integralProductList`,
          meta: {
            title: '积分商品列表',
            noCache: true
          },
          component: () => import('@/views/marketing/integral/productList/index')
        },
        {
          path: 'addProduct/:id?/:edit?',
          name: `addIntegralProduct`,
          meta: {
            title: '添加积分商品',
            noCache: true,
            activeMenu: `${roterPre}/marketing/integral/proList`
          },
          component: () => import('@/views/marketing/integral/addProduct/index')
        },
        {
          path: 'orderList',
          name: `IntegralOrderList`,
          meta: {
            title: '兑换记录',
            noCache: true
          },
          component: () => import('@/views/marketing/integral/orderList/index')
        },
        {
          path: 'sign',
          name: `signConfig`,
          meta: {
            title: '签到配置',
            noCache: true
          },
          component: () => import('@/views/marketing/integral/sign/index')
        }

      ]
    },
    {
      path: 'discounts',
      name: 'discounts',
      meta: {
        title: '套餐',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/integral/index'),
      children: [
        {
          path: 'list',
          name: `discountsList`,
          meta: {
            title: '套餐列表',
            noCache: true
          },
          component: () => import('@/views/marketing/discounts/index')
        }
      ]
    },
    {
      path: 'atmosphere',
      name: 'atmosphere',
      meta: {
        title: '活动氛围',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/atmosphere/index'),
      children: [
        {
          path: 'list',
          name: `atmosphereList`,
          meta: {
            title: '氛围列表',
            noCache: true
          },
          component: () => import('@/views/marketing/atmosphere/atmosphereList/index')
        },
        {
          path: 'add/:id?',
          name: `addAtmosphere`,
          meta: {
            title: '添加活动氛围',
            noCache: true,
            activeMenu: `${roterPre}/marketing/atmosphere/list`
          },
          component: () => import('@/views/marketing/atmosphere/atmosphereList/addAtmosphere')
        }
      ]
    },
    {
      path: 'border',
      name: 'border',
      meta: {
        title: '活动边框',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/border/index'),
      children: [
        {
          path: 'list',
          name: `borderList`,
          meta: {
            title: '活动边框',
            noCache: true
          },
          component: () => import('@/views/marketing/border/borderList/index')
        },
        {
          path: 'add/:id?',
          name: `addBorder`,
          meta: {
            title: '添加活动边框',
            noCache: true,
            activeMenu: `${roterPre}/marketing/border/list`
          },
          component: () => import('@/views/marketing/border/borderList/addBorder')
        }
      ]
    },
    {
      path: 'application',
      name: 'Application',
      meta: {
        title: '活动报名',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/application/index'),
      children: [
        {
          path: 'list',
          name: `applicationList`,
          meta: {
            title: '活动报名',
            noCache: true
          },
          component: () => import('@/views/marketing/application/list/index')
        },
        {
          path: 'create',
          name: `createApplication`,
          meta: {
            title: '创建报名活动',
            noCache: true,
            activeMenu: `${roterPre}/marketing/application/list`
          },
          component: () => import('@/views/marketing/application/list/create')
        }
      ]
    },
    {
      path: 'redemptionCode',
      name: 'RedemptionCode',
      meta: {
        title: '活动报名',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/redemptionCode/index'),
      children: [
        {
          path: 'codeManage',
          name: `codeManage`,
          meta: {
            title: '活动报名',
            noCache: true
          },
          component: () => import('@/views/marketing/redemptionCode/codeManage/index')
        }
      ]
    },

    {
      path: 'notice',
      name: 'notice',
      meta: {
        title: '公告',
        noCache: true
      },
      component: () => import('@/views/marketing/notice/index'),

    },
    
    // {
    //   path: 'bodypart',
    //   name: 'bodypart',
    //   meta: {
    //     title: '专科直播预约',
    //     noCache: true
    //   },
    //   component: () => import('@/views/marketing/bodypart/index'),

    // },

    {
      path: 'health',
      name: 'health',
      meta: {
        title: '健康',
        noCache: true
      },
      component: () => import('@/views/marketing/health/index'),
      children: [
        {
          path: 'video',
          name: `video`,
          meta: {
            title: '视频管理',
            noCache: true
          },
          component: () => import('@/views/marketing/health/video/index'),
          children: [
            {
              path: 'list',
              name: `list`,
              meta: {
                title: '列表',
                noCache: true
              },
              component: () => import('@/views/marketing/health/video/list')
            },
            {
              path: 'symptom',
              name: `symptom`,
              meta: {
                title: '病症',
                noCache: true
              },
              component: () => import('@/views/marketing/health/video/symptom')
            },
            {
              path: 'body_part',
              name: `body_part`,
              meta: {
                title: '身体部位',
                noCache: true
              },
              component: () => import('@/views/marketing/health/video/body_part')
            }
          ]
        },

        {
          path: 'order',
          name: `order`,
          meta: {
            title: '订单管理',
            noCache: true
          },
          component: () => import('@/views/marketing/health/order/index'),

        },
        {
          path: 'liveappointment',
          name: 'liveappointment',
          meta: {
            title: '专科直播预约',
            noCache: true
          },
          component: () => import('@/views/marketing/liveappointment/index'),
    
        },


      ]
    },
    {
      path: 'video_vip',
      name: 'video_vip',
      meta: {
        title: '视频卡/会员卡',
        noCache: true
      },
      component: () => import('@/views/marketing/video_vip/index'),

    },
    {
      path: 'vote',
      name: 'Vote',
      meta: {
        title: '投票活动',
        noCache: true
      },
      redirect: 'noRedirect',
      component: () => import('@/views/marketing/vote/index'),
      children: [
        {
          path: 'list',
          name: 'VoteList',
          meta: {
            title: '活动列表',
            noCache: true
          },
          component: () => import('@/views/marketing/vote/list/index')
        },
        {
          path: 'create',
          name: 'VoteCreate',
          meta: {
            title: '创建活动',
            noCache: true,
            activeMenu: `${roterPre}/marketing/vote/list`
          },
          component: () => import('@/views/marketing/vote/list/create')
        },
        {
          path: 'edit/:id',
          name: 'VoteEdit',
          meta: {
            title: '编辑活动',
            noCache: true,
            activeMenu: `${roterPre}/marketing/vote/list`
          },
          component: () => import('@/views/marketing/vote/list/create'),
          hidden: true
        },
        {
          path: 'player/:voteId',
          name: 'VotePlayer',
          meta: {
            title: '选手管理',
            noCache: true,
            activeMenu: `${roterPre}/marketing/vote/list`
          },
          component: () => import('@/views/marketing/vote/player/index'),
          hidden: true
        },
        {
          path: 'record/:voteId',
          name: 'VoteRecord',
          meta: {
            title: '投票记录',
            noCache: true,
            activeMenu: `${roterPre}/marketing/vote/list`
          },
          component: () => import('@/views/marketing/vote/record/index'),
          hidden: true
        },
        {
          path: 'statistics/:id',
          name: 'VoteStatistics',
          meta: {
            title: '活动统计',
            noCache: true,
            activeMenu: `${roterPre}/marketing/vote/list`
          },
          component: () => import('@/views/marketing/vote/statistics/index'),
          hidden: true
        }
      ]
    }
  ],

}

export default marketingRouter
