<template>
  <div class="container">
    <navHead :data="head" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <div v-for="(item,index) in commentlist" :key="index">
        <img src="http://localhost:3000/uploads/image/IMG1585548195492.jpeg" alt />
        <div class="content">
          <p>{{item.user.nickname}}</p>
          <h4>{{item.content}}</h4>
          <span>{{moment(item.create_date).fromNow()}}</span> •
          <span @click="parent(index,item.id)">{{}}回复</span>
          <div class="reply" v-if="item.parent!=null">
            <p>
              <!-- <span>{{item.parent.user.nickname}}</span>
            <span>作者</span>:文章说的很有道理！文章说的很有道理！文章说的很有道理！文章说的很有道理！文章说的很有道理！文章说的很有道理！
              </p>-->
              <a href="#" @click="show1(index,item.id)">查看全部{{'...'}}条回复</a>
            </p>
          </div>
        </div>
      </div>
    </van-list>
    <div class="post" v-if="show">
      <replyall @myclick="show2()" :data2="data3" :arr3="arr4" />
    </div>
    <div class="footer">
      <van-field
        v-model="message"
        rows="1"
        :autosize="!isshow"
        type="textarea"
        placeholder="写评论..."
        @focus="iptfocus"
        :class="isshow?'':'active'"
        @blur="iptblur"
      />
      <div class="small" v-if="isshow">
        <van-button size="small" type="primary" @click="primarynth">发布</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import navHead from "../components/navHead";
import replyall from "../components/replyall";
import moment from "moment"; //引入日期格式文件
// 转换国际语言，zh-CN就是中文（en 就是默认的英文）
moment.locale("zh-CN");
export default {
  components: {
    navHead,
    replyall
  },
  data() {
    return {
      head: {
        title: "精彩跟帖",
        path: () => {
          this.$router.replace(this.$route.query.return_url);
        }
      },
      token: "", //本地token值
      moment, //日期插件
      message: "",
      id: "", //文章id
      isshow: false, //是否高度自适应
      row: 1, //行数
      commentlist: [],
      commentsum: "",
      show: false, //点击显示.
      data2: [],
      data3: {},
      arr2: [],
      arr4: [],
      loading: false,
      finished: false,
      pageindex: 1,
      isshow2: false,
      parent_id: "", //回复id 可以为空
      pageSize: 8
    };
  },
  mounted() {
    //1.获取文章的id
    this.id = Number(this.$route.query.return_url.split("/")[2]);
    this.token = JSON.parse(localStorage.getItem("data"));
    //2.1请求数据列表
    this.getlist();
  },
  methods: {
    //2.请求评论数据的列表,
    getlist() {
      this.isshow2 = true; //防止多次刷新的开关
      this.$axios({
        url: "/post_comment/" + this.id,
        params: {
          pageSize: this.pageSize,
          pageIndex: this.pageindex
        }
      }).then(Response => {
        const { data } = Response.data;

        //2.1把数据赋值给data
        this.commentlist = [...this.commentlist, ...data];
        this.isshow2 = false;
        console.log(this.commentlist);

        //处理一下传给子组件的内容
        let data2 = [];
        let arr = [];
        setTimeout(() => {
          this.commentlist.forEach((item, index) => {
            if (item.parent !== null) {
              getTotal(item);
              //递归到自己想要的数据
              function getTotal(data) {
                if (data.parent === null) {
                  return;
                } else {
                  data.parent.id2 = item.id;
                  arr.push(data.parent);
                  getTotal(data.parent);
                }
              }
              data2.push(item);
            } else {
              data2.push(item);
              this.data2 = data2;
            }
          });
          this.data2 = data2;
          this.arr2 = arr;
        }, 200);

        this.pageindex += 1;
        this.loading = false;
        //请求数据的条数小于设置的固定条数代表加载完毕了
        if (data.length < this.pageSize) {
          this.finished = true;
        }
      });
    },
    //发布按钮
    primarynth() {
      // console.log(parent_id);

      // console.log(this.id);
      console.log(this.token.token);
      if (this.message.trim() !== "") {
        this.$axios({
          url: "/post_comment/" + this.id,
          method: "post",
          headers: {
            Authorization: this.token.token
          },

          data: {
            content: this.message.trim(),
            parent_id: this.parent_id
          }
        }).then(Response => {
          console.log(Response);
          const { message } = Response.data;
          this.$toast.success(message);
          this.message = "";
          // 重新请求列表数据
          this.commentlist = []; // 必须要清空，如果不清空会合并之前的评论
          this.pageindex = 1; //让页数成1 从新请求数据
          this.getlist();
        });
      } else {
        return;
      }
    },
    //回复id
    parent(index, itemid) {
      this.show1(index, itemid);
      this.parent_id = itemid;
      if (this.message.trim() !== "") {
        primarynth();
      }
    },

    //获取焦点
    iptfocus() {
      this.isshow = true;
    },
    //失去焦点
    iptblur() {
      setTimeout(() => {
        this.isshow = false;
      }, 200);
    },
    //点击是否显示
    show1(index, itemid) {
      console.log(index, itemid);
      debugger;
      // setTimeout(() => {
      let vv = this.data2.filter(item => {
        return item.id === itemid;
      });
      this.data3 = vv[0];
      this.arr4 = this.arr2.filter(item => {
        return item.id2 === itemid;
        // });
        this.parent_id = itemid;
        if (this.message.trim() !== "") {
          primarynth();
        }
      });

      this.show = !this.show;
    },
    //点击隐藏子组件
    show2() {
      this.show = !this.show;
    },
    onLoad() {
      console.log("oo");

      this.getlist();
    }
  }
};
</script>
<style lang="less" scoped>
p {
  margin: 0.133333rem 0;
}
.container {
  position: relative;
  font-size: 0.266667rem;
  padding-bottom: 2rem;
  img {
    position: absolute;
    width: 0.8rem;
    border-radius: 50%;
  }
  .content {
    margin: 0 0 0 0.8rem;

    h4 {
      font-size: 0.333333rem;
      font-weight: 700;
      margin-bottom: 0.066667rem;
    }
    p {
      color: #3670d4;
    }
    .reply {
      background-color: #bbbfb0;
      // height: 1.7rem;
      margin-top: 0.133333rem;
      padding: 0.133333rem;
      p {
        // height: 0.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        -webkit-box-orient: vertical;
        // margin: 0.133333rem 0;
        span {
          color: #3670d4;
        }
      }
      a {
        color: #3670d4;
      }
      :nth-child(4) {
        background-color: #bbbfb0;
        border-radius: 0.333333rem;
        padding: 0 0.066667rem;
      }
    }

    .active {
      height: 0.96rem;
      width: 800px !important;
    }
  }

  .footer {
    position: fixed;
    display: flex;
    padding: 0.2rem;
    left: 10px;
    right: 10px;
    bottom: 0;
    background-color: #fff;
    /deep/ .van-cell {
      width: 100%;
      background-color: #cccccc;
      border-radius: 0.333333rem;
    }
    .small {
      margin-top: 1rem;
      margin-left: 10px;
      /deep/.van-button--primary {
        border-radius: 0.333333rem;
      }
    }
  }
  // .reply-content {
  //   padding-top: 0.2rem;
  //   p {
  //     font-size: 0.293333rem;
  //     margin-bottom: 0.266667rem;
  //     span {
  //       font-size: 0.266667rem;
  //       border: 0.013333rem solid #3670d4;
  //       border-radius: 0.093333rem;
  //       padding: 0 0.066667rem;
  //     }
  //   }
  // }
  // .reply-body2 {
  //   margin-top: 0.4rem;
  //   h4 {
  //     margin-bottom: 10px;
  //     font-size: 0.253333rem;
  //   }
  //   .content {
  //     :nth-child(4) {
  //       background-color: red;
  //       margin-left: 0.2rem;
  //     }
  //   }
  // }
  .post {
    position: fixed;
    top: 0.266667rem;
    background-color: #fff;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
}
</style>