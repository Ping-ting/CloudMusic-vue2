// 通过电话号码登录相关的 API 接口
import request from '@/utils/request.js'
const qs = require('qs')

// 每次请求都带上时间戳 timestamp 参数  防止缓存
// withCredentials 请求为跨域类型时是否在请求中协带cookie
export const byPassword = function (phone, password) {
  return request.post('/login/cellphone', qs.stringify({
    phone: phone,
    password: password,
    timestamp: new Date().getTime()
  }))
}

// 发送短信验证码
export const sendCode = function (phone) {
  return request.get('/captcha/sent', {
    params: {
      phone: phone,
      timestamp: new Date().getTime()
    }
  })
}

// 验证短信验证码
export const byCode = function (phone, captcha) {
  return request.post('/captcha/verify', qs.stringify({
    phone: phone,
    captcha: captcha,
    timestamp: new Date().getTime()
  }))
}
