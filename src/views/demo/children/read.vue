<template>
  <div>
    <div v-for="(item, index) in $store.state.list" :key="index">
      <p>
        {{ item.text }}
        <el-button type="primary" @click="addunread(item.id)"
          >加入未读</el-button
        >
        <el-button type="danger" @click="del(item.id)">加入回收站</el-button>
      </p>
      <el-divider></el-divider>
    </div>
    <p v-show="$store.state.list.length <= 0">没有数据···</p>
    <el-button
      v-show="$store.state.list.length >= 1"
      type="warning"
      @click="allyd"
      >全部加入回收站</el-button
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
    del(id) {
      this.$store.commit("addrey", id);
    },
    addunread(id) {
      this.$store.commit("addunread", id);
    },
    allyd() {
      this.$store.commit("addlist3");
    },
  },
  //生命周期
  created() {},
  mounted() {},
};
</script> 

<style scoped>
</style>
