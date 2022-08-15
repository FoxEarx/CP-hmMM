<template>
  <div class="container">
    <el-card class="box-card">
      <!-- 顶部 -->
      <el-row class="top">
        <!-- 左侧区域 -->
        <el-col :span="20" class="left">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="学科名称">
              <el-input
                placeholder="冯坚制作"
                v-model="form.name"
                class="SearchNameInput"
              ></el-input>
            </el-form-item>

            <el-form-item label="状态">
              <el-input
                placeholder="冯坚制作"
                v-model="form.state"
                class="SearchNameInput"
              ></el-input>
            </el-form-item>
          </el-form>
          <Button class="btn">清除</Button>
          <Button class="btn" color="blue" fontColor="fontWhite">搜索</Button>
        </el-col>
        <!-- 左侧区域 -->

        <!-- 右侧区域 -->
        <el-col :offset="2" :span="2">
          <Button
            class="addButton"
            color="green"
            fontColor="fontWhite"
            :width="100"
            ><i class="el-icon-edit"></i> 新增学科</Button
          >
        </el-col>
        <!-- 右侧区域 -->
      </el-row>
      <!-- 顶部 -->
    </el-card>
  </div>
</template>

<script>
import Button from "@/components/Fengjian/button";
export default {
  data() {
    return {
      form: {
        name: "",
        state: "",
      },
    };
  },
  components: {
    Button,
  },
};
</script>

<style scoped lang="less">
.box-card {
  margin-top: 0px;
  margin-left: 12px;
  margin-right: 12px;
  .SearchNameInput {
    width: 200px;
    height: 28px;
    line-height: 28px;
  }
  .left {
    display: flex;
    align-items: flex-start;
  }
  .addButton {
    margin-left: 30px;
  }
  .isAlert {
    height: 32px;
  }
  .btn {
    margin-top: 1.5px;
  }
  .page {
    float: right;
    padding: 20px 0;
  }
}
</style>
