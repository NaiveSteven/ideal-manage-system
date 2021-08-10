<!--
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-07-18 17:24:55
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-10 23:44:39
-->
<template>
  <keep-alive>
    <el-tabs type="border-card" v-model="tabNameRef">
      <el-tab-pane name="1">
        <template #label>
          <span><i class="el-icon-date"></i>未处理</span>
        </template>
        <PlaceOrderList deal_state="1" @toDetail="clickToDetail" />
      </el-tab-pane>
      <el-tab-pane label="正在处理" name="2"
        ><PlaceOrderList deal_state="2" @toDetail="clickToDetail"
      /></el-tab-pane>
      <el-tab-pane label="处理完成" name="3"
        ><PlaceOrderList deal_state="3" @toDetail="clickToDetail"
      /></el-tab-pane>
    </el-tabs>
  </keep-alive>
</template>

<script>
import { PlaceOrderList } from "@/components"
import { getCurrentInstance, ref } from "vue"
export default {
  components: { PlaceOrderList },
  setup() {
    const { ctx } = getCurrentInstance()
    const tabNameRef = ref("1")

    const clickToDetail = (row) => {
      ctx.$router.push({
        name: 'placeOrderDetail'
      })
    }

    return {
      tabNameRef,
      clickToDetail,
    }
  },
}
</script>
