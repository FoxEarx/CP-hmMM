<template>
  <div class="container question-new">
    <el-card class="box-card" shadow="always">
      <div slot="header" class="clearfix">
        <span>{{ this.$route.query.id ? "试题修改" : "试题录入" }}</span>
      </div>
      <el-form
        ref="form"
        :model="formData"
        :rules="formRules"
        size="medium"
        label-width="120px"
      >
        <el-form-item label="学科: " prop="subjectID">
          <el-select
            v-model="formData.subjectID"
            placeholder="请选择"
            size="medium"
            style="width: 400px"
            @change="subjectChange"
          >
            <el-option
              v-for="item in subJectInfo"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              ref="subjectSelect"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目录: " prop="catalogID">
          <el-select
            v-model="formData.catalogID"
            placeholder="请选择"
            size="medium"
            style="width: 400px"
          >
            <el-option
              v-for="item in catalodInfo"
              :key="item.id"
              :label="item.directoryName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业: " prop="enterpriseID">
          <el-select
            v-model="formData.enterpriseID"
            placeholder="请选择"
            size="medium"
            style="width: 400px"
          >
            <el-option
              v-for="item in enterpriseInfo"
              :key="item.id"
              :label="item.company"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市: " prop="city">
          <el-select
            v-model="formData.province"
            placeholder="请选择"
            size="medium"
            style="width: 198px"
            @change="provinceChange"
          >
            <el-option
              v-for="(item, index) in provinceInfo"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <el-select
            v-model="formData.city"
            placeholder="请选择"
            size="medium"
            style="width: 198px; margin-left: 4px"
          >
            <el-option
              v-for="(item, index) in cityInfo"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="方向: " prop="direction">
          <el-select
            v-model="formData.direction"
            placeholder="请选择"
            size="medium"
            style="width: 400px"
          >
            <el-option
              v-for="(item, index) in directionInfo"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型: " prop="questionType">
          <template>
            <el-radio
              v-model="formData.questionType"
              v-for="item in questionTypeInfo"
              :key="item.value"
              :label="item.value"
              @change="questionTypeChange"
              >{{ item.label }}</el-radio
            >
          </template>
        </el-form-item>
        <el-form-item label="难度: " prop="difficulty">
          <template>
            <el-radio
              v-model="formData.difficulty"
              v-for="item in difficultyInfo"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </template>
        </el-form-item>
        <el-form-item label="题干: " prop="question">
          <quill-editor
            ref="myQuillEditor"
            v-model="formData.question"
            :options="editorOption"
          />
        </el-form-item>
        <el-form-item v-if="formData.questionType == 1" label="选项: ">
          <div
            class="option-item"
            v-for="item in optionsInfo"
            :key="item.value"
          >
            <el-radio
              v-model="formData.options.code"
              :label="item.value"
              @change="redioOptionsChange"
              >{{ item.label }}:
            </el-radio>
            <el-input
              size="medium"
              style="width: 240px"
              v-model="item.title"
            ></el-input>

            <el-upload
              :bindIndex="item.value"
              style="margin-left: 4px"
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeUpload"
            >
              <i class="el-icon-circle-close"></i>
              <img v-if="item.img" :src="item.img" class="avatar" />
              <span v-else>上传图片</span>
            </el-upload>
          </div>
          <el-button disabled type="danger" size="small">
            <span>+增加选项与答案</span>
          </el-button>
        </el-form-item>
        <el-form-item v-else-if="formData.questionType == 2" label="选项: ">
          <div
            class="option-item"
            v-for="item in optionsInfo"
            :key="item.value"
          >
            <el-checkbox-group
              v-model="valuesInfo"
              @change="checkedOptionsChange"
            >
              <el-checkbox :label="item.value">{{ item.label }}: </el-checkbox>
            </el-checkbox-group>
            <el-input
              size="medium"
              style="width: 240px"
              v-model="item.title"
            ></el-input>

            <el-upload
              :bindIndex="item.value"
              style="margin-left: 4px"
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeUpload"
            >
              <i class="el-icon-circle-close"></i>
              <img v-if="item.img" :src="item.img" class="avatar" />
              <span v-else>上传图片</span>
            </el-upload>
          </div>
          <el-button @click="addOptions" type="danger" size="small">
            <span>+增加选项与答案</span>
          </el-button>
        </el-form-item>
        <el-form-item label="解析视频: ">
          <el-input v-model="formData.videoURL" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="答案解析: " prop="answer">
          <quill-editor
            ref="myQuillEditor"
            v-model="formData.answer"
            :options="editorOption"
          />
        </el-form-item>
        <el-form-item label="题目备注: ">
          <el-input
            type="textarea"
            :rows="4"
            v-model="formData.remarks"
            style="min-height: 33px; width: 400px"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="试题标签: ">
          <el-select
            allow-create
            filterable
            multiple
            v-model="formData.tags"
            placeholder="请选择试题标签"
            size="medium"
            style="width: 400px"
          >
            <el-option
              v-for="item in tagsInfo"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-if="this.$route.query.id" type="success" @click="onEdit"
            >确认修改</el-button
          >
          <el-button v-else type="primary" @click="onSave">确认提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="baberrage">
      <Baberrage></Baberrage>
    </div>
  </div>
