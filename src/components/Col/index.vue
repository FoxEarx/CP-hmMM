<template>
  <el-col :span="6">
    <el-form-item :label="label">
      <slot>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </slot>
    </el-form-item>
  </el-col>
</template>

<script>
export default {
  data() {
    return {};
  },

  created() {},

  methods: {},

  props: {
    label: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped lang="scss">
.el-col-6 {
  height: 50px;
  text-align: right;
}
::v-deep.el-form-item--medium .el-form-item__label {
  width: 80px;
  height: 32px;
  padding-right: 12px;
}
.el-input--medium {
  height: 32px;
  width: 305.75px;
}
::v-deep.el-input--medium .el-input__inner {
  width: 100%;
  height: 32px;
}
</style>
