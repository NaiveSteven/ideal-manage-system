<!--
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-09-19 01:37:33
 * @LastEditors: mjqin
 * @LastEditTime: 2021-09-21 03:19:50
-->
<template>
  <el-table ref="ilTable" v-bind="attrs">
    <template v-for="(item, index) in props.tableCols" :key="index">
      <il-table-column :tableCol="item" :isPagination="props.isPagination" :pagination="props.pagination"/>
    </template>
  </el-table>
</template>
<script lang="ts" setup>
import { useAttrs } from "vue"

export interface ListItem {
  label: string
  value: string | number
}
export interface Pagination {
  page: number;
  page_size: number;
  total: number;
}
export interface Props {
  isPagination?: boolean;
  pagination?: Pagination;
  tableCols: any;
}
const props = withDefaults(defineProps<Props>(), {
  isPagination: true,
  pagination: () => ({ page: 1, page_size: 10, total: 0 })
})
const attrs = useAttrs()
</script>
