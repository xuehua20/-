<template >
  <div class="navhead">
    <ul>
      <li>
        <i class="iconfont iconjiantou"></i>
      </li>
      <li>个人中心</li>
      <li>
        <i class="iconfont iconshouye"></i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.navhead {
  height: 0.866667rem;
  line-height: 0.666667rem;
  font-size: 0.333333rem;
  border-bottom: 1px solid #e4e4e4;

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