<template>
  <div class="container">
    <section>
      <h3 class="title">设置默认头像</h3>
      <div class="content">
        <div class="demo-upload-list"
             v-for="(item, index) in defaultList"
             :key="index">
          <img :src="host + item.url" />
          <div class="demo-upload-list-cover">
            <Icon type="ios-eye-outline"
                  @click.native="handleView(item.url)"></Icon>
            <Icon type="ios-trash-outline"
                  @click.native="handleRemove(item)"></Icon>
          </div>
        </div>
        <Upload ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg', 'jpeg', 'png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                :action="uploadUrl"
                style="display: inline-block;width:58px;">
          <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="ios-camera"
                  size="20"></Icon>
          </div>
        </Upload>
        <Modal title="View Image"
               v-model="visible">
          <img :src="host + img"
               v-if="visible"
               style="width: 100%" />
        </Modal>
      </div>
    </section>
    <section>
      <h3 class="title">设置文章默认缩略图</h3>
      <div class="content">
        <div class="demo-upload-list"
             v-for="(item, index) in defaultList2"
             :key="index">
          <img :src="host + item.url" />
          <div class="demo-upload-list-cover">
            <Icon type="ios-eye-outline"
                  @click.native="handleView(item.url)"></Icon>
            <Icon type="ios-trash-outline"
                  @click.native="handleRemove(item)"></Icon>
          </div>
        </div>
        <Upload ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess2"
                :format="['jpg', 'jpeg', 'png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload2"
                multiple
                type="drag"
                :action="uploadUrl"
                style="display: inline-block;width:58px;">
          <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="ios-camera"
                  size="20"></Icon>
          </div>
        </Upload>
        <Modal title="View Image"
               v-model="visible">
          <img :src="host + img"
               v-if="visible"
               style="width: 100%" />
        </Modal>
      </div>
    </section>
  </div>
</template>

<script>
import Services from "@/api/common.js";
import adminServices from "@/api/admin.js";
export default {
  data () {
    return {
      defaultList: [],
      defaultList2: [], //存储文章默认缩略图
      host: process.env.VUE_APP_URL,
      img: "",
      uploadUrl: "/api/upload",
      visible: false,
      uploadList: []
    };
  },
  mounted () {
    this.getDefaultAvatar();
    this.getDefaultThubnail();
  },
  methods: {
    async getDefaultAvatar () {
      const { data } = await Services.getDefaultAvatar();
      this.defaultList = data.map(item => {
        return {
          id: item.id,
          url: item.href
        };
      });
    },
    async getDefaultThubnail () {
      const { data } = await Services.getDefaultAvatar({ type: 2 });
      this.defaultList2 = data.map(item => {
        return {
          id: item.id,
          url: item.href
        };
      });
    },
    handleView (img) {
      this.img = img;
      this.visible = true;
    },
    handleRemove (file) {
      adminServices.deleteAvatar({ id: file.id }).then(res => {
        if (res.errno === 0) {
          this.getDefaultThubnail();
          this.getDefaultAvatar();
          this.$Notice.success({
            title: "删除成功"
          });
        } else {
          this.$Notice.error({
            title: "删除失败"
          });
        }
      });
    },
    handleSuccess (res, file) {
      adminServices.addAvatar({ images: file.response.file }).then(res => {
        if (res.errno === 0) {
          this.getDefaultAvatar();
          this.$Notice.success({
            title: "添加成功"
          });
        } else {
          this.$Notice.error({
            title: "添加失败"
          });
        }
      });
    },
    handleSuccess2 (res, file) {
      adminServices
        .addAvatar({ images: file.response.file, type: 2 })
        .then(res => {
          if (res.errno === 0) {
            this.getDefaultThubnail();
            this.$Notice.success({
              title: "添加成功"
            });
          } else {
            this.$Notice.error({
              title: "添加失败"
            });
          }
        });
    },
    handleFormatError () {
      this.$Notice.warning({
        title: "文件格式错误"
      });
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: "文件不能超出2M"
      });
    },
    handleBeforeUpload () {
      const check = this.defaultList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "图片不能超出5张"
        });
      }
      return check;
    },
    handleBeforeUpload2 () {
      const check = this.defaultList2.length < 1;
      if (!check) {
        this.$Notice.warning({
          title: "图片不能超出1张"
        });
      }
      return check;
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  padding: 20px;
  .title {
    margin-bottom: 14px;
  }
}

// 图片列表
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
