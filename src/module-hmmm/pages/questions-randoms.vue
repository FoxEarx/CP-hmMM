<template>
  <el-card class="box-card">
    <Title
      :tableData="tableData"
      @searchlist="searchlist"
      @clear="clear"
      @getAllList="getAllList"
    />
    <el-alert
      type="info"
      show-icon
      :closable="false"
      style="margin: 20px 0 20px 0"
    >
      数据一共{{ total }}条
    </el-alert>
    <articlesLlist
      :tableData="tableData"
      :table="table"
      v-loading="loading"
      @info="getAllinfo"
      @randomsClick="randomsClick"
    >
      <el-table-column label="操作">
        <template>
          <el-button circle @click="onRemove"
            ><i class="el-icon-delete-solid"></i
          ></el-button>
        </template>
      </el-table-column>
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
    <tagsDialog
      ref="tagsDialog"
      :visible.sync="AddTagsDialog"
      :dialogTitle="dialogTitle"
      :tableData="tableData"
      :Allinfo="Allinfo"
      @getAllList="getAllList"
    />
    <randomsDialog :visible.sync="randomsDialog" />
  </el-card>
</template>

<script>
import dayjs from "dayjs"; //day插件
import Title from "../components/fanzhiyi/randomsTitle.vue"; // 头部input
import articlesLlist from "../components/fanzhiyi/articlesList.vue"; // 列表
import tagsDialog from "../components/fanzhiyi/tagsDialog.vue";
import { randoms, removeRandoms, detail } from "@/api/hmmm/questions";
import { questionType } from "@/api/hmmm/constants";
import randomsDialog from "../components/fanzhiyi/randomsDialog.vue";
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
        { prop: "id", label: "编号", width: 150 },
        { prop: "questionType", label: "题型", width: 50 },
        { prop: "questionIDs", label: "题目编号", width: 220 },
        { prop: "addTime", label: "录入时间" },
        { prop: "totalSeconds", label: "答题时间(s)" },
        { prop: "accuracyRate", label: "正确率(%)" },
        { prop: "userName", label: "录入人" },
      ],
      loading: true,
      Allinfo: {},
      dialogTitle: "", //弹出框名称
      AddTagsDialog: false, //新增弹出框
      randomsDialog: false, //主题信息弹出框
      optionsList: [],
      str: "",
      randomsID: "",
    };
  },
  components: {
    Title,
    articlesLlist,
    tagsDialog,
    randomsDialog,
  },
  created() {
    this.getAllList();

    // console.log(row);
  },
  methods: {
    // 获取文章列表
    async getAllList() {
      // console.log(questionTypes);
      this.loading = true;
      const { data } = await randoms(this.pages);
      this.total = data.counts;
      console.log("文章总数", data);
      // 处理
      const formList = data.items.map((item) => {
        // 处理state label
        const str = questionType.find((el) => {
          // console.log("el", el);
          // console.log("1", item.questionType);
          return el.value == item.questionType;
        });

        // console.log("1111", this.str);
        // 处理时间格式
        const time = dayjs(item.addTime).format("YYYY.MM.DD hh:mm:ss");
        return {
          id: item.id, //编号
          questionType:
            str.value == 1 ? "单选" : str.value == 2 ? "多选" : "简答", //题型
          questionIDs: item.questionIDs, //题目编号
          addTime: time, //录入时间
          totalSeconds: item.totalSeconds, //答题时间（s）
          accuracyRate: item.accuracyRate, //正确率（%）
          userName: item.userName, //录入人
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
    // 获取点击列表的内容
    getAllinfo(val) {
      this.Allinfo = val;
      console.log("row", this.Allinfo);
    },
    // 搜索列表
    searchlist(params) {
      this.tableData = params;
    },
    clear() {
      this.getAllList();
    },
    // 删除
    onRemove() {
      setTimeout(async () => {
        await removeRandoms(this.Allinfo);
        await this.getAllList();
      });
    },
    randomsClick(val) {
      this.randomsID = val[0];
      this.randomsDialog = true;
      // setTimeout(async () => {
      //   const res = await detail(this.randomsID);
      //   console.log(res);
      // });
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
:deep(.is-circle) {
  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4;
}
</style>
