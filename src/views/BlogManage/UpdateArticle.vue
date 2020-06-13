<template>
  <div class="container">
    <h3 class="title">新建博客</h3>
    <div class="content">
      <h4 class="label">标题</h4>
      <Input v-model="title"
             clearable
             placeholder="输入博客标题" />
      <h4 class="label">内容</h4>
      <mavon-editor v-model="content"
                    ref="md"
                    @imgAdd="$imgAdd"
                    @imgDel="$imgDel"
                    @change="change"
                    style="min-height: 600px; z-index:999;" />
      <h4 class="label"
          v-if="sortList.length">文章分类</h4>
      <div class="sort_wrap">
        <CheckboxGroup v-model="checkedGroup">
          <Checkbox class="checkbox"
                    border
                    v-for="item in sortList"
                    :key="item.sort_id"
                    :label="item.sort_id">{{ item.sort_name }}</Checkbox>
        </CheckboxGroup>
      </div>
      <h4 class="label">文章摘要</h4>
      <Input v-model="abstract"
             type="textarea"
             :autosize="{ minRows: 3, maxRows: 5 }"
             :rows="4"
             placeholder="请输入文章摘要，不填默认截取文章内容" />
      <h4 class="label">文章缩略图</h4>
      <Upload :action="uploadUrl"
              ref="upload"
              :max-size="2048"
              :default-file-list="default_file_list"
              :on-exceeded-size="handleExceededError"
              :on-format-error="handleFormatError"
              :on-success="handleSuccess"
              :before-upload="handleBeforeUpload">
        <Button icon="ios-cloud-upload-outline">上传图片</Button>
      </Upload>
      <h4 class="label">标签</h4>
      <div class="labels-wrap">
        <Select v-model="checkedLabel"
                multiple
                filterable
                allow-create
                transfer
                style="width:400px;"
                @on-create="handleCreate">
          <Option v-for="item in labelList"
                  :value="item.value"
                  :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>

      <!-- 保存按钮 -->
      <Button class="btn"
              type="primary"
              @click="submitAll"
              :loading="showLoading">保存</Button>
      <Button class="btn"
              @click="cancel">取消</Button>
    </div>
  </div>
</template>

