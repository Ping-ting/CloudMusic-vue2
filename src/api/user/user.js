import request from '@/utils/request.js'

// 获取用户信息
export const getUserAccount = function (cookier) {
  return request.get('/user/account', {
    params: {
      cookie: cookier,
      timestamp: new Date().getTime(),
      withCredentials: true
    }
  })
}
