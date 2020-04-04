<template>
  <div>
    <div class="head">
      <div class="newlogo">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="searchbtn">
        <a href="#">
          <i class="iconfont iconsearch"></i>
          <span>搜素新闻</span>
        </a>
      </div>
      <div class="user">
        <router-link to="/personal" class="iconfont iconwode"></router-link>
      </div>
    </div>
    <!-- 页面滚动.它不变 -->
    <!-- sticky 是否粘性布局 -->
    <!-- @scroll 是记录滚动条的距离页面的顶部距离的 -->
    <van-tabs v-model="active" swipeable sticky @scroll="historyscroll">
      <van-tab v-for="(item, index) in navcolumn" :key="index" :title="item.name">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <!-- van的列表组件 -->
          <!-- @load 滚动到底部时候触发的函数 -->
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="我也是有底线的"
            @load="onLoad"
            :immediate-check="false"
          >
            <div>
              <div v-for="(subItem,index) in item.posts" :key="index">
                <zujian1 :data="subItem" />
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import zujian1 from "../components/zujian1";
export default {
  data() {
    return {
      active: 0,
      navcolumn: [], //导航栏目
      token: "", //本地数据
      columncontent: [], //栏目文章列表
      // loading: false, // 是否正在加载中
      // finished: false, // 是否已经加载完毕
      refreshing: false // 是否正在下拉加载
      // list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  },
  components: {
    //注册组件
    zujian1
  },
  watch: {
    active() {
      // console.log(this.active);
      //开始数据分页请求
      this.getList();
      //当active栏目变化的时候.使用原生方法进行记录滚动的位置并赋值
      //建个定时器.让this.getList()数据加载完毕渲染后才触发
      setTimeout(() => {
        window.scrollTo(0, this.navcolumn[this.active].scroll);
      }, 20);
    }
  },
  mounted() {
    let div1 = document.querySelector(".van-tabs__wrap");
    let div = document.createElement("div");
    div.innerHTML = `<div class="administration">
        <a href="./personal" class="iconfont iconjiantou1"></a>
      </div>`;
    div1.appendChild(div);
    this.token = JSON.parse(localStorage.getItem("data")) || []; //请求本地token值
    const navcolumn = JSON.parse(localStorage.getItem("navcolumn")) || [];
    //请求栏目数据
    if (navcolumn.length) {
      //1.登录状态上的请求
      if (navcolumn[0].name != "关注" && this.token.token) {
        // 第一条的名字不等于关注并且有token值进来
        const headers = {
          Authorization: this.token.token
        };
        this.columnaxios("/category", headers);
      }
      if (navcolumn[0].name === "关注" && !this.token.token) {
        // 如果第一条是关注,但是没有token值进来
        this.columnaxios("/category", "");
      }
      this.navcolumn = navcolumn; //如果本地有数据.就直接赋值
      this.columnpageIndex(); //循环给栏目列表添加页数属性
    } else {
      //2.没有登录的情况下
      this.$axios({
        url: "/category"
      }).then(response => {
        const { data } = response.data;
        localStorage.setItem("navcolumn", JSON.stringify(data));
        this.navcolumn = data;
        this.columnpageIndex();
      });
    }
  },
  methods: {
    onLoad() {
      // console.log(this.navcolumn[this.active].pageIndex);
      //if (this.navcolumn[this.active].loading == false) {
      this.getList();
      //}

      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(1);
      //   }

      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 10) {
      //     this.finished = true;
      //   }
      // }, 5000);
      // console.log(this.list);
    },
    onRefresh() {
      // 表示加载完毕
      this.refreshing = false;
      console.log("正在下拉刷新");
    },
    //发送栏目请求函数
    columnaxios(url, headers) {
      this.$axios({
        url: url,
        headers
      }).then(response => {
        const { data } = response.data;
        localStorage.setItem("navcolumn", JSON.stringify(data));
        this.navcolumn = data;
      });
    },
    //给每个栏目循环加上pageIndex等各种专属 属性
    columnpageIndex() {
      this.navcolumn = this.navcolumn.map(value => {
        value.pageIndex = 1; //添加页面的页数属性,给分页使用,
        value.posts = []; //新建每个文章独立的空数组.方便数据不会出现重复
        value.finished = false; //给每个栏目的文章列表确实是否是加载到了最后一页
        value.loading = false; //每个栏目里面确认自己是否加载完毕了
        value.isload = false; //  加了一个isload来判断当前是否正在加载,如果在加载就不请求
        value.scroll = 0; //每个栏目有自己的独立记录滚动条位置的属性
        return value;
      });
      //页面加载首先加载的是头条里面的内容
      this.getList();
    },
    //封装栏目分页的数据请求
    getList() {
      const { id, pageIndex, finished, isload, name } = this.navcolumn[
        this.active
      ];
      // console.log(id, pageIndex, finished, isload, name);

      //建立一个开关
      //console.log(finished);
      if (finished || isload) {
        //如果他是ture 后面代码就不再执行
        return;
      }
      this.navcolumn[this.active].isload = true;
      //有关注栏目的文章请求.判断一下第一个是否是关注.是的话就要加上token
      // let headers = "";

      // if (name === "关注") {
      //   headers = {
      //     Authorization: this.token.token
      //   };
      // }
      // 请求文章的配置
      const config = {
        url: "/post",
        params: {
          pageIndex, // 每个栏目页数是不一样的
          pageSize: 5, //  请求数据的条数
          category: id
        }
      };
      // 判断当前栏目是否是关注栏目
      if (name === "关注") {
        // 如果是的话就需要加上token
        config.headers = {
          Authorization: this.token.token
        };
      }
      //解构出栏目id 和当前点击获取的页数
      this.$axios(config).then(response => {
        //  加了一个isload来判断当前是否正在加载
        // 如果还在加载的话就不请求
        // 然后把页面加1放到请求成功了就加1
        this.navcolumn[this.active].isload = false;
        //解构出每个栏目自己的新文章列表和总页数,进行合并到自己的post素组中
        const { data, total } = response.data;
        // console.log(total);

        //console.log(response);
        // 把新的文章数据合并到原来的文章列表中
        // debugger;
        this.navcolumn[this.active].posts = [
          ...this.navcolumn[this.active].posts,
          ...data
        ];
        this.navcolumn = [...this.navcolumn];
        //告诉浏览器是否已经加载完毕
        this.navcolumn[this.active].loading = false;
        //如果文章条数等于总条数total就是加载完毕
        // 是否是最后一页
        if (
          this.navcolumn[this.active].posts.length === total ||
          this.navcolumn[this.active].posts.length === 0
        ) {
          //debugger;
          // 当前栏目的文章已经加载完毕
          this.navcolumn[this.active].finished = true;
        }

        this.navcolumn[this.active].pageIndex += 1; //请求成功了再页数加1

        // console.log(this.navcolumn[this.active]);
      });
    },
    //滚动条历史记录,只负责监听滚动位置
    historyscroll(data) {
      console.log(data);
      const { scrollTop } = data;
      //先判断一下this.navcolumn[this.active] 是否有数据.有再记录位置,
      if (this.navcolumn.length === 0) {
        return;
      }
      this.navcolumn[this.active].scroll = scrollTop;
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