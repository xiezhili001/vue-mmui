module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ?
    '/' :
    '/',
  // 输出文件目录
  outputDir: 'dist', // 默认dist
  // 用于嵌套生成的静态资产（js,css,img,fonts）目录
  // assetsDir: '',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  indexPath: 'index.html', // Default: 'index.html'
  filenameHashing: true,
  // 构建多页时使用
  pages: undefined,
  // eslint-loader是否在保存的时候检查
  lintOnSave: false,
  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: false,
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  transpileDependencies: [],
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,

  css: {
    // 启用 CSS modules
    modules: false,
    // 是否使用css分离插件
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
  },
  devServer: {
    port: 8080, // 端口号
    host: 'localhost',
    disableHostCheck: true,
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    proxy: {
      '/api': {
        target: 'http://cp.che.ba',
        ws: true,
        changeOrigin: true
      }
    }, // 配置多个代理
  },
  // PWA 插件相关配置
  pwa: {},
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}
