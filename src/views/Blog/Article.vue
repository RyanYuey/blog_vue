<template>
  <div class="article"
       id="article">
    <main>
      <div class="spin-wrap"
           v-if="spinShow">
        <Spin size="large"
              fix
              v-if="spinShow"></Spin>
      </div>
      <ul class="blog-list"
          id="blog_list">
        <li class="blog-item asyncWow fadeInUp"
            :data-wow-duration="0.5 + index / 5 + 's'"
            v-for="(item, index) in dataList"
            :key="item.article_id">
          <img class="item-img"
               :src="host + item.thumbnail"
               alt="文章缩略图" />
          <div class="item-main">
            <h2 class="title"
                @click="toDetail(item.article_id)">
              {{ item.article_title }}
            </h2>
            <div class="content">
              <p class="c-p ">{{ item.article_abstract || "暂无摘要内容" }}</p>
              <p class="read-more">
                <span @click="toDetail(item.article_id)">阅读更多</span>
              </p>
            </div>
            <div class="info">
              <span>
                <Icon type="md-time" />{{ $formatDate(item.create_time) }}</span>
              <span>
                <Icon type="md-chatboxes" />{{
                  item.article_comment_count
                }}</span>
              <span>
                <Icon type="md-eye" />{{ item.article_view_count }}</span>
              <span>
                <Icon type="md-thumbs-up" />{{ item.article_like_count }}</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="page-wrap wow fadeInUp">
        <Page :total="data_total"
              :page-size="params.page_size"
              @on-change="pageChange"
              show-elevator />
      </div>
    </main>
    <aside>
      <!-- 分类 搜索 -->
      <section id="filter"
               class="aside-section filter wow fadeIn">
        <div class="search-wrap">
          <Input search
                 v-model="searchText"
                 @on-search="onSearchConfirm()"
                 placeholder="请输入关键字搜索" />
        </div>
        <div class="sub-nav">
          <ul class="nav-list">
            <li :class="['list-item', { 'item-active': navCurIndex === index }]"
                v-for="(item, index) in sortList"
                :key="item.sort_id"
                @click="subNavChange(index, item.sort_id)">
              {{ item.sort_name }}
            </li>
          </ul>
        </div>
      </section>

      <!-- 热门文章 -->
      <section class="aside-section hot wow fadeIn"
               data-wow-duration="1s">
        <div class="hot-title">热门文章</div>
        <ul class="hot-list">
          <li class="list-item ellipsis"
              v-for="(item, index) in hotBlogList"
              :key="item.article_id">
            <span :class="[
                'blog-index',
                { 'bg-red': index === 0 },
                { 'bg-blue': index === 1 },
                { 'bg-green': index === 2 }
              ]">{{ index + 1 }}</span>
            <span class="title"
                  @click="toDetail(item.article_id)">{{
              item.article_title
            }}</span>
          </li>
        </ul>
      </section>

      <!-- <section v-show="isFixed"
               class="filter2"
               :class="[
          { 'aside-fixed': isFixed },
          { 'bounce-enter-active': isFixed }
        ]">
        <div class="search-wrap">
          <Input search
                 v-model="searchText"
                 @on-search="onSearchConfirm()"
                 placeholder="请输入关键字搜索" />
        </div>
        <div class="sub-nav">
          <ul class="nav-list">
            <li :class="['list-item', { 'item-active': navCurIndex === index }]"
                v-for="(item, index) in sortList"
                :key="item.sort_id"
                @click="subNavChange(index, item.sort_id)">
              {{ item.sort_name }}
            </li>
          </ul>
        </div>
      </section> -->
    </aside>
  </div>
</template>

