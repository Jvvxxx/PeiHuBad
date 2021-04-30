<template>
  <div class="Commodity">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <p style="text-align: center">昨日</p>
          </div>
          <div class="text item">
            <p>总收入：{{zhi.toDaySumIncome}}</p>
            <p>总支出：{{zhi.toDaySumExpenditure}}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <p style="text-align: center">本周</p>
          </div>
          <div class="text item">
            <p>总收入：{{zhi.sevenDaySumIncome}}</p>
            <p>总支出：{{zhi.sevenSumExpenditure}}</p>
          </div>
        </el-card>
      </el-col>
      <!-- thirtyDayOrderCount 订单 SumIncome 总收入 -->
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <p style="text-align: center">本月</p>
          </div>
          <div class="text item">
            <p>总收入：{{zhi.thirtyDaySumIncome}}</p>
            <p>总支出：{{zhi.thirtyDaySumExpenditure}}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <p style="text-align: center">按筛选条件</p>
          </div>
          <div class="text item">
            <p>总收入：{{zhi.conditionSumIncome}}</p>
            <p>总支出：{{zhi.conditionSumExpenditure}}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="7">
          <el-form-item label="支付流水号:">
            <el-input clearable v-model="formInline.user4" size="mini" placeholder="请输入支付流水号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="昵称:">
            <el-input clearable v-model="formInline.user5" size="mini" placeholder="请输入昵称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="财务类型:">
            <el-select clearable v-model="formInline.region" size="mini" placeholder="请选择">
              <el-option label="缴纳押金" value="1"></el-option>
              <el-option label="退押金" value="2"></el-option>
              <el-option label="陪护床订单消费" value="3"></el-option>
              <el-option label="商品柜订单消费" value="4"></el-option>
              <el-option label="代理商提现" value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="交易时间:">
            <el-date-picker
              size="mini"
              style="width:100%"
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
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
      <el-table-column fixed type="userId" label="序号" width="60"></el-table-column>
      <el-table-column fixed prop="financeId" label="财务编号" width="100"></el-table-column>
      <el-table-column fixed prop="nickName" label="昵称" width="190"></el-table-column>
      <el-table-column prop="outTradeNo" label="支付流水号" width="290"></el-table-column>
      <el-table-column prop="fee" label="交易金额" width="140"></el-table-column>
      <el-table-column prop="financeType" label="财务类型" width="140"></el-table-column>
      <el-table-column prop="cTime" label="交易时间" width="220"></el-table-column>
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
  name: "Commodity",
  data() {
    return {
      zhi: [],
      total: 1,
      size: 0,
      currentPage4: 1,
      formInline: {
        user: "",
        user2: "",
        user3: "",
        user4: "",
        user5: "",
        user6: "",
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
        "http://122.112.253.28:8085/api/finance/admin/getFinanceDetailList?offset=1&limit=10",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relt => {
      this.total = relt.data.data.financeDetailList.total;
      this.size = relt.data.data.financeDetailList.size;
      this.zhi = relt.data.data;
      this.tableData = relt.data.data.financeDetailList.records;
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
        url: `http://122.112.253.28:8085/api/finance/admin/getFinanceDetailList?offset=1&limit=10&outTradeNo=${this.formInline.user4}&nickName=${this.formInline.user5}&financeType=${this.formInline.region}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.tableData = relt.data.data.financeDetailList.records;
      });
    },
    handleSizeChange(val) {
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/finance/admin/getFinanceDetailList?offset=1&limit=${val}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.total = relt.data.data.financeDetailList.total;
        this.size = relt.data.data.financeDetailList.size;
        this.tableData = relt.data.data.financeDetailList.records;
      });
    },
    handleCurrentChange(val) {
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/finance/admin/getFinanceDetailList?offset=${val}&limit=10`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.total = relt.data.data.financeDetailList.total;
        this.size = relt.data.data.financeDetailList.size;
        this.tableData = relt.data.data.financeDetailList.records;
      });
    }
  }
};
</script>
<style >
.Commodity .el-table th.is-leaf {
  background: #f8f8f9;
}
.Commodity .el-form--inline .el-form-item {
  display: flex;
  margin-right: 10px;
}
.Commodity .el-table td,
.Commodity .el-table th {
  font-size: 12px;
  padding: 5px;
  border: 1px solid #f8f8f9;
  text-align: center;
}
.Commodity .el-table .cell {
  white-space: nowrap;
}
.Commodity .el-card.is-always-shadow:hover {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.Commodity .el-card.is-always-shadow {
  box-shadow: none;
}
</style>
<style scope>
.block {
  margin-top: 10px;
  text-align: center;
}
</style>