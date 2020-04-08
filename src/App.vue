<template>
  <div id="app">
    <!-- keep-alive想缓存什么页面
    include 指定谁是否被缓存,它取得是页面属性name的值 ,如果想要多个就,号隔开-->
    <keep-alive include="index88,search">
      <router-view />
      <!-- 根路径模板里面只能写一个div作为根节点
      -->
    </keep-alive>
  </div>
</template>
// lang 用来什么属性
<style lang="less">
@import url("./libs/css/bootstrap.min.css"); //引入响应式布局
@import url("//at.alicdn.com/t/font_1426139_jm7n2373nlh.css"); //引入在线的字体图标
@import url("../node_modules/vant/lib/index.css");
@no: 10; //rem字体大小
@media (max-width: 575.98px) {
  html {
    font-size: 575.98px / @no;
  }
}
// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) and (max-width: 767.98px) {
  html {
    font-size: 767.98px / @no;
  }
}
// Medium devices (tablets, 768px and up)
@media (min-width: 768px) and (max-width: 991.98px) {
  html {
    font-size: 991.98px / @no;
  }
}
// Large devices (desktops, 992px and up)
@media (min-width: 992px) and (max-width: 1199.98px) {
  html {
    font-size: 1199.98px / @no;
  }
}
// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
  html {
    font-size: 1200px / @no;
  }
}

* {
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}
// body {
//   background-color: #f2f2f2 !important;
// }
a {
  text-decoration: none;
  color: inherit; //颜色继承所有父属性
}
ul,
li,
ol {
  list-style: none;
}
i,
em {
  font-style: normal;
}
img {
  vertical-align: middle;
}
input,
button {
  border: none;
  outline: none;
}
</style>
