<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 20, 50]"
      background
      layout="prev, pager, next, sizes,jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
    },
  },
  data() {
    return {};
  },

  created() {},

  methods: {
    handleSizeChange(val) {
      console.log(`handleSizeChange,每页 ${val} 条`);
      this.$emit("newSize", val);
    },
    handleCurrentChange(val) {
      console.log(`handleCurrentChange,当前页: ${val}`);
      this.$emit("newPage", val);
    },
  },
};
</script>

<style scoped></style>
