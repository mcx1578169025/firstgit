<template>
  <div>
    <!-- title:对话框的标题 -->
    <!-- visible:是否显示， sync同步控制 -->
    <el-dialog
      :title="msg.type == 'edit' ? '编辑管理员' : '添加管理员'"
      :visible.sync="msg.isShow"
      width="60%"
    >
      <!-- model:表单的变量 -->
      <!-- rules:校验的规则 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleid">
          <el-select v-model="ruleForm.roleid" placeholder="请选择角色名称">
            <el-option
              v-for="(role, index) in roleList"
              :key="index"
              :label="role.rolename"
              :value="role.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理员名称" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" prop="password">
          <el-input v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="msg.type === 'add'" type="primary" @click="submit"
          >立即添加</el-button
        >
        <el-button v-else type="primary" @click="submit">立即修改</el-button>
        <el-button @click="reset">重置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addAdminApi, getrolelistApi } from "../../api";
export default {
  props: ["msg"],
  data() {
    return {
      // 重置的数据
      resetVal: {},
      // 表格的数据
      ruleForm: {
        
        status: 1,
      },
      rules: {
        rolename: [
          // required 是必填，message是报错信息， trigger触发方式
          { required: true, message: "角色名称必须有！", trigger: "blur" },
        ],
      },
      // 下拉列表的数据
      roleList: []
    };
  },
  created() {
    // 获取下拉列表的数据
    this.getRolData();
  },
  methods: {
    async getRolData() {
      let res = await getrolelistApi();
      this.roleList = res.list;
    },
    // 给弹窗中的表单赋值
    setVal(info) {
      // 处理重置的数据
      this.resetVal = { ...info };
      // 使用深拷贝，避免数据互相影响
      this.ruleForm = { ...info };
    },
    // 点击重置按钮
    reset() {
      this.ruleForm = this.resetVal;
    },
    // 点击添加按钮
    submit() {
      // this.$refs.ruleForm选中表单；validate element的校验函数
      this.$refs.ruleForm.validate(async (val) => {
        if (val) {
          // 校验通过
          if (this.msg.type == "add") {
            // 添加
            let res = await addAdminApi(this.ruleForm);
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
            // 编辑
            let res = await editRoleApi(this.ruleForm);
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
          }
          // 通知父组件，更新list组件
          this.$emit("updata");
          // 关闭弹窗
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
</style>