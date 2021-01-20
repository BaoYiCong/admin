import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

//引入外部封装的方法
import apis from "./assets/js/api";

// 引入外部封装的方法
import "./plugins/element";

Vue.prototype.$apis = apis;

//为请求设置请求头
axios.interceptors.request.use((config) => {
  config.headers["Authorization"] = sessionStorage.getItem("token");
  return config;
});

// elementui组件引入
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 挂载路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();
  const tokenStr = window.sessionStorage.getItem("token");
  if (!tokenStr) return next("/login");
  next();
});

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
