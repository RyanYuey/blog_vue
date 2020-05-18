<template>
  <div class="home">
    <section class="swiper-wrap"
             ref="swiper">
      <div class="inner">
        <div class="swiper wow fadeIn"
             data-wow-duration="2.5s"></div>
        <h2 class="wel wow fadeIn"
            data-wow-duration="2s">
          <div class="idea">心之所向，素履以往</div>
          <Button type="dashed"
                  @click="jumpTo('Blog')"
                  ghost>查看博客</Button>
        </h2>
        <div class="arrow"
             @click="goAnchor('#skill')">
          <div class="iconfont icon-xiangxia2"></div>
        </div>
        <div class="home-icon"
             @click="showNav = !showNav">
          <div class="toggle-icon"
               :class="{ change: showNav }">
            <div class="bar1 bar"></div>
            <div class="bar2 bar"></div>
            <div class="bar3 bar"></div>
          </div>
          <!-- /toggle-icon -->
        </div>
      </div>
      <div class="mask-layer"></div>
    </section>

    <section class="skill-wrap"
             id="skill">
      <Row>
        <Col :xl="12">
        <div class="skill__cell">
          <h2 class="wow fadeInLeftBig">What can I do?</h2>
        </div>
        </Col>
        <Col :xl="12">
        <div class="skill__cell">
          <div class="cell wow fadeInRightBig">
            <div class="icon-wrap"><i class="iconfont icon-pc"></i></div>
            <span>pc网站</span>
          </div>
          <div class="cell wow fadeInRightBig">
            <div class="icon-wrap"><i class="iconfont icon-app"></i></div>
            <span>混合app</span>
          </div>
          <div class="cell wow fadeInRightBig">
            <div class="icon-wrap">
              <i class="iconfont icon-xiaochengxu"></i>
            </div>
            <span>微信小程序</span>
          </div>
        </div>
        </Col>
      </Row>
    </section>

    <!-- 热门博客 -->
    <section class="hot-blog">
      <div class="header wow fadeInUp">
        <h2>热门博客</h2>
        <hr color="#ff9900" />
        <p class="thought">闲言碎语，不吝赐教</p>
      </div>
      <Row class-name="content"
           type="flex"
           justify="center">
        <Col class-name="col"
             :xxl="6"
             :md="8"
             :xs="24">
        <div class="c-item wow fadeInUp"
             data-wow-duration="1s">
          <div class="img-wrap">
            <img :src="img"
                 alt="博客配图" />
          </div>
          <h3 class="title">MUI上拉加载和下拉刷新出现双滚动条BUG解决办法</h3>
          <p class="date">2020-03-20</p>
          <a class="more">阅读详情</a>
        </div>
        </Col>

        <Col class-name="col"
             :xxl="6"
             :md="8"
             :xs="24">
        <div class="c-item wow fadeInUp"
             data-wow-duration="1.2s">
          <div class="img-wrap">
            <img :src="img"
                 alt="博客配图" />
          </div>
          <h3 class="title">MUI上拉加载和下拉刷新出现双滚动条BUG解决办法</h3>
          <p class="date">2020-03-20</p>
          <a class="more">阅读详情</a>
        </div>
        </Col>

        <Col class-name="col"
             :xxl="6"
             :md="8"
             :xs="24">
        <div class="c-item wow fadeInUp"
             data-wow-duration="1.5s">
          <div class="img-wrap">
            <img :src="img"
                 alt="博客配图" />
          </div>
          <h3 class="title">MUI上拉加载和下拉刷新出现双滚动条BUG解决办法</h3>
          <p class="date">2020-03-20</p>
          <a class="more">阅读详情</a>
        </div>
        </Col>
      </Row>
    </section>

    <!-- 关于我 -->
    <section class="about">
      <div class="my-button wow fadeInUp"
           data-wow-delay="0.5s">
        <h3>关于我</h3>
        <div class="inner-box"></div>
      </div>
    </section>
    <!-- 介绍 -->
    <section class="introduce">
      <h3 class="wow slideInLeft">喜游戏，爱动漫，好学习，永不止</h3>
      <p class="wow slideInRight">人生如逆旅，我亦是行人</p>
    </section>
    <!-- 底部 -->
    <section class="footer">
      <Row type="flex"
           class-name="wow fadeInUp"
           justify="center">
        <Col :sm="8"
             :xs="24">
        <div class="footer-left">
          <h3>
            <Icon type="ios-link" />相关链接</h3>
          <div class="router-wrap">
            <router-link to="Blog">
              <Icon type="md-book" />博文</router-link>
            <router-link to="Blog">
              <Icon type="md-clipboard" />留言</router-link>
            <router-link to="/About">
              <Icon type="md-paper" />日记</router-link>
          </div>
        </div>
        </Col>
        <Col :sm="8"
             :xs="24">
        <div class="footer-right">
          <h3>
            <Icon type="ios-call" />联系我</h3>
          <div class="router-wrap">
            <span>
              <Icon type="md-mail" />邮箱：1978063895@qq.com</span>
          </div>
        </div>
        </Col>
      </Row>
    </section>
    <section class="copyright">copyright</section>
    <!-- 弹出层 -->
    <transition name="fade">
      <div class="masker"
           v-show="showNav"></div>
    </transition>
    <transition name="slide">
      <div class="popup"
           v-show="showNav"></div>
    </transition>
    <!-- 返回顶部 -->
    <BackTop :height="500"
             :bottom="100"
             :duration="1500"> </BackTop>
  </div>
</template>

