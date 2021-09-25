<!--
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-09-21 02:58:37
 * @LastEditors: mjqin
 * @LastEditTime: 2021-09-25 22:51:22
-->
<template>
  <el-card>
    <il-table
      :data="tableData"
      :tableCols="tableCols"
      @selection-change="handleSelectionChange"
    >
      <template #phone="{row, index}">
        <span>phone:{{row.phone + index}}</span>
      </template>
      <template #phone1="{column, index}">
        <span>自定义标题:{{index}}</span>
      </template>
    </il-table>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from "vue"
const tableData = ref([
  {
    id: 1,
    name: "nihao1",
    address: "address1",
    username: "username1",
    phone: 'phone1'
  },
  {
    id: 2,
    name: "nihao2",
    address: "address2",
    username: "username2",
    phone: 'phone2'
  },
  {
    id: 3,
    name: "nihao3",
    address: "address3",
    username: "username3",
    phone: 'phone3'
  },
  {
    id: 4,
    name: "nihao4",
    address: "address4",
    username: "username4",
    phone: 'phone4'
  }
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
    slot: 'phone',
    headerSlot: 'phone1',
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
        click: () => console.log('asfasfsadfasdf')
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
</script>
