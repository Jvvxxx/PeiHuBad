<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="商品名称::">
            <el-input v-model="formInline.user" size="mini" placeholder="请输入商品名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="厂家名称::">
            <el-input v-model="formInline.adder" size="mini" placeholder="请输入厂家名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <div class="block">
            <span class="demonstration">录入时间:</span>
            <el-date-picker
              v-model="value1"
              type="daterange"
              size="mini"
              style="margin-top:7px;"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="Select" size="mini" style="margin-top:7px;">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" size="mini" @click="dialogVisible=true">新增商品</el-button>
        <el-button type="primary" size="mini">批量删除</el-button>
      </el-col>
    </el-row>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">{{ scope.row.userId}}</template>
      </el-table-column>
      <el-table-column prop="goodsId" label="商品编号" width="170"></el-table-column>
      <el-table-column prop="goodsName" label="商品名称" show-overflow-tooltip></el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <img :src="scope.row.goodsPic" alt />
        </template>
      </el-table-column>
      <el-table-column prop="goodsSpec" label="商品规格"></el-table-column>
      <el-table-column prop="goodsManufactor" label="厂家名称"></el-table-column>
      <el-table-column prop="goodsRegistration" label="注册文号"></el-table-column>
      <el-table-column prop="cTime" label="录入时间"></el-table-column>
      <el-table-column prop="uTime" label="修改时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span style="color:#409EFF;" @click="dialogVisible1=true,Updata1(scope.row.goodsId,scope.row.goodsName,scope.row.goodsSpec,scope.row.goodsManufactor,scope.row.goodsRegistration)">编辑</span>
          <span style="color:#F5222D; margin-left:5px;" @click="Del(scope.row.goodsId)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加 -->
    <el-dialog title="新增商品" :visible.sync="dialogVisible" width="width: 41%">
      <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="商品名称"
          prop="age"
          v-model="goodname"
          :rules="[
      { required: true, message: '商品名称不能为空'},
    ]"
        >
          <el-input
            type="text"
            placeholder="请输入商品名称"
            v-model="numberValidateForm.age"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品规格"
          prop="age"
          v-model="goodguige"
          :rules="[
      { required: true, message: '商品规格不能为空'},
    ]"
        >
          <el-input
            type="text"
            placeholder="请输入商品规格"
            v-model="numberValidateForm.age1"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="厂家名称"
          prop="age"
          v-model="changjianame"
          :rules="[
      { required: true, message: '厂家名称不能为空'},
    ]"
        >
          <el-input
            type="text"
            placeholder="请输入厂家名称"
            v-model="numberValidateForm.age2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="注册文号"
          prop="age"
          v-model="wenhao"
          :rules="[
      { required: true, message: '注册文号不能为空'},
    ]"
        >
          <el-input
            type="text"
            placeholder="请输入注册文号"
            v-model="numberValidateForm.age3"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Add()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改商品" :visible.sync="dialogVisible1" width="width: 41%">
      <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="商品名称"
          prop="age"
          v-model="goodname"
          :rules="[
      { required: true, message: '商品名称不能为空'},
    ]"
        >
          <el-input
            type="text"
            placeholder="请输入商品名称"
            v-model="numberValidateForm.age"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品规格"
          prop="age"
          v-model="goodguige"
          :rules="[
      { required: true, message: '商品规格不能为空'},
    ]"
        >
          <el-input
            type="text"
            placeholder="请输入商品规格"
            v-model="numberValidateForm.age1"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="厂家名称"
          prop="age"
          v-model="changjianame"
          :rules="[
      { required: true, message: '厂家名称不能为空'},
    ]"
        >
          <el-input
            type="text"
            placeholder="请输入厂家名称"
            v-model="numberValidateForm.age2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="注册文号"
          prop="age"
          v-model="wenhao"
          :rules="[
      { required: true, message: '注册文号不能为空'},
    ]"
        >
          <el-input
            type="text"
            placeholder="请输入注册文号"
            v-model="numberValidateForm.age3"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="Updata()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
