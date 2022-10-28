import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/js/iconfontPC.js'
import './assets/js/iconfont.js'
import axios from 'axios'
axios.defaults.baseURL = '/api'
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
