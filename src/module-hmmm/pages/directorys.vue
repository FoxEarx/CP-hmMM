<template>
  <div class="container">
    <el-card class="box-card">
      <!-- 显示路劲 -->
      <div v-show="this.$route.query.id">
        <div class="path">
          学科管理 <i class="el-icon-arrow-right"></i> {{ subjectID || 2 }}
          <i class="el-icon-arrow-right"></i> 目录管理
        </div>
        <div class="solid"></div>
      </div>

      <!-- 显示路劲 -->
      <!-- 顶部 -->
      <el-row class="top">
        <!-- 左侧区域 -->
        <el-col :span="18" class="left">
          <el-form ref="form" :model="form" label-width="80px" class="isform">
            <el-form-item label="目录名称">
              <el-input v-model="form.name" class="SearchNameInput"></el-input>
            </el-form-item>

            <el-form-item label="状态">
              <el-select v-model="form.state" placeholder="请选择">
                <el-option label="启用" value="启用"></el-option>
                <el-option label="禁用" value="禁用"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <Button class="btn" @isOn="clear">清除</Button>
          <Button class="btn" color="blue" fontColor="fontWhite" @isOn="Search"
            >搜索</Button
          >
        </el-col>
        <!-- 左侧区域 -->

        <!-- 右侧区域 -->
        <el-col :offset="3" :span="3" class="right">
          <Button
            v-show="this.$route.query.id"
            @isOn="Go"
            fontColor="fonstBlue"
            :width="80"
            noBorder="noborder"
            class="gorouter"
            ><i class="el-icon-back"></i> 返回学科</Button
          >
          <Button
            class="addButton"
            color="green"
            fontColor="fontWhite"
            :width="100"
            @isOn="AddDialogShow = true"
            ><i class="el-icon-edit"></i> 新增目录</Button
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
        :tableData="tableData"
        :table="table"
        :TYPE="2"
        :pageIndex="page"
        :pageSize="pagesize"
        :isWidth="230"
        :indexWidth="80"
        @Delete="Delete"
        @Edit="Edit"
        @onSwitch="onSwitch"
      ></Mytable>
      <!-- 表格区域 -->
      <!-- 页码显示 -->
      <Page class="page" :total="counts" @newPage="newPage" @newSize="newSize">
      </Page>
      <!-- 页码显示 -->
      <Dialog
        ref="edit"
        :visible.sync="AddDialogShow"
        :tosimple="tosimple"
        @add-success="AddSuccess"
      ></Dialog>
    </el-card>
  </div>
</template>

