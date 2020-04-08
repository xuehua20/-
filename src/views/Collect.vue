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
          <div
            class="threeimg"
            v-if="item.type === 1&&item.cover.length-1>1&&item.cover.length-1<3"
          >
            <div v-for="(item,index) in item.cover" :key="index">
              <img :src="$axios.defaults.baseURL+item.url" alt />
            </div>
          </div>
          <div class="video" v-if="item.type === 2">
            <img :src="$axios.defaults.baseURL + item.cover[0].url" />
            <router-link to="#">
              <i class="iconfont iconshipin"></i>
            </router-link>
          </div>
          <p>
            {{item.user.nickname}}
            <span>{{item.comments.length}}跟帖</span>
          </p>
        </div>
        <!-- 图片张数一张的时候
        -->
        <div class="img" v-if="item.type === 1&&item.cover.length-1<1">
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
      console.log(this.collectlist);
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
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;

        -webkit-box-orient: vertical;
      }
      p {
        flex: 0;
        color: #93a4b7;
        margin: 0;
      }
      .threeimg {
        display: flex;
        padding-bottom: 0.133333rem;
        width: 100%;
        img {
          height: 1.6rem;
          object-fit: cover; //让图片不变形
          width: 2.133333rem;
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
        flex-shrink: 0; //防止图片在flex布局下被挤压
      }
    }
  }
}
.video {
  position: relative;
  margin: 0;
  margin-bottom: 0.2rem;
  object-fit: contain; //让图片不变形
  img {
    width: 100%;
    height: 2.8rem;
    flex-shrink: 0; //防止图片在flex布局下被挤压
  }
  a {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    i {
      position: absolute;
      width: 0.8rem;
      height: 0.8rem;
      top: 50%;
      left: 50%;
      transform: translateX(-27/360 * 100vw) translateY(-27/360 * 100vw); //让遮罩层居中
      background-color: rgba(14, 19, 111, 0.5);
      text-align: center;
      line-height: 0.8rem;
    }
    .iconfont {
      color: #fff;
      font-size: 0.666667rem;
    }
  }
}
</style>