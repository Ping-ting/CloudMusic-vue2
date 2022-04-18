// user 相关配置
const loginInfoOptions = {
  namespaced: true,
  actions: {
    loginUpdate (context, value) {
      context.commit('LOGIN_UPDATE', value)
    }
  },
  mutations: {
    LOGIN_UPDATE (state, value) {
      // 更新 state中的 isLogin  account profile
      console.log('调用了LOGIN_UPDATE，value：', value)
      state.isLogin = true
      state.account = Object.assign(value.account)
      state.profile = Object.profile(value.account)
    }
  },
  state: {
    isLogin: false,
    account: {},
    profile: {}
  }
}
export default loginInfoOptions
