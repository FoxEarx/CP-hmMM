<template>
  <el-dialog :title="dialogTitle" :visible="visible" width="400px">
    <el-form ref="form" label-width="80px" :model="ruleForm" :rules="rules">
      <el-form-item label="所选学科">
        <el-select v-model="ruleForm.subjectName" placeholder="请选择">
          <el-option
            v-for="item in tableData"
            :key="item.subjectId"
            :label="item.subjectName"
            :value="item.subjectID"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="目录名称" prop="tagName">
        <el-input
          v-model="ruleForm.tagName"
          placeholder="请输入目录名称"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="ensure">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { add, update } from "@/api/hmmm/tags";
export default {
  data() {
    return {
      ruleForm: {
        subjectName: "",
        tagName: "",
      },
      rules: {
        tagName: [
          { required: true, message: "请输入标签名称", trigger: "blur" },
          { min: 3, message: "字符长度需超过3个字符", trigger: "blur" },
        ],
      },
      state: "",
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    dialogTitle: {
      type: String,
      required: true,
    },
    tableData: {
      type: Array,
    },
    Allinfo: {
      type: Object,
    },
  },
  created() {},

  methods: {
    cancel() {
      //   console.log("取消");
      (this.ruleForm = {
        subjectName: "",
        tagName: "",
      }),
        this.$emit("update:visible", false);
    },
    async ensure() {
      await this.$refs.form.validate();
      if (this.state == 0) {
        if (
          this.ruleForm.subjectName.length !== 0 ||
          this.ruleForm.tagName.length !== 0
        ) {
          const data = {
            subjectID: this.ruleForm.subjectName,
            tagName: this.ruleForm.tagName,
          };
          this.ruleForm = data;
          await add(data);
          this.$message.success("新增标签成功");
          this.$emit("update:visible", false);
          this.$emit("getAllList");
        } else {
          this.$message.error("请检查输入内容");
        }
      } else {
        if (
          this.ruleForm.subjectName.length !== 0 ||
          this.ruleForm.tagName.length !== 0
        ) {
          const data = {
            id: this.Allinfo.id,
            subjectID: this.ruleForm.subjectName,
            tagName: this.ruleForm.tagName,
          };
          this.ruleForm = data;
          await update(data);
          this.$message.success("修改标签成功");
          this.$emit("update:visible", false);
          this.$emit("getAllList");
        } else {
          this.$message.error("请检查输入内容");
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
:deep(.el-select > .el-input) {
  width: 280px;
}
</style>
