<template>
  <div id="app">
    <router-view />
    <!-- 根路径模板里面只能写一个div作为根节点
    -->
  </div>
</template>
// lang 用来什么属性
<style lang="less">
* {
  margin: 0 auto;
  padding: 0;
}
body {
  background-color: #f2f2f2 !important;
}
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
