import Vue from "vue";
import VueRouter from "vue-router"; //导入路由
import Home from "../views/Home.vue"; //导入组件 home代表首页
//注册路由插件,把路由关联到vue,固定要加的
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    //主页不需要懒加载
    component: Home
  },
  {
    path: "/about",
    name: "About",
    //组件的懒加载,只有当我访问这个页面的时候,才会加载这个js文件
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
