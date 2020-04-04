<template>
  <div class="container">
    <div class="content">
      <div class="text">
        <h4>亚马逊雨林为何燃烧？除了新总统“急功近利”的开发，国际资本才是真凶亚马逊雨林为何燃烧？除了新总统“急功近利”的开发，国际资本才是真凶</h4>
        <!-- 图片大于1小于三的时候显示 -->
        <div class="video">
          <img
            src="http://pic.vjshi.com/2019-01-03/69deeefdac4a33c444eee60b1002264d/online/puzzle.jpg?x-oss-process=style/watermark"
            alt
          />
          <router-link to="#">
            <i class="iconfont iconshipin"></i>
          </router-link>
        </div>
        <p>
          火星人哈哈
          <span>52跟帖</span>
        </p>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.container {
  font-size: 0.266667rem;
  padding-bottom: 0.2rem;
  border-bottom: 0.013333rem solid #e4e4e4;
  .content {
    display: flex;
    .text {
      flex: 2;
      display: flex;
      flex-direction: column;
      h4 {
        flex: 2;
        flex-wrap: wrap;
        margin-top: 0.2rem;
        margin-left: 0;
        font-size: 0.266667rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        -webkit-box-orient: vertical;
      }
      p {
        flex: 0;
        color: #93a4b7;
        margin: 0;
      }
    }
  }
}
.video {
  position: relative;
  margin: 0;
  margin-bottom: 0.2rem;
  object-fit: contain; //让图片不变形
  img {
    width: 100%;
    height: 2.8rem;
    flex-shrink: 0; //防止图片在flex布局下被挤压
  }
  a {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    i {
      position: absolute;
      width: 0.8rem;
      height: 0.8rem;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%); //让遮罩层居中
      background-color: rgba(14, 19, 111, 0.5);
      text-align: center;
      line-height: 0.8rem;
    }
    .iconfont {
      color: #fff;
      font-size: 0.666667rem;
    }
  }
}
</style>