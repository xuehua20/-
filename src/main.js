import Vue from "vue"; //构造函数
import App from "./App.vue"; //app组件
import router from "./router"; //路由对象
import vant from "vant"; //引入插件
Vue.use(vant); //注册插件
import axios from "axios"; //导入ajax请求
Vue.prototype.$axios = axios; //需要绑定在原型上
axios.defaults.baseURL = "http://localhost:3000"; //配置接口地址哪里都能用
import Vant, { Toast } from "vant"; //引入vant axios错误拦截器
//生产坏境是否提示,就是上线的时候是否提示信息
Vue.config.productionTip = false;

axios.interceptors.response.use(
  //再返回报文里面进行的错误拦截
  res => {
    return res;
  },
  error => {
    // 如果请求返回的结果是错误的，会进入到错误的处理函数中
    // error是js原生的错误对象，我们可以用过error.response可以获取到详细的信息
    const { statusCode, message } = error.response.data;

    if (statusCode === 400) {
      Toast.fail(message);
    }

    return Promise.reject(error);
  }
);
//$mount("#app") 相当于el的配置.就是指定id为app的作为模板入口
new Vue({
  //路由对象
  router,
  //加载第一个子组件,最底层的组件,写法是固定的
  render: h => h(App)
}).$mount("#app");
