<template>
  <div class="Fault">
    <el-row>
      <el-col :span="1">
        <el-button
          @click="dialogVisible = true"
          style="margin-bottom:10px"
          size="mini"
          type="primary"
          icon="el-icon-plus"
        >新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed type="index" label="序号" width="80"></el-table-column>
          <el-table-column fixed prop="commonProblemTitle" label="问题类型"></el-table-column>
          <el-table-column label="操作" show-overflow-tooltip width="80">
            <template slot-scope="scope">
              <div>
                <span style="color:red" @click="del(scope.row.proposalId)">删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>
        问题类型：
        <el-input v-model="name"></el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upd">确 定</el-button>
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
  name: "Fault",
  data() {
    return {
      name: "",
      dialogVisible: false,
      tableData: []
    };
  },
  created() {
    //查询全部 和收入
    this.axios({
      method: "GET",
      url:
        "http://122.112.253.28:8085/api/proposal-type/admin/getAllProposalType?offset=1&limit=10",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relt => {
      this.tableData = relt.data.data;
    });
  },
  methods: {
    upd() {
      const data = Qs.stringify({
        commonProblemTitle: this.name
      });
      this.dialogVisible = false;
      this.axios({
        method: "post",
        url:
          "http://122.112.253.28:8085/api/proposal-type/admin/addOrUpdateProposalType",
        headers: {
          Authorization: window.sessionStorage.token
        },
        data: data
      }).then(() => {
        this.axios({
          method: "GET",
          url:
            "http://122.112.253.28:8085/api/proposal-type/admin/getAllProposalType?offset=1&limit=10",
          headers: {
            Authorization: window.sessionStorage.token
          }
        }).then(relt => {
          this.tableData = relt.data.data;
        });
      });
    },

    del(id) {
      const data = Qs.stringify({
        proposalId: id
      });
      this.$confirm("确定删除该反馈类型？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            method: "post",
            url:
              "http://122.112.253.28:8085/api/proposal-type/admin/delProposalType",
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
                "http://122.112.253.28:8085/api/proposal-type/admin/getAllProposalType?offset=1&limit=10",
              headers: {
                Authorization: window.sessionStorage.token
              }
            }).then(relt => {
              this.tableData = relt.data.data;
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
.Fault .el-table th.is-leaf {
  background: #f8f8f9;
}
.Fault .el-form--inline .el-form-item {
  display: flex;
  margin-right: 10px;
}
.Fault .el-table td,
.Fault .el-table th {
  font-size: 12px;
  padding: 5px;
  border: 1px solid #f8f8f9;
  text-align: center;
}
.Fault .el-table .cell {
  white-space: nowrap;
}
.Fault .el-card.is-always-shadow:hover {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.Fault .el-card.is-always-shadow {
  box-shadow: none;
}
</style>
<style scope>
.block {
  margin-top: 10px;
  text-align: center;
}
</style>