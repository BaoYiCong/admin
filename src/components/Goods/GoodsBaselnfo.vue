<template>
  <div style="height: 900px">
    <el-form
      label-position="right"
      :model="addgoods"
      :rules="rules"
      ref="ruleForm"
    >
      <el-form-item prop="goods_name" label="商品名称">
        <el-input
          v-model="addgoods.goods_name"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item prop="goods_price" label="商品价格">
        <el-input
          v-model="addgoods.goods_price"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item prop="goods_weight" label="商品重量">
        <el-input
          v-model="addgoods.goods_weight"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item prop="goods_number" label="商品数量">
        <el-input
          v-model="addgoods.goods_number"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item prop="options" label="选择商品分类">
        <el-cascader
          v-model="selectKeys"
          :options="options"
          expandTrigger="hover"
          :props="catProps"
          @change="changeuser"
        ></el-cascader>
      </el-form-item>
    </el-form>
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
    // 验证价格
    const validPrice = (rule, value, callback) => {
      var num = parseFloat(value);
      if (isNaN(num)) {
        return callback(new Error("价格是能为数字"));
      }
      if (num <= 0) {
        return callback(new Error("价格必须大于0"));
      }
      if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        return callback(new Error("价格最多只能保留两位小数"));
      }
      callback();
    };
    // 验证重量
    const validWeight = (rule, value, callback) => {
      if (!/^\d+$/.test(value)) {
        return callback(new Error("重量必须为整数"));
      }
      const num = parseInt(value);
      if (num <= 0) {
        return callback(new Error("重量必须大于0"));
      }
      callback();
    };
    // 验证分类
    const validCategory = (rule, value, callback) => {
      if (value != "") {
        return callback(new Error("商品分类必选"));
      }
      callback();
    };
    // 验证数量
    const validTotal = (rule, value, callback) => {
      if (!/^\d+$/.test(value)) {
        return callback(new Error("数量必须为整数"));
      }
      const num = parseInt(value);
      if (num <= 0) {
        return callback(new Error("数量必须大于0"));
      }
      callback();
    };

    return {
      options: [],
      selectKeys: [],
      //表单回填
      addgoods: {
        goods_name: "",
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
      },
      // 层级
      catProps: {
        cahildren: "children",
        label: "cat_name",
        value: "cat_id",
      },
      //   验证
      rules: {
        //   名称
        goods_name: [
          { required: true, message: "商品不能为空", trigger: "blur" },
          { min: 2, max: 10, message: "商品名称长度2-10", trigger: "blur" },
        ],
        // 价格
        goods_price: [
          { required: true, message: "商品价格不能为空", trigger: "blur" },
          { validator: validPrice, trigger: "blur" },
        ],
        // 重量
        goods_weight: [
          { required: true, message: "重量不能为空", trigger: "blur" },
          { validator: validWeight, trigger: "blur" },
        ],
        // 数量
        goods_number: [
          { required: true, message: "数量不能为空", trigger: "blur" },
          { validator: validTotal, trigger: "blur" },
        ],
        options: [{ trigger: "change" }],
      },
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    //获取商品分类
    async getuserlist() {
      try {
        const { data } = await this.$apis.getcategor();
        this.options = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    changeuser(value) {
      if (value.length < 3) {
        this.$warn("商品分类必须选中三级");
      }
    },
    async getResult() {
      try {
        await this.$refs.ruleForm.validate();
        return this.options;
      } catch (error) {
        console.log(error, "getResult");
        throw error;
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

<style scoped>
</style>