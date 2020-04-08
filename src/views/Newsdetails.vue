<template>
  <div>
    <div class="container">
      <div class="head">
        <div class="left">
          <router-link to="/index" class="iconfont iconjiantou"></router-link>
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
      <div class="content" v-html="post.content"></div>
      <div class="botton">
        <span>
          <i class="iconfont icondianzan"></i>
          112
        </span>
        <span>
          <i class="iconfont iconweixin"></i>
          微信
        </span>
      </div>
    </div>
    <div class="footer">
      <input type="text" />
      <span class="iconfont iconpinglun-">
        <i>1102011</i>
      </span>
      <i class="iconfont iconshoucang" :class="post.has_star?' active' :'' "></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
  </div>
</template>
<script>
//引入日期格式化软件
import moment from "moment";
export default {
  data() {
    return {
      // 这样可以防止数据没有来的及回来nickname报错//
      post: {
        user: {}
      },
      moment, //日期格式插件
      token: {}
    };
  },
  mounted() {
    console.log(this.$route.params.id);
    //文章详情的渲染
    this.$axios({
      url: "/post/" + this.$route.params.id
    }).then(Response => {
      const { data } = Response.data;
      this.post = data;
      console.log(this.post);
    });
  },
  methods: {
    getfollow(item) {
      this.token = JSON.parse(localStorage.getItem("data")) || [];
      //有登录状态下才能点击关注
      if (this.token.token) {
        let url = "";
        if (this.post.has_follow) {
          url = "/user_unfollow/";
        } else {
          url = "/user_follows/";
        }
        this.$axios({
          url: url + this.post.user.id,
          //设置验证头需要的token值
          headers: {
            Authorization: this.token.token
          }
        }).then(Response => {
          const { message } = Response.data;
          //进行取反改变状态
          this.post.has_follow = !this.post.has_follow;
          console.log(this.post);
        });
      } else {
      }
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
      a {
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
}
.content {
  /deep/img {
    width: 100%;
  }
  /deep/p {
    margin: 0;
  }
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 0.333333rem;
  display: flex;
  margin: 0 0.253333rem;
  background-color: #fff;
  input {
    background-color: #d7d7d7;
    border-radius: 0.333333rem;
    margin-right: 0.2rem;
    margin: 0.133333rem 0.2rem;
  }
  .iconfont {
    font-size: 0.5rem;
    margin-right: 0.533333rem;
  }
  span {
    position: relative;
    i {
      position: absolute;
      top: -2px;
      left: 4px;
      font-size: 12px;
      width: 0.733333rem;
      background-color: #ff0000;
      color: #fff;
      border-radius: 0.333333rem;
      padding: 0.026667rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .active {
    color: #ff0000;
  }
}
</style>