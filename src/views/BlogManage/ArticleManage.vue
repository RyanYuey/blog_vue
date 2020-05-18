<template>
  <div class="container">
    <div class="options">
      <Button type="primary"
              to="/admin/newArticle">新建博客</Button>
    </div>
    <div class="list-wrap">
      <Table :loading="loading"
             :columns="columns"
             :data="dataList"
             border
             style="margin:20px 0;">
        <template slot-scope="{ row }"
                  slot="title">
          <span @click="detail(row.id)"
                class="title">{{ row.title }}</span>
        </template>
        <template slot-scope="{ row }"
                  slot="action">
          <Button type="primary"
                  size="small"
                  style="margin-right: 5px"
                  @click="edit(row)">编辑</Button>
          <!-- <Button type="primary"
                  size="small"
                  style="margin-right: 5px"
                  @click="show(index)">详情</Button> -->
          <Button type="error"
                  size="small"
                  @click="remove(row)">删除</Button>
        </template>
      </Table>
      <Page :total="data_total"
            :page-size="params.page_size"
            @on-change="pageChange"
            show-elevator />
    </div>
  </div>
</template>

<script>
import adminServices from "@/api/admin.js";
import subServices from "@/api/common.js";
export default {
  data () {
    return {
      loading: false,
      columns: [
        {
          title: "标题",
          slot: "title",
          width: "600px"
        },
        {
          title: "点赞数",
          key: "like"
        },
        {
          title: "评论数",
          key: "comment"
        },
        {
          title: "阅读数",
          key: "view"
        },
        {
          title: "操作",
          slot: "action",
          width: 200,
          align: "center"
        }
      ],
      // 请求参数
      params: {
        page: 1,
        page_size: 10,
        keyword: ""
      },
      searchText: "", //搜索
      dataList: [], //文章列表
      data_total: 0 //数据库文章总量
    };
  },
  mounted () {
    this.getData();
  },
  methods: {
    async getData () {
      this.loading = true;
      const res = await subServices.getBlogList(this.params);

      if (res.errno === 0) {
        this.dataList = res.data.list.map(item => {
          return {
            title: `${item.article_title} (${this.$formatDate(
              item.update_time,
              "yyyy-MM-dd hh:mm"
            )})`,
            like: item.article_like_count,
            comment: item.article_comment_count,
            view: item.article_view_count,
            id: item.article_id
          };
        });
        this.data_total = res.data.total;
      } else {
        this.$Message.error("请求失败");
      }
      this.loading = false;
    },
    // 初始化
    init () {
      this.params.page = 1;
      this.searchText = "";
      this.params.keyword = "";
      this.dataList = [];
    },
    edit (data) {
      const id = data.id;
      console.log(id);
      this.$router.push({
        name: "UpdateArticle", //如果需要路由传参，要使用name 而不是path
        params: { id }
      });
    },
    async remove (data) {
      const article_id = data.id;
      this.$Modal.confirm({
        title: "删除提示",
        content: `确定要删除 ${data.title}?`,
        onOk: async () => {
          const res = await adminServices.deleteArticle({ article_id });
          if (res.errno === 0) {
            this.$Notice.success({
              title: "删除提示",
              desc: "删除成功"
            });
            this.getData();
          } else {
            this.$Notice.error({
              title: "删除提示",
              desc: res.message || "删除失败"
            });
          }
        },
        onCancel: () => {
          this.$Message.info("您已取消");
        }
      });
    },
    detail (id) {
      this.$router.push({
        name: "ArticleDetail",
        params: {
          id
        }
      });
    },
    pageChange (page) {
      this.params.page = page;
      this.getData();
      window.scroll(0, 0); //回到顶部
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
}

.title {
  cursor: pointer;
  &:hover {
    color: #5cadff;
  }
}
</style>
