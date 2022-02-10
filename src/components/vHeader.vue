<template>
  <div class="top">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button @click="logout" class="btn-right">退出登录</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      //退出登录，清除用户信息
      this.$store.commit("clearUserInfo");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.top{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.breadcrumb{
  display: inline-block;
  line-height: 40px;
}
</style>