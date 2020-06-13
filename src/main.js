import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import "./plugins/iview.js";
import "animate.css";
// import "./assets/css/reset.css"; //先不引入reset.css 否则对markdown有影响

import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
Vue.use(ViewUI);

// 将时间格式化方法绑定到Date原型  只能格式化时间戳,因为后台返回的都是时间戳
import { getFormatDateByLong } from "@/utils/util";
Vue.prototype.$formatDate = getFormatDateByLong;

// 定义指令 设置页面title
Vue.directive("title", {
  inserted: function (el) {
    document.title = el.dataset.title;
  }
});

router.beforeEach((to, from, next) => {
  // 首页不加载LoadingBar
  if (to.path != "/home") {
    ViewUI.LoadingBar.start();
  }
  next();
});

router.afterEach(to => {
  if (to.path != "/home") {
    ViewUI.LoadingBar.finish();
  }
});

Vue.config.productionTip = false;

// 设置路由切换进度条

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
