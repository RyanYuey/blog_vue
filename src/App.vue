<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data () {
    return {
      transitionName: "",
      msg: process.env.VUE_APP_SHOW
    };
  },
  mounted () {
    // 取消loading
    // const loading = document.getElementById("loading");
    // if (loading != null) {
    //   document.body.removeChild(loading);
    // }

    // 兼容edge浏览器fixed背景抖动
    if (navigator.userAgent.match(/Edge/)) {
      console.log(11);
      document.body.addEventListener &&
        document.body.addEventListener("mousewheel", function () {
          event.preventDefault();
          var wd = event.wheelDelta;
          var csp = window.pageYOffset;
          window.scrollTo(0, csp - wd);
        });
    }
    // 每次切换路由回到页面最顶端
    this.$router.afterEach(() => {
      window.scrollTo(0, 0);
    });
  },
  watch: {
    // 使用watch 监听$router的变化
    $route (to, from) {
      if (to.name == "Login" || to.name == "Register") {
        // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if (to.meta.index > from.meta.index) {
          // 设置动画名称
          this.transitionName = "slide-left";
        } else {
          this.transitionName = "slide-right";
        }
      } else {
        this.transitionName = "";
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: #333;
}

.slide-left-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-leave-to,
.slide-right-enter {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: 1.5s;
  position: absolute;
  top: 0;
}
</style>
