<!--
 * @Description: description
 * @Author: mjqin
 * @Date: 2021-09-15 14:51:46
 * @LastEditTime: 2021-09-15 16:25:28
 * @LastEditors: mjqin
-->
<template>
  <el-form v-bind="formConfig" ref="form" :model="formModel">
    <div class="c-form">
      <c-container class="c-form__row" v-bind="rowLayout">
        <c-col v-for="(col, colIndex) in formatedSchema" v-bind="getColLayout(col)" :key="colIndex">
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
        </c-col>
      </c-container>
    </div>
  </el-form>
</template>
<script lang="ts" setup>
import { cloneDeep } from "lodash";
import IlFormItem from "./IlFormItem.vue";
import { computed, useAttrs } from "vue";

export interface Layout {
  rowLayout: Object;
  colLayout: Object;
}

export interface FormItemConfigItem {
  type: string;
  prop: string;
  formItem: {
    [index: string]: string;
  };
  attrs?: {
    [index: string]: string;
  };
  hide?: Function;
  colGrid?: string;
}

export interface Props {
  layout: Layout;
  formConfig: Object;
  formItemConfig: Array<FormItemConfigItem>;
  formModel: Object;
  options: Object;
}

const attrs = useAttrs()

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

const getColLayout = (col: FormItemConfigItem) => {
  return { ...col.colGrid, ...colLayout };
};

function isHide(item: FormItemConfigItem) {
  return typeof item.hide === "function" ? item.hide() : item.hide;
}

// resetFields(...args) {
//   return this.$refs.form.resetFields(...args)
// },
// validate(...args) {
//   return this.$refs.form.validate(...args)
// },
// validateField(...args) {
//   return this.$refs.form.validateField(...args)
// },
// clearValidate(...args) {
//   return this.$refs.form.clearValidate(...args)
// }
</script>
