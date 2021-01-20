import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//导入持久化依赖包
import VuexPersistence from "vuex-persist";
//实例化持久化插件对象
const vuexLocal = new VuexPersistence({
  storage: window.localStorage, //存储介质,
  key: "vuex", //存储到本地存储
});

export default new Vuex.Store({
  state: {
    list: [
      { id: 1, text: "北国风光千里冰封，万里雪飘，望长城内外惟余莽莽。" },
      { id: 1, text: "大河上下顿失滔滔，山舞银蛇，原驰蜡象" },
      { id: 1, text: "惜秦皇汉武，略输文采；唐宗宋祖，稍逊风骚。" },
      { id: 1, text: "一代天骄，成吉思汗，只识弯弓射大雕。" },
      { id: 1, text: "俱往矣，数风流人物，还看今朝。" },
    ],
    list2: [],
    list3: [],
  },
  mutations: {
    addrey(state, id) {
      var index = state.list.findIndex((e) => e.id == id);
      state.list3.push(state.list[index]);
      state.list.splice("index", 1);
    },
    addread(state, id) {
      var index = state.list3.findIndex((e) => e.id == id);
      state.list.push(state.list3[index]);
      state.list3.splice("index", 1);
    },
    addunread(state, id) {
      var index = state.list.findIndex((e) => e.id == id);
      state.list2.push(state.list[index]);
      state.list.splice("index", 1);
    },
    addx(state, id) {
      var index = state.list2.findIndex((e) => e.id == id);
      state.list.push(state.list2[index]);
      state.list2.splice("index", 1);
    },
    alldel(state) {
      state.list3.forEach((item) => {
        state.list.push(item);
      });
      state.list3 = [];
    },
    addlist3(state) {
      state.list.forEach((item) => {
        state.list3.push(item);
      });
      state.list = [];
    },
  },
  actions: {},
  plugins: [vuexLocal.plugin],
});
