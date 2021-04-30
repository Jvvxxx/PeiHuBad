<template>
  <div class="niw">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="用户昵称">
            <el-input v-model="formInline.user" size="mini" placeholder="请输入用户昵称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系电话">
            <el-input v-model="formInline.user2" size="mini" placeholder="请输入联系电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="押金状态">
            <el-select v-model="formInline.region" size="mini" placeholder="请选择">
              <el-option label="已缴纳" value="1"></el-option>
              <el-option label="未缴纳" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="账号状态">
            <el-select v-model="formInline.region2" size="mini" placeholder="请选择">
              <el-option label="禁用" value="1"></el-option>
              <el-option label="启用" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <el-form-item>
            <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="1" :offset="1">
          <el-form-item>
            <el-button type="primary" @click="onSubmit2" size="mini">批量发送短息</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">{{ scope.row.userId}}</template>
      </el-table-column>
      <el-table-column prop="userNo" label="用户编号" width="170"></el-table-column>
      <el-table-column prop="nickName" label="用户昵称" show-overflow-tooltip></el-table-column>
      <el-table-column label="用户头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatarUrl" alt />
        </template>
      </el-table-column>
      <el-table-column prop="userPhone" label="手机号"></el-table-column>
      <el-table-column prop="cTime" label="注册日期"></el-table-column>
      <el-table-column prop="isFlag" label="状态" :formatter="ztai"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <span
              @click="jin(scope.row.nickName,scope.row.userId)"
              v-if="scope.row.isFlag===2"
              style="color:red"
            >禁用</span>
            <span @click="qi(scope.row.nickName,scope.row.userId)" v-else style="color:blue">正常</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style>
.niw .el-table th.is-leaf {
  background: #f8f8f9;
}
.niw .el-table td,
.niw .el-table th {
  font-size: 12px;
  padding: 5px;
  border: 1px solid #f8f8f9;
  text-align: center;
}
</style>
<style scope>
</style>
<script>
const Qs = require("qs");

let url = "http://122.112.253.28:8085";
export default {
  name: "List",
  data() {
    return {
      formInline: {
        user: "",
        user2: "",
        region: "",
        region2: ""
      },
      tableData: []
    };
  },
  created() {
    this.axios({
      method: "get",
      url: url + "/api/users/admin/getBackUsersList?offset=1&limit=10",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relt => {
      this.tableData = relt.data.data.records;
    });
  },
  methods: {
    onSubmit() {
      this.axios({
        token: "",

        url:
          url +
          `/api/users/admin/getBackUsersList?offset=1&limit=10&nickName=${this.formInline.user}&userPhone=${this.formInline.user2}&isDeposit=${this.formInline.region}&isFlag=${this.formInline.region2}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(rel => {
        this.tableData = rel.data.data.records;
      });
    },
    onSubmit2() {},
    jin(name, id) {
      const data = Qs.stringify({
        isFlag: 1,
        userId: id
      });
      this.$confirm("确定禁用" + name + "吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            method: "POST",
            url: "http://122.112.253.28:8085/api/users/admin/updateUserIsFlag",
            headers: {
              Authorization: window.sessionStorage.token
            },
            data: data
          }).then(relt => {
            this.$message({
              message: "" + relt.data.msg + "",
              type: "success"
            });
            this.axios({
              method: "get",
              url:
                "http://122.112.253.28:8085/api/users/admin/getBackUsersList?offset=1&limit=10",
              headers: {
                Authorization: window.sessionStorage.token
              }
            }).then(relt => {
              this.size = relt.data.data.size;
              this.total = relt.data.data.total;
              this.tableData = relt.data.data.records;
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消禁用"
          });
        });
    },
    qi(name, id) {
      const data = Qs.stringify({
        isFlag: 2,
        userId: id
      });
      this.$confirm("确定启用" + name + "吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            method: "POST",
            url: "http://122.112.253.28:8085/api/users/admin/updateUserIsFlag",
            headers: {
              Authorization: window.sessionStorage.token
            },
            data: data
          }).then(relt => {
            this.$message({
              message: "" + relt.data.msg + "",
              type: "success"
            });
            this.axios({
              method: "get",
              url:
                "http://122.112.253.28:8085/api/users/admin/getBackUsersList?offset=1&limit=10",
              headers: {
                Authorization: window.sessionStorage.token
              }
            }).then(relt => {
              this.size = relt.data.data.size;
              this.total = relt.data.data.total;
              this.tableData = relt.data.data.records;
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消启用"
          });
        });
    },
    ztai(row) {
      if (row.isFlag === 1) {
        return "禁用";
      } else {
        return "正常";
      }
    }
  }
};
</script>