<template>
  <el-card class="box-card">
    <!-- 显示路劲 -->
    <div v-show="this.$route.query.id">
      <div class="path">
        学科管理 <i class="el-icon-arrow-right"></i> {{ queryId || 2 }}
        <i class="el-icon-arrow-right"></i> 标签管理
      </div>
      <div class="solid"></div>
    </div>
    <!-- 显示路劲 -->
    <!-- <Button
      v-show="this.$route.query.id"
      @isOn="Go"
      fontColor="fonstBlue"
      :width="80"
      noBorder="noborder"
      class="gorouter"
      ><i class="el-icon-back"></i> 返回学科</Button
    > -->
    <tInput
      ref="tInput"
      :tableData="tableData"
      @searchlist="searchlist"
      @clear="clear"
      @getAllList="getAllList"
      @AddTags="AddTags"
      @isOn="Go"
    >
      <template #text><i class="el-icon-back"></i> 返回学科</template>
      <template> 新增标签 </template></tInput
    >

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
    >
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-link :underline="false" type="primary" @click="onSaveState">{{
            row.state == "已启用" ? "禁用" : "启用"
          }}</el-link>
          <el-link
            :underline="false"
            :type="row.state == '已启用' ? 'info' : 'primary'"
            :disabled="row.state == '已启用' ? true : false"
            @click="revamp"
            >修改</el-link
          >
          <el-link
            :underline="false"
            :type="row.state == '已启用' ? 'info' : 'primary'"
            :disabled="row.state == '已启用' ? true : false"
            @click="onRemove"
            >删除</el-link
          >
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
      @fjAllList="FjGetAllList"
    />
  </el-card>
</template>

<script>
import dayjs from "dayjs"; //day插件
import tInput from "../components/fanzhiyi/tagsTitle.vue"; // 头部input
import Button from "@/components/Fengjian/button"; // -----------Fengjian
import articlesLlist from "../components/fanzhiyi/articlesList.vue"; // 列表
import tagsDialog from "../components/fanzhiyi/tagsDialog.vue";
import { list, changeState, remove } from "@/api/hmmm/tags";
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
        { prop: "subjectName", label: "所属学科" },
        { prop: "tagName", label: "标签名称" },
        { prop: "username", label: "创建者" },
        { prop: "addDate", label: "创建日期" },
        { prop: "state", label: "状态" },
      ],
      loading: true,
      Allinfo: {},
      dialogTitle: "", //弹出框名称
      AddTagsDialog: false, //新增弹出框
      optionsList: [],
      queryId: "",
    };
  },
  components: {
    tInput,
    articlesLlist,
    tagsDialog,
    Button,
  },
  created() {
    if (this.$route.query.id) {
      this.FjGetAllList();
    } else {
      this.getAllList();
    }

    // console.log(row);
  },
  methods: {
    // fj=============================================
    Go() {
      this.$router.go(-1);
    },
    async FjGetAllList() {
      this.queryId = this.$route.query.id;
      const res = await list({
        page: this.pages.page,
        pagesize: this.pages.pagesize,
        subjectID: this.queryId,
      });
      console.log("fj", res);

      this.total = res.data.counts;
      // 处理
      const formList = res.data.items.map((item) => {
        // 处理state label
        const str = status.find((el) => {
          return el.value === item.state;
        });

        // 处理时间格式
        const time = dayjs(item.addDate).format("YYYY.MM.DD hh:mm:ss");
        // console.log(str);
        return {
          subjectName: item.subjectName,
          tagName: item.tagName,
          username: item.username,
          addDate: time,
          state: str.value === 0 ? "已禁用" : "已启用",
          subjectID: item.subjectID,
          id: item.id,
        };
      });
      this.tableData = formList;
      this.loading = false;
    },
    // fj=============================================
    // 获取文章列表
    async getAllList() {
      this.loading = true;
      const { data } = await list(this.pages);
      this.total = data.counts;
      console.log("文章总数", data);
      // 处理
      const formList = data.items.map((item) => {
        // 处理state label
        const str = status.find((el) => {
          return el.value === item.state;
        });

        // 处理时间格式
        const time = dayjs(item.addDate).format("YYYY.MM.DD hh:mm:ss");
        // console.log(str);
        return {
          subjectName: item.subjectName,
          tagName: item.tagName,
          username: item.username,
          addDate: time,
          state: str.value === 0 ? "已禁用" : "已启用",
          subjectID: item.subjectID,
          id: item.id,
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
    // 切换启用禁用状态
    onSaveState() {
      setTimeout(async () => {
        const state = this.Allinfo.state == "已禁用" ? 1 : 0;
        this.tableData.state = state;
        const datalist = {
          state: this.tableData.state,
          id: this.Allinfo.id,
        };
        // console.log(datalist);
        await changeState(datalist);
        // console.log(res);
        this.$message.success("切换成功");
        this.getAllList();
      });
    },
    // 修改
    revamp() {
      setTimeout(() => {
        this.AddTagsDialog = true;
        this.dialogTitle = "修改标签";
        this.$refs.tagsDialog.ruleForm.tagName = this.Allinfo.tagName;
        this.$refs.tagsDialog.ruleForm.subjectName = this.Allinfo.subjectName;
        this.$refs.tagsDialog.state = 1;
      });
    },
    // 搜索列表
    searchlist(params) {
      this.tableData = params;
    },
    clear() {
      this.getAllList();
    },
    // 删除
    async onRemove() {
      await remove(this.Allinfo);
      await this.getAllList();
    },
    AddTags() {
      this.dialogTitle = "新增标签";
      this.AddTagsDialog = true;
      this.$refs.tagsDialog.state = 0;
    },
  },
};
</script>

<style scoped lang="less">
.box-card {
  margin: 10px;
  position: relative;
  right: 0;
  top: 0;
}
.gorouter {
  position: absolute !important;
  left: 85%;
}
.path {
  padding-bottom: 15px;
}

.solid {
  width: 100%;
  height: 1px;
  background-color: #ebeef5;
  margin-bottom: 20px;
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
