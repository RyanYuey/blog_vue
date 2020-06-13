<template>
  <div class="articleDetail"
       v-title
       data-title="博文详情">
    <div class="article-header">
      <div class="info">
        <div class="avatar">
          <img :src="host + article.user_avatar"
               alt="作者头像" />
        </div>
        <div class="info-main">
          <h4 class="ellipsis nickname">
            {{ article.user_nickname }}
          </h4>
          <p>
            <span class="date">更新于 {{ article.update_time }}</span><span>阅读 {{ article.article_view_count }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="article-content">
      <h1 class="title">{{ article.article_title }}</h1>
      <div class="article">
        <mavon-editor v-model="article.article_content"
                      ref="md"
                      :toolbarsFlag="false"
                      :editable="false"
                      :subfield="false"
                      :boxShadow="false"
                      defaultOpen="preview"
                      codeStyle="monokai-sublime"
                      style="z-index:0;" />
      </div>
      <!-- 标签 -->
      <div class="label"
           style="margin-top:20px;">
        <Icon type="ios-pricetags-outline"
              size="20"
              color="#999"
              style="margin-right:10px;" />
        <Tag v-for="item in tags"
             :key="item.label_id">{{
          item.label_name
        }}</Tag>
      </div>
      <!-- 延申阅读 -->
      <div class="extend-read">
        <div class="title">延申阅读</div>
        <div class="content">
          <p class="c-item"
             @click="jumpTo(extend_data.before.id)">
            上一篇：<span>{{ extend_data.before.title }}</span>
          </p>
          <p class="c-item"
             @click="jumpTo(extend_data.after.id)">
            下一篇：<span>{{ extend_data.after.title }}</span>
          </p>
        </div>
      </div>

      <!-- 点赞转发 -->
      <div class="praise">
        <div :class="['p-item', { 'p-item-active': likeStatus }]"
             @click="handleLike">
          <i class="iconfont icon-praise"></i>
        </div>
        <div class="p-item">
          <i class="iconfont icon-weixin"></i>
        </div>
      </div>

      <!-- 评论 -->
      <div class="comment">
        <Divider type="horizontal"
                 orientation="center">发表评论</Divider>
        <comment-input :show="true"
                       @confirm="newComment"></comment-input>
      </div>
    </div>
    <!-- 评论内容 -->
    <div class="comment-wrap">
      <div class="no-comment"
           v-if="commentsData.length === 0">
        还没有评论，鼓励一下？
      </div>
      <comment :asyncData="commentsData"
               :userId="userInfo.user_id"
               @deleteComment="deleteComment"
               @confirmComment="addComment"></comment>
    </div>
  </div>
</template>

<script>
import Services from "@/api/common.js";
import comment from "@/components/comment.vue"; //引入评论组件
import commentInput from "@/components/comment-input.vue"; //评论输入框组件
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "articleDetail",
  components: {
    mavonEditor,
    comment,
    commentInput
  },
  data () {
    return {
      spinShow: true,
      host: process.env.VUE_APP_URL,
      article: {}, //文章的所有信息
      extend_data: {
        before: { id: -1, title: "哇，我找不到了" },
        after: { id: -1, title: "哇，我找不到了" }
      }, //延申阅读所需数据
      checkedLabel: [], //标签id列表
      comment: "", //留言
      likeStatus: false, //点赞状态
      actionable: true, //是否可操作点赞按钮，防止用户一直点击
      commentsData: [], //评论数据
      userInfo: {}, //用户信息
      tagList: []
    };
  },
  mounted () {
    const _data = localStorage.getItem("user_info");
    if (_data) {
      this.userInfo = JSON.parse(_data);
    } else {
      this.userInfo = { user_id: 0 };
    }
    this.$Spin.show();
    this.getDetail();
    this.getExtendData();
    this.getCommentList();
    this.getTags();
  },
  computed: {
    tags () {
      let label_id = this.article.label_id;
      if (label_id) {
        return label_id.split(",").map(id => {
          return this.tagList.find(item => {
            return item.label_id == id;
          });
        });
      }
      return [];
    }
  },
  watch: {
    // 监听路由参数变化， 由于vue机制，同一组件想要复用(比如通过另一个id获取详情)，不会触发生命周期函数
    "$route.params.id": "routerChange"
  },
  methods: {
    sendComment () {
      console.log(this.comment);
    },
    async getTags () {
      const res = await Services.getLabelList();
      if (res.errno === 0) {
        this.tagList = res.data;
      }
    },
    // 获取博客详情
    async getDetail () {
      const res = await Services.getDetail(this.$route.params.id);
      this.$Spin.hide();
      if (res.errno === 0) {
        this.article = res.data;
        // 格式化时间
        this.article.update_time = this.$formatDate(this.article.update_time);
        if (res.data.label_id) {
          this.checkedLabel = res.data.label_id
            .split(",")
            .map(id => parseInt(id));
        }
      } else {
        this.$Notice.error({
          title: "提示",
          desc: "请求失败"
        });
      }
    },
    async getCommentList () {
      const res = await Services.getCommentList({
        topic_id: this.$route.params.id
      });
      if (res.errno === 0) {
        this.commentsData = res.data;
        this.commentsData.forEach(item => {
          item.create_time = this.$formatDate(
            item.create_time,
            "yyyy-MM-dd hh:mm"
          );
          item.from_avatar = this.host + item.from_avatar;
          if (item.to_avatar) {
            item.to_avatar = this.host + item.to_avatar;
          }
        });
      }
    },
    // 获取延申阅读数据
    async getExtendData () {
      const res = await Services.getFurtherReading(this.$route.params.id);
      if (res.errno === 0) {
        this.extend_data = res.data;
      }
    },
    // 跳转到另外详情
    jumpTo (id) {
      if (id !== -1) {
        this.$router.push({
          name: "ArticleDetail",
          params: { id }
        });
      }
    },
    // 路由改变
    routerChange () {
      this.$Spin.show();
      this.getDetail();
      this.getExtendData();
      this.getCommentList(); //获取评论列表
      this.likeStatus = false;
    },
    // 点赞操作
    handleLike () {
      if (this.actionable) {
        this.likeStatus = !this.likeStatus;
        if (this.likeStatus) {
          Services.setLike({
            article_id: this.$route.params.id,
            like_status: 1
          }).then(res => {
            if (res.errno === 0) {
              this.$Message.info({
                background: true,
                content: "感谢少侠赏识，感激不尽！"
              });
            }
            // 防止用户一直点击
            this.actionable = false;
            let timer = setTimeout(() => {
              this.actionable = true;
            }, 1000);
          });
        } else {
          Services.setLike({
            article_id: this.$route.params.id,
            like_status: 2
          }).then(res => {
            if (res.errno === 0) {
              this.$Message.info({
                background: true,
                content: "放心，我会加倍努力的！"
              });
            }
            // 防止用户一直点击
            this.actionable = false;
            let timer = setTimeout(() => {
              this.actionable = true;
            }, 1000);
          });
        }
      } else {
        this.$Message.error({
          background: true,
          content: "少侠，好手速，慢点慢点"
        });
      }
    },
    // 添加评论
    addComment (data) {
      Services.addComment(data).then(res => {
        if (res.errno === 0) {
          this.$Message.success({
            background: true,
            content: "评论成功"
          });
          this.getCommentList();
        } else {
          this.$Message.error({
            background: true,
            content: "只有先登录才可以评论哦"
          });
        }
      });
    },
    // 新建评论，不是回复
    newComment (text) {
      const postData = {
        topic_id: this.$route.params.id,
        content: text
      };
      Services.addComment(postData).then(res => {
        if (res.errno === 0) {
          this.$Message.success({
            background: true,
            content: "评论成功"
          });
          this.getCommentList();
        } else {
          this.$Message.error({
            background: true,
            content: "只有先登录才可以评论哦"
          });
        }
      });
    },
    // 删除评论
    deleteComment (data) {
      const postData = {
        id: data.id,
        article_id: data.topic_id
      };
      this.$Modal.confirm({
        title: "删除提示",
        content: `<p>确认要删除你的评论 ${data.content}</p>`,
        onOk: () => {
          Services.delComment(postData).then(res => {
            if (res.errno === 0) {
              this.$Message.success({
                background: true,
                content: "删除成功"
              });
              this.getCommentList();
            } else {
              this.$Message.error({
                background: true,
                content: res.message || "删除失败"
              });
            }
          });
        },
        onCancel: () => {
          console.log("取消删除");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/common.scss";
@import "@/assets/css/variable.scss";
.articleDetail {
  width: 960px;
  padding: 20px 30px;
  background: #fff;
  margin: 0 auto 40px;
}

.article-header {
  height: 80px;
  border-bottom: 1px solid #eee;
  .info {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .info-main {
    height: 42px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 14px;
      color: $color-sub;
    }
    .nickname {
      width: 10em;
      cursor: pointer;
    }
    .date {
      margin-right: 10px;
    }
  }
}
.article-content {
  padding: 20px 0;
  .title {
    margin-bottom: 20px;
  }
  .article {
    min-height: 400px;
    background: #fff;
  }
}

// 延申阅读
.extend-read {
  margin-top: 40px;
  overflow: hidden;
  .title {
    height: 50px;
    line-height: 50px;
    background: #f8f8f8;
    display: flex;
    font-size: 16px;
    color: $color-sub;
    &::before {
      content: "";
      display: inline-block;
      width: 5px;
      height: 100%;
      background: #dddddd;
      margin-right: 10px;
    }
  }
  .content {
    .c-item {
      cursor: pointer;
      color: #666;
      margin-bottom: 6px;
      span {
        &:hover {
          color: $color-primary;
        }
      }
    }
  }
}

// 点赞等操作
.praise {
  height: 100px;
  margin: 20px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: #f8f8f8;
  .p-item {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #ddd;
    margin-right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 1s;
    &:last-child {
      margin: 0;
    }
    .iconfont {
      font-size: 36px;
      color: #8a8a8a;
      transition: all 1s;
    }
  }
  .p-item-active {
    border: 1px solid #19be6b;
    background: #fff;
    .iconfont {
      color: red;
    }
  }
}

// 评论
.comment {
  padding-top: 10px;
  .my-btn {
    margin-top: 10px;
  }
}
.comment-wrap {
  padding-top: 30px;
}
.no-comment {
  text-align: center;
  color: #808695;
}
// 点赞
</style>
