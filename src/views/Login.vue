<template>
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
          <div class="col-sm-12">
            <!-- <input type="text" placeholder="用户名/手机号" v-model="form.name" />
            <input type="password" placeholder="密码" v-model="form.parssword" />
            <button @click="login">登录</button>-->
            <van-form @submit="onSubmit" class="formbtn">
              <!--van-form是表单组件 , @submit是表单按钮提交的时候触发的事件 
              van-field是表单字段
              :rules是表单字段规则 
              required表示这个输入框必填
              
              -->
              <van-field
                v-model="form.username"
                name="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
              />
              <van-field
                v-model="form.password"
                type="password"
                name="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
              />
              <div style="margin: 16px;">
                <!-- 这个按钮在组件内部的话,当点击按钮的时候就会触发提交事件 -->
                <van-button round block type="info" native-type="submit">登录</van-button>
              </div>
            </van-form>
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
      form: {
        username: "",
        parssword: ""
      }
    };
  },
  methods: {
    // login() {
    //   console.log(this.form);

    //   this.$axios({
    //     url: "http://127.0.0.1:3000/login",
    //     method: "post",
    //     data: this.form
    //   }).then(response => {
    //     console.log(response);
    //     const { message } = response.data;
    //     this.$toast.success(message); //success 这个弹窗框插件成功后的提示
    //   });
    // }
    onSubmit() {
      //该事件是 通过校验了才触发
      this.$axios({
        url: "http://127.0.0.1:3000/login",
        method: "post",
        data: this.form
      }).then(response => {
        console.log(response);
        const { message } = response.data;
        this.$toast.success(message); //success 这个弹窗框插件成功后的提示
      });
    }
  }
};
</script>
<style lang="less">
@import url("//at.alicdn.com/t/font_1426139_jm7n2373nlh.css"); //引入在线的字体图标
@import url("../libs/css/bootstrap.min.css"); //引入响应式布局
// Extra small devices (portrait phones, less than 576px)
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
.container {
  .shut {
    padding: 0.266667rem;

    a {
      display: flex;
      width: 0.666667rem;
      height: 0.666667rem;
      margin: 0rem 0rem;

      .iconfont {
        color: #2d2d2d;
        font-size: 0.506667rem;
        font-weight: 700;
      }
    }
    a:hover {
      text-decoration: none !important;
      color: #2d2d2d;
    }
  }
  .newlogo {
    display: flex;
    height: 2.666667rem;
    line-height: 2.666667rem;
    i {
      font-size: 2.666667rem;
      color: #d81e06;
    }
  }
  .formbtn {
    // display: flex;
    // flex-wrap: wrap;
    div {
      padding: 0rem 0rem;
      margin: 0 0rem !important;
      div {
        background-color: #f2f2f2;
      }
    }
    input {
      margin: 0.133333rem 0;
      border-bottom: 0.026667rem solid #797979;
      height: 0.666667rem;
      background-color: #f2f2f2;
      font-size: 0.213333rem;
    }
    button {
      height: 0.666667rem;
      line-height: 0;
      border: 0;
      margin: 0.666667rem 0;
      border-radius: 0.333333rem;
      background-color: #cc3300;
      color: #fff;
      font-size: 0.266667rem;
    }
  }
}
</style>
