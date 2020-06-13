<template>
  <div class="home"
       v-title
       data-title="首页">
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
      <div class="header asyncWow fadeInUp">
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
             :xs="24"
             v-for="(item, index) in hotBlogList"
             :key="item.article_id">
        <div class="c-item asyncWow fadeInUp"
             :data-wow-duration="'1.' + index * 2 + 's'">
          <div class="img-wrap">
            <img :src="host + item.thumbnail"
                 alt="博客配图" />
          </div>
          <h3 class="title"
              @click="toDetail(item.article_id)">
            {{ item.article_title }}
          </h3>
          <p class="date">{{ $formatDate(item.create_time) }}</p>
          <a class="more"
             @click="toDetail(item.article_id)">阅读详情</a>
        </div>
        </Col>
      </Row>
    </section>

    <!-- 关于我 -->
    <section class="about">
      <div class="my-button wow fadeInLeft"
           data-wow-delay="0.5s"
           @click="jumpTo('About')">
        <h3>关于我</h3>
        <div class="inner-box"></div>
      </div>
      <div class="my-button wow fadeInRight"
           data-wow-delay="0.5s"
           @click="jumpTo('Message')">
        <h3>给我留言</h3>
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
            <router-link to="/blog/article">
              <Icon type="md-book" />博文</router-link>
            <router-link to="/blog/message">
              <Icon type="md-clipboard" />留言</router-link>
            <router-link to="/blog/diary">
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
           v-show="showNav">
        <div class="nav-list">
          <div class="nav-item"
               @click="jumpTo('Blog')">博客</div>
          <div class="nav-item"
               @click="jumpTo('Diary')">日记</div>
          <div class="nav-item"
               @click="jumpTo('Message')">留言</div>
        </div>
      </div>
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
import Services from "@/api/common.js";
export default {
  name: "Home",
  components: {},
  data () {
    return {
      host: process.env.VUE_APP_URL, //域名
      screenHeight: window.innerHeight,
      showNav: false,
      hotBlogList: [],
      img:
        "https://tse1-mm.cn.bing.net/th/id/OIP.xW8rgopGoMQZ-7gjTqQqFgHaFO?w=297&h=209&c=7&o=5&dpr=1.25&pid=1.7"
    };
  },
  mounted () {
    this.getHotArticles();
    new WOW({
      live: false
    }).init();
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
    },
    // 获取热门文章列表
    async getHotArticles () {
      const res = await Services.getHotArticles();
      if (res.errno === 0) {
        this.hotBlogList = res.data.slice(0, 3);
      } else {
        this.$Message.error("获取热门文章错误");
      }
    },
    // 博客详情
    toDetail (id) {
      this.$router.push({
        name: "ArticleDetail",
        params: { id }
      });
    }
  },
  watch: {
    hotBlogList () {
      this.$nextTick(() => {
        // 在dom渲染完后,再执行动画
        new WOW({
          boxClass: "asyncWow",
          live: false
        }).init();
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
  }
  .arrow {
    position: absolute;
    bottom: 50px;
    width: 64px;
    left: calc(50% - 32px);
    // transform: translateX(-32px);
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
  background: url("../assets/image/night.jpg") 100%;
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
    &:first-child {
      margin-right: 50px;
    }
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
.nav-list {
  margin-top: 120px;
  .nav-item {
    padding: 15px 0;
    margin: 0 80px;
    margin-bottom: 10px;
    white-space: nowrap;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
    position: relative;
    transition: 0.4s;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0px;
      height: 2px;
      background: rgba(45, 140, 240, 0.7);
      transition: 0.6s;
    }
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      width: 0px;
      height: 2px;
      background: #2d8cf0;
      transition: 0.6s;
    }
    &:hover {
      color: #2d8cf0;
      &::before {
        width: 100%;
      }
      &::after {
        width: 100%;
      }
    }
  }
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

@media screen and (max-width: 500px) {
  .swiper-wrap {
    .wel {
      width: 100%;
      position: absolute;
      top: 150px;
      left: 0;
      text-align: center;
    }
  }
}
@media screen and (min-width: 500px) {
  .swiper {
    animation: myScalOffset 2s forwards;
  }
}

@keyframes myScalOffset {
  from {
    transform: scale(1.3) translateX(50px);
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
