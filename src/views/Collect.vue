<template>
  <div>
    <div class="head">
      <navHead :data="head" />
    </div>
    <div class="container">
      <div class="content">
        <div class="text">
          <h4>林志玲穿透视黑纱裙米兰看秀腹部微隆显孕味</h4>
          <div class="threeimg">
            <img src="http://localhost:3000/uploads/image/IMG1585548195492.jpeg" alt />
            <img src="http://localhost:3000/uploads/image/IMG1585548195492.jpeg" alt />
            <img src="http://localhost:3000/uploads/image/IMG1585548195492.jpeg" alt />
          </div>
          <p>
            火星时报
            <span>52跟帖</span>
          </p>
        </div>
        <!-- <div class="img">
          <img src="http://localhost:3000/uploads/image/IMG1585548195492.jpeg" alt />
        </div>-->
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
        path: () => {}
      }
    };
  }
};
</script>
<style lang="less" scoped>
.head {
  padding: 0 0.253333rem;
}
.container {
  font-size: 0.266667rem;
  padding: 0.253333rem;
  border-bottom: 0.013333rem solid #e4e4e4;
  .content {
    display: flex;
    .text {
      flex: 2;
      display: flex;
      flex-direction: column;
      h4 {
        flex: 2;
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
        img {
          width: 30%;
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
      img {
        margin: 0;
        width: 100%;
        object-fit: contain; //让图片不变形
      }
    }
  }
}
</style>