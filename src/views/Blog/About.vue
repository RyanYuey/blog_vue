<template>
  <div class="about"
       v-title
       data-title="关于">
    <section>
      <h3 class="title">关于我</h3>
      <div class="content">
        <div class="main">
          <p>
            我是2019年毕业的，电气工程及其自动化专业，毕业后直接找的前端工作，因为大学期间就对本专业无感，没有转专业至今都留有遗憾。
          </p>
          <p>
            大学期间就开始摸索计算机相关技术，c语言入门，后学java，中途放弃，转前端，然后就一直在学习前端技术，vue,nodejs,scss,小程序,uniapp,gulp,webpack都有学习,但也都是学的皮毛，我会不断努力进步的
          </p>
          <p>
            联系我
            <ul style="padding-left:1em;margin-top:5px;">
              <li>邮箱： 1978063895@qq.com</li>
              <li>留言： <a href="#">给我留言</a></li>
            </ul>
          </p>
        </div>
        <div class="img-wrap">
          <img src="../../assets/image/default_avatar.jpg"
               alt="" />
        </div>
      </div>
    </section>
    <section>
      <h3 class="title">关于博客</h3>
      <div class="content">
        <div class="main">
          <p>
            写这个博客的初衷是为了练习，不想只局限于前端简单的去调接口，希望能够跑通前后端，当然也会经常在这里发一些博客，希望大家支持
          </p>
          <p>
            兼容问题：目前只在chrome运行良好，其他浏览器还没时间去测试
          </p>
          <p>
            博客技术栈
            <ul style="padding-left:1em;margin-top:5px;">
              <li>前端, vue + ivewUI + wowjs</li>
              <li>后端, nodejs koa2框架 + mysql</li>
            </ul>
          </p>
        </div>
      </div>
    </section>
    <section>
      <h3 class="title">关于版权</h3>
      <div class="content">
        <div class="main">
          <p>
            您可以可以对本站所有原创内容进行转载、节选、二次创作，但是您不得对其用于商业目的。
          </p>
        </div>
      </div>
    </section>
    <section>
      <h3 class="title">特别说明</h3>
      <div class="content">
        <div class="main">
          <p>
            本站文章仅代表个人观点，和任何组织或个人无关。
          </p>

        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.about {
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
