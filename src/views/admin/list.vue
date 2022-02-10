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
      <el-table-column prop="uid" label="用户ID" sortable width="400">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180"> </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
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
    <!-- size-change:修改每页显示几条 -->
    <!-- current-change:修改页码 -->
    <!-- current-page:当前页码 -->
    <!-- page-sizes:每页显示几条的下拉框 -->
    <!-- page-size:每页显示几条 -->
    <!-- layout：显示哪些控件，页码数、总数、上一页、下一页等... -->
    <!-- total：总数量 -->
    <!-- 分页的思路 -->
    <!-- 几个重要的数据：1总数量，从后台获取，2每页显示几条，前端知道，3分成多少页=总数量/每页显示几条，如果有余数就向上取整，4当前显示第几页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="size"
      layout="jumper, prev, pager, next, total"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getUserListApi, getUserNumApi ,delUserApi} from "../../api";
export default {
  data() {
    return {
      //数据总条数
      total: 1,
      //每页显示几条
      size:2,
      //当前显示第几页
      page: 1,
      tableData: [],
    };
  },
  created() {
    // 发请求，获取table的数据
    this.getTableList();
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getUserList();
    },
    async getTableList() {
      let res = await getUserNumApi();
      this.total = res.list[0].total;
      //先获取总数，再获取列表
      this.getUserList();
    },
    async getUserList() {
      let res = await getUserListApi({ size: this.size, page: this.page });
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
      let res = await delUserApi(id);
      if (res.code === 200) {
        // 200表示删除成功
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        // 更新数据
        if((this.total-1)%this.size == 0){
          this.page = this.page-1
        }
        this.getTableList();
        this.tableData = res.list;
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
    },
  },
};
</script>

<style>
</style>