<template>
  <div class="container">
    <navHead :data="head" />
    <div class="channel-remove">
      <p>点击删除以下频道</p>
      <div class="channel-remove-item">
        <ul>
          <li
            v-for="(item,index) in itemtop "
            :key="index"
            @click="removeItem(item,index)"
            v-if="item.is_top===1"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="channel-push channel-remove">
      <p>点击添加以下频道</p>
      <div class="channel-push-item channel-remove-item">
        <ul>
          <li
            v-for="(item,index) in itembottom "
            :key="index"
            @click="pushItem(item,index)"
            v-if="item.is_top===0"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import navHead from "../components/navHead";
export default {
  components: {
    navHead
  },
  data() {
    return {
      head: {
        title: "栏目管理",
        path: () => {
          //点击返回个人中心
          this.$router.replace("/index");
        }
      },
      Categorys: [],
      itemtop: [],
      itembottom: []
    };
  },
  mounted() {
    //1.先获取本地的栏目列表
    const Categorys = JSON.parse(localStorage.getItem("Categorylistdata"));
    this.Categorys = Categorys;
    //2筛选一下,有关注和头条的栏目不能被移动和删除,并且把它保存成两个新数组
    this.itemtop = this.Categorys.filter(item => {
      return item.is_top === 1;
    });
    this.itembottom = this.Categorys.filter(item => {
      return item.is_top === 0;
    });
  },
  methods: {
    //3点击进行操作数组
    removeItem(item, index) {
      //4进行判断一下,头条和关注不允许删除
      if (item.name === "关注" || item.name === "头条") {
        return;
      }
      //5点击标签后移出
      // let restext = this.itemtop.splice(index, 1);
      this.itemtop.splice(index, 1);
      item.is_top = 0;
      //5.1并把里面的is_top改为0

      this.itembottom.push(item);
      // console.log(this.itembottom);
    },
    //5.2同样
    pushItem(item, index) {
      this.itembottom.splice(index, 1);
      item.is_top = 1;
      this.itemtop.push(item);
    }
  },
  //生命周期,里面页面销毁时触发的函数
  //6.页面销毁时保存到本地
  destroyed() {
    //6.1把两个数组合并后保存到本地
    this.Categorys = [...this.itemtop, ...this.itembottom];
    // 给数组最后添加一个跳转到栏目管理的图标
    this.Categorys.push({
      name: "2"
    });
    console.log(this.Categorys);
    //6.2保存的原本的数组里面
    localStorage.setItem("Categorylistdata", JSON.stringify(this.Categorys));
  }
};
</script>
<style lang="less" scoped>
p {
  margin: 0;
  font-size: 0.266667rem;
  font-weight: 700;
}
ul {
  margin-top: 0.2rem;
}
.container {
  font-size: 0.333333rem;
  .channel-remove-item {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: right;

      li {
        width: 20%;
        margin: 0.133333rem;
        text-align: center;
        padding: 0.133333rem 0;
        border: 0.013333rem solid #cccccc;
      }
      :nth-child(1) {
        background-color: #f0f0f0;
      }
      :nth-child(2) {
        background-color: #f0f0f0;
      }
    }
  }
  .channel-push-item {
    ul {
      :nth-child(1) {
        background-color: transparent;
      }
      :nth-child(2) {
        background-color: transparent;
      }
    }
  }
}
</style>