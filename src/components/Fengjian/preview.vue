<template>
  <el-dialog @close="onClose" title="题目预览" :visible="visible" width="50%">
    <div class="dialog">
      <el-row>
        <el-col :span="6" class="font"
          >【题型】：{{ details[0].questionType }}</el-col
        >
        <el-col :span="6" class="font">【编号】：{{ details[0].id }}</el-col>
        <el-col :span="6" class="font"
          >【难度】：{{ details[0].difficulty }}</el-col
        >
        <el-col :span="6" class="font">【标签】：{{ details[0].tags }}</el-col>
      </el-row>

      <el-row class="bottom">
        <el-col :span="6" class="font"
          >【学科】：{{ details[0].subjectName }}</el-col
        >
        <el-col :span="6" class="font"
          >【目录】：{{ details[0].directoryName }}</el-col
        >
        <el-col :span="6" class="font"
          >【方向】：{{ details[0].direction }}</el-col
        >
        <el-col :span="6" class="font"></el-col>
      </el-row>

      <el-row>
        <el-col class="tg">【题干】：</el-col>
        <el-col class="question">{{ details[0].question }}</el-col>

        <!-- 如果是单选题 -->
        <el-row v-if="details[0].questionType === '单选题'">
          <el-col class="title">
            <span>单选题 选项：（以下选中的选项为正确答案）</span><br />
          </el-col>
          <el-col class="radio">
            <el-radio
              class="inradio"
              v-for="item in details[0].options"
              :key="item.id"
              v-model="radio"
              :label="item.isRight"
              >{{ item.title }}</el-radio
            >
          </el-col>
        </el-row>
        <!-- 如果是单选题 -->

        <!-- 如果是多选题 -->
        <el-row v-if="details[0].questionType === '多选题'">
          <el-col class="title">
            <span>多选题 选项：（以下选中的选项为正确答案）</span><br />
          </el-col>
          <el-col class="radio">
            <el-checkbox
              :value="item.isRight === 1 ? checked : right"
              v-for="item in details[0].options"
              :key="item.id"
              >{{ item.title }}</el-checkbox
            >
          </el-col>
        </el-row>
        <!-- 如果是多选题 -->

        <!-- 答案参考视频区域 -->
        <el-row class="theVideo">
          <el-col class="answer">
            <span>【参考答案】：</span>
            <Button
              :width="110"
              fontColor="fontWhite"
              color="red"
              @isOn="isvideo = true"
              >视频答案预览</Button
            >
          </el-col>
          <el-col>
            <video
              v-if="isvideo"
              width="400px"
              height="300px"
              class="video"
              :src="details[0].videoURL"
              preload="none"
              controls="controls"
              autoplay="autoplay"
            ></video>
          </el-col>
        </el-row>
        <!-- 答案参考视频区域 -->

        <!-- 答案解析 -->
        <el-row class="parsing">
          <span>【答案解析】：{{ details[0].answer }}</span>
        </el-row>
        <!-- 答案解析 -->

        <!-- 答案解析 -->
        <el-row class="tags">
          <span>【题目备注】：{{ details[0].remarks }}</span>
        </el-row>
        <!-- 答案解析 -->
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Button from "@/components/Fengjian/button";
export default {
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    details: {
      type: Array,
    },
  },
  data() {
    return {
      radio: 1,
      checked: true,
      isvideo: false,
    };
  },

  created() {},
  components: {
    Button,
  },

  methods: {
    onClose() {
      this.$emit("update:visible", false);
      this.isvideo = false;
    },
  },
};
</script>

<style scoped lang="less">
.dialog {
  .bottom {
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #000;
  }
  .font {
    font-size: 15px;
  }
  .question {
    margin: 20px 0;
    color: #0000ff;
  }
  .radio {
    display: flex;
    flex-direction: column;
    justify-content: start;
  }
  .inradio {
    margin-bottom: 20px;
  }
  .title {
    margin-bottom: 20px;
  }
  .tg {
    margin-top: 10px;
  }
  .theVideo {
    border-bottom: 1px solid #000;
    padding: 10px 0;
    .answer {
      border-top: 1px solid #000;
      padding-top: 10px;
      display: flex;
      span {
        margin-top: 8px;
      }
    }
  }
  .parsing {
    border-bottom: 1px solid #000;
    padding: 20px 0;
  }
  .tags {
    padding: 20px 0;
  }
}
</style>
