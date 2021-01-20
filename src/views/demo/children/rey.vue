<template>
  <div>
    <div v-for="(item, index) in $store.state.list3" :key="index">
      <p>
        {{ item.text }}
        <el-button type="primary" @click="addread(item.id)">恢复</el-button>
      </p>
      <el-divider></el-divider>
    </div>
    <p v-show="$store.state.list3.length <= 0">没有数据···</p>
    <el-button
      v-show="$store.state.list3.length >= 1"
      type="warning"
      @click="allyd"
      >全部加入已读</el-button
    >
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {};
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    addread(id) {
      this.$store.commit("addread", id);
    },
    allyd() {
      this.$store.commit("alldel");
    },
  },
  //生命周期
  created() {},
  mounted() {},
};
</script> 

<style scoped>
</style>
