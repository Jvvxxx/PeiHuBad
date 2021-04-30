<template>
  <div class="bibox">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-submenu :index="key+''" v-for="(item,key) in list" :key="key">
        <template slot="title">
          <i class="el-icon-s-unfold"></i>
          <span slot="title">{{ item.interfaceName }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="key + '-' + key2+1"
            v-for="(item2,key2) in item.menuList"
            :key="key2"
          >
            <router-link :to="routes[key-1][key2]+''">
              <i class="el-icon-paperclip"></i>
              {{ item2.interfaceName }}
            </router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <div class="top">
      <div class="GuanLi">
        <div class="wnqo">
          <el-breadcrumb separator="/" class="dQo">
            <el-breadcrumb-item>
              <el-radio-group v-model="isCollapse">
                <el-radio-button :label="false" v-show="isCollapse">
                  <i class="el-icon-s-unfold"></i>
                </el-radio-button>
                <el-radio-button :label="true" v-show="!isCollapse">
                  <i class="el-icon-s-fold"></i>
                </el-radio-button>
              </el-radio-group>
              <span class="souyespan">首页</span>
              <div class="Nd">
                <i class="el-icon-search"></i>
                <i class="el-icon-full-screen"></i>
                <img class="touxiang" src="@/assets/56.jpg" width="40px" />
              </div>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// var pathLY=[{userlist},{messagelist},{maintain},{logistics}]
let url = "http://122.112.253.28:8085";
export default {
  data() {
    return {
      isCollapse: false,
      list: [],
      erList: [],
      routes: [
        [
          "/page/userlist",
          "/page/messagelist",
          "/a3",
          "/page/maintain",
          "/page/logistics"
        ],
        ["/page/hospitallist", "/page/department", "/b3", "/b3"],
        [
          "/page/devicelist",
          "/b2",
          "/b3",
          "/page/devicegood",
          "/page/deviceswitch",
          "/page/devicereplenish"
        ],
        ["/page/bedorder", "/page/ordercommodity", "/b3"],
        [
          "/page/financelist",
          "/page/financeshare",
          "/b3",
          "/page/financeagentorder"
        ],
        ["/b1", "/b2", "/b3"],
        ["/page/feedbackfault", "/page/feedbacklist", "/page/feedbackback"],
        ["/page/businesslist"],
        ["/b1", "/page/manager","/page/role"],
        ["/b1", "/page/course", "/page/demo", "/page/about","/page/question"],
        ["/b1", "/b2", "/b3", "/b3", "/b3", "/b3"],
        ["/b1", "/b2"]
      ]
    };
  },
  mounted() {
    let that = this;
    this.axios({
      url: url + "/api/manager/admin/listForMenu?managerId=MA000000000000001",
      method: "get",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(response => {
      console.log(response);
      for (let i = 0; i < response.data.data.length; i++) {
        if (response.data.data[i].isContain == 1) {
          that.list.push(response.data.data[i]);
        } else {
        }
      }
    });
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style scoped>
.bibox {
  display: flex;
  flex-flow: row;
}
.touxiang {
  border-radius: 30px;
}
.logoimg {
  width: 30px;
  height: 30px;
}
.top {
  /* position: absolute;
  top: 0;
  left: 64px;
  padding: 15px 10px;
  box-shadow: 0px 0px 20px #f3f4f5;
  width: 93.8%;
  display: flex; */
}

.el-icon-s-fold {
  color: #404040;
}
.pagehome {
  margin-left: 10px;
  color: #97a8be;
  font-size: 14px;
}

.GuanLi {
  position: absolute;
  overflow: scroll;
  height: 100vh;
  width: 84.6%;
}
.Nd {
  position: absolute;
  right: 10px;
  top: 5px;
  text-align: right;
}

.Nd img {
  vertical-align: middle;
}
.Nd i {
  margin: 0 5px;
}
.dQo i {
  font-size: 20px;
}
.dQo {
  position: relative;
  padding: 5px 0;
  box-shadow: 0 -2px 5px 3px #f2f4f4;
}
.dQo span {
  color: #97a8be;
}
.dQo span,
.dQo i {
  vertical-align: middle;
}
.na {
  display: flex;
}
.dQo {
  width: 1124px;
}
.souyespan {
  font-weight: bold;
  margin-left: 10px;
}
</style>
<style>
.el-menu {
  border-right: solid 1px #e6e6e6;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: #191a1f !important;
}
.el-submenu .el-menu-item {
  height: 50px;
  line-height: 50px;
  padding: 0 45px;
  min-width: 200px;
  color: #bfcbd9;
}
.el-menu-item-group > ul {
  padding: 0;
  background: #191a1f;
  margin-top: -10px;
}
.el-submenu__title * {
  vertical-align: middle;
  color: #bfcbd9;
}
.el-menu--collapse {
  width: 64px;
  background: #304156;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  background: #304156;
  overflow: scroll;
}
.el-menu-item * {
  vertical-align: middle;
  color: #bfcbd9;
}
.el-menu--popup-right-start {
  margin-left: 5px;
  margin-right: 5px;
  background: #304156;
  color: #bfcbd9;
}
.el-menu-item {
  font-size: 14px;
  color: #303133;
  padding: 0 20px;
  cursor: pointer;
  -webkit-transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #bfcbd9;
}
.el-menu-item-group__title {
  padding: 0 0 7px 20px;
  line-height: normal;
  font-size: 12px;
  color: #909399;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  background: #304156;
  height: 100vh;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu--collapse {
  width: 64px;
  height: 100vh;
  background: #304156;
}
</style>