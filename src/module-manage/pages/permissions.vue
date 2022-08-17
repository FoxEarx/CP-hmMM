<template>
  <div>
    <Card addText="新增权限组">
      <template #body>
        <el-alert
          title="消息提示的文案"
          type="info"
          :closable="false"
          show-icon
        >
        </el-alert>
        <TreeTable :columns="columns" :data="permissionsData.list">
          <template #selection>
            <el-table-column type="selection"></el-table-column>
          </template>
        </TreeTable>
      </template>
      <template #Page>
        <PageTool
          :total="permissionsData.counts"
          :paginationPage="permissionsData.page"
        ></PageTool>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/Card/";
import TreeTable from "@/components/TreeTable/";
import PageTool from "../components/page-tool.vue";
import { getPermissionsApi } from "@/api/hmmm/permissions.js";
export default {
  data() {
    return {
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
      },
    };
  },

  created() {
    this.getPermissions();
  },

  methods: {
    // 获取权限组列表
    async getPermissions() {
      const { data } = await getPermissionsApi();
      console.log(data);
      this.permissionsData = data;
      this.permissionsInfo.page = data.page;
    },
  },

  components: {
    Card,
    TreeTable,
    PageTool,
  },
};
</script>

<style scoped lang="less"></style>
