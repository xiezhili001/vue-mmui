import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './static/hot.js';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import  './static/animate.css';
Vue.config.productionTip = false;

// import component1 from './component/zl-header.vue';
// Vue.component('component1',component1)
// Vue.component('zl-header',{
//   template: header,
// })
// Vue.component('zl-header',{
//   template: "<h1>{{message}}</h1>",
//   data: function() {
//     return {
//       message: '我的时间'
//     }
//   }
// })
Vue.use(MintUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
