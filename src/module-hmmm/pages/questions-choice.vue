<template>
  <div class="container">
    <Card addText="新增试题" @isShow="addQuestions">
      <template #title>
        <!-- 头部说明文字 -->
        <el-col :span="12">
          <span class="explain"
            >说明：目前支持学科和关键字条件筛选(倪铭峰)</span
          >
        </el-col>
      </template>
      <!-- 头部输入框/选择框Start -->
      <Col label="学科">
        <el-select
          v-model="formData.subjectID"
          placeholder="请选择"
          @change="subjectChange"
        >
          <el-option
            v-for="item in subjects"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        ></Col
      >
      <Col label="二级目录">
        <el-select v-model="formData.catalogID" placeholder="请选择">
          <el-option
            v-for="item in catalogs"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </Col>
      <Col label="标签">
        <el-select v-model="formData.tags" placeholder="请选择">
          <el-option
            v-for="item in tags"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option> </el-select
      ></Col>
      <Col label="关键字">
        <el-input v-model="formData.keyword" placeholder="请输入内容"></el-input
      ></Col>
      <Col label="试题类型">
        <el-select v-model="formData.questionType" placeholder="请选择">
          <el-option
            v-for="item in questionType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option> </el-select
      ></Col>
      <Col label="难度">
        <el-select v-model="formData.difficulty" placeholder="请选择">
          <el-option
            v-for="item in difficulty"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option> </el-select
      ></Col>
      <Col label="方向">
        <el-select v-model="formData.direction" placeholder="请选择">
          <el-option
            v-for="item in direction"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </Col>
      <Col label="录入人">
        <el-select v-model="formData.creatorID" placeholder="请选择">
          <el-option
            v-for="item in creator"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          >
          </el-option> </el-select
      ></Col>
      <Col label="题目备注">
        <el-input v-model="formData.remarks" placeholder="请输入内容"></el-input
      ></Col>
      <Col label="企业简称">
        <el-input
          v-model="formData.shortName"
          placeholder="请输入内容"
        ></el-input
      ></Col>
      <Col label="城市" class="city">
        <el-select
          v-model="formData.province"
          placeholder="请选择"
          @change="cityChange"
        >
          <el-option
            v-for="item in province"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <el-select v-model="formData.city" placeholder="请选择">
          <el-option
            v-for="item in city"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option> </el-select
      ></Col>
      <Col>
        <el-button size="small" @click="clearFormData">清空</el-button>
        <el-button type="primary" size="small" @click="search">搜索</el-button>
      </Col>
      <!-- 头部输入框/选择框End -->

      <!-- 标签页 -->
      <el-col>
        <Tabs @tabsChange="tabsChange"></Tabs>
        <el-alert
          :title="`共${formData.counts}条记录`"
          type="info"
          :closable="false"
          show-icon
        >
        </el-alert>
        <!-- 主体列表内容 -->
        <TreeTable
          :columns="columns"
          :data="tableData"
          :listLoading="listLoading"
        >
          <template slot-scope="{ row }">
            <el-button type="text">预览</el-button>
            <el-button
              type="text"
              @click="checkDialogShow(row)"
              :disabled="row.chkState !== 0"
              >审核</el-button
            >
            <el-button
              type="text"
              :disabled="row.publishState === 1 && row.chkState === 1"
              @click="$router.push(`/questions/new?id=${row.id}`)"
              >修改</el-button
            >
            <el-button @click="questionIssue(row)" type="text">{{
              row.publishState === 1 ? "下架" : "上架"
            }}</el-button>
            <el-button
              type="text"
              :disabled="row.publishState === 1 && row.chkState === 1"
              @click="delQuestion(row)"
              >删除</el-button
            >
          </template>
        </TreeTable>

        <!-- 分页 -->
        <PageTool
          :total="formData.counts"
          @pageSizeChange="pageSizeChange"
          @pageChange="pageChange"
        ></PageTool>
      </el-col>
    </Card>

    <!-- 审核弹层 -->
    <el-dialog
      title="题目审核"
      :visible.sync="checkDialog"
      @close="checkClose"
      width="20%"
    >
      <el-form ref="form">
        <el-form-item>
          <el-radio v-model="checkInfo.chkState" :label="1">通过</el-radio>
          <el-radio v-model="checkInfo.chkState" :label="2">拒绝</el-radio>
        </el-form-item>
        <el-form-item>
          <el-input
            type="textarea"
            placeholder="请输入审核意见"
            v-model="checkInfo.chkRemarks"
            maxlength="30"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="checkClose">取 消</el-button>
        <el-button type="primary" @click="commitCheck">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Card from "@/components/Card/";
import Col from "@/components/Col/";
import Tabs from "@/components/tabs/";
import TreeTable from "@/components/TreeTable/";
import PageTool from "@/module-manage/components/page-tool.vue";
import { simple as creatorSimple } from "@/api/base/users.js";
import { provinces, citys } from "@/api/hmmm/citys.js";
import {
  choice,
  choiceCheck,
  choicePublish,
  remove,
} from "@/api/hmmm/questions.js";
import { simple as subjectsSimple } from "@/api/hmmm/subjects.js";
import {
  questionType,
  difficulty,
  chkType,
  publishType,
  getEnumByValue,
  direction,
} from "@/api/hmmm/constants.js";
import { simple as directorysSimple } from "@/api/hmmm/directorys";
import { simple as tagsSimple } from "@/api/hmmm/tags.js";
import dayjs from "dayjs";

export default {
  name: "choice",
  data() {
    return {
      listLoading: false,
      // 审核弹层
      checkDialog: false,
      // 审核数据
      checkInfo: {
        // 审核单选框
        chkState: 1,
        // 审核意见
        chkRemarks: "",
      },
      activeName: "",
      columns: [
        {
          text: "试题编号",
          value: "number",
        },
        {
          text: "学科",
          value: "subject",
        },
        {
          text: "目录",
          value: "catalog",
        },
        {
          text: "题型",
          value: "questionTypeLabel",
        },
        {
          text: "题干",
          value: "question",
        },
        {
          text: "录入时间",
          value: "addDate",
        },
        {
          text: "难度",
          value: "difficultyLabel",
        },
        {
          text: "录入人",
          value: "creator",
        },
        {
          text: "审核状态",
          value: "chkTypeLabel",
        },
        {
          text: "审核意见",
          value: "chkRemarks",
        },
        {
          text: "审核人",
          value: "chkUser",
        },
        {
          text: "发布状态",
          value: "publishLabel",
        },
      ],
      tableData: [],
      // 学科
      subjects: [],
      // 二级目录
      catalogs: [],
      // 标签
      tags: [],
      // 试题类型
      questionType: questionType,
      // 难度
      difficulty: difficulty,
      // 方向
      direction: direction,
      // 录入人
      creator: [],
      // 城市
      province: provinces(),
      city: [],
      // 请求需要的数据
      formData: {
        // 学科
        subjectID: null,
        // 二级目录
        catalogID: null,
        // 标签
        tags: null,
        // 关键字
        keyword: null,
        // 试题类型
        questionType: null,
        // 难度
        difficulty: null,
        // 方向
        direction: null,
        // 录入人
        creatorID: null,
        // 题目备注
        remarks: null,
        // 企业简称
        shortName: null,
        // 省份
        province: null,
        // 城市
        city: null,

        pagesize: 5,
      },
    };
  },

  created() {
    this.getChoiceList();
    this.getSubjects();
    this.getCreatorList();
  },

  methods: {
    // 获取试题列表
    async getChoiceList() {
      this.listLoading = true;
      const { data } = await choice(this.formData);
      this.tableData = data.items;
      this.formData.counts = data.counts;
      this.formData.page = data.page;
      this.formData.pagesize = data.pagesize;
      this.formData.pages = data.pages;
      this.tableData.forEach((item) => {
        // 处理题型
        item.questionTypeLabel = getEnumByValue(
          questionType,
          item.questionType - 0
        )?.label;

        // 时间
        item.addDate = dayjs(item.addDate).format("YYYY-MM-DD HH:mm:ss");

        // 难度
        item.difficultyLabel = getEnumByValue(
          difficulty,
          item.difficulty - 0
        )?.label;

        // 审核状态
        const chkTypeEnum = getEnumByValue(chkType, item.chkState - 0);

        item.chkTypeLabel = chkTypeEnum?.label;

        // 发布状态
        const publishEnum = getEnumByValue(publishType, item.publishState - 0);

        if (chkTypeEnum?.value === 0 || chkTypeEnum?.value === 2) {
          item.publishLabel = "待发布";
        } else {
          item.publishLabel = publishEnum?.label;
        }
      });
      this.listLoading = false;
    },
    // tab栏切换发请求
    tabsChange(chkType) {
      this.formData.chkState = chkType;
      this.getChoiceList();
    },
    // 新增试题
    addQuestions() {
      this.$router.push("/questions/new");
    },
    // 审核弹层
    checkDialogShow(row) {
      this.checkInfo.id = row.id;
      this.checkDialog = true;
      console.log(row.publishState);
    },
    // 审核弹层关闭
    checkClose() {
      this.checkDialog = false;
    },
    // 提交审核
    async commitCheck() {
      if (this.checkInfo.chkRemarks.length === 0) {
        return this.$message.error("请输入审核意见");
      }
      await choiceCheck(this.checkInfo);
      this.$message.success("审核成功");
      this.getChoiceList();
      this.checkClose();
    },
    // 上下/下架
    async questionIssue(row) {
      console.log(row);
      const data = {};
      data.id = row.id;
      data.publishState = row.publishState;
      if (data.publishState === 0) {
        data.publishState = 1;
      } else {
        data.publishState = 0;
      }
      try {
        await this.$confirm(
          `您确认${row.publishState === 1 ? "下架" : "上架"}这道题目吗?`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        );
        await choicePublish(data);
        this.$message.success(
          `${row.publishState === 1 ? "下架" : "上架"}成功`
        );
        this.getChoiceList();
      } catch (error) {}
    },
    // 删除功能
    async delQuestion(row) {
      try {
        await this.$confirm("此操作将永久删除该题目, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        await remove(row);
        this.$message.success("删除成功");

        // 先判断  删除的数据是不是该页最后一条
        // 如果不是 page不变
        // 如果是  再判断page是不是1  如果是1  不变  大于1  就-1
        if (
          this.formData.counts % this.formData.pagesize === 1 &&
          this.formData.page > 1
        ) {
          this.formData.page -= 1;
        }
        // 一页 10条  pagesize = 10
        // 一共41条  =  第五页只有1条
        // 41 / 10 = 4
        // 41 % 10 = 1

        this.getChoiceList();
      } catch (error) {}
    },
    // 一页显示多少条
    pageSizeChange(val) {
      console.log(val);
      this.formData.pagesize = val;
      this.getChoiceList();
    },
    // 分页切换
    pageChange(val) {
      this.formData.page = val;
      this.getChoiceList();
    },
    // 获取学科简单列表
    async getSubjects() {
      const { data } = await subjectsSimple();
      this.subjects = data;
    },
    // 学科选择之后
    async subjectChange() {
      this.formData.catalogID = null;
      this.formData.tags = null;
      this.catalogs = [];
      this.tags = [];
      const { data } = await directorysSimple({
        subjectID: this.formData.subjectID,
      });
      this.catalogs = data;
      const res = await tagsSimple({ subjectID: this.formData.subjectID });
      this.tags = res.data;
    },
    // 搜索
    search() {
      console.log(this.formData);
      this.getChoiceList();
    },
    // 清除
    clearFormData() {
      this.catalogs = [];
      this.tags = [];
      this.formData = {
        // 学科
        subjectID: null,
        // 二级目录
        catalogID: null,
        // 标签
        tags: null,
        // 关键字
        keyword: null,
        // 试题类型
        questionType: null,
        // 难度
        difficulty: null,
        // 方向
        direction: null,
        // 录入人
        creatorID: null,
        // 题目备注
        remarks: null,
        // 企业简称
        shortName: null,
        // 省份
        province: null,
        // 城市
        city: null,

        pagesize: 5,
      };
    },
    // 获取二级城市
    cityChange() {
      this.city = citys(this.formData.province);
    },
    // 获取录入人简单列表
    async getCreatorList() {
      const { data } = await creatorSimple();
      this.creator = data;
    },
  },

  components: {
    Card,
    Col,
    Tabs,
    TreeTable,
    PageTool,
  },
};
</script>

<style scoped lang="less">
.explain {
  font-size: 12px;
  color: pink;
}
:deep(.el-form) {
  .el-row {
    .el-col:nth-child(2) {
      margin-bottom: 15px;
    }
  }
}
.el-select,
.el-input {
  width: 300px;
}
:deep(.city) {
  .el-form-item__content {
    display: flex;
    .el-select:first-child {
      margin-right: 2%;
    }
  }
}
.el-alert--info.is-light {
  margin-bottom: 15px;
}
:deep(.el-form-item__content) {
  margin-left: 0;
}
</style>
