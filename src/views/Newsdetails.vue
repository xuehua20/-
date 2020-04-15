<template>
  <div>
    <div class="container">
      <div class="head">
        <div class="left">
          <!-- $router.back() 这样后退上一页会有记录在 -->
          <i class="iconfont iconjiantou" @click="$router.back()"></i>
          <!-- <router-link to="/index" class="iconfont iconjiantou"></router-link> -->
          <i class="iconfont iconnew"></i>
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
        <span>{{post.user.nickname}} {{moment(post.create_date).format("YYYY/MM/DD hh:mm:ss")}}</span>
      </div>
      <!-- 类型为普通类型的显示 -->
      <div class="content" v-html="post.content" v-if="post.type===1"></div>
      <!-- <div class="content video" v-if="post.type===2">
        <video :src="$axios.defaults.baseURL+post.content" width="100%" muted controls></video>
      </div>-->
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
      <div class="nav" @click="pathe">
        <router-link to>点我查看更多精彩评论>>></router-link>
      </div>
    </div>
    <bottomnav :post="this.post" />
    <!-- <div class="footer">
      <input type="text" />
      <span class="iconfont iconpinglun-">
        <i>{{post.comment_length > 100 ? `99+` : post.comment_length}}</i>
      </span>
      <i class="iconfont iconshoucang" :class="post.has_star?'active ' :'' " @click="collect"></i>
      <i class="iconfont iconfenxiang"></i>
    </div>-->
  </div>
</template>
<script>
//引入日期格式化软件
import moment from "moment";
import bottomnav from "../components/bottomnav";
export default {
  components: {
    bottomnav
  },
  data() {
    return {
      // 这样可以防止数据没有来的及回来nickname报错//
      post: {
        user: {}
      },
      moment, //日期格式插件
      token: {},
      commentlist: [], //评论列表
      arr2: []
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
    },
    //跳转精彩跟帖
    pathe() {
      console.log(this.$route.path);
      this.$router.replace({
        path: "/goodcomments",
        //quey代表问号后面的路径
        query: {
          return_url: this.$route.path
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  font-size: 0.333333rem;
  border-bottom: solid 0.066667rem #cccccc;
  margin-bottom: 1.333333rem;
  .title {
    margin-bottom: 17px;
    h4 {
      font-size: 0.346667rem;
      font-weight: 700;
      margin-bottom: 5px;
    }

    span {
      font-size: 0.266667rem;
      color: #cccccc;
      background-color: #fff;
    }
  }
  .head {
    height: 0.8rem;
    line-height: 0.8rem;
    margin-bottom: 0.2rem;
    display: flex;
    justify-content: space-between;
    .left {
      margin: 0;
      display: flex;
      i {
        width: 0.533333rem;
        font-size: 0.4rem;
      }
      .iconnew {
        font-size: 0.8rem;
      }
    }
    .rgiht {
      margin: 0;
      span {
        font-size: 0.266667rem;
        border: 0.013333rem solid #dedede;
        border-radius: 0.333333rem;
        padding: 0.066667rem 0.226667rem;
      }
      .active {
        background-color: #ff0000;
      }
    }
  }
  .botton {
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
  .nav {
    color: #c9c9c9;
    a {
      text-align: right;
    }
  }
}
.content {
  /deep/img {
    width: 100%;
  }
  /deep/p {
    margin: 0;
  }
}
// .footer {
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   font-size: 0.333333rem;
//   display: flex;
//   margin: 0 0.253333rem;
//   background-color: #fff;
//   input {
//     background-color: #d7d7d7;
//     border-radius: 0.333333rem;
//     margin-right: 0.2rem;
//     margin: 0.133333rem 0.2rem;
//   }
//   .iconfont {
//     font-size: 0.5rem;
//     margin-right: 0.533333rem;
//   }
//   span {
//     position: relative;
//     i {
//       position: absolute;
//       top: -2px;
//       left: 4px;
//       font-size: 12px;
//       width: 0.466667rem;
//       background-color: #ff0000;
//       color: #fff;
//       border-radius: 0.333333rem;
//       padding-left: 0.066667rem;
//       white-space: nowrap;
//       text-overflow: ellipsis;
//       overflow: hidden;
//     }
//   }
//   .active {
//     color: #ff0000;
//   }
// }
</style>