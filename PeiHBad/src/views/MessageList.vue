<template>
  <div>
    <el-row>
      <el-col :span="24" :offset="1" style="margin-top:15px; width:90%;">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-row style="width:100%">
            <el-col :span="6">
              <el-form-item label="关键字">
                <el-input v-model="formInline.username" size="mini" placeholder="请输入关键字"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button
                type="primary"
                size="mini"
                @click="Select"
                style="margin-left:-80px;margin-top:6px;"
              >查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
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
const Qs = require("qs");
export default {
  data() {
    return {
      formInline: {
        username: ""
      },
      data1: [],
      pageNum: 1,
      pageSize: 10,
      total: 27,
      ID: {
        messageId: ""
      },
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
          width: 220,
          align: "center"
        },
        {
          title: "信息内容",
          key: "content",
          align: "center",
          width: 320
        },
        {
          title: "发送日期",
          align: "center",
          key: "ctime",
          width: 290
        },
        {
          title: "操作",
          key: "uses",
          align: "center",
          width: 380,
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
                    click: () => {}
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
    this.All();
  },
  methods: {
    All() {
      this.axios({
        method: "GET",
        url:
          "http://122.112.253.28:8085/api/sms-message/admin/getSendMessageList?offset=1&limit=10",
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(result => {
        console.log(result);
        this.data1 = result.data.data.records;
      });
    },
    change(pageIndex) {
      var that = this;
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/sms-message/admin/getSendMessageList?offset=${pageIndex}&limit=${that.pageSize}`,
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
    Select() {
      this.axios({
        method: "GET",
        url: `http://122.112.253.28:8085/api/sms-message/admin/getSendMessageList?offset=1&limit=10&content=${this.formInline.username}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(selectData => {
        console.log(selectData);
        this.data1 = selectData.data.data.records;
      });
    },
    delClass(id) {
      console.log(id);
      var delId = Qs.stringify(this.ID);
      this.$confirm("确定删除'" + id + "'该消息吗？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.axios({
            method: "POST",
            url: "http://122.112.253.28:8085/api/sms-message/admin/delMessage",
            data: delId,
            headers: {
              Authorization: window.sessionStorage.token
            }
          }).then(delData => {
            console.log(delData);
            this.All();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style>
.el-button--mini,
.el-button--mini.is-round {
  padding: 7px 15px;
  margin-left: -10px !important;
  margin-top: 7px !important;
}
</style>