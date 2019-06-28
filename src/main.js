import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'
import { router } from './router'
import {requestInterceptor, responseInterceptor} from './helpers/api'

requestInterceptor();
responseInterceptor();

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
