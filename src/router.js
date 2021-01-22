import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/index",
      name: "index",
      component: () => import("./views/demo/index.vue"),
    },
    // 后台管理
    {
      path: "/htgl",
      name: "htgl",
      component: () => import("./views/htgl/index"),
      redirect: "/hello",
      children: [
        {
          path: "/hello",
          name: "hello",
          component: () => import("./views/htgl/hello/helloword"),
        },
        {
          path: "/reports",
          component: () => import("./views/htgl/children/home"),
        },
        {
          path: "/users",
          name: "userlist",
          component: () => import("./views/htgl/children/userlist"),
        },
        {
          path: "/roles",
          name: "roles",
          component: () => import("./views/htgl/jurisdiction/roles"),
        },
        {
          path: "/rights",
          name: "rights",
          component: () => import("./views/htgl/jurisdiction/rights"),
        },
        // 商品列表
        {
          path: "/goods",
          name: "goods",
          component: () => import("./views/htgl/goods/goods"),
        },
        {
          path: "/params",
          name: "params",
          component: () => import("./views/htgl/goods/params"),
        },
        {
          path: "/categories",
          name: "categories",
          component: () => import("./views/htgl/goods/categories"),
        },
        // 添加用户
        {
          path: "/adduser",
          name: "adduse",
          component: () => import("./views/htgl/goods/children/adduser"),
        }
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/htgl/login.vue"),
    },
  ],
});
