import axios from "axios";

axios.defaults.baseURL = "https://www.liulongbin.top:8888/api/private/v1";

export default {
  // 登录
  login({ username, password }) {
    return axios.post("/login", {
      username,
      password,
    });
  },
  // 左侧列表
  getMenus() {
    return axios.get("menus");
  },
  // 添加用户
  adduser(user) {
    return axios.post("users", user);
  },
  //获取用户列表
  getUsers({ query, pagenum, pagesize }) {
    return axios.get("users", {
      params: {
        query,
        pagenum,
        pagesize,
      },
    });
  },
  // 切换用户状态
  switchUserState({ id, mg_state }) {
    return axios.put(`users/${id}/state/${mg_state}`);
  },
  //修改用户
  editUser(id, email, mobile) {
    return axios.put(`users/${id}`, { email, mobile });
  },
  // 状态变更
  offswitch({ id, mg_state }) {
    return axios.put(`users/${id}/state/${mg_state}`);
  },
  // 删除列表数据
  deletelist(id) {
    return axios.delete(`users/${id}`);
  },
  // 添加数据
  adduser({ username, password, email, mobile }) {
    return axios.post("users", {
      username,
      password,
      email,
      mobile,
    });
  },
  //请求权限用户列表
  getgluser() {
    return axios.get("roles");
  },
  // 添加数据
  adduserqx(data) {
    return axios.post("roles", data);
  },
  // 删除
  ddel(id) {
    return axios.delete(`roles/${id}`);
  },
  setuserqxian(id, rid) {
    return axios.put(`users/${id}/role`, { rid });
  },
  // 修改
  xguser({ id, roleName, roleDesc }) {
    return axios.put(`roles/${id}`, { roleName, roleDesc });
  },
  //树形图的渲染
  updataqx() {
    return axios.get("rights/tree");
  },
  updataqxx() {
    return axios.post("rights", roles / 7389 / rights);
  },
  // 获取权限列表
  getuserqx() {
    return axios.get("rights/list");
  },
  // 商品分类请求
  getgoodslist(pagenum, pagesize) {
    return axios.get(`categories?&pagenum=${pagenum}&pagesize=${pagesize}`);
  },
  // 商品列表添加
  addgoodsfl(cat_pid, cat_name, cat_level) {
    return axios.post(
      `categories?cat_pid=${cat_pid}&cat_name=${cat_name}&cat_level=${cat_level}`
    );
  },
  // 编辑提交分类
  classgoods(id, cat_name) {
    return axios.put(`categories/${id}`, { cat_name });
  },
  // 删除分类
  delfenlei(id) {
    return axios.delete(`categories/${id}`);
  },
  getgoods(query, pagenum, pagesize) {
    return axios.get(
      `goods?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`
    );
  },
  // 商品列表 删除
  delgoodsonce(id) {
    return axios.delete(`goods/${id}`);
  },
  // 参数分类列表获取
  getcategor(id) {
    return axios.get(`categories`);
  },
  getcatmany(id, sel) {
    return axios.get(`categories/${id}/attributes?sel=${sel}`);
  },
  setFnelist(id, attrId, attr_name, attr_sel) {
    return axios.put(`categories/${id}/attributes/${attrId}`, {
      attr_name: attr_name,
      attr_sel: attr_sel,
    });
  },
};
