export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/follow/index',
    'pages/cart/index',
    'pages/message/index',
    'pages/mine/index',
  ],
  subPackages: [
    { root: 'pages/product', pages: ['list/index', 'detail/index'] },
    { root: 'pages/live', pages: ['index', 'room/index'] },
    { root: 'pages/brand', pages: ['index'] },
    { root: 'pages/custom', pages: ['index'] },
    { root: 'pages/thinktank', pages: ['index'] },
    { root: 'pages/guide', pages: ['index'] },
    { root: 'pages/fun', pages: ['index'] },
    { root: 'pages/publish', pages: ['index'] },
    { root: 'pages/sixschools', pages: ['index'] },
    { root: 'pages/cocreate', pages: ['index'] },
    { root: 'pages/vip', pages: ['index', 'v1980/index', 'svip/index'] },
    { root: 'pages/up', pages: ['detail/index', 'video/index', 'edit/index', 'profile/index'] },
    { root: 'pages/ai', pages: ['index'] },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationStyle: 'custom',
    backgroundColor: '#FFFFFF',
  },
})
