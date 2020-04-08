//我们的内容不写在唯一的index.html里面 也不用引入不用干嘛.忽略就行,vuecli会帮我们做好
//我们的内容写在src的main.js里面
//结尾.vue 其实就是一个组件的意思
//app.vue负责写标签啊类的内容
//npm run serve 打开服务器
//项目如果push失败 加这命令 git config --global credential.helper manager
//开启服务器npm run serve
//autofocus 输入框自动聚焦
//vue的axios请求
/*
this.$axios({
    //如果不设置请求方式 默认是git请求
url:''  ,//路径
method:'' ,//请求方式
data:     //参数

}).then(Response => {
    这里是回调函数后的内容
})
执行成功后.可以有很多个.then ,如果想要用后面的很多.then又能实现封装  用封装函数的return形式返回值来用
edit(data) {
     return this.$axios({
        url: "/user_update/" + this.localuser.user.id, //获取到id
        method: "post",
        headers: {
          //获取到本地的token值
          Authorization: this.localuser.token
        },
        data
      }).then(response => {
        this.$toast.success("修改成功"); //success 这个弹窗框插件成功后的提示
        console.log();
      });
      let 接收返回值变量rut =this.edit({传参})
      rut.then(()=>{执行内容})

*/
//object-fit:cover 设置Img标签里面   盒子正方形 图片长方形  这样设置样式会让图片不变形
//组件里面导入子组件/一定要写在script里面 不能写在export default里面, 所有引入的子组件都需要经过
//components:{
//注册才行
//}
//日期转换插件  moment(需要转换的日期值).format('YYYY/MM/DD') Y年份 M月份, D日期
//click.native会给这个组件最外层的div强制绑定了一个点击事件.这样一写就有点击事件了
//跨组件传点击事件.新写法   <子组件> @click.native='函数'

/*
路由守卫看官网. vue里面找到路由,下面是全局导航守卫
1.to  意思是即将要访问的页面
2.form 即将要离开的页面
3.next  必须要调用.next下一页,调用了才会进去后面的内容
4.next('/路径') 是可以传递路径的.并且会跳转该路径
router.beforeEach((to,form,next)=>{

})

showHome 这个属性.如果传ture 那么就显示

flex-shrink:0 ;防止图片在flex布局下被挤压
*/
//如果在scoped声明中修改第三方的样式
//   规定我们在样式前面加上这个 /deep/
//页面销毁的时候触发的事件.destroyed()
//axios.defaults.baseURL = "http://hmtoutiao-api.atlansic.com" 线上地址
//keep-alive 缓存之前的页面不会被销毁. include 指定谁是否被缓存,它取得是页面属性name的值
//局部组件路由守卫.判断从哪里来的.我要干嘛
