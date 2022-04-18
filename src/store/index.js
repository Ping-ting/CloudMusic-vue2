import Vue from 'vue'
import Vuex from 'vuex'
import loginInfoOptions from './loginInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loginInfoAbout: loginInfoOptions
  }
})
