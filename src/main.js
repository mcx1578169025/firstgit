import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入自己配置的axios
import http from './axios'
//引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.http = http;
Vue.prototype.$host = 'http://localhost:3000';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
