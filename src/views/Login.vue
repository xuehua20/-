<template >
  <div>
    <div>
      <div class="container">
        <div class="row">
          <div class="shut col-sm-12">
            <a href="#">
              <i class="iconfont iconicon-test"></i>
            </a>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 newlogo">
            <i class="iconfont iconnew"></i>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 formbtn">
            <input type="text" placeholder="用户名/手机号" v-model="name" />
            <input type="password" placeholder="密码" v-model="parssword" />
            <button @click="login">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      parssword: ""
    };
  },
  methods: {
    login() {
      alert("吃法");
      console.log(this.name);
      console.log(this.parssword);
    }
  }
};
</script>
<style lang="less">
@import url("//at.alicdn.com/t/font_1426139_jm7n2373nlh.css"); //引入在线的字体图标
@import url("../libs/css/bootstrap.min.css"); //引入响应式布局
.container {
  .shut {
    padding: 10px;

    a {
      display: flex;
      width: 50px;
      height: 50px;
      margin: 10px 0px;

      .iconfont {
        color: #2d2d2d;
        font-size: 30px;
      }
    }
    a:hover {
      text-decoration: none !important;
      color: #2d2d2d;
    }
  }
  .newlogo {
    display: flex;
    height: 200px;
    line-height: 200px;
    i {
      font-size: 200px;
      color: #c02900;
    }
  }
  .formbtn {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    input {
      flex: 100%;
      height: 50px;
      margin: 10px 0;
      border-bottom: 2px solid #797979;
      background-color: #f2f2f2;
    }
    button {
      flex: 1;
      height: 50px;
      margin: 50px 10px;
      border-radius: 25px;
      background-color: #cd3301;
      color: #fff;
    }
  }
}
</style>