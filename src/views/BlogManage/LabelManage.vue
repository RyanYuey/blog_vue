<template>
  <div class="container">
    <div class="options">
      <Input v-model="value"
             placeholder="输入标签名称"
             style="width: 300px;margin-right:5px;" />
      <Button type="primary"
              @click="newLabel">添加标签</Button>
    </div>
    <div class="list-wrap">
      <Table :loading="loading"
             :columns="columns"
             :data="dataList"
             :max-height="700"
             border
             style="margin:20px 0;">
        <template slot-scope="{ row, index }"
                  slot="label_name">
          <span v-show="tapIndex !== index">{{ row.label_name }}</span>
          <div v-show="tapIndex === index">
            <Input placeholder="输入标签名称"
                   v-model="editValue"
                   style="width: 300px" />
            <Button class="edit-btn"
                    type="warning"
                    @click="confirmEdit(row.label_id, index)">修改</Button>
            <Button class="edit-btn"
                    type="default"
                    @click="tapIndex = -1">取消</Button>
          </div>
        </template>
        <template slot-scope="{ row, index }"
                  slot="action">
          <Button type="primary"
                  size="small"
                  style="margin-right: 5px"
                  @click="edit(row, index)">编辑</Button>
          <!-- <Button type="primary"
                  size="small"
                  style="margin-right: 5px"
                  @click="show(index)">详情</Button> -->
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
          title: "标签名称",
          slot: "label_name"
        },
        {
          title: "操作",
          slot: "action",
          width: "300px",
          align: "center"
        }
      ],
      searchText: "", //搜索
      dataList: [], //标签列表
      tapIndex: -1, //用于显示输入框
      value: "", //新建标签名称
      editValue: ""
    };
  },
  mounted () {
    this.getData();
  },
  methods: {
    async getData () {
      this.loading = true;
      const res = await subServices.getLabelList();

      if (res.errno === 0) {
        this.dataList = res.data;
      } else {
        this.$Message.error("请求失败");
      }
      this.loading = false;
    },
    async remove (data) {
      this.$Modal.confirm({
        title: "删除提示",
        content: `确定要删除 ${data.label_name}?`,
        onOk: async () => {
          const res = await adminServices.deleteLabel({
            label_id: data.label_id
          });
          if (res.errno === 0) {
            this.$Notice.success({
              title: "删除提示",
              desc: `删除 ${data.label_name} 成功`
            });
            this.getData();
          } else {
            this.$Notice.error({
              title: "删除提示",
              desc: res.message || "删除失败"
            });
          }
        },
        onCancel: () => {
          this.$Message.info("您已取消");
        }
      });
    },
    edit (data, index) {
      this.tapIndex = this.tapIndex == index ? -1 : index;
      this.editValue = data.label_name;
    },
    confirmEdit (id, index) {
      const postData = {
        label_id: id,
        label_name: this.editValue
      };
      adminServices.updateLabel(postData).then(res => {
        if (res.errno === 0) {
          this.$Notice.success({
            title: "修改提示",
            desc: "修改成功",
            duration: 2
          });
          this.dataList[index]["label_name"] = this.editValue;
          this.tapIndex = -1;
        } else {
          this.$Notice.error({
            title: "修改提示",
            desc: "修改失败",
            duration: 2
          });
        }
      });
    },
    newLabel () {
      adminServices
        .newLabel({
          label_name: this.value
        })
        .then(res => {
          if (res.errno === 0) {
            this.$Notice.success({
              title: "添加提示",
              desc: "添加成功",
              duration: 2
            });
            this.value = "";
            this.getData();
          } else {
            this.$Notice.error({
              title: "添加提示",
              desc: res.message ? res.message : "添加失败",
              duration: 2
            });
          }
        });
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
