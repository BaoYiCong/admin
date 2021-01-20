<template>
  <div class="bycconty">
    <el-table :data="userlist" stripe style="width: 100%">
      <el-table-column label="#" type="index"> </el-table-column>
      <el-table-column prop="authName" label="权限名称"> </el-table-column>
      <el-table-column prop="path" label="全线路径"> </el-table-column>
      <el-table-column prop="level" label="权限等级">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.level == 0">一级</el-tag>
          <el-tag type="success" v-if="scope.row.level == 1"> 二级 </el-tag>
          <el-tag type="danger" v-if="scope.row.level == 2"> 三级 </el-tag>
        </template>
      </el-table-column>
    </el-table>
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
    return {
      userlist: [],
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async getuser() {
      try {
        const { data } = await this.$apis.getuserqx();
        this.userlist = data.data;
        console.log(data.data);
      } catch (error) {}
    },
  },
  //生命周期
  created() {},
  mounted() {
    this.getuser();
  },
};
</script> 

<style scoped lang="scss">
.bycconty {
  margin-top: 10px;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 5px solid;
  padding: 20px;
  box-shadow: 1px 1px 5px aqua;
}
</style>
