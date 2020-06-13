const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  lintOnSave: false,
  outputDir: process.env.NODE_ENV === "development" ? "devdist" : "dist",
  devServer: {
    host: "0.0.0.0",
    port: 8090,
    open: true,
    hotOnly: true, // 热更新
    proxy: {
      "/api": {
        // 本地mock服务器
        target: process.env.VUE_APP_URL,
        changeOrigin: true
      }
      // '/': { // 测试环境服务器
      //   target: 'http://103.28.214.24:24080',
      //   changeOrigin: true,
      //   ws: false
      // }
    } // 设置代理
  },
  productionSourceMap: false,
  configureWebpack: config => {
    return {
      plugins: [
        new CompressionPlugin({
          test: /\.js$|\.html$|\.css/, //匹配文件名
          threshold: 10240, //超过10k的压缩
          deleteOriginalAssets: false //是否删除原文件
        })
      ]
    };
  }
};
