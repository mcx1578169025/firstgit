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
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <!-- sortable：排序 -->
      <el-table-column prop="title" label="活动名称"> </el-table-column>
      <el-table-column prop="begintime" label="开始时间"> </el-table-column>
      <el-table-column prop="endtime" label="结束时间"></el-table-column>
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
import { getSeckListApi, delSeckApi } from "../../api";
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
      let res = await getSeckListApi();
      // console.log(res);
      this.tableData = res.list;
      //转换开始时间
      for(let i = 0;i < res.list.length;i++ ){
        let tdata = new Date(Number(res.list[i].begintime))
      let tTime = tdata.getFullYear() + "-" + toTwo((tdata.getMonth()) + 1) + "-" + toTwo(tdata.getDate()) + " " + toTwo(tdata.getHours()) + ":" + toTwo(tdata.getMinutes()) + ":" + toTwo(tdata.getSeconds());
      // console.log(tTime);
      //转换结束时间
      let edata = new Date(Number(res.list[i].endtime))
      let eTime = edata.getFullYear() + "-" + toTwo((edata.getMonth() + 1)) + "-" + toTwo(edata.getDate()) + " " + toTwo(edata.getHours()) + ":" + toTwo(edata.getMinutes()) + ":" + toTwo(edata.getSeconds());
       // 前导0
        function toTwo(n){
            return n < 10 ? "0" + n : n;
        }

      //把转换好的时间赋值给tableData
      this.tableData[i].begintime = tTime
      this.tableData[i].endtime = eTime
      }
      
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
      let res = await delSeckApi(id);

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
    },
  },
};

</script>

<style>
</style>