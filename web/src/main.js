import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "element-ui/lib/theme-chalk/index.css";// 默认主题
import ElementUI from "element-ui";
import axios from "./axios.js";
import 'font-awesome/css/font-awesome.css';
import "./components/icon/font/iconfont.css";
import session from "./components/tools/untils.js";
import router from "./router.js";
import loadsh from "lodash";
Vue.prototype.$http = axios;
Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };
Vue.use(ElementUI);
Vue.config.productionTip = false;
window.session = session;
window._ = loadsh;
window.bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#application");
