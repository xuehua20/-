<template>
  <div>
    <div class="head">
      <div class="newlogo">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="searchbtn">
        <router-link to="/search">
          <i class="iconfont iconsearch"></i>
          <span>搜索新闻</span>
        </router-link>
      </div>
      <div class="user">
        <router-link to="/personal" class="iconfont iconwode"></router-link>
      </div>
    </div>
    <!-- 页面滚动.它不变 -->
    <!-- sticky 是否粘性布局 -->
    <!-- @scroll 是记录滚动条的距离页面的顶部距离的 -->
    <van-tabs v-model="active" swipeable sticky @scroll="scrollRecord">
      <van-tab
        v-for="(item,index) in Categorylist"
        :key="index"
        :title="item.name"
        v-if="item.is_top===1"
      >
        <!-- 下拉刷新 -->
        <!-- @refresh="onRefresh" -->
        <van-pull-refresh v-model="refreshing">
          <!-- van的列表组件 -->
          <!-- @load 滚动到底部时候触发的函数 -->
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="我也是有底线的"
            @load="onLoad"
          >
            <div v-for="(item,index) in item.post" :key="index">
              <zujian1 :data="item" />
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import zujian1 from "../components/zujian1"; //引入组件

export default {
  //用来确认是否缓存页面
  name: "index88",
  components: {
    //注册组件
    zujian1
  },
  data() {
    return {
      token: "", //本地token值
      active: 1,
      refreshing: false,
      // finished: false,
      // loading: false,
      Categorylist: [], //文章列表
      pageIndex: 1
    };
  },
  watch: {
    active() {
      //监听栏目的索引
      this.getArticlelist();
      //11.当栏目切换变化的时候开始记录原先位置.加个定时器好让同步执行,等数据渲染完再滚动
      setTimeout(() => {
        window.scrollTo(200, this.Categorylist[this.active].scrollY);
      }, 5);
    }
  },
  mounted() {
    let div1 = document.querySelector(".van-tabs__wrap");
    let div = document.createElement("div");
    div.innerHTML = `<div class="administration">
        <a href="./Programa" class="iconfont iconjiantou1"></a>
      </div>`;
    div1.appendChild(div);
    //1.获取本地token值,
    const { token } = JSON.parse(localStorage.getItem("data")) || [];
    //4.1从本地把数据拿出来
    const Categorylist = JSON.parse(localStorage.getItem("Categorylistdata"));

    //1.1赋值给data里面的token
    this.token = token;
    //4.渲染数据前进行判断判断
    //4.2如果本地有数据.就不请求文章栏目列表了
    if (Categorylist) {
      //4.3进行是否是登录状态,1.有登录但是第一条名字不是关注的,或者第一条是关注,但是没有登录的.都重新求一次,
      if (
        (token && Categorylist[0].name != "关注") ||
        (Categorylist[0].name === "关注" && !token)
      ) {
        this.getCategorylist();
        // this.handleCategories(); //循环加上自己的页数等,并且请求文章列表
      } else {
        //4.4都不满足的情况下.直接把本地数据赋值给data里面的文章栏目
        this.Categorylist = Categorylist;
        this.handleCategories(); //循环加上自己的页数等
      }
    } else {
      //4.4本地没有数据的请求一次
      this.getCategorylist();
      // this.handleCategories();,把请求直接放在请求栏目列表的时候就操作了
    }
  },
  methods: {
    onLoad() {
      // this.Categorylist[this.active].pageIndex += 1;
      this.getArticlelist();
    },
    //2.封装请求栏目的函数
    getCategorylist() {
      //2.1判断是否有token值,有就加上请求头,没有就不加
      const config = {
        url: "/category"
      };
      if (this.token) {
        //2.2有对象赋值方式加上请求头
        config.headers = {
          Authorization: this.token
        };
      }
      this.$axios(config).then(Response => {
        const { data } = Response.data;
        //2.3赋值给data里面
        this.Categorylist = data;
        //2.4存储进本地
        localStorage.setItem("Categorylistdata", JSON.stringify(data));
        this.handleCategories();
      });
    },
    //5.封装栏目文章内容
    getArticlelist() {
      //5.1获取栏目列表拿到里面的id
      const { id, pageIndex, finished, name, isload } = this.Categorylist[
        this.active
      ];
      //8.判断一下文章栏目是否是true已经加载完毕.加载完毕后无需再加载
      if (finished || isload) {
        return;
      }
      //12.2,打开表示请求了几次
      this.Categorylist[this.active].isload = true;
      //9.请求有关注类名的文章
      const config = {
        url: "/post",
        params: {
          //params可以代替问号?=值得形式赋值在请求连接里
          pageIndex, // 每个栏目页数是不一样的
          pageSize: 5, //  请求数据的条数
          category: id
        }
      };
      //9.1判断第一条的名字是不是等于关注.是的话就加上请求头
      if (name === "关注") {
        config.headers = {
          Authorization: this.token
        };
      }
      //获取文章列表
      this.$axios(config).then(Response => {
        const { data, total } = Response.data;
        //7赋值给data里面的数据,赋值方式要进行合并.不然不会刷新
        this.Categorylist[this.active].post = [
          ...this.Categorylist[this.active].post,
          ...data
        ];
        //7.1再展开一下,以赋值的方式才会有刷新
        this.Categorylist = [...this.Categorylist];
        //12.3请求成功后让它成为false
        this.Categorylist[this.active].isload = false;
        //7.2判断一下是否加载完毕
        this.Categorylist[this.active].loading = false;
        //7.3判断一下是否加载到了总页数total.是的话就显示我也是有底线的,,
        if (
          this.Categorylist[this.active].post.length === total ||
          this.Categorylist[this.active].post.length === 0
        ) {
          this.Categorylist[this.active].finished = true;
        }
      });
      this.Categorylist[this.active].pageIndex += 1; //请求成功了再页数加1
    },
    //6每个栏目都有自己的页数和自己的文章列表跟自己的是否加载完毕,和正在加载
    handleCategories() {
      this.Categorylist = this.Categorylist.map(value => {
        value.pageIndex = 1; //页数
        value.post = []; //自己的文章列表
        value.finished = false; //自己的是否加载完毕
        value.loading = false; //自己的是否正在加载
        value.scrollY = 0;
        value.isload = false; //12加个加载开关,防止页面多请求
        return value;
      });
      this.getArticlelist(); //请求文章列表
    },
    //10监听页面滚动记录,
    scrollRecord(data) {
      //10.1监听成功后赋值给每个栏目自己的列表scroll,如果栏目文章里面还没有数据是空就不记录并且return掉
      if (this.Categorylist.length === 0) {
        return;
      }
      const { scrollTop } = data;
      this.Categorylist[this.active].scrollY = scrollTop;
    }
  }
};
</script>
<style lang="less" scoped>
.head {
  padding: 0.066667rem 0.266667rem;
  display: flex;
  height: 0.8rem;
  line-height: 0.733333rem;
  justify-content: space-between;
  font-size: 0.333333rem;
  background-color: #ff0000;
  .newlogo {
    width: 0.733333rem;
    text-align: center;
    .iconfont {
      font-size: 0.666667rem;
      color: #fff;
    }
  }
  .searchbtn {
    flex: 2;
    background-color: rgb(248, 121, 121);
    text-align: center;
    margin: 0 0.133333rem;
    border-radius: 0.333333rem;
    .iconfont {
      font-size: 0.333333rem;
      color: #fff;
    }
    span {
      font-size: 0.266667rem;
      color: #fff;
    }
    a {
      border-radius: 0.333333rem;
      display: block;
    }
  }
  .user {
    width: 0.733333rem;
    text-align: center;
    .iconfont {
      font-size: 0.4rem;
      color: #fff;
    }
  }
}
// .tabnav {
/deep/.van-tabs__nav {
  background-color: #e4e4e4;
}

/deep/.van-tabs__wrap {
  position: relative;
  z-index: 999;
  .administration {
    //控制箭头的
    background-color: #e4e4e4;
    width: 0.773333rem;
    height: 44px;
    position: absolute;
    right: 0;
    top: 0;
    text-align: center;
    a {
      position: absolute;
      width: 44px;
      height: 44px;
      line-height: 44px;
      right: 0;
      font-size: 19px;
      transform: rotate(90deg);
    }
  }
}
/deep/.van-tabs__line {
  z-index: 0;
}
/deep/ .van-tab {
  flex-basis: 15% !important;
}

// }
</style>