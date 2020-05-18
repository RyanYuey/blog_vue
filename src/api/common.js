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
  }
};
