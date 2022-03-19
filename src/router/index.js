import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import LoginByScanCode from '@/components/Header/User/LoginByScanCode.vue'
import LoginByPhoneNumber from '@/components/Header/User/LoginByPhoneNumber.vue'
import RegisterByPhoneNumber from '@/components/Header/User/RegisterByPhoneNumber.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/logincode',
    component: LoginByScanCode
  },
  {
    path: '/loginphone',
    component: LoginByPhoneNumber
  },
  {
    path: '/register',
    component: RegisterByPhoneNumber
  }
]

const router = new VueRouter({
  routes
})

export default router
