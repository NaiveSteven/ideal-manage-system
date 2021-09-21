<!--
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-09-21 02:22:50
 * @LastEditors: mjqin
 * @LastEditTime: 2021-09-22 01:29:43
-->
<template>
  <el-table-column
    :key="props.tableCol.prop"
    v-bind="props.tableCol"
    v-if="
      !['index', 'expand', 'selection', undefined].includes(
        props.tableCol.type
      ) || props.tableCol.slot
    "
  >
    <template #default="scope">
      <!-- 支持自定义 -->
      <slot
        v-if="props.tableCol.slot"
        :name="props.tableCol.slot"
        :row="scope.row"
      />
      <!-- 按钮单独处理 -->
      <template v-if="props.tableCol.type === 'button'">
        <template v-for="(btn, index) in props.tableCol.btnList">
          <el-button
            v-if="!!btn.whenShowCb ? btn.whenShowCb(scope.row) : true"
            :key="index"
            :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
            v-bind="btn"
            @click="btn.click(scope.row)"
          >
            {{ btn.label }}
          </el-button>
        </template>
      </template>
      <!-- type除了selection、index、expand，还支持其他组件 -->
      <component
        v-else
        v-bind="props.tableCol.attrs"
        :is="getComponentName(props.tableCol.type)"
        v-model="scope.row[props.tableCol.prop]"
        :on="props.tableCol.on"
      />
    </template>
  </el-table-column>
  <el-table-column v-else :key="props.tableCol.prop" v-bind="props.tableCol" />
</template>
<script lang="ts" setup>
import { ref, unref } from "vue"
export interface ListItem {
  label: string
  value: string | number
  disabled?: boolean
}
export interface Props {
  tableCol: any
  options?: ListItem[]
}
const props = withDefaults(defineProps<Props>(), {
  tableCol: () => {},
})

const builtInNames = ref<string[]>(["input", "select", "radio"])

const getComponentName = (type: string | Function) => {
  type = typeof type === "function" ? type() : type

  if (unref(builtInNames).includes(type as string)) {
    // 内置组件
    return "il-" + type
  } else {
    // 外部组件
    return type
  }
}
</script>
