<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card" shadow="always">
        <el-form label-width="80px" ref="form" :model="formData">
          <el-row>
            <el-col :span="6">
              <el-form-item label="标签名称" size="small">
                <el-input
                  size="small"
                  autocomplete="off"
                  placeholder="请输入"
                  style="width: 100%"
                  v-model="formData.tags"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="6">
              <el-form-item label="城市" size="small">
                <el-select
                  v-model="formData.province"
                  placeholder="请选择"
                  style="width: 100%; margin-right: 4%"
                  @keyup.enter="handleFilter"
                  @change="provinceChange"
                  filterable
                >
                  <el-option
                    v-for="(item, index) in provinceInfo"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select> </el-form-item
            ></el-col>
            <el-col :span="6">
              <el-form-item label="地区" size="small">
                <el-select
                  v-model="formData.city"
                  placeholder="请选择"
                  style="width: 100%; margin-right: 4%"
                  @keyup.enter="handleFilter"
                  filterable
                >
                  <el-option
                    v-for="(item, index) in cityInfo"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select> </el-form-item
            ></el-col>
            <el-col :span="6">
              <el-form-item label="企业简称" size="small">
                <el-input
                  v-model="formData.shortName"
                  size="small"
                  autocomplete="off"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="6">
              <el-form-item label="状态" size="small">
                <el-select placeholder="请选择" v-model="formData.state">
                  <el-option
                    v-for="item in statusInfo"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select> </el-form-item
            ></el-col>
            <el-col :span="6" style="padding-left: 40px">
              <el-button size="small" @click="onClearCompany">清除</el-button>
              <el-button type="primary" size="small" @click="onSearchCompany"
                >搜索</el-button
              >
            </el-col>
            <el-col :span="12" style="text-align: right">
              <el-button
                type="success"
                size="small"
                icon="el-icon-edit"
                @click="addCompanyInfo"
                >新增用户</el-button
              >
            </el-col>
          </el-row>
        </el-form>
        <el-alert
          :title="`共${total}条记录`"
          type="info"
          show-icon
          :closable="false"
          style="margin-bottom: 20px"
        >
        </el-alert>
        <JuanTabel
          :tableData="tableData"
          v-loading="loading"
          element-loading-text="请你给我一首歌的时间"
        >
          <template #default>
            <el-table-column
              align="center"
              v-for="item in personnelList"
              :key="item.id"
              :property="item.property"
              :label="item.label"
              :width="item.width"
            />

            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  style="medium"
                  icon="el-icon-edit"
                  plain
                  circle
                  @click="editCompanyInfo(scope.row)"
                ></el-button>
                <el-tooltip
                  :content="scope.row.state == '启用' ? '禁用' : '启用'"
                  placement="top"
                >
                  <el-button
                    v-if="scope.row.state == '启用'"
                    type="warning"
                    style="medium"
                    plain
                    circle
                    @click="changeState(scope.row)"
                    icon="el-icon-close"
                  ></el-button>
                  <el-button
                    v-else
                    type="success"
                    style="medium"
                    plain
                    circle
                    @click="changeState1(scope.row)"
                    icon="el-icon-check"
                  ></el-button
                ></el-tooltip>
                <el-button
                  type="danger"
                  style="medium"
                  plain
                  circle
                  icon="el-icon-delete"
                  @click="delCompanyInfo(scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </template>
        </JuanTabel>
        <div class="pagination">
          <PageTool
            :total="total"
            :paginationPage="page"
            :paginationPagesize="pagesize"
            @prevClick="prevClick"
            @nextClick="nextClick"
            @pageSizeChange="pageSizeChange"
            @pageChange="pageChange"
          />
        </div>
      </el-card>
      <CompanysAdd
        :visible.sync="dialogFormVisible"
        :titleInfo="titleInfo"
        :formBase="formBase"
        @newDataes="newDataes"
      ></CompanysAdd>
      <div class="baberrage">
        <Baberrage></Baberrage>
      </div>
    </div>
  </div>
</template>