<script>
import Services from "@/api/common.js";
import adminServices from "@/api/admin.js";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "UpdateArticle",
  components: {
    mavonEditor
  },
  data () {
    return {
      title: "",
      content: "",
      html: "",
      abstract: "", //文章摘要
      showLoading: false, //提交时显示loading
      sortList: [], //分类列表
      checkedGroup: [], //选中的分类
      labelList: [], //标签列表
      checkedLabel: [], //选中的标签
      img_file: {}, //缓存文章图片
      default_file_list: [], //离开页面是否阻拦
      uploadUrl: "/api/upload", //上传路径
      thumbnail: "", //图片预览图
      host: process.env.VUE_APP_URL
    };
  },
  mounted () {
    this.getDetail(); //获取博客详情
    this.getSortList(); //获取分类
    this.getLabelList(); //获取标签
  },
  // 导航守卫，防止用户误操作
  beforeRouteLeave: (to, from, next) => {
    if (to.query.pass) {
      // 如果跳转的页面 参数query.pass == true 可以直接跳转
      next();
    } else {
      if (confirm("确定离开此页面吗？") == true) {
        next();
      } else {
        next(false);
      }
    }
  },
  methods: {
    // 获取博客详情
    async getDetail () {
      const res = await Services.getDetail(this.$route.params.id);
      if (res.errno === 0) {
        console.log(res.data);
        this.title = res.data.article_title;
        this.content = res.data.article_content;
        this.abstract = res.data.article_abstract;
        // 设置默认选中分类
        if (res.data.sort_id) {
          this.checkedGroup = res.data.sort_id
            .split(",")
            .map(id => parseInt(id)); //这里纠结了好久，id类型，必须也是数字
        }
        // 设置默认选中标签
        if (res.data.label_id) {
          this.checkedLabel = res.data.label_id
            .split(",")
            .map(id => parseInt(id));
        }
        // 设置默认上传图
        if (res.data.thumbnail) {
          this.default_file_list = [
            {
              name: "可以修改文章缩略图",
              url: this.host + res.data.thumbnail
            }
          ];
        }
        console.log(this);
      } else {
        this.$Notice.error({
          title: "提示",
          desc: "请求失败"
        });
      }
    },
    // 所有操作都会被解析重新渲染
    change (value, render) {
      // render 为 markdown 解析后的结果[html]

      this.html = render;
    },
    // 获取分类列表
    async getSortList () {
      const res = await Services.getSortList();
      console.log(res);
      if (res.errno === 0) {
        this.sortList = res.data;
      }
    },
    // 获取标签列表
    async getLabelList () {
      this.loading1 = true;
      const res = await Services.getLabelList();
      this.loading1 = false;
      if (res.errno === 0) {
        this.labelList = res.data.map(item => {
          return {
            value: item.label_id,
            label: item.label_name
          };
        });
      }
    },
    // 新建标签
    handleCreate (val) {
      // this.labelList.push({
      //   label_id: 0, //假创建，只有提交时，才真正创建标签
      //   label_name: val
      // });
    },
    // 提交博客
    async submitAll () {
      console.log(this.checkedGroup);

      this.showLoading = true;
      if (this.title == "" || this.content == "") {
        this.$Message.error("文章标题或内容不能为空！");
        this.showLoading = false;
        return;
      }

      // 创建标签,并获取标签id
      const label_id = await this.newLabel();
      if (label_id === null) {
        this.showLoading = false;
        return;
      }
      // 将图片上传，并替换成真实路径
      await this.uploadimg();
      // 如果文章摘要没有，则从文章中截取
      if (!this.abstract) {
        this.abstract = this.content.substring(0, 300);
      }

      // 新建博客
      const postData = {
        article_id: this.$route.params.id,
        article_title: this.title,
        article_content: this.content,
        article_abstract: this.abstract,
        label_id: label_id.join(","),
        sort_id: this.checkedGroup.join(",")
      };
      if (this.thumbnail) {
        postData["thumbnail"] = this.thumbnail;
      }
      const res = await adminServices.updateArticle(postData);
      this.showLoading = false;
      if (res.errno === 0) {
        this.$Notice.success({
          title: "操作提示",
          desc: "新建博客成功",
          duration: 2
        });
        setTimeout(() => {
          this.defend = false;
          this.$router.push({
            path: "/admin/article",
            query: { pass: true }
          });
        }, 500);
        return;
      }
      this.$Message.error({
        title: "操作提示",
        desc: res.message || "新建失败"
      });
    },
    // 新建标签 返回新建的标签id
    async newLabel () {
      const labelNames = this.checkedLabel.filter(
        label => typeof label === "string"
      );
      let labelIds = this.checkedLabel.filter(
        label => typeof label === "number"
      );
      // 如果有新建的标签
      if (labelNames.length) {
        const res = await adminServices.newLabel({
          label_name: labelNames.join(",")
        });
        if (res.errno !== 0) {
          this.$Message.error(res.message);
          return null;
        }
        const ids = res.data.label_id.split(",");
        return labelIds.concat(ids);
      }
      // 如果没有新建的
      return labelIds;
    },
    // 取消提交
    cancel () {
      this.defend = false; //取消路由拦截
      this.$router.go(-1);
    },
    $imgAdd (pos, $file) {
      // 缓存图片信息
      this.img_file[pos] = $file;
    },
    // 上传图片
    async uploadimg () {
      // 如果没有图片，返回
      if (JSON.stringify(this.img_file) == "{}") {
        return;
      }
      // 第一步.将图片上传到服务器.
      let formData = new FormData();
      for (let _img in this.img_file) {
        formData.append(_img, this.img_file[_img]);
      }
      let res = await Services.upLoad(formData);
      for (let key in res) {
        // 替换成真实的url
        this.$refs.md.$img2Url(key, this.host + res[key]);
      }
    },
    $imgDel (pos) {
      delete this.img_file[pos];
    },
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
      this.thumbnail = res.file;
    },
    // 检验失败
    handleFormatError (file, fileList) {
      console.log("失败文件", file);
      console.log("失败文件列表", fileList);
    }
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
