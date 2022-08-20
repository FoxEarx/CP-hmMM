<template>
  <div>
    <Card
      addText="新增权限组"
      @isShow="addPermissions"
      @search="searchPermissions"
    >
      <template #body>
        <el-alert
          :title="`共${permissionsData.counts}条记录`"
          type="info"
          :closable="false"
          show-icon
        >
        </el-alert>
        <!-- 内容列表 -->
        <TreeTable
          :listLoading="listLoading"
          :columns="columns"
          :data="permissionsData.list"
          @editUserInfo="editPermissions"
          @delUserInfo="delPermissions"
        >
          <template #selection>
            <el-table-column type="selection"></el-table-column>
          </template>
        </TreeTable>
      </template>
      <!-- 分页 -->
      <template #Page>
        <PageTool
          :total="permissionsData.counts"
          :paginationPage="permissionsData.page"
          @pageChange="pageChange"
          @pageSizeChange="pageSizeChange"
        ></PageTool>
      </template>
    </Card>
    <!-- 弹出层 -->
    <PermissionsDialog
      ref="permissionsDialog"
      :text="title"
      :permissionsDetail="permissionsDetail"
      :ruleInline="rules"
      @newDataes="newDataes"
    ></PermissionsDialog>
  </div>
</template>

<script>
import Card from "@/components/Card/";
import TreeTable from "@/components/TreeTable/";
import PageTool from "../components/page-tool.vue";
import PermissionsDialog from "../components/permissions-add.vue";
import { getPermissionsApi } from "@/api/hmmm/permissions.js";
import { remove } from "@/api/base/permissions.js";
export default {
  data() {
    const validatorPass = (rule, value, callback) => {
      let arr = this.$refs.permissionsDialog.$refs.treeMenu.getCheckedKeys();
      if (arr.length === 0) {
        callback(new Error("请至少选择一项"));
      }
      callback();
    };
    return {
      title: "",
      listLoading: false,
      columns: [
        {
          text: "用户名",
          value: "title",
        },
        {
          text: "日期",
          value: "create_date",
        },
      ],
      permissionsData: [],
      permissionsInfo: {
        page: "",
        pages: "",
        pagesize: "",
        title: "",
      },
      permissionsDetail: {},
      rules: {
        title: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
        ],
        treeData: [
          {
            required: true,
            validator: validatorPass,
            trigger: "change",
          },
        ],
      },
    };
  },

  created() {
    this.getPermissions();
  },

  methods: {
    // 获取权限组列表
    async getPermissions() {
      this.listLoading = true;
      const { data } = await getPermissionsApi(this.permissionsInfo);
      this.permissionsData = data;
      this.permissionsInfo.page = data.page;
      this.listLoading = false;
    },
    // 新增权限组
    addPermissions() {
      this.title = "创建权限组";
      this.$refs.permissionsDialog.dialogFormVisible = true;
    },
    // 修改权限组
    async editPermissions(val) {
      this.title = "编辑权限组";
      this.$refs.permissionsDialog.dialogFormVisible = true;
      this.$refs.permissionsDialog.hanldeEditForm(val.id);
    },
    // 新增/修改权限组后重新加载页面
    newDataes(obj) {
      this.getPermissions();
    },
    // 分页切换页面
    pageChange(val) {
      console.log(val);
      this.permissionsInfo.page = val;
      this.getPermissions();
    },
    // 每页显示信息条数
    pageSizeChange(val) {
      console.log(val);
      this.permissionsInfo.pagesize = val;
      this.getPermissions();
    },
    // 搜索权限组
    searchPermissions(val) {
      this.permissionsInfo.title = val;
      this.getPermissions();
    },
    // 删除权限组
    async delPermissions(row) {
      try {
        await this.$confirm("此操作将永久删除用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        await remove(row);
        this.$message.success("删除成功");
        if (
          this.permissionsData.counts % this.permissionsData.pagesize &&
          this.permissionsInfo.page > 1
        ) {
          this.permissionsInfo.page -= 1;
        }
        this.getPermissions();
      } catch (error) {}
    },
  },

  components: {
    Card,
    TreeTable,
    PageTool,
    PermissionsDialog,
  },
};
</script>

<style scoped lang="less">
.el-alert--info.is-light {
  margin-bottom: 15px;
}
</style>
