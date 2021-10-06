<template>
  <div>
    <div class="mb-6">
      <el-button type="primary" @click="handleCreate">新增</el-button>
      <el-button
        type="danger"
        :disabled="checkedGoodsIds.length === 0"
        @click="handleDel()"
        >批量删除</el-button
      >
    </div>
    <il-table
      ref="testTable"
      :data="placeOrderList"
      :loading="isTableLoading"
      :tableCols="tableCols"
      :pagination="pagination"
      @selection-change="handleSelectionChange"
      @refresh="getPlaceOrderList"
    >
      <template #state="scope">
        <el-tag v-if="scope.row.state === 1" type="danger" effect="dark"
          >未付款</el-tag
        >
        <el-tag v-if="scope.row.state === 2" type="warning" effect="dark"
          >已付款未发货</el-tag
        >
        <el-tag v-if="scope.row.state === 3" type="primary" effect="dark"
          >已发货未确认收到</el-tag
        >
        <el-tag v-if="scope.row.state === 4" type="success" effect="dark"
          >确认到货订单完成</el-tag
        >
      </template>
    </il-table>
    <AddEditOrderDialog
      :goodsList="goodsList"
      :curItem="curItem"
      :mode="dialogMode"
      v-model="isShowAEDialog"
      @updateList="getPlaceOrderList"
    />
    <DelDialog
      v-model="isShowDelDialog"
      @delConfirm="handleDelConfirm"
      :contents="contents"
      :isBtnLoading="isDelBtnLoading"
    />
  </div>
</template>
<script lang="ts" setup>
import { AddEditOrderDialog } from "@/components"
import { DelDialog } from "@/components"
import { onMounted, reactive, ref, watch, inject } from "vue"
import {
  DIALOG_MODE_ADD,
  DIALOG_MODE_EDIT,
  DEL_DIALOG_SINGLE,
  DEL_DIALOG_MULTIPLE,
} from "@/const"
import { ElMessage } from "element-plus"
import { PlaceOrderItem, GetPlaceOrderListReq } from "@/interfaces/OrderManage"
import { GoodsTypeItem } from "@/interfaces/GoodsManage"
import { useTableData } from "@/hooks/components/useTableData"
import { TABLE_COLS } from "./const"

const props = defineProps<{
  deal_state: string
}>()
const emit = defineEmits(["toDetail"])
const $api = inject("$api") as { [index: string]: Function }
const $message = inject("$message") as typeof ElMessage

const checkedGoodsIds = ref<number[]>([])
const placeOrderList = ref([])
const goodsTypeList = ref([])
const brandList = ref([])
const goodsList = ref([])
const userList = ref([])
const contents = ref([])
const isShowAEDialog = ref(false)
const isDelBtnLoading = ref(false)
const isShowDelDialog = ref(false)
const dialogMode = ref<"add" | "edit">(DIALOG_MODE_ADD)
const delMode = ref(DEL_DIALOG_MULTIPLE)
const curItem = ref<PlaceOrderItem>({} as PlaceOrderItem)
const placeOrderForm = reactive({
  keyword: "",
  brandId: "",
  goodsTypeId: [],
  state: 0,
})

const { pagination, tableCols, isTableLoading } = useTableData(
  TABLE_COLS(handleEdit, handleDel, handleToDetail, userList, goodsList)
)

watch(
  () => props.deal_state,
  () => {
    getPlaceOrderList()
  }
)
onMounted(() => {
  getPlaceOrderList()
  getUserList()
  getGoodsList()
  getBrandList()
  getGoodsTypeList()
})

const getPlaceOrderList = async () => {
  isTableLoading.value = true
  try {
    const params: GetPlaceOrderListReq = {
      ...pagination,
    }
    if (placeOrderForm.state) {
      params.state = placeOrderForm.state
    }
    if (props.deal_state) {
      params.deal_state = Number(props.deal_state)
    }
    const { rows } = await $api.getPlaceOrderList(params)
    placeOrderList.value = rows
  } catch (error) {
    $message.error(error.msg || error)
  }
  isTableLoading.value = false
}

const getGoodsList = async () => {
  try {
    const params = {
      page: 1,
      limit: 1000,
    }
    const { rows } = await $api.getGoodsList(params)
    goodsList.value = rows
  } catch (error) {
    $message.error(error.msg || error)
  }
}

const getUserList = async () => {
  const params = { page: 1, limit: 1000 }
  try {
    const { rows } = await $api.getUserList(params)
    userList.value = rows
  } catch (error) {
    $message.error(error.msg || error)
  }
}

const getBrandList = async () => {
  try {
    const params = {
      page: 1,
      limit: 1000,
    }
    const { rows } = await $api.getBrandList(params)
    brandList.value = rows
  } catch (error) {
    $message(error.msg || error)
  }
}

const getGoodsTypeList = async () => {
  try {
    const params = {
      page: 1,
      limit: 1000,
    }
    const { rows } = await $api.getGoodsTypeList(params)
    goodsTypeList.value = rows
    modifyLabelValue(goodsTypeList.value)
  } catch (error) {
    $message(error.msg || error)
  }
}

const deleteGoods = async (ids: number[]) => {
  isDelBtnLoading.value = true
  try {
    await $api.deleteGoods({ id: ids })
    $message.success("删除成功")
    isDelBtnLoading.value = false
    isShowDelDialog.value = false
    getGoodsList()
  } catch (error) {
    $message.error(error.msg || error)
  }
  isDelBtnLoading.value = false
}

const handleDelConfirm = () => {
  if (delMode.value === DEL_DIALOG_SINGLE) {
    deleteGoods([curItem.value.id])
  } else {
    deleteGoods(checkedGoodsIds.value)
  }
}

const handleSelectionChange = (list: PlaceOrderItem[]) => {
  const arr = [] as number[]
  list.map((item) => {
    arr.push(item.id)
  })
  checkedGoodsIds.value = arr
}

const handleCreate = () => {
  dialogMode.value = DIALOG_MODE_ADD
  isShowAEDialog.value = true
}

function handleEdit(row: PlaceOrderItem) {
  dialogMode.value = DIALOG_MODE_EDIT
  curItem.value = row
  isShowAEDialog.value = true
}

function handleDel(row?: PlaceOrderItem) {
  delMode.value = row ? DEL_DIALOG_SINGLE : DEL_DIALOG_MULTIPLE
  isShowDelDialog.value = true
  if (row) {
    curItem.value = row
  }
}

function handleToDetail(row: PlaceOrderItem) {
  emit("toDetail", row)
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
