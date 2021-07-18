<template>
  <el-tabs type="border-card" v-model="tabName">
    <el-tab-pane name="1">
      <template #label>
        <span><i class="el-icon-date"></i>未处理</span>
      </template>
      <PlaceOrderList />
    </el-tab-pane>
    <el-tab-pane label="正在处理" name="2">正在处理</el-tab-pane>
    <el-tab-pane label="处理完成" name="3">处理完成</el-tab-pane>
  </el-tabs>
</template>

<script>
import PlaceOrderList from "../components/order/PlaceOrderList.vue"
export default {
  components: { PlaceOrderList },
  data() {
    return {
      tabName: "1",
    }
  },
}
</script>
