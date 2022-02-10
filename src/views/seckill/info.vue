<template>
  <div>
    <!-- title:对话框的标题 -->
    <!-- visible:是否显示， sync同步控制 -->
    <el-dialog
      :title="msg.type == 'edit' ? '编辑秒杀' : '添加秒杀'"
      :visible.sync="msg.isShow"
      width="60%"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <!-- model:表单的变量 -->
          <!-- rules:校验的规则 -->
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="活动名称" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="活动时间" prop="goodsname">
              <template>
                <div class="block">
                  <span class="demonstration"></span>
                  <el-date-picker
                    v-model="value1"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </div>
              </template>
            </el-form-item>

            <el-form-item label="一级分类" prop="first_cateid ">
              <el-select
                v-model="ruleForm.first_cateid"
                placeholder="请选一级分类"
                @change="firstChange"
              >
                <el-option label="请选择" :value="0"></el-option>
                <el-option
                  v-for="(item, index) in firstList"
                  :key="index"
                  :label="item.catename"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="二级分类" prop="second_cateid">
              <el-select
                v-model="ruleForm.second_cateid"
                placeholder="请选择二级分类"
                @change="choseChange"
              >
                <el-option label="请选择" :value="0"></el-option>
                <el-option
                  v-for="(role, index) in secondList"
                  :key="index"
                  :label="role.catename"
                  :value="role.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择商品" prop="goodsid">
              <el-select
                v-model="ruleForm.goodsid"
                placeholder="请选择三级分类"
              >
                <el-option label="请选择" :value="0"></el-option>
                <el-option
                  v-for="(item, index) in choseList"
                  :key="index"
                  :label="item.goodsname"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="ruleForm.status">
                <el-radio :label="1">正常</el-radio>
                <el-radio :label="2">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
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
import {
  getCatelistApi,
  getListByIdApi,
  addSeckApi,
  getGoodsInfoByIdApi,
  editSeckApi
} from "../../api";
export default {
  props: ["msg"],
  data() {
    return {
      //一级分类的下拉数据
      firstList: [],
      //二级分类的下拉数据
      secondList: [],
      //选择的下拉数据
      choseList: [],
      // 绑定值，选中选项卡的 name 第一个选项卡的 name
      activeName: "first",
      // 重置的数据
      resetVal: {},
      // 表格的数据
      ruleForm: {
        first_cateid: 0,
        second_cateid: 0,
        status: 1,
        title: "",
        begintime: "",
        endtime: "",
        goodsid: "",
      },
      rules: {
        title: [
          // required 是必填，message是报错信息， trigger触发方式
          { required: true, message: "活动名称必须有！", trigger: "blur" },
        ],
      },
      value1: [],
      
    };
  },
  created() {
    // 获取一级分类的数据
    this.getRolData();
  },
  methods: {
    async getRolData() {
      let res = await getCatelistApi();
      console.log(res);
      this.firstList = res.list;
    },
    async firstChange() {
      //当一级分类变化时，获取二级分类数据
      let res = await getListByIdApi(this.ruleForm.first_cateid);
      this.secondList = res.list;
      console.log(res);
    },
    async choseChange() {
      //当2级分类变化时，获取3级分类数据
      let res = await getGoodsInfoByIdApi(this.ruleForm.second_cateid);
      console.log(res);
      // if (res.list) {
      //   if (!res.list.length) {
      //     this.choseList = [res.list];
      //   } else {
          this.choseList = res.list;
          console.log(this.choseList);
      //   }
      // }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 给弹窗中的表单赋值
    setVal(info) {
      
      this.fileList = [];
      // 处理重置的数据
      this.resetVal = { ...info };
      // 使用深拷贝，避免数据互相影响
      this.ruleForm = { ...info };
     
      this.value1 = [this.ruleForm.begintime,this.ruleForm.endtime]
      console.log( this.ruleForm);
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
          //把表单获取的时间转为毫秒数
          var d = new Date(this.value1[0]);
          var a = new Date(this.value1[1]);
          d =
            d.getFullYear() +
            "-" +
            (d.getMonth() + 1) +
            "-" +
            d.getDate() +
            " " +
            d.getHours() +
            ":" +
            d.getMinutes() +
            ":" +
            d.getSeconds();
          a =
            a.getFullYear() +
            "-" +
            (a.getMonth() + 1) +
            "-" +
            a.getDate() +
            " " +
            a.getHours() +
            ":" +
            a.getMinutes() +
            ":" +
            a.getSeconds();
          // console.log(d);
          // console.log(a);

          var s = new Date(d).getTime();
          var q = new Date(a).getTime();
          console.log(s);
          console.log(q);
          this.ruleForm.begintime = s;
          this.ruleForm.endtime = q;
          // console.log(this.value1[0]);
          console.log(this.ruleForm);
          // return;
          // 校验通过
          if (this.msg.type == "add") {
            // 添加
            let res = await addSeckApi(this.ruleForm);
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
            let res = await editSeckApi(this.ruleForm);
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