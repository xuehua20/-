<template >
  <div class="container">
    <navHead :data="title" />
    <div class="userimg">
      <label for="img">
        <!-- 添加上传的组件 -->
        <van-uploader v-bind:after-read="afterRead" id="img" />
        <img :src="head_img" alt />
      </label>
    </div>
    <list v-for="item in listr" :key="item.name" :data="item" />
    <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="Changeuser(1)">
      <van-cell-group>
        <van-field placeholder="请输入昵称" v-model="user" />
      </van-cell-group>
    </van-dialog>
    <van-dialog v-model="showPassword" title="修改密码" show-cancel-button @confirm="Changeuser(2)">
      <van-cell-group>
        <van-field placeholder="请输入密码" v-model="password" type="password" />
      </van-cell-group>
    </van-dialog>
    <!--  close-on-click-action   选择好后隐藏上拉菜单 -->
    <van-action-sheet
      v-model="showGender"
      :actions="actions"
      cancel-text="取消"
      @select="Changeuser(3,$event)"
      close-on-click-action
    />
  </div>
</template>
<script>
import navHead from "../components/navHead";
import list from "../components/list";

export default {
  components: {
    //注册插件
    navHead,
    list
  },
  data() {
    return {
      //传给子组件的
      title: {
        title: "编辑资料",
        path: () => {
          //点击返回个人中心
          this.$router.replace("/personal");
        }
      },

      listr: [
        {
          name: "昵称",
          user: "火星网友",
          add: () => {
            this.show = true;
          }
        },
        {
          name: "密码",
          user: "******",
          add: () => {
            this.showPassword = true;
          }
        },
        {
          name: "性别",
          user: "0",
          add: () => {
            this.showGender = true;
          }
        }
      ],
      // 是否显示编辑昵称的弹窗
      show: false,
      // 是否显示编辑密码的弹窗
      showPassword: false,
      // 是否显示编辑性别的弹窗
      showGender: false,
      //性别选项
      actions: [
        {
          name: "男"
        },
        {
          name: "女"
        }
      ],
      localuser: [], //本地存储的
      head_img: "",
      user: "", //给弹窗输入框用
      password: ""
    };
  },
  mounted() {
    //组件加载完后触发
    let localuser = JSON.parse(localStorage.getItem("data"));
    //从本地获取到数据,进行赋值,好给其他的内容方便用
    this.localuser = localuser;
    //获取用户详情
    this.$axios({
      url: `/user/${localuser.user.id}`, //拼接动态id值传给后台
      //设置验证头需要的token值
      headers: {
        Authorization: localuser.token
      }
    }).then(response => {
      const { nickname, head_img, gender } = response.data.data; //获取数据成功后解构出来
      this.head_img = this.$axios.defaults.baseURL + head_img; //设置头像

      this.listr[0].user = nickname; //设置昵称
      this.user = nickname; //给弹窗的输入框用
      //要么男要么女
      if (gender === 1) {
        this.listr[2].user = "男";
      } else {
        this.listr[2].user = "女";
      }
    });
  },
  methods: {
    //上传图片和修改头像
    afterRead(file) {
      console.log(file.file);
      //上传头像
      const fd = new FormData();
      fd.append("file", file.file);
      this.$axios({
        url: "/upload",
        method: "post",
        headers: {
          //获取到本地的token值
          Authorization: this.localuser.token
        },
        data: fd
      }).then(response => {
        const { url } = response.data.data;
        //获取路径后.把服务器上的地址拼接给图片路径
        this.head_img = this.$axios.defaults.baseURL + url;
        //路径传给编辑请求
        this.edit({
          head_img: url
        });
      });
    },
    //发送修改用户信息的请求
    edit(data) {
      return this.$axios({
        url: "/user_update/" + this.localuser.user.id, //获取到id
        method: "post",
        headers: {
          //获取到本地的token值
          Authorization: this.localuser.token
        },
        data
      }).then(response => {
        this.$toast.success("修改成功"); //success 这个弹窗框插件成功后的提示
        console.log();
      });
    },
    //修改昵称,密码,性别的弹窗 请求
    Changeuser(data, event) {
      //编辑请求
      if (data === 1) {
        //以返回值形式来调用.成功后再修改页面,这种方式也叫Promise
        const edit = this.edit({
          nickname: this.user
        });
        console.log(edit);

        edit.then(response => {
          //同步修改当前页面显示信息
          this.listr[0].user = this.user;
        });
      } else if (data === 2) {
        const edit = this.edit({
          password: this.password
        });
        edit.then(response => {
          //密码修改成功后返回登录页
          this.$router.replace("/login");
        });
      } else {
        console.log(event.name);
        if (event.name === "女") {
          const edit = this.edit({
            gender: 0
          });
          edit.then(response => {
            this.listr[2].user = "女";
          });
        } else {
          const edit = this.edit({
            gender: 1
          });
          edit.then(response => {
            this.listr[2].user = "男";
          });
        }
      }
    }
    //跳转页面的
  }
};
</script>
<style lang="less" scoped>
.userimg {
  position: relative;
  display: flex;
  margin: 0.2rem 0;
  div {
    width: 100%;
    opacity: 0;
    position: absolute;
    right: 0;
  }
}
img {
  width: 1.733333rem;
  border-radius: 50%;
}
</style>