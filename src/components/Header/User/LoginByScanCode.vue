<template>
  <div id="login-code-container">
    <p class="title">扫码登录</p>
    <div class="main-outer">
      <div class="left-img-outer">
        <img id="left-img" src="@/assets/images/left-img.png">
      </div>
      <div class="right-code-outer">
        <div id="right-code">
          <img :src="QRBase64">
          <div class="code-invalid" v-if="codeIsValid === false">
            <p>二维码已失效</p>
            <h5><el-button type="primary" size="mini" @click="afreshGetQR()">点击刷新</el-button></h5>
          </div>
          <div class="code-loading" v-if="codeIsLoading === true">
            <p><i class="el-icon-loading"></i></p>
            <p>登录中...... </p>
          </div>
        </div>
        <p>使用<a href="https://music.163.com/#/download">PT音乐</a>APP版本扫码登录</p>
      </div>
    </div>
    <router-link to="/loginphone" class="other-way">选择其他登录模式 ></router-link>
  </div>
</template>

<script>
// 导入获取 key 和 QR 的 API
import { getLoginQRKey, getLoginQR, getLoginStatus, checkStatus } from '@/api/LoginAndRegister/loginByQR.js'

export default {
  props: {
    // 登录弹框是否存在
    loginVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    // 当前是否在扫描二维码页面
      codeVisible: true,
      codeIsValid: true,
      codeIsLoading: false,
      QRkey: '',
      QRBase64: '',
      cookier: ''
    }
  },
  methods: {
    // 登录成功提示信息
    successLoginMsg () {
      this.$message({
        showClose: true,
        message: '登录成功！',
        type: 'success'
      })
    },
    // 获取登录二维码
    async getLoginQRImg () {
      // 获取 key
      const { data: dataKeyObj } = await getLoginQRKey()
      const keyObj = dataKeyObj.data
      this.QRkey = keyObj.unikey
      console.log('二维码的key:', keyObj.unikey)

      // 获取 二维码
      const { data: dataQRObj } = await getLoginQR(this.QRkey)
      const QRObj = dataQRObj.data
      this.QRBase64 = QRObj.qrimg
      console.log('二维码base64格式:', QRObj.qrimg)

      // 循环判断二维码是否过期  是否已经登录
      const timer = setInterval(async () => {
        // loginVisible 为 true 时定时器才有效
        // 当 dialog 被删除时 定时器被消除
        if (this.loginVisible === false) {
          clearInterval(timer)
          console.log('弹框不在')
        }
        console.log('this.codeVisible:', this.codeVisible)
        if (this.codeVisible === false) {
          clearInterval(timer)
          console.log('不在扫码页')
        }
        const { data: keyStatus } = await checkStatus(this.QRkey)
        console.log(keyStatus)
        if (keyStatus.code === 800) {
          // 二维码过期
          console.log('二维码已失效')
          this.codeIsLoading = false
          clearInterval(timer)
          this.codeIsValid = false
        } else if (keyStatus.code === 802) {
          // 授权登录中
          console.log('授权登录中...')
          this.codeIsLoading = true
        } else if (keyStatus.code === 803) {
          this.codeIsLoading = false
          // 登录成功 会返回 cookie
          console.log('登录成功')
          clearInterval(timer)
          this.successLoginMsg()
          const { data: loginStatus } = await getLoginStatus()
          console.log(loginStatus)
        }
      }, 3000)
    },
    // 重新获取二维码
    afreshGetQR () {
      console.log('重新获取二维码')
      this.getLoginQRImg()
      this.codeIsValid = true
    }
  },
  created () {
    this.getLoginQRImg()
    // ----------------以下无效------------
    // 组件被创建的时候 监听 window 对象的 onhashchange 事件
    // 当前不在 /logincode
    // window.onhashchange = () => {
    //   console.log('hash变化')
    //   if (location.hash !== '/logincode') {
    //     this.codeVisible = false
    //   }
    // }
  },
  beforeDestroy () {
    // 当前组件被销毁之前 将codeVisible设置为false 用于消除定时器
    this.codeVisible = false
  }
}
</script>

<style lang="less" scoped>
// 扫码登录 标题
#login-code-container .title{
  margin-top: 30px;
  font-size: 28px;
  text-align: center;
  color: #3c3c3c;
}
// 选择其他登录模式 样式
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
// 选择其他登录模式hover 样式
#login-code-container .other-way:hover{
  text-decoration-line:underline;
}
// 中间主体扫码样式
#login-code-container .main-outer{
  height: 250px;
  margin-top: 40px;
  // background-color: rgb(209, 169, 169);
}
// 左边图片外框 右边二维码外框
.left-img-outer,.right-code-outer{
  display: inline-block;
  width: 45%;
}
.left-img-outer{
  // background-color: rgb(174, 218, 138);
}
.right-code-outer{
  float: right;
  padding: 20px 0;
  // background-color: rgb(218, 210, 147);
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
  // background-color: rgb(238, 234, 175);
  margin: 10px 0;
  position: relative;
}
#right-code img{
  width: 100%;
}
#right-code .code-invalid{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: rgba(5, 5, 5, 0.7);
}

.code-invalid p{
  text-align: center;
  color: #fff;
  font-size: 14px;
  margin: 30% 0 10%;
}
.code-invalid h5{
  text-align: center;
}
#right-code .code-loading{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: rgba(253, 253, 253, 0.9);
}
.code-loading i{
  margin-top: 35%;
  font-size: 20px;
}
.code-loading p{
  line-height: 20px;
  text-align: center;
  color: #3c3c3c;
}
</style>
