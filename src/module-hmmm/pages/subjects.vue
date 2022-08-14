<template>
  <div class="container">
    <el-card class="box-card">
      <!-- 顶部 -->
      <el-row class="top">
        <!-- 左侧区域 -->
        <el-col :span="12" class="left">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="学科名称">
              <el-input
                placeholder="冯坚制作"
                v-model="form.name"
                class="SearchNameInput"
              ></el-input>
            </el-form-item>
          </el-form>
          <Button class="btn" @isOn="clear">清除</Button>
          <Button class="btn" color="blue" fontColor="fontWhite" @isOn="Search"
            >搜索</Button
          >
        </el-col>
        <!-- 左侧区域 -->

        <!-- 右侧区域 -->
        <el-col :offset="10" :span="2">
          <Button
            class="addButton"
            color="green"
            fontColor="fontWhite"
            :width="100"
            @isOn="AddDialogShow = true"
            ><i class="el-icon-edit"></i> 新增学科</Button
          >
        </el-col>
        <!-- 右侧区域 -->
      </el-row>
      <!-- 顶部 -->

      <!-- 警示信息 -->
      <el-alert
        class="isAlert"
        :title="'数据一共' + counts + '条'"
        type="info"
        show-icon
        :closable="false"
      >
      </el-alert>
      <!-- 警示信息 -->

      <!-- 表格区域 -->
      <Mytable
        v-loading="loading"
        :table="table"
        :tableData="tableData"
        :TYPE="1"
        :pageIndex="page"
        :pageSize="pagesize"
        @Delete="Delete"
        @Edit="Edit"
      ></Mytable>
      <!-- 表格区域 -->
      <!-- 分页区域 -->
      <Page
        class="page"
        :total="counts"
        @newPage="newPage"
        @newSize="newSize"
      ></Page>
      <!-- 分页区域 -->
      <!-- 新增对话框 -->
      <Dialog
        ref="edit"
        :visible.sync="AddDialogShow"
        @add-success="AddSuccess"
      ></Dialog>
      <!-- 新增对话框 -->
    </el-card>
  </div>
</template>

<script>
import Button from "@/components/Fengjian/button";
import Mytable from "@/components/Fengjian/table";
import { list, remove } from "@/api/hmmm/subjects";
import Page from "@/components/Fengjian/Page";
import dayjs from "dayjs";
import Dialog from "../components/subjects-add.vue";
export default {
  data() {
    return {
      form: {
        name: "",
      },
      page: 1,
      pagesize: 10,
      AddDialogShow: false,
      // 总条数
      counts: 0,
      table: [
        { prop: "subjectName", label: "学科名称" },
        { prop: "creator", label: "创建者" },
        { prop: "addDate", label: "创建日期" },
        { prop: "isFrontDisplay", label: "前台是否显示" },
        { prop: "twoLevelDirectory", label: "二级目录" },
        { prop: "tags", label: "标签" },
        { prop: "totals", label: "题目数量" },
      ],
      tableData: [],
      loading: false,
      InputSearch: "",
    };
  },
  components: {
    Button,
    Mytable,
    Page,
    Dialog,
  },
  created() {
    this.list();
  },

  methods: {
    // 获取列表
    async list() {
      this.tableData = [];
      this.loading = true;
      const res = await list({
        subjectName: this.InputSearch,
        page: this.page,
        pagesize: this.pagesize,
      });
      console.log(res);
      this.counts = res.data.counts;
      const unList = res.data.items;
      unList.forEach((item) => {
        const time = dayjs(item.addDate).format("YYYY-MM-DD");
        this.tableData.push({
          subjectName: item.subjectName,
          creator: item.username,
          addDate: time,
          isFrontDisplay: item.isFrontDisplay === 1 ? "是" : "否",
          twoLevelDirectory: item.twoLevelDirectory,
          tags: item.tags,
          totals: item.totals,
          id: item.id,
        });
      });

      console.log(this.tableData);
      this.loading = false;
    },
    newPage(val) {
      this.page = val;
      this.list();
    },
    newSize(val) {
      this.pagesize = val;
      this.list();
    },
    clear() {
      this.form.name = "";
    },
    Search() {
      this.$refs.form.validate();
      console.log(this.form.name);
      this.InputSearch = this.form.name;
      this.list();
    },
    AddSuccess() {
      this.list();
    },
    async Delete(val) {
      console.log(val);
      await remove({
        id: val,
      });
      this.$message.success("删除成功");
      this.list();
    },
    Edit(val) {
      console.log(val);
      // this.$store.state.subjects.state.EditInfo;
      this.$store.dispatch("getEdit", val);
      this.AddDialogShow = true;
      this.$refs.edit.getEdit(val);
    },
  },
};
</script>

<style scoped lang="less">
.box-card {
  margin-top: 0px;
  // margin-left: 12px;
  // margin-right: 12px;
  .SearchNameInput {
    width: 200px;
    height: 28px;
    line-height: 28px;
  }
  .left {
    display: flex;
  }
  .addButton {
    margin-left: 30px;
  }
  .isAlert {
    height: 32px;
  }
  .btn {
    margin-top: 1.5px;
  }
  .page {
    float: right;
    padding: 20px 0;
  }
}
</style>
