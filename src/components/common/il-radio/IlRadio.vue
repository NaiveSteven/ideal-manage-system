<!--
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-09-19 00:56:14
 * @LastEditors: mjqin
 * @LastEditTime: 2021-09-19 01:16:00
-->
<template>
  <el-radio-group v-model="bindVal" v-bind="attrsAll" v-on="on">
    <el-radio
      v-for="(option, idx) in options"
      :key="`${option.value}_${idx}`"
      :label="option.value"
      :disabled="option.disabled"
    >
      {{ option.label }}
    </el-radio>
  </el-radio-group>
</template>
<script lang="ts" setup>
export interface ListItem {
  label: string
  value: string | number
  disabled?: boolean
}
export interface Props {
  modelValue?: string | number | Array<any> | Object | Boolean
  prop?: string
  attrs?: Object
  dynamicAttrs?: Object
  options?: Array<ListItem>
  on?: Object
}
// import { Props } from "@/interfaces/Common";
import { useAttrs } from "@/hooks/il-form/useAttrs"
const props = withDefaults(defineProps<Props>(), {
  on: () => ({} as Object),
  modelValue: () => ({} as any),
})
const emit = defineEmits(["update:modelValue", "input"])
const { bindVal, attrsAll } = useAttrs(props, emit)
</script>
