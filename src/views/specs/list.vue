<template>
  <div>
    <!-- data:表格的数据 -->
    <!-- row-key:选择表格元素 -->
    <!-- default-expand-all:默认展开所有子集 -->
    <!-- tree-props:树形数据的配置项 -->
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <!-- sortable：排序 -->
      <el-table-column prop="id" label="ID" sortable >
      </el-table-column>
      <el-table-column prop="specsname" label="属性名称"></el-table-column>

      <el-table-column label="属性值" prop="attrs">
        <template slot-scope="scope">
          <el-tag v-for="(item ,index) in scope.row.attrs" :key='index' type="success">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="success">已启用</el-tag>
          <el-tag v-else type="danger">已禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="edit(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="del(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getSpecsListApi,delSpecsApi} from "../../api";
export default {
  data() {
    return {
      
      tableData: [],
    };
  },
  created() {
    // 发请求，获取table的数据
    this.getTableList();
  },
  methods: {
  
    async getTableList() {
      let res = await getSpecsListApi();
      this.tableData = res.list;
    },
    // 删除
    del(id) {
      // 二次确认
      this.$confirm("此操作将永久删除该内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击确认按钮
          this.delItem(id);
        })
        .catch(() => {
          // 点击取消按钮
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 真的删除了
    async delItem(id) {
      let res = await delSpecsApi(id);
      if (res.code === 200) {
        // 200表示删除成功
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        // 更新数据
         this.getTableList();
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    edit(info) {
      // 将数据传给父组件
      this.$emit("edit", info);
      console.log(info);
    },
  },
};
</script>

<style>
</style>