<template>
  <div class="bycconty">
    <el-button type="primary" @click="dialogFormVisible = true"
      >添加角色</el-button
    >
    <el-table :data="qxuserlist" style="width: 100%" :stripe="true">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="(item, index) in scope.row.children" :key="index">
            <el-col :span="2" style="padding: 5px; text-align: center">
              <el-tag closable :type="''" effect="dark">
                {{ item.authName }}
              </el-tag>
            </el-col>
            <el-col :span="22">
              <el-row
                type="flex"
                v-for="(item, index) in item.children"
                :key="index"
              >
                <el-col :span="4" style="padding: 5px; text-align: center">
                  <el-tag closable type="success" effect="dark">
                    {{ item.authName }}
                  </el-tag>
                </el-col>

                <el-col :span="18" style="padding: 5px">
                  <el-tag
                    closable
                    type="warning"
                    effect="dark"
                    v-for="(item, index) in item.children"
                    :key="index"
                    style="margin-right: 10px"
                  >
                    {{ item.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="#" prop="id" type="index"> </el-table-column>
      <el-table-column label="角色名称" prop="roleName"> </el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
      <el-table-column label="操作" prop="desc">
        <template slot-scope="scope">
          <div>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="subuser(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="del(scope.row.id)"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-star-off"
              size="mini"
              @click="xsyc"
              >分配权限</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加用户 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="角色名称" :label-width="'80px'" prop="roleName">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="'80px'" prop="roleDesc">
          <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="adduser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="修改角色信息" :visible.sync="ddialogFormVisible">
      <el-form :model="xglist" :rules="rules" ref="ruleForm">
        <el-form-item label="角色名称" :label-width="'80px'" prop="roleName">
          <el-input v-model="xglist.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="'80px'" prop="roleDesc">
          <el-input v-model="xglist.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="xguser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 树形控件 修改 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisibledd">
      <el-tree
        :data="arr"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
      >
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibledd = false">取 消</el-button>
        <el-button type="primary" @click="btnamend()">确 定</el-button>
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
      //树形图显示
      dialogFormVisibledd: false,
      id: 1,
      qxuserlist: [],
      dialogFormVisible: false,
      ddialogFormVisible: false,
      form: {
        roleName: "",
        roleDesc: "",
      },
      rules: {
        roleName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        roleDesc: [{ required: true, message: "请输入描述", trigger: "blur" }],
      },
      xglist: {
        roleName: "",
        roleDesc: "",
      },
      // 树形控件
      data: [],

      defaultProps: {
        children: "children",
        label: "authName",
      },
      arr: [],
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    // 树形图显示
    async xsyc() {
      this.dialogFormVisibledd = true;
      try {
        const { data } = await this.$apis.updataqx();
        this.arr = data.data;
      } catch (error) {}
    },
    async btnamend() {
      try {
        const {
          data: { meta },
        } = await this.$apis.updataqxx(this.arr);
        if (meta.msg == "200") {
          this.$message.success("更改权限成功！");
          this.dialogFormVisibledd = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    //获取数据
    async getuser() {
      try {
        const { data } = await this.$apis.getgluser();
        console.log(data);
        this.qxuserlist = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async adduser() {
      try {
        const {
          data: { meta },
        } = await this.$apis.adduserqx(this.form);
        console.log(meta);
        if (meta.status == "201") {
          this.$message.success("添加成功");
          this.dialogFormVisible = false;
          this.form = {};
          this.getuser();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async del(id) {
      try {
        await this.$ask("此操作将永久删除,是否继续？");
        this.$apis.ddel(id);
        this.$message.success("删除成功");
        this.getuser();
      } catch (error) {
        this.$message.error("已取消");
        console.log(error);
      }
    },
    // 修改第一步显示框 数据渲染
    subuser(data) {
      this.xglist = data;
      this.ddialogFormVisible = true;
    },
    //修改第二步
    async xguser(id) {
      try {
        const {
          data: { meta },
        } = await this.$apis.xguser(this.xglist);
        if (meta.status == "200") {
          this.$message.success("修改成功");
          this.ddialogFormVisible = false;
          this.getuser();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  //生命周期
  created() {
    this.getuser();
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
