import Vue from "vue";
import VueRouter from "vue-router"; //导入路由

//注册路由插件,把路由关联到vue,固定要加的
Vue.use(VueRouter);

const routes = [
  //除了首页外不需要懒加载
  {
    //路由重定向
    path: "/",
    redirect: "/Login"
  },
  {
    path: "/login",
    //组件的懒加载,只有当我访问这个页面的时候,才会加载这个js文 件 @代表src这个目录
    // .vue这个扩展名可以忽略
    component: () => import("@/views/Login")
  },
  {
    path: "/register",
    component: () => import("@/views/Register")
  }
];

const router = new VueRouter({
  mode: "history", //路由的模式
  base: process.env.BASE_URL, //当前路径
  //传值
  routes
});

export default router;