<script>
// @ is an alias to /src
import { WOW } from "wowjs";
export default {
  name: "Home",
  components: {},
  data () {
    return {
      screenHeight: window.innerHeight,
      showNav: false,
      img:
        "https://tse1-mm.cn.bing.net/th/id/OIP.xW8rgopGoMQZ-7gjTqQqFgHaFO?w=297&h=209&c=7&o=5&dpr=1.25&pid=1.7"
    };
  },
  mounted () {
    new WOW().init();
  },
  methods: {
    // 滚动到指定锚点
    goAnchor (selector) {
      this.$el.querySelector(selector).scrollIntoView({
        behavior: "smooth", // 平滑过渡
        block: "start" // 上边框与视窗顶部平齐。默认值
      });
    },
    // 路由跳转
    jumpTo (componentName) {
      this.$router.push({
        name: componentName
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/common.scss";
.home {
  width: 100%;
  height: 100vh;
}

.swiper-wrap {
  position: relative;
  overflow: hidden;
  .wel {
    // height: 50px;
    position: absolute;
    top: 150px;
    left: 150px;
    font-size: 32px;
    color: #fff;
    .idea {
      margin-bottom: 10px;
      font-size: 36px;
    }
  }
  .swiper {
    width: 100%;
    height: 100vh;
    background: url("../assets/image/sailing.jpg") no-repeat center;
    background-size: cover;
    animation: myScalOffset 2s forwards;
  }
  .arrow {
    position: absolute;
    bottom: 50px;
    width: 64px;
    left: 50%;
    transform: translateX(-25px);
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    border-radius: 50%;
    animation: myMove 3s forwards;
    transition: 0.5s;
    .iconfont {
      font-size: 42px;
      color: #fff;
      font-weight: bold;
    }
    &:hover {
      background: rgba(92, 173, 255, 0.9);
    }
  }
  .home-icon {
    position: fixed;
    top: 30px;
    right: 30px;
    z-index: 999;
    font-size: 10px;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
    transition: all 0.5s;
    cursor: pointer;
    &:hover {
      background: $color-primary;
    }
  }

  // // 图片遮罩
  .mask-layer {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
}
// 技能
.skill-wrap {
  background: #fff;
  overflow-x: hidden;
}

.skill__cell {
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    font-size: 32px;
  }
  .cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 40px;
    &:last-child {
      margin: 0;
    }
    span {
      color: #808695;
    }
  }
  .icon-wrap {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid #ff9900;
    margin-bottom: 20px;
    .iconfont {
      font-size: 48px;
      color: #ff9900;
    }
  }
}
// 热门博客
.hot-blog {
  padding: 80px 10px;
  background: $bg-white;
  .header {
    text-align: center;
    margin-bottom: 50px;
    h2 {
      font-size: 36px;
      font-weight: normal;
    }
  }
  hr {
    width: 60px;
    color: #ff9900;
    margin: 20px auto;
  }
  p {
    font-size: 18px;
    color: $color-sub;
  }
  .col {
    padding: 0 30px;
  }
  .c-item {
    padding-bottom: 15px;
    background: #fff;
    box-sizing: border-box;
    .img-wrap {
      width: 100%;
      img {
        width: 100%;
        height: 300px;
        object-fit: cover;
      }
    }
    .title {
      margin: 10px;
      font-size: 16px;
      color: $color-title;
      cursor: pointer;
      &:hover {
        color: $color-sub;
      }
    }
    .date {
      font-size: 14px;
      color: $color-sub;
      margin: 0 10px 10px;
    }
    .more {
      margin-left: 10px;
    }
  }
}

.about {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../assets/image/like01.png");
  background-attachment: fixed;
  .my-button {
    width: 150px;
    height: 40px;
    border: 1px solid #fff;
    color: #fff;
    line-height: 40px;
    text-align: center;
    cursor: pointer;

    position: relative;
    h3 {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
    .inner-box {
      width: 0%;
      height: 100%;
      transition: width 1s;
      background: #6bc30d;
    }
    &:hover .inner-box {
      width: 100%;
    }
  }
}

.introduce {
  text-align: center;
  padding: 80px 0;
  overflow-x: hidden;
  h3 {
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 20px;
  }
  p {
    font-size: 16px;
    color: $color-sub;
  }
}
// 底部
.footer {
  height: 300px;
  background: #212121;
  color: #fff;
  .footer-left,
  .footer-right {
    padding: 60px 0 0 150px;
    box-sizing: border-box;
    .router-wrap {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
    }
    a,
    span {
      font-size: 16px;
      color: #fff;
      margin-top: 10px;
    }
    a:hover {
      color: $color-primary;
    }
    .ivu-icon {
      margin-right: 5px;
    }
  }
}

.copyright {
  height: 50px;
  line-height: 50px;
  background: #1d1d21;
  color: #fff;
  text-align: center;
}

// 弹出层
.popup {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 300px;
  background: rgba(255, 255, 255, 0.7);
  z-index: 998;
}
.masker {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

/* 可以设置不同的进入和离开动画 */
/* 滑出过渡 */
.slide-enter,
.slide-leave-to {
  width: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: width 0.5s ease-in-out;
}

// 遮罩过渡
.fade-enter,
.fade-leave-to {
  // opacity: 0;
  background: rgba(0, 0, 0, 0);
}
.fade-enter-active,
.fade-leave-active {
  transition: background 0.5s;
}

@keyframes myScalOffset {
  from {
    transform: scale(1.2) translateX(60px);
  }
  to {
    transform: scale(1) translateX(0);
  }
}

@keyframes myMove {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(40px);
  }
}
</style>
