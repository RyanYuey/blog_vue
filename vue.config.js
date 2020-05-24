const _Config = require("./src/config/index");
module.exports = {
  lintOnSave: false,
  devServer: {
    host: "0.0.0.0",
    port: 8090,
    open: true,
    hotOnly: true, // 热更新
    proxy: {
      "/api": {
        // 本地mock服务器
        target: _Config.baseURL,
        changeOrigin: true
      }
      // '/': { // 测试环境服务器
      //   target: 'http://103.28.214.24:24080',
      //   changeOrigin: true,
      //   ws: false
      // }
    } // 设置代理
  }
};
