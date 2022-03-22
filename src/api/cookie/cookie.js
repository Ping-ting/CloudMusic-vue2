const cookie = {
  /*
  设置cookie方法
  @param key{string} cookie名称
  @param val{string} cookie值
  @param hours{number} 过期时间（小时）
  */
  set: function (key, val, hours) {
    // 获取当前时间
    const date = new Date()
    // 将date设置为n小时以后的时间
    const expiresHours = parseInt(hours)
    // 格式化为cookie识别的时间
    date.setTime(date.getTime() + expiresHours * 24 * 3600 * 1000)
    // 设置cookie
    document.cookie = key + '=' + val + ';expires=' + date.toGMTString()
  },
  /*
  移除cookie方法
  @param key{string} cookie名称
  */
  remove: function (key) {
    this.set(key, '', 0)
  },
  /*
  获取cookie方法
  @param key{string} cookie名称
  @returns {string} 对应名称的cookie值
  */
  get: function (key) {
    // 获取cookie方法
    const getCookie = document.cookie.replace(/[ ]/g, '')
    const arrCookie = getCookie.split(';')
    let tips = ''
    // eslint-disable-next-line no-unreachable-loop
    for (let i = 0; i < arrCookie.length; i++) {
      const arr = arrCookie[i].split('=')
      if (key === arr[0]) {
        tips = arr[1]
        break
      }
      return tips
    }
  }
}

export default cookie
