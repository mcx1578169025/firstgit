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
      <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="80"> </el-table-column>
      <el-table-column prop="addtime" label="注册日期" width="180"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="edit(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMemberListApi} from "../../api";
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
      let res = await getMemberListApi();
      this.tableData = res.list
      //转换注册日期
      let adata = new Date(Number(res.list[0].addtime))
      let aTime = adata.getFullYear() + "-" + (adata.getMonth() + 1) + "-" + adata.getDate() + " " + adata.getHours() + ":" + adata.getMinutes() + ":" + adata.getSeconds();
      //把转换好的时间赋值给tableData
      this.tableData[0].addtime = aTime
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