<template>
  <div>
    <!-- 嵌套路由，一共三部分，左侧不变，右侧上方不变，右侧中间是会变的组件 -->
    <el-container>
      <el-aside width="200px">
          <!-- 左侧导航组件 -->
          <v-side></v-side>
      </el-aside>
      <el-container>
        <el-header>
            <!-- 右侧头部组件 -->
            <v-header></v-header>
        </el-header>
        <el-main>
            <!-- 右侧可变组件 -->
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vSide from './vSide.vue'
import vHeader from './vHeader.vue'
export default {
    components:{
        vSide,
        vHeader
    }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  min-height: 100vh;
  background-color: #262a32;
  color: #fff;
}
.el-aside h5 {
  font-size: 20px;
  text-align: center;
}
.el-main {
  background-color: #e9eef3;

}

body > .el-container {
  margin-bottom: 40px;
}

</style>