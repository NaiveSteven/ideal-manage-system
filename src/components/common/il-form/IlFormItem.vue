<!--
 * @Description: description
 * @Author: mjqin
 * @Date: 2021-09-15 15:14:40
 * @LastEditTime: 2021-09-15 16:51:38
 * @LastEditors: mjqin
-->
<template>
  <el-form-item :prop="col.prop" v-bind="col.formItem" class="c-form-item">
    <!-- <c-txt v-if="col.type === 'txt'" v-bind="col.attrs" :class="[col.attrs ? col.attrs.textClass : '', 'c-w-full']">{{ formModel[col.prop] }}</c-txt> -->
    <component
      v-bind="col.attrs"
      :is="getComponentName(col.type)"
      ref="component"
      :prop="col.prop"
      :value="formModel[col.prop]"
      :modifier="col.modifier"
      :dynamic-attrs="col.dynamicAttrs"
      :on="col.on"
      :options="options[col.prop]"
    />
    <!-- <template #label><slot v-if="col.frontSlot" :name="col.frontSlot" /></template>
    <template #error><slot v-if="col.rearSlot" :name="col.rearSlot" /></template> -->
  </el-form-item>
</template>

<script lang="ts" setup>
import { ref } from "vue";

export interface Props {
  formModel: Object;
  options: Object;
  col: Object;
}

const props = withDefaults(defineProps<Props>(), {
  formModel: () => ({} as Object),
  options: () => ({} as Object),
  col: () => ({} as Object),
});

const builtInNames = ref<string[]>(["input", "select"]);

const getComponentName = (type: string | Function) => {
  type = typeof type === "function" ? type() : type;

  if (builtInNames.value.includes(type as string)) {
    // 内置组件
    return "il-" + type;
  } else {
    // 外部组件
    return type;
  }
};
</script>
