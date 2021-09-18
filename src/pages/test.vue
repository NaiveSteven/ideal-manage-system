<!--
 * @Description: description
 * @Author: mjqin
 * @Date: 2021-09-16 10:17:56
 * @LastEditTime: 2021-09-19 00:07:06
 * @LastEditors: mjqin
-->
<template>
  <el-card>
    <!-- <il-container type="flex" direction="column">
    <div>asdfasdf</div>
    <div>asdfasd</div>
  </il-container> -->
    <il-form
      ref="testForm"
      :layout="layout"
      :form-model="formModel"
      :form-config="formConfig"
      :options="optionsConfig"
      :form-item-config="formItemConfig"
    >
      <template #button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button type="primary" @click="handleReset">重置</el-button>
      </template>
    </il-form>
  </el-card>
</template>
<script lang="ts" setup>
import { reactive, ref, unref } from "vue";
import { ElForm, ElMessage } from "element-plus";

const testForm = ref(null);
const formModel = reactive({ activeName: "", activeArea: "", active1: "", active2: "", active3: "", active4: "" });
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
    type: "input",
    prop: "active1",
    formItem: { label: "活动名称" },
    attrs: {
      placeholder: "请输入活动名称",
      clearable: true,
    },
    on: {
      input: () => {
        console.log("active1");
      },
    },
  },
  {
    type: "input",
    prop: "active2",
    formItem: { label: "活动名称" },
    attrs: {
      placeholder: "请输入活动名称",
      clearable: true,
    },
    on: {
      input: () => {
        console.log("active2");
      },
    },
  },
  {
    type: "input",
    prop: "active3",
    formItem: { label: "活动名称" },
    attrs: {
      placeholder: "请输入活动名称",
      clearable: true,
    },
    on: {
      input: () => {
        console.log("active3");
      },
    },
  },
  {
    type: "input",
    prop: "active4",
    formItem: { label: "活动名称" },
    attrs: {
      placeholder: "请输入活动名称",
      clearable: true,
    },
    on: {
      input: () => {
        console.log("active4");
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
  (unref(testForm) as typeof ElForm).validate((val: boolean) => {
    if (val) {
      ElMessage.success('校验成功')
    } else {
      ElMessage.error('校验失败')
    }
  })
  console.log(formModel, "saasdfasdfsadfsda");
};

const handleReset = async () => {
  (unref(testForm) as typeof ElForm).resetFields();
};
</script>
