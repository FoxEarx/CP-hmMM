<template>
  <div class="question-container">
    <!-- 用户列表 -->
    <Card
      @isShow="userAdd"
      @clearInput="clearInput"
      @search="clickSearch"
      addText="新增用户"
    >
      <template #body>
        <el-alert
          :title="`共${usersData.counts}条记录`"
          type="info"
          :closable="false"
          show-icon
        >
        </el-alert>
        <TreeTable
          :columns="columns"
          :data="usersData.list"
          @editUserInfo="editUserInfo"
          @delUserInfo="delUserInfo"
          :listLoading="listLoading"
        >
        </TreeTable>
      </template>
      <template #Page>
        <PageTool
          :total="usersData.counts"
          :paginationPage="usersData.page"
          :paginationPagesize="usersData.pagesize"
          @pageChange="pageChange"
          @pageSizeChange="pageSizeChange"
        ></PageTool>
      </template>
    </Card>

    <!-- 弹层 -->
    <UsersAdd
      ref="dialog"
      :text="title"
      :formBase="formData"
      :ruleInline="rules"
      @newDataes="addUser"
    ></UsersAdd>
  </div>
</template>

<script>
import Card from "@/components/Card";
import TreeTable from "@/components/TreeTable";
import UsersAdd from "../components/user-add.vue";
import { getUsersListApi, delUsersInfoApi } from "@/api/hmmm/users";
import PageTool from "../components/page-tool.vue";
export default {
  name: "users",
  data() {
    return {
      columns: [
        {
          text: "序号",
          value: "id",
        },
        {
          text: "邮箱",
          value: "email",
        },
        {
          text: "联系电话",
          value: "phone",
        },
        {
          text: "用户名",
          value: "username",
        },
        {
          text: "权限组名称",
          value: "permission_group_title",
        },
        {
          text: "角色",
          value: "role",
        },
      ],
      usersData: {},
      formData: {
        avatar: "", // 头像
        email: "", // 邮箱
        introduction: "", // 个人介绍
        password: "", // 密码
        permission_group_id: "", // 权限组id
        phone: "", // 联系电话
        role: "", // 角色
        sex: 1, // 性别
        username: "", // 用户名
      },
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
        permission_group_id: [
          {
            required: true,
            message: "权限不能为空",
            trigger: "change",
          },
        ],
      },
      title: "",
      usersInfo: {
        page: "",
        username: "",
        pagesize: "",
      },
      listLoading: false,
    };
  },

  created() {
    this.getUserList();
  },

  methods: {
    // 分页显示条数切换
    pageSizeChange(val) {
      this.usersInfo.pagesize = val;
      this.getUserList();
    },
    // 分页切换
    async pageChange(val) {
      this.usersInfo.page = val;
      this.getUserList();
    },
    // 新增用户成功后关闭弹层重新加载页面
    addUser() {
      this.$refs.dialog.dialogFormVisible = false;
      this.$message.success("添加成功");
      this.getUserList();
    },
    // 根据用户名搜索
    clickSearch(val) {
      this.usersInfo.username = val;
      this.getUserList();
    },
    // 清空搜索框
    clearInput() {
      this.usersInfo.username = "";
      this.getUserList();
    },
    // 获取用户列表
    async getUserList() {
      this.listLoading = true;
      const res = await getUsersListApi(this.usersInfo);
      this.usersData = res.data;
      this.usersInfo.page = res.data.page;
      this.listLoading = false;
    },
    // 新建用户
    userAdd() {
      this.title = "创建用户";
      this.$refs.dialog.dialogFormVisible = true;
    },
    // 修改用户信息
    editUserInfo(row) {
      this.title = "编辑用户";
      this.$refs.dialog.dialogFormVisible = true;
      this.formData = row;
    },
    // 删除用户
    async delUserInfo(row) {
      try {
        await this.$confirm("此操作将永久删除用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        await delUsersInfoApi(row.id);
        this.$message.success("成功删除了用户!");
        this.getUserList();
      } catch (error) {}
    },
  },

  components: {
    TreeTable,
    Card,
    UsersAdd,
    PageTool,
  },
};
</script>

<style scoped lang="scss">
.el-alert {
  margin-bottom: 20px;
}
</style>
