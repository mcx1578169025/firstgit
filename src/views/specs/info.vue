<template>
  <div>
    <!-- title:对话框的标题 -->
    <!-- visible:是否显示， sync同步控制 -->
    <el-dialog
      :title="msg.type == 'edit' ? '编辑商品规格' : '添加商品规格'"
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
        <el-form-item label="属性名" prop="specsname">
          <el-input v-model="ruleForm.specsname"></el-input>
        </el-form-item>
        <el-form-item label="属性值">
          <div v-for="(attr, index) in attrList" :key="index">
            <el-input class="attr" v-model="attrList[index]"></el-input>
            <el-button type="danger" v-if="index" @click="delAttr(index)"
              >删除属性</el-button
            >
            <el-button type="success" v-else @click="addAttr"
              >添加属性</el-button
            >
          </div>
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
import { addSpecsApi, editSpecsApi } from "../../api";
export default {
  props: ["msg"],
  data() {
    return {
      //属性值循环的数组
      attrList: [""],
      // 重置的数据
      resetVal: {},
      // 表格的数据
      ruleForm: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      rules: {
        rolename: [
          // required 是必填，message是报错信息， trigger触发方式
          { required: true, message: "角色名称必须有！", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 给弹窗中的表单赋值
    setVal(info) {
      if ((this.msg.type = "edit")) {
        this.attrList = [...info.attrs];
      }

      // 处理重置的数组
      this.resetVal = { ...info };
      // 使用深拷贝，避免数据互相影响
      this.ruleForm = { ...info };

      console.log(this.attrList);
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
          this.ruleForm.attrs = this.attrList.join(",");
          // 校验通过
          if (this.msg.type == "add") {
            // 添加
            let res = await addSpecsApi(this.ruleForm);
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
            let res = await editSpecsApi(this.ruleForm);
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
    //增加表单项，新增属性值
    addAttr() {
      if (this.attrList.length <= 4) {
        this.attrList.push("");
      } else {
        this.$message({
          type: "warning",
          message: "最多添加五项",
        });
      }
      // this.attrList.push('')
    },
    //删除属性
    delAttr(index) {
      this.attrList.splice(index, 1);
    },
  },
};
</script>

<style>
.attr {
  width: 300px;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>