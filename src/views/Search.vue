<template>
  <div class="container">
    <div class="head">
      <div class="retreat">
        <router-link to="/index" class="iconfont iconjiantou"></router-link>
        <i></i>
      </div>
      <div class="searchbtn">
        <input type="text" />
        <i class="iconfont iconsearch"></i>
      </div>
      <div class="search-btn">搜索</div>
    </div>
    <div class="history">
      <div class="history-title">
        <p>历史记录</p>
        <span class="iconfont iconjiantou1"></span>
      </div>
      <div class="history-content">
        <ul>
          <li>美女美女美女美女美女</li>
          <li>美女美女</li>
          <li>美女美女美女美女</li>
          <li>美女美女美女美女</li>
          <li>美女美女</li>
          <li>美女</li>
          <li>美女</li>
          <li>美女</li>
          <li>美女</li>
          <li>美女</li>
        </ul>
      </div>
    </div>
    <div class="real-time">
      <div class="real-time-title">
        <p>实时热搜</p>
        <span>每分钟更新一次</span>
      </div>
      <div class="real-time-content">
        <ul>
          <li>
            <p>
              <span>1</span>美国全球他
            </p>
            <span>嘻嘻</span>
          </li>
          <li>
            <p>
              <span>1</span>美国全球他
            </p>
            <span>嘻嘻</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- <div class="NetMonitor">
      <ul>
        <li v-for="item in 100" :key="item">
          <p>花露水的妙用</p>
          <span class="iconfont iconjiantou1"></span>
        </li>
      </ul>
    </div>-->
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.head {
  margin: 0.133333rem 0;
  display: flex;
  height: 1.066667rem;
  line-height: 1.066667rem;
  justify-content: space-between;
  font-size: 0.333333rem;

  .retreat {
    width: 0.666667rem;
    .iconfont {
      font-size: 0.333333rem;
      color: #c6c6c6;
    }
  }
  .searchbtn {
    padding: 0 0.08rem;
    position: relative;
    width: 100%;
    input {
      width: 100%;
      padding-left: 0.733333rem;
      height: 0.666667rem;
      border: 0.013333rem solid #c6c6c6;
      border-radius: 0.333333rem;
    }
    i {
      position: absolute;
      left: 0.266667rem;
    }
    .iconfont {
      padding-left: 0.133333rem;
    }
  }
  .search-btn {
    width: 1.333333rem;
    text-align: center;
  }
}
.history {
  border-bottom: solid 0.013333rem #c6c6c6;

  .history-title {
    display: flex;
    justify-content: space-between;
    p {
      font-weight: 700;
      margin: 0;
      font-size: 0.333333rem;
    }
    span {
      margin: 0;
      color: #c6c6c6;
    }
  }
  .history-content {
    ul {
      display: flex;
      font-size: 0.333333rem;
      flex-wrap: wrap;
      li {
        border: 0.013333rem solid #c6c6c6;
        padding: 0.133333rem;
        margin: 0.08rem;
      }
    }
  }
}
.real-time {
  font-size: 0.266667rem;
  .real-time-title {
    display: flex;
    height: 0.4rem;
    line-height: 0.4rem;
    justify-content: space-between;
    p {
      font-weight: 700;
      margin: 0;
      font-size: 0.333333rem;
      color: #f86363;
    }
    span {
      margin: 0;
      color: #c6c6c6;
    }
  }
}
.real-time-content {
  ul {
    li {
      margin: 0.133333rem 0;
      display: flex;
      justify-content: space-between;
      p {
        margin: 0;
        span {
          margin-right: 0.133333rem;
        }
      }
      span {
        color: #c6c6c6;
        margin: 0;
      }
    }
  }
}
.NetMonitor {
  position: absolute;
  overflow-y: auto;
  background-color: #fff;
  top: 1.333333rem;
  bottom: 0;
  width: 95%;
  font-size: 0.333333rem;
  ul {
    li {
      display: flex;
      margin-right: 0.253333rem;
      justify-content: space-between;
      p {
        margin: 0;
      }
      span {
        margin: 0;
      }
    }
  }
}
</style>