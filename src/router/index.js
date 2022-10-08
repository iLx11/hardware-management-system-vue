import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Admin from '../components/admin/Admin.vue'
import Register from '../components/Register'
import Control from '../components/admin/Control.vue'
import User from '../components/admin/User.vue'
import Hardware from '../components/admin/Hardware.vue'
import Chart from '../components/admin/Chart.vue'

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
          path: '/admin/', conponent: Control,
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
    }
]

const router = new VueRouter({
  routes
})

export default router
