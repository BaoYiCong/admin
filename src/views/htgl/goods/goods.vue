<template>
  <div class="bycconty">
    <!-- 头部 -->
    <el-form :inline="true">
      <el-form-item>
        <el-input
          placeholder="请输入内容"
          v-model="query"
          class="input-with-select"
          style="width: 400px"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="chaxun"
          ></el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">添加用户</el-button>
      </el-form-item>
    </el-form>

    <!-- 内容 -->
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      stripe
      style="width: 100%"
    >
      <el-table-column type="index" width="50" label="#"> </el-table-column>
      <el-table-column property="goods_name" label="商品名称" width="600px">
      </el-table-column>
      <el-table-column
        property="goods_price"
        label="商品价格(元)"
      ></el-table-column>
      <el-table-column
        property="goods_weight"
        label="商品重量"
      ></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ new Date("Y-m-d H:i:s", scope.row.upd_time) }}
        </template>
      </el-table-column>
      <el-table-column property="name" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="del(scope.row)"
          ></el-button>
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
      // 模糊搜索关键字
      query: "",
      // 页数
      pagenum: 1,
      pagesize: 10,
      // 用户列表
      tableData: [],
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    formatDate(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    },
    // 模糊搜索
    chaxun() {},
    // 获取商品列表
    async getgoods() {
      try {
        const { data } = await this.$apis.getgoods(
          this.query,
          this.pagenum,
          this.pagesize
        );
        this.tableData = data.data.goods;
        console.log(data.data.goods);
      } catch (error) {}
    },
    // 删除
    async del(row) {
      console.log(row);
      try {
        await this.$ask("此操作将永久删除,是否继续？");
        const {
          data: { meta },
        } = await this.$apis.delgoodsonce(row.goods_id);
        this.$message.success("删除成功");
        this.getgoods();
      } catch (error) {
        this.$message.error("已取消");
      }
    },
  },
  //生命周期
  created() {
    this.getgoods();
  },
  mounted() {},
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
