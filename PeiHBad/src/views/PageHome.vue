<template>
  <div>
    <el-row>
      <el-col :span="24">
        <ul class="shouruul">
          <li>
            <div class="shourudiv">
              <p>累计总收入（元）</p>
              <p>{{ ShouruList.totalShare }}</p>
            </div>
          </li>
          <li>
            <div class="shourudiv">
              <p>平台累计分成（元）</p>
              <p>{{ ShouruList.totalTransactionAmount }}</p>
            </div>
          </li>
          <li>
            <div class="shourudiv">
              <p>平台服务费（元）</p>
              <p>{{ ShouruList.totalServiceShare }}</p>
            </div>
          </li>
          <li>
            <div class="shourudiv">
              <p>设备总数（台）</p>
              <p>{{ ShouruList.deviceCount }}</p>
            </div>
          </li>
          <li>
            <div class="shourudiv">
              <p>会员总数量</p>
              <p>{{ ShouruList.totalUsers }}</p>
            </div>
          </li>
          <li>
            <div class="shourudiv">
              <p>累计交易总额（元）</p>
              <p>{{ ShouruList.totalTransactionAmount }}</p>
            </div>
          </li>
          <li>
            <div class="shourudiv">
              <p>故障设备（台）</p>
              <p>{{ ShouruList.faultDeviceCount }}</p>
            </div>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div id="pp">
          <p>
            <strong>平台交易额概览</strong>
            <br />
            <span style="color:gray;">金额</span>
          </p>
        </div>
        <div id="main"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div id="pp">
          <p>
            <strong>陪护床收入概览</strong>
            <br />
            <span style="color:gray;">金额</span>
          </p>
        </div>
        <div id="main1"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div id="pp">
          <p>
            <strong>商品收入概览</strong>
            <br />
            <span style="color:gray;">金额</span>
          </p>
        </div>
        <div id="main2"></div>
      </el-col>
    </el-row>
  </div>
</template>
<style>
.shouruul > li {
  width: 350px;
  margin-left: 60px;
  border: 1px solid #ebeef5;
  border-radius: 10px;
  display: inline-block;
  margin-top: 30px;
}
.shouruul > li:hover {
  box-shadow: 2px 2px 10px 2px #ebeef5;
}
.shouruul {
  width: 100%;
}
.shourudiv > p {
  width: 94.5%;
  padding: 15px 10px;
}
.shourudiv > p:nth-of-type(1) {
  border-bottom: 1px solid #ebeef5;
}
#main {
  width: 90%;
  height: 300px;
  margin: -100px auto;
}
#main1 {
  width: 90%;
  height: 300px;
  margin: -100px auto;
}
#main2 {
  width: 90%;
  height: 300px;
  margin: -100px auto;
}
#pp {
  width: 50%;
  margin: 100px auto;
  text-align: center;
}
#main:hover {
  box-shadow: 2px 2px 10px 2px #ebeef5;
}
#main1:hover {
  box-shadow: 2px 2px 10px 2px #ebeef5;
}
#main2:hover {
  box-shadow: 2px 2px 10px 2px #ebeef5;
}
</style>
<script>
import * as echarts from "echarts";
let url = "http://122.112.253.28:8085";
export default {
  data() {
    return {
      ShouruList: {}
    };
  },
  mounted() {
    this.Shouru();
    this.drawLine();
    this.drawLine1();
    this.drawLine2();
  },
  methods: {
    Shouru() {
      this.axios({
        mounted: "GET",
        url: url + "/api/index/admin/getIndexData",
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(result => {
        console.log(result);
        this.ShouruList = result.data.data;
      });
    },
    drawLine() {
      var myChart = echarts.init(document.getElementById("main"));
      var option = {
        xAxis: {
          type: "category"
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            type: "bar"
          }
        ]
      };

      option && myChart.setOption(option);
    },
    drawLine1() {
      var myChart = echarts.init(document.getElementById("main1"));
      var option = {
        xAxis: {
          type: "category"
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            type: "bar"
          }
        ]
      };

      option && myChart.setOption(option);
    },
    drawLine2() {
      var myChart = echarts.init(document.getElementById("main2"));
      var option = {
        xAxis: {
          type: "category"
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            type: "bar"
          }
        ]
      };

      option && myChart.setOption(option);
    }
  }
};
</script>