<template>
  <div>
    <el-card>
      <div class="mb-6 flex justify-between items-center">
        <div>
          <el-button type="primary" @click="handleCreate">新增</el-button>
          <el-button
            type="danger"
            :disabled="checkedPermissionIds.length === 0"
            @click="handleDel()"
            >批量删除</el-button
          >
        </div>
        <el-select
          v-model="permissionForm.permission_type"
          @change="handleQuery"
          placeholder="请选择类型"
        >
          <template v-for="item in permissionTypeList" :key="item.value">
            <el-option :value="item.value" :label="item.label"></el-option>
          </template>
        </el-select>
      </div>
      <il-table
        ref="testTable"
        :data="permissionList"
        :loading="isTableLoading"
        :tableCols="tableCols"
        :pagination="pagination"
        @selection-change="handleSelectionChange"
        @refresh="getPermissionList"
      >
        <template #header>
          <el-input
            size="mini"
            v-model="permissionForm.keyword"
            @change="getPermissionList"
            placeholder="请输入权限点名"
          />
        </template>
      </il-table>
      <AddEditPermissionDialog
        :curItem="curItem"
        :mode="dialogMode"
        v-model="isShowAEDialog"
        @updateList="getPermissionList"
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
import { AddEditPermissionDialog } from "@/components"
import { DelDialog } from "@/components"
import { onMounted, reactive, ref, inject } from "vue"
import {
  DIALOG_MODE_ADD,
  DIALOG_MODE_EDIT,
  DEL_DIALOG_SINGLE,
  DEL_DIALOG_MULTIPLE,
  PERMISSION_TYPE_LIST,
} from "@/const"
import { PermissionItem } from "@/interfaces/AuthManage"
import { ElMessage } from "element-plus"
import { useTableData } from "@/hooks/components/useTableData"
import { TABLE_COLS } from "./const/permissionConst"

const $api = inject("$api") as { [index: string]: Function }
const $message = inject("$message") as typeof ElMessage
const checkedPermissionIds = ref<number[]>([])
const permissionList = ref([])
const moduleList = ref([])
const contents = ref([])

const isShowAEDialog = ref(false)
const isDelBtnLoading = ref(false)
const isShowDelDialog = ref(false)
const dialogMode = ref<"add" | "edit">(DIALOG_MODE_ADD)
const delMode = ref(DEL_DIALOG_MULTIPLE)
const permissionTypeList = ref(PERMISSION_TYPE_LIST)
const curItem = ref<PermissionItem>({} as PermissionItem)
const permissionForm = reactive<PermissionForm>({
  keyword: "",
  permission_type: 0,
} as PermissionForm)

const { pagination, tableCols, isTableLoading } = useTableData(
  TABLE_COLS(handleEdit, handleDel, moduleList)
)

onMounted(() => {
  getModuleList()
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

const getPermissionList = async () => {
  isTableLoading.value = true
  try {
    const params = { ...pagination } as PermissionForm
    if (permissionForm.keyword) {
      params.keyword = permissionForm.keyword
    }
    if (permissionForm.permission_type) {
      params.permission_type = permissionForm.permission_type
    }
    const { count, rows } = await $api.getPermissionList(params)
    permissionList.value = rows
    pagination.total = count
  } catch (error) {
    $message.error(error.msg || error)
  }
  isTableLoading.value = false
}

const deletePermission = async (ids: number[]) => {
  isDelBtnLoading.value = true
  try {
    await $api.deletePermission({ id: ids })
    $message.success("删除成功")
    isDelBtnLoading.value = false
    isShowDelDialog.value = false
    getPermissionList()
  } catch (error) {
    $message.error(error.msg || error)
  }
  isDelBtnLoading.value = false
}

const handleDelConfirm = () => {
  if (delMode.value === DEL_DIALOG_SINGLE) {
    deletePermission([curItem.value.id])
  } else {
    deletePermission(checkedPermissionIds.value)
  }
}

const handleSelectionChange = (list: PermissionItem[]) => {
  const arr = [] as number[]
  list.map((item) => {
    arr.push(item.id)
  })
  checkedPermissionIds.value = arr
}

const handleCreate = () => {
  dialogMode.value = DIALOG_MODE_ADD
  isShowAEDialog.value = true
}

function handleEdit(row: PermissionItem) {
  dialogMode.value = DIALOG_MODE_EDIT
  curItem.value = row
  isShowAEDialog.value = true
}

function handleDel(row?: PermissionItem) {
  delMode.value = row ? DEL_DIALOG_SINGLE : DEL_DIALOG_MULTIPLE
  isShowDelDialog.value = true
  if (row) {
    curItem.value = row
  }
}

const handleQuery = () => {
  pagination.page = 1
  getPermissionList()
}
</script>

<script lang="ts">
interface PermissionForm {
  page: number
  limit: number
  keyword?: string
  permission_type?: number
}
</script>
<style lang="scss"></style>
