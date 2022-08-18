<template>
  <el-card class="box-card">
    <tInput
      :tableData="tableData"
      @searchlist="searchlist"
      @clear="clear"
      @getAllList="getAllList"
      ><template> 新增技巧 </template></tInput
    >
    <el-alert
      type="info"
      show-icon
      :closable="false"
      style="margin: 20px 0 20px 0"
    >
      数据一共{{ total }}条
    </el-alert>
    <articlesLlist
      :tableData="tableData"
      :table="table"
      v-loading="loading"
      @info="getAllinfo"
      @playVideo="playVideo"
    >
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-link :underline="false" type="primary" @click="preview"
            >预览</el-link
          >
          <el-link :underline="false" type="primary" @click="onSaveState">{{
            row.state == "已启用" ? "禁用" : "启用"
          }}</el-link>
          <el-link
            :underline="false"
            :type="row.state == '已启用' ? 'info' : 'primary'"
            :disabled="row.state == '已启用' ? true : false"
            @click="revamp"
            >修改</el-link
          >
          <el-link
            :underline="false"
            :type="row.state == '已启用' ? 'info' : 'primary'"
            :disabled="row.state == '已启用' ? true : false"
            @click="onRemove"
            >删除</el-link
          >
        </template>
      </el-table-column>
    </articlesLlist>
    <div class="block">
      <el-pagination
        background
        layout=" prev, pager, next,sizes, jumper"
        :page-size="pages.pagesize"
        :total="total"
        :page-sizes="[5, 10, 20, 50]"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </div>
    <Dialog
      ref="dialog"
      :visible.sync="visibleShowDialog"
      @getAllList="getAllList"
      :dialogTitle="dialogTitle"
      :Allinfo="Allinfo"
    />
    <!-- 查看详情弹窗 -->
    <previewDialog
      ref="dialog"
      :visible.sync="previewDialog"
      @getAllList="getAllList"
      :Allinfo="Allinfo"
    />
    <!-- 视频弹窗 -->
    <div class="video">
      <div class="mask" v-if="videoState == true" @click="masksCloseFun"></div>
      <!-- 弹窗 -->
      <div class="videomasks" v-if="videoState == true">
        <!-- 视频：h5的视频播放video -->
        <video
          :src="videoSrc"
          controls="controls"
          autoplay
          width="100%"
          height="100%"
        >
          您的浏览器不支持 video 标签。
        </video>
      </div>
    </div>
  </el-card>
</template>

<script>
import dayjs from "dayjs"; //day插件
import Dialog from "../components/fanzhiyi/articlesDialog.vue";
import previewDialog from "../components/fanzhiyi/articlesDialog2.vue";
import tInput from "../components/fanzhiyi/articlesTitle.vue"; // 头部input
import articlesLlist from "../components/fanzhiyi/articlesList.vue"; // 列表
import { list, changeState, remove } from "@/api/hmmm/articles.js";
import { status } from "@/api/hmmm/constants";
export default {
  data() {
    return {
      tableData: [],
      pages: {
        page: 1,
        pagesize: 10,
      },
      total: 0,
      table: [
        { prop: "title", label: "文章标题" },
        { prop: "visits", label: "阅读数" },
        { prop: "username", label: "录入人" },
        { prop: "createTime", label: "录入时间" },
        { prop: "state", label: "状态" },
      ],
      loading: true,
      Allinfo: {},
      visibleShowDialog: false, //修改弹出框
      dialogTitle: "", //弹出框名称
      videoSrc: "",
      videoState: false,
      previewDialog: false, //文章详情弹窗
    };
  },
  components: {
    tInput,
    articlesLlist,
    Dialog,
    previewDialog,
  },
  created() {
    this.getAllList();

    // console.log(row);
  },
  methods: {
    // 获取文章列表
    async getAllList() {
      this.loading = true;
      const { data } = await list(this.pages);
      this.total = data.counts;
      console.log("文章总数", data.items);
      // 处理
      const formList = data.items.map((item) => {
        // 处理state label
        const str = status.find((el) => {
          return el.value === item.state;
        });

        // 处理时间格式
        const time = dayjs(item.createTime).format("YYYY.MM.DD hh:mm:ss");
        // console.log(str);
        return {
          title: item.title,
          visits: item.visits,
          username: item.username,
          createTime: time,
          state: str.value === 0 ? "已禁用" : "已启用",
          id: item.id,
          articleBody: item.articleBody,
          videoURL: item.videoURL,
        };
      });

      this.tableData = formList;
      this.loading = false;
    },
    // 分页
    handleCurrentChange(val) {
      this.pages.page = val;
      this.getAllList();
    },
    // 分页
    handleSizeChange(val) {
      this.pages.pagesize = val;
      this.getAllList();
    },
    // 获取点击列表的内容
    getAllinfo(val) {
      this.Allinfo = val;
      console.log("row", this.Allinfo);
    },
    // 切换启用禁用状态
    onSaveState() {
      setTimeout(async () => {
        const state = this.Allinfo.state == "已禁用" ? 1 : 0;
        this.tableData.state = state;
        const datalist = {
          state: this.tableData.state,
          id: this.Allinfo.id,
        };
        // console.log(datalist);
        await changeState(datalist);
        // console.log(res);
        this.$message.success("切换成功");
        this.getAllList();
      });
    },
    // 修改
    revamp() {
      setTimeout(() => {
        console.log("11", this.Allinfo);
        this.dialogTitle = "修改文章";
        this.visibleShowDialog = true;
        this.$refs.dialog.ruleForm.title = this.Allinfo.title;
        this.$refs.dialog.ruleForm.info = this.Allinfo.articleBody;
        this.$refs.dialog.ruleForm.video = this.Allinfo.videoURL;
        this.$refs.dialog.state = 1;
      });
    },
    // 搜索列表
    searchlist(params) {
      this.tableData = params;
    },
    clear() {
      this.getAllList();
    },
    // 删除
    async onRemove() {
      await remove(this.Allinfo);
      await this.getAllList();
    },
    // 视频播放
    playVideo() {
      setTimeout(() => {
        console.log("bof");
        this.videoState = true;
        this.videoSrc = this.Allinfo.videoURL;
      });
    },
    masksCloseFun() {
      this.videoState = false;
    },
    // 预览文章内容
    preview() {
      setTimeout(() => {
        console.log(this.Allinfo);
        this.previewDialog = true;
      });
    },
  },
};
</script>

<style scoped lang="less">
.box-card {
  margin: 10px;
}
:deep(.el-link--inner) {
  padding-left: 5px;
}
.block {
  display: flex;
  float: right;
  height: 80px;
  padding: 20px 0;
}
.video {
  display: flex;
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    background-color: rgba(#000000, 0.8);
    opacity: 0.6;
    margin: auto;
  }
  /* 内容层 z-index要比遮罩大，否则会被遮盖 */
  .videomasks {
    margin: auto;
    max-width: 1200px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    // margin-top: -5%;
    // margin-left: 50%;
    z-index: 20;
    /* transform: translate(-50%, -50%); */
  }
}
</style>
