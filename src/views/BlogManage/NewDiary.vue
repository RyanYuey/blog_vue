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
            <Upload
                type="drag"
                :action="uploadUrl"
                ref="upload"
                :max-size="2048"
                :on-exceeded-size="handleExceededError"
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :before-upload="handleBeforeUpload">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或者拖拽图片到这里</p>
                </div>
            </Upload>
        </div>
        
    </div>
</template>

<script>
import Services from "@/api/common.js";
export default {
    data(){
        return {
            content:'',
            uploadUrl: "http://localhost:8090/" + "api/upload", //上传路径
        }
    }
}
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