<template >
  <div class="navhead">
    <ul>
      <li @click="data.path">
        <i class="iconfont iconjiantou"></i>
      </li>
      <li>{{data.title}}</li>
      <li>
        <!-- 首页图标等于个人中心的时候才显示 -->
        <i v-if="data.title==='个人中心'">
          <router-link to="/index" class="iconfont iconshouye"></router-link>
        </i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["data"],
  mounted() {
    //接收到快递
    // console.log(this.data);
  }
};
</script>
<style lang="less" scoped>
.navhead {
  height: 0.866667rem;
  line-height: 0.666667rem;
  font-size: 0.333333rem;
  // border-bottom: 1px solid #e4e4e4;

  ul {
    display: flex;
    li {
      flex: 1;
      .iconfont {
        font-size: 0.333333rem;
        margin-left: -0.066667rem;
      }
    }
    :nth-child(2) {
      text-align: center;
    }
    :nth-child(3) {
      text-align: right;
    }
  }
}
</style>