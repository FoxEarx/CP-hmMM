<template>
  <el-dialog title="预览文章" :visible="visible" width="800px" @close="onClose">
    <div class="top">
      <h2>{{ Allinfo.title }}</h2>
      <span>{{ Allinfo.createTime }}</span
      ><span>{{ Allinfo.username }}</span
      ><span class="el-icon-view"> {{ Allinfo.visits }}</span>
    </div>
    <div class="min" v-html="Allinfo.articleBody"></div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {};
  },

  created() {},
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    Allinfo: {
      type: Object,
    },
  },
  methods: {
    onClose() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style scoped lang="less">
.top {
  h2 {
    margin: 0;
  }
  span {
    margin-top: 10px;
    margin-left: 10px;
  }
}
.min {
  margin-top: 10px;
  width: 760px;
  line-height: 1.15;
  background-color: #f5f5f5;
  border-top: 1px dashed #cccccc;
  padding: 10px;
}
</style>
