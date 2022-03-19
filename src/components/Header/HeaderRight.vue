<template>
  <div id="header-right-container">
    <div class="user-header-outer" v-if="isLogin === false">
      <i class="el-icon-user"></i>
      <el-button class="noLogin" type="text" @click="loginVisible = true">
        <router-link class="noLoginA" to="/logincode">未登录 </router-link>
        <i class="el-icon-caret-bottom"></i>
      </el-button>
      <el-dialog :visible.sync="loginVisible" center :append-to-body='true' :lock-scroll="false" width="350px">
        <router-view></router-view>
      </el-dialog>
    </div>
    <span class="other-outer">
      <i class="el-icon-watermelon" title="换肤"></i>
      <i class="el-icon-setting" title="设置"></i>
      <i class="el-icon-message" title="私信"></i>
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLogin: false,
      loginVisible: false
    }
  }
}
</script>

<style lang="less" scoped>
.noLogin{
  color: #c8f0e9;
  margin-left: 10px;
}
.noLoginA{
  color: #c8f0e9;
  text-decoration: none;
}
.noLogin:hover{
  color: #e9f3f1;
}
.other-outer>i{
  // line-height: 60px;
  color: #c8f0e9;
  margin-right: 15px;
  cursor: pointer;
  font-size: 18px;
}
#header-right-container{
  width: 250px;
  height: 100%;
  position: absolute;
  right: 0px;
}
.user-header-outer{
  line-height: 60px;
  display: inline-block;
  width: 50%;
}
.user-header-outer>i{
  border: 1px solid #c8f0e9;
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #d4d4d4;
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  color: rgb(248, 248, 248);
}
.el-dropdown-link {
    cursor: pointer;
    color: #f0f0f0;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #e4e4e4;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
