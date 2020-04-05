<template>
  <div>
    <div class="container">
      <div class="content">
        <div class="text">
          <h4>{{data.title}}</h4>
          <!-- 图片大于1小于三的时候显示 -->
          <div class="threeimg" v-if="data.type === 1 && data.cover.length >= 3">
            <div v-for="(item,index) in data.cover" :key="index">
              <img :src="$axios.defaults.baseURL+item.url" />
            </div>
          </div>
          <div class="video" v-if="data.type === 2">
            <img :src="$axios.defaults.baseURL + data.cover[0].url" />
            <router-link to="#">
              <i class="iconfont iconshipin"></i>
            </router-link>
          </div>
          <p>
            {{data.user.nickname}}
            <span>{{data.comment_length}}跟帖</span>
          </p>
        </div>
        <!-- 图片张数一张的时候,并且类型是1 -->
        <div class="img" v-if="data.type === 1 && data.cover.length > 0 && data.cover.length< 3">
          <div v-for="(data,index) in data.cover" :key="index">
            <img :src="$axios.defaults.baseURL+data.url" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["data"],
  mounted() {
    // console.log(this.data);
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
        margin-right: 0rem;
        font-size: 0.266667rem;
      }
      p {
        flex: 0;
        color: #93a4b7;
        margin: 0;
      }
      .threeimg {
        display: flex;
        padding-bottom: 0.133333rem;

        img {
          height: 1.6rem;
          object-fit: cover;
          width: 95%;
        }
        :nth-child(3) {
          margin-right: 0;
        }
      }
    }
    .img {
      flex: 1;
      margin-top: 0.133333rem;

      flex-shrink: 0;
      img {
        margin: 0;
        width: 100%;
        object-fit: cover; //让图片不变形
        height: 1.6rem;
      }
    }
    .video {
      position: relative;
      margin: 0;
      margin-bottom: 0.2rem;

      img {
        width: 100%;
        height: 2.8rem;
        object-fit: cover; //让图片不变形
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
          transform: translateX(-50%) translateY(-50%); //让遮罩层居中
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
  }
}
</style>