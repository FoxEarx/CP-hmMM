<template>
  <el-row type="flex" justify="space-around">
    <el-col>
      <el-form ref="form" :inline="true">
        <el-form-item label="关键字">
          <el-input
            ref="id"
            v-model.trim="search"
            placeholder="根据文章标题搜索"
            value=""
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-button size="mini" @click="clearInput">清除</el-button>
        <el-button size="mini" type="primary" @click="searchInput">
          搜索</el-button
        >
      </el-form>
    </el-col>
    <el-col :span="6">
      <el-row type="flex" justify="end">
        <el-button type="success" icon="el-icon-edit">新增目录</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      value1: "",
      options: [
        {
          value: 1,
          label: "启用",
        },
        {
          value: "2",
          label: "禁用",
        },
      ],
      value: "",
      search: "",
    };
  },

  created() {},

  methods: {
    searchInput() {
      if (this.search !== "" || this.value !== "") {
        this.$emit("inpVal", this.search, this.value);
        console.log(this.search, this.value);
      } else {
        this.$message.error("请输入查询条件");
      }
    },
    clearInput() {
      console.log("清除");
      this.search = "";
      this.value = "";
    },
  },
};
</script>

<style scoped lang="less">
.el-row {
  height: 32px;
}
.el-form {
  height: 32px;
}
:deep(.el-form--inline .el-form-item) {
  vertical-align: unset;
}
.el-col-24 {
  height: 32px;
}
.el-button--mini {
  height: 32px;
}
.el-form-item__label {
  height: 32px;
}
:deep(.el-input__inner) {
  height: 32px;
}
.el-button--medium {
  padding: 8px 20px;
}
</style>
