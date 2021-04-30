<template>
  <div class="Commodity">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <p style="text-align: center">订单金额</p>
          </div>
          <div class="text item">
            <p>{{zhi.sumAmount}}</p>
            <p></p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <p style="text-align: center">分成金额</p>
          </div>
          <div class="text item">
            <p>{{zhi.sumFee}}</p>
            <p></p>
          </div>
        </el-card>
      </el-col>
      <!-- thirtyDayOrderCount 订单 SumIncome 总收入 -->
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <p style="text-align: center">平台服务费</p>
          </div>
          <div class="text item">
            <p>{{zhi.sumServiceFee}}</p>
            <p></p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="订单编号:">
            <el-input clearable v-model="formInline.user4" size="mini" placeholder="请输入支付流水号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户昵称:">
            <el-input clearable v-model="formInline.user5" size="mini" placeholder="请输入昵称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系方式:">
            <el-input clearable v-model="formInline.user6" size="mini" placeholder="请输入昵称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="设备编号:">
            <el-input clearable v-model="formInline.user7" size="mini" placeholder="请输入昵称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="订单类型:">
            <el-select clearable v-model="formInline.region" size="mini" placeholder="请选择">
              <el-option label="陪护床订单消费" value="1"></el-option>
              <el-option label="商品柜订单消费" value="2"></el-option>
              <el-option label="所有" value="3"></el-option>
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
      <el-table-column fixed prop="orderNo" label="订单编号" width="170"></el-table-column>
      <el-table-column fixed prop="nickName" label="用户昵称" width="120"></el-table-column>
      <el-table-column prop="userPhone" label="用户手机号" width="130"></el-table-column>
      <el-table-column prop="deviceNumber" label="设备编号" width="140"></el-table-column>
      <el-table-column prop="orderAddress" label="设备地址" width="200"></el-table-column>
      <el-table-column prop="financeType" label="订单类型" width="70"></el-table-column>
      <el-table-column prop="amount" label="订单金额" width="100"></el-table-column>
      <el-table-column prop="fee" label="收益金额" width="100"></el-table-column>
      <el-table-column prop="serviceFee" label="平台服务费" width="100"></el-table-column>
      <el-table-column prop="payTime" label="交易时间" width="170"></el-table-column>
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
        user7:'',
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
    //查询全部 和收入
    this.axios({
      method: "GET",
      url:
        "http://122.112.253.28:8085/api/finance/admin/getProfitList?offset=1&limit=10",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relt => {
      this.total = relt.data.data.profitList.total;
      this.size = relt.data.data.profitList.size;
      this.zhi = relt.data.data;
      this.tableData = relt.data.data.profitList.records;
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
        url: `http://122.112.253.28:8085/api/finance/admin/getProfitList?offset=1&limit=10&orderNo=${this.formInline.user4}&nickName=${this.formInline.user5}&userPhone=${this.formInline.user6}&deviceNumber=${this.formInline.user7}&financeType=${this.formInline.region}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.tableData = relt.data.data.profitList.records;
      });
    },
    handleSizeChange(val) {
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/finance/admin/getProfitList?offset=1&limit=${val}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.total = relt.data.data.profitList.total;
        this.size = relt.data.data.profitList.size;
        this.tableData = relt.data.data.profitList.records;
      });
    },
    handleCurrentChange(val) {
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/finance/admin/getProfitList?offset=${val}&limit=10`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.total = relt.data.data.profitList.total;
        this.size = relt.data.data.profitList.size;
        this.tableData = relt.data.data.profitList.records;
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