<template>
  <div class="MainData">
    <template>
      <el-table
        :data="tableData"
        style="width: 100%"
        @row-click="currentId"
        v-loading="loading"
      >
        <el-table-column type="index" label="序号" min-width></el-table-column>
        <el-table-column
          v-for="(item, index) in table"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          min-width
        >
          <template slot-scope="{ row }">
            <div v-if="item.prop === 'title'">
              <span>{{ row[item.prop] }}</span>
              <span
                class="el-icon-film video"
                v-if="row.videoURL !== ''"
                @click="playVideo"
              ></span>
            </div>
            <template v-else>
              <div>{{ row[item.prop] }}</div>
            </template>
          </template>
        </el-table-column>
        <!-- <el-table-column label="图片">
          <slot name="img"></slot>
        </el-table-column> -->
        <slot></slot>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: "",
      state: "",
      loading: false,
    };
  },

  created() {},

  methods: {
    currentId(row) {
      // console.log(row);
      this.state = row.state;
      this.order = row.orderNo;
      this.$emit("pushid", this.order);
      this.$emit("info", row);
      // this.$emit('delFn', this.state)
    },
    playVideo() {
      this.$emit("playVideo");
    },
  },
  props: {
    //行数
    tableData: {
      type: Array,
    },
    //列数
    table: {
      type: Array,
    },
    //主体区域盒子宽度
    width: {
      type: String,
      default: "200px",
    },
  },
};
</script>

<style scoped lang="less">
.MainData {
  width: 100%;
}
/deep/ .el-table th {
  font-weight: normal;
  color: #666;
  background-color: #f3f6fb;
}
.video {
  cursor: pointer;
  color: #00f;
  padding-left: 7px;
}
</style>
