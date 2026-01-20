import Vue from 'vue'
import App from './App.vue'
import router from './router'
import dataV from '@jiaminghi/data-view';
import './assets/reset.css'
import axios from "@/axios";
Vue.prototype.$http = axios
// 引入echarts
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)
import VScaleScreen from 'v-scale-screen'
Vue.use(VScaleScreen)
// import "lib-flexible"
Vue.config.productionTip = false
Vue.use(dataV);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
