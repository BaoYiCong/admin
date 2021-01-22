<template>
  <div class="bycconty">
    <!-- 头部 -->
    <el-alert title="添加商品信息" type="info" show-icon center> </el-alert>
    <!-- 步进条 -->
    <el-steps :active="setactive" align-center style="margin-top: 20px">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <!-- 主体内容 -->
    <el-tabs
      :tab-position="tabPosition"
      style="margin-top: 25px"
      :before-leave="changePanel"
    >
      <el-tab-pane label="基本信息"
        ><waibugoods ref="baseinfo"></waibugoods
      ></el-tab-pane>
      <el-tab-pane label="参数管理"> 参数管理</el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片">
        <canshu></canshu>
      </el-tab-pane>
      <el-tab-pane label="商品内容">
        <goodsEcksdc></goodsEcksdc>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import goodsEcksdc from "../../../../components/Goods/GoodsEcksdc";
import canshu from "../../../../components/Goods/GoodsFleel";
import waibugoods from "../../../../components/Goods/GoodsBaselnfo";
export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {
    waibugoods,
    canshu,
    goodsEcksdc,
  },
  // 组件状态值
  data() {
    return {
      // 步进条完成的
      setactive: 0,
      tabPosition: "left",
      listbjt: [
        { label: "基本信息" },
        { label: "参数管理" },
        { label: "商品属性" },
        { label: "商品图片" },
        { label: "参数管理" },
        { label: "商品内容" },
      ],
    };
    w;
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async changePanel(active, oldActive) {
      if (oldActive == 0) {
        try {
          const info = await this.$refs.baseinfo.getResult();
        } catch (error) {
          console.log(error);
          return Promise.reject("");
        }
      }
      this.setactive = parseInt(active);
    },
  },
  //生命周期
  created() {},
  mounted() {},
};
</script> 

<style scoped lang="scss">
.el-step__title .is-process {
  font-weight: 0;
  font-size: 12px;
}
.bycconty {
  height: 900px;
  margin-top: 10px;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 5px solid;
  padding: 20px;
  box-shadow: 1px 1px 5px aqua;
}
</style>
