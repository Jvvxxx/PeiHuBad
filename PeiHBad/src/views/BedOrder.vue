<template>
  <div class="Bed">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <p style="text-align: center">今天</p>
          </div>
          <div class="text item">
            <p>订单数量：{{zhi.orderCount}}</p>
            <p>总收入：{{zhi.sumIncome}}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <p style="text-align: center">近7天</p>
          </div>
          <div class="text item">
            <p>订单数量：{{zhi.sevenDayOrderCount}}</p>
            <p>总收入：{{zhi.sevenDaySumIncome}}</p>
          </div>
        </el-card>
      </el-col>
      <!-- thirtyDayOrderCount 订单 SumIncome 总收入 -->
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <p style="text-align: center">近30天</p>
          </div>
          <div class="text item">
            <p>订单数量：{{zhi.thirtyDayOrderCount}}</p>
            <p>总收入：{{zhi.thirtyDaySumIncome}}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <p style="text-align: center">按筛选条件</p>
          </div>
          <div class="text item">
            <p>订单数量：{{zhi.conditionOrderCount}}</p>
            <p>总收入：{{zhi.conditionSumIncome}}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="7">
          <el-form-item label="订单编号：">
            <el-input clearable v-model="formInline.user" size="mini" placeholder="请输入订单编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="用户昵称：">
            <el-input clearable v-model="formInline.user2" size="mini" placeholder="请输入用户昵称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="联系方式：">
            <el-input clearable v-model="formInline.user3" size="mini" placeholder="请输入联系方式"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="设备编号：">
            <el-input clearable v-model="formInline.user4" size="mini" placeholder="请输入设备编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="医院地址：">
            <el-input clearable v-model="formInline.user5" size="mini" placeholder="请输入医院地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="代理商姓名：">
            <el-select clearable v-model="formInline.region" size="mini" placeholder="请选择">
              <el-option
                :label="item.companyName"
                v-for="(item, index) in reg"
                :key="index"
                :value="item.agentId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="支付流水号：">
            <el-input clearable v-model="formInline.user6" size="mini" placeholder="请输入设备编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="订单状态：">
            <el-select clearable v-model="formInline.region2" size="mini" placeholder="请选择">
              <el-option label="待支付" value="1"></el-option>
              <el-option label="进行中" value="2"></el-option>
              <el-option label="已完成" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="是否超时：">
            <el-select clearable v-model="formInline.region3" size="mini" placeholder="请选择">
              <el-option label="未超时" value="1"></el-option>
              <el-option label="已超时" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="下单时间:">
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
        <el-col :span="1">
          <el-form-item>
            <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <el-form-item>
            <el-button type="primary" @click="onSubmit" size="mini">批量发送短信</el-button>
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
      <el-table-column fixed type="selection" width="55"></el-table-column>
      <el-table-column fixed type="index" label="序号" width="60"></el-table-column>
      <el-table-column fixed prop="orderNo" label="订单编号" width="90"></el-table-column>
      <el-table-column prop="nickName" label="用户昵称" width="120"></el-table-column>
      <el-table-column prop="userPhone" label="用户手机号" width="120"></el-table-column>
      <el-table-column prop="deviceNumber" label="设备编号" width="120"></el-table-column>
      <el-table-column prop="companyName" label="所属代理商" width="120"></el-table-column>
      <el-table-column prop="orderAddress" label="设备地址" width="120"></el-table-column>
      <el-table-column prop="leaseStartTime" label="下单时间" width="120"></el-table-column>
      <el-table-column prop="openCabinetNumber" label="取床格子" width="80"></el-table-column>
      <el-table-column prop="leaseEndTime" label="结束时间" width="90"></el-table-column>
      <el-table-column prop="closeCabinetNumber" label="还床格子" width="80"></el-table-column>
      <el-table-column prop="packagePrice" label="用床套餐" width="80"></el-table-column>
      <el-table-column prop="payTime" label="超时时长" width="80"></el-table-column>
      <el-table-column prop="overTimeAmount" label="超时费用" width="80"></el-table-column>
      <el-table-column prop="amount" label="支付金额" width="80"></el-table-column>
      <el-table-column prop="leaseEndTime" label="支付时间" width="80"></el-table-column>
      <el-table-column prop="outTradeNo" label="支付流水号" width="100"></el-table-column>
      <el-table-column prop="orderStatus" label="订单状态" width="80">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.orderStatus===3">已完成</el-tag>
          <el-tag type="warning" v-else-if="scope.row.orderStatus===2">进行中</el-tag>
          <el-tag else="scope.row.orderStatus===1">待支付</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100"></el-table-column>
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
  name: "Bed",
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
        region: "",
        region2: "",
        region3: ""
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
        "http://122.112.253.28:8085/api/order-share/admin/getOrderShareList?offset=1&limit=10",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relt => {
      this.total = relt.data.data.orderShareList.total;
      this.size = relt.data.data.orderShareList.size;
      this.zhi = relt.data.data;
      this.tableData = relt.data.data.orderShareList.records;
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

      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/order-share/admin/getOrderShareList?offset=1&limit=10&orderStatus=${this.formInline.region2}&orderNo=${this.formInline.user}&nickName=${this.formInline.user2}&userPhone=${this.formInline.user3}&deviceNumber=${this.formInline.user4}&orderAddress=${this.formInline.user5}&agentId=${this.formInline.region}&outTradeNo=${this.formInline.user6}&isOver=${this.formInline.region3}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.tableData = relt.data.data.orderShareList.records;
      });
    },
    handleSizeChange(val) {
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/order-share/admin/getOrderShareList?offset=1&limit=${val}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.total = relt.data.data.orderShareList.total;
        this.size = relt.data.data.orderShareList.size;
        this.tableData = relt.data.data.orderShareList.records;
      });
    },
    handleCurrentChange(val) {
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/order-share/admin/getOrderShareList?offset=${val}&limit=10`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.total = relt.data.data.orderShareList.total;
        this.size = relt.data.data.orderShareList.size;
        this.tableData = relt.data.data.orderShareList.records;
      });
    }
  }
};
</script>
<style >
.Bed .el-table th.is-leaf {
  background: #f8f8f9;
}
.Bed .el-form--inline .el-form-item {
  display: flex;
  margin-right: 10px;
}
.Bed .el-table td,
.Bed .el-table th {
  font-size: 12px;
  padding: 5px;
  border: 1px solid #f8f8f9;
  text-align: center;
}
.Bed .el-table .cell {
  white-space: nowrap;
}
.Bed .el-card.is-always-shadow:hover {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.Bed .el-card.is-always-shadow {
  box-shadow: none;
}
</style>
<style scope>
.block {
  margin-top: 10px;
  text-align: center;
}
</style>