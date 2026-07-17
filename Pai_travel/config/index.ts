import path from 'path'
import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import devConfig from './dev'
import prodConfig from './prod'

const outputRoot = process.env.TARO_OUTPUT_DIR || 'dist'

const psdCopyPatterns = [
  { from: 'src/assets/psd-pages/home.jpg', to: `${outputRoot}/assets/psd-pages/home.jpg` },
  { from: 'src/assets/psd-pages/follow.jpg', to: `${outputRoot}/assets/psd-pages/follow.jpg` },
  { from: 'src/assets/psd-pages/cart.jpg', to: `${outputRoot}/assets/psd-pages/cart.jpg` },
  { from: 'src/assets/psd-pages/message.jpg', to: `${outputRoot}/assets/psd-pages/message.jpg` },
  { from: 'src/assets/psd-pages/mine.jpg', to: `${outputRoot}/assets/psd-pages/mine.jpg` },
  { from: 'src/assets/psd-pages/product-list.jpg', to: `${outputRoot}/pages/product/assets/product-list.jpg` },
  { from: 'src/assets/psd-pages/product-detail.jpg', to: `${outputRoot}/pages/product/assets/product-detail.jpg` },
  { from: 'src/assets/psd-pages/live.jpg', to: `${outputRoot}/pages/live/assets/live.jpg` },
  { from: 'src/assets/psd-pages/live-room.jpg', to: `${outputRoot}/pages/live/assets/live-room.jpg` },
  { from: 'src/assets/psd-pages/brand.jpg', to: `${outputRoot}/pages/brand/assets/brand.jpg` },
  { from: 'src/assets/psd-pages/custom.jpg', to: `${outputRoot}/pages/custom/assets/custom.jpg` },
  { from: 'src/assets/psd-pages/thinktank.jpg', to: `${outputRoot}/pages/thinktank/assets/thinktank.jpg` },
  { from: 'src/assets/psd-pages/guide.jpg', to: `${outputRoot}/pages/guide/assets/guide.jpg` },
  { from: 'src/assets/psd-pages/fun.jpg', to: `${outputRoot}/pages/fun/assets/fun.jpg` },
  { from: 'src/assets/psd-pages/publish.jpg', to: `${outputRoot}/pages/publish/assets/publish.jpg` },
  { from: 'src/assets/psd-pages/sixschools.jpg', to: `${outputRoot}/pages/sixschools/assets/sixschools.jpg` },
  { from: 'src/assets/psd-pages/cocreate.jpg', to: `${outputRoot}/pages/cocreate/assets/cocreate.jpg` },
  { from: 'src/assets/psd-pages/vip-980.jpg', to: `${outputRoot}/pages/vip/assets/vip-980.jpg` },
  { from: 'src/assets/psd-pages/vip-1980.jpg', to: `${outputRoot}/pages/vip/assets/vip-1980.jpg` },
  { from: 'src/assets/psd-pages/svip-4980.jpg', to: `${outputRoot}/pages/vip/assets/svip-4980.jpg` },
  { from: 'src/assets/psd-pages/up-detail.jpg', to: `${outputRoot}/pages/up/assets/up-detail.jpg` },
  { from: 'src/assets/psd-pages/up-video.jpg', to: `${outputRoot}/pages/up/assets/up-video.jpg` },
  { from: 'src/assets/psd-pages/up-edit.jpg', to: `${outputRoot}/pages/up/assets/up-edit.jpg` },
  { from: 'src/assets/psd-pages/up-profile.jpg', to: `${outputRoot}/pages/up/assets/up-profile.jpg` },
  { from: 'src/assets/psd-pages/ai.jpg', to: `${outputRoot}/pages/ai/assets/ai.jpg` },
]

export default defineConfig<'webpack5'>(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport<'webpack5'> = {
    projectName: 'taro_template',
    date: '2025-12-10',
    designWidth: 375,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2,
    },
    sourceRoot: 'src',
    outputRoot,
    plugins: ['@tarojs/plugin-html'],
    defineConstants: {},
    copy: {
      patterns: psdCopyPatterns,
      options: {},
    },
    framework: 'react',
    compiler: {
      type: 'webpack5',
      prebundle: {
        enable: false,
      },
    },
    cache: {
      enable: false,
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {
            selectorBlackList: ['nut-'],
          },
        },
        cssModules: {
          enable: true,
          config: {
            namingPattern: 'module',
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
        chain.resolve.alias.set('@', path.resolve(__dirname, '..', 'src'))
      },
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      output: {
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].css',
        chunkFilename: 'css/[name].css',
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: true,
          config: {
            namingPattern: 'module',
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
        pxtransform: {
          enable: true,
          config: {
            selectorBlackList: ['body'],
            baseFontSize: 37.5,
            unitPrecision: 5,
          },
        },
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
        chain.resolve.alias.set('@', path.resolve(__dirname, '..', 'src'))
      },
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: true,
        },
      },
    },
  }
  if (process.env.NODE_ENV === 'development') {
    return merge({}, baseConfig, devConfig)
  }
  return merge({}, baseConfig, prodConfig)
})
