<template>
  <div>
      <el-button icon="el-icon-circle-plus-outline" class="tj" @click="add">添加</el-button>
    <list  ref="list" @edit="edit"></list>
    <!-- 编辑和添加 -->
    <info ref="info" :msg="msg" @updata="updata"></info>
  </div>
</template>

<script>
import list from "./list.vue";
import info from "./info.vue";
export default {
  components: {
    list,
    info,
  },
  data() {
    return {
      msg:{
        // 弹窗是否显示
        isShow: false,
        // 弹窗的类型
        type: "add",
      }
    }
  },
  methods: {
    //打开添加的弹窗
    add(){
      //打开弹窗
      this.msg.isShow = true;
      //弹窗类型是添加
      this.msg.type = 'add'
      //在父组件中通过ref调用子组件的方法，添加传默认值
      this.$refs.info.setVal({
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      })
      //更新列表
      this.$refs.list.getTableList()
    },
    edit(info){
      console.log(info);
      //打开弹窗
       this.msg.isShow = true;
       //弹窗类型是编辑
      this.msg.type = "edit"
      //在父组件中通过ref调用子组件的方法，编辑原数据
      this.$refs.info.setVal(info)
    },
    updata(){
      //更新列表
      this.$refs.list.getTableList()
    }
  },
};
</script>

<style>
.el-button.tj {
  background-color: #fb6d49;
  color: #fff;
}
</style>