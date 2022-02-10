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
        <el-form-item label="轮播图名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="分类图片">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-change="handleChange"
            :file-list="fileList"
            :auto-upload="false"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
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
import { addBannerApi, editBannersApi } from "../../api";
export default {
  props: ["msg"],
  data() {
    return {
      // 文件列表
      fileList: [{}],
      // 重置的数据
      resetVal: {},
      // 表格的数据
      ruleForm: {
        title: "",
        img: "",
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
    handleChange(file) {
      // file.raw 是要上传的文件本身
      this.ruleForm.img = file.raw;
    },
    // 给弹窗中的表单赋值
    setVal(info) {
      this.fileList = [];
      if (info.img) {
        this.fileList.push({
          name: "u-admin",
          url: this.$host + info.img,
        });
      }
      // 处理重置的数组
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
          // post请求文件中带有文件，需要转换格式，变成formdata格式的数据
          //删除多余字段
          this.ruleForm.children ? delete this.ruleForm.children : "";
          let fd = new FormData();
          // fd.append('pid',this.ruleForm.id)//给formdata添加数据的方式
          for (const key in this.ruleForm) {
            fd.append(key, this.ruleForm[key]);
          }
          //  console.log(this.ruleForm);
          // this.ruleForm.attrs  = this.attrList.join(',');
          // 校验通过
          if (this.msg.type == "add") {
            // 添加
            let res = await addBannerApi(fd);
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
            let res = await editBannersApi(fd);
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
.attr {
  width: 300px;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>