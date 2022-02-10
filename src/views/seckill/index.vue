<template>
  <div>
    <el-button type="primary" @click="add">
      <i class="el-icon-circle-plus-outline el-icon--left"></i>添加
    </el-button>
    <!-- 列表 -->
    <list ref="list" @edit="edit"></list>
    <!-- 添加和编辑 -->
    <info ref="info" @updata="updata" :msg="msg"></info>
  </div>
</template>

<script>
import list from "./list.vue";
import info from "./info.vue";
export default {
  data() {
    return {
      // 要传给子组件的数据
      msg: {
        // 弹窗是否显示
        isShow: false,
        // 弹窗的类型
        type: "add",
      },
    };
  },
  components: {
    info,
    list,
  },
  methods: {
    // 打开添加的弹窗
    add() {
      // 打开弹窗
      this.msg.isShow = true;
      // 弹窗类型是添加
      this.msg.type = "add";
      // 在父组件中通过ref调用子组件的方法，添加传默认值
      this.$refs.info.setVal({
        first_cateid: 0,
        second_cateid: 0,
        status: 1,
        title:'',
        begintime:'',
        endtime:'',
        goodsid:''
      });
    },
    edit(info) {
      // 打开弹窗
      this.msg.isShow = true;
      // 弹窗类型是编辑
      this.msg.type = "edit";
      // 在父组件中通过ref调用子组件的方法，编辑传原数据
      this.$refs.info.setVal(info);
    },
    updata() {
      // 更新列表,调用list组件的函数
      this.$refs.list.getTableList();
    },
  },
};
</script>

<style>
</style>