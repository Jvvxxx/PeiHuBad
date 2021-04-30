<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="lefttb">
          <template>
            <span class="Ztai">设备状态</span>
            <el-table :data="tableData" style="width: 35%" class="tb">
              <el-table-column prop="date" label width="180"></el-table-column>
              <el-table-column prop="name" label width="180"></el-table-column>
              <el-table-column prop="address" label></el-table-column>
            </el-table>
          </template>
        </div>
        <div id="main"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="lefttb">
          <template>
            <span class="Ztai1">陪护床状态（只统计已绑定的格子柜里面的陪护床）</span>
            <el-table :data="tableData1" style="width: 35%" class="tb1">
              <el-table-column prop="date" label width="180"></el-table-column>
              <el-table-column prop="name" label width="180"></el-table-column>
              <el-table-column prop="address" label></el-table-column>
            </el-table>
          </template>
        </div>
        <div id="main1"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-row>
            <el-col :span="6">
              <el-form-item label="设备编号:">
                <el-input v-model="formInline.user" size="mini" placeholder="请输入设备编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="设备所属医院:">
                <el-input v-model="formInline.user2" size="mini" placeholder="请输入设备所属医院"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否缺货:">
                <el-select v-model="formInline.region" size="mini" placeholder="请选择">
                  <el-option label="未缺货" value="1"></el-option>
                  <el-option label="已缴纳" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-row>
            <el-col :span="6">
              <el-form-item label="绑定状态:">
                <el-select v-model="formInline.region1" size="mini" placeholder="请选择">
                  <el-option label="正常" value="1"></el-option>
                  <el-option label="故障" value="2"></el-option>
                  <el-option label="离线" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="在线状态:">
                <el-select v-model="formInline.region2" size="mini" placeholder="请选择">
                  <el-option label="禁用" value="1"></el-option>
                  <el-option label="未禁用" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否禁用:">
                <el-select v-model="formInline.region3" size="mini" placeholder="请选择">
                  <el-option label="已缴纳" value="1"></el-option>
                  <el-option label="未缴纳" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-row>
            <el-col :span="7">
              <el-form-item label="所属代理商">
                <el-select v-model="formInline.region4" size="mini" placeholder="请选择">
                  <el-option
                    v-for="(item,i) in DaiLi"
                    :key="i"
                    :label="item.companyName"
                    :value="item.agentId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" @click="Select" size="mini">查询</el-button>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" size="mini">批量下载设备二维码</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <template>
      <el-table :data="tableData2" border style="width: 100%">
        <el-table-column fixed prop="deviceId" label="序号" width="150"></el-table-column>
        <el-table-column prop="deviceNumber" label="设备编号" width="120"></el-table-column>
        <el-table-column prop="deviceAddress" label="设备所属医院、科室、点位" width="120"></el-table-column>
        <el-table-column label="二维码" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.deviceQrcode" alt="加载失败!" />
          </template>
        </el-table-column>
        <el-table-column prop="bedCabinetCount" label="陪护床格子" width="120"></el-table-column>
        <el-table-column prop="goodsCabinetCount" label="商品格子" width="120"></el-table-column>
        <el-table-column prop="surplusGoodsCabinetCount" label="商品剩余" width="120"></el-table-column>
        <el-table-column prop="isStock" label="是否缺货" width="120"></el-table-column>
        <el-table-column prop="isBinding" label="绑定状态" width="120"></el-table-column>
        <el-table-column prop="deviceStatus" label="设备状态" width="120"></el-table-column>
        <el-table-column prop="companyName" label="所属代理商" width="120"></el-table-column>
        <el-table-column prop="isFlag" label="是否禁用" width="120"></el-table-column>

        <el-table-column fixed="right" label="操作" width="150">
          <el-button type="text" size="small" style="color:#409EFF;">陪护床</el-button>
          <el-button type="text" size="small" style="color:#409EFF;">商品柜</el-button>
          <el-button type="text" size="small" style="color:#FAAD14;">解绑</el-button>
          <el-button type="text" size="small" style="color:#F5222D;">禁用</el-button>
          <el-button type="text" size="small" style="color:#F5222D;">初始化分柜</el-button>
          <el-button type="text" size="small" style="color:#409EFF;" @click="Dengopen">灯光开</el-button>
          <el-button type="text" size="small" style="color:#409EFF;">灯光关</el-button>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      formInline: {
        user: "",
        user2: "",
        region: "",
        region1:'',
        region2: "",
        region3: "",
        region4: ""
      },
      DaiLi: [],
      tableData2: [],
      tableData: [
        {
          date: "设备总数量",
          name: "3",
          address: "100%"
        },
        {
          date: "正常设备数量",
          name: "0",
          address: "0%"
        },
        {
          date: "缺货设备数量",
          name: "2",
          address: "66.67%"
        },
        {
          date: "故障设备数量",
          name: "0",
          address: "0%"
        },
        {
          date: "离线设备数量",
          name: "3",
          address: "100%"
        },
        {
          date: "未绑定设备数量",
          name: "2",
          address: "66.67%"
        }
      ],
      tableData1: [
        {
          date: "陪护床总数量",
          name: "3",
          address: "100%"
        },
        {
          date: "可借床数量",
          name: "0",
          address: "0%"
        },
        {
          date: "使用中数量",
          name: "2",
          address: "66.67%"
        },
        {
          date: "故障设备数量",
          name: "0",
          address: "0%"
        },
        {
          date: "消毒中数量",
          name: "3",
          address: "100%"
        }
      ]
    };
  },
  mounted() {
    this.drawLine();
    this.drawLine1();
    this.DaiLiS();
    this.All();
  },
  methods: {
    drawLine() {
      var myChart = echarts.init(document.getElementById("main"));
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["正常设备", "缺货设备", "故障设备", "离线设备", "未绑定设备"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 0, name: "正常设备" },
              { value: 1548, name: "缺货设备" },
              { value: 0, name: "故障设备" },
              { value: 1548, name: "离线设备" },
              { value: 1548, name: "未绑定设备" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      option && myChart.setOption(option);
    },
    drawLine1() {
      var myChart = echarts.init(document.getElementById("main1"));
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["可借床数量", "使用中数量", "故障设备数量", "消毒中数量"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 8548, name: "可借床数量" },
              { value: 1048, name: "使用中数量" },
              { value: 0, name: "故障设备数量" },
              { value: 500, name: "消毒中数量" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      option && myChart.setOption(option);
    },
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
        method: "get",
        url:
          "http://122.112.253.28:8085/api/device/admin/getDeviceList?offset=1&limit=10",
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.tableData2 = relt.data.data.deviceList.records;
      });
    },
    Select() {
        this.axios({
            method:'GET',
            url:`http://122.112.253.28:8085/api/device/admin/getDeviceList?offset=1&limit=10&deviceNumber=${this.formInline.user}&deviceAddress=${this.formInline.user2}&isStock=${this.formInline.region}&isBinding=${this.formInline.region1}&deviceStatus=${this.formInline.region2}&isFlag=${this.formInline.region3}&agentId=${this.formInline.region4}`,
            headers:{
                Authorization:window.sessionStorage.token
            }
        }).then(rel=>{
            console.log(rel)
            this.tableData2=rel.data.data.deviceList.records
        })
    },
    Dengopen(){
      this.axios({
        method:'POST',
        url:'http://122.112.253.28:8085/api/device/admin/setCabinetlamp',
        headers:{
          Authorization:window.sessionStorage.token
        }
      }).then(DengData=>{
        console.log(DengData);
        var DZtai=DengData.data.msg;
        console.log(DZtai)
      })
    }
  }
};
</script>
<style scope>
#main {
  width: 100%;
  height: 300px;
  margin: -300px auto;
}
#main1 {
  width: 100%;
  height: 300px;
  margin: 270px auto;
}
.tb {
  position: relative;
  top: 160px;
}
.tb1 {
  position: relative;
  top: 660px;
}
.Ztai {
  position: absolute;
  top: 175px;
  z-index: 9999;
  margin-left: 10px;
  font-weight: bold;
  font-size: 17px;
}
.Ztai1 {
  position: absolute;
  top: 675px;
  z-index: 9999;
  margin-left: 10px;
  font-weight: bold;
  font-size: 17px;
}
</style>