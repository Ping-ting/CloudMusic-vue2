<template>
  <div id="login-phone-container">
    <!-- 左上角半角二维码 -->
    <div id="halfQR-container">
      <el-tooltip
      class="item"
      effect="dark"
      content="扫码登录更安全"
      placement="right-start"
      :offset="-110"
      >
        <router-link to="/logincode">
          <el-image
          style="width: 50px; height: 50px;"
          :src="halfQRUrl"
          fit="contain"
          ></el-image>
        </router-link>
      </el-tooltip>
    </div>
    <!-- 图片 -->
    <div class="block" style="margin:20px 0">
      <el-image
      fit="cover"
      style="width: 70%;position: relation; left: 50%; transform: translateX(-50%)"
      :src="phoneImgUrl"
      >
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
      </el-image>
    </div>
    <!-- 输入框 -->
    <div id="form-container" style="margin:10px">
      <!-- <el-input placeholder="请输入手机号" v-model="phoneNumber" class="input-with-select">
        <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
      </el-input> -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" class="login-ruleFrom" style="margin:0 15px">
        <el-form-item label="" prop="phoneNumber">
          <el-input v-model="ruleForm.phoneNumber" placeholder="请输入手机号">
            <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
          </el-input>
          <el-button
          size="mini"
          class="getCodeButton"
          :disabled="attcode"
          v-if="showBtn"
          @click="getCode"
          >获取验证码</el-button>
          <el-button
          class="getCodeButton"
          plain
          disabled
          v-else
          >{{codeMsg}}</el-button>
        </el-form-item>
        <el-form-item label="" prop="phoneCode">
          <el-input v-model="ruleForm.phoneCode" placeholder="请输入验证码">
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="type" style="margin-top:-10px">
          <el-switch v-model="ruleForm.autoLogin" active-text="自动登录" ></el-switch>
        </el-form-item>
        <el-form-item style="margin-bottom:-20px">
          <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%;">登录</el-button>
          <router-link to="/register" class="other-way"> 注册 </router-link>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import { byCode, sendCode } from '@/api/LoginAndRegister/loginByPhone.js'

export default {
  data () {
    return {
      // 获取验证码按钮是否禁用
      attcode: true,
      // 获取验证码按钮是否展示
      showBtn: true,
      codeMsg: '获取验证码',
      // 倒计时
      codeSec: 60,
      halfQRUrl: require('@/assets/images/halfQR.png'),
      phoneImgUrl: require('@/assets/images/phoneImg.png'),
      ruleForm: {
        phoneNumber: '',
        phoneCode: '',
        autoLogin: false
      },
      rules: {
        phoneNumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '请正确填写您的手机号码', trigger: 'blur' }
        ],
        phoneCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^[0-9]{4}$/, message: '请填写有效的验证码', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    // 监听手机号 改变获取验证码按钮状态
    'ruleForm.phoneNumber': function (value) {
      const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      const val = reg.test(value)
      if (val) {
        this.attcode = false
      } else {
        this.attcode = true
      }
    },
    'ruleForm.phoneCode': async function (code) {
      if (code.length === 4) {
        // 自动请求并且登录
        const { data: byCodeData } = await byCode(this.ruleForm.phoneNumber, this.ruleForm.phoneCode)
        console.log(byCodeData)
        if (byCodeData.code === 200) {
          this.successLoginMsg()
          // 保存信息到 Vuex 跳转页面
        }
      }
    }
  },
  methods: {
    // 错误提示信息
    errorMsg () {
      this.$message({
        showClose: true,
        message: '电话或验证码错误！',
        type: 'error'
      })
    },
    // 短信发送成功提示信息
    successSendMsg () {
      this.$message({
        showClose: true,
        message: '短信发送成功！',
        type: 'success'
      })
    },
    // 登录成功提示信息
    successLoginMsg () {
      this.$message({
        showClose: true,
        message: '登录成功！',
        type: 'success'
      })
    },
    // 提交登录表单
    async submitForm (formName) {
      console.log(this.ruleForm.phoneNumber, this.ruleForm.phonePassword, this.ruleForm.autoLogin)
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 发送请求
          const byCodeData = await byCode(this.ruleForm.phoneNumber, this.ruleForm.phoneCode)
          if (byCodeData.code === 200) {
            this.successLoginMsg()
            // 保存信息到 Vuex 跳转页面
          } else {
            this.errorMsg()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 发送验证码
    async getCode () {
      // 调用 sendCode 发送验证码
      const sendCodeData = await sendCode(this.ruleForm.phoneNumber)
      if (sendCodeData.code !== 200) this.successSendMsg()
      // 修改页面样式
      const timer = setInterval(() => {
        this.codeSec = this.codeSec - 1
        this.codeMsg = this.codeSec + 's后重试'
        this.showBtn = false
        if (this.codeSec === 0) {
          clearInterval(timer)
          this.codeSec = 60
          this.showBtn = true
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
  #halfQR-container{
    position: absolute;
    top: 0;
    left: 0;
  }
  .el-select{
    width: 90px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .other-way{
    display: inline-block;
    margin: 10px 0 25px 0;
    width: 100%;
    text-align: center;
    padding-right: 0;
    font-size: 14px;
    line-height: 28px;
    color: rgba(0,0,0,0.80);
    text-decoration-line:underline;
  }
  .getCodeButton{
    box-sizing: border-box;
    position: absolute;
    height: 100%;
    right: 0;
    border-radius: 0;
  }
</style>
