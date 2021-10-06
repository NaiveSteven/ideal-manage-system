<template>
  <el-card>
    <il-table
      ref="testTable"
      :data="userList"
      :loading="isTableLoading"
      :tableCols="tableCols"
      :pagination="pagination"
      @refresh="getUserList"
    >
      <template #header>
        <el-input
          size="mini"
          v-model="formData.keyword"
          @change="getUserList"
          placeholder="请输入用户名称"
        />
      </template>
    </il-table>
  </el-card>
</template>
<script lang="ts" setup>
import { inject, onMounted, reactive, ref } from "vue"
import { ElMessage } from "element-plus"
import { useTableData } from "@/hooks/components/useTableData"
import { ConsumerItem } from "@/interfaces/UserManage"
import { TABLE_COLS } from "./const/consumerConst"

const $api = inject("$api") as { [index: string]: Function }
const $message = inject("$message") as typeof ElMessage
const userList = ref([])
const formData = reactive({
  keyword: "",
})

const { pagination, tableCols, isTableLoading } = useTableData(
  TABLE_COLS(handleEdit, handleDel, handleDetail)
)

onMounted(() => {
  getUserList()
})

const getUserList = async () => {
  isTableLoading.value = true
  const params = { keyword: formData.keyword, ...pagination }
  try {
    const { count, rows } = await $api.getUserList(params)
    userList.value = rows
    pagination.total = count
  } catch (error) {
    console.log(error)
    $message.error(error.msg || error)
  }
  isTableLoading.value = false
}

function handleDetail(row: ConsumerItem) {
  return row
}

function handleEdit() {}
function handleDel() {}
</script>

<style lang="scss"></style>
