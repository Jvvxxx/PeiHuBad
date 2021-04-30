<template>
  <div class="Commodity2">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="7">
          <el-form-item label="提现订单编号：">
            <el-input clearable v-model="formInline.user" size="mini" placeholder="请输入提现订单编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="代理商手机号：">
            <el-input clearable v-model="formInline.user2" size="mini" placeholder="请输入代理商手机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="代理商手机号：">
            <el-input clearable v-model="formInline.user3" size="mini" placeholder="请输入代理商手机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="预留手机号：">
            <el-input clearable v-model="formInline.user4" size="mini" placeholder="请输入预留手机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="提现银行卡号：">
            <el-input clearable v-model="formInline.user5" size="mini" placeholder="请输入提现银行卡号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="审核状态：">
            <el-select clearable v-model="formInline.region" size="mini" placeholder="请选择">
              <el-option label="审核中" value="1"></el-option>
              <el-option label="通过" value="2"></el-option>
              <el-option label="驳回" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item>
            <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <el-form-item>
            <el-button type="primary" icon="el-icon-download" @click="onSubmit" size="mini">导出</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed type="index" label="序号" width="80"></el-table-column>
      <el-table-column fixed prop="agentId" label="提现订单编号"></el-table-column>
      <el-table-column prop="companyName" label="代理商名称"></el-table-column>
      <el-table-column prop="linkPhone" label="代理商电话" show-overflow-tooltip></el-table-column>
      <el-table-column prop="realName" label="持卡人姓名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="bankNumber" label="银行卡号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="bankName" label="所属银行" show-overflow-tooltip></el-table-column>
      <el-table-column prop="branchName" label="所属支行" show-overflow-tooltip></el-table-column>
      <el-table-column prop="reservePhone" label="预留手机号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="amount" label="提现金额" show-overflow-tooltip></el-table-column>
      <el-table-column prop="status" label="审核状态">
        <template slot-scope="scope">
          <div> 
            <p v-if="scope.row.status===1">
              <el-tag type="warning">审核中</el-tag>
            </p>
            <p v-if="scope.row.status===2">
              <el-tag type="success">通过</el-tag>
            </p>
            <p v-if="scope.row.status===3">
              <el-tag type="success">驳回</el-tag>
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="nayReason" label="驳回理由" show-overflow-tooltip></el-table-column>
      <el-table-column prop="cTime" label="申请时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="uTime" label="处理时间" show-overflow-tooltip></el-table-column>
      <el-table-column fixed="right" label="操作" show-overflow-tooltip></el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  component: {
    moment
  },
  name: "Commodity2",
  data() {
    return {
      total: 1,
      size: 0,
      currentPage4: 1,
      formInline: {
        user: "",
        user2: "",
        user3: "",
        user4: "",
        user5: "",
        region: ""
      },
      value1: "",
      reg: [],
      shij: "",
      shij2: "",
      tableData: []
    };
  },
  created() {
    this.axios({
      method: "get",
      url: "http://122.112.253.28:8085/api/agent/admin/getAllAgentList",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relt => {
      this.reg = relt.data.data;
    });
    //查询全部 和收入
    this.axios({
      method: "GET",
      url:
        "http://122.112.253.28:8085/api/order-cash/admin/getOrderCashList?offset=1&limit=10",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relt => {
      this.total = relt.data.data.total;
      this.size = relt.data.data.size;

      this.tableData = relt.data.data.records;
    });
  },
  methods: {
    onSubmit() {
      //   if (this.value1 == null) {
      //     this.value1 = "";
      //   } else if (this.value1 == "") {
      //     this.value1 = "";
      //   } else {
      //     this.qi = this.value1.join(",").split(",");
      //     this.shij = this.qi[0];
      //     this.shij2 = this.qi[1];
      //     if (this.shij) {
      //       this.shij = moment(new Date(this.shij)).format("YYYY-MM-DD hh:mm:ss");
      //     } else {
      //       this.shij = "";
      //     }
      //     if (this.shij2) {
      //       this.shij2 = moment(new Date(this.shij2)).format(
      //         "YYYY-MM-DD hh:mm:ss"
      //       );
      //     } else {
      //       this.shij2 = "";
      //     }
      //   }
      //   &startTime=2021-04-22+00:00&endTime=2021-04-24+00:00

      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/order-cash/admin/getOrderCashList?offset=1&limit=10&status=${this.formInline.region}&outTradeNo=${this.formInline.user}&companyName=${this.formInline.user2}&linkPhone=${this.formInline.user3}&reservePhone=${this.formInline.user4}&bankNumber=${this.formInline.user5}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.total = relt.data.data.total;
        this.size = relt.data.data.size;

        this.tableData = relt.data.data.records;
      });
    },
    handleSizeChange(val) {
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/order-cash/admin/getOrderCashList?offset=1&limit=${val}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.total = relt.data.data.total;
        this.size = relt.data.data.size;
        this.tableData = relt.data.data.records;
      });
    },
    handleCurrentChange(val) {
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/order-cash/admin/getOrderCashList?offset=${val}&limit=10`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.total = relt.data.data.total;
        this.size = relt.data.data.size;
        this.tableData = relt.data.data.records;
      });
    }
  }
};
</script>
<style >
.Commodity2 .el-table th.is-leaf {
  background: #f8f8f9;
}
.Commodity2 .el-form--inline .el-form-item {
  display: flex;
  margin-right: 10px;
}
.Commodity2 .el-table td,
.Commodity2 .el-table th {
  font-size: 12px;
  padding: 5px;
  border: 1px solid #f8f8f9;
  text-align: center;
}
.Commodity2 .el-table .cell {
  white-space: nowrap;
}
.Commodity2 .el-card.is-always-shadow:hover {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.Commodity2 .el-card.is-always-shadow {
  box-shadow: none;
}
</style>
<style scope>
.block {
  margin-top: 10px;
  text-align: center;
}
</style>