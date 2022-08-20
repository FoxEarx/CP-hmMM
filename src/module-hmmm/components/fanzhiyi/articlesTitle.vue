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
        <el-button type="success" icon="el-icon-edit" @click="add"
          ><slot
        /></el-button>
      </el-row>
    </el-col>

    <Dialog
      :visible.sync="visibleShowDialog"
      @getAllList="getAllList"
      :dialogTitle="dialogTitle"
    />
  </el-row>
</template>

<script>
import Dialog from "./articlesDialog.vue";
export default {
  data() {
    return {
      form: {},
      value1: "",
      options: [
        {
          value: "已启用",
          label: "启用",
        },
        {
          value: "已禁用",
          label: "禁用",
        },
      ],
      value: "",
      search: "",
      visibleShowDialog: false, //新增文章弹出框
      dialogTitle: "",
      joinState: "1",
    };
  },
  props: {
    tableData: {
      type: Array,
    },
  },
  created() {},
  components: {
    Dialog,
  },
  methods: {
    searchInput() {
      // console.log(this.tableData);
      const arr = [];
      if (this.search !== "" || this.value !== "") {
        this.tableData.filter((item) => {
          if (
            item.title.indexOf(this.search) !== -1 &&
            item.state.indexOf(this.value) !== -1
          ) {
            arr.push(item);
          }
          this.$emit("searchlist", arr);
        });
        // console.log(this.search, this.value);
      } else {
        this.$message.error("请输入查询条件");
      }
    },
    // 清除
    clearInput() {
      if (this.search == "" && this.value == "") return;
      this.search = "";
      this.value = "";
      this.$emit("clear");
    },
    // 新增文章
    add() {
      this.dialogTitle = "新增文章";
      this.visibleShowDialog = true;
    },
    getAllList() {
      this.$emit("getAllList");
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
