<template>
  <div>
      <h5>小U商城后台</h5>
      <!-- 开启路由模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
      <el-menu-item index="/">
          <i class="el-icon-setting"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu :index="index+''" v-for="(cate , index) in userInfo.menus" :key="index">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>{{cate.title}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for = "(menu,index1) in cate.children" :key="index1" :index = "menu.url">{{menu.title}}</el-menu-item>
            <!-- <el-menu-item index="/role">角色管理</el-menu-item>
            <el-menu-item index="/admin">管理员管理</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed:{
    ...mapState(['userInfo'])
  },
  created() {
    console.log(this.userInfo);
  },
};
</script>

<style>
</style>