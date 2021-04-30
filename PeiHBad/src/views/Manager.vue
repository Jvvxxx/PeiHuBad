<template>
  <div>
    <el-row style="margin-top:10px;">
      <el-col :span="5" :offset="1">
        <el-input clearable v-model="formInline.user" size="mini" placeholder="请输入管理员账号"></el-input>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-input clearable v-model="formInline.user1" size="mini" placeholder="请输入管理员名称"></el-input>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-input clearable v-model="formInline.user2" size="mini" placeholder="请输入管理员电话"></el-input>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-button type="primary" size="mini" @click="select">查询</el-button>
        <el-button type="primary" size="mini" @click="dialogVisible=true">新增</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%;margin-top:20px;text-align: center">
      <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
      <el-table-column fixed prop="userAccount" label="管理员账号"></el-table-column>
      <el-table-column prop="userName" label="管理员姓名" ></el-table-column>
      <el-table-column prop="userPhone" label="管理员电话"></el-table-column>
      <el-table-column prop="isFlag" label="状态" width="100">
        <template slot-scope="scope">
          <div>
            <p v-if="scope.row.isFlag===1">
              <el-tag size="mini" type="warning">冻结</el-tag>
            </p>
            <p v-if="scope.row.isFlag===2">
              <el-tag size="mini">正常</el-tag>
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="ctime" label="创建时间" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <div>
            <p style="margin-top: 12px;">
              <el-button size="mini" class="btnspan" @click="dialogVisible3=true,getID(scope.row.managerId)">重置密码</el-button>
              <el-button size="mini" class="btnspan1" @click="dialogVisible2=true,getID(scope.row.managerId)">绑定角色</el-button>
            </p>

            <br />
            <p style="margin-top: -19px;">
              <el-button size="mini"
                class="btnspan2"
                @click="dialogVisible1=true,bianji(scope.row.userName,scope.row.userAccount,scope.row.userPhone,scope.row.managerId)"
              >编辑</el-button>
              <el-button class="btnspan3" size="mini" @click="ForFlag(scope.row.managerId)" v-show="scope.row.isFlag===1">启用</el-button>
              <el-button class="btnspan3" size="mini" @click="ForFlag(scope.row.managerId)" v-show="scope.row.isFlag===2" style="background:red">禁用</el-button>
              <el-button class="btnspan4" size="mini" @click="del(scope.row.managerId)">删除</el-button>
            </p>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增 -->
    <el-dialog title="新增管理员" :visible.sync="dialogVisible" width="width: 41%">
      <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="名称："
          prop="age"
          v-model="bclass"
          :rules="[
      { required: true, message: '名称不能为空'},
    ]"
        >
          <el-input
            type="text"
            placeholder="请输入名称"
            v-model="numberValidateForm.age"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="账号："
          prop="age"
          v-model="bclass"
          :rules="[
      { required: true, message: '账号不能为空'},
    ]"
        >
          <el-input
            type="text"
            placeholder="请输入账号"
            v-model="numberValidateForm.age1"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="手机号码："
          prop="age"
          v-model="bclass"
          :rules="[
      { required: true, message: '手机号码不能为空'},
    ]"
        >
          <el-input
            type="text"
            placeholder="请输入手机号码"
            v-model="numberValidateForm.age2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑管理员" :visible.sync="dialogVisible1" width="width: 41%">
      <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="名称："
          prop="age"
          v-model="bclass"
          :rules="[
      { required: true, message: '名称不能为空'},
    ]"
        >
          <el-input
            type="text"
            placeholder="请输入名称"
            v-model="numberValidateForm.age"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="账号："
          prop="age"
          v-model="bclass"
          :rules="[
      { required: true, message: '账号不能为空'},
    ]"
        >
          <el-input
            disabled
            type="text"
            placeholder="请输入账号"
            v-model="numberValidateForm.age1"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="手机号码："
          prop="age"
          v-model="bclass"
          :rules="[
      { required: true, message: '手机号码不能为空'},
    ]"
        >
          <el-input
            disabled
            type="text"
            placeholder="请输入手机号码"
            v-model="numberValidateForm.age2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="Updata()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 绑定 -->
    <el-dialog title="绑定角色" :visible.sync="dialogVisible2" width="width: 41%">
      <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色信息:">
          <el-select v-model="formInline.region" multiple placeholder="请选择">
            <el-option
              v-for="(item,i) in DaiLi"
              :key="i"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="BangDing">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 重置 -->
    <el-dialog title="重置密码" :visible.sync="dialogVisible3" width="width: 41%">
      <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="密码："
          prop="age"
          v-model="bclass"
          :rules="[
      { required: true, message: '密码仅以字母开头，长度在6~18之间，只能包含字母、数字和下划线'},
    ]"
        >
          <el-input
            type="text"
            placeholder="请输入密码"
            v-model="numberValidateForm.age"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="chongzhi">确 定</el-button>
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
        user1: "",
        user2: "",
        region: []
      },
      numberValidateForm: {
        age: "",
        age1: "",
        age2: "",
        id: ""
      },
      bclass: "",
      tableData: [],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      DaiLi: [],
      getid: ""
    };
  },
  mounted() {
    this.All();
    this.Type();
  },
  methods: {
    All() {
      this.axios({
        method: "GET",
        url:
          "http://122.112.253.28:8085/api/manager/admin/list?offset=1&limit=10&userName=&userPhone=&userAccount=&minCr=&maxCr=&managerType=2",
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.total = relt.data.data.total;
        this.size = relt.data.data.size;

        this.tableData = relt.data.data.records;
      });
    },
    select() {
      this.axios({
        method: "GET",
        url: `http://122.112.253.28:8085/api/manager/admin/list?offset=1&limit=10&userName=${this.formInline.user}&userPhone=${this.formInline.user1}&userAccount=${this.formInline.user2}&minCr=&maxCr=&managerType=2`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(selectData => {
        console.log(selectData);
        this.tableData = selectData.data.data.records;
      });
    },
    add() {
      const aDDdata = Qs.stringify({
        userName: this.numberValidateForm.age,
        userPhone: this.numberValidateForm.age2,
        userAccount: this.numberValidateForm.age1,
        managerType: 2
      });
      this.axios({
        method: "POST",
        url: "http://122.112.253.28:8085/api/manager/admin/set",
        headers: {
          Authorization: window.sessionStorage.token
        },
        data: aDDdata
      }).then(adddata => {
        console.log(adddata);
        var fanhuiz = adddata.data.msg;
        if (fanhuiz == "操作成功！") {
          this.dialogVisible = false;
          this.$message.success({
            message: fanhuiz,
            type: "success"
          });
          this.All();
        } else {
          this.$message.error({
            message: fanhuiz,
            type: "error"
          });
        }
      });
    },
    del(id) {
      this.$confirm("确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            method: "DELETE",
            url: `http://122.112.253.28:8085/api/manager/admin/del?key=${id}`,
            headers: {
              Authorization: window.sessionStorage.token
            }
          }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            //查询全部
            this.All();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    ForFlag(id) {
      const flag = Qs.stringify({
        key: id
      });
      this.axios({
        method: "PUT",
        url: "http://122.112.253.28:8085/api/manager/admin/updateForFlag",
        headers: {
          Authorization: window.sessionStorage.token
        },
        data: flag
      }).then(FlagDate => {
        console.log(FlagDate);
        this.$message({
          type: "success",
          message: "成功!"
        });
        this.All();
      });
    },
    bianji(name, account, phone, id) {
      this.numberValidateForm = {
        age: name,
        age1: phone,
        age2: account,
        id: id
      };
    },
    Updata() {
      const updatas = Qs.stringify({
        managerId: this.numberValidateForm.id,
        userName: this.numberValidateForm.age,
        userPhone: this.numberValidateForm.age2,
        userAccount: this.numberValidateForm.age1,
        managerType: 2
      });
      this.axios({
        method: "POST",
        url: "http://122.112.253.28:8085/api/manager/admin/set",
        headers: {
          Authorization: window.sessionStorage.token
        },
        data: updatas
      }).then(updatad => {
        console.log(updatad);
        this.dialogVisible1 = false;
        this.$message({
          type: "success",
          message: "成功!"
        });
        this.All();
      });
    },
    Type() {
      this.axios({
        method: "GET",
        url: "http://122.112.253.28:8085/api/role/admin/select",
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(sespone => {
        console.log(sespone);
        this.DaiLi = sespone.data.data;
      });
    },
    getID(id) {
      this.getid = id;
    },
    BangDing() {
      var regions=this.formInline.region
      const BDSJ = Qs.stringify({
        key: this.getid,
        roleIds: regions.join()
      });
      this.axios({
        method: "PUT",
        url: "http://122.112.253.28:8085/api/manager/admin/bindForManager",
        headers: {
          Authorization: window.sessionStorage.token
        },
        data: BDSJ
      }).then(BDdata => {
        console.log(BDdata);
        this.dialogVisible2=false;
         var fanhuiZ=BDdata.data.msg
         this.$message({
           type:'success',
          message: fanhuiZ
        });
      });
    },
    chongzhi() {
      const password = Qs.stringify({
        key: this.getid,
        passWord: this.numberValidateForm.age
      });
      this.axios({
        method:'PUT',
        url:'http://122.112.253.28:8085/api/manager/admin/updatePwdForMan',
        headers:{
          Authorization:window.sessionStorage.token
        },
        data:password
      }).then(chongzhidata=>{
        console.log(chongzhidata)
        this.dialogVisible3=false;
        var fanhuiZ=chongzhidata.data.msg
         this.$message({
           type:'success',
          message: fanhuiZ
        });
        
      })
    }
  }
};
</script>
<style >
  .el-table td,.el-table th{
    text-align: center;
    font-size: 12px;
  }
</style>
<style scoped>
.btnspan {
  color: #ffffff;
  background: #909399;

}
.btnspan1 {
  color: #ffffff;
  background: #409eff;

}
.btnspan2 {
  color: #ffffff;
  background: #409eff;

}
.btnspan3 {
  color: #ffffff;
  background: #67c23a;

}
.btnspan4 {
  color: #ffffff;
  background: #f56c6c;

}
</style>