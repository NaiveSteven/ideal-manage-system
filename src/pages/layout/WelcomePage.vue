<!--
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-05-22 17:11:46
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-10 00:12:41
-->
<template>
  <div class="welcome" id="welcome">
    <div class="content">
      <div class="sub-title">欢迎体验</div>
      <div class="title">Ideal-Manage-System</div>
    </div>
    <div class="img"></div>
  </div>
</template>

<script>
// import { drawWaterMark } from "@/utils/watermark"
// const config = {
//   fontWeight: "bold",
//   fontFamily: "黑体",
//   fillStyle: "rgba(0,0,0,0.2)",
//   canvasWidth: 500,
//   canvasHeight: 500,
//   textPostionX: 80,
//   textPostionY: 20,
//   zIndex: 999,
// }
export default {
  name: "welcome",
  mounted() {
    // drawWaterMark('车300伽马风控', 40, '24', config)
  }
}
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
