<template>
  <el-card class="box-card">
    <tInput />
    <el-alert
      title="数据一共14条"
      type="info"
      show-icon
      :closable="false"
      style="margin: 20px 0 20px 0"
    >
    </el-alert>
    <articlesLlist :tableData="tableData" :table="table" v-loading="loading">
      <template #operation>
        <el-link :underline="false" type="primary">预览</el-link>
        <el-link :underline="false" type="primary">启用</el-link>
        <el-link :underline="false" type="primary" disabled>修改</el-link>
        <el-link :underline="false" type="primary" disabled>删除</el-link>
      </template>
    </articlesLlist>
    <div class="block">
      <el-pagination
        background
        layout=" prev, pager, next,sizes, jumper"
        :page-size="pages.pagesize"
        :total="total"
        :page-sizes="[5, 10, 20, 50]"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </div>
  </el-card>
  <!-- 富文本 -->
  <!-- <Quill /> -->
</template>

<script>
import dayjs from "dayjs"; //day插件
import Quill from "../components/fanzhiyi/articlesQuill.vue"; //富文本
import tInput from "../components/fanzhiyi/titleInput.vue"; // 头部input
import articlesLlist from "../components/fanzhiyi/articlesList.vue"; // 列表
import { list } from "@/api/hmmm/articles.js";
import { status } from "@/api/hmmm/constants";
export default {
  data() {
    return {
      tableData: [],
      pages: {
        page: 1,
        pagesize: 10,
      },
      total: 0,
      table: [
        { prop: "title", label: "文章标题" },
        { prop: "visits", label: "阅读数" },
        { prop: "username", label: "录入人" },
        { prop: "createTime", label: "录入时间" },
        { prop: "state", label: "状态" },
      ],
      loading: true,
    };
  },
  components: {
    Quill,
    tInput,
    articlesLlist,
  },
  created() {
    this.getAllList();
  },
  methods: {
    // 获取文章列表
    async getAllList() {
      this.loading = true;
      const { data } = await list(this.pages);
      this.total = data.counts;
      console.log("文章总数", data.items);
      // 处理
      const formList = data.items.map((item) => {
        // 处理state label
        const str = status.find((el) => {
          return el.value === item.state;
        });

        // 处理时间格式
        const time = dayjs(item.createTime).format("YYYY.MM.DD hh:mm:ss");
        // console.log(str);
        return {
          title: item.title,
          visits: item.visits,
          username: item.username,
          createTime: time,
          state: str.label,
        };
      });

      this.tableData = formList;
      this.loading = false;
    },
    // 分页
    handleCurrentChange(val) {
      this.pages.page = val;
      this.getAllList();
    },
    // 分页
    handleSizeChange(val) {
      this.pages.pagesize = val;
      this.getAllList();
    },
  },
};
</script>

<style scoped lang="less">
.box-card {
  margin: 10px;
}
:deep(.el-link--inner) {
  padding-left: 5px;
}
.block {
  display: flex;
  float: right;
  height: 80px;
  padding: 20px 0;
}
</style>
