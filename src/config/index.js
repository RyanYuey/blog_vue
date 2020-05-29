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
  }
};
module.exports = modeUrlObj[process.env.NODE_ENV];
