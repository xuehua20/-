import Vue from "vue"; //构造函数
import App from "./App.vue"; //app组件
import router from "./router"; //路由对象
//生产坏境是否提示,就是上线的时候是否提示信息
Vue.config.productionTip = false;
//$mount("#app") 相当于el的配置.就是指定id为app的作为模板入口
new Vue({
  //路由对象
  router,
  //加载第一个子组件,最底层的组件,写法是固定的
  render: h => h(App)
}).$mount("#app");
