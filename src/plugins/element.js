import vue from "vue";
import elementUI from "element-ui";
import { Message, MessageBox } from "element-ui";

vue.prototype.$success = (msg) => {
  Message({
    message: msg,
    type: "success",
  });
};
vue.prototype.$warn = (msg) => {
  Message({
    message: msg,
    type: "warning",
  });
};
vue.prototype.$error = (msg) => {
  Message.error(msg);
};
vue.prototype.$ask = (msg, obj) => {
  const defaultConfig = {
    title: "提示",
    ok: "确定",
    no: "取消",
    type: "warning",
  }; //默认配置
  obj = Object.assign(defaultConfig, obj);
  const { title, ok, no, type } = obj;
  return MessageBox.confirm(msg, title, {
    confirmButtonText: ok,
    cancelButtonText: no,
    type,
  });
};

vue.use(elementUI);
