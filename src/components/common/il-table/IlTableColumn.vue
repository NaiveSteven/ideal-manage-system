<!--
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-09-21 02:22:50
 * @LastEditors: mjqin
 * @LastEditTime: 2021-09-26 18:44:00
-->
<template>
  <el-table-column
    v-bind="props.tableCol"
    v-if="!['index', 'expand', 'selection', undefined].includes(props.tableCol.type) || props.tableCol.slot"
  >
    <!-- header slot -->
    <template v-if="tableCol.headerSlot" #header="scope">
      <slot :name="tableCol.headerSlot" :column="scope.column" />
    </template>
    <template #default="scope">
      <!-- 支持自定义 -->
      <slot v-if="props.tableCol.slot" :name="props.tableCol.slot" :row="scope.row" />
      <!-- 按钮单独处理 -->
      <template v-if="props.tableCol.type === 'button'">
        <template v-for="(btn, index) in props.tableCol.btnList">
          <el-button
            v-if="!!btn.whenShowCb ? btn.whenShowCb(scope.row) : true"
            :key="index"
            :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
            :size="props.size"
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
        :size="size"
        :disabled="tableCol.isDisabled && tableCol.isDisabled(scope.row)"
        :row-data="scope.row"
        :options="tableCol.options"
      />
    </template>
  </el-table-column>
  <el-table-column v-else v-bind="props.tableCol">
    <!-- header slot -->
    <template v-if="tableCol.headerSlot" #header="scope">
      <slot :name="tableCol.headerSlot" :column="scope.column" />
    </template>
  </el-table-column>
</template>
<script lang="ts" setup>
import { ref, unref, computed } from "vue";
export interface ListItem {
  label: string;
  value: string | number;
  disabled?: boolean;
}
export interface Props {
  tableCol: any;
  options?: ListItem[];
  size?: string;
  rowData?: Array<any>;
}
const props = withDefaults(defineProps<Props>(), {
  tableCol: () => {},
});
const attrsAll = computed(() => {
  return props.tableCol.align ? { ...props.tableCol } : { ...props.tableCol, align: "center" };
});
const builtInNames = ref<string[]>(["input", "select"]);

const getComponentName = (type: string | Function) => {
  type = typeof type === "function" ? type() : type;

  if (unref(builtInNames).includes(type as string)) {
    // 内置组件
    return "il-" + type;
  } else {
    // 外部组件
    return type;
  }
};
</script>
