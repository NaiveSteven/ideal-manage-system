<template>
  <div>
    <el-card>
      <div class="mb-6">
        <el-button type="primary" @click="handleCreate">新增</el-button>
        <el-button
          type="danger"
          :disabled="checkedRoleIds.length === 0"
          @click="handleDel()"
          >批量删除</el-button
        >
      </div>
      <il-table
        ref="testTable"
        :data="roleList"
        :loading="isTableLoading"
        :tableCols="tableCols"
        :pagination="pagination"
        @selection-change="handleSelectionChange"
        @refresh="getRoleList"
      >
        <template #header>
          <el-input
            size="mini"
            v-model="roleForm.keyword"
            @change="getRoleList"
            placeholder="请输入角色名"
          />
        </template>
      </il-table>
      <AddEditRoleDialog
        :curItem="curItem"
        :mode="dialogMode"
        :permissionList="permissionList"
        :moduleList="moduleList"
        v-model="isShowAEDialog"
        @updateList="getRoleList"
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
import { AddEditRoleDialog } from "@/components"
import { DelDialog } from "@/components"
import { ElMessage } from "element-plus"
import { onMounted, reactive, ref, inject } from "vue"
import {
  DIALOG_MODE_ADD,
  DIALOG_MODE_EDIT,
  DEL_DIALOG_SINGLE,
  DEL_DIALOG_MULTIPLE,
} from "@/const"
import { useTableData } from "@/hooks/components/useTableData"
import { TABLE_COLS } from "./const/roleConst"
import { RoleItem, PermissionItem } from "@/interfaces/AuthManage"
import { GetListReq } from "@/interfaces/Common"

const $api = inject("$api") as { [index: string]: Function }
const $message = inject("$message") as typeof ElMessage
const checkedRoleIds = ref<number[]>([])
const roleList = ref([])
const contents = ref([])
const permissionList = ref([])
const moduleList = ref([])
const isShowAEDialog = ref(false)
const isDelBtnLoading = ref(false)
const isShowDelDialog = ref(false)
const dialogMode = ref<"add" | "edit">(DIALOG_MODE_ADD)
const delMode = ref(DEL_DIALOG_MULTIPLE)
const curItem = ref<RoleItem>({} as RoleItem)
const roleForm = reactive({
  keyword: "",
})

const { pagination, tableCols, isTableLoading } = useTableData(
  TABLE_COLS(handleEdit, handleDel, getPermission)
)

onMounted(() => {
  getModuleList()
  getRoleList()
  getPermissionList()
})

const getModuleList = async () => {
  try {
    const params = {
      page: 1,
      limit: 1000,
    }
    const { rows } = await $api.getModuleList(params)
    moduleList.value = rows
  } catch (error) {
    $message.error(error.msg || error)
  }
}

const getRoleList = async () => {
  isTableLoading.value = true
  try {
    const params = { ...pagination } as GetListReq
    if (roleForm.keyword) {
      params.keyword = roleForm.keyword
    }
    const { count, rows } = await $api.getRoleList(params)
    roleList.value = rows
    pagination.total = count
  } catch (error) {
    $message.error(error.msg || error)
  }
  isTableLoading.value = false
}

const getPermissionList = async () => {
  try {
    const params = {
      page: 1,
      limit: 1000,
    }
    const { rows } = await $api.getPermissionList(params)
    permissionList.value = rows
  } catch (error) {
    $message.error(error.msg || error)
  }
}

const deleteRole = async (ids: number[]) => {
  isDelBtnLoading.value = true
  try {
    await $api.deleteRole({ id: ids })
    $message.success("删除成功")
    isDelBtnLoading.value = false
    isShowDelDialog.value = false
    getRoleList()
  } catch (error) {
    $message.error(error.msg || error)
  }
  isDelBtnLoading.value = false
}

const handleDelConfirm = () => {
  if (delMode.value === DEL_DIALOG_SINGLE) {
    deleteRole([curItem.value.id])
  } else {
    deleteRole(checkedRoleIds.value)
  }
}

const handleSelectionChange = (list: RoleItem[]) => {
  const arr = [] as number[]
  list.forEach((item) => {
    arr.push(item.id)
  })
  checkedRoleIds.value = arr
}

const handleCreate = () => {
  dialogMode.value = DIALOG_MODE_ADD
  isShowAEDialog.value = true
}

function handleEdit(row: RoleItem) {
  dialogMode.value = DIALOG_MODE_EDIT
  curItem.value = row
  isShowAEDialog.value = true
}

function handleDel(row?: RoleItem) {
  delMode.value = row ? DEL_DIALOG_SINGLE : DEL_DIALOG_MULTIPLE
  isShowDelDialog.value = true
  if (row) {
    curItem.value = row
  }
}

function getPermission(permissionsID: number[]) {
  const arr = [] as PermissionItem[]
  permissionList.value.forEach((item: PermissionItem) => {
    permissionsID.forEach((cur) => {
      if (item.id === Number(cur)) {
        arr.push(item)
      }
    })
  })
  let str = ""
  if (arr) {
    arr.forEach((item) => {
      str += item.permission + "/"
    })
  }
  return str
}
</script>
<style lang="scss"></style>
