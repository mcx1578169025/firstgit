<template>
  <div>
    <!-- title对话框的标题 -->
    <!-- visible是否显示  .sync同步 -->
    <el-dialog
      :title="msg.type == 'edit' ? '编辑菜单' : '添加菜单'"
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
        <el-form-item label="上级分类" prop="pid">
          <el-select v-model="ruleForm.pid" placeholder="请选择上级目录">
            <el-option label="顶级目录" :value="0"></el-option>
            <el-option
              v-for="(cate, index) in cateList"
              :key="index"
              :label="cate.catename"
              :value="cate.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" prop="catename">
          <el-input v-model="ruleForm.catename"></el-input>
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
import { editCateApi, addCateApi, getCatelistApi } from "../../api";
export default {
  props: ["msg"],
  data() {
    return {
      // 文件列表
      fileList: [ {} ],
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
        catename: [
          //required 是必填 ， message是报错信息，trigger触发方式
          { required: true, message: "分类名称必须有！", trigger: "blur" },
        ],
        pid: [
          //required 是必填 ， message是报错信息，trigger触发方式
          { required: true, message: "分类必须有！", trigger: "blur" },
        ],
      },
      cateList: [],
    };
  },
  created() {
    //发送请求，获取下拉的数据
    this.getCateList();
  },
  methods: {
     handleChange(file,) {
      // file.raw 是要上传的文件本身
      this.ruleForm.img = file.raw;
    },
    // 给弹窗中的表单赋值
    setVal(info) {
      this.fileList = []
      if(info.img){
        
        this.fileList.push({
        name:'u-admin',
        url:this.$host + info.img
      })
      }
      this.ruleForm = { ...info };
    },
    // 点击添加按钮
    submit() {
      // this.$refs.ruleForm选中表单；validate element的校验函数
      this.$refs.ruleForm.validate(async (val) => {
        if (val) {
          // 校验通过
          // post请求文件中带有文件，需要转换格式，变成formdata格式的数据
          //删除多余字段
          this.ruleForm.children ? delete this.ruleForm.children : ''
          let fd = new FormData();
          // fd.append('pid',this.ruleForm.id)//给formdata添加数据的方式
           for (const key in this.ruleForm) {
            fd.append(key, this.ruleForm[key])
          }
          // 获取fd中数据的方式
          // fd.forEach((name, val) => {
          //   console.log(name, fd.get(val));
          // });
          // 将ruleForm中的数据遍历，添加给fd，最终将fd传给后台，ruleForm只是中间变量
          if (this.msg.type == "add") {
            // 添加
            let res = await addCateApi(fd);
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
            let res = await editCateApi(fd);
            
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
    //获取下拉菜单
    async getCateList() {
      let res = await getCatelistApi();
      this.cateList = res.list;
    },
  },
};
</script>

<style>
.el-dialog__footer {
  text-align: left;
}
</style>