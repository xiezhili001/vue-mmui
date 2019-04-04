import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './static/hot.js';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import  './static/animate.css';
Vue.config.productionTip = false;
Vue.use(MintUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
