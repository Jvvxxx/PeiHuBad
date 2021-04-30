<template>
  <div id="Login">
    <el-row>
      <el-col :span="24" class="Iq">
        <div class="zDiv">
          <p>登录</p>
          <el-form :model="ruleForm " ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="userAccount" :rules="[
      { required: true, message: '用户不能为空'}]">
              <el-input
                placeholder="用户"
                prefix-icon="el-icon-user-solid"
                v-model="ruleForm.userAccount"
              ></el-input>
            </el-form-item>
            <el-form-item prop="passWord" :rules="[
      { required: true, message: '密码不能为空'}]">
              <el-input
                type="password"
                placeholder="密码"
                prefix-icon="el-icon-lock"
                v-model="ruleForm.passWord"
                show-password
              ></el-input>
            </el-form-item>

            <el-checkbox v-model="checked" class="niq">保持登录状态</el-checkbox>
            <el-form-item>
              <el-button
                type="button"
                style="width:100%;background: #1890FF;border: 1px solid #1890FF;color:#fff;"
                @click="submitForm('ruleForm')"
              >登 录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
let url = "http://122.112.253.28:8085";
const Qs = require("qs");
export default {
  name: "Login",
  data() {
    return {
      checked: "",
      ruleForm: {
        userAccount: "",
        passWord: ""
      }
    };
  },
  created() {},
  methods: {
    submitForm(formName) {
      var data = Qs.stringify(this.ruleForm);
      console.log(data);
      this.axios({
        method: "POST",
        url: url + "/api/manager/admin/login",
        data: data
      }).then(ruselt => {
        console.log(ruselt);
        if (this.ruleForm.userAccount == "") {
          this.$message.error({
            message: "用户名不能为空!",
            type: "warning"
          });
        } else if (this.ruleForm.passWord == "") {
          this.$message.error({
            message: "密码不能为空!",
            type: "warning"
          });
        }else if(ruselt.data.data==null){
            var Ztai=ruselt.data.msg
            this.$message.error({
            message: Ztai,
            type: "warning"
          });
        } else {
          this.$message({
            message: "登录成功",
            type: "success"
          });
          window.sessionStorage.setItem("token",ruselt.data.data.token);
          this.$router.push('/page')
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.niq {
  margin-bottom: 10px;
}
.iMg {
  height: 40px;
  width: 105px;
}
.Iq {
  display: flex;
  height: 100vh;
}
.zDiv > p {
  font-weight: bold;
  font-size: 20px;
  margin: 0 auto 30px auto;
  text-align: center;
  color: black;
}
.zDiv {
  margin: auto;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.507);
  width: 350px;
  padding: 25px 25px 5px 25px;
}
#Login {
  background: url("../assets/cat.jpg") no-repeat;
  background-size: 100%;
}
</style>
