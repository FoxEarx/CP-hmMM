<template>
  <el-dialog @close="onClose" :title="showName" :visible="visible" width="22%">
    <!-- 表单区域 -->
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="所属学科">
        <el-select v-model="form.name" placeholder="请选择" class="select">
          <el-option
            v-for="item in tosimple"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="目录名称" prop="directoryName">
        <el-input v-model="form.directoryName"></el-input>
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
import { add, update } from "@/api/hmmm/directorys";
export default {
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    val: {
      type: Object,
    },
    tosimple: {
      type: Array,
    },
  },
  data() {
    return {
      form: {
        name: "",
        directoryName: "",
      },
      value: "",
      rules: {
        directoryName: [
          { required: true, message: "请输入目录名称", target: blur },
        ],
      },
      isEdit: false,
    };
  },
  computed: {
    showName() {
      return this.form.name === "" ? "新增目录" : "修改目录";
    },
  },
  methods: {
    onClose() {
      this.$emit("update:visible", false);
      this.$refs.form.resetFields();
      this.isEdit = false;
      this.form = {
        name: "",
        directoryName: "",
      };
    },
    async onSave() {
      await this.$refs.form.validate();
      console.log("this.form", this.form);
      if (this.isEdit) {
        await update({
          id: this.$store.state.subjects.directorys.id,
          subjectID: this.form.name,
          directoryName: this.form.directoryName,
        });
      } else {
        await add({
          subjectID: this.form.name,
          directoryName: this.form.directoryName,
        });
      }
      this.$message.success("操作成功");
      this.onClose();
      this.$emit("add-success");
    },
    getEdit(val) {
      console.log(val);
      this.isEdit = true;
      this.form.name = val.subjectName;
      this.form.directoryName = val.directoryName;
      this.value = val.subjectID;
      console.log(this.form);
    },
  },
};
</script>

<style scoped lang="less">
.select {
  width: 100%;
}
</style>
