<!--
 * @Description: description
 * @Author: mjqin
 * @Date: 2021-09-15 14:47:36
 * @LastEditTime: 2021-09-26 19:28:19
 * @LastEditors: mjqin
-->
<template>
  <el-select v-model="bindVal" v-bind="attrsAll" v-on="onAll">
    <el-option
      v-for="(option, idx) in props.options"
      :key="`${option.value}_${idx}`"
      :label="option.label"
      :value="option.value"
      :disabled="option.disabled"
    />
  </el-select>
</template>
<script lang="ts" setup>
export interface ListItem {
  label: string;
  value: string | number;
  disabled?: boolean;
}
export interface Props {
  modelValue?: string | number | Array<any> | Object | Boolean;
  prop?: string;
  attrs?: Object;
  dynamicAttrs?: Object;
  options?: Array<ListItem>;
  on?: Object;
}
// import { Props } from "@/interfaces/Common";
import { useAttrs } from "@/hooks/il-form/useAttrs";
const props = withDefaults(defineProps<Props>(), {
  on: () => ({} as Object),
  modelValue: () => ({} as any),
});
const emit = defineEmits(["update:modelValue", "input"]);
const { bindVal, attrsAll, onAll } = useAttrs(props, emit);
</script>
