<template>
  <div class="welcome">
    <div class="content">
      <div class="sub-title">欢迎体验</div>
      <div class="title">Ideal-Manage-System</div>
    </div>
    <div class="img"></div>
  </div>
</template>

<script>
export default {
  name: "welcome",
};
</script>

<style lang="scss">
.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #fff;
  .content {
    position: relative;
    bottom: 40px;
    .sub-title {
      font-size: 30px;
      line-height: 42px;
      color: #333;
    }
    .title {
      font-size: 40px;
      line-height: 62px;
      color: #409eff;
    }
  }
  .img {
    margin-left: 105px;
    background-image: url("./../assets/images/welcome.png");
    width: 371px;
    height: 438px;
  }
}
</style>
