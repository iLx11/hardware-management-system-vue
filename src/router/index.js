import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Admin from '../components/admin/Admin.vue'
import Register from '../components/Register'
import Control from '../components/admin/Control.vue'
import User from '../components/admin/User.vue'
import Hardware from '../components/admin/Hardware.vue'
import Chart from '../components/admin/Chart.vue'
import Mobile from '../components/mobile/Mobile.vue'
import Mcontrol from '../components/mobile/Mcontrol.vue'
import Mmqtt from '../components/mobile/Mmqtt.vue'
import Mmana from '../components/mobile/Mmana.vue'
import Muser from '../components/mobile/Muser.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/', component: Login
  },
  {
    path: '/login', component: Login
  },
  {
    path: '/register', component: Register
  },
  {
    path: '/admin', component: Admin, children: [
      {
        path: '/admin', redirect: '/admin/control',
      },
      {
        path: '/admin/control', component: Control
      },
      {
        path: '/admin/user', component: User
      },
      {
        path: '/admin/hardware', component: Hardware
      },
      {
        path: '/admin/chart', component: Chart
      }
    ]
  },
  {
    path: '/mobile', component: Mobile, children: [
      {
        path: '/mobile', redirect: '/mobile/control'
      },
      {
        path: '/mobile/control', component: Mcontrol
      },
      {
        path: '/mobile/mqtt', component: Mmqtt
      },
      {
        path: '/mobile/mana', component: Mmana
      },
      {
        path: '/mobile/user', component: Muser
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
