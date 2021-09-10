<template>
  <div class="user-manage">
    <el-card>
      <el-table class="w-full" :data="userList" v-loading="isTableLoading" body>
        <el-table-column
          v-for="item in columns"
          align="center"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column label="操作" width="140" align="center">
          <template #header>
            <el-input
              size="mini"
              v-model="formData.keyword"
              @change="getUserList"
              placeholder="请输入用户名称"
            />
          </template>
          <template #default="scope">
            <el-button type="text" @click="handleDetail(scope.row)" size="mini"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="text-right mt-6"
        background
        layout="prev, pager, next"
        :total="pager.total"
        :page-size="pager.limit"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>
<script setup>
import { getCurrentInstance, inject, onMounted, reactive, ref } from "vue"
import utils from "@/utils/utils"
import { ElMessage } from "element-plus"
const $api = inject("$api")
const userList = ref([])
const pager = reactive({
  page: 1,
  limit: 10,
  total: 10,
})
const formData = reactive({
  keyword: "",
})
const isTableLoading = ref(false)
// 定义动态表格-格式
const columns = reactive([
  {
    label: "用户ID",
    prop: "id",
    minWidth: 100,
  },
  {
    label: "用户名",
    prop: "name",
    minWidth: 120,
  },
  {
    label: "注册时间",
    prop: "createdAt",
    width: 180,
    formatter: (row, column, value) => {
      return utils.formateDate(new Date(value))
    },
  },
])
// 初始化接口调用
onMounted(() => {
  getUserList()
})
// 获取用户列表
const getUserList = async () => {
  isTableLoading.value = true
  const params = { keyword: formData.keyword, ...pager }
  try {
    const { count, rows } = await $api.getUserList(params)
    userList.value = rows
    pager.total = count
  } catch (error) {
    console.log(error)
    ElMessage.error(error.msg || error)
  }
  isTableLoading.value = false
}
// 分页事件处理
const handleCurrentChange = (current) => {
  pager.page = current
  getUserList()
}

const handleDetail = (row) => {
  return row
}
</script>

<style lang="scss"></style>
