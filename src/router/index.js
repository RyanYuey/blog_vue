import Vue from "vue";
import VueRouter from "vue-router";

// 解决不能跳转重复的路由
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err);
// };

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/register.vue")
  },
  {
    path: "/blog",
    name: "Blog",
    redirect: "/blog/article",
    component: () => import("../views/Blog.vue"),
    children: [
      {
        path: "article",
        name: "Article",
        component: () => import("../views/Blog/Article.vue")
      },
      {
        path: "/articleDetail/:id",
        name: "ArticleDetail",
        component: () => import("../views/Blog/articleDetail.vue")
      },
      {
        path: "/blog/diary",
        name: "Diary",
        component: () => import("../views/Blog/diary.vue")
      },
      {
        path: "/blog/about",
        name: "About",
        component: () => import("../views/Blog/About.vue")
      },
      {
        path: "/blog/message",
        name: "Message",
        component: () => import("../views/Blog/Message.vue")
      }
    ]
  },
  {
    path: "/admin",
    name: "Admin",
    redirect: "/admin/home",
    component: () => import("../views/BlogManage/Manage.vue"),
    children: [
      {
        path: "/admin/home",
        name: "AdminHome",
        component: () => import("../views/BlogManage/ManageHome.vue")
      },
      {
        path: "/admin/article",
        name: "ArticleManage",
        component: () => import("../views/BlogManage/ArticleManage.vue")
      },
      {
        path: "/admin/newArticle",
        name: "NewArticle",
        component: () => import("../views/BlogManage/NewArticle.vue")
      },
      {
        path: "/admin/updateArticle/:id",
        name: "UpdateArticle",
        component: () => import("../views/BlogManage/UpdateArticle.vue")
      },
      {
        path: "/admin/sort",
        name: "SortManage",
        component: () => import("../views/BlogManage/SortManage.vue")
      },
      {
        path: "/admin/label",
        name: "LabelManage",
        component: () => import("../views/BlogManage/LabelManage.vue")
      },
      {
        path: "/admin/diary",
        name: "DiaryManage",
        component: () => import("../views/BlogManage/DiaryManage.vue")
      },
      {
        path: "/admin/newDiary",
        name: "NewDiary",
        component: () => import("../views/BlogManage/NewDiary.vue")
      },
      {
        path: "/admin/setting",
        name: "Setting",
        component: () => import("../views/BlogManage/setting.vue")
      },
      {
        path: "/admin/user",
        name: "UserManage",
        component: () => import("../views/BlogManage/userManage.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
