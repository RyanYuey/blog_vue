import request from "@/utils/request";

export default {
  // 新建标签
  newLabel (data) {
    return request.post("/api/admin/new_label", data);
  },
  // 新建博客
  newArticle (data) {
    return request.post("/api/admin/new_article", data);
  },
  // 新建博客
  updateArticle (data) {
    return request.post("/api/admin/update_article", data);
  },
  // 删除博客
  deleteArticle (data) {
    return request.post("/api/admin/del_article", data);
  },
  // 新建分类
  newSort (data) {
    return request.post("/api/admin/new_sort", data);
  },
  // 编辑分类
  updateSort (data) {
    return request.post("/api/admin/update_sort", data);
  },
  // 删除分类
  deleteSort (data) {
    return request.post("/api/admin/del_sort", data);
  },
  // 编辑标签
  updateLabel (data) {
    return request.post("/api/admin/update_label", data);
  },
  // 删除标签
  deleteLabel (data) {
    return request.post("/api/admin/del_label", data);
  },
  // 新建日记
  newDiary (data) {
    return request.post("/api/admin/new_diary", data);
  },
  // 删除日记
  deleteDiary (data) {
    return request.post("/api/admin/del_diary", data);
  }
};
