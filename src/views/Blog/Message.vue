<template>
  <div class="message"
       v-title
       data-title="留言">
    <!-- 评论 -->
    <div class="comment">
      <Divider type="horizontal"
               orientation="center">你们的意见就是对我最大的鼓励</Divider>
      <comment-input :show="true"
                     @confirm="newComment"></comment-input>
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
export default {
  components: {
    comment,
    commentInput
  },
  data () {
    return {
      host: process.env.VUE_APP_URL,
      commentsData: [], //评论数据
      userInfo: {
        user_id: 0
      } //用户信息
    };
  },
  created () {
    const _data = localStorage.getItem("user_info");
    if (_data) {
      this.userInfo = JSON.parse(_data);
    } else {
      this.userInfo = { user_id: 0 };
    }

    this.getCommentList();
  },
  methods: {
    async getCommentList () {
      const res = await Services.getMessage();
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
    // 添加评论
    addComment (data) {
      if (data.topic_id) {
        delete data.topic_id;
      }
      Services.addMessage(data).then(res => {
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
    // 新建留言，不是回复
    newComment (text) {
      if (text == "") {
        this.$Message.info("评论内容不能为空");
        return;
      }
      const postData = {
        topic_type: 2,
        content: text
      };
      Services.addMessage(postData).then(res => {
        if (res.errno === 0) {
          this.$Message.success({
            background: true,
            content: "留言成功"
          });
          this.getCommentList();
        } else {
          this.$Message.error({
            background: true,
            content: "只有先登录才可以留言哦"
          });
        }
      });
    },
    // 删除评论
    deleteComment (data) {
      const postData = {
        id: data.id
      };
      this.$Modal.confirm({
        title: "删除提示",
        content: `<p>确认要删除你的评论 ${data.content}</p>`,
        onOk: () => {
          Services.delMessage(postData).then(res => {
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
.message {
  width: 1280px;
  padding: 20px 40px;
  margin: 0 auto;
  background: #fff;
  min-height: 500px;
  color: #333;
}

section {
  margin-bottom: 10px;
  border-bottom: 1px dashed #ccc;
  padding-bottom: 20px;
  .title {
    font-size: 18px;
    display: flex;
    align-items: center;
    &::before {
      content: "";
      display: inline-block;
      margin-right: 10px;
      width: 5px;
      height: 1em;
      background: #03a9f4;
    }
  }
  .content {
    padding: 10px 0;
    display: flex;
  }
  .main {
    flex: 1;
    padding-right: 20px;
    p {
      text-indent: 2em;
      margin-bottom: 5px;
    }
  }
  .img-wrap {
    width: 200px;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
