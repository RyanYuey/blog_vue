<template>
  <div class="diary"
       v-title
       data-title="日记">
    <div class="spin-wrap"
         v-if="spinShow">
      <Spin size="large"
            fix
            v-if="spinShow"></Spin>
    </div>
    <div class="year asyncWow bounceInUp"
         v-for="name in dataArr"
         :key="name">
      <div class="y-title">
        <span @click="toggleHide(name)">{{ name }}年</span>
        <Icon :class="hideObj[name] ? 'fold' : 'unfold'"
              type="md-arrow-dropdown" />
      </div>
      <transition name="fade">
        <div class="y-content"
             v-show="!hideObj[name]">
          <Timeline>
            <TimelineItem v-for="(item, index) in dataObj[name]"
                          :key="index">
              <p class="t-time">{{ item.time }}</p>
              <div class="t-content">
                <span>{{ item.content }}</span>
                <div class="img-wrap"
                     v-if="item.diary_img">
                  <img :src="host + item.diary_img"
                       alt="" />
                </div>
              </div>
            </TimelineItem>
          </Timeline>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { WOW } from "wowjs";
import Services from "@/api/common.js";
export default {
  data () {
    return {
      hideObj: {}, //控制数据展开收起
      dataObj: {},
      dataArr: [], //保存对象的key，这样可以排序
      host: process.env.VUE_APP_URL,
      spinShow: true
    };
  },
  created () {
    this.getData();
  },
  methods: {
    getData () {
      this.spinShow = true;
      Services.getDiaryList().then(res => {
        let dataList = res.data;
        let data = {}; //保存所有年份，不能重复
        dataList.forEach(item => {
          let year = this.$formatDate(item.create_time, "yyyy");
          let time = this.$formatDate(item.create_time, "MM月dd日 hh:mm");

          // item["year"] = year;
          item["time"] = time;
          data[year] = data[year] || [];
          data[year].push(item);
          this.hideObj[year] = false; //初始化隐藏对象
          this.spinShow = false;
          new WOW().init();
        });
        this.dataObj = data;
        this.dataArr = Object.keys(this.dataObj).sort((a, b) => {
          return b - a;
        });
        console.log(this.dataObj);
      });
    },
    toggleHide (name) {
      this.hideObj[name] = !this.hideObj[name];
      this.$forceUpdate();
      // this.$set(this.hideObj, name, !this.hideObj[name]);
      console.log(this.hideObj[name]);
    }
  },
  watch: {
    dataObj () {
      this.$nextTick(() => {
        // 在dom渲染完后,再执行动画
        new WOW({
          boxClass: "asyncWow",
          live: true
        }).init();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.diary {
  width: 1280px;
  padding: 20px 40px;
  margin: 0 auto;
  background: #fff;
  min-height: 500px;
}

.year {
  // background: #00bcd4;
  .y-title {
    padding: 10px 20px 10px 0;
    font-size: 22px;
    color: #03a9f4;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    // 折叠
    .fold {
      transform: rotate(90deg);
      transition: transform 0.3s;
    }
    // 展开
    .unfold {
      transition: transform 0.3s;
    }
  }
  .y-content {
  }
}

.t-time {
  margin-bottom: 10px;
}
.t-content {
  display: inline-block;
  margin-left: 20px;
  background: #607d8b;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  span {
  }
  .img-wrap {
    padding: 10px 0;
    overflow: hidden;
    .col {
      padding: 5px;
    }
    img {
      display: block;
      width: 100%;
      max-width: 600px;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.spin-wrap {
  position: relative;
  height: 400px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
