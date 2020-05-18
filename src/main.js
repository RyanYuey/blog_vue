import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import "./plugins/iview.js";
import "animate.css";
import "./assets/css/reset.css";

import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
Vue.use(ViewUI);

// 将时间格式化方法绑定到Date原型
import { getFormatDateByLong } from "@/utils/util";
Vue.prototype.$formatDate = getFormatDateByLong;
router.beforeEach((to, from, next) => {
  // 首页不加载
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
