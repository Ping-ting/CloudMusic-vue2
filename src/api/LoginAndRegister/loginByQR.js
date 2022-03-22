// 注册相关的 API 接口
import request from '@/utils/request.js'

// 每次请求都带上时间戳 timestamp 参数  防止缓存
// withCredentials 请求为跨域类型时是否在请求中协带cookie

// 获得 QR 的 key
export const getLoginQRKey = function () {
  return request.get('/login/qr/key', {
    params: {
      timestamp: new Date().getTime(),
      withCredentials: true
    }
  })
}

// 传入 key 生成二维码图片的 base64 和二维码信息
export const getLoginQR = function (key) {
  return request.get('/login/qr/create', {
    params: {
      key: key,
      qrimg: true,
      timestamp: new Date().getTime(),
      withCredentials: true
    }
  })
}

// 获取登录信息
export const getLoginStatus = function () {
  return request.get('/login/status', {
    params: {
      timestamp: new Date().getTime(),
      withCredentials: true
    }
  })
}

// 带上key 检查二维码是否过期
export const checkStatus = function (key) {
  return request.get('/login/qr/check', {
    params: {
      key: key,
      timestamp: new Date().getTime(),
      withCredentials: true
    }
  })
}
