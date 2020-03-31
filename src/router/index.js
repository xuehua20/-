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
  },
  {
    path: "/personal",
    component: () => import("@/views/Personal"),
    //mata 路由可通过它自定义数据,可以选择在路由随意加上自己的数据
    //它的值可以是任意类型
    mata: {
      //代表这个页面需要授权
      authorization: true
    }
  },
  {
    path: "/edit",
    component: () => import("@/views/Edituser"),
    mata: {
      //代表这个页面需要授权
      authorization: true
    }
  },
  //我的关注
  {
    path: "/attention",
    component: () => import("@/views/Attention"),
    mata: {
      //代表这个页面需要授权
      authorization: true
    }
  },
  //跟帖页面
  {
    path: "/followup",
    component: () => import("@/views/Followup"),
    mata: {
      //代表这个页面需要授权
      authorization: true
    }
  },
  //我的收藏
  {
    path: "/collect",
    component: () => import("@/views/Collect"),
    mata: {
      //代表这个页面需要授权
      authorization: true
    }
  }
];

const router = new VueRouter({
  mode: "history", //路由的模式
  base: process.env.BASE_URL, //当前路径
  //传值
  routes
});
//路由守卫,也叫导航卫士
router.beforeEach((to, form, next) => {
  if (to.mata.authorization === true) {
    //即将进入个人中心的时候判断一下是否有token值
    let token = JSON.parse(localStorage.getItem("data")) || [];
    console.log(token);
    if (token.token != "") {
      //如果有.让进来,如果没有不让进来
      next();
    } else {
      router.replace("/login");
    }
  } else {
    next();
  }
});
export default router;
