<template>
  <div>
    <div class="head container">
      <navHead :data="head" />
    </div>
    <div class="container" v-for="(item,index) in collectlist" :key="index">
      <div class="content">
        <div class="text">
          <h4>{{item.title}}</h4>
          <!-- 图片大于1小于三的时候显示 -->
          <div class="threeimg" v-if="item.cover.length-1>1&&item.cover.length-1<3">
            <div v-for="(item,index) in item.cover" :key="index">
              <img :src="$axios.defaults.baseURL+item.url" alt />
              <!-- <img src="http://localhost:3000/uploads/image/IMG1585548195492.jpeg" alt />
              <img src="http://localhost:3000/uploads/image/IMG1585548195492.jpeg" alt />-->
            </div>
          </div>
          <p>
            火星时报
            <span>52跟帖</span>
          </p>
        </div>
        <!-- 图片张数一张的时候 -->
        <div class="img" v-if="item.cover.length-1<1">
          <div v-for="(item,index) in item.cover" :key="index">
            <img :src="$axios.defaults.baseURL+item.url" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navHead from "../components/navHead";
export default {
  components: {
    //注册子组件
    navHead
  },
  data() {
    return {
      //传头部
      head: {
        title: "我的收藏",
        path: () => {
          //点击返回个人中心
          this.$router.replace("/personal");
        }
      },
      localuserdata: [], //本地存储的数据
      collectlist: [] //收藏列表
    };
  },
  mounted() {
    //获取到本地的token值
    this.localuserdata = JSON.parse(localStorage.getItem("data"));
    this.$axios({
      url: "/user_star",
      headers: {
        Authorization: this.localuserdata.token
      }
    }).then(response => {
      const { data } = response.data;
      //渲染给data里面的收藏列表
      this.collectlist = data;
      console.log(data);
    });
  }
};
</script>
<style lang="less" scoped>
.head {
  border-bottom: none !important;
}
.container {
  font-size: 0.266667rem;
  padding-bottom: 0.2rem;
  border-bottom: 0.013333rem solid #e4e4e4;
  .content {
    display: flex;
    .text {
      flex: 2;
      display: flex;
      flex-direction: column;
      h4 {
        flex: 2;
        flex-wrap: wrap;
        margin-top: 0.2rem;
        margin-left: 0;
        font-size: 0.266667rem;
      }
      p {
        flex: 0;
        color: #93a4b7;
        margin: 0;
      }
      .threeimg {
        flex: 2;
        display: flex;
        padding-bottom: 0.133333rem;
        img {
          width: 30%;
          flex-shrink: 0; //防止图片在flex布局下被挤压
          object-fit: contain; //让图片不变形
          margin-left: 0;
          margin-right: 0.133333rem;
        }
        :nth-child(3) {
          margin-right: 0;
        }
      }
    }
    .img {
      flex: 1;
      margin-top: 0.133333rem;

      object-fit: contain; //让图片不变形
      flex-shrink: 0;
      img {
        margin: 0;
        width: 100%;
        height: 1.6rem;
      }
    }
  }
}
</style>