<template>
  <el-card>
    <div class="mb-6">
      <el-button type="primary" @click="handleCreate">新增</el-button>
      <el-button
        type="danger"
        :disabled="checkedBrandIds.length === 0"
        @click="handleDel()"
        >批量删除</el-button
      >
    </div>
    <il-table
      ref="testTable"
      :data="moduleList"
      :loading="isTableLoading"
      :tableCols="tableCols"
      :pagination="pagination"
      @selection-change="handleSelectionChange"
      @refresh="getModuleList"
    >
      <template #header>
        <el-input
          size="mini"
          v-model="moduleForm.keyword"
          @change="getModuleList"
          placeholder="请输入模块名"
        />
      </template>
    </il-table>
    <AddEditModuleDialog
      :curItem="curItem"
      :mode="dialogMode"
      v-model="isShowAEDialog"
      @updateList="getModuleList"
    />
    <DelDialog
      v-model="isShowDelDialog"
      @delConfirm="handleDelConfirm"
      :contents="contents"
      :isBtnLoading="isDelBtnLoading"
    />
  </el-card>
</template>
<script lang="ts" setup>
import { AddEditModuleDialog } from "@/components"
import { DelDialog } from "@/components"
import { ElMessage } from "element-plus"
import { onMounted, reactive, ref, inject } from "vue"
import {
  DIALOG_MODE_ADD,
  DIALOG_MODE_EDIT,
  DEL_DIALOG_SINGLE,
  DEL_DIALOG_MULTIPLE,
} from "@/const"
import { ModuleItem } from "@/interfaces/AuthManage"
import { GetListReq } from "@/interfaces/Common"
import { useTableData } from "@/hooks/components/useTableData"
import { TABLE_COLS } from "./const/moduleConst"

const $api = inject("$api") as { [index: string]: Function }
const $message = inject("$message") as typeof ElMessage

const isShowAEDialog = ref(false)
const isDelBtnLoading = ref(false)
const isShowDelDialog = ref(false)

const moduleList = ref([])
const contents = ref([])
const checkedBrandIds = ref<number[]>([])
const delMode = ref(DEL_DIALOG_MULTIPLE)
const dialogMode = ref<"add" | "edit">(DIALOG_MODE_ADD)
const curItem = ref<ModuleItem>({} as ModuleItem)
const moduleForm = reactive<ModuleForm>({
  keyword: "",
})

const { pagination, tableCols, isTableLoading } = useTableData(
  TABLE_COLS(handleEdit, handleDel)
)

onMounted(() => {
  getModuleList()
})

const getModuleList = async () => {
  isTableLoading.value = true
  try {
    const params: GetListReq = { ...pagination }
    if (moduleForm.keyword) {
      params.keyword = moduleForm.keyword
    }
    const { count, rows } = await $api.getModuleList(params)
    moduleList.value = rows
    pagination.total = count
  } catch (error) {
    $message.error(error.msg || error)
  }
  isTableLoading.value = false
}

const deleteBrand = async (ids: number[]) => {
  isDelBtnLoading.value = true
  try {
    await $api.deleteModule({ id: ids })
    $message.success("删除成功")
    isDelBtnLoading.value = false
    isShowDelDialog.value = false
    getModuleList()
  } catch (error) {
    $message.error(error.msg || error)
  }
  isDelBtnLoading.value = false
}

const handleDelConfirm = () => {
  if (delMode.value === DEL_DIALOG_SINGLE) {
    deleteBrand([curItem.value.id])
  } else {
    deleteBrand(checkedBrandIds.value)
  }
}

const handleSelectionChange = (list: ModuleItem[]) => {
  const arr = [] as number[]
  list.map((item) => {
    arr.push(item.id)
  })
  checkedBrandIds.value = arr
}

const handleCreate = () => {
  dialogMode.value = DIALOG_MODE_ADD
  isShowAEDialog.value = true
}

function handleEdit(row: ModuleItem) {
  dialogMode.value = DIALOG_MODE_EDIT
  curItem.value = row
  isShowAEDialog.value = true
}

function handleDel(row?: ModuleItem) {
  delMode.value = row ? DEL_DIALOG_SINGLE : DEL_DIALOG_MULTIPLE
  isShowDelDialog.value = true
  if (row) {
    curItem.value = row
  }
}
</script>
<script lang="ts">
interface ModuleForm {
  keyword: string
}
</script>
<style lang="scss"></style>
