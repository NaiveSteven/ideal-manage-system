<!--
 * @Description: description
 * @Author: mjqin
 * @Date: 2021-09-15 11:17:00
 * @LastEditTime: 2021-09-26 19:40:12
 * @LastEditors: mjqin
-->
<template>
  <el-input v-model="bindVal" v-bind="attrsAll" v-on="onAll" />
</template>
<script lang="ts" setup>
export interface ListItem {
  label: string;
  value: string | number;
}
export interface Props {
  modelValue?: string | number | Array<any> | Object | Boolean;
  prop?: string;
  attrs?: Object;
  dynamicAttrs?: Object;
  options?: Array<ListItem>;
  on?: Object;
  rowData?: object;
}

import { useAttrs } from "@/hooks/il-form/useAttrs";
const props = withDefaults(defineProps<Props>(), {
  on: () => ({} as Object),
});
const emit = defineEmits(["input", "update:modelValue"]);
const { bindVal, attrsAll, onAll } = useAttrs(props, emit);
</script>
