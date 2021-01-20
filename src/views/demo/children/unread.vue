<template>
  <div>
     <div v-for="(item, index) in $store.state.list2" :key="index">
      <p>
        {{ item.text }}
        <el-button type="primary" @click="addunread(item.id)">加入已读</el-button>
      </p>
      <el-divider></el-divider>
    </div>
    <p v-show="$store.state.list2.length <= 0">没有数据···</p>
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
      addunread(id){
          this.$store.commit("addx",id)
      }
  },
  //生命周期
  created() {},
  mounted() {},
};
</script> 

<style scoped>
</style>
