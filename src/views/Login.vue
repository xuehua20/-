<template>
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
          <van-form @submit="onSubmit" class="formbtn">
            <!--van-form是表单组件 , @submit是表单按钮提交的时候触发的事件 
              van-field是表单字段
              :rules是表单字段规则 
              required表示这个输入框必填
              
            -->
            <van-field
              v-model="form.username"
              type="text"
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
              <van-button round block native-type="submit">登录</van-button>
            </div>
          </van-form>
        </div>
        <div class="col-sm-12 register">
          <router-link to="/register">没有账号?前往注册</router-link>
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
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      //该事件是 通过校验了才触发
      this.$axios({
        url: "http://127.0.0.1:3000/login",
        method: "post",
        data: this.form
      }).then(response => {
        const { message, data } = response.data;

        console.log(data);
        //把数据存到本地存储
        localStorage.setItem("data", JSON.stringify(data));
        this.$router.push("/personal");
      });
    }
  }
};
</script>

<style lang="less" scoped>
// 加scoped  后.表示当前样式只会当前组件有用

.container {
  .shut {
    padding-top: 0.2rem;
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
      margin: 0.4rem 0rem !important;
      // background-color: #2d2d2d !important;
    }
    div {
      font-size: 0.266667rem;
    }
    .van-cell {
      border-bottom: solid 0.026667rem #757575;
    }

    button {
      height: 0.866667rem;
      line-height: 0;
      border: 0;
      margin: 0.666667rem 0;
      border-radius: 0.4rem;
      background-color: #cc3300;
      color: #fff;
      font-size: 0.266667rem;
    }
  }
  .register {
    font-size: 0.266667rem;
    color: #272822;
    text-align: right;
  }
}
</style>
