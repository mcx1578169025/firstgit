<template>
  <div>
    <!-- title对话框的标题 -->
    <!-- visible是否显示  .sync同步 -->
    <el-dialog
      :title="msg.type == 'edit' ? '编辑角色' : '添加角色'"
      :visible.sync="msg.isShow"
      width="60%"
    >
      <!-- model表单的变量 -->
      <!-- rules校验的规则 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="ruleForm.rolename"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <!-- data：树形控件的数据 -->
          <!-- show-checkbox：显示选框 -->
          <!-- default-expand-all默认展开所有项 -->
          <!-- node-key：选择节点的方式 -->
          <!-- highlight-current高亮显示当前项 -->
          <!-- :props：树形数据的配置项 -->
          <el-tree
            :data="treeData"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps"
            :check-strictly="isStrictly"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="msg.type == 'add'" type="primary" @click="submit"
          >立即添加</el-button
        >
        <el-button v-else type="primary" @click="submit">立即修改</el-button>
        <el-button @click="reset">重置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { editRoleApi, addRoleApi, getMenuListTreeApi } from "../../api";
export default {
  props: ["msg"],
  data() {
    return {
      //
      isStrictly:true,
      resetVal:{},
      //表格的数据
      ruleForm: {
        menus: [],
        rolename: "",
        status: 1,
      },
      rules: {
        rolename: [
          //required 是必填 ， message是报错信息，trigger触发方式
          { required: true, message: "角色名称必须有！", trigger: "blur" },
        ],
      },
      //树形控件的数据
      treeData: [],
      // 树形数据的配置项
      defaultProps: {
        children: "children",
        // label是文字内容对应的字段，后台数据中是title
        label: "title",
      },
    };
  },
  created() {
    //获取菜单的树形数据，给权限的树形控件
    this.getMenuTreeData();
  },
  methods: {
    async getMenuTreeData() {
      let res = await getMenuListTreeApi();
      this.treeData = res.list;
    },
    // 给弹窗中的表单赋值
    setVal(info) {
      //处理重置数据
      this.resetVal = {...info}
      //使用深拷贝，避免数据互相影响
      this.ruleForm = { ...info };
      let arr = this.ruleForm.menus.split(',');
      this.ruleForm.menus = arr || [];
      this.isStrictly = true;
       // Vue 在更新 DOM 时是异步执行的,使用nextTick，回调函数将在 DOM 更新完成后被调用
      this.$nextTick(()=>{
        this.$refs.tree.setCheckedKeys(arr);
        this.isStrictly = false; 
      })
    },
    //点击重置按钮
    reset(){
       this.ruleForm = this.resetVal;
       //只有树形控件才需要setCheckedKeys
       this.$refs.tree.setCheckedKeys(this.resetVal.menus.split(','));
    },
    //点击添加按钮
    submit() {
      // this.$refs.ruleForm选中表单；validate element的校验函数
      this.$refs.ruleForm.validate(async (val) => {
        if (val) {
          // getCheckedKeys 获取选中的项，将id组成一个数组
          //getHalfCheckedKeys 获取半选中的项，
          this.ruleForm.menus = this.$refs.tree
            .getCheckedKeys()
            .concat(this.$refs.tree.getHalfCheckedKeys());
          console.log(this.ruleForm);
          
          // 校验通过
          if (this.msg.type == "add") {
            //添加
            let res = await addRoleApi(this.ruleForm);
            if (res.code === 200) {
                  // 200表示成功
                  this.$message({
                    type: "success",
                    message: res.msg,
                  });
                } else {
                  this.$message({
                    type: "warning",
                    message: res.msg,
                  });
                }
          } else {
            //编辑
            let res = await editRoleApi(this.ruleForm);
            if (res.code === 200) {
              // 200表示成功
              this.$message({
                type: "success",
                message: res.msg,
              });
              // 更新数据
              this.tableData = res.list;
            } else {
              this.$message({
                type: "warning",
                message: res.msg,
              });
            }
          }
          //通知父组件，更新list
          this.$emit("updata");
          //关闭弹窗
          this.msg.isShow = false;
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style>
.el-dialog__footer {
  text-align: left;
}
</style>