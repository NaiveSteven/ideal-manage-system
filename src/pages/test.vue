<!--
 * @Description: description
 * @Author: mjqin
 * @Date: 2021-09-16 10:17:56
 * @LastEditTime: 2021-09-16 14:15:35
 * @LastEditors: mjqin
-->
<template>
  <el-card>
    <!-- <il-container type="flex" direction="column">
    <div>asdfasdf</div>
    <div>asdfasd</div>
  </il-container> -->
    <il-form
      :layout="layout"
      :form-model="formModel"
      :form-config="formConfig"
      :options="optionsConfig"
      :form-item-config="formItemConfig"
    >
      <template #button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </template>
    </il-form>
  </el-card>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
const formModel = reactive({ activeName: "", activeArea: "" });
const optionsConfig = reactive({
  activeArea: [
    { label: "区域1", value: "1" },
    { label: "区域2", value: "2" },
  ],
});
const layout = reactive({
  rowLayout: {
    type: "flex",
    direction: "row",
  },
  colLayout: {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 8,
    xl: 8,
  },
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
    slot: "button",
  },
]);

const handleSubmit = () => {
  console.log(formModel, "saasdfasdfsadfsda");
};
</script>
