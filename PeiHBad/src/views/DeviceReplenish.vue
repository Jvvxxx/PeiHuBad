<template>
  <div class="Replenish">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="设备编号">
            <el-input clearable v-model="formInline.user" size="mini" placeholder="请输入设备编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="设备所属医院">
            <el-input clearable v-model="formInline.user2" size="mini" placeholder="请输入设备所属医院"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="代理商姓名">
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
        <el-col :span="6">
          <el-form-item label="商品名称">
            <el-input clearable v-model="formInline.user3" size="mini" placeholder="请输入商品名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="补贷员名称">
            <el-input clearable v-model="formInline.user4" size="mini" placeholder="请输入补贷员名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系电话">
            <el-input clearable v-model="formInline.user5" size="mini" placeholder="请输入联系电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="操作状态">
            <el-select clearable v-model="formInline.region2" size="mini" placeholder="请选择">
              <el-option label="补货" value="1"></el-option>
              <el-option label="清空" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="录入时间:">
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
    </el-form>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column prop="deviceNumber" label="设备编号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="hospitalName" label="设备所属医院" width="110px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="companyName" label="所属代理商" width="100px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsName" label="商品名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsSpec" label="商品规格" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsManufactor" label="厂家名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsRegistration" label="注册文号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="cabinetNumber" label="格子号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="realName" label="补货员" show-overflow-tooltip></el-table-column>
      <el-table-column prop="userPhone" label="联系电话" show-overflow-tooltip></el-table-column>
      <el-table-column prop="replenishmentType" label="操作状态" :formatter="play"></el-table-column>
      <el-table-column prop="cTime" label="操作时间" show-overflow-tooltip></el-table-column>
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
// const Qs = require("qs");
export default {
  component: {
    moment
  },
  name: "Good",
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
        region: "",
        region2: ""
      },
      tableData: [],
      shij: "",
      shij2: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: "",
      qi: [],
      reg: []
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
    this.axios({
      method: "GET",
      url:
        "http://122.112.253.28:8085/api/replenishment-record/admin/getReplenishmentRecordList?offset=1&limit=10",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relt => {
      this.size = relt.data.data.size;
      this.total = relt.data.data.total;
      this.tableData = relt.data.data.records;
    });
  },
  methods: {
    play(row) {
      if (row.replenishmentType === 1) {
        return "补货";
      } else {
        return "清空";
      }
    },
    handleSizeChange(val) {
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/replenishment-record/admin/getReplenishmentRecordList?offset=1&limit=${val}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.size = relt.data.data.size;
        this.total = relt.data.data.total;
        this.tableData = relt.data.data.records;
      });
    },
    handleCurrentChange(val) {
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/replenishment-record/admin/getReplenishmentRecordList?offset=${val}&limit=10`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.size = relt.data.data.size;
        this.total = relt.data.data.total;
        this.tableData = relt.data.data.records;
      });
    },
    onSubmit() {
        // if (this.value1 == null) {
        //   this.value1 = "";
        // } else if (this.value1 == "") {
        //   this.value1 = "";
        // } else {
        //   this.qi = this.value1.join(",").split(",");
        //   this.shij = this.qi[0];
        //   this.shij2 = this.qi[1];
        //   if (this.shij) {
        //     this.shij = moment(new Date(this.shij)).format("YYYY-MM-DD hh:mm:ss");
        //   } else {
        //     this.shij = "";
        //   }
        //   if (this.shij2) {
        //     this.shij2 = moment(new Date(this.shij2)).format(
        //       "YYYY-MM-DD hh:mm:ss"
        //     );
        //   } else {
        //     this.shij2 = "";
        //   }
        // }

      this.axios({
        method: "get",
    //  startTime=${this.shij}&endTime=${this.shij2}&
        url: `http://122.112.253.28:8085/api/replenishment-record/admin/getReplenishmentRecordList?offset=1&limit=10&deviceNumber=${this.formInline.user}&hospitalName=${this.formInline.user2}&agentId=${this.formInline.region}&goodsName=${this.formInline.user3}&realName=${this.formInline.user4}&userPhone=${this.formInline.user5}&replenishmentType=${this.formInline.region2}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(rel => {
        this.tableData = rel.data.data.records;
      });
    }
  }
};
</script>
<style>
.Replenish .el-table th.is-leaf {
  background: #f8f8f9;
}
.Replenish .el-form--inline .el-form-item {
  display: flex;
  margin-right: 10px;
}
.Replenish .el-table td,
.Replenish .el-table th {
  font-size: 12px;
  padding: 5px;
  border: 1px solid #f8f8f9;
  text-align: center;
}
.Replenish .el-table .cell {
  white-space: nowrap;
}
</style>
<style scope>
.block {
  margin-top: 10px;
  text-align: center;
}
</style>