<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      type="index"
      label="序号"
      :width="indexWidth"
      :index="calcIndex"
    >
    </el-table-column>
    <el-table-column
      v-for="(item, index) in table"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :width="isWidth"
      height="70"
    >
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          type="text"
          size="small"
          v-if="TYPE === 1"
          @click="
            $router.push({
              path:
                '/subjects/directorys/?id=' +
                scope.row.id +
                '&' +
                'name=' +
                scope.row.subjectName,
              params: { id: scope.row.id },
            })
          "
          >学科分类</el-button
        >
        <el-button v-if="TYPE === 1" type="text" size="small"
          >学科标签</el-button
        >
        <el-button
          v-if="TYPE === 1"
          type="text"
          size="small"
          @click="$emit('Edit', scope.row)"
          >修改</el-button
        >
        <el-button
          v-if="TYPE === 1"
          type="text"
          size="small"
          @click="open(scope.row.id)"
          >删除</el-button
        >
        <!-- @click="$emit('Delete', scope.row.id)" -->
        <!-- </template>

      <template> -->
        <!-- slot-scope="scope" -->
        <el-button
          v-if="TYPE === 2"
          type="text"
          size="small"
          @click="$emit('onSwitch', scope.row)"
          >{{ scope.row.state === "已禁用" ? "启用" : "禁用" }}</el-button
        >
        <el-button
          v-if="TYPE === 2"
          type="text"
          size="small"
          :disabled="scope.row.state === '已禁用' ? true : false"
          @click="$emit('Edit', scope.row)"
          >修改</el-button
        >
        <el-button
          type="text"
          size="small"
          :disabled="scope.row.state === '已禁用' ? true : false"
          v-if="TYPE === 2"
          @click="open(scope.row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
    },
    table: {
      type: Array,
    },
    TYPE: {
      type: Number,
      default: 1,
    },
    pageIndex: {
      type: Number,
    },
    pageSize: {
      type: Number,
    },
    isWidth: {
      type: Number,
      default: 190,
    },
    indexWidth: {
      type: Number,
      default: 60,
    },
  },
  data() {
    return {
      // isswitch: false,
    };
  },
  computed: {},
  methods: {
    calcIndex(index) {
      return (this.pageIndex - 1) * this.pageSize + index + 1;
    },
    open(val) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(val);
          this.$emit("Delete", val);
        })
        .catch(() => {});
    },
  },
};
</script>
<style scoped>
:deep(.el-table__row) {
  height: 60px;
}
:deep(.has-gutter) {
  height: 60px;
  /* border-bottom: 10px solid; */
}
/* :deep(.el-table th.is-leaf) {
  border-bottom: 2px solid #e8e8e8 !important;
} */
</style>
