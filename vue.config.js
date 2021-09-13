const path = require('path')
module.exports = {
  lintOnSave: false,
  devServer: {
    // host: '192.168.9.108', // ip
    port: 8080, // 设置端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    proxy: null  //设置代理
  },
  //svg配置
  chainWebpack: (config) => {
    const dir = path.resolve(__dirname, 'src/assets/icon')
    config.module
      .rule('svg-sprite')
      .test(/\.svg/)
      .include.add(dir)
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({extract: false})
      .end()
    config
      .plugin('svg-sprite')
      .use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
    config.module.rule('svg').exclude.add(dir)
  },
  //favicon相关，路径默认以public作为根目录
  pwa: {
    iconPaths: {
      faviconSVG: 'img/icons/favicon.svg',
      //默认显示favicon32
      favicon32: 'favicon.ico',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    }
  }
}
