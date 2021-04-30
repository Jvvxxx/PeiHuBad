<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-row>
            <el-col :span="6">
              <el-form-item label="用户昵称:">
                <el-input v-model="formInline.user" size="mini" placeholder="请输入用户昵称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="设备编号:">
                <el-input v-model="formInline.user2" size="mini" placeholder="请输入设备编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="格子号:">
                <el-input v-model="formInline.region" size="mini" placeholder="请输入格子号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属代理">
                <el-select v-model="formInline.region1" size="mini" placeholder="请选择">
                  <el-option
                    v-for="(item,i) in DaiLi"
                    :key="i"
                    :label="item.companyName"
                    :value="item.agentId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="15">
        <div class="block">
          <span class="demonstration">操作时间：</span>
          <el-date-picker
            size="mini"
            v-model="value2"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
        </div>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" size="mini" @click="Select">查询</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top:20px;">
      <el-col :span="24">
        <Row>
          <i-col span="24">
            <Table border :columns="columns1" :data="data1"></Table>
            <div style="margin-top: 20px;height: 80px">
              <Page :total="total" show-sizer show-elevator @on-change="change" />
            </div>
          </i-col>
        </Row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        user2: "",
        region: "",
        region1: ""
      },
      DaiLi: [],
      data1: [],
      pageNum: 1,
      pageSize: 10,
      total: 27,
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
      value2: "",
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          key: "switchId",
          width: 120,
          align: "center"
        },
        {
          title: "用户昵称",
          key: "nickName",
          align: "center",
          width: 120
        },
        {
          title: "设备编号",
          align: "center",
          key: "deviceNumber",
          width: 220
        },
        {
          title: "格子号",
          align: "center",
          key: "cabinetNumber",
          width: 120
        },
        {
          title: "状态",
          align: "center",
          key: "deviceType",
          width: 100
        },
        {
          title: "所属代理",
          align: "center",
          key: "companyName",
          width: 190
        },
        {
          title: "操作时间",
          align: "center",
          key: "cTime",
          width: 200
        }
      ],
      data1: [],
      forms: {
        bumen: "",
        jibie: "",
        keshi: "",
        xiags: "",
        type: "",
        date: "",
        search: ""
      }
    };
  },
  mounted() {
    this.DaiLiS();
    this.All();
  },
  methods: {
    DaiLiS() {
      this.axios({
        method: "GET",
        url: "http://122.112.253.28:8085/api/agent/admin/getAllAgentList",
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(result => {
        console.log(result);
        this.DaiLi = result.data.data;
      });
    },
    All() {
      this.axios({
        method: "GET",
        url:
          "http://122.112.253.28:8085/api/cabinet-switch/admin/getCabinetSwitchList?offset=1&limit=10",
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(AllData => {
        this.data1 = AllData.data.data.records;
      });
    },
    change(pageIndex) {
      var that = this;
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/cabinet-switch/admin/getCabinetSwitchList?offset=${pageIndex}&limit=${that.pageSize}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(replace => {
        console.log(replace);
        this.data1 = replace.data.data.records;
        that.total = replace.data.data.total;
        that.totalPage = replace.data.data.totalPage;
      });
    },
    Select(){
        this.axios({
            method:"GET",
            url:`http://122.112.253.28:8085/api/cabinet-switch/admin/getCabinetSwitchList?offset=1&limit=10&nickName=${this.formInline.user}&deviceNumber=${this.formInline.user2}&cabinetNumber=${this.formInline.region}&agentId=${this.formInline.region1}`,
            headers:{
                Authorization:window.sessionStorage.token
            }
        }).then(resultt=>{
            console.log(resultt)
             this.data1 = resultt.data.data.records;
        })
    }
  }
};
</script>
<style>
.el-button--mini,
.el-button--small {
  font-size: 12px;
  border-radius: 3px;
  margin-left: -201px;
}
</style>