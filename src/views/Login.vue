<template>
  <div class="container"
       v-title
       data-title="登录">
    <div class="login">
      <div class="inner">
        <h3 class="login-title">博客登录</h3>
        <Form ref="form"
              :model="form"
              :rules="rule">
          <FormItem prop="user_name">
            <Input type="text"
                   v-model="form.user_name"
                   placeholder="请输入用户名/邮箱">
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
            <Button type="primary"
                    long
                    @click="handleSubmit('form')">登录</Button>
          </FormItem>
        </Form>
        <div style="float:right;">
          <Button type="text"
                  size="small"
                  icon="md-arrow-round-forward"
                  to="/register">没有账号，去注册</Button>
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
        user_name: "",
        user_password: ""
      },
      rule: {
        user_name: [
          { required: true, message: "请输入用户名或邮箱", trigger: "blur" },
          {
            type: "string",
            min: 3,
            message: "用户名最少要3位",
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
      }
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
  height: 340px;
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
</style>
