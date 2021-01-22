<template>
  <div class="bycconty">
    <el-alert
      title="注意:只允许为第三级分类设置相关参数！"
      type="warning"
      show-icon
      effect="dark"
      :closable="false"
    >
    </el-alert>
    <p>
      <span>选择商品分类:&nbsp;&nbsp;&nbsp;</span>
      <el-cascader
        v-model="selectKeys"
        :options="options"
        expandTrigger="hover"
        :props="catProps"
        @change="changeuser"
      ></el-cascader>
    </p>
    <!-- 表格主题内容 -->
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in panels"
        :key="index"
        :label="item.labelText"
      >
        <!-- 添加按钮 -->
        <el-button
          type="primary"
          size="mini"
          style="margin-bottom: 15px"
          :disabled="flag"
          >{{ item.buttonText }}</el-button
        >
        <!-- 表格 -->
        <el-table
          :data="tableData"
          style="width: 100%; margin-bottom: 20px"
          border
        >
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-tag
                  closable
                  type="''"
                  style="margin-right: 15px"
                  v-for="(itm, index) in scope.row.attr_vals.split(',')"
                  :key="index"
                >
                  {{ itm }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                  >+ New Tag</el-button
                >
              </el-form>
            </template>
          </el-table-column>
          <el-table-column width="50"></el-table-column>
          <el-table-column type="index" label="#" width="60"> </el-table-column>
          <el-table-column :label="item.l" width="630">
            <template slot-scope="scope">
              {{ scope.row.attr_name }}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="bianji(scope.row.cat_id, scope.row.attr_name)"
                >修改</el-button
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
      </el-tab-pane>
    </el-tabs>

    <!-- 修改 -->
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
      // 层级
      catProps: {
        cahildren: "children",
        label: "cat_name",
        value: "cat_id",
      },
      selectKeys: [],
      options: [],
      // 切换
      panels: [
        {
          name: "many",
          buttonText: "添加参数",
          labelText: "动态参数",
          l: "参数名称",
        },
        {
          name: "only",
          buttonText: "添加属性",
          labelText: "静态属性",
          l: "属性名称",
        },
      ],
      // 内容数据
      tableData: [],
      inputVisible: false,
      inputValue: "",
      sel: "many",
      flag: true,
      // 修改
      dialogFormVisiblle: false,
      id: 0,
      formm: {
        cat_name: "",
      },
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    // 搜索tab是什么模式
    handleClick(tab) {
      console.log(tab, event);
      if (tab.label == "动态参数") {
        this.sel = "many";
        this.changeuser();
      } else {
        this.sel = "only";
        this.changeuser();
      }
    },
    showInput() {
      this.inputVisible = true;
    },
    handleInputConfirm() {
      this.inputVisible = false;
    },
    // 渲染层级
    async getuserlist() {
      try {
        const { data } = await this.$apis.getcategor();
        this.options = data.data;
      } catch (error) {}
    },
    async changeuser() {
      // 判断是不是第三级  不是三级弹出提示
      if (this.selectKeys.length < 3) {
        this.$message({
          message: "只允许为三级分类设置参数！",
          type: "warning",
        });
        return false;
      }
      let id = this.selectKeys[2];
      console.log(this.nameset);
      // 获取数据根据条件
      try {
        const { data } = await this.$apis.getcatmany(id, this.sel);
        this.flag = false;
        console.log(data);
        this.tableData = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    // 删除
    async del(id) {
      try {
        await this.$ask("是否永久删除?");
        const { data } = await this.$apis.delfenlei(id);
        this.getuserlist();
      } catch (error) {
        this.$error("已取消");
      }
    },
    // 修改
    bianji(id, cat_name) {
      this.id = id;
      this.formm.cat_name = cat_name;
      this.dialogFormVisiblle = true;
    },
    // 修改
    async btngoodsxg() {
      try {
        const { data } = await this.$apis.setFnelist(
          this.selectKeys[2],
          this.id,
          this.this.formm.cat_name,
          this.sel
        );
        this.$success("修改成功");
        this.dialogFormVisiblle = false;
        this.getuserlist();
      } catch (error) {
        console.log(error);
      }
    },
  },
  //生命周期
  created() {},
  mounted() {
    this.getuserlist();
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
.input-new-tag {
  width: 130px;
  margin-left: 15px;
}
</style>
