<template>
  <div class="footer">
    <input type="text" />
    <span class="iconfont iconpinglun-">
      <i>{{post.comment_length > 100 ? `99+` : post.comment_length}}</i>
    </span>
    <i class="iconfont iconshoucang" :class="post.has_star?'active ' :'' " @click="collect"></i>
    <i class="iconfont iconfenxiang"></i>
  </div>
</template>
<script>
export default {
  props: ["post"],

  methods: {
    //3.收藏和取消收藏
    collect() {
      //1.获取本地存储里面的值
      this.token = JSON.parse(localStorage.getItem("data")) || [];
      this.$axios({
        url: "/post_star/" + this.post.id, //文章id
        //设置验证头需要的token值
        headers: {
          Authorization: this.token.token
        }
      }).then(Response => {
        //进行取反改变状态
        const { message } = Response.data;
        this.post.has_star = !this.post.has_star;
        this.$toast.success(message); //弹窗提示
      });
    }
  }
};
</script>
<style lang="less" scoped>
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
      width: 0.466667rem;
      background-color: #ff0000;
      color: #fff;
      border-radius: 0.333333rem;
      padding-left: 0.066667rem;
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