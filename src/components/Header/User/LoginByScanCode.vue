<template>
  <div id="login-code-container">
    <p class="title">扫码登录</p>
    <div class="main-outer">
      <div class="left-img-outer">
        <img id="left-img" src="@/assets/images/left-img.png">
      </div>
      <div class="right-code-outer">
        <img id="right-code" src="@/assets/images/code.png" >
        <p>使用<a href="https://music.163.com/#/download">网易云音乐APP</a>扫码登录</p>
      </div>
    </div>
    <router-link to="/loginphone" class="other-way">选择其他登录模式 ></router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
#login-code-container .title{
  margin-top: 30px;
  font-size: 28px;
  text-align: center;
  color: #3c3c3c;
}
#login-code-container .other-way{
  display: inline-block;
  margin: 30px 0 25px 0;
  width: 100%;
  text-align: center;
  padding-right: 0;
  font-size: 12px;
  line-height: 28px;
  color: rgba(0,0,0,0.80);
  text-decoration: none;
}
#login-code-container .other-way:hover{
  text-decoration: #3c3c3c;
}
#login-code-container .main-outer{
  height: 250px;
  margin-top: 40px;
  background-color: rgb(209, 169, 169);
}
.left-img-outer,.right-code-outer{
  display: inline-block;
  width: 45%;
}
.left-img-outer{
  background-color: rgb(174, 218, 138);
}
.right-code-outer{
  float: right;
  padding: 20px 0;
  background-color: rgb(218, 210, 147);
}
.right-code-outer>p{
  text-align: center;
  line-height: 20px;
}
.right-code-outer a{
  text-decoration: none;
  color: #0c73c2;
}
#left-img{
  width: 100%;
}
#right-code{
  width: 100%;
  height: 135px;
  background-color: rgb(238, 234, 175);
  margin: 10px 0;
}
</style>
