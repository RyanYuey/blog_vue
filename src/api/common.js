import request from "@/utils/request";

export default {
  // 获取文章列表
  getBlogList (data) {
    return request.get("/api/article/list", {
      params: data
    });
  },
  // 获取热门博客
  getHotArticles () {
    return request.get("/api/article/hot_article");
  },
  // 获取文章详情
  getDetail (id) {
    return request.get("/api/article/detail", {
      params: {
        id
      }
    });
  },
  // 获取文章延申阅读数据
  getFurtherReading (id) {
    return request.get("/api/article/further_reading", {
      params: {
        id
      }
    });
  },
  // 获取分类列表
  getSortList () {
    return request.get("/api/sort/list");
  },
  // 获取标签列表
  getLabelList () {
    return request.get("/api/label/list");
  },
  // 获取评论列表
  getCommentList (data) {
    return request.get("/api/article/comment_list", {
      params: data
    });
  },
  // 获取日记列表
  getDiaryList (data) {
    return request.get("/api/diary/list", {
      params: data
    });
  },
  // 登录
  login (data) {
    return request.post("/api/user/login", data);
  },
  // 注册
  register (data) {
    return request.post("/api/user/register", data);
  },
  // 退出登录
  logout () {
    return request.post("/api/user/logout");
  },
  // 获取用户列表
  getUserList () {
    return request.get("/api/user/list");
  },

  // 图片上传
  upLoad (formdata) {
    return request({
      url: "/api/upload",
      method: "post",
      data: formdata,
      headers: { "Content-Type": "multipart/form-data" }
    });
  },

  // 点赞
  setLike (data) {
    return request.post("/api/article/like", data);
  },
  // 添加评论
  addComment (data) {
    return request.post("/api/article/comment", data);
  },
  // 删除评论
  delComment (data) {
    return request.post("/api/article/del_comment", data);
  },
  // 获取留言
  getMessage () {
    return request.get("/api/message_list");
  },
  // 添加留言
  addMessage (data) {
    return request.post("/api/new_message", data);
  },
  // 删除留言
  delMessage (data) {
    return request.post("/api/del_message", data);
  },
  // 获取默认头像列表
  getDefaultAvatar (data) {
    return request.get("/api/img_list", {
      params: data
    });
  }
};
