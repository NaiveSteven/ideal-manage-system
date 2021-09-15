<!--
 * @Description: description
 * @Author: mjqin
 * @Date: 2021-09-15 14:47:36
 * @LastEditTime: 2021-09-15 14:47:36
 * @LastEditors: mjqin
-->
<template>
  <el-select
    v-model="bindVal"
    v-bind="attrsAll"
    v-on="on"
  >
    <el-option
      v-for="(option,idx) in props.options"
      :key="`${option.value}_${idx}`"
      :label="option.label"
      :value="option.value"
      :disabled="option.disabled"
    />
  </el-select>
</template>
<script>
import { useAttrs } from "@/hooks/components/il-form/useAttrs.ts";
const { bindVal, attrsAll, props } = useAttrs();
</script>