<template>
  <el-card>
    <div class="mb-6">
      <el-button type="primary" @click="handleCreate">新增</el-button>
      <el-button
        type="danger"
        :disabled="checkedGoodsTypeIds.length === 0"
        @click="handleDel()"
        >批量删除</el-button
      >
    </div>
    <il-table
      ref="testTable"
      :data="goodsTypeList"
      :loading="isTableLoading"
      :tableCols="tableCols"
      :is-pagination="false"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      row-key="id"
      @selection-change="handleSelectionChange"
    />
    <AddEditGoodsTypeDialog
      :curItem="curItem"
      :mode="dialogMode"
      :goodsTypeList="goodsTypeList"
      v-model="isShowAEDialog"
      @updateList="getGoodsTypeList"
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
import { AddEditGoodsTypeDialog } from "@/components"
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
import { TABLE_COLS } from "./const/goodsTypeConst"
import { GetListReq } from "@/interfaces/Common"
import { GoodsTypeItem } from "@/interfaces/GoodsManage"

const $api = inject("$api") as { [index: string]: Function }
const $message = inject("$message") as typeof ElMessage
const checkedGoodsTypeIds = ref<number[]>([])
const goodsTypeList = ref([])
const contents = ref([])
const isShowAEDialog = ref(false)
const isDelBtnLoading = ref(false)
const isShowDelDialog = ref(false)
const dialogMode = ref<"add" | "edit">(DIALOG_MODE_ADD)
const delMode = ref(DEL_DIALOG_MULTIPLE)
const curItem = ref<GoodsTypeItem>({} as GoodsTypeItem)
const goodsTypeForm = reactive({
  keyword: "",
})

const { pagination, tableCols, isTableLoading } = useTableData(
  TABLE_COLS(handleEdit, handleDel)
)

onMounted(() => {
  getGoodsTypeList()
})

const getGoodsTypeList = async () => {
  isTableLoading.value = true
  try {
    const params: GetListReq = {
      page: 1,
      limit: 1000,
    } as GetListReq
    if (goodsTypeForm.keyword) {
      params.keyword = goodsTypeForm.keyword
    }
    const { rows } = await $api.getGoodsTypeList(params)
    goodsTypeList.value = rows
    modifyLabelValue(goodsTypeList.value)
  } catch (error) {
    $message.error(error.msg || error)
  }
  isTableLoading.value = false
}

const deleteGoodsType = async (ids: number[]) => {
  isDelBtnLoading.value = true
  try {
    await $api.deleteGoodsType({ id: ids })
    $message.success("删除成功")
    isDelBtnLoading.value = false
    isShowDelDialog.value = false
    getGoodsTypeList()
  } catch (error) {
    $message.error(error.msg || error)
  }
  isDelBtnLoading.value = false
}

const handleDelConfirm = () => {
  if (delMode.value === DEL_DIALOG_SINGLE) {
    deleteGoodsType([curItem.value.id])
  } else {
    deleteGoodsType(checkedGoodsTypeIds.value)
  }
}

const handleSelectionChange = (list: GoodsTypeItem[]) => {
  const arr = [] as number[]
  list.forEach((item) => {
    arr.push(item.id)
  })
  checkedGoodsTypeIds.value = arr
}

const handleCreate = () => {
  dialogMode.value = DIALOG_MODE_ADD
  isShowAEDialog.value = true
}

function handleEdit(row: GoodsTypeItem) {
  dialogMode.value = DIALOG_MODE_EDIT
  curItem.value = row
  isShowAEDialog.value = true
}

function handleDel(row?: GoodsTypeItem) {
  delMode.value = row ? DEL_DIALOG_SINGLE : DEL_DIALOG_MULTIPLE
  isShowDelDialog.value = true
  if (row) {
    curItem.value = row
  }
}

const modifyLabelValue = (list: GoodsTypeItem[]) => {
  list.forEach((item) => {
    item.label = item.name
    item.value = item.id
    if (item.children) {
      modifyLabelValue(item.children)
    }
  })
}
</script>

<style lang="scss"></style>
