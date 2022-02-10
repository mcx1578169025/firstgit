<template>
  <div class="login">
    <!-- el-row24分栏，一行平均分成24份，offset是向右的偏移量，span是占有份数 -->
    <el-row>
      <el-col :span="8" :offset="8">
        <div class="grid-content">
          <h1>小U商城后台管理系统</h1>
          <!-- model：表单的数据 -->
          <!-- rules：校验的规则 -->
          <!-- label-width：文本的高度 -->
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
          >
            <el-form-item prop="username">
              <el-input v-model="ruleForm.username">
                <el-button slot="prepend" icon="el-icon-user"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="ruleForm.password">
                <el-button slot="prepend" icon="el-icon-lock"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()" class="loginbtn"
                >立即登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { userlogin } from "../api";
export default {
  data() {
    return {
      //表单的数据
      ruleForm: {
        username: "1234",
        password: "1234",
      },
      //检验的规则
      rules: {
        username: [
          //required 是必填 ， message是报错信息，trigger触发方式
          { required: true, message: "账号必须有！", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码必须有！", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapMutations(["saveUserInfo"]),
    //提交表单
    submitForm(ruleForm) {
      //this.$refs选择表单元素
      //validate自带的校验函数
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          //校验成功，准备发请求
          let res = await userlogin(this.ruleForm);
          if (res.code == 200) {
            //登陆成功
            this.$message({
              type: "success",
              message: res.msg,
            });
            //将数据存入vuex
            this.saveUserInfo(res.list);
            //跳转页面
            this.$router.push('/');
          } else {
            //提示错误
            this.$message({
              type: "warning",
              message: res.msg,
            });
          }
        } else {
          alert("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
.login {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/loginbg.jpeg");
}
.login .grid-content {
  height: 300px;
  background-color: #fff;
  margin-top: 100px;
  border-radius: 6px;
  box-shadow: 0px 0px 5px #000;
  overflow: hidden;
}
.grid-content h1 {
  text-align: center;
  margin: 20px 0;
}
/* 覆盖element-ui的样式 */
/* .el-button.loginbtn{
   
} */
</style>