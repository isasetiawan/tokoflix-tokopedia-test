import Vue from 'vue'
import App from './App.vue'
// import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // Buefy,
  render: h => h(App)
}).$mount('#app')
