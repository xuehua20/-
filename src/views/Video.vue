<template>
  <div>
    <div class="head-video">
      <video :src="$axios.defaults.baseURL+post.content" width="100%" muted controls></video>
    </div>
    <div class="head-video1">
      <span class="iconfont iconjiantou" @click="$router.back()"></span>
    </div>
    <div class="container">
      <div class="user">
        <div class="left">
          <img :src="$axios.defaults.baseURL+post.user.head_img" />
          <p>{{post.user.nickname}}</p>
        </div>
        <div class="rgiht">
          <span
            :class="post.has_follow?'' :'active' "
            @click="getfollow(post.has_follow)"
          >{{post.has_follow?'已关注':'关注'}}</span>
        </div>
      </div>
      <div class="title">
        <h4>{{post.title}}</h4>
      </div>
      <div class="botton">
        <span>
          <i class="iconfont icondianzan" @click="getlike()"></i>
          {{ Number(post.has_like) }}
        </span>
        <span>
          <i class="iconfont iconweixin"></i>
          微信
        </span>
      </div>
      <bottomnav :post="this.post" />
    </div>
  </div>
</template>
<script>
import bottomnav from "../components/bottomnav";
export default {
  components: {
    bottomnav
  },
  data() {
    return {
      post: {
        user: {}
      },
      token: ""
    };
  },
  mounted() {
    console.log(this.$router);

    //1.获取本地存储里面的值
    this.token = JSON.parse(localStorage.getItem("data")) || [];
    //1.1文章详情的渲染
    //1.2先判断是否有登录状态
    const config = {
      //1.3截取到文章id
      url: "/post/" + this.$route.params.id
    };
    //1.4有就给文章加个请求头
    if (this.token.token) {
      config.headers = {
        Authorization: this.token.token
      };
    }
    //1.5请求文章详情
    this.$axios(config).then(Response => {
      const { data } = Response.data;
      this.post = data;
      console.log(this.post);
    });
  },
  methods: {
    //2点击关注和取消关注
    getfollow(item) {
      //2.1有登录状态下才能点击关注
      if (this.token.token) {
        let url = "";
        if (this.post.has_follow) {
          url = "/user_unfollow/";
        } else {
          url = "/user_follows/";
        }
        this.$axios({
          url: url + this.post.user.id, //发表文章用户的id
          //设置验证头需要的token值
          headers: {
            Authorization: this.token.token
          }
        }).then(Response => {
          const { message } = Response.data;
          //进行取反改变状态
          this.post.has_follow = !this.post.has_follow;
          this.$toast.success(message); //弹窗提示
        });
      } else {
        this.$router.push({
          path: "/login",
          //quey代表问号后面的路径
          query: {
            return_url: this.$route.path
          }
        });
      }
    },

    //4.点赞和取消点赞
    getlike() {
      this.$axios({
        url: "/post_like/" + this.post.id, //文章id
        //设置验证头需要的token值
        headers: {
          Authorization: this.token.token
        }
      }).then(Response => {
        //进行取反改变状态
        console.log(Response);
        const { message } = Response.data;
        this.post.has_like = !this.post.has_like;
        if (this.post.has_like) {
          this.posthas_like += 1;
        } else {
          this.posthas_like -= 1;
        }
        this.$toast.success(message); //弹窗提示
      });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  border-bottom: solid 0.066667rem #cccccc;
}
.head-video1 {
  span {
    position: absolute;
    top: 10px;
    left: 15px;
    width: 0.666667rem;
    height: 0.666667rem;
    font-size: 0.4rem;
    color: #fff;
  }
}
.user {
  font-size: 0.333333rem;
  display: flex;
  justify-content: space-between;
  margin: 0 0 30px 0;

  .left {
    display: flex;
    margin: 0;
    justify-content: center;
    align-items: center;
    p {
      margin: 0;
      margin-left: 0.133333rem;
      color: #ccc;
      font-size: 0.266667rem;
    }

    img {
      width: 0.533333rem;
      border-radius: 50%;
    }
  }
  .rgiht {
    margin: 0;
    span {
      border: 0.013333rem solid #cccccc;
      padding: 0 0.133333rem;
      border-radius: 0.333333rem;
    }
    .active {
      background-color: red;
    }
  }
}
.title {
  h4 {
    font-size: 0.333333rem;
    font-weight: 700;
  }
}
.botton {
  font-size: 0.333333rem;
  margin: 25px;
  display: flex;
  span {
    border: 0.013333rem solid #dedede;
    padding: 0.066667rem 0.266667rem;
    border-radius: 0.333333rem;
    i {
      font-size: 0.333333rem;
    }
  }
  :nth-child(2) {
    i {
      color: green;
    }
  }
}
</style>