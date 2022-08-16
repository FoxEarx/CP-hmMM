<template>
  <el-card class="box-card">
    <el-form>
      <el-row>
        <slot name="title-input">
          <el-col :span="12">
            <el-input
              @keyup.enter.native="$emit('search', input)"
              v-model="input"
              placeholder="根据用户名搜索"
            ></el-input>
            <el-button size="small" @click="clearInput">清空</el-button>
            <el-button
              type="primary"
              size="small"
              @click="$emit('search', input)"
              >搜索</el-button
            >
          </el-col>
          <el-col :span="12">
            <el-row type="flex" justify="end">
              <el-button
                type="success"
                size="small"
                icon="el-icon-edit"
                @click="$emit('isShow')"
                >{{ addText }}</el-button
              >
            </el-row>
          </el-col>
        </slot>
      </el-row>
    </el-form>
    <slot name="body" />
    <slot name="Page" />
  </el-card>
</template>

<script>
import Col from "@/components/Col";
export default {
  data() {
    return {
      input: "",
    };
  },

  created() {},

  props: {
    addText: {
      type: String,
      required: true,
    },
  },

  methods: {
    // 清空功能
    clearInput() {
      this.input = "";
      this.$emit("clearInput");
    },
  },

  components: {
    Col,
  },
};
</script>

<style scoped lang="scss">
.el-input__inner {
  width: 300px;
}
.el-col-6 {
  height: 50px;
}
.el-input--medium {
  width: 200px;
  height: 32px;
  font-size: 13px;
}
:deep(.el-input--medium .el-input__inner) {
  height: 32px;
  font-size: 13px;
}
.el-button {
  margin-left: 15px;
}
.el-form {
  margin-bottom: 18px;
}
</style>
