<!--
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-08-11 23:08:29
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-11 23:41:25
-->
<template>
  <el-card header="处理进度" class="mb-6">
    <el-steps :active="1">
      <el-step title="未处理" description="管理员未开始处理，请尽快处理哦！" />
      <el-step title="接受处理" description="管理员开始处理，请耐心等待。" />
      <el-step title="处理完成" description="嘻嘻，管理员已经处理完成！" />
    </el-steps>
  </el-card>
  <el-card header="付款进度">
    <el-steps :active="1">
      <el-step title="未付款" description="用户下订单，但未付款。" />
      <el-step
        title="已付款未发货"
        description="用户已经付款，管理员未发货。"
      />
      <el-step
        title="已发货未确认收到"
        description="商品已经发货，用户为点击确认呢收货。"
      />
      <el-step title="确认到货订单完成" description="订单已经完成！" />
    </el-steps>
  </el-card>
</template>

<script>
export default {
  name: "OrderStep",
  props: {
    deal_state: {
      type: Number,
      default: 1,
    },
    state: {
      type: Number,
      default: 1,
    },
  },
  setup() {},
}
</script>
