// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2023 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // captcha
  {
    url: '/mer/captcha',
    type: 'get',
    response: _ => {
      return {
        status: 200,
        data: {
          captcha: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAeCAYAAAAa7PzXAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmebU4IZAAABXElEQVR4nO3dMU7DQBBA0ZmjcAQOwck4AkfgCBwBCTdAoUI0dHbskUeRLY3y3meepCh2/FexvbMZAPwL5gUAmJkBEjNAYgZIzACJGSAdB/B4v9sDQMwAiRkgMQMkZoC0KoDLstz9/p3HDJBYW4BlWY6zjxkgMQMkZoDEDJCYARIzQGIGSMwAiRkgMQMkZoDEDJCYARIzQGIGSMwAiRkgMQMkZoDEDJCYARIzQGIGSMwAiRkgMQMkZoDEDJCYARIzQGIGSMwAiRkgMQMkZoDEDJCYARIzQGIGSMwAiRkgsdUAbDYb++OPxAyQmAESM0BiBkjMAIkZIDEDJGaAxAyQmAESM0BiBkjMAIkZIDEDJGaAxG67G0Aw3+12ADwxAyRmgMQMkJgBEjNAK78PsN/vP/6v+ff8Z4DElgK43+/tjyc+k5gBunsH2H7D7zt7BkjMAIkZIDEDJGaAxAyQmAESM0BiBkjMAIkZIDEDJGaAxAyQmAESM0D6AmXMbTIFb6NDAAAAAElFTkSuQmCC',
          key: 'mock-captcha-key'
        }
      }
    }
  },
  // login config
  {
    url: '/mer/login_config',
    type: 'get',
    response: _ => {
      return {
        status: 200,
        data: {
          login_banner: [],
          login_logo: '',
          beian_sn: '',
          login_title: 'CRMEB商家管理'
        }
      }
    }
  },
  // user login
  {
    url: '/mer/login',
    type: 'post',
    response: config => {
      const { account } = config.body
      const token = tokens[account]

      // mock error
      if (!token) {
        return {
          status: 400,
          message: '账号或密码错误'
        }
      }

      return {
        status: 200,
        data: {
          token: token.token,
          admin: {
            account: account,
            is_area: 0,
            regions: []
          }
        }
      }
    }
  },

  // get user info
  {
    url: '/mer/vue-element-admin/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // get menus
  {
    url: '/mer/menus',
    type: 'get',
    response: _ => {
      return {
        status: 200,
        data: [
          {
            path: '/merchant/dashboard',
            title: '控制台',
            icon: 's-data',
            children: []
          },
          {
            path: '/merchant/product',
            title: '商品管理',
            icon: 'goods',
            children: [
              { path: '/merchant/product/classify', title: '商品分类', icon: '' },
              { path: '/merchant/product/list', title: '商品列表', icon: '' },
              { path: '/merchant/product/reviews', title: '商品评论', icon: '' }
            ]
          },
          {
            path: '/merchant/order',
            title: '订单',
            icon: 'document',
            children: [
              { path: '/merchant/order/list', title: '订单管理', icon: '' },
              { path: '/merchant/order/refund', title: '退款订单', icon: '' }
            ]
          },
          {
            path: '/merchant/user',
            title: '用户',
            icon: 'user',
            children: [
              { path: '/merchant/user/list', title: '用户列表', icon: '' },
              { path: '/merchant/user/label', title: '用户标签', icon: '' },
              { path: '/merchant/user/group', title: '用户分组', icon: '' }
            ]
          },
          {
            path: '/merchant/marketing',
            title: '营销',
            icon: 'present',
            children: [
              { path: '/merchant/marketing/seckill/list', title: '秒杀商品', icon: '' },
              { path: '/merchant/marketing/combination/combination_goods', title: '拼团商品', icon: '' },
              { path: '/merchant/marketing/coupon/list', title: '优惠劵列表', icon: '' },
              { path: '/merchant/marketing/discounts/list', title: '套餐列表', icon: '' }
            ]
          },
          {
            path: '/merchant/accounts',
            title: '财务管理',
            icon: 'money',
            children: [
              { path: '/merchant/accounts/reconciliation', title: '财务对账', icon: '' },
              { path: '/merchant/accounts/capitalFlow', title: '资金流水', icon: '' },
              { path: '/merchant/accounts/statement', title: '财务账单', icon: '' }
            ]
          },
          {
            path: '/merchant/setting',
            title: '设置',
            icon: 'setting',
            children: [
              { path: '/merchant/setting/systemRole', title: '身份管理', icon: '' },
              { path: '/merchant/setting/systemAdmin', title: '管理员管理', icon: '' },
              { path: '/merchant/setting/systemLog', title: '操作日志', icon: '' }
            ]
          },
          {
            path: '/merchant/devise',
            title: '页面装修',
            icon: 'edit-outline',
            children: [
              { path: '/merchant/devise/diy/index', title: '店铺装修', icon: '' },
              { path: '/merchant/devise/diy/list', title: '装修列表', icon: '' }
            ]
          },
          {
            path: '/merchant/station',
            title: '消息',
            icon: 'message',
            children: [
              { path: '/merchant/station/notice', title: '站内消息', icon: '' }
            ]
          }
        ]
      }
    }
  },

  // user logout
  {
    url: '/mer/logout',
    type: 'get',
    response: _ => {
      return {
        status: 200,
        data: 'success'
      }
    }
  },

  // ajcaptcha status
  {
    url: '/mer/system/ajcaptcha/status',
    type: 'post',
    response: _ => {
      return {
        status: 200,
        data: {
          status: false
        }
      }
    }
  }
]