<script>
import { list, remove, changeState } from "@/api/hmmm/directorys";
import { simple } from "@/api/hmmm/subjects";
import Button from "@/components/Fengjian/button";
import Mytable from "@/components/Fengjian/table";
import Page from "@/components/Fengjian/Page";
import dayjs from "dayjs";
import Dialog from "../components/directorys-add.vue";
export default {
  data() {
    return {
      form: {
        name: "",
        state: "",
      },

      counts: 0,
      page: 1,
      pagesize: 10,
      subjectID: "",
      directoryName: "",
      state: "",
      loading: false,
      isSearch: false,
      tableData: [],
      table: [
        { prop: "subjectName", label: "所属学科" },
        { prop: "directoryName", label: "目录名称" },
        { prop: "username", label: "创建者" },
        { prop: "addDate", label: "创建日期" },
        { prop: "totals", label: "面试题数量" },
        { prop: "state", label: "状态" },
      ],
      tosimple: [],
      AddDialogShow: false,
      thearound: false,
    };
  },
  components: {
    Button,
    Mytable,
    Page,
    Dialog,
  },
  created() {
    // console.log(this.$route.query.id);
    this.list();
    this.simple();
  },
  methods: {
    // 获取列表
    async list() {
      this.loading = true;
      this.subjectID = this.$route.query.id;
      this.thearound = true;
      if (!this.isSearch && this.subjectID === "") {
        const res = await list({
          page: this.page,
          pagesize: this.pagesize,
        });
        console.log(res);
        this.counts = res.data.counts;
        const unList = res.data.items;
        const todata = [];
        unList.forEach((item) => {
          const time = dayjs(item.addDate).format("YYYY-MM-DD");
          todata.push({
            subjectName: item.subjectName,
            directoryName: item.directoryName,
            username: item.username,
            addDate: time,
            totals: item.totals,
            state: item.state === 1 ? "已启用" : "已禁用",
            id: item.id,
            subjectID: item.subjectID,
            isEdit: false, //是否可编辑
            isForbid: true, //是否禁用
          });
        });
        this.tableData = todata;
        console.log(this.tableData);
      } else if (this.isSearch) {
        const res = await list({
          page: this.page,
          pagesize: this.pagesize,
          directoryName: this.directoryName,
          state: this.state,
          subjectID: this.subjectID,
        });
        this.counts = res.data.counts;
        const unList = res.data.items;
        const todata = [];
        unList.forEach((item) => {
          const time = dayjs(item.addDate).format("YYYY-MM-DD");
          todata.push({
            subjectName: item.subjectName,
            directoryName: item.directoryName,
            username: item.username,
            addDate: time,
            totals: item.totals,
            state: item.state === 1 ? "已启用" : "已禁用",
            id: item.id,
            subjectID: item.subjectID,
            isEdit: false, //是否可编辑
            isForbid: true, //是否禁用
          });
        });
        console.log(this.tableData);
        this.tableData = todata;
      } else {
        const res = await list({
          page: this.page,
          pagesize: this.pagesize,
          subjectID: this.subjectID,
        });
        this.counts = res.data.counts;
        const unList = res.data.items;
        const todata = [];
        unList.forEach((item) => {
          const time = dayjs(item.addDate).format("YYYY-MM-DD");
          todata.push({
            subjectName: item.subjectName,
            directoryName: item.directoryName,
            username: item.username,
            addDate: time,
            totals: item.totals,
            state: item.state === 1 ? "已启用" : "已禁用",
            id: item.id,
            subjectID: item.subjectID,
            isEdit: false, //是否可编辑
            isForbid: true, //是否禁用
          });
        });
        console.log(this.tableData);
        this.tableData = todata;
        this.loading = false;
      }
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
      this.form.state = "";
    },
    Search() {
      this.$refs.form.validate();
      const state = this.form.state === "启用" ? 1 : 0;
      this.state = state;
      this.directoryName = this.form.name;
      console.log(this.form);
      if (this.form.state === "" && this.form.name === "") {
        this.isSearch = false;
      } else if (this.form.state === "" || this.form.name === "") {
        this.isSearch = true;
      } else {
        this.isSearch = true;
      }
      console.log(this.isSearch);
      this.list();
    },
    // 获取学科简单列表
    async simple() {
      const res = await simple();

      this.tosimple = res.data;
    },
    AddSuccess() {
      this.list();
    },
    async Delete(val) {
      await remove({
        id: val,
      });
      this.$message.success("删除成功");
      this.list();
    },
    Edit(val) {
      this.$store.dispatch("getDirectorys", val);
      this.AddDialogShow = true;
      this.$refs.edit.getEdit(val);
    },
    async onSwitch(val) {
      await changeState({
        id: val.id,
        state: val.state === "已启用" ? 0 : 1,
      });
      await this.list();
      this.$message.success("操作成功");
    },
    Go() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="less">
.box-card {
  margin-top: 12px;
  margin-left: 12px;
  margin-right: 12px;
  .SearchNameInput {
    width: 200px;
    height: 28px;
    line-height: 28px;
  }
  .path {
    padding-bottom: 15px;
  }
  .solid {
    width: 110%;
    height: 1px;
    background-color: #ebeef5;
    margin-bottom: 20px;
  }
  .left {
    display: flex;
    align-items: start;
  }
  .right {
    display: flex;
  }
  .gorouter {
    margin-left: 20px;
  }
  .addButton {
    position: fixed;
    // margin-left: 30px;
    right: 1.9%;
  }
  .isAlert {
    height: 32px;
  }
  .btn {
    margin-top: 1.5px;
  }
  .isform {
    display: flex;
  }
  .page {
    float: right;
    padding: 20px 0;
  }
}
</style>
