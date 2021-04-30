<template>
  <div class="Question">
    <el-row>
      <el-col :span="1">
        <el-button style="margin-bottom:10px" size="mini" type="primary" icon="el-icon-plus">新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="problemTitle" label="问题"></el-table-column>
          <el-table-column label="答案">
            <template slot-scope="scope">
              <div>
                <span style="color:#65B3FF" @click="upd(scope.row.problemContent)">查看内容</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <div class="jW">
                <span
                  style="color:#65B3FF"
                  @click="bj(scope.row.problemId,scope.row.problemContent,scope.row.problemTitle)"
                >编辑</span>
                <span style="color:red" @click="del(scope.row.problemId)">删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog class="cava" title="编辑答案" :visible.sync="dialogVisible2" width="60%">
      <p>问题：</p>
      <p>
        <el-input v-model="input2" placeholder="请输入内容"></el-input>
      </p>
      <p>答案：</p>
      <p>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="input"></el-input>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible2 = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="xiu">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="查看答案" :visible.sync="dialogVisible" width="60%">
      <span>{{name}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
const Qs = require("qs");
export default {
  component: {
    moment
  },
  name: "Question",
  data() {
    return {
      name: "",
      input: "",
      oq: "",
      input2: "",
      dialogVisible2: false,
      dialogVisible: false,
      tableData: []
    };
  },
  created() {
    //查询全部
    this.axios({
      method: "GET",
      url:
        "http://122.112.253.28:8085/api/common-problem/admin/getCommonProblemList?offset=1&limit=10",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relt => {
      this.tableData = relt.data.data.records;
    });
  },
  methods: {
    xiu() {
        this.dialogVisible2 = false;
      const data = Qs.stringify({
        problemContent: this.input,
        problemId: this.oq,
        problemTitle: this.input2
      });
      this.axios({
        method: "post",
        url:
          "http://122.112.253.28:8085/api/common-problem/admin/addOrupdateCommonProblem",
        headers: {
          Authorization: window.sessionStorage.token
        },
        data: data
      });
          this.axios({
              method: "GET",
              url:
                "http://122.112.253.28:8085/api/common-problem/admin/getCommonProblemList?offset=1&limit=10",
              headers: {
                Authorization: window.sessionStorage.token
              }
            }).then(relt => {
              this.tableData = relt.data.data.records;
            });
      
   
    },
    upd(idd) {
      this.dialogVisible = true;
      this.name = idd;
    },
    bj(idi, ct, tle) {
      this.dialogVisible2 = true;
      this.input = ct;
      this.input2 = tle;
      this.oq = idi;
    },
    del(id) {
      const data = Qs.stringify({
        problemId: id
      });
      this.$confirm("确定删除该问题？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            method: "post",
            url:
              "http://122.112.253.28:8085/api/common-problem/admin/delCommonProblem",
            headers: {
              Authorization: window.sessionStorage.token
            },
            data: data
          }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            //查询全部
            this.axios({
              method: "GET",
              url:
                "http://122.112.253.28:8085/api/common-problem/admin/getCommonProblemList?offset=1&limit=10",
              headers: {
                Authorization: window.sessionStorage.token
              }
            }).then(relt => {
              this.tableData = relt.data.data.records;
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style >
.Question .el-table th.is-leaf {
  background: #f8f8f9;
}
.Question .el-form--inline .el-form-item {
  display: flex;
  margin-right: 10px;
}
.Question .el-table td,
.Question .el-table th {
  font-size: 12px;
  padding: 5px;
  border: 1px solid #f8f8f9;
  text-align: center;
}
.Question .el-table .cell {
  white-space: nowrap;
}
.cava p {
  margin: 5px 0;
}
.cava p textarea,
.cava p input {
  color: #737478;
  font-size: 12px;
  font-weight: 700;
}
.Question .el-card.is-always-shadow:hover {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.Question .el-card.is-always-shadow {
  box-shadow: none;
}
</style>
<style scope>
.block {
  margin-top: 10px;
  text-align: center;
}
.jW span {
  margin: 0 5px;
}
</style>