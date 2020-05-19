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
                active-name="2"
                class="menu">
            <div class="layout-nav">
              <MenuItem name="1"
                        to="/home">
              首页
              </MenuItem>
              <MenuItem name="2"
                        to="/blog/article">
              博客
              </MenuItem>
              <MenuItem name="3"
                        to="/blog/diary">
              日记
              </MenuItem>
              <MenuItem name="4" to="/blog/about">
              关于
              </MenuItem>
            </div>
          </Menu>
          <div class="user">
            <div v-if="$store.getters.user_name">
              <Poptip trigger="hover">
                <div>
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
          <Menu theme="light"
                mode="vertical"
                width="100%"
                accordion>
            <MenuItem name="1"
                      to="/home">
            首页
            </MenuItem>
            <MenuItem name="2"
                      to="/blog/article">
            博客
            </MenuItem>
            <MenuItem name="3"
                      to="/blog/diary">
            日记
            </MenuItem>
            <MenuItem name="4">
            关于
            </MenuItem>
          </Menu>
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
import Config from "@/config/index.js";
export default {
  data () {
    return {
      showMobileNav: false,
      userInfo: {},
      host: Config.baseURL
    };
  },
  mounted () {
    this.userInfo = JSON.parse(localStorage.getItem("user_info"));
    console.log(this.userInfo);
  },
  methods: {
    jumpTo (path) {
      this.$router.push({
        path
      });
    },
    // 导航选择
    onMenuSelect (name) {
      console.log(name);
    },
    // 退出
    logout () {
      this.$router.push({ name: "Login" });
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
  height: auto;
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
  top: 64px;
  left: 0;
  right: 0;
  background: pink;
  max-height: 0;
  transition: 0.5s;
  overflow: hidden;
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
