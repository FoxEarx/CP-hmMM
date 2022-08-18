<template>
  <!-- Two-way Data-Binding -->
  <quill-editor
    ref="myQuillEditor"
    v-model="content"
    :options="editorOption"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)"
  />
</template>

<script>
// You can also register Quill modules in the component
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      content: "",
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
  methods: {
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
  mounted() {
    // console.log("输入内容", this.editor);
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
