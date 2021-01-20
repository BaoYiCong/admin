<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="已读" name="first"><read></read></el-tab-pane>
      <el-tab-pane label="未读" name="second"><unread></unread></el-tab-pane>
      <el-tab-pane label="回收站" name="third"><rey></rey></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import read from "./children/read";
import unread from "./children/unread";
import rey from "./children/rey";
export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: { read, unread, rey },
  // 组件状态值
  data() {
    return {
      activeName: 0,
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {},
  //生命周期
  created() {},
  mounted() {},
};
</script> 

<style scoped lang="scss">
.el-tabs__item {
  font-size: 25px;
}
</style>
