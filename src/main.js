import Vue from "vue"; //构造函数
import App from "./App.vue"; //app组件
import router from "./router"; //路由对象
import vant from "vant"; //引入插件
Vue.use(vant); //注册插件
import axios from "axios"; //导入ajax请求
Vue.prototype.$axios = axios; //需要绑定在原型上
axios.defaults.baseURL = "http://localhost:3000"; //配置接口地址哪里都能用

//生产坏境是否提示,就是上线的时候是否提示信息
Vue.config.productionTip = false;
//$mount("#app") 相当于el的配置.就是指定id为app的作为模板入口
new Vue({
  //路由对象
  router,
  //加载第一个子组件,最底层的组件,写法是固定的
  render: h => h(App)
}).$mount("#app");
