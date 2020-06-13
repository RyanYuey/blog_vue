<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1"
             hide-trigger
             breakpoint="md"
             collapsible
             :collapsed-width="78"
             v-model="isCollapsed"
             style="min-height:100vh;">
        <Menu :active-name="$route.name"
              theme="dark"
              width="auto"
              :class="menuitemClasses">
          <MenuItem name="AdminHome"
                    to="/admin/home">
          <Icon type="ios-home" />
          <span>管理首页</span>
          </MenuItem>
          <MenuItem name="ArticleManage"
                    to="/admin/article">
          <Icon type="ios-book" />
          <span>文章管理</span>
          </MenuItem>
          <MenuItem name="SortManage"
                    to="/admin/sort">
          <Icon type="ios-cube" />
          <span>分类管理</span>
          </MenuItem>
          <MenuItem name="LabelManage"
                    to="/admin/label">
          <Icon type="ios-pricetag" />
          <span>标签管理</span>
          </MenuItem>
          <MenuItem name="DiaryManage"
                    to="/admin/diary">
          <Icon type="ios-text" />
          <span>日记管理</span>
          </MenuItem>
          <MenuItem name="UserManage"
                    to="/admin/user">
          <Icon type="ios-people" />
          <span>会员管理</span>
          </MenuItem>
          <MenuItem name="Setting"
                    to="/admin/setting">
          <Icon type="ios-settings"></Icon>
          <span>设置</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{ padding: 0 }"
                class="layout-header-bar">
          <div class="header-left">
            <Icon @click.native="collapsedSider"
                  :class="rotateIcon"
                  :style="{ margin: '0 20px' }"
                  type="md-menu"
                  size="24"></Icon>
            <h2 style="font-size:18px;">博客管理中心</h2>
          </div>
          <div class="header-right">
            <!-- <Tooltip content="新建博客"
                     placement="top-start">
              <Icon type="md-add" />
            </Tooltip> -->
            <ButtonGroup>
              <Button icon="md-home"
                      to="/blog"
                      title="前往博客前台"></Button>
              <Button icon="md-add"
                      to="/admin/newArticle"
                      title="新建博客"></Button>
            </ButtonGroup>
          </div>
        </Header>
        <Content :style="{ margin: '20px', background: '#fff' }">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapsed: false
    };
  },
  computed: {
    rotateIcon () {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses () {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    collapsedSider () {
      this.$refs.side1.toggleCollapse();
    },
    jumpTo (path) {
      this.$router.push({
        path
      });
    },
    // 导航选择
    onMenuSelect (name) {
      console.log(name);
    }
  }
};
</script>

<style lang="scss" scoped>
.layout {
  // border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  min-height: 100vh;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}

.header-left {
  display: flex;
  align-items: center;
}
.header-right {
  padding-right: 20px;
}
</style>
