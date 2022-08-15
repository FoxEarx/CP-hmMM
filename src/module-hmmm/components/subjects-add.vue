<template>
  <el-dialog @close="onClose" :title="showName" :visible="visible" width="22%">
    <!-- 表单区域 -->
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="学科名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch
          v-model="form.value"
          :active-value="1"
          :inactive-value="0"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form-item>
    </el-form>
    <!-- 表单区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click.native="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { add, update } from "@/api/hmmm/subjects";
export default {
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    val: {
      type: Object,
    },
  },
  data() {
    return {
      form: {
        name: "",
        value: 1,
      },
      rules: {
        name: [{ required: true, message: "请输入学科名称", target: blur }],
      },
    };
  },
  computed: {
    showName() {
      return this.$store.state.subjects.EditInfo.id === undefined
        ? "新增学科"
        : "修改学科";
    },
  },
  methods: {
    onClose() {
      this.$emit("update:visible", false);
      this.$refs.form.resetFields();
    },
    async onSave() {
      await this.$refs.form.validate();
      if (this.$store.state.subjects.EditInfo.id) {
        await update({
          id: this.$store.state.subjects.EditInfo.id,
          subjectName: this.form.name,
          isFrontDisplay: this.form.value,
        });
      } else {
        await add({
          subjectName: this.form.name,
          isFrontDisplay: this.form.value,
        });
      }

      this.$message.success("操作成功");
      this.onClose();
      this.$emit("add-success");
    },
    getEdit(val) {
      console.log(this.$store.state.subjects.EditInfo.id);

      this.form.name = val.subjectName;
      return (this.form.value = val.isFrontDisplay === "是" ? 1 : 0);
    },
  },
};
</script>

<style scoped lang="less"></style>
