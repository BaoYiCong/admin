<template>
  <div class="bycconty">
    <!-- 头部 -->
    <el-form :inline="true">
      <el-form-item>
        <el-input
          placeholder="请输入内容"
          v-model="queryModel.query"
          class="input-with-select"
          style="width: 350px"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="chaxun"
          ></el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialogFormVisible = true"
          >添加用户</el-button
        >
      </el-form-item>
    </el-form>
    <!-- table -->
    <el-table border style="width: 100%" :data="datalist" stripe>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
      <el-table-column prop="create_time" label="电话" width="180">
      </el-table-column>
      <el-table-column prop="role_name" label="角色" width="180">
      </el-table-column>
      <el-table-column prop="name" label="状态" width="180">
        <template slot-scope="scope">
          <div>
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#409EFF"
              inactive-color="#DCDFE6"
              @change="offwitch(scope.row)"
            >
            </el-switch>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="bianjiuser(scope.row)"
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-star-off"
            circle
            @click="bianjiname(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="del(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="adduser" :rules="addRule" ref="ruleForm">
        <el-form-item label="用户名" :label-width="'80px'" prop="username">
          <el-input v-model="adduser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="'80px'" prop="password">
          <el-input
            type="password"
            v-model="adduser.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="'80px'" prop="email">
          <el-input v-model="adduser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="'80px'" prop="create_time">
          <el-input v-model="adduser.create_time" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setuserlist">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="dialwogFormVisible">
      <el-form :model="autuser" :rules="addRule" ref="ruleForm">
        <el-form-item label="用户名" :label-width="'80px'">
          <el-input
            v-model="autuser.username"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="'80px'" prop="email">
          <el-input v-model="autuser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="'80px'" prop="create_time">
          <el-input v-model="autuser.create_time" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialwogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="btnuseradd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryModel.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="queryModel.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 权限编辑 -->
    <el-dialog title="分配角色" :visible.sync="xianshi">
      <p>
        当前的用户: <span>{{ name }}</span>
      </p>
      <p>
        当前的角色: <span>{{ jsx }}</span>
      </p>
      <p>
        分配新角色:
        <el-select v-model="region" placeholder="请选择">
          <el-option
            :label="item.roleName"
            :value="item.id"
            v-for="item in arrbyc"
            :key="item.id"
            >{{ item.roleName }}</el-option
          >
        </el-select>
      </p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="xianshi = false">取 消</el-button>
        <el-button type="primary" @click="btnqxianxiugai">确 定</el-button>
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
    var checkMobile = (rule, value, callback) => {
      value = value || "";
      if (/^\s*$/.test(value)) {
        return callback(new Error("手机号不能为空"));
      }
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error("手机号输入错误"));
      }
      callback();
    };
    var checkEmail = (rule, value, callback) => {
      value = value || "";
      if (/^\s*$/.test(value)) {
        return callback(new Error("邮箱不能为空"));
      }
      if (!/^[a-zA-Z0-9-_+]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(value)) {
        return callback(new Error("邮箱输入错误"));
      }
      callback();
    };
    return {
      region: 0,
      xianshi: false,
      name: "",
      jsx: "",
      dialwogFormVisible: false,
      datalist: [],
      dialogFormVisible: false,
      //添加用户
      adduser: {
        username: "",
        password: "",
        email: "",
        create_time: "",
      },
      // 编辑用户
      autuser: {
        username: "",
        email: "",
        create_time: "",
      },
      addRule: {
        //用户名
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "密码长度必须是6-15位", trigger: "blur" },
        ],
        email: [{ validator: checkEmail, trigger: "blur" }],
        create_time: [{ validator: checkMobile, trigger: "blur" }],
      },
      // 查询类型
      queryModel: {
        query: "",
        pagenum: 1,
        pagesize: 5,
      },
      total: 0,
      idd: 0,
      arrbyc: [],
      idc: 0,
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async btnqxianxiugai(id) {
      try {
        const { data } = this.$apis.setuserqxian(this.idc, this.region);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    bianjiname(arr) {
      this.xianshi = true;
      this.idc = arr.id;
      this.name = arr.username;
      this.jsx = arr.role_name;
    },
    async getuserqxx() {
      try {
        const { data } = await this.$apis.getgluser();
        console.log(data.data);
        this.arrbyc = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    // 编辑用户
    bianjiuser(data) {
      this.autuser.username = data.username;
      this.autuser.email = data.email;
      this.autuser.create_time = data.create_time;
      this.idd = data.id;
      this.dialwogFormVisible = true;
      console.log(this.idd);
    },
    async btnuseradd() {
      console.log(this.idd);
      try {
        const {
          data: { meta },
        } = await this.$apis.editUser(
          this.idd,
          this.autuser.email,
          this.autuser.create_time
        );
        if (meta.status == "200") {
          this.$message.success("更新成功");
          this.dialwogFormVisible = false;
          this.getdata();
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 分页
    handleSizeChange(size) {
      console.log(size);
      this.queryModel.pagesize = size;
      this.getdata();
    },
    handleCurrentChange(size) {
      this.queryModel.pagenum = size;
      this.getdata();
    },
    // 用户信息
    async getdata() {
      try {
        const { data } = await this.$apis.getUsers(this.queryModel);
        console.log(data);
        this.datalist = data.data.users;
        this.total = data.data.total;
      } catch (error) {
        console.log(error);
      }
    },
    //搜索
    chaxun() {
      this.getdata();
    },
    // 添加用户
    async setuserlist() {
      try {
        const {
          data: { meta },
        } = await this.$apis.adduser(this.adduser);
        console.log(meta);
        if (meta.status == "201") {
          this.$message.success(meta.msg);
        }
        this.getdata();
        this.adduser = {};
        this.dialogFormVisible = false;
      } catch (error) {
        console.log(error);
      }
    },
    // 状态变更
    async offwitch(e) {
      try {
        const {
          data: { meta },
        } = await this.$apis.offswitch(e);
        if (meta.status == "200") {
          this.$message.success(meta.msg);
        } else {
          this.$message.error(meta.msg);
        }
      } catch (error) {}
    },
    // 删除
    async del(id) {
      try {
        await this.$ask("此操作将永久删除,是否继续？");
        this.$apis.deletelist(id);
        this.$message.success("删除成功");
        this.getdata();
      } catch (error) {
        this.$message.error("已取消");
        console.log(error);
      }
    },
  },
  //生命周期
  created() {
    this.getdata();
    this.getuserqxx();
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
