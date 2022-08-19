<template>
  <div class="container">
    <el-card class="box-card">
      <!-- 顶部 -->
      <div>
        <span style="color: #ffc0cb" class="miniFont"
          >说明：目前支持学科和关键字条件筛选</span
        >
        <Button
          class="addButton"
          color="green"
          fontColor="fontWhite"
          :width="100"
          @isOn="$router.push('new')"
          ><i class="el-icon-edit"></i> 新增试题</Button
        >
      </div>
      <!-- 顶部 -->

      <!-- form表单部分 -->
      <el-form ref="form" :model="form" label-width="80px" class="form">
        <el-row>
          <el-col :span="6">
            <el-form-item label="学科">
              <el-select
                v-model="form.subjectID"
                placeholder="请选择"
                class="select"
              >
                <el-option
                  v-loading="loading"
                  v-for="item in tosimple"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  @click.native="ontosimple"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="二级目录">
              <el-select
                v-model="form.catalogID"
                placeholder="请选择"
                class="select"
              >
                <el-option
                  v-for="item in TheTwoLevelDirectory"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="标签">
              <el-select
                v-model="form.tags"
                placeholder="请选择"
                class="select"
              >
                <el-option
                  v-for="item in TheTags"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="关键字">
              <el-input v-model="form.keyword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="试题类型">
              <el-select
                v-model="form.questionType"
                placeholder="请选择"
                class="select"
              >
                <el-option label="单选" value="1"></el-option>
                <el-option label="多选" value="2"></el-option>
                <el-option label="简答" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="难度">
              <el-select
                v-model="form.difficulty"
                placeholder="请选择"
                class="select"
              >
                <el-option label="简单" value="1"></el-option>
                <el-option label="一般" value="2"></el-option>
                <el-option label="困难" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="方向">
              <el-select
                v-model="form.direction"
                placeholder="请选择"
                class="select"
              >
                <el-option label="o2o" value="o2o"></el-option>
                <el-option label="外包服务" value="外包服务"></el-option>
                <el-option label="企业服务" value="企业服务"></el-option>
                <el-option label="互联网金融" value="互联网金融"></el-option>
                <el-option label="企业咨询" value="企业咨询"></el-option>
                <el-option label="互联网" value="互联网"></el-option>
                <el-option label="电子商务" value="电子商务"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="录入人">
              <el-select
                v-model="form.creatorID"
                placeholder="请选择"
                class="select"
              >
                <el-option
                  v-for="item in users"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="题目备注">
              <el-input v-model="form.remarks"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="企业简称">
              <el-input v-model="form.shortName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="城市">
              <el-select
                v-model="form.city"
                placeholder="请选择"
                class="Cityselect selectLeft"
              >
                <el-option
                  v-loading="loading"
                  v-for="item in Theprovinces"
                  :key="item"
                  :label="item"
                  :value="item"
                  @click.native="onCity"
                ></el-option>
              </el-select>

              <el-select
                v-model="form.province"
                placeholder="请选择"
                class="Cityselect"
              >
                <el-option
                  v-loading="loading"
                  v-for="item in Thecitys"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <Button
              color="blue"
              fontColor="fontWhite"
              class="right"
              @isOn="Search"
              >搜索</Button
            >
            <Button class="right" @isOn="clear">清除</Button>
          </el-col>
        </el-row>
      </el-form>
      <!-- form表单部分 -->

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
        :tableData="tableData"
        :table="table"
        :isWidth="180"
        :isShowIndex="0"
        :TYPE="3"
        @Delete="Delete"
        @isEye="isEye"
        @choiceAddCheck="choiceAddCheck"
      ></Mytable>

      <!-- 页码显示 -->
      <Page
        class="page"
        :isSize="5"
        :total="counts"
        @newPage="newPage"
        @newSize="newSize"
      >
      </Page>
      <!-- 页码显示 -->

      <preview :visible.sync="AddDialogShow" :details="details"></preview>
    </el-card>
  </div>
</template>