<script>
import CompanysAdd from "../components/juan/editCompany.vue";
import JuanTabel from "../components/juan/tabel.vue";
import { provinces, citys } from "@/api/hmmm/citys.js";
import { status } from "@/api/hmmm/constants.js";
import { list } from "@/api/hmmm/companys.js";
import PageTool from "../components/juan/pagination.vue";
import dayjs from "dayjs";
import { editState, getUpdateCompany, delCompany } from "@/api/hmmm/juan.js";
import Baberrage from "../components/juan/baberrage.vue";
export default {
  components: {
    CompanysAdd,
    JuanTabel,
    PageTool,
    Baberrage,
  },
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      provinceInfo: [],
      cityInfo: [],
      statusInfo: [],
      formData: {
        province: "",
        city: "",
        state: "",
        shortName: "",
        tags: "",
      },
      tableData: [],
      personnelList: [
        { property: "id", label: "序号", width: 50 },
        { property: "number", label: "企业编号" },
        { property: "shortName", label: "企业简称" },
        { property: "tags", label: "标签" },
        { property: "creatorID", label: "创建者" },
        { property: "addDate", label: "创建日期" },
        { property: "remarks", label: "备注" },
        { property: "state", label: "状态" },
      ],
      pagesize: "",
      total: "",
      page: "",
      content: "",
      titleInfo: { text: "", pageTitle: "用户" },
      formBase: {},
    };
  },

  created() {
    this.getprovinceList();
    this.getStatusList();
    this.getCompanyList();
  },

  methods: {
    // 城市
    getprovinceList() {
      const res = provinces();
      this.provinceInfo = res;
    },
    // 地区
    provinceChange() {
      if (this.formData.province) {
        const res = citys(this.formData.province);
        this.cityInfo = res;
        this.formData.city = this.cityInfo[0];
      } else {
        this.$message.error("先选择城市");
      }
    },
    // 状态
    getStatusList() {
      this.statusInfo = status;
    },
    // 公司信息列表
    async getCompanyList(info) {
      this.loading = true;
      const res = await list(info);
      const companyList = [];
      res.data.items.forEach((item) => {
        companyList.push({
          id: item.id,
          number: item.number,
          shortName: item.shortName,
          tags: item.tags,
          creatorID: item.creatorID,
          addDate: dayjs(item.addDate).format("YYYY-MM-DD HH:mm:ss"),
          remarks: item.remarks,
          state: item.state === 1 ? "启用" : "禁用",
        });
      });
      this.tableData = companyList;
      this.pagesize = res.data.pagesize;
      this.total = res.data.counts;
      this.page = res.data.page;
      this.loading = false;
      // console.log(res);
    },
    // 分页
    prevClick() {
      this.page--;
      this.getCompanyList({
        page: this.page,
        pagesize: this.pagesize,
      });
    },
    nextClick() {
      this.page++;
      this.getCompanyList({
        page: this.page,
        pagesize: this.pagesize,
      });
    },
    pageChange(pageNum) {
      this.page = pageNum;
      this.getCompanyList({
        page: this.page,
        pagesize: this.pagesize,
      });
    },
    pageSizeChange(pageSize) {
      this.pagesize = pageSize;
      this.getCompanyList({
        page: this.page,
        pagesize: this.pagesize,
      });
    },
    // 启用,禁用
    changeState(val) {
      if (val.state === "启用") {
        this.$confirm("此操作将禁用, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            this.$message({
              type: "success",
              message: "已成功禁用",
            });
            val.state = 0;
            await editState(val.id, val.state);
            val.state = "禁用";
            await this.getCompanyList();
          })
          .catch(() => {
            this.$message("已取消操作");
          });
        // this.tableData.state="启用"
      }
    },
    changeState1(val) {
      console.log(val);
      if (val.state === "禁用") {
        this.$confirm("此操作将启用, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            this.$message({
              type: "success",
              message: "已成功启用",
            });
            val.state = 1;
            await editState(val.id, val.state);
            val.state = "启用";
            await this.getCompanyList();
          })
          .catch(() => {
            this.$message("已取消操作");
          });
        // this.tableData.state="启用"
      }
    },
    // 编辑
    editCompanyInfo(val) {
      this.dialogFormVisible = true;
      this.titleInfo.text = "编辑";
      const res = getUpdateCompany(val.id, { id: val.id });
      res.then((result) => {
        this.formBase = result.data;
        if (this.formBase.isFamous == 0) {
          this.formBase.isFamous = true;
        } else {
          this.formBase.isFamous = false;
        }
        // console.log(this.formBase);
      });
    },
    // 新增
    addCompanyInfo() {
      this.dialogFormVisible = true;
      this.titleInfo.text = "新增";
      this.formBase = { isFamous: false };
    },
    newDataes() {
      this.dialogFormVisible = false;
      this.getCompanyList();
    },
    // 删除
    delCompanyInfo(val) {
      this.$confirm("此操作将永久删除用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await delCompany(val.id);
          this.$message({
            type: "success",
            message: "已成功删除",
          });
          await this.getCompanyList();
        })
        .catch(() => {
          this.$message("已取消操作");
        });
    },
    // 搜索
    onSearchCompany() {
      const searchInfo = {};
      for (let k in this.formData) {
        if (this.formData[k]) {
          searchInfo[k] = this.formData[k];
        }
      }
      const data = { ...searchInfo };
      this.getCompanyList(data);
    },
    // 清除
    onClearCompany() {
      this.formData = {
        province: "",
        city: "",
        state: "",
        shortName: "",
        tags: "",
      };
    },
  },
};
</script>

<style lang="scss">
.pagination {
  margin-top: 10px;
  .pages {
    margin-top: 20px;
    text-align: right;
  }
}
.cell {
  justify-content: center;
}
.baberrage {
  height: 250px;
}
</style>
