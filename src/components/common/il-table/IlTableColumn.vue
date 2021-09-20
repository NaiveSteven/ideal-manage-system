<!--
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-09-21 02:22:50
 * @LastEditors: mjqin
 * @LastEditTime: 2021-09-21 04:27:49
-->
<template>
  <el-table-column
    :key="props.tableCol.prop"
    v-bind="props.tableCol"
    v-if="!['index', 'expand', 'selection', undefined].includes(props.tableCol.type) || props.tableCol.slot"
  >
    <template #default="scope">
      <slot
        v-if="props.tableCol.slot"
        :name="props.tableCol.slot"
        :row="scope.row"
      />
      <component
        v-else-if="scope && scope.row"
        v-bind="props.tableCol.attrs"
        :is="getComponentName(props.tableCol.type)"
        v-model="scope.row[props.tableCol.prop]"
        :on="props.tableCol.on"
      />
    </template>
  </el-table-column>
  <el-table-column v-else :key="props.tableCol.prop" v-bind="props.tableCol"/>
</template>
<script lang="ts" setup>
import { ref } from "vue"
export interface ListItem {
  label: string
  value: string | number
  disabled?: boolean
}
export interface Pagination {
  page: number
  page_size: number
  total: number
}
export interface Props {
  tableCol: any
  isPagination?: boolean
  pagination?: Pagination
  options?: ListItem[]
}
const props = withDefaults(defineProps<Props>(), {
  tableCol: () => {},
})

const builtInNames = ref<string[]>(["input", "select", "radio"])

const getComponentName = (type: string | Function) => {
  type = typeof type === "function" ? type() : type

  if (builtInNames.value.includes(type as string)) {
    // 内置组件
    return "il-" + type
  } else {
    // 外部组件
    return type
  }
}
</script>
