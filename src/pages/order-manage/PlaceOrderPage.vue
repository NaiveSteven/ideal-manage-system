<template>
  <keep-alive>
    <el-tabs type="border-card" v-model="tabName">
      <el-tab-pane name="1">
        <template #label>
          <span><i class="el-icon-date"></i>未处理</span>
        </template>
        <PlaceOrderList deal_state="1" />
      </el-tab-pane>
      <el-tab-pane label="正在处理" name="2"
        ><PlaceOrderList deal_state="2"
      /></el-tab-pane>
      <el-tab-pane label="处理完成" name="3"
        ><PlaceOrderList deal_state="3"
      /></el-tab-pane>
    </el-tabs>
  </keep-alive>
</template>

<script>
import { PlaceOrderList } from "@/components"
export default {
  components: { PlaceOrderList },
  data() {
    return {
      tabName: "1",
    }
  },
}
</script>
