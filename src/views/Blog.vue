<template>
  <div class="layout">
    <Layout>
      <Header :style="{
          position: 'fixed',
          width: '100%',
          background: '#fff',
          'z-index': '9'
        }">
        <div class="header-inner">
          <div class="layout-logo"
               @click="jumpTo('/home')">
            <img src="../assets/logo.png"
                 alt="" />
          </div>
          <Menu mode="horizontal"
                theme="light"
                @on-select="onMenuSelect()"
                :active-name="$route.name"
                class="menu">
            <div class="layout-nav">
              <MenuItem name="Home"
                        to="/home">
              首页
              </MenuItem>
              <MenuItem name="Article"
                        to="/blog/article">
              博客
              </MenuItem>
              <MenuItem name="Diary"
                        to="/blog/diary">
              日记
              </MenuItem>
              <MenuItem name="Message"
                        to="/blog/message">
              留言
              </MenuItem>
              <MenuItem name="About"
                        to="/blog/about">
              关于
              </MenuItem>
            </div>
          </Menu>
          <div class="user">
            <div v-if="$store.getters.user_name">
              <Poptip trigger="hover">
                <div class="user-name">
                  <Avatar :src="host + userInfo.user_avatar" />
                  {{ userInfo.user_nickname }}
                </div>
                <div slot="content"
                     class="y-poptip">
                  <div class="y-item"
                       v-if="userInfo.user_type === 2"
                       @click="jumpTo('/admin')">
                    博客管理
                  </div>
                  <div class="y-item"
                       @click="logout">退出</div>
                </div>
              </Poptip>
            </div>
            <div @click="jumpTo('/Login')"
                 v-else>
              <Avatar icon="ios-person" /> 登录
            </div>
          </div>
          <div class="trigger"
               @click="showMobileNav = !showMobileNav">
            <Icon type="md-menu"
                  size="24" />
          </div>
        </div>
        <div class="mobile-nav"
             :style="{ 'max-height': showMobileNav ? '400px' : '0px' }">
          <div class="mobile-nav-item"
               @click="jumpTo('/home')">首页</div>
          <div class="mobile-nav-item"
               @click="jumpTo('/blog')">博客</div>
          <div class="mobile-nav-item"
               @click="jumpTo('/blog/diary')">日记</div>
          <div class="mobile-nav-item"
               @click="jumpTo('/blog/message')">
            留言
          </div>
          <div class="mobile-nav-item"
               @click="jumpTo('/blog/about')">关于</div>
        </div>
      </Header>
      <Content :style="{
          margin: '88px auto 0',
          width: '100%',
          minHeight: '85vh'
        }">
        <div class="container">
          <router-view></router-view>
        </div>
      </Content>
      <Footer class="layout-footer-center">
        <div class="contact"></div>
        <p>2011-2016 &copy; TalkingData</p>
      </Footer>
    </Layout>
    <!-- 返回顶部 -->
    <BackTop :height="400"
             :bottom="100"
             :duration="1500"> </BackTop>
  </div>
</template>

<script>
import Services from "@/api/common.js";
export default {
  data () {
    return {
      showMobileNav: false,
      userInfo: {},
      host: process.env.VUE_APP_URL
    };
  },
  mounted () {
    this.userInfo = JSON.parse(localStorage.getItem("user_info"));
  },
  methods: {
    jumpTo (path) {
      this.$router.push({
        path
      });
      this.showMobileNav = false;
    },
    // 导航选择
    onMenuSelect (name) {
      console.log(name);
    },
    // 退出
    async logout () {
      const res = await Services.logout();
      if (res.errno === 0) {
        this.$Message.success("退出成功");

        // 清除登录状态
        localStorage.removeItem("user_info");
        this.$store.commit("handleUserName", "");

        this.$router.push({ name: "Login" });
      } else {
        this.$Message.error("退出失败");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
.layout {
  // border: 1px solid #d7dde4;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  min-height: 100vh;
}
.container {
  display: flex;
  flex-direction: row;
}

.header-inner {
  width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.ivu-layout-header {
  // background: #fff;
  padding: 0;
}
.ivu-menu-horizontal {
  // height: auto;
  line-height: 64px;
}
.ivu-menu-horizontal.ivu-menu-light:after {
  display: none;
}
.layout-logo {
  cursor: pointer;
  height: 64px;

  img {
    height: 100%;
  }
  &:hover {
    opacity: 0.8;
  }
}
.layout-nav {
  width: 500px;
  overflow: hidden;
}
.layout-footer-center {
  text-align: center;
  background: #212220;
}

.user-name {
  width: 8em;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

// 开关，控制导航
.trigger {
  display: none;
  &:hover {
    cursor: pointer;
  }
}

// 移动端导航
.mobile-nav {
  position: fixed;
  top: 63px;
  left: 0;
  right: 0;
  background: #fff;
  max-height: 0;
  transition: 0.5s;
  overflow: hidden;
  &-item {
    text-align: center;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    &:first-child {
      border-top: 1px solid #eee;
    }
  }
}
.mobile-nav-in {
  animation: fadeIn 1s;
}
.mobile-nav-out {
  animation: fadeOut 1s;
}

// 用户头像
.user {
  cursor: pointer;
}

// 鼠标悬浮用户名，展示的内容
.y-poptip {
  div {
    padding: 5px 0;
    &:hover {
      color: $color-primary;
    }
  }
}

@media screen and (max-width: 1280px) {
  .header-inner {
    width: 100%;
    padding: 0 10px;
  }
}
@media screen and (max-width: 992px) {
  .menu {
    display: none;
  }
  .user {
    display: none;
  }
  .trigger {
    display: block;
  }
}
</style>
