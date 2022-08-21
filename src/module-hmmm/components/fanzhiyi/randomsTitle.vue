<template>
  <el-row type="flex" justify="space-around">
    <el-col>
      <el-form ref="form" :inline="true">
        <el-form-item label="关键字">
          <el-input
            ref="id"
            v-model.trim="search"
            placeholder="负责人：樊志毅"
            value=""
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="6">
      <el-row type="flex" justify="end">
        <el-button size="mini" @click="clearInput">清除</el-button>
        <el-button size="mini" type="primary" @click="searchInput">
          搜索</el-button
        >
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      value: "",
      search: "",
    };
  },
  props: {
    tableData: {
      type: Array,
    },
  },
  created() {},
  components: {},
  methods: {
    searchInput() {
      // console.log(this.tableData);
      const arr = [];
      if (this.search !== "") {
        this.tableData.filter((item) => {
          if (item.id.indexOf(this.search) !== -1) {
            arr.push(item);
          }
          console.log(arr);
          this.$emit("searchlist", arr);
        });
        // console.log(this.search, this.value);
      } else {
        this.$message.error("请输入查询条件");
      }
    },
    // 清除
    clearInput() {
      if (this.search == "") return;
      this.search = "";
      this.$emit("clear");
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
