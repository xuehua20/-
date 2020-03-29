<template>
  <div class="container">
    <navHead :data="title" />
    <div class="user">
      <div>
        <img :src="head_img" alt />
      </div>
      <div>
        <span>
          <i class="iconfont iconxingbienan" v-if="gender === 1"></i>
          <i class="iconfont iconxingbienv" v-if="gender === 0"></i>
          {{ nickname }}
        </span>
        <span>{{ create_date }}</span>
      </div>
      <div>
        <i class="iconfont iconjiantou1"></i>
      </div>
      <router-link to="/edit" />
    </div>
    <list v-for="item in listh" :key="item.name" :data="item"></list>
    <div class="btn">
      <button>退出登录</button>
    </div>
  </div>
</template>
<script>
//引入子组件
import list from "../components/list";
import navHead from "../components/navHead";
//引入日期格式化软件
import moment from "moment";
export default {
  components: {
    //   注册子组件
    list,
    navHead
  },
  data() {
    return {
      title: {
        title: "个人中心",
        path: () => {}
      },
      listh: [
        {
          name: "我的关注",
          user: "关注的用户"
        },
        {
          name: "我的跟帖",
          user: "跟帖回复"
        },
        {
          name: "我的收藏",
          user: "文章/视频"
        }
      ],
      nickname: "",
      head_img: "",
      create_date: "",
      gender: ""
    };
  },
  mounted() {
    //组件样式加载完后开始发送请求
    //先从本地拿到验证 和要传的参数
    const str = JSON.parse(localStorage.getItem("data"));
    //请求方式不写的话.默认是get请求
    this.$axios({
      url: `/user/${str.user.id}`, //拼接动态id值传给后台
      //设置验证头需要的token值
      headers: {
        Authorization: str.token
      }
    }).then(response => {
      const { data } = response.data;
      const { nickname, head_img, create_date, gender } = data;
      this.nickname = nickname;
      this.head_img = this.$axios.defaults.baseURL + head_img;
      this.gender = gender;
      //把图片重新存回本地存储
      //调用日期转换插件.然后赋值给 this.create_date再渲染
      this.create_date = moment(create_date).format("YYYY/MM/DD");
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  position: relative;
  .user {
    position: relative;
    font-size: 0.266667rem;
    display: flex;
    border-bottom: 0.066667rem solid #e4e4e4;
    :nth-child(1) {
      padding-right: 0rem;
      margin: 0.213333rem 0.066667rem 0.213333rem 0;
    }
    :nth-child(2) {
      padding-right: 0rem;
      margin: 0.266667rem 0.066667rem 0.266667rem 0;
      display: flex;
      flex-direction: column;
      color: red;
      justify-content: center;
      span {
        margin: 0rem;
        .iconfont {
          font-size: 0.333333rem;
        }
      }
    }
    :nth-child(3) {
      flex: 2;
      display: flex;
      padding-right: 0rem;
      flex-direction: row-reverse;
      align-items: center;
      //   padding: 0rem 0.266667rem;
      i {
        font-size: 0.333333rem;
        color: #757575;
        font-weight: 700;

        height: 0.666667rem;
      }
    }
    img {
      flex: 1;

      width: 1.333333rem;
      border-radius: 50%;
    }
    a {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
  .btn {
    position: fixed;
    bottom: 0.266667rem;
    padding: 0rem;
    button {
      width: 100%;
      background-color: greenyellow;
      border-radius: 0.333333rem;
      font-size: 0.333333rem;
      padding: 0.133333rem;
    }
  }
}
</style>
