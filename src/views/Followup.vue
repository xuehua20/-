<template>
  <div>
    <div class="head">
      <navHead :data="head" />
    </div>
    <div class="container" v-for="(item,index) in commentlist" :key="index">
      <div class="concent">
        <p>{{moment(item.create_date).format("YYYY/MM/DD")}}</p>
        <div>{{item.post.title}}</div>
        <div class="concent-reply" v-if="item.parent">
          <div class="reply">
            <p>回复:{{item.parent.user.nickname}}</p>
            <p>{{item.content}}</p>
          </div>
          <span>不是</span>
        </div>
        <div class="headline">
          <a href="#">原文：{{item.post.title}}</a>
          <i class="iconfont iconjiantou1"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navHead from "../components/navHead";
import moment from "moment"; //引入日期格式文件
export default {
  components: {
    //注册子组件
    navHead
  },
  data() {
    return {
      //传头部
      head: {
        title: "我的跟帖",
        path: () => {}
      },
      //本地数据
      localuserdata: [],
      commentlist: [], //评论列表
      moment //日期组件
    };
  },
  mounted() {
    //获取本地数据
    this.localuserdata = JSON.parse(localStorage.getItem("data"));

    this.$axios({
      url: "/user_comments",
      headers: {
        Authorization: this.localuserdata.token //获取token值
      },
      method: "get"
    }).then(Response => {
      const { data } = Response.data;
      this.commentlist = data;
      console.log(this.commentlist);
    });
  }
};
</script>
<style lang="less" scoped>
.head {
  padding: 0 0.253333rem;
}
.container {
  font-size: 0.266667rem;
  border-bottom: solid 1px #e4e4e4;
  p {
    color: #93a4b7;
    margin: 0.2rem 0;
  }
  .concent-reply {
    margin-bottom: 0.133333rem;
  }
  .reply {
    background-color: #e4e4e4;
    padding: 0.2rem;
    margin: 0.133333rem 0;
    p {
      color: #93a4b7;
      margin: 0;
    }
  }
  .headline {
    color: #93a4b7;
    display: flex;
    margin-bottom: 0.266667rem;
    a {
      flex: 5;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    i {
      flex: 1;
      text-align: right;
    }
  }
}
</style>