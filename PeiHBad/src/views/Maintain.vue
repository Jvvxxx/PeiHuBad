<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="姓名">
            <el-input v-model="formInline.user" size="mini" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系方式">
            <el-input v-model="formInline.iphone" size="mini" placeholder="请输入手机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="所属代理商">
            <el-select v-model="formInline.region" size="mini" placeholder="请选择">
              <el-option
                v-for="(item,i) in DaiLi"
                :key="i"
                :label="item.companyName"
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
    <el-row>
      <el-col :span="24">
        <Row>
          <i-col span="24">
            <Table border :columns="columns1" :data="data1"></Table>
            <div style="margin-top: 20px;height: 80px">
              <Page :total="total" show-sizer show-elevator  />
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
        iphone: "",
        region: ""
      },
      DaiLi: [],
       total: 27,
      totalPage: 3,
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          key: "messageId",
          width: 120,
          align: "center"
        },
        {
          title: "维护人员姓名",
          key: "content",
          align: "center",
          width: 220
        },
        {
          title: "联系电话",
          align: "center",
          key: "ctime",
          width: 190
        },
        {
          title: "所属代理商",
          align: "center",
          key: "ctime",
          width: 190
        },
        {
          title: "负责医院",
          align: "center",
          key: "ctime",
          width: 190
        },
        {
          title: "操作",
          key: "uses",
          align: "center",
          width: 324,
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
                      // var that = this;
                      // this.axios({
                      //   url:
                      //     "http://122.112.253.28:8095/prod-api/basedata/bclass/" +
                      //     that.userID,
                      //   method: "GET",
                      //   headers: {
                      //     Authorization: window.sessionStorage.token
                      //   }
                      // }).then(response => {
                      //   that.updateForm = response.data.data;
                      // });
                      // this.dialogVisible1 = true;
                      // // alert(this.dialogVisible1)
                      // this.userID = params.row.id;
                    }
                  }
                },

                "收件人列表"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",

                    size: "small"
                  },
                  style: {
                    marginLeft: "20px"
                  },
                  on: {
                    click: () => {
                      this.ID.messageId = params.row.messageId;
                      this.delClass(params.row.messageId);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
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
  },
  methods: {
    onSubmit() {},
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
    }
  }
};
</script>