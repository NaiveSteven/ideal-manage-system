<template>
  <div>
    <el-card>
      <div class="mb-6">
        <el-button type="primary" @click="handleCreate">新增</el-button>
      </div>
      <il-table
        ref="testTable"
        :data="adminList"
        :loading="isTableLoading"
        :tableCols="tableCols"
        :pagination="pagination"
        @refresh="getAdminList"
      >
        <template #header>
          <el-input
            size="mini"
            v-model="adminForm.keyword"
            @change="getAdminList"
            placeholder="请输入用户名"
          />
        </template>
        <template #nickname="scope">
          <div class="flex flex-row">
            <el-avatar :src="scope.row.avatar" />
            <div class="ml-2 flex truncate items-center">
              <el-tooltip :content="scope.row.nickname">
                <div class="mt-2 mb-1 text-black-85 flex flex-start">
                  <span class="truncate">{{ scope.row.nickname }}</span>
                </div>
              </el-tooltip>
            </div>
          </div>
        </template>
        <template #roles="scope">
          <el-tag
            v-for="item in Utils.getListByIds(scope.row.roles, roleList)"
            class="mr-1 mb-1"
            :key="item.value"
            type="primary"
            effect="dark"
          >
            {{ item.label }}
          </el-tag>
        </template>
      </il-table>
      <AddEditAdminDialog
        :curItem="curItem"
        :roleList="roleList"
        :mode="dialogMode"
        v-model="isShowAEDialog"
        @updateList="getAdminList"
      />
      <DelDialog
        v-model="isShowDelDialog"
        @delConfirm="handleDelConfirm"
        :contents="contents"
        :isBtnLoading="isDelBtnLoading"
      />
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { AddEditAdminDialog } from "@/components"
import { DelDialog } from "@/components"
import { ElMessage } from "element-plus"
import { onMounted, reactive, ref, inject } from "vue"
import { DIALOG_MODE_ADD, DIALOG_MODE_EDIT } from "@/const"
import { AdminItem } from "@/interfaces/UserManage"
import { RoleItem } from "@/interfaces/AuthManage"
import { GetListReq } from "@/interfaces/Common"
import utils from "@/utils/utils"

import { useTableData } from "@/hooks/components/useTableData"
import { TABLE_COLS } from "./const/adminConst"

const $api = inject("$api") as { [index: string]: Function }
const $message = inject("$message") as typeof ElMessage
const adminList = ref([])
const roleList = ref([])
const contents = ref([])
const isShowAEDialog = ref(false)
const isDelBtnLoading = ref(false)
const isShowDelDialog = ref(false)
const dialogMode = ref<"add" | "edit">(DIALOG_MODE_ADD)
const curItem = ref<AdminItem>({} as AdminItem)
const Utils = reactive(utils)
const adminForm = reactive({
  keyword: "",
})

const { pagination, tableCols, isTableLoading } = useTableData(
  TABLE_COLS(handleEdit, handleDel)
)

onMounted(() => {
  getRoleList()
  getAdminList()
})

const getRoleList = async () => {
  try {
    const params = {
      page: 1,
      limit: 1000,
    }

    const { rows } = await $api.getRoleList(params)
    console.log(rows, "rows")
    roleList.value = rows
    roleList.value.forEach((item: RoleItem) => {
      item.label = item.name
      item.value = item.id
    })
  } catch (error) {
    $message.error(error.msg || error)
  }
}

const getAdminList = async () => {
  isTableLoading.value = true
  try {
    const params: GetListReq = { ...pagination }
    if (adminForm.keyword) {
      params.keyword = adminForm.keyword
    }
    const { count, rows } = await $api.getAdminList(params)
    adminList.value = rows
    pagination.total = count
  } catch (error) {
    $message.error(error.msg || error)
  }
  isTableLoading.value = false
}

const deleteAdmin = async (ids: number, adminUserId: string) => {
  isDelBtnLoading.value = true
  try {
    await $api.deleteAdmin({ id: ids, adminUserId })
    $message.success("删除成功")
    isDelBtnLoading.value = false
    isShowDelDialog.value = false
    getAdminList()
  } catch (error) {
    $message.error(error.msg || error)
  }
  isDelBtnLoading.value = false
}

const handleDelConfirm = () => {
  deleteAdmin(curItem.value.id, curItem.value.adminUserId)
}

const handleCreate = () => {
  dialogMode.value = DIALOG_MODE_ADD
  isShowAEDialog.value = true
}

function handleEdit(row: AdminItem) {
  dialogMode.value = DIALOG_MODE_EDIT
  curItem.value = row
  isShowAEDialog.value = true
}

function handleDel(row: AdminItem) {
  curItem.value = row
  isShowDelDialog.value = true
}
</script>

<style lang="scss"></style>
