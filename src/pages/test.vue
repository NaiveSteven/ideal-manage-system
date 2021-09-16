<!--
 * @Description: description
 * @Author: mjqin
 * @Date: 2021-09-16 10:17:56
 * @LastEditTime: 2021-09-16 10:51:29
 * @LastEditors: mjqin
-->
<template>
  <!-- <il-container type="flex" direction="column">
    <div>asdfasdf</div>
    <div>asdfasd</div>
  </il-container> -->
  <il-form
    :form-model="formModel"
    :form-config="formConfig"
    :options="optionsConfig"
    :form-item-config="formItemConfig"
  />
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
const formModel = reactive({ activeName: "", activeArea: "", activeTime: [] });
const optionsConfig = reactive({
  activeArea: [
    { label: "区域1", value: "1" },
    { label: "区域2", value: "2" },
  ],
});
const formConfig = reactive({
  ref: "form",
  labelWidth: "100px",
  size: "mini",
  class: "form",
  rules: {
    activeName: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
  },
});
const formItemConfig = ref([
  {
    type: "input",
    prop: "activeName",
    formItem: { label: "活动名称" },
    attrs: {
      placeholder: "请输入活动名称",
      clearable: true,
    },
    on: {
      input: () => {
        console.log(123);
      },
    },
  },
  {
    type: "select",
    prop: "activeArea",
    formItem: { label: "活动区域" },
    attrs: {
      placeholder: "请输入活动区域",
      clearable: true,
    },
  },
  {
    type: "datepicker",
    prop: "activeTime",
    formItem: { label: "活动时间" },
    attrs: {
      type: "daterange",
      startPlaceholder: "开始日期",
      endPlaceholder: "结束日期",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      clearable: true,
    },
  },
]);
</script>
