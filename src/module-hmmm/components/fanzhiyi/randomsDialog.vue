<template>
  <el-dialog title="题目预览" :visible="visible" width="900px" @close="onclose">
    <div>
      <el-row :gutter="20" style="padding: 10px 0">
        <el-col :span="6"
          ><div class="grid-content bg-purple">【题型】:</div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">【编号】:</div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">【难度】:</div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">【标签】:</div></el-col
        >
      </el-row>
      <el-row :gutter="20" style="padding: 10px 0">
        <el-col :span="6"
          ><div class="grid-content bg-purple">【学科】:</div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">【目录】:</div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">【方向】:</div></el-col
        >
      </el-row>
    </div>
    <hr />
    <div>
      <el-row :gutter="20" style="padding: 10px 0">
        <el-col :span="24"
          ><div class="grid-content bg-purple">【参考答案】:</div></el-col
        >
      </el-row>
      <hr />
      <el-row :gutter="20" style="padding: 10px 0">
        <el-col :span="24"
          ><div class="grid-content bg-purple">【答案解析】:</div></el-col
        >
      </el-row>
      <hr />
      <el-row :gutter="20" style="padding: 10px 0">
        <el-col :span="24"
          ><div class="grid-content bg-purple">【题目备注】:</div></el-col
        >
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onclose">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { detail } from "@/api/hmmm/questions";
export default {
  data() {
    return {};
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  created() {},

  methods: {
    getRandoms() {
      // const res =  detail(randomsID);
      console.log("id", this.randomsID);
    },
    onclose() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style scoped></style>
