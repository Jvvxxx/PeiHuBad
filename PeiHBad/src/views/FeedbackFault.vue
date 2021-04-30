<template>
  <div class="Fault">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="7">
          <el-form-item label="设备编号：">
            <el-input clearable v-model="formInline.user" size="mini" placeholder="请输入提现订单编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="损坏部位:">
            <el-select clearable v-model="formInline.region" size="mini" placeholder="请选择">
              <el-option label="屏幕" value="1"></el-option>
              <el-option label="锁" value="2"></el-option>
              <el-option label="柜门" value="3"></el-option>
              <el-option label="扶手" value="4"></el-option>
              <el-option label="椅腿" value="5"></el-option>
              <el-option label="床面" value="6"></el-option>
              <el-option label="螺丝" value="7"></el-option>
              <el-option label="其他" value="8"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="手机号码：">
            <el-input clearable v-model="formInline.user2" size="mini" placeholder="请输入代理商手机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="用户昵称：">
            <el-input clearable v-model="formInline.user3" size="mini" placeholder="请输入预留手机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="处理状态：">
            <el-select clearable v-model="formInline.region2" size="mini" placeholder="请选择">
              <el-option label="未处理" value="1"></el-option>
              <el-option label="已处理" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item>
            <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
          </el-form-item>
        </el-col>
 
      </el-row>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed type="index" label="序号" width="80"></el-table-column>
      <el-table-column fixed prop="deviceNumber" label="设备编号"></el-table-column>
      <el-table-column prop="feedbackType" label="损坏部位" :formatter="sh"></el-table-column>
      <el-table-column label="图片" show-overflow-tooltip>
        <template>
          <div>
            <!-- prop="feedbackPic" -->
            <span style="color:blue" @click="dialogVisible=true">查看</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="faultContext" label="故障描述" show-overflow-tooltip></el-table-column>
      <el-table-column prop="nickName" label="用户昵称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="userPhone" label="手机号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="cTime" label="反馈时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="status" label="处理状态">
        <template slot-scope="scope">
          <div>
            <p v-if="scope.row.status===1">
              <el-tag size="mini" type="warning">未处理</el-tag>
            </p>
            <p v-if="scope.row.status===2">
              <el-tag size="mini">已处理</el-tag>
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="eTime" label="处理时间" show-overflow-tooltip></el-table-column>

      <el-table-column prop="feedbackDesc" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <div>
            <span style="color:blue" @click="beiz(scope.row.feedbackDesc)">备注</span>
          </div>
        </template>
      </el-table-column>
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
    <el-dialog title="备注" :visible.sync="dialogVisible2" width="50%">
      <p>
        备注内容
        <el-input type="textarea" v-model="ii" style="margin-top: 10px;"></el-input>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="反馈图片" :visible.sync="dialogVisible" width="30%">
      <img :src="tableData.feedbackPic" alt="加载失败" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
export default {
  component: {
    moment
  },
  name: "Fault",
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      ii: "",
      total: 1,
      size: 0,
      currentPage4: 1,
      formInline: {
        user: "",
        user2: "",
        user3: "",
        region: "",
        region2: ""
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
        "http://122.112.253.28:8085/api/fault-feedback/admin/getFaultFeedbackList?offset=1&limit=10",
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
    sh(row) {
      if (row.feedbackType === 1) {
        return "屏幕";
      } else if (row.feedbackType === 2) {
        return "锁";
      } else if (row.feedbackType === 3) {
        return "柜门";
      } else if (row.feedbackType === 4) {
        return "扶手";
      } else if (row.feedbackType === 5) {
        return "椅腿";
      } else if (row.feedbackType === 6) {
        return "床面";
      } else if (row.feedbackType === 7) {
        return "螺丝";
      } else if (row.feedbackType === 8) {
        return "其他";
      }
    },
    beiz(zb) {
      (this.dialogVisible2 = true), (this.ii = zb);
    },
    onSubmit() {
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/fault-feedback/admin/getFaultFeedbackList?offset=1&limit=10&feedbackType=${this.formInline.region}&deviceNumber=${this.formInline.user}&nickName=${this.formInline.user3}&userPhone=${this.formInline.user2}&status=${this.formInline.region2}`,
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
        url: `http://122.112.253.28:8085/api/fault-feedback/admin/getFaultFeedbackList?offset=1&limit=${val}`,
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
        url: `http://122.112.253.28:8085/api/fault-feedback/admin/getFaultFeedbackList?offset=${val}&limit=10`,
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