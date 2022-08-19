<template>
  <el-tabs v-model="activeName" type="card">
    <!-- 全部 -->
    <el-tab-pane label="全部" name="all" :lazy="true"> </el-tab-pane>
    <!-- 其他标签页 -->
    <el-tab-pane label="待审核" name="0" :lazy="true"> </el-tab-pane>
    <el-tab-pane label="1待审核" name="1" :lazy="true"> </el-tab-pane>
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

  methods: {},

  components: {},
};
</script>

<style scoped lang="scss">

</style>
