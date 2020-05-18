// 一些全局的config配置
const modeUrlObj = {
  // 生产环境
  production: {
    baseURL: "http://localhost:3000/",
    authBaseURL: ""
  },
  // 开发环境
  development: {
    baseURL: "http://localhost:3000/",
    authBaseURL: ""
  },
  // 测试环境
  test: {
    baseURL: "http://xxxx:9091/test/",
    authBaseURL: ""
  }
};
module.exports = modeUrlObj[process.env.NODE_ENV];
