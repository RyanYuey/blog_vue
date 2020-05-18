import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user_name: "" || localStorage.getItem("user_name")
  },
  mutations: {
    handleUserName: (state, user_name) => {
      state.user_name = user_name;
      localStorage.setItem("user_name", user_name); //防止页面刷新后 vuex重启，数据丢失
    }
  },
  getters: {
    user_name: state => state.user_name
  },
  actions: {},
  modules: {}
});
