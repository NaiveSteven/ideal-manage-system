<!--
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-09-21 02:58:37
 * @LastEditors: mjqin
 * @LastEditTime: 2021-09-21 04:29:15
-->
<template>
  <el-card>
    <il-table :data="tableData" :tableCols="tableCols" @selection-change="handleSelectionChange"/>
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
  },
  {
    id: 2,
    name: "nihao2",
    address: "address2",
    username: "username2",
  },
  {
    id: 3,
    name: "nihao3",
    address: "address3",
    username: "username3",
  },
  {
    id: 4,
    name: "nihao4",
    address: "address4",
    username: "username4",
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
])
const handleSelectionChange = (data: any) => {
    console.log(data,'handleSelectionChangehandleSelectionChangehandleSelectionChange')
}
</script>
