<template>
  <div class="container">
    <h3 class="title">新建博客</h3>
    <div class="content">
      <h4 class="label">日记内容</h4>
      <Input v-model="content"
             type="textarea"
             :autosize="{ minRows: 5, maxRows: 5 }"
             :rows="5"
             placeholder="输入日记内容" />
      <h4 class="label">图片</h4>
      <Upload type="drag"
              :action="uploadUrl"
              ref="upload"
              :max-size="2048"
              :on-exceeded-size="handleExceededError"
              :on-format-error="handleFormatError"
              :on-success="handleSuccess"
              :before-upload="handleBeforeUpload">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload"
                size="52"
                style="color: #3399ff"></Icon>
          <p>点击或者拖拽图片到这里</p>
        </div>
      </Upload>
      <!-- 保存按钮 -->
      <Button class="btn"
              type="primary"
              @click="submit"
              :loading="showLoading">保存</Button>
      <Button class="btn"
              @click="cancel">取消</Button>
    </div>
  </div>
</template>

<script>
import Services from "@/api/admin.js";
export default {
  data () {
    return {
      content: "",
      diary_img: "",
      showLoading: false,
      uploadUrl: "http://localhost:8090/" + "api/upload" //上传路径
    };
  },
  methods: {
    // 通过组件上传文件
    handleBeforeUpload () {
      this.$refs.upload.clearFiles();
    },
    // 处理文件大小太大
    handleExceededError () {
      this.$Message.error("文件不能大于2M!");
    },
    // 处理成功
    handleSuccess (res) {
      this.diary_img = res.file;
    },
    // 检验失败
    handleFormatError (file, fileList) {
      console.log("失败文件", file);
      console.log("失败文件列表", fileList);
    },
    // 提交
    submit () {
      this.showLoading = true;

      if (this.content == "") {
        this.$Message.error("日记内容不能为空！");
        this.showLoading = false;
        return;
      }

      const postData = {
        content: this.content,
        diary_img: this.diary_img
      };

      Services.newDiary(postData).then(res => {
        console.log(res);
        this.showLoading = false;
        if (res.errno === 0) {
          this.$Notice.success({
            title: "操作提示",
            desc: "新建日记成功",
            duration: 2
          });
          setTimeout(() => {
            this.$router.push({
              path: "/admin/diary"
            });
          }, 500);
          return;
        }
        this.$Message.error({
          title: "操作提示",
          content: res.message || "新建失败"
        });
      });
    },
    cancel () { }
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  // font-weight: normal;
  background: #e5eef7;
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
  // border-top: 1px solid #ccc;
}
.content {
  padding: 5px 10px;
  .label {
    padding: 30px 0 20px;
  }
  .checkbox {
    margin-right: 30px;
  }
  .btn {
    margin: 50px 30px 20px 0;
    padding: 0 30px;
  }
}
</style>
