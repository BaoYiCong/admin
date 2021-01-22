<template>
  <div>
    <el-upload
      :action="actionURL"
      :headers="getToken"
      list-type="picture-card"
      class="avatar-uploader"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
import axios from "axios";
export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      actionURL: axios.defaults.baseURL,
      dialogVisible: false,
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    getToken() {
      return { Authorization: seesionStorage.getItem("token") };
    },
  },
  //生命周期
  created() {},
  mounted() {},
};
</script> 

<style scoped>
</style>
