<template>
  <div class="bycbigbox">
    <div class="big-item">
      <div class="byc-logo">
        <img src="../../assets/logo.82b9c7a5.png" alt="" />
      </div>
      <el-form :rules="rules" ref="ruleForm" :model="ruleForm">
        <el-form-item prop="username">
          <el-input
            type="text"
            prefix-icon="el-icon-s-custom"
            v-model="ruleForm.username"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            prefix-icon="el-icon-s-cooperation"
            v-model="ruleForm.password"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="reset">重置</el-button>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
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
      ruleForm: {
        username: "admin",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入账号名称", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    login() {
      //ui 输入框验证
      this.$refs.ruleForm.validate(async (success, errorFields) => {
        //成功的情况
        if (success) {
          //在此运行代码
          try {
            //解构赋值
            const {
              data: {
                data,
                meta: { status, msg },
              },
            } = await this.$apis.login(this.ruleForm);
            // 请求成功
            if (status == 200) {
              // 成功加入本地存储token值
              const { token } = data;
              sessionStorage.setItem("token", token);
              this.$message.success("登录成功");
              this.$router.push("/htgl");
            }
            this.$message.success(msg);
            // 在此处理错误
          } catch (error) {
            //打印错误信息
            console.log(error);
          }
        } else {
          var message = "";
          console.log(errorFields);
          for (var key in errorFields) {
            var errorObj = errorFields[key];
            // 把错误信息遍历出具体错误
            errorObj.forEach((item) => {
              message += item.message + "\n";
            });
          }
          this.$message.error(message);
        }
      });
    },
    reset() {
      this.ruleForm.username = "";
      this.ruleForm.userpassword = "";
    },
  },
  //生命周期
  created() {},
  mounted() {},
};
</script> 

<style scoped lang="scss">
html,
body {
  height: 100%;
}
.bycbigbox {
  height: 100%;
  background: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
}
.big-item {
  width: 450px;
  height: 304px;
  background-color: #fff;
  box-shadow: 0 0 10px #ddd;
  border-radius: 3px;
  box-sizing: border-box;
}
.byc-logo {
  width: 130px;
  height: 130px;
  padding: 10px;
  border: 1px solid #efefef;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px #ddd;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #efefef;
  }
}
.el-form {
  padding: 0px 10px;
  box-sizing: border-box;
  margin-top: 110px;
  .el-button {
    float: right;
    margin: 0px 20px;
  }
}
</style>