<script>
const _Config = require("@/config/index.js");
import { WOW } from "wowjs";
import Services from "@/api/common.js";
let timer;
export default {
  data () {
    return {
      host: _Config.baseURL, //域名
      screenWidth: document.body.clientWidth, //窗口宽度
      spinShow: true, //是否显示加载中
      default_img: "../../assets/image/night.jpg",
      searchText: "", //搜索
      dataList: [], //文章列表
      data_total: 0, //数据库文章总量
      sortList: [], //标签列表
      navCurIndex: 0,
      hotBlogList: [],
      isFixed: false,
      // 请求参数
      params: {
        page: 1,
        page_size: 5,
        keyword: ""
        // sort_id:0,
      }
    };
  },
  mounted () {
    this.init();
    this.getSortList();
    this.getHotArticles();
    this.getDataList(); //这个请求一定要放在最后，因为涉及到一个查询数量的问题
    // 清除定时器
    this.$once("hook:beforeDestroy", () => {
      clearTimeout(timer);
    });
    window.addEventListener("scroll", this.appScroll);
    // window.onresize = () => {
    //   this.isFixed = false;
    //   this.screenWidth = document.body.clientWidth;
    //   this.isFixed = this.screenWidth < 992 ? false : true;
    // };
    new WOW({
      live: false
    }).init();
  },
  watch: {
    dataList () {
      this.$nextTick(() => {
        // 在dom渲染完后,再执行动画
        new WOW({
          boxClass: "asyncWow",
          live: false
        }).init();
      });
    }
  },
  methods: {
    // 初始化
    init () {
      this.params.page = 1;
      this.searchText = "";
      this.params.keyword = "";
      this.dataList = [];
    },
    // 请求文章列表
    async getDataList () {
      this.spinShow = true;
      const res = await Services.getBlogList(this.params);
      if (res.errno === 0) {
        this.dataList = res.data.list;
        this.data_total = res.data.total;
      } else {
        this.$Message.error("请求失败");
      }
      this.spinShow = false;
    },
    // 获取热门文章列表
    async getHotArticles () {
      const res = await Services.getHotArticles();
      if (res.errno === 0) {
        this.hotBlogList = res.data;
      } else {
        this.$Message.error("获取热门文章错误");
      }
    },
    // 请求分类列表
    async getSortList () {
      const res = await Services.getSortList();
      if (res.errno === 0) {
        this.sortList = res.data;
        this.sortList.unshift({
          sort_id: -1,
          sort_name: "全部"
        });
        this.sortList.push({
          sort_id: 0,
          sort_name: "其他"
        });
      }
    },
    onSearchConfirm () {
      this.params.keyword = this.searchText;
      this.getDataList();
    },
    pageChange (page) {
      this.params.page = page;
      this.getDataList();
      window.scroll(0, 0); //回到顶部
    },
    // 选择文章类型
    subNavChange (index, id) {
      this.navCurIndex = index;
      this.init();
      window.scroll(0, 0); //回到顶部
      if (id == -1) {
        delete this.params.sort_id;
        this.getDataList();
      } else {
        this.params.sort_id = id;
        this.getDataList();
      }
    },
    appScroll () {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 500) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },
    // 博客详情
    toDetail (id) {
      this.$router.push({
        name: "ArticleDetail",
        params: { id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/common.scss";
@import "@/assets/css/variable.scss";
.article {
  position: relative;
  width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  main {
    flex: 1;
    position: relative;
    overflow: hidden;
  }
  aside {
    width: 300px;
    margin-left: 20px;
  }
  .spin-wrap {
    height: 400px;
    position: relative;
    background: #fff;
  }
}

// 博客列表
.blog-list {
  width: 100%;
  padding: 5px 10px 5px 5px;
  box-sizing: border-box;
  .blog-item {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px;
    background: #fff;
    margin-bottom: 20px;
    overflow: hidden;
    box-sizing: border-box;
    transition: 0.5s;
    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      // transform: translateX(4px);
    }
    &:last-child {
      margin: none;
    }
    .item-img {
      width: 300px;
      height: 180px;
      margin-right: 20px;
      object-fit: cover;
    }
    .item-main {
      flex: 1;
      overflow: hidden;
    }
    .title {
      width: 100%;
      height: 30px;
      font-size: 18px;
      line-height: 30px;
      margin-bottom: 10px;
      transition: 0.3s;
      overflow: hidden;
      cursor: pointer;
      &:hover {
        color: $color-primary;
      }
    }
    .content {
      width: 100%;
      height: 110px;
      font-size: 14px;
      color: $color-sub;
      line-height: 1.5;
      overflow: hidden;
      .c-p {
        height: 6em;
        text-indent: 2em;
        overflow: hidden;
      }
      .read-more {
        font-size: 14px;
        color: $color-primary;

        text-align: right;
        padding-right: 10px;
        span {
          cursor: pointer;
          &:hover {
            color: #337ab7;
          }
        }
      }
    }
    .info {
      margin-top: 20px;
      line-height: 20px;
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      span {
        margin-left: 20px;
        color: $color-sub;
      }
      .ivu-icon {
        margin-right: 4px;
      }
    }
  }
}

// 分页
.page-wrap {
  margin: 30px 20px;
  display: flex;
  justify-content: center;
}

// aside
.aside-section {
  margin-bottom: 30px;
  &:last-child {
    margin: 0;
  }
}
.filter,
.filter2 {
  background: #fff;
  box-sizing: border-box;
  .search-wrap {
    padding: 20px 10px;
    box-sizing: border-box;
    // background: #19be6b;
  }
  .list-item {
    padding: 10px 10px 10px 30px;
    transition: background 0.3s;
    cursor: pointer;
    &:hover {
      background: rgba(45, 140, 240, 0.2);
    }
  }
  .item-active {
    background: rgba(45, 140, 240, 0.2);
  }
}

.hot {
  background: #fff;
  padding-bottom: 20px;
  .hot-title {
    padding: 20px 10px;
    border-bottom: 1px solid #e8eaec;
    font-size: 16px;
    font-weight: bold;
  }
  .hot-list {
  }
  .list-item {
    padding: 10px 20px;
    cursor: pointer;
    .title {
      &:hover {
        color: $color-primary;
      }
    }
  }
  .blog-index {
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    background: #ccc;
    margin-right: 8px;
  }
  .bg-red {
    background: #e24d46;
    color: #fff;
  }
  .bg-blue {
    background: #2ea7e0;
    color: #fff;
  }
  .bg-green {
    background: #6bc30d;
    color: #fff;
  }
}

.aside-fixed {
  position: fixed;
  top: 88px;
  width: 300px;
}
// 执行动画
.bounce-enter-active {
  animation: bounceInDown 0.8s;
}

@media screen and (max-width: 992px) {
  .article {
    flex-direction: column;
    aside,
    main {
      width: 100%;
      margin: 0;
    }
    aside {
      padding: 20px;
    }
    .blog-item {
      width: 100%;
      flex-direction: column;
      .item-img {
        width: 100%;
        height: 250px;
        margin-bottom: 10px;
      }
    }
  }
  // .aside-fixed {
  //   position: relative;
  //   width: 100%;
  // }
  .filter2 {
    display: none;
  }
}
</style>
