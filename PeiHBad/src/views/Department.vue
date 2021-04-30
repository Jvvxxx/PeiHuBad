<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="医院名称:">
            <el-input v-model="formInline.user" size="mini" placeholder="请输入医院名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="医院详细地址:">
            <el-input v-model="formInline.adder" size="mini" placeholder="请输入医院详细地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="科室:">
            <el-input v-model="formInline.admin" size="mini" placeholder="请输入科室"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="Select" size="mini" style="margin-top:7px;">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col :span="24">
        <Row>
          <i-col span="24">
            <Table border :columns="columns1" :data="data1"></Table>
            <div style="margin-top: 20px;height: 80px">
              <Page :total="total" show-sizer show-elevator />
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
        adder: "",
        admin: ""
      },
      total: 0,
      data1: [],
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          key: "hospitalId",
          width: 190,
          align: "center"
        },
        {
          title: "医院名称",
          key: "hospitalName",
          align: "center",
          width: 230
        },
        {
          title: "详细地址",
          align: "center",
          key: "address",
          width: 255
        },
        {
          title: "科室",
          align: "center",
          key: "deptName",
          width: 180
        },
        {
          title: "设备数量",
          align: "center",
          key: "deviceCount",
          width: 180
        },
        {
          title: "操作",
          key: "uses",
          align: "center",
          width: 180,
          render: (h, params) => {
            return h("div", [
              h(
                "i-button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginLeft: "20px"
                  },
                  on: {
                    click: () => {
                      ///basedata/bclass/150
                      //   var that = this;
                      //   this.axios({
                      //     url:
                      //       "http://122.112.253.28:8095/prod-api/basedata/bclass/" +
                      //       that.userID,
                      //     method: "GET",
                      //     headers: {
                      //       Authorization: window.sessionStorage.token
                      //     }
                      //   }).then(response => {
                      //     that.updateForm = response.data.data;
                      //   });
                      //   this.dialogVisible1 = true;
                      //   // alert(this.dialogVisible1)
                      //   this.userID = params.row.id;
                    }
                  }
                },

                "解绑"
              ),
              h(
                "i-button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginLeft: "20px"
                  },
                  on: {
                    click: () => {}
                  }
                },

                "删除"
              )
            ]);
          }
        }
      ],
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
    this.All();
  },
  methods: {
    Select() {
      this.axios({
        method: "GET",
        url: `http://122.112.253.28:8085/api/dept/admin/getDeptList?offset=1&limit=10&hospitalName=${this.formInline.user}&address=${this.formInline.adder}&deptName=${this.formInline.admin}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(response => {
        this.data1=response.data.data.records;
      });
    },
    All() {
      this.axios({
        method: "GET",
        url:
          "http://122.112.253.28:8085/api/dept/admin/getDeptList?offset=1&limit=10",
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(result => {
        console.log(result);
        this.data1 = result.data.data.records;
      });
    }
  }
};
</script>