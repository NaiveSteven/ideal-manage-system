<!--
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-09-19 01:37:33
 * @LastEditors: mjqin
 * @LastEditTime: 2021-09-22 01:35:18
-->
<template>
  <el-table ref="ilTable" v-bind="attrs">
    <template v-for="(item, index) in props.tableCols" :key="index">
      <il-table-column :tableCol="item" />
    </template>
  </el-table>
  <el-pagination
    v-if="props.isPagination"
    class="text-right mt-4"
    layout="total, prev, pager, next"
    :page-sizes="paginationSizes"
    background
    :small="true"
    :page-size="props.pagination.page_size"
    :current-page="props.pagination.page"
    :total="props.pagination.total"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  />
</template>
<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<script lang="ts" setup>
import { useAttrs } from "vue"

export interface ListItem {
  label: string
  value: string | number
}
export interface Pagination {
  page: number
  page_size: number
  total: number
}
export interface Props {
  isPagination?: boolean
  pagination?: Pagination
  paginationSizes?: number[]
  tableCols: any
}
const props = withDefaults(defineProps<Props>(), {
  isPagination: true,
  pagination: () => ({ page: 1, page_size: 10, total: 0 }),
  paginationSizes: () => [10, 20, 40, 50, 100],
})
const emit = defineEmits(["refresh"])
const attrs = useAttrs()

const handleCurrentChange = (val: number) => {
  props.pagination.page = val
  emit("refresh")
}
const handleSizeChange = (val: number) => {
  props.pagination.page = 1
  props.pagination.page_size = val
  emit("refresh")
}
</script>
