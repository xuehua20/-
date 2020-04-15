<template>
  <div class="box">
    <!-- <van-sticky> -->
    <div class="head">
      <p @click="$emit('myclick')">x</p>
      <p>{{arr3.length}}条回复</p>
      <p></p>
    </div>
    <div class="reply-head">
      <img :src="$axios.defaults.baseURL+data2.user.head_img" alt />
      <div class="content">
        <p>
          {{data2.user.nickname}}
          <span>楼主</span>
        </p>
        <p style="color:#000">{{data2.content}}</p>
        <!-- {{moment(item.create_date).format('MMM Do , h:mm:ss a')}} -->
        <span>{{moment(data2.create_date).format('MMM Do , h:mm:ss a')}}</span>
      </div>
    </div>
    <!-- </van-sticky> -->
    <div class="reply-content">
      <h4 class="h4">全部评论</h4>
      <div class="reply-body2" v-for="(item,index) in arr3" :key="index">
        <div class="reply-content">
          <img :src="$axios.defaults.baseURL+item.user.head_img" alt />
          <div class="content">
            <p>{{item.user.nickname}}</p>
            <h4>{{item.content}}</h4>
            <span>{{moment(item.create_date).format('MMM Do , h:mm:ss a')}}</span>
            <span>回复</span>
          </div>
        </div>
      </div>
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
        <van-button size="small" type="primary" @click="xx">发布</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment"; //引入日期格式文件
// 转换国际语言，zh-CN就是中文（en 就是默认的英文）
moment.locale("zh-CN");
// import replybody2 from "../components/replybody2";
export default {
  props: ["data", "data2", "arr3"],
  data() {
    return {
      message: "",
      isshow: false, //是否高度自适应
      row: 1,
      shwo: true,
      databody: [],
      moment
    };
  },
  methods: {
    //获取焦点
    iptfocus() {
      this.isshow = true;
    },
    //失去焦点
    iptblur() {
      this.isshow = false;
    },
    shwo3() {
      // this.$emit("myclick");
    },
    xx() {
      alert("xoxo ");
    }
  },
  mounted() {
    console.log(this.data2);
  },
  name: "replybody2" //声明当前组件名,在当前组件里面.自己调用自己
};
</script>
<style lang="less" scoped>
.h4 {
  margin: 0.2rem;
  font-size: 0.213333rem;
  font-weight: 400;
  margin-bottom: 0.066667rem;
}

.head {
  font-size: 0.333333rem;
  height: 0.8rem;
  line-height: 0.8rem;
  border-bottom: solid 0.013333rem #bbbfb0;
  display: flex;
  justify-content: space-between;
  padding: 0 0.266667rem;
  p {
    margin: 0;
  }
}
img {
  position: absolute;
  width: 0.8rem;
  border-radius: 50%;
}

.content {
  margin: 0 0 0 0.8rem;

  p {
    color: #3670d4;
  }
  .reply {
    height: 1.7rem;
    margin-top: 0.133333rem;
    padding: 0.133333rem;
    p {
      height: 0.8rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      overflow: hidden;
      -webkit-box-orient: vertical;

      span {
        color: #3670d4;
      }
    }
    a {
      color: #3670d4;
    }
  }
  :nth-child(4) {
    border-radius: 0.333333rem;
    padding: 0 0.066667rem;
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

  /deep/ .van-cell {
    width: 100%;
    // background-color: #cccccc;
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
.reply-content {
  padding-top: 0.2rem;
  p {
    font-size: 0.293333rem;
    margin-bottom: 0.266667rem;
    span {
      font-size: 0.266667rem;
      border: 0.013333rem solid #3670d4;
      border-radius: 0.093333rem;
      padding: 0 0.066667rem;
    }
  }
}
.reply-body2 {
  margin-top: 0.4rem;
  padding: 0 0.266667rem;
  h4 {
    margin-bottom: 10px;
    font-size: 0.253333rem;
  }
  .content {
    :nth-child(4) {
      background-color: red;
      margin-left: 0.2rem;
    }
  }
}
.reply-head {
  border-bottom: solid 0.013333rem #bbbfb0;
  padding: 0.333333rem;
  p {
    flex-wrap: wrap;
    // height: 1rem;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // display: -webkit-box;
    // -webkit-line-clamp: 3;
    // overflow: hidden;
    // -webkit-box-orient: vertical;
  }
}
</style>>
