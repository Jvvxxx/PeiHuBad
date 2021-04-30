<template>
  <div class="Nag">
    <el-row>
      <el-col :span="1">
        <el-button
          @click="dialogVisible = true"
          style="margin-bottom:10px"
          size="mini"
          type="primary"
          icon="el-icon-plus"
        >新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="roleName" label="角色昵称"></el-table-column>
          <el-table-column prop="roleNote" label="角色描述"></el-table-column>
          <el-table-column label="权限">
            <template>
              <div>
                <el-button type="info" size="mini">绑定权限</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <div>
                <!-- <i icon="el-icon-time"></i> -->
                {{scope.row.ctime}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" show-overflow-tooltip  width="180">
            <template slot-scope="scope">
              <div>
                <el-button
                  size="mini"
                  icon="el-icon-edit"
                  type="primary"
                  @click="upe(scope.row.id,scope.row.roleName,scope.row.roleNote)"
                >编辑</el-button>
                <el-button
                  size="mini"
                  icon="el-icon-delete"
                  type="danger"
                  @click="del(scope.row.id)"
                >删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
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
    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="dialogVisible2" width="50%">
      <span class="onw">
        <p>
          <span>角色名称:</span>
          <el-input v-model="name3" size="mini"></el-input>
        </p>
        <p>
          <span>角色描述:</span>
          <el-input v-model="name4" size="mini"></el-input>
        </p>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="ddd">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加 -->
    <el-dialog title="新增" :visible.sync="dialogVisible" width="50%">
      <span class="onw">
        <p>
          <span>角色名称:</span>
          <el-input v-model="name" size="mini"></el-input>
        </p>
        <p>
          <span>角色描述:</span>
          <el-input v-model="name2" size="mini"></el-input>
        </p>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ddd2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
const Qs = require("qs");
export default {
  component: {
    moment
  },
  name: "Nag",
  data() {
    return {
      dialogVisible2: false,
      name: "",
      total: 1,
      size: 0,
      currentPage4: 1,
      name2: "",
      name3: "",
      name4: "",
      idd: "",
      dialogVisible: false,
      tableData: []
    };
  },
  created() {
    //查询全部 和收入
    this.axios({
      method: "GET",
      url: "http://122.112.253.28:8085/api/role/admin/list?offset=1&limit=10",
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
    handleSizeChange(val) {
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/role/admin/list?offset=1&limit=${val}`,
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
        url: `http://122.112.253.28:8085/api/role/admin/list?offset=${val}&limit=10`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.total = relt.data.data.total;
        this.size = relt.data.data.size;
        this.tableData = relt.data.data.records;
      });
    },
    ddd2() {
      const data = Qs.stringify({
        roleName: this.name,
        roleNote: this.name2
      });
      this.dialogVisible = false;
      this.axios({
        method: "POST",
        url: "http://122.112.253.28:8085/api/role/admin/set",
        headers: {
          Authorization: window.sessionStorage.token
        },
        data: data
      }).then(() => {
        this.axios({
          method: "GET",
          url:
            "http://122.112.253.28:8085/api/role/admin/list?offset=1&limit=10",
          headers: {
            Authorization: window.sessionStorage.token
          }
        }).then(relt => {
            
          this.tableData = relt.data.data.records;
        });
        (this.name = ""), (this.name2 = "");
      });
    },
    upe(id, qq, cc) {
      this.dialogVisible2 = true;
      this.idd = id;
      this.name3 = qq;

      this.name4 = cc;
    },
    ddd() {
      const data = Qs.stringify({
        id: this.idd,
        roleName: this.name3,
        roleNote: this.name4
      });
      this.dialogVisible2 = false;
      this.axios({
        method: "POST",
        url: "http://122.112.253.28:8085/api/role/admin/set",
        headers: {
          Authorization: window.sessionStorage.token
        },
        data: data
      }).then(() => {
        this.axios({
          method: "GET",
          url:
            "http://122.112.253.28:8085/api/role/admin/list?offset=1&limit=10",
          headers: {
            Authorization: window.sessionStorage.token
          }
        }).then(relt => {
          this.tableData = relt.data.data.records;
        });
      });
    },

    del(id) {
      this.$confirm("确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            method: "DELETE",
            url: " http://122.112.253.28:8085/api/role/admin/del?key=" + id,
            headers: {
              Authorization: window.sessionStorage.token
            }
          }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            //查询全部
            this.axios({
              method: "GET",
              url:
                "http://122.112.253.28:8085/api/role/admin/list?offset=1&limit=10",
              headers: {
                Authorization: window.sessionStorage.token
              }
            }).then(relt => {
              this.tableData = relt.data.data.records;
            });
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
<style >
.Nag .el-table th.is-leaf {
  background: #f8f8f9;
}
.Nag .el-form--inline .el-form-item {
  display: flex;
  margin-right: 10px;
}
.Nag .el-table td,
.Nag .el-table th {
  font-size: 12px;
  padding: 5px;
  border: 1px solid #f8f8f9;
  text-align: center;
}
.Nag .el-table .cell {
  white-space: nowrap;
}
.Nag .el-card.is-always-shadow:hover {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.Nag .el-card.is-always-shadow {
  box-shadow: none;
}
</style>
<style scope>
.onw p input {
  margin: 10px 0;
}
.block {
  margin-top: 10px;
  text-align: center;
}
</style>