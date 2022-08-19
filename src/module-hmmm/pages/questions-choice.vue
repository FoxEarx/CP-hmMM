<template>
  <div class="container">
    <Card addText="新增试题">
      <template #title>
        <!-- 头部说明文字 -->
        <el-col :span="12">
          <span class="explain"
            >说明：目前支持学科和关键字条件筛选(倪铭峰)</span
          >
        </el-col>
      </template>
      <!-- 头部输入框/选择框Start -->
      <Col label="学科"></Col>
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
      <Col label="关键字"></Col>
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
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </Col>
      <Col label="录入人">
        <el-select v-model="formData.creatorID" placeholder="请选择">
          <el-option
            v-for="item in creator"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option> </el-select
      ></Col>
      <Col label="题目备注"></Col>
      <Col label="企业简称"></Col>
      <Col label="城市" class="city">
        <el-select v-model="formData.creatorID" placeholder="请选择">
          <el-option
            v-for="item in creator"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select v-model="formData.creatorID" placeholder="请选择">
          <el-option
            v-for="item in creator"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option> </el-select
      ></Col>
      <Col>
        <el-button size="small">清空</el-button>
        <el-button type="primary" size="small">搜索</el-button>
      </Col>
      <!-- 头部输入框/选择框End -->

      <!-- 标签页 -->
      <el-row>
        <el-col>
          <Tabs></Tabs>
          <el-alert
            :title="`共10条记录`"
            type="info"
            :closable="false"
            show-icon
          >
          </el-alert>
          <!-- 主体列表内容 -->
          <TreeTable :columns="columns" :data="tableData"> 13 </TreeTable>
        </el-col>
      </el-row>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/Card/";
import Col from "@/components/Col/";
import Tabs from "@/components/tabs/";
import TreeTable from "@/components/TreeTable/";
import { choice } from "@/api/hmmm/questions.js";
import {
  questionType,
  difficulty,
  chkType,
  publishType,
} from "@/api/hmmm/constants.js";
import dayjs from "dayjs";

export default {
  data() {
    return {
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
      // 二级目录
      catalogs: [],
      // 标签
      tags: [],
      // 试题类型
      questionType: [],
      // 难度
      difficulty: [],
      // 方向
      direction: [],
      // 录入人
      creator: [],
      // 城市
      city: [],
      // 请求需要的数据
      formData: {
        // 学科
        subjectID: "",
        // 二级目录
        catalogID: "",
        // 标签
        tags: "",
        // 关键字
        keyword: "",
        // 试题类型
        questionType: "",
        // 难度
        difficulty: "",
        // 方向
        direction: "",
        // 录入人
        creatorID: "",
        // 题目备注
        remarks: "",
        // 企业简称
        shortName: "",
        // 城市
        city: "",
      },
      subjects: [],
    };
  },

  created() {
    this.getChoiceList();
  },

  methods: {
    // 获取试题列表
    async getChoiceList() {
      const { data } = await choice();
      console.log(data);
      this.tableData = data.items;
      this.tableData.forEach((item) => {
        // 处理题型
        item.questionTypeLabel = questionType.find((el) => {
          return el.value + "" === item.questionType;
        })?.label;

        // 时间
        item.addDate = dayjs(item.addDate).format("YYYY-MM-DD HH:mm:ss");

        // 难度
        item.difficultyLabel = difficulty.find((el) => {
          return el.value + "" === item.difficulty;
        })?.label;

        // 审核状态
        const chkTypeEnum = chkType.find((el) => {
          return el.value === item.chkState;
        });
        item.chkTypeLabel = chkTypeEnum?.label;

        // 审核状态
        const publishEnum = publishType.find((el) => {
          return el.value === item.publishState;
        });

        if (publishEnum?.value === 0 && chkType?.value === 1) {
          item.publishLabel = "待发布";
        } else {
          item.publishLabel = publishEnum?.label;
        }
      });
    },
  },

  components: {
    Card,
    Col,
    Tabs,
    TreeTable,
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
.el-select {
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
</style>