const Qs = require("qs");
export default {
  data() {
    return {
      formInline: {
        user: "",
        adder: "",
        admin: ""
      },
      value1: "",
      tableData: [],
      IDD:'',
      wenhao:'',
      changjianame:'',
      goodguige:'',
      numberValidateForm: {
        age: "",
        age1: "",
        age2: "",
        age3: ""
      },
      dialogVisible: false,
      dialogVisible1: false,
      goodname: ""
    };
  },
  mounted() {
    this.All();
  },
  methods: {
   handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
    Select() {
      this.axios({
        method: "GET",
        url: `http://122.112.253.28:8085/api/goods/admin/getBackGoodsList?startTime=${this.value1}&endTime=${this.value1}&offset=1&limit=10&goodsName=${this.formInline.user}&goodsManufactor=${this.formInline.adder}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(SelectData => {
        console.log(SelectData);
        this.tableData = SelectData.data.data.records;
      });
    },
    All() {
      this.axios({
        method: "get",
        url:
          "http://122.112.253.28:8085/api/goods/admin/getBackGoodsList?offset=1&limit=10",
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.tableData = relt.data.data.records;
      });
    },
    Del(id) {
      const DelID = Qs.stringify({
        goodsIds: id
      });
      this.axios({
        method: "POST",
        url: "http://122.112.253.28:8085/api/goods/admin/delGoods",
        headers: {
          Authorization: window.sessionStorage.token
        },
        data: DelID
      }).then(DelData => {
        console.log(DelData);
        if (DelData.data.msg == "操作成功！") {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.All();
        } else {
          this.$message({
            message: "删除失败",
            type: "error"
          });
        }
      });
    },
    Add() {
      const AddS = Qs.stringify({
        goodsName: this.numberValidateForm.age,
        goodsSpec: this.numberValidateForm.age1,
        goodsManufactor: this.numberValidateForm.age2,
        goodsRegistration: this.numberValidateForm.age3,
        goodsPic: "uploads/file/20210425/1619331998115.jpg"
      });
      this.axios({
        method: "POST",
        url: "http://122.112.253.28:8085/api/goods/admin/addOrUpdateGoods",
        headers: {
          Authorization: window.sessionStorage.token
        },
        data: AddS
      }).then(AddData => {
        console.log(AddData);
        if (AddData.data.msg == "操作成功！") {
          this.dialogVisible = false;
          this.$message({
            message: "新增成功",
            type: "success"
          });
          this.All();
        } else {
          this.$message({
            message: "新增失败",
            type: "error"
          });
        }
      });
    },
    Updata1(id,name,spec,manufactor,registration){
console.log(id)
this.IDD=id;
this.numberValidateForm.age=name;
this.numberValidateForm.age1=spec;
this.numberValidateForm.age2=manufactor;
this.numberValidateForm.age3=registration;
    },
    Updata() {
      const UpS = Qs.stringify({
        goodsId: this.IDD,
        goodsManufactor: this.numberValidateForm.age2,
        goodsName: this.numberValidateForm.age,
        goodsPic: "uploads/file/20210425/1619331998115.jpg",
        goodsPrice: "",
        goodsRegistration: this.numberValidateForm.age3,
        goodsSpec: this.numberValidateForm.age1
      });
      this.axios({
          method:'POST',
          url:'http://122.112.253.28:8085/api/goods/admin/addOrUpdateGoods',
          headers:{
              Authorization:window.sessionStorage.token
          },
          data:UpS
      }).then(UpdataS=>{
          console.log(UpdataS)
           if (UpdataS.data.msg == "操作成功！") {
          this.dialogVisible1 = false;
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.All();
        } else {
          this.$message({
            message: "修改失败",
            type: "error"
          });
        }
      })
    }
  }
};
</script>