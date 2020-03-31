<template>
  <div>
    <div class="head container">
      <navHead :data="head" />
    </div>
    <div class="container" v-for="(item,index) in followlist" :key="index">
      <div class="concernlist">
        <div class="concernuser">
          <img :src="$axios.defaults.baseURL+item.head_img" />
          <div>
            <span>{{item.nickname}}</span>
            <span>{{moment(item.create_date).format("YYYY/MM/DD")}}</span>
          </div>
        </div>
        <div class="btn1">
          <button :data="item.id" @click="unfollow(item.id,index)">取消关注</button>
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
        title: "我的关注",
        path: () => {}
      },
      localuserdata: [], //本地数据
      followlist: [], //后台返回的关注列表
      moment //日期组件
    };
  },
  //组件加载完毕后触发
  mounted() {
    //获取到本地的token值
    this.localuserdata = JSON.parse(localStorage.getItem("data"));
    console.log(this.localuserdata);
    this.$axios({
      url: "/user_follows",
      headers: {
        Authorization: this.localuserdata.token
      }
      //不写请求方式默认get 请求
    }).then(response => {
      console.log(response);
      const { data } = response.data;
      console.log(data);
      this.followlist = data; //获取到数据进行赋值
    });
  },
  methods: {
    unfollow(id, index) {
      console.log(id);
      this.$axios({
        url: "/user_unfollow/" + id,
        headers: {
          Authorization: this.localuserdata.token
        }
        //不写请求方式默认get 请求
      }).then(response => {
        const { data } = response.data;
        // console.log(data);

        this.followlist = data; //获取到数据进行赋值
        this.followlist.splice(index, 1);
        console.log(this.followlist);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.head {
  border-bottom: none !important;
}
.container {
  margin-top: 0.2rem;
  font-size: 0.24rem;
  border-bottom: 0.013333rem solid #e4e4e4;
  .concernlist {
    display: flex;

    padding-bottom: 0.266667rem;

    .concernuser {
      flex: 1;
      display: flex;
      align-items: center;
      div {
        padding-left: 0.133333rem;
        flex-direction: column;
        margin: 0;
        width: 2rem;
      }
    }
    .btn1 {
      flex: 1;
      text-align: right;
      button {
        font-size: 0.24rem;
        width: 1.333333rem;
        padding: 0.066667rem;
        margin-top: 0.333333rem;
        border-radius: 0.333333rem;
      }
    }
    img {
      margin: 0;
      width: 1.333333rem;
      border-radius: 50%;
      object-fit: contain; //让图片不变形
    }
  }
}
</style>