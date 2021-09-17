<!--
 * @Description: description
 * @Author: mjqin
 * @Date: 2021-09-15 14:51:46
 * @LastEditTime: 2021-09-17 18:45:23
 * @LastEditors: mjqin
-->
<template>
  <el-form v-bind="formConfig" ref="formRefs" :model="formModel">
    <div class="c-form">
      <il-container class="c-form__row" v-bind="rowLayout">
        <il-col v-for="(col, colIndex) in formatedSchema" v-bind="colLayout" :key="colIndex">
          <slot v-if="col.slot" :name="col.slot" />
          <template v-else>
            <!-- 具体组件的配置项目 -->
            <il-form-item
              :ref="'formItem' + colIndex"
              v-bind="col.formItem"
              :prop="col.prop"
              :col="col"
              :form-model="formModel"
              :options="options"
              v-on="attrs"
            />
          </template>
        </il-col>
      </il-container>
    </div>
  </el-form>
</template>
<script lang="ts" setup>
import { cloneDeep } from "lodash";
import IlFormItem from "./IlFormItem.vue";
import { computed, useAttrs, defineExpose } from "vue";
import { FormItemConfigItem } from "@/interfaces/IlForm";
import { useFormMethods } from "@/hooks/il-form/useFormMethods";

export interface Layout {
  rowLayout: Object;
  colLayout: Object;
}

export interface Props {
  layout?: Layout;
  formConfig?: Object;
  formItemConfig?: Array<FormItemConfigItem>;
  formModel?: Object;
  options?: Object;
}

const attrs = useAttrs();

// const formRefs = ref<Nullable<FormActionType>>(null);

const { validate, validateField, resetFields, scrollToField, clearValidate } = useFormMethods();

const props = withDefaults(defineProps<Props>(), {
  layout: () => {
    return {
      rowLayout: {
        gutter: 0,
        interval: 0,
        justify: "start",
        direction: "row",
      },
      colLayout: {
        xs: 24,
        sm: 12,
        md: 12,
        lg: 8,
        xl: 8,
      },
    };
  },
});

const rowLayout = computed(() => {
  return props.layout.rowLayout
    ? props.layout.rowLayout
    : {
        gutter: 0,
        interval: 0,
        justify: "start",
        direction: "row",
      };
});

const colLayout = computed(() => {
  return props.layout.colLayout
    ? props.layout.colLayout
    : {
        xs: 24,
        sm: 12,
        md: 12,
        lg: 8,
        xl: 8,
      };
});

const formatedSchema = computed(() => {
  const _schema = cloneDeep(props.formItemConfig);
  return _schema.filter((item: FormItemConfigItem) => !isHide(item));
});

function isHide(item: FormItemConfigItem) {
  return typeof item.hide === "function" ? item.hide() : item.hide;
}

defineExpose({
  validate,
  validateField,
  resetFields,
  scrollToField,
  clearValidate,
});
</script>
