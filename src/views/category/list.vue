<template>
  <div>
    <!-- data表格的数据 -->
    <!-- row-key选择表格元素 -->
    <!-- default-expand-all 默认展开所有子集 -->
    <!-- tree-props树形数据的配置项 -->
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <!-- sortable：排序 -->
      <el-table-column prop="id" label="ID" sortable> </el-table-column>
      <el-table-column prop="catename" label="分类名称" width='200'> </el-table-column>
      <el-table-column label="分类图片" width='200'> 
        <template slot-scope="scope">
         <img 
         v-if="scope.row.img"
         :src="'http://localhost:3000' + scope.row.img"
         width='100'
         >
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态"  width='100'>
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" type="success">已启用</el-tag>
          <el-tag v-else type="danger">已禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
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
import { getCatelistApi ,delCateApi} from "../../api";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    //发送请求，获取下拉的数据
    this.getTableList();
  },
  methods: {
    async getTableList() {
      let res = await getCatelistApi();
      // console.log(res);
      this.tableData = res.list;
    },
    //删除
    del(id) {
      //二次确认
      this.$confirm("确定删除该内容吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击确认按钮
          this.delItem(id);
        })
        .catch(() => {
          //点击取消按钮
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //真的删除了
    async delItem(id) {
      let res = await delCateApi(id);
      //  console.log(res);
      if (res.code === 200) {
        //200表示删除成功
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        //更新数据
        this.tableData = res.list;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    edit(info) {
      // console.log(info);
      // 将数据传给父组件
      this.$emit("edit", info);
    },
  },
};
</script>

<style>
</style>