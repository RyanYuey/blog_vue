<template>
  <div class="container">
    <div class="options">
      <Button type="primary"
              to="/admin/newDiary">新建日记</Button>
    </div>
    <div class="list-wrap">
      <Table :loading="loading"
             :columns="columns"
             :data="dataList"
             :max-height="700"
             border
             style="margin:20px 0;">
        <template slot-scope="{ row }"
                  slot="label_name">
          <span class="title"
                @click="toDetail(row)">{{ row.content }}</span>
        </template>
        <template slot-scope="{ row, index }"
                  slot="action">
          <Button type="error"
                  size="small"
                  @click="remove(row)">删除</Button>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
import adminServices from "@/api/admin.js";
import subServices from "@/api/common.js";
export default {
  data () {
    return {
      loading: false,
      columns: [
        {
          title: "日记内容",
          slot: "label_name"
        },
        {
          title: "日期",
          key: "create_time",
          width: "200px",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          width: "300px",
          align: "center"
        }
      ],
      searchText: "", //搜索
      dataList: [] //标签列表
    };
  },
  created () {
    this.getData();
  },
  methods: {
    async getData () {
      this.loading = true;
      const res = await subServices.getDiaryList();
      if (res.errno === 0) {
        this.dataList = res.data;
        this.dataList.forEach(item => {
          item.create_time = this.$formatDate(
            item.create_time,
            "yyyy-MM-dd hh:mm"
          );
        });
      } else {
        this.$Message.error("请求失败");
      }
      this.loading = false;
    },
    toDetail (data) {
      console.log(data);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
}

.title {
  cursor: pointer;
  &:hover {
    color: #5cadff;
  }
}

.edit-btn {
  margin-left: 10px;
}
</style>
