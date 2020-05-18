<template>
  <div>
    <div class="comment">
      <ul class="comment__list">
        <li class="comment__item"
            v-for="(item, index) in comment_list"
            :key="item.id">
          <div class="comment__avatar">
            <img :src="item.from_avatar"
                 alt="用户头像" />
          </div>
          <div class="comment__main">
            <div class="comment__header">
              <span class="nickname">{{ item.from_nickname }}</span>
              <span class="date">{{ item.create_time }}</span>
            </div>
            <div class="comment__content">{{ item.content }}</div>
            <div class="comment__footer">
              <span class="reply"
                    v-if="item.from_uid !== userId"
                    @click="inputShow(index)">回复</span>
              <span class="del"
                    @click="delComment(item)"
                    v-else>删除</span>
              <comment-input :show="tapIndex == index && subTapIndex == -1"
                             :isReply="true"
                             :name="item.from_nickname"
                             @confirm="confirmComment($event, item)"
                             @cancel="cancelInput"></comment-input>
            </div>
            <!-- 回复列表 -->
            <ul class="response__list"
                v-if="item.response.length">
              <li class="response__item"
                  v-for="(it, i) in item.response"
                  :key="it.id">
                <div class="response__avatar">
                  <img :src="it.from_avatar"
                       alt="用户头像" />
                </div>
                <div class="response__main">
                  <div class="response__header">
                    <span class="nickname">{{ it.from_nickname }}</span>
                    <span class="date">{{ it.create_time }}</span>
                  </div>
                  <div class="response__content">
                    <span>@</span><span class="target">{{ it.to_nickname }}</span>{{ it.content }}
                  </div>
                  <div class="response__footer">
                    <span class="reply"
                          v-if="it.from_uid !== userId"
                          @click="inputShow(index, i)">回复</span>
                    <span class="del"
                          @click="delComment(it)"
                          v-else>删除</span>
                    <comment-input :show="tapIndex == index && subTapIndex == i"
                                   :isReply="true"
                                   :name="it.from_nickname"
                                   @confirm="confirmComment($event, it)"
                                   @cancel="cancelInput"></comment-input>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import commentInput from "@/components/comment-input.vue";
export default {
  name: "comment",
  components: {
    commentInput
  },
  props: {
    asyncData: {
      type: Array,
      default () {
        return [];
      }
    },
    // 通过用户id配置评论是否可删除
    userId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      comment_list: [],
      tapIndex: -1,
      subTapIndex: -1
    };
  },
  // 监听异步数据改变
  watch: {
    asyncData () {
      this.update();
    }
  },
  methods: {
    // 数据更新
    update () {
      this.comment_list = this.init(this.asyncData);
    },
    init (data) {
      const lists = []; //保存评论列表
      const keys = {}; //保存评论id和index对应表,优点，一次遍历就能得到数据，缺点，不能对源数据时间倒序排序

      let index = 0;
      //遍历格式化数据
      data.forEach(item => {
        let id = item.id;
        // 如果parent_id == 0说明是一级评论
        if (item.parent_id === 0) {
          keys[id] = index++;
          item["response"] = [];
          lists.push(item);
        } else {
          let parent_index = keys[item.parent_id];
          lists[parent_index]["response"].push(item);
        }
      });
      return lists;
    },
    // 显示评论框
    inputShow (index, i) {
      this.tapIndex = index;
      this.subTapIndex = typeof i !== "undefined" ? i : -1;
      console.log(this.tapIndex, this.subTapIndex);
    },
    // 取消显示评论框
    cancelInput () {
      this.tapIndex = -1;
      this.subTapIndex = -1;
    },
    // 提交评论
    confirmComment (content, item) {
      const data = {
        content: content,
        to_uid: item.from_uid, //评论人变成了被评论人
        topic_id: item.topic_id
      };
      // 第一个回复的人触发建楼 parent_id等于被评论的评论id,其他评论的parent_id 也只能是这个id
      // 只要有response说明他是一级评论
      data["parent_id"] = item.response ? item.id : item.parent_id;

      this.$emit("confirmComment", data);
      this.cancelInput();
    },
    // 删除评论
    delComment (item) {
      this.$emit("deleteComment", item);
    }
  }
};
</script>

<style lang="scss" scoped>
// 评论
.comment {
  width: 100%;
  &__list {
  }
  &__item {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    &:last-child {
      border-bottom: none;
    }
  }
  &__avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__main {
    flex: 1;
  }
  &__header {
    .nickname {
      color: #406599;
      margin-right: 10px;
    }
    .date {
      color: #777;
    }
  }
  &__content {
    padding: 6px 0;
  }
  &__footer {
    width: 100%;
    .reply {
      color: #406599;
      cursor: pointer;
    }
    .del {
      color: #406599;
      cursor: pointer;
    }
  }
}
// 回复

.response {
  width: 100%;
  &__list {
  }
  &__item {
    display: flex;
    padding: 10px 0;
  }
  &__avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__main {
    flex: 1;
  }
  &__header {
    .nickname {
      color: #406599;
      margin-right: 10px;
    }
    .date {
      color: #777;
    }
  }
  &__content {
    padding: 6px 0;
    .target {
      // color: #406599;
      margin-right: 6px;
    }
  }
  &__footer {
    .reply {
      color: #406599;
      cursor: pointer;
    }
    .del {
      color: #406599;
      cursor: pointer;
    }
  }
}
</style>