</template>

<script>
import { add, update } from "@/api/hmmm/questions.js";
import { simple } from "@/api/hmmm/subjects.js";
import { list } from "@/api/hmmm/directorys.js";
import {
  companyList,
  tagsSimpleList,
  optionsInfo,
  addOptionsInfo,
} from "@/api/hmmm/juan.js";
import { provinces, citys } from "@/api/hmmm/citys.js";
import { direction, difficulty, questionType } from "@/api/hmmm/constants.js";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import Baberrage from "../components/juan/baberrage.vue";
import { detail } from "@/api/hmmm/questions";
export default {
  components: {
    Baberrage,
  },
  data() {
    return {
      // 传进来的ID
      index: -1,
      formData: {
        subjectID: "",
        catalogID: "",
        enterpriseID: "",
        province: "",
        city: "",
        direction: "",
        questionType: "1",
        difficulty: "1",
        question: "",
        options: { code: "", title: "", img: "", isRight: "" },
        videoURL: "",
        answer: "",
        remarks: "",
        tags: "",
      },
      isvalue: 1,
      directoryName: "",
      redioList: [],
      FjredioList: [],
      number: "",
      subJectInfo: [],
      catalodInfo: [],
      enterpriseInfo: [],
      provinceInfo: [{}],
      cityInfo: [],
      directionInfo: [],
      tagsInfo: [],
      questionTypeInfo: [],
      difficultyInfo: [],
      optionsInfo: [],
      valuesInfo: [],
      formRules: {
        subjectID: [
          { required: true, message: "请选择学科", trigger: "change" },
        ],
        catalogID: [
          { required: true, message: "请选择目录", trigger: "change" },
        ],
        enterpriseID: [
          { required: true, message: "请选择企业", trigger: "change" },
        ],
        city: [{ required: true, message: "请选择地区", trigger: "change" }],
        direction: [
          { required: true, message: "请选择方向", trigger: "change" },
        ],
        questionType: [
          { required: true, message: "请选择题型", trigger: "change" },
        ],
        difficulty: [
          { required: true, message: "请选择难度", trigger: "change" },
        ],
        question: [{ required: true, message: "请输入题干", trigger: "blur" }],
        answer: [{ required: true, message: "请输入答案", trigger: "blur" }],
      },
      editorOption: {
        modules: {
          // 代码高亮
          syntax: {
            highlight: (text) => {
              return hljs.highlightAuto(text).value; // 这里就是代码高亮需要配置的地方
            },
          },
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
            ["blockquote"], // 引用  代码块-----['blockquote', 'code-block']
            ["code-block", "image", "link"], // 链接、图片、视频-----
          ],
        },
      },
    };
  },
  computed: {
    picupload() {
      return "picupload" + this.formData.options.code;
    },
  },
  created() {
    this.getSubjectList();
    this.getEnterpriseList();
    this.getprovinceList();
    this.getDirectionList();
    this.getQuestionTypeList();
    this.getDifficultyList();
    this.getOptionsInfoList();
    if (this.$route.query.id) {
      this.detail();
    }
  },
  mounted() {},
  methods: {
    // 编辑功能 获得详细数据-------------------------------------
    async detail() {
      this.optionsInfo = [];
      const res = await detail({
        id: this.$route.query.id,
      });
      console.log("fj", res);
      this.formData.subjectID = res.data.subjectID;
      this.formData.catalogID = res.data.catalogID;
      this.formData.enterpriseID = res.data.enterpriseID;
      this.formData.province = res.data.province;
      this.formData.city = res.data.city;
      this.formData.direction = res.data.direction;
      this.formData.questionType = parseInt(res.data.questionType);
      this.formData.difficulty = parseInt(res.data.difficulty);
      const Question = res.data.question.replace(/<[^>]*>/g, "");
      this.formData.question = Question;
      this.formData.videoURL = res.data.videoURL;
      const Answer = res.data.answer.replace(/<[^>]*>/g, "");
      this.formData.answer = Answer;
      this.formData.remarks = res.data.remarks;
      const a = res.data.tags;
      const istags = a.split(",");
      this.formData.tags = istags;
      console.log(res.data.options);
      this.number = res.data.number;
      const { data } = await list({ subjectID: this.formData.subjectID });
      this.catalodInfo = data.items;
      console.log("o", this.optionsInfo);
      this.redioList = res.data.options.map((v) => {
        return {
          label: v.code,
          isRight: v.isRight === 1 ? true : false,
          value: this.isvalue++,
          img: v.img,
          title: v.title,
        };
      });
      const isRight = this.redioList.filter((item) => {
        return item.isRight === true;
      });

      console.log("is", isRight);
      const IsvaluesInfo = isRight.map((item) => {
        return item.value;
      });
      this.valuesInfo = IsvaluesInfo;
      this.formData.options.code = isRight[0].value;
      this.FjredioList = this.redioList.map((v) => {
        return {
          code: v.label,
          isRight: v.isRight,
          img: v.img,
          title: v.title,
          id: v.id,
          questionsID: v.questionsID,
        };
      });
      this.optionsInfo = this.redioList;
      this.isvalue = 0;
      console.log("1", this.optionsInfo);
      console.log(this.redioList);
    },
    // 点击修改
    async onEdit() {
      await this.$refs.form.validate();
      console.log(this.$refs.subjectSelect.label);
      this.formData.tags = this.formData.tags.join(",");
      this.formData.questionType = this.formData.questionType.toString();
      this.formData.difficulty = this.formData.difficulty.toString();
      const Theid = this.$route.query.id;

      await update({
        id: parseInt(Theid),
        answer: this.formData.answer,
        question: this.formData.question,
        province: this.formData.province,
        city: this.formData.city,

        catalogID: this.formData.catalogID,
        subjectID: this.formData.subjectID,
        difficulty: this.formData.difficulty,
        direction: this.formData.direction,
        enterpriseID: this.formData.enterpriseID,
        options: this.FjredioList,
        questionType: this.formData.questionType,
        remarks: this.formData.remarks,
        tags: this.formData.tags,
        videoURL: this.formData.videoURL,
        number: this.number,
      });
      this.$message.success("修改成功");
      this.$router.go(-1);
    },
    // 学科
    async getSubjectList() {
      const { data } = await simple();
      this.subJectInfo = data;
    },
    // 目录,标签
    async subjectChange() {
      this.formData.catalogID = "";
      this.formData.tags = [];
      // 目录
      const { data } = await list({ subjectID: this.formData.subjectID });
      this.catalodInfo = data.items;
      // 标签
      const res = await tagsSimpleList({ subjectID: this.formData.subjectID });
      this.tagsInfo = res.data;
    },
    // 企业
    async getEnterpriseList() {
      const res = await companyList({ pagesize: 1000 });
      this.enterpriseInfo = res.data.items;
    },
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
      } else {
        this.$message.error("先选择城市");
      }
    },
    // 方向
    getDirectionList() {
      this.directionInfo = direction;
    },
    //题型
    getQuestionTypeList() {
      this.formData.questionType = 1;
      this.questionTypeInfo = questionType;
    },
    questionTypeChange(val) {
      if (val === 1) {
        this.optionsInfo = [
          {
            value: 1,
            label: "A",
            title: "",
            img: "",
            isRight: false,
          },
          {
            value: 2,
            label: "B",
            title: "",
            img: "",
            isRight: false,
          },
          {
            value: 3,
            label: "C",
            title: "",
            img: "",
            isRight: false,
          },
          {
            value: 4,
            label: "D",
            title: "",
            img: "",
            isRight: false,
          },
        ];
      }
    },
    // 难度
    getDifficultyList() {
      this.formData.difficulty = 1;
      this.difficultyInfo = difficulty;
    },
    // 选项
    getOptionsInfoList() {
      this.optionsInfo = optionsInfo;
    },
    // 增加选项按钮
    addOptions() {
      if (this.index == 10) {
        return this.$message.error("不能继续增加了");
      } else {
        this.optionsInfo.push({
          value: this.optionsInfo.length + 1,
          label: addOptionsInfo[this.index + 1],
          img: "",
          title: "",
          isRight: false,
        });
        this.index = this.index + 1;
      }
    },
    // 单选框change事件
    redioOptionsChange(val) {
      for (const k in this.optionsInfo) {
        if (this.optionsInfo[k].value == val) {
          this.optionsInfo[k].isRight = true;
        } else {
          this.optionsInfo[k].isRight = false;
        }
      }
    },
    // 多选框change事件
    checkedOptionsChange(val) {
      for (let k in this.optionsInfo) {
        this.optionsInfo[k].isRight = false;
        for (let v in val) {
          if (this.optionsInfo[k].value == val[v]) {
            this.optionsInfo[k].isRight = true;
          }
        }
      }
    },
    // 图片
    beforeUpload(file) {
      // 可以上传的图片类型
      const types = ["image/jpeg", "image/gif", "image/png", "image/jpg"];
      if (!types.includes(file.type)) {
        this.$message.error("请选择" + types.join("、") + "图片");
        return false;
      }
      //   限制上传的图片大小
      const maxSize = 180 * 1024;
      if (file.size > maxSize) {
        this.$message.error("选择的图片不能超过2mb");
        return false;
      }
    },
    handleAvatarSuccess(response, file, fileList, index) {
      console.log(URL.createObjectURL(file.raw));
      this.optionsInfo[index - 1].img = URL.createObjectURL(file.raw); //用来显示
    },
    // 新增试题
    async onSave() {
      await this.$refs.form.validate();
      try {
        this.formData.tags = this.formData.tags.join(" ");
        this.formData.questionType = this.formData.questionType.toString();
        this.formData.difficulty = this.formData.difficulty.toString();
        // console.log(this.formData.videoURL);
        this.redioList = this.optionsInfo.map((v) => {
          return {
            code: v.label,
            isRight: v.isRight,
            img: v.img,
            title: v.title,
          };
        });
        await add({
          answer: this.formData.answer,
          question: this.formData.question,
          province: this.formData.province,
          city: this.formData.city,
          catalogID: this.formData.catalogID,
          subjectID: this.formData.subjectID,
          difficulty: this.formData.difficulty,
          direction: this.formData.direction,
          enterpriseID: this.formData.enterpriseID,
          options: this.redioList,
          questionType: this.formData.questionType,
          remarks: this.formData.remarks,
          tags: this.formData.tags,
          videoURL: this.formData.videoURL,
        });
        this.$message.success("试题录入成功");
        this.$router.push("/questions/list");
      } catch (error) {
        this.$message.error("请将信息填写完整");
      }
    },
  },
};
</script>

<style scoped lang="less">
.question-new {
  .el-checkbox-group {
    display: inline-block;
  }
  :deep(.el-checkbox__label) {
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: 14px;
    margin-right: 10px;
  }
  .el-radio {
    margin-right: 10px;
  }
  padding: 20px;
  :deep(.option-item) {
    padding-bottom: 20px;
  }
  :deep(.ql-editor) {
    height: 200px;
  }
  .avatar-uploader {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    i {
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(50%, -50%);
      background: #fff;
      font-size: 18px;
      color: #999;
    }
    :deep(.el-upload) {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      // cursor: pointer;
      position: relative;
      width: 100px;
      height: 60px;
      line-height: 60px;
      display: inline-block;
      text-align: center;
      outline: 0;
      .avatar {
        width: 100px;
        height: 60px;
        display: block;
        overflow: hidden;
      }
    }
  }
}
.baberrage {
  height: 250px;
}
</style>
