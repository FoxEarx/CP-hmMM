<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    width="50%"
    @close="onClose"
    ><el-form
      ref="form"
      :model="formData"
      :rules="rulesFormData"
      label-width="120px"
    >
      <el-form-item label="权限状态:">
        <el-radio-group
          @change="change"
          v-model="permissions"
          :disabled="disabled"
        >
          <el-radio label="菜单"></el-radio>
          <el-radio label="权限点"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限组名称：">
        <el-select v-model="formData.region" ref="tree">
          <el-option value="">
            <el-tree
              :highlight-current="true"
              default-expand-all
              :data="data"
              :props="defaultProps"
              @node-click="nodeClick"
              node-key="id"
              :current-node-key="current"
            ></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限代码：" prop="code">
        <el-input v-model="formData.code" class="Width"></el-input>
      </el-form-item>
      <el-form-item label="权限标题：" prop="title">
        <el-input v-model="formData.title" class="Width"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "tanceng",
  data() {
    return {
      permissions: this.permission,
      formData: {
        is_point: "",
        pid: "",
        code: this.row.code || "",
        title: this.row.title || "",
        region: this.father.title || "",
      },
      rulesFormData: {
        code: [{ required: true, message: "代码不能为空", trigger: "blur" }],
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
      },
      defaultProps: {
        label: "title",
        children: "childs",
      },
      current: this.father.id,
    };
  },

  created() {},

  methods: {
    onClose() {
      this.$emit("onClose");
    },
    nodeClick(row) {
      console.log(row);
      this.formData.region = row.title;
      this.permission === "菜单"
        ? (this.formData.is_point = false)
        : (this.formData.is_point = true);
      this.formData.pid = row.id;
      this.$refs.tree.blur();
    },
    async onSave() {
      if (this.formData.pid === "") {
        this.formData.pid = this.row.pid;
        this.permission === "菜单"
          ? (this.formData.is_point = false)
          : (this.formData.is_point = true);
      }
      await this.$refs.form.validate();
      this.$emit("onSave", this.formData);
      this.$emit("getList");
      this.onClose();
    },
    change(val) {
      this.$emit("change", val);
    },
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
    },
    permission: {
      type: String,
      default: "菜单",
    },
    data: {
      type: Array,
      required: true,
    },
    row: {},
    father: {},
  },
};
</script>

<style scoped lang="less">
/deep/.el-dialog__body {
  margin-left: 100px;
}
.Width {
  width: 300px;
}
.el-select-dropdown__item.selected {
  background-color: #fff;
}
.el-select-dropdown__item {
  overflow: initial;
  height: 200px;
  background-color: #fff;
}
/deep/.el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background-color: #f0f7ff;
  color: #409eff;
}
</style>
