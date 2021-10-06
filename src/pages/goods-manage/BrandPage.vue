<template>
  <div>
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
        :data="brandList"
        :loading="isTableLoading"
        :tableCols="tableCols"
        :pagination="pagination"
        @selection-change="handleSelectionChange"
        @refresh="getBrandList"
      >
        <template #header>
          <el-input
            size="mini"
            v-model="brandForm.keyword"
            @change="getBrandList"
            placeholder="请输入品牌名"
          />
        </template>
      </il-table>
      <AddEditBrandDialog
        :curItem="curItem"
        :mode="dialogMode"
        v-model="isShowAEDialog"
        @updateList="getBrandList"
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
import { AddEditBrandDialog } from "@/components"
import { DelDialog } from "@/components"
import { ElMessage } from "element-plus"
import { onMounted, reactive, ref, inject } from "vue"
import {
  DIALOG_MODE_ADD,
  DIALOG_MODE_EDIT,
  DEL_DIALOG_SINGLE,
  DEL_DIALOG_MULTIPLE,
} from "@/const"
import { BrandItem } from "@/interfaces/GoodsManage"
import { GetListReq } from "@/interfaces/Common"
import { useTableData } from "@/hooks/components/useTableData"
import { TABLE_COLS } from "./const/brandConst"

const $api = inject("$api") as { [index: string]: Function }
const $message = inject("$message") as typeof ElMessage

const checkedBrandIds = ref<number[]>([])
const brandList = ref([])
const contents = ref([])
const isShowAEDialog = ref(false)
const isDelBtnLoading = ref(false)
const isShowDelDialog = ref(false)
const dialogMode = ref<"add" | "edit">(DIALOG_MODE_ADD)
const delMode = ref(DEL_DIALOG_MULTIPLE)
const curItem = ref<BrandItem>({} as BrandItem)
const brandForm = reactive({
  keyword: "",
})

const { pagination, tableCols, isTableLoading } = useTableData(
  TABLE_COLS(handleEdit, handleDel)
)

onMounted(() => {
  getBrandList()
})

const getBrandList = async () => {
  isTableLoading.value = true
  try {
    const params = { ...pagination } as GetListReq
    if (brandForm.keyword) {
      params.keyword = brandForm.keyword
    }
    const { count, rows } = await $api.getBrandList(params)
    brandList.value = rows
    pagination.total = count
  } catch (error) {
    $message.error(error.msg || error)
  }
  isTableLoading.value = false
}

const deleteBrand = async (ids: number[]) => {
  isDelBtnLoading.value = true
  try {
    await $api.deleteBrand({ id: ids })
    $message.success("删除成功")
    isDelBtnLoading.value = false
    isShowDelDialog.value = false
    getBrandList()
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

const handleSelectionChange = (list: BrandItem[]) => {
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

function handleEdit(row: BrandItem) {
  dialogMode.value = DIALOG_MODE_EDIT
  curItem.value = row
  isShowAEDialog.value = true
}

function handleDel(row?: BrandItem) {
  delMode.value = row ? DEL_DIALOG_SINGLE : DEL_DIALOG_MULTIPLE
  isShowDelDialog.value = true
  if (row) {
    curItem.value = row
  }
}
</script>

<style lang="scss"></style>
