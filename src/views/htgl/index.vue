<template>
  <div class="bycbig">
    <el-container>
      <el-header>
        <div class="header-left">
          <img src="../../assets/heima.b5a855ee.png" alt="" />
          <h1>电商后台管理系统</h1>
        </div>
        <div>
          <el-button type="info" @click="outlogin">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="flag ? '64px' : '200px'">
          <p class="bp" @click="changeflag">|||</p>
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            :default-active="activePath"
            active-text-color="#ffd04b"
            :collapse="flag"
            router
          >
            <el-submenu
              :index="item.id.toString()"
              v-for="item in menuList"
              :key="item.id"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">{{ item.authName }}</span>
              </template>

              <el-menu-item
                @click="byc('/' + it.path)"
                :index="'/' + it.path"
                v-for="(it, key) in item.children"
                :key="key"
                >{{ it.authName }}</el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="bycman">
          <div v-show="flag3">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }" v-show="flag1">
                首页
              </el-breadcrumb-item>
              <el-breadcrumb-item>{{ this.aa }}</el-breadcrumb-item>
              <el-breadcrumb-item>{{ this.bb }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "htgl",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      flag: false,
      flag1: false,
      flag3: true,
      activePath: "/home",
      menuList: [],
      mbx: [],
      aa: "",
      bb: "",
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    //跳转：
    byc(c) {
      sessionStorage.setItem("activePath", c);
    },
    changeflag() {
      this.flag = !this.flag;
    },
    outlogin() {
      sessionStorage.removeItem("token");
    },
  },
  //生命周期
  async mounted() {
    // 获取左侧列表栏数据created() {},
    try {
      const { data: data } = await this.$apis.getMenus();
      this.menuList = data.data;
    } catch (error) {
      console.log(error);
    }
  },
  updated() {
    const urlPath = this.$route.path.replace("/", "");
    for (let parentPath of this.menuList) {
      for (let childPath of parentPath.children) {
        if (childPath.path === urlPath) {
          this.aa = parentPath.authName;
          this.bb = childPath.authName;
          this.flag3 = true;
          return;
        }
      }
    }
    if (urlPath == "hello") {
      this.flag3 = false;
    }
  },
};
</script> 

<style scoped lang="scss">
.bycbig {
  display: flex;
  width: 100%;
  height: 100%;
}
.bycman {
  background: #eaedf1;
  padding: 20px;
  box-sizing: border-box;
}
.el-aside {
  height: 100%;
  background: rgb(84, 92, 100);
}
.header-left {
  display: flex;
  align-items: center;
  img {
    margin-right: 15px;
  }
  h1 {
    color: #ffffff;
  }
}
.el-header {
  height: 60px;
  display: flex;
  align-items: center;
  background: #373d41;
  justify-content: space-between;
}
.bp {
  background-color: #4a5064;
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 28px;
  cursor: pointer;
  letter-spacing: 0.12em;
  margin: 0;
}
</style>
