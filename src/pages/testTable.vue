<!--
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-09-21 02:58:37
 * @LastEditors: mjqin
 * @LastEditTime: 2021-09-25 23:09:51
-->
<template>
  <el-card>
    <il-table
      :data="tableData"
      :tableCols="tableCols"
      @selection-change="handleSelectionChange"
    >
      <template #phone="{ row, index }">
        <span>phone:{{ row.phone + index }}</span>
      </template>
      <template #phone1="{ index }">
        <span>自定义标题:{{ index }}</span>
      </template>
    </il-table>
    <il-table
      ref="testTable"
      :data="tableData"
      :tableCols="tableCols"
      @selection-change="handleSelectionChange"
    />
    <el-button type="primary" @click="handleClear">清除选择</el-button>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, unref } from "vue"
import { ElTable } from "element-plus"

const testTable = ref(null)
const tableData = ref([
  {
    id: 1,
    name: "nihao1",
    address: "address1",
    username: "username1",
    phone: "phone1",
    select: "1",
  },
  {
    id: 2,
    name: "nihao2",
    address: "address2",
    username: "username2",
    phone: "phone2",
    select: "2",
  },
  {
    id: 3,
    name: "nihao3",
    address: "address3",
    username: "username3",
    phone: "phone3",
    select: "3",
  },
  {
    id: 4,
    name: "nihao4",
    address: "address4",
    username: "username4",
    phone: "phone4",
    select: "4",
  },
])

const tableCols = ref([
  {
    type: "selection",
  },
  {
    type: "index",
    width: "50px",
  },
  {
    prop: "name",
    label: "姓名",
  },
  {
    prop: "address",
    label: "地址",
  },
  {
    slot: "phone",
    headerSlot: "phone1",
  },
  {
    type: "select",
    prop: "select",
    label: "选择框",
    options: [
      {
        label: "选择1",
        value: "1",
      },
      {
        label: "选择2",
        value: "2",
      },
      {
        label: "选择3",
        value: "3",
      },
      {
        label: "选择4",
        value: "4",
      },
    ],
    attrs: {
      clearable: true,
      placeholder: "请选择",
    },
    on: {
      change: () => console.log("select change"),
    },
  },
  {
    type: "input",
    prop: "username",
    label: "用户名",
    attrs: {
      clearable: true,
      placeholder: "nihaoa",
    },
    on: {
      input: () => console.log("22222"),
    },
  },
  {
    type: "button",
    label: "操作1",
    btnList: [
      {
        label: "按钮1",
        type: "primary",
        size: "mini",
      },
      {
        label: "按钮2",
        type: "default",
        size: "mini",
      },
    ],
  },
  {
    type: "button",
    label: "操作2",
    btnList: [
      {
        whenShowCb: () => true,
        label: "按钮3",
        type: "primary",
        size: "mini",
        click: () => console.log("asfasfsadfasdf"),
      },
      {
        whenShowCb: () => true,
        label: "按钮4",
        type: "default",
        size: "mini",
      },
    ],
  },
])

const handleSelectionChange = (data: any) => {
  console.log(
    data,
    "handleSelectionChangehandleSelectionChangehandleSelectionChange"
  )
}
const handleClear = () => {
  ;(unref(testTable) as typeof ElTable).clearSelection()
}
</script>
