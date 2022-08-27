<template>
  <el-dialog title="题目预览" :visible="visible" width="900px" @close="onclose">
    <div>
      <el-row :gutter="20" style="padding: 10px 0">
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            【题型】:{{ randomsInfo.questionType }}
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            【编号】:{{ randomsInfo.id }}
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            【难度】:{{ randomsInfo.difficulty }}
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            【标签】:{{ randomsInfo.tags }}
          </div></el-col
        >
      </el-row>
      <el-row :gutter="20" style="padding: 10px 0">
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            【学科】:{{ randomsInfo.subjectID }}
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            【目录】:{{ randomsInfo.catalogID }}
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            【方向】:{{ randomsInfo.direction }}
          </div></el-col
        >
      </el-row>
    </div>
    <hr />
    <div>
      <el-row :gutter="20" style="padding: 10px 0">
        <el-col :span="24"
          ><div class="grid-content bg-purple">
            【参考答案】:{{ randomsInfo.videoURL }}
          </div></el-col
        >
      </el-row>
      <hr />
      <el-row :gutter="20" style="padding: 10px 0">
        <el-col :span="24"
          ><div class="grid-content bg-purple">
            【答案解析】:{{ randomsInfo.answerID }}
          </div></el-col
        >
      </el-row>
      <hr />
      <el-row :gutter="20" style="padding: 10px 0">
        <el-col :span="24"
          ><div class="grid-content bg-purple">
            【题目备注】:{{ randomsInfo.remarks }}
          </div></el-col
        >
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onclose">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    randomsInfo: {
      type: [String, Object],
    },
  },
  created() {},

  methods: {
    onclose() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style scoped></style>
