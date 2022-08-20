<template>
  <el-tabs v-model="activeName" type="card" @tab-click="tabsChange">
    <!-- 全部 -->
    <el-tab-pane label="全部" name="all" :lazy="true"> </el-tab-pane>
    <!-- 其他标签页 -->
    <el-tab-pane label="待审核" name="0" :lazy="true"> </el-tab-pane>
    <el-tab-pane label="已审核" name="1" :lazy="true"> </el-tab-pane>
    <el-tab-pane label="已拒绝" name="2" :lazy="true"> </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeName: "all",
    };
  },

  created() {},

  methods: {
    tabsChange(target) {
      this.$emit("tabsChange", target.name);
    },
  },

  components: {},
};
</script>

<style scoped lang="scss"></style>
