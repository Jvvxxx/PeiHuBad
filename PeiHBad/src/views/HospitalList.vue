<template>
  <div class="Yiyuan">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="医院名称">
            <el-input clearable v-model="formInline.user" size="mini" placeholder="请输入医院名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="详细地址">
            <el-input clearable v-model="formInline.user2" size="mini" placeholder="请输入详细地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="管理员姓名">
            <el-input clearable v-model="formInline.user3" size="mini" placeholder="请输入管理员姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="管理员手机号">
            <el-input clearable v-model="formInline.user4" size="mini" placeholder="请输入管理员手机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="代理商姓名">
            <el-select clearable v-model="formInline.region" size="mini" placeholder="请选择代理商姓名">
              <el-option
                :label="item.companyName"
                v-for="(item, index) in reg"
                :key="index"
                :value="item.agentId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <el-form-item>
            <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="hospitalId" label="序号" width="60"></el-table-column>
      <el-table-column prop="hospitalName" label="医院名称"></el-table-column>
      <el-table-column label="详细地址">
        <template slot-scope="scope">
          <div>{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}{{scope.row.address}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="directorName" label="管理员姓名"></el-table-column>
      <el-table-column prop="directorPhone" label="管理员手机号"></el-table-column>
      <el-table-column prop="deposit" label="押金"></el-table-column>
      <el-table-column prop="deviceCount" label="设备数量"></el-table-column>
      <el-table-column prop="sumTurnover" label="总收入"></el-table-column>
      <el-table-column prop="companyName" label="代理商姓名"></el-table-column>
      <el-table-column prop="ctime" label="收费规则" width="140">
        <template slot-scope="scope">
          <div class="mq">
            <span @click="taocan(scope.row.hospitalId)">用床套餐</span>
            <span @click="caoshi(scope.row.hospitalId,scope.row.overTimePrice)">超时扣费</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="120">
        <template slot-scope="scope">
          <div class="mq">
            <span @click="jieBang(scope.row.hospitalId)">解绑</span>
            <span style="color:red" @click="dell(scope.row.hospitalId)">删除</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 添加 -->
    <el-dialog title="新增计费标准" :visible.sync="dialogVisible5" width="50%">
      选择时间段:
      <el-date-picker v-model="value3" size="mini" type="date" placeholder="选择日期"></el-date-picker>-
      <el-date-picker v-model="value4" size="mini" type="date" placeholder="选择日期"></el-date-picker>
      <p style="margin:50px 0 0 50px">
        金额
        <el-input-number v-model="num3" size="mini" :min="1" label="描述文字"></el-input-number>元
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible5 = false">取 消</el-button>
        <el-button type="primary" @click="qqR()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑计费标准" :visible.sync="dialogVisible4" width="50%">
      选择时间段:
      <el-date-picker v-model="value1" size="mini" type="date" placeholder="选择日期"></el-date-picker>-
      <el-date-picker v-model="value2" size="mini" type="date" placeholder="选择日期"></el-date-picker>
      <p style="margin:50px 0 0 50px">
        金额
        <el-input-number v-model="num2" size="mini" :min="1" label="描述文字"></el-input-number>元
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="qqd()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 用床套餐 -->
    <el-dialog :visible.sync="dialogTableVisible3" width="70%">
      <div class="iNp">
        <p>
          时间段收费：
          <el-button type="primary" @click="tiann" icon="el-icon-circle-plus-outline" size="mini">添加</el-button>
        </p>
        <el-table :data="tableData2" border style="width: 100%">
          <el-table-column prop="ruleId" label="序号" width="80"></el-table-column>
          <el-table-column label="时间段">
            <template slot-scope="scope">
              <div>
                {{scope.row.openStartTime}}
                <p>至</p>
                {{scope.row.closeEndTime}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="rulePrice" label="金额"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div>
                <el-button size="small " type="danger" @click="ssc(scope.row.ruleId)">删除</el-button>
                <el-button
                  type="success"
                  size="small "
                  @click="bji(scope.row.ruleId,scope.row.openStartTime,scope.row.closeEndTime,scope.row.rulePrice)"
                >编辑</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 超时扣费 -->
    <el-dialog title="设置每小时超时价格" :visible.sync="dialogVisible2" width="50%">
      <span>
        金额:
        <el-input-number v-model="num" size="mini" controls-position="right" :min="1" :max="10"></el-input-number>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="queren()" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
const Qs = require("qs");
import moment from "moment";
export default {
  component: {
    moment
  },
  name: "Yiyuan",
  data() {
    return {
      value1: "",
      value3: "",
      value4: "",
      num3: "",
      dialogVisible5: false,
      value2: "",
      num2: 0,
      ioo: "",
      indq: "",
      num: 0,
      dialogVisible4: false,
      dialogVisible2: false,
      dialogTableVisible3: false,
      dialogTableVisible: false,
      total: 1,
      size: 0,
      currentPage4: 1,
      idd: "",
      idd2: "",
      formInline: {
        user: "",
        region: "",
        user2: "",
        user3: "",
        user4: ""
      },
      reg: [],
      tableData: [],
      tableData2: []
    };
  },
  created() {
    this.axios({
      method: "get",
      url:
        " http://122.112.253.28:8085/api/hospital/admin/getHospitalList?offset=1&limit=10",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relt => {
      this.total = relt.data.data.total;
      this.size = relt.data.data.size;
      this.tableData = relt.data.data.records;
    });
    this.axios({
      method: "get",
      url: "http://122.112.253.28:8085/api/agent/admin/getAllAgentList",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relt => {
      this.reg = relt.data.data;
    });
  },
  methods: {
    qqR() {
      if (this.value3) {
        this.value3 = moment(new Date(this.value3)).format(
          "YYYY-MM-DD hh:mm:ss'"
        );
      } else {
        this.value3 = "";
      }
      if (this.value4) {
        this.value4 = moment(new Date(this.value4)).format(
          "YYYY-MM-DD hh:mm:ss'"
        );
      } else {
        this.value4 = "";
      }
      const data = Qs.stringify({
        hospitalId: this.indq,
        rulePrice: this.num3,
        startTime: this.value3,
        endTime: this.value4
      });
      this.axios({
        method: "POST",
        url: "http://122.112.253.28:8085/api/hospital-rule/admin/set",
        headers: {
          Authorization: window.sessionStorage.token
        },
        data: data
      }).then(relt => {
        if (relt.data.code == 1) {
          this.$message({
            message: "" + relt.data.msg + "",
            type: "success"
          });
          this.dialogVisible5 = false;
          this.axios({
            method: "get",
            url:
              "http://122.112.253.28:8085/api/hospital-rule/admin/getPackageRules?hospitalId=" +
              this.indq,
            headers: {
              Authorization: window.sessionStorage.token
            }
          }).then(relt => {
            this.tableData2 = relt.data.data;
          });
        } else {
          this.$message.error("" + relt.data.msg + "");
        }
      });
    },
    tiann() {
      this.dialogVisible5 = true;
    },
    qqd() {
      const data = Qs.stringify({
        ruleId: this.ioo,
        hospitalId: this.indq,
        rulePrice: this.num2,
        startTime: this.value1,
        endTime: this.value2
      });
      this.axios({
        method: "post",
        url: "http://122.112.253.28:8085/api/hospital-rule/admin/set",
        headers: {
          Authorization: window.sessionStorage.token
        },
        data: data
      }).then(rel => {
        if (rel.data.code == 1) {
          this.$message({
            message: "" + rel.data.msg + "",
            type: "success"
          });
          this.dialogVisible4 = false;
          this.axios({
            method: "get",
            url:
              "http://122.112.253.28:8085/api/hospital-rule/admin/getPackageRules?hospitalId=" +
              this.indq,
            headers: {
              Authorization: window.sessionStorage.token
            }
          }).then(relt => {
            this.tableData2 = relt.data.data;
          });
        } else {
          this.$message.error("" + rel.data.msg + "");
        }
      });
    },
    bji(id, ksj, jsj, qian) {
      this.ioo = id;
      this.value1 = ksj;
      this.value2 = jsj;
      this.num2 = qian;
      this.dialogVisible4 = true;
    },
    ssc(id) {
      this.$confirm("确定删除该套餐？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const data = Qs.stringify({
            ruleId: id
          });
          this.axios({
            method: "post",
            url: "http://122.112.253.28:8085/api/hospital-rule/admin/del",
            headers: {
              Authorization: window.sessionStorage.token
            },
            data: data
          }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.axios({
              method: "get",
              url:
                "http://122.112.253.28:8085/api/hospital-rule/admin/getPackageRules?hospitalId=" +
                this.indq,
              headers: {
                Authorization: window.sessionStorage.token
              }
            }).then(relt => {
              this.tableData2 = relt.data.data;
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    taocan(id) {
      this.indq = id;
      this.dialogTableVisible3 = true;
      this.axios({
        method: "get",
        url:
          "http://122.112.253.28:8085/api/hospital-rule/admin/getPackageRules?hospitalId=" +id,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.tableData2 = relt.data.data;
      });
    },
    caoshi(id, cf) {
      this.dialogVisible2 = true;
      this.idd = id;
      this.num = cf;
    },
    queren() {
      this.dialogVisible2 = false;
      const data = Qs.stringify({
        hospitalId: this.idd,
        overTimePrice: this.num
      });
      this.axios({
        method: "POST",
        url:
          "http://122.112.253.28:8085/api/hospital/admin/updateOverTimePrice",
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
            " http://122.112.253.28:8085/api/hospital/admin/getHospitalList?offset=1&limit=10",
          headers: {
            Authorization: window.sessionStorage.token
          }
        }).then(relt => {
          this.total = relt.data.data.total;
          this.size = relt.data.data.size;
          this.tableData = relt.data.data.records;
        });
      });
    },
    dell(id) {
      this.$confirm("确定删除该医院？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const data = Qs.stringify({
          hospitalId: id
        });
        this.axios({
          method: "POST",
          url: "http://122.112.253.28:8085/api/hospital/admin/del",
          headers: {
            Authorization: window.sessionStorage.token
          },
          data: data
        }).then(relt => {
          this.$message({
            type: "error",
            message: "" + relt.data.msg + ""
          });
        });
      });
    },
    jieBang(id) {
      this.$confirm("确定解绑该医院所有设备？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const data = Qs.stringify({
          hospitalId: id
        });
        this.axios({
          method: "POST",
          url: "http://122.112.253.28:8085/api/hospital/admin/unbind",
          headers: {
            Authorization: window.sessionStorage.token
          },
          data: data
        }).then(relt => {
          this.$message({
            type: "error",
            message: "" + relt.data.msg + ""
          });
        });
      });
    },
    onSubmit() {
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/hospital/admin/getHospitalList?offset=1&limit=10&
        hospitalName=${this.formInline.user}&directorName=${this.formInline.user3}&d
        irectorPhone=${this.formInline.user2}&agentId=${this.formInline.region}&address=${this.formInline.user4}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.tableData = relt.data.data.records;
      });
    }
  }
};
</script>
<style >
.Yiyuan .el-table th.is-leaf {
  background: #f8f8f9;
}
.Yiyuan .el-table .cell {
  white-space: nowrap;
}
.Yiyuan .el-table td,
.Yiyuan .el-table th {
  font-size: 12px;
  padding: 5px;

  text-align: center;
}
</style>
<style scope>
.iNp {
  border: 1px solid #dedede;
  padding: 10px;
  border-radius: 5px;
}
.iNp > p {
  margin: 15px 0;
}
.mq span {
  color: #409eff;
  margin: 0 5px;
}
.block {
  margin-top: 10px;
  text-align: center;
}
</style>