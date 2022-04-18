<template>
  <div id="header-right-container">
    <div class="user-header-outer" v-if="isLogin === false">
      <el-avatar class="avatar"  icon="el-icon-user-solid" :size="'medium'" ></el-avatar>
      <el-button class="noLogin" type="text" @click="loginVisible = true">
        <router-link class="noLoginA" to="/logincode">未登录 </router-link>
        <i class="el-icon-caret-bottom"></i>
      </el-button>
      <el-dialog
      center
      width="350px"
      :visible.sync="loginVisible"
      :append-to-body='true'
      :lock-scroll="true"
      :before-close='beforeClose()'
      >
        <router-view
        :loginVisible="loginVisible"
        ></router-view>
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
  },
  methods: {
    beforeClose () {

    }
  },
  // 监听路由变化
  // 当路由从 /logincode 跳转到 /loginphone 或/register 将loginVisible变成 false
  watch: {
    '$route' (to, from) {
      console.log(from.path)
      // 下面的数据传送到子组件会有延迟
      // if (from.path === '/logincode') {
      //   console.log('从扫码页跳转出去了')
      //   this.codeVisible = false
      // }
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
.user-header-outer>.avatar{
  margin-top: 10px;
  vertical-align: -10px;
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
