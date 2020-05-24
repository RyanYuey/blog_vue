<template>
  <!-- 评论输入组件 -->
  <div class="comment-input"
       v-show="show">
    <textarea ref="myText"
              @blur="handleBlur"
              class="my-textarea"
              v-model="content"
              :placeholder="isReply ? '回复 ' + name : '说点什么吧'"></textarea>
    <div class="btn-wrap">
      <button class="my-btn"
              @click="cancelInput"
              v-if="isReply">取消</button>
      <button class="my-btn"
              @click="confirmInput">评论</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "commentInput",
  props: {
    // 被评论人
    name: {
      type: String,
      default: ""
    },
    // 是否是回复
    isReply: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      content: "" //评论内容
    };
  },
  // watch: {
  //   show (val) {

  //   }
  // },
  updated () {
    this.$refs.myText.focus();
  },
  methods: {
    cancelInput () {
      this.$emit("cancel");
      this.content = "";
    },
    confirmInput () {
      this.$emit("confirm", this.content);
      this.content = "";
    },
    handleBlur () {
      // 如果是回复框，失焦后隐藏
      if (this.isReply && !this.content) {
        this.cancelInput();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.comment-input {
  padding: 4px 0;
}
.my-textarea {
  width: 100%;
  display: block;
  line-height: 1.5;
  padding: 4px 7px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  color: #515a6e;
  background: #fff;
  resize: none;
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  overflow-y: hidden;
  height: 8em;
  &:focus {
    border: 1px solid #2d8cf0;
    box-shadow: 0 0 0 1px rgba(45, 140, 240, 0.3);
  }
}
.btn-wrap {
  margin-top: 5px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  .my-btn {
    color: #fff;
    background-color: #2d8cf0;
    border-color: #2d8cf0;
    outline: 0;
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    line-height: 1.5;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    height: 32px;
    padding: 0 15px;
    font-size: 14px;
    border-radius: 4px;
    transition: color 0.2s linear, background-color 0.2s linear,
      border 0.2s linear, box-shadow 0.2s linear;
    margin-left: 10px;
    &:hover {
      background-color: rgba(45, 140, 240, 0.8);
    }
  }
}
</style>
