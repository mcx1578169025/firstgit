<template>
  <div>
    <!-- title:对话框的标题 -->
    <!-- visible:是否显示， sync同步控制 -->
    <el-dialog
      :title="msg.type == 'edit' ? '编辑商品' : '添加商品'"
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

            <el-form-item label="商品名称" prop="goodsname">
              <el-input v-model="ruleForm.goodsname"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
              <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="市场价格" prop="market_price">
              <el-input v-model="ruleForm.market_price"></el-input>
            </el-form-item>
            <!-- action：上传地址，必填 -->
            <!-- list-type：文件列表的类型，这里用的是照片墙 -->
            <!-- on-change：控制文件上传的函数 -->
            <!-- file-list: 历史文件列表 -->
            <!-- auto-upload：是否自动上传 -->
            <!-- limit: 最大允许上传个数 -->
            <el-form-item label="商品图片">
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
            <el-form-item label="商品规格" prop="specsid">
              <el-select
                v-model="ruleForm.specsid"
                placeholder="请选择"
                @change="specsChange"
              >
                <el-option label="请选择" :value="0"></el-option>
                <el-option
                  v-for="(item, index) in specList"
                  :key="index"
                  :label="item.specsname"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="规格属性值" prop="specsattr">
              <el-select
                v-model="ruleForm.specsattr"
                placeholder="请选择"
                multiple
              >
                <el-option
                  v-for="(attr, index) in attrList"
                  :key="index"
                  :label="attr"
                  :value="attr"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否新品" prop="isnew">
              <el-radio-group v-model="ruleForm.isnew">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否热卖" prop="ishot">
              <el-radio-group v-model="ruleForm.ishot">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="ruleForm.status">
                <el-radio :label="1">正常</el-radio>
                <el-radio :label="2">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="详细描述" name="second">
          <div id="editor"></div>
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
//导入富文本编辑器的函数
import E from "wangeditor";
import {
  addGoodsApi,
  getCatelistApi,
  getListByIdApi,
  getSpecsListApi,
  getSpecsInfoByIdApi,
  editGoodsApi,
} from "../../api";
export default {
  props: ["msg"],
  data() {
    return {
      //一级分类的下拉数据
      firstList: [],
      //二级分类的下拉数据
      secondList: [],
      //商品规格的下拉数据
      specList: [],
      //商品规格的属性下拉数据
      attrList: [],
      // 文件列表
      fileList: [{}],
      // 绑定值，选中选项卡的 name 第一个选项卡的 name
      activeName: "first",
      // 重置的数据
      resetVal: {},
      // 表格的数据
      ruleForm: {
        first_cateid: 0,
        second_cateid: 0,
        goodsname: "",
        market_price: 0,
        price: 0,
        img: "",
        description: "",
        specsid: 0,
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      rules: {
        rolename: [
          // required 是必填，message是报错信息， trigger触发方式
          { required: true, message: "角色名称必须有！", trigger: "blur" },
        ],
      },
      // 初始化编辑器
      editor: null,
    };
  },
  created() {
    // 获取一级分类的数据
    this.getRolData();
    // 获取商品规格数据
    this.getSepcsListData();
  },
  methods: {
    async firstChange() {
      //当一级分类变化时，获取二级分类数据
      let res = await getListByIdApi(this.ruleForm.first_cateid);
      console.log(res);
      this.secondList = res.list;
    },
    async specsChange() {
      //当一级分类变化时，获取二级分类数据
      let res = await getSpecsInfoByIdApi(this.ruleForm.specsid);
      console.log(res);
      this.attrList = res.list[0].attrs;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleChange(file) {
      // file.raw 是要上传的文件本身
      this.ruleForm.img = file.raw;
    },
    async getRolData() {
      let res = await getCatelistApi();
      // console.log(res);
      this.firstList = res.list;
    },
    async getSepcsListData() {
      let res = await getSpecsListApi();
      // console.log(res);
      this.specList = res.list;
    },
    // 给弹窗中的表单赋值
    setVal(info) {
      this.$nextTick(() => {
        //准备编辑器
        //dom更新是异步的，所以放在nextTick中，trigger触发方式
        if (!this.editor) {
          //如果编辑器已经存在，就不再重复创建
          this.editor = new E("#editor");
          this.editor.create();
        }
        //设置编辑器中的内容
        //editor.txt.html(),如果有参数，就是设置内容；没有参数就是获取内容
        this.editor.txt.html(info.description);
      });

      this.fileList = [];
      if (info.img) {
        this.fileList.push({
          name: "u-admin",
          url: this.$host + info.img,
        });
        // if ((this.msg.type = "edit")) {
        //   this.firstChange();
        // }
      }
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
          this.ruleForm.description = this.editor.txt.html();
          // post请求文件中带有文件，需要转换格式，变成formdata格式的数据
          //删除多余字段
          this.ruleForm.children ? delete this.ruleForm.children : "";
          this.ruleForm.firstcatename ? delete this.ruleForm.firstcatename : "";
          this.ruleForm.secondcatename
            ? delete this.ruleForm.secondcatename
            : "";
          let fd = new FormData();
          // fd.append('pid',this.ruleForm.id)//给formdata添加数据的方式
          for (const key in this.ruleForm) {
            fd.append(key, this.ruleForm[key]);
          }
          // 校验通过
          if (this.msg.type == "add") {
            // 添加
            let res = await addGoodsApi(fd);
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
            let res = await editGoodsApi(fd);
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