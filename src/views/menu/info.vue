<template>
  <div>
    <!-- title对话框的标题 -->
    <!-- visible是否显示  .sync同步 -->
    <el-dialog
      :title="msg.type=='edit'?'编辑菜单':'添加菜单'"
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
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <!-- 编辑状态下，禁用这个选项 -->
            <el-radio :label="1" :disabled="msg.type === 'edit'">目录</el-radio>
            <el-radio :label="2" :disabled="msg.type === 'edit'">菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="ruleForm.type == 2" label="上级" prop="pid">
          <el-select v-model="ruleForm.pid" placeholder="请选择上级目录">
            <el-option label="顶级目录" :value="0"></el-option>
            <el-option
              v-for="(menu, index) in menuList"
              :key="index"
              :label="menu.title"
              :value="menu.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item v-show="ruleForm.type == 1" label="图标" prop="icon">
          <el-input v-model="ruleForm.icon"></el-input>
        </el-form-item>
        <el-form-item v-show="ruleForm.type == 2" label="地址" prop="url">
          <el-input v-model="ruleForm.url"></el-input>
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
        <el-button @click="msg.isShow = false">重置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { editMenuApi } from "../../api";
export default {
  props: ["msg"],
  data() {
    return {
      //表格的数据
      ruleForm: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      rules: {
        title: [
          //required 是必填 ， message是报错信息，trigger触发方式
          { required: true, message: "标题必须有！", trigger: "blur" },
        ],
      },
      menuList: [],
    };
  },
  created() {
    //发送请求，获取下拉的数据
    this.getMenuList();
  },
  methods: {
     // 给弹窗中的表单赋值
    setVal(info) {
      this.ruleForm = {...info};
    },
    //点击添加按钮
    submit() {
      // this.$refs.ruleForm选中表单；validate element的校验函数
      this.$refs.ruleForm.validate(async(val) => {
        if (val) {
          // 校验通过
          if (this.msg.type == "add") {
            //添加
            this.http
              .post("/menuadd", this.ruleForm)
              .then((res) => {
                console.log(res);
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
              })
              .catch((err) => {
                console.log(err);
              });
          }else{
            //删除多余字段
           this.ruleForm.children ? delete this.ruleForm.children : ''
           let res  = await editMenuApi(this.ruleForm);
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
          this.$emit('updata')
          //关闭弹窗
          this.msg.isShow = false;
        } else {
           return false;
        }
      });
    },
    //获取下拉菜单
    getMenuList() {
      // istree=1 加了这个就是树形结构
      this.http("/menulist?istree=1")
        .then((res) => {
          // console.log(res);
          this.menuList = res.list;
        })
        .catch((err) => {
          console.log(err);
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