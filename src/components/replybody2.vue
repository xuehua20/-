<template>
  <div>
    <div class="reply-body2" v-for="(item,index) in data" :key="index">
      <div class="reply-content">
        <img :src="$axios.defaults.baseURL+item.user.head_img" alt />
        <div class="content">
          <p>{{item.user.nickname}}</p>
          <h4>{{item.content}}</h4>
          <span>{{moment(item.create_date).format('MMM Do , h:mm:ss a')}}</span>
          <span>回复</span>
        </div>
      </div>
      <replybody2 v-if="(item.parent)" :data="item.parent" />
    </div>
  </div>
</template>
<script>
import moment from "moment"; //引入日期格式文件
// 转换国际语言，zh-CN就是中文（en 就是默认的英文）
moment.locale("zh-CN");

export default {
  props: ["data"],

  data() {
    return {
      moment
    };
  },
  name: "replybody2", //声明当前组件名,在当前组件里面.自己调用自己
  mounted() {}
};
</script>
<style lang="less" scoped>
img {
  position: absolute;
  width: 0.8rem;
  border-radius: 50%;
  margin-right: 15px;
}
.reply-body2 {
  margin-top: 0.4rem;
  padding: 0 0.266667rem;
  h4 {
    margin-bottom: 10px;
    font-size: 0.253333rem;
  }
  .content {
    margin: 0 0 0 0.8rem;
    :nth-child(4) {
      background-color: red;
      margin-left: 0.2rem;
    }
  }
}
</style>