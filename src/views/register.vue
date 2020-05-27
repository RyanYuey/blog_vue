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
          <FormItem>
            <div class="avatar-list">
              <div :class="['img', { 'img-selected': avatarIndex == index }]"
                   v-for="(item, index) in avatarList"
                   :key="item.id"
                   @click="changeAvatar(item.href, index)">
                <img :src="host + item.href"
                     alt="" />
              </div>
            </div>
          </FormItem>
          <FormItem>
            <Button type="primary"
                    long
                    @click="handleSubmit('form')">立即注册</Button>
          </FormItem>
        </Form>
        <div>
          <Button type="text"
                  size="small"
                  icon="md-arrow-round-back"
                  to="/login">已有账号，去登陆</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Services from "@/api/common.js";
import Config from "@/config/index.js";
export default {
  data () {
    return {
      host: Config.baseURL,
      form: {
        user_name: "", //不要用户名，直接拿邮箱做用户名
        user_nickname: "",
        user_password: "",
        user_avatar: ""
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
        user_nickname: [
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
      avatarList: [],
      avatarIndex: 0
    };
  },
  created () {
    this.getDefaultAvatar();
  },
  methods: {
    getDefaultAvatar () {
      Services.getDefaultAvatar().then(res => {
        if (res.errno === 0) {
          this.avatarList = res.data;
          this.form["user_avatar"] = res.data[0].href;
        }
      });
    },
    changeAvatar (href, index) {
      this.avatarIndex = index;
      this.form["user_avatar"] = href;
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          this.$Message.error("检验失败!");
          return;
        }
        console.log(this.form);
        this.register();
      });
    },
    register () {
      Services.register(this.form).then(res => {
        if (res.errno === 0) {
          this.$Message.success("注册成功,前往登录");
          setTimeout(() => {
            this.$router.push({
              name: "Login"
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

.avatar-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // height: 100px;
  .img {
    width: 40px;
    height: 40px;
    background: blue;
    overflow: hidden;
    border-radius: 10px;
    cursor: pointer;
    border: 1px solid #ccc;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .img-selected {
    border: 1px solid #2d8cf0;
    box-shadow: 0 0 8px #2d8cf0;
  }
}
</style>
