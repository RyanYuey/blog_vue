import axios from "axios";
// import config from "../config/index"; // 路径配置

// 创建axios 实例
const service = axios.create({
  // baseURL: config.baseURL, // 如果配置了域名，会替换掉vue.config.js中的target 配置例如/api 则会在域名后拼接
  timeout: 10000 // 请求超时时间
});

// request 拦截器
service.interceptors.request.use(
  config => {
    // 这里可以自定义一些config 配置

    return config;
  },
  error => {
    //  这里处理一些请求出错的情况

    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    // 这里处理一些response 正常放回时的逻辑

    return res;
  },
  error => {
    // 这里处理一些response 出错时的逻辑

    return Promise.reject(error);
  }
);

export default service;
