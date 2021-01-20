<template>
  <div class="bycconty">
    <el-button type="primary">添加分类</el-button>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      border
      row-key="cat_id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="cat_name" label="分类名称"></el-table-column>
      <el-table-column label="是否有效">
        <i class="el-icon-success" style="color: #39CE39"></i>
      </el-table-column>
      <el-table-column prop="cat_level" label="排序">
        <template slot-scope="scope">
          <el-tag type="''" effect="dark" v-if="scope.row.cat_level == 0"
            >一级</el-tag
          >
          <el-tag type="label" effect="dark" v-if="scope.row.cat_level == 1"
            >二级</el-tag
          >
          <el-tag type="danger" effect="dark" v-if="scope.row.cat_level == 2"
            >三级</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="bianji(scope.row.cat_id, scope.row.cat_name)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="del(scope.row.cat_id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加 -->
    <el-dialog title="添加商品分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类分类">
          <el-input v-model="form.cat_level" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="btngoodsxg">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 编辑 -->
    <el-dialog title="修改分类" :visible.sync="dialogFormVisiblle">
      <el-form :model="formm">
        <el-form-item label="分类名称">
          <el-input v-model="formm.cat_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisiblle = false">取 消</el-button>
        <el-button type="primary" @click="btngoodsxg">确 定</el-button>
      </div>
    </el-dialog>
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
      hasChildren: true,
      tableData: [],
      pagenum: 1,
      pagesize: 5,
      total: 1,
      // 添加
      dialogFormVisible: false,
      form: {
        cat_name: "",
        cat_level: "",
      },
      dialogFormVisiblle: false,
      formm: {
        cat_name: "",
      },
      id: "",
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    // 编辑
    bianji(id, cat_name) {
      this.id = id;
      this.formm.cat_name = cat_name;
      this.dialogFormVisiblle = true;
    },
    // 添加
    async btngoodsxg() {
      try {
        const { data } = await this.$apis.classgoods(
          this.id,
          this.formm.cat_name
        );
        this.$message.success("修改成功");
        this.dialogFormVisiblle = false;
        this.getusergoods();
      } catch (error) {
        console.log(error);
      }
    },
    async getusergoods() {
      try {
        const { data } = await this.$apis.getgoodslist(
          this.pagenum,
          this.pagesize
        );

        this.tableData = data.data.result;
        this.total = data.data.total;
        console.log(this.tableData);
      } catch (error) {
        console.log(error);
      }
    },
    // 分页
    handleSizeChange(size) {
      this.pagesize = size;
      this.getusergoods();
    },
    handleCurrentChange(num) {
      this.pagenum = num;
      this.getusergoods();
    },
    // 删除
    async del(id) {
      try {
        await this.$ask("此操作将永久删除,是否继续？");
        this.$apis.delfenlei(id);
        this.$message.success("删除成功");
        this.getusergoods();
      } catch (error) {
        this.$message.error("已取消");
      }
    },
  },
  //生命周期
  created() {},
  mounted() {
    this.getusergoods();
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
