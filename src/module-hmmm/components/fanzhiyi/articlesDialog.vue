<template>
  <el-dialog
    :title="dialogTitle"
    :visible="visible"
    width="800px"
    @close="onClose"
  >
    <el-form ref="form" label-width="100px" :model="ruleForm" :rules="rules">
      <el-form-item label="文章标题：" prop="title">
        <el-input
          v-model.trim="ruleForm.title"
          placeholder="请输入文章标签"
        ></el-input>
      </el-form-item>
      <el-form-item label="文章内容：" prop="info">
        <quill-editor
          ref="myQuillEditor"
          v-model="ruleForm.info"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
        />
      </el-form-item>
      <el-form-item label="视频地址：" prop="video">
        <el-input
          v-model.trim="ruleForm.video"
          placeholder="请输入视频地址"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="ensure">确 定</el-button>
    </span>
    <!-- 富文本 -->
  </el-dialog>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
// import Quill from "./articlesQuill.vue"; //富文本
import { add, update } from "@/api/hmmm/articles.js";
export default {
  data() {
    return {
      ruleForm: {
        title: "",
        info: "",
        video: "",
      },
      state: "",
      rules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 3, message: "字符长度需超过3个字符", trigger: "blur" },
        ],
        info: [{ required: true, message: "请输入文章内容", trigger: "blur" }],
      },
      editorOption: {
        modules: {
          syntax: {
            highlight: (text) => {
              return hljs.highlightAuto(text).value; // 这里就是代码高亮需要配置的地方
            },
          },
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 字体
            // eslint-disable-next-line standard/object-curly-even-spacing
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "code-block"],
            ["image", "link"],
          ],
        },
      },
    };
  },

  created() {},
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    dialogTitle: {
      type: String,
      required: true,
    },
    Allinfo: {
      type: Object,
    },
  },
  components: {
    quillEditor,
  },
  methods: {
    cancel() {
      //   console.log("取消");
      (this.ruleForm = {
        title: "",
        info: "",
        video: "",
      }),
        this.$emit("update:visible", false);
    },
    async ensure() {
      await this.$refs.form.validate();
      console.log(this.state);
      if (this.state == 1) {
        if (
          this.ruleForm.title.length !== 0 ||
          this.ruleForm.info.length !== 0
        ) {
          const dataId = {
            id: this.Allinfo.id,
            title: this.ruleForm.title,
            articleBody: this.ruleForm.info,
            videoURL: this.ruleForm.video,
          };
          await update(dataId);
          this.$message.success("修改文章成功");
          this.$emit("update:visible", false);
          this.$emit("getAllList");
        } else {
          this.$message.error("请检查输入内容");
        }
      } else {
        if (
          this.ruleForm.title.length !== 0 ||
          this.ruleForm.info.length !== 0
        ) {
          const data = {
            title: this.ruleForm.title,
            articleBody: this.ruleForm.info,
            videoURL: this.ruleForm.video,
          };
          this.ruleForm = data;
          console.log("data", data);
          await add(data);
          this.$message.success("新增文章成功");
          this.$emit("update:visible", false);
          this.$emit("getAllList");
        } else {
          this.$message.error("请检查输入内容");
        }
      }
    },
    onClose() {
      this.cancel();
      // 表单中有校验规则可直接清空
      this.$refs.form.resetFields();
    },
    onEditorBlur(quill) {
      // console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      // console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      // console.log("editor ready!", quill);
    },
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
};
</script>

<style scoped lang="less">
.quill-editor {
  width: 660px;
}
:deep(.ql-editor) {
  height: 200px;
}
</style>
