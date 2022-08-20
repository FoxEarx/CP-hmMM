<template>
  <div style="padding: 20px">
    <el-card class="box-card" v-loading="loading">
      <el-button class="btn el-icon-edit" type="success" @click="AddMeun"
        >添加菜单</el-button
      >
      <el-table
        row-key="id"
        default-expand-all
        :data="tableData"
        style="width: 100%"
        :tree-props="{ children: 'childs' }"
      >
        <el-table-column label="标题" width="200">
          <template slot-scope="{ row }">
            <!-- <span>{{ row.title }}</span> -->
            <span
              v-if="row.childs && !row.points"
              class="el-icon-folder-opened"
              >{{ row.title }}</span
            >
            <span v-else-if="!row.is_point" class="el-icon-folder">{{
              row.title
            }}</span>
            <span v-else-if="row.is_point" class="el-icon-view">{{
              row.title
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="权限点代码" width="1270">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button
              class="small-btn1 el-icon-edit"
              @click="editor(row)"
            ></el-button>
            <el-button
              class="small-btn2 el-icon-delete"
              @click="onRemove(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <MenuAdd
        v-if="show"
        :dialogVisible="dialogVisible"
        @onClose="onClose"
        :title="title"
        :disabled="disabled"
        :permission="permissions"
        :data="AddData"
        @onSave="onSave"
        @change="change"
        @getList="getList"
        :row="row"
        :show="show"
        :father="father"
      ></MenuAdd>
    </el-card>
  </div>
</template>

<script>
import { list, remove, add, update } from "@/api/base/menus";
import { transListtoTree, AddListtoTree } from "@/utils";
import MenuAdd from "../components/menuAdd.vue";
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      treeIcon: "",
      dialogVisible: false,
      title: "",
      disabled: "",
      permissions: "",
      AddData: [],
      number: 1,
      row: "",
      show: false,
      father: "",
      formData: {},
    };
  },

  created() {
    this.getList();
  },
  methods: {
    deepClone(obj) {
      let res = JSON.stringify(obj);
      return JSON.parse(res);
    },
    async getList() {
      this.loading = true;
      const { data } = await list();
      this.tableData = transListtoTree(data);
      const deep = this.deepClone(this.tableData);
      this.AddData = AddListtoTree(deep);
      this.loading = false;
    },
    async onRemove(row) {
      await remove(row);
      this.$message.success("删除成功");
      this.getList();
    },
    //编辑菜单
    editor(row) {
      this.show = true;
      this.number = 0;
      this.row = row;
      this.dialogVisible = true;
      this.title = "编辑菜单";
      this.disabled = true;
      if (row.is_point) {
        this.permissions = "权限点";
      } else {
        this.permissions = "菜单";
      }
      this.findPid(this.AddData, row.pid);
    },
    //关闭菜单
    onClose() {
      this.show = false;
      this.dialogVisible = false;
    },
    //添加菜单
    AddMeun() {
      this.father = this.AddData[0];
      this.show = true;
      this.number = 1;
      this.row = "";
      this.dialogVisible = true;
      this.title = "添加菜单";
      this.disabled = false;
      this.permissions = "菜单";
    },
    async onSave(val) {
      console.log(val);
      this.formData = val;
      if (this.number) {
        await add(this.formData);
      } else {
        val.id = this.row.id;
        val.id = this.row.id;
        console.log(val);
        await update(val);
      }
    },
    change(val) {
      this.permissions = val;
    },
    findPid(data, pid) {
      if (pid === null) {
        return (this.father = data[0]);
      }
      data.forEach((item) => {
        if (item.id === pid) {
          this.father = item;
        }
        if (item.childs) {
          this.findPid(item.childs, pid);
        }
      });
    },
  },
  components: {
    MenuAdd,
  },
};
</script>

<style scoped lang="less">
/deep/.cell {
  justify-content: initial;
}
.small-btn1 {
  width: 36px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
}
.small-btn1:hover {
  background-color: #409eff;
  color: #fff;
}
.small-btn2 {
  width: 36px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4;
}
.small-btn2:hover {
  background-color: #f56c6c;
  color: #fff;
}
.btn {
  float: right;
  padding: 3px 0;
  height: 32px;
  width: 97px;
  font-size: 12px;
}
.box-card {
  width: 100%px;
  padding: 20px;
}
/deep/.el-card__body {
  padding: 0;
}
.el-icon-delete:before {
  margin-left: -6px;
}
.el-icon-edit:before {
  margin-left: -6px;
}
/deep/.el-table [class*="el-table__row--level"] .el-table__expand-icon {
  display: none;
}
</style>