<script>
import { simple } from "@/api/hmmm/subjects";
import { list } from "@/api/hmmm/questions";
import { provinces, citys } from "@/api/hmmm/citys";
import { getUsersListApi } from "@/api/hmmm/users";
import { twolist } from "@/api/hmmm/directorys";
import { remove } from "@/api/hmmm/questions";
import { detail } from "@/api/hmmm/questions";
import { choiceAdd } from "@/api/hmmm/questions";
import preview from "@/components/Fengjian/preview";
import dayjs from "dayjs";
import Button from "@/components/Fengjian/button";
import Mytable from "@/components/Fengjian/table";
import Page from "@/components/Fengjian/Page";
export default {
  data() {
    return {
      form: {
        subjectID: "",
        catalogID: "",
        tags: "",
        keyword: "",
        questionType: "",
        difficulty: "",
        direction: "",
        creatorID: "",
        remarks: "",
        shortName: "",
        city: "",
        province: "",
      },
      tosimple: [],
      loading: false,
      counts: 0,
      page: 1,
      pagesize: 5,
      tableData: [],
      Theprovinces: [],
      Thecitys: [],
      ClickCity: "",
      users: [],
      TheTwoLevelDirectory: [],
      details: [],
      TheTags: [],
      isSearch: false,
      AddDialogShow: false,
      table: [
        { prop: "number", label: "试题编号" },
        { prop: "subject", label: "学科" },
        { prop: "catalog", label: "目录" },
        { prop: "questionType", label: "题型" },
        { prop: "question", label: "题干" },
        { prop: "creator", label: "录入时间" },
        { prop: "difficulty", label: "难度" },
        { prop: "creator", label: "录入人" },
      ],
    };
  },
  components: {
    Button,
    Mytable,
    Page,
    preview,
  },
  created() {
    this.list();
    this.provinces();
    this.simple();
    this.getUsersListApi();
  },
  methods: {
    async isEye(val) {
      this.AddDialogShow = true;
      const res = await detail({
        id: val,
      });
      console.log(res);
      const unList = res.data;
      const todata = [];

      if (unList.difficulty === "1") {
        unList.difficulty = "简单";
      } else if (unList.difficulty === "2") {
        unList.difficulty = "一般";
      } else {
        unList.difficulty = "困难";
      }

      if (unList.questionType === "1") {
        unList.questionType = "单选题";
      } else if (unList.questionType === "2") {
        unList.questionType = "多选题";
      } else {
        unList.questionType = "简答题";
      }
      const str = unList.question.replace(/<[^>]*>/g, "");
      const answer = unList.answer.replace(/<[^>]*>/g, "");
      todata.push({
        questionType: unList.questionType,
        id: unList.id,
        difficulty: unList.difficulty,
        tags: unList.difficulty,
        subjectName: unList.subjectName,
        question: str,
        directoryName: unList.directoryName,
        direction: unList.direction,
        options: unList.options,
        videoURL: unList.videoURL,
        answer: answer,
        remarks: unList.remarks,
      });

      this.details = todata;
      console.log(this.details);
    },
    async list() {
      if (!this.isSearch) {
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
          if (item.difficulty === "1") {
            item.difficulty = "简单";
          } else if (item.difficulty === "2") {
            item.difficulty = "一般";
          } else {
            item.difficulty = "困难";
          }

          if (item.questionType === "1") {
            item.questionType = "单选题";
          } else if (item.questionType === "2") {
            item.questionType = "多选题";
          } else {
            item.questionType = "简答题";
          }
          const str = item.question.replace(/<[^>]*>/g, "");
          todata.push({
            number: item.number,
            subject: item.subject,
            catalog: item.catalog,
            questionType: item.questionType,
            question: str,
            creator: time,
            difficulty: item.difficulty,
            creator: item.creator,
            id: item.id,
          });
        });
        console.log(todata);
        this.tableData = todata;
      } else {
        console.log(this.isSearch);
        const res = await list({
          page: this.page,
          pagesize: this.pagesize,
          difficulty: this.form.difficulty,
          questionType: this.form.questionType,
          tags: this.form.tags,
          province: this.form.province,
          city: this.form.city,
          keyword: this.form.keyword,
          remarks: this.form.remarks,
          shortName: this.form.shortName,
          direction: this.form.direction,
          creatorID: this.form.creatorID,
          subjectID: this.form.subjectID,
          catalogID: this.form.catalogID,
        });
        console.log(res);
        this.counts = res.data.counts;
        const unList = res.data.items;
        const todata = [];
        unList.forEach((item) => {
          const time = dayjs(item.addDate).format("YYYY-MM-DD");
          if (item.difficulty === "1") {
            item.difficulty = "简单";
          } else if (item.difficulty === "2") {
            item.difficulty = "一般";
          } else {
            item.difficulty = "困难";
          }
          const str = item.question.replace(/<[^>]*>/g, "");
          todata.push({
            number: item.number,
            subject: item.subject,
            catalog: item.catalog,
            questionType: item.questionType,
            question: str,
            creator: time,
            difficulty: item.difficulty,
            creator: item.creator,
            id: item.id,
          });
        });
        console.log(todata);
        this.tableData = todata;
      }
    },
    async simple() {
      this.loading = true;
      const res = await simple();
      this.tosimple = res.data;
      this.loading = false;
    },
    provinces() {
      const res = provinces();
      this.Theprovinces = res;
    },
    onCity() {
      console.log(this.form.city);
      this.ClickCity = this.form.city;
      const res = citys(this.ClickCity);
      console.log(res);
      this.Thecitys = res;
    },
    async getUsersListApi() {
      const res = await getUsersListApi();
      const data = [];
      const list = res.data.list;
      list.forEach((item) => {
        data.push(item.username);
      });
      console.log(data);
      this.users = data;
    },
    async ontosimple() {
      const res = await twolist({
        subjectID: this.form.subjectID,
      });
      console.log("two", res);
      const unList = res.data.items;
      const todata = [];
      unList.forEach((item) => {
        todata.push(item.directoryName);
      });
      this.TheTwoLevelDirectory = todata;
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
      this.form = {
        subjectID: "",
        catalogID: "",
        tags: "",
        keyword: "",
        questionType: "",
        difficulty: "",
        direction: "",
        creatorID: "",
        remarks: "",
        shortName: "",
        city: "",
        province: "",
      };
    },
    Search() {
      this.isSearch = true;
      this.$refs.form.validate();
      console.log(this.form);
      this.list();
    },
    async Delete(val) {
      await remove({
        id: val,
      });
      this.$message.success("删除成功");
      await this.list();
      if (this.tableData.length === 0) {
        this.page--;
        this.list();
      }
    },
    async choiceAddCheck(val) {
      const res = await choiceAdd({
        id: val,
        choiceState: 1,
      });
      console.log(res);
      this.$message.success("加入精选成功");
      this.list();
    },
  },
};
</script>

<style scoped lang="less">
.addButton {
  float: right;
}
.miniFont {
  font-size: 12px;
}
.form {
  margin-top: 30px;
}
.select {
  width: 100%;
}
.Cityselect {
  width: 49%;
}
.right {
  float: right;
}
.selectLeft {
  margin-right: 6.5px;
}
.page {
  float: right;
  padding: 20px 0;
}
</style>
