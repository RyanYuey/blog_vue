<template>
  <div class="container">
    <div class="login">
      <div class="inner">
        <h3 class="login-title">博客注册</h3>
        <Form ref="form"
              :model="form"
              :rules="rule">
            <FormItem prop="user_nickname">
            <Input type="text"
                   v-model="form.user_nickname"
                   placeholder="请输入昵称">
            <Icon type="ios-person-outline"
                  slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="user_name">
            <Input type="text"
                   v-model="form.user_name"
                   placeholder="请输入邮箱">
            <Icon type="ios-person-outline"
                  slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="user_password">
            <Input type="password"
                   v-model="form.user_password"
                   placeholder="请输入密码">
            <Icon type="ios-lock-outline"
                  slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem >
            <div class="avatar-list">
                <div :class="['img',{'img-selected':avatarIndex == index}]" v-for="(item,index) in avatarList" :key="item.id" @click="avatarIndex = index"><img :src="item.href" alt=""></div>
            </div>
          </FormItem>
          <FormItem>
            <Button type="primary"
                    long
                    @click="handleSubmit('form')">注册并登录</Button>
          </FormItem>
        </Form>
        <div>
          <Button type="text" size="small" icon="md-arrow-round-back" to="/login">已有账号，去登陆</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Services from "@/api/common.js";
export default {
  data () {
    return {
      form: {
        user_name: "", //不要用户名，直接拿邮箱做用户名
        user_nickname:'',
        user_password: "",
        user_avatar:'',
      },
      rule: {
        user_name: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "邮箱格式错误",
            trigger: "blur"
          }
        ],
        user_nickname:[
            { required: true, message: "请输入用户昵称", trigger: "blur" },
          {
            type: "string",
            min: 3,
            max: 9,
            message: "昵称长度3-9位",
            trigger: "blur"
          }
        ],
        user_password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            type: "string",
            min: 6,
            max: 15,
            message: "密码长度为6-15位",
            trigger: "blur"
          }
        ]
      },
      avatarList:[
          {href:'https://pic1.zhimg.com/80/v2-1c7bbfbddcc50b3c55f4e3a55ee40873_720w.jpg',id:1},
          {href:'https://pic1.zhimg.com/80/v2-1c7bbfbddcc50b3c55f4e3a55ee40873_720w.jpg',id:2},
          {href:'https://pic1.zhimg.com/80/v2-1c7bbfbddcc50b3c55f4e3a55ee40873_720w.jpg',id:3},
          {href:'https://pic1.zhimg.com/80/v2-1c7bbfbddcc50b3c55f4e3a55ee40873_720w.jpg',id:4},
          {href:'https://pic1.zhimg.com/80/v2-1c7bbfbddcc50b3c55f4e3a55ee40873_720w.jpg',id:5}
     ],
     avatarIndex:0,
    };
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          this.$Message.error("检验失败!");
          return;
        }
        this.login();
      });
    },
    login () {
      Services.login(this.form).then(res => {
        if (res.errno === 0) {
          this.$Message.success("登录成功");
          localStorage.setItem("user_info", JSON.stringify(res.data));
          this.$store.commit("handleUserName", res.data.user_name);
          setTimeout(() => {
            this.$router.push({
              name: "Blog"
            });
            this.$Notice.info({
              title: `Hi, ${res.data.user_nickname}`,
              desc: "欢迎访问我的博客",
              duration: 3
            });
          }, 500);
        } else {
          this.$Message.error(res.message);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: #376956;
}

.login {
  width: 400px;
  height: 450px;
  padding: 30px 0;
  box-sizing: border-box;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-60%);
  .inner {
    width: 70%;
    margin: 0 auto;
  }
  .login-title {
    font-size: 24px;
    margin-bottom: 30px;
    text-align: center;
  }
  .form-cell {
    margin-bottom: 20px;
    &:last-child {
      margin: 0;
    }
  }
  .hint {
    height: 1em;
    margin-bottom: 10px;
    font-size: 12px;
    color: red;
  }
}

.avatar-list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    // height: 100px;
    .img{
        width: 40px;
        height: 40px;
        background: blue;
        overflow: hidden;
        border-radius: 50%;
        cursor: pointer;
        border: 1px solid #ccc;
        box-sizing: border-box;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .img-selected{
        border: 1px solid #2d8cf0;
        box-shadow: 0 0 8px #2d8cf0;
    }
}
</style>
