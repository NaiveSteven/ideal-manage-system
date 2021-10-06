<template>
  <div>
    <el-card class="mb-6">
      <el-form ref="form" :model="goodsForm" label-width="80px">
        <el-form-item label="商品名" prop="keyword" label-width="80px">
          <el-input
            class="w-1/4"
            v-model="goodsForm.keyword"
            placeholder="请输入商品名"
          />
        </el-form-item>
        <el-form-item label="品牌" prop="brandId" label-width="80px">
          <el-select v-model="goodsForm.brandId" placeholder="请选择商品品牌">
            <template v-for="item in brandList" :key="item.value">
              <el-option :value="item.id" :label="item.name"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="商品类别" prop="goodsTypeId" label-width="80px">
          <el-cascader
            v-model="goodsForm.goodsTypeId"
            :options="goodsTypeList"
            placeholder="请选择商品类别"
          />
          <!-- <el-select
            v-model="goodsForm.goodsTypeId"
            placeholder="请选择商品类别"
          >
            <template v-for="item in goodsTypeList" :key="item.value">
              <el-option :value="item.id" :label="item.name"></el-option>
            </template>
          </el-select> -->
        </el-form-item>
        <el-form-item label="商品状态" prop="state" label-width="80px">
          <el-select v-model="goodsForm.state">
            <template v-for="item in goodStateList" :key="item.value">
              <el-option :value="item.value" :label="item.label"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label-width="80px">
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
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
        :data="goodsList"
        :loading="isTableLoading"
        :tableCols="tableCols"
        :pagination="pagination"
        @selection-change="handleSelectionChange"
        @refresh="getGoodsList"
      >
        <template #name="scope">
          <div class="flex flex-row">
            <img :src="scope.row.imageUrl" width="64" height="64" />
            <div class="ml-2 flex flex-col truncate">
              <el-tooltip :content="scope.row.name">
                <div class="mt-2 mb-1 text-black-85 flex flex-start">
                  <span class="truncate">{{ scope.row.name }}</span>
                </div>
              </el-tooltip>
              <el-tooltip :content="scope.row.desc">
                <div class="mb-2 text-black-65 flex flex-start">
                  <span class="truncate">{{ scope.row.desc }}</span>
                </div>
              </el-tooltip>
            </div>
          </div>
        </template>
        <template #state="scope">
          <el-tag v-if="scope.row.state === 1" type="success" effect="dark"
            >在售</el-tag
          >
          <el-tag v-if="scope.row.state === 2" type="warning" effect="dark"
            >下架</el-tag
          >
          <el-tag v-if="scope.row.state === 3" type="danger" effect="dark"
            >售罄</el-tag
          >
        </template>
      </il-table>
      <AddEditGoodsDialog
        :goodsTypeList="goodsTypeList"
        :brandList="brandList"
        :curItem="curItem"
        :mode="dialogMode"
        v-model="isShowAEDialog"
        @updateList="getGoodsList"
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
import { AddEditGoodsDialog } from "@/components"
import { DelDialog } from "@/components"
import { ElMessage, ElForm } from "element-plus"
import { onMounted, reactive, ref, inject, unref } from "vue"
import {
  GOOD_STATE,
  DIALOG_MODE_ADD,
  DIALOG_MODE_EDIT,
  DEL_DIALOG_SINGLE,
  DEL_DIALOG_MULTIPLE,
} from "@/const"
import { GoodsItem, GoodsTypeItem } from "@/interfaces/GoodsManage"
import { useTableData } from "@/hooks/components/useTableData"
import { TABLE_COLS } from "./const/goodsConst"

const $api = inject("$api") as { [index: string]: Function }
const $message = inject("$message") as typeof ElMessage

const goodStateList = ref(GOOD_STATE)
const form = ref(null)
const checkedGoodsIds = ref<number[]>([])
const goodsTypeList = ref([])
const brandList = ref([])
const goodsList = ref([])
const contents = ref([])
const isShowAEDialog = ref(false)
const isDelBtnLoading = ref(false)
const isShowDelDialog = ref(false)
const dialogMode = ref<"add" | "edit">(DIALOG_MODE_ADD)
const delMode = ref(DEL_DIALOG_MULTIPLE)
const curItem = ref<GoodsItem>({} as GoodsItem)
const goodsForm = reactive({
  keyword: "",
  brandId: "",
  goodsTypeId: [],
  state: 0,
} )

const { pagination, tableCols, isTableLoading } = useTableData(
  TABLE_COLS(handleEdit, handleDel, goodsTypeList, brandList)
)

onMounted(() => {
  getGoodsList()
  getBrandList()
  getGoodsTypeList()
})

const getGoodsList = async () => {
  isTableLoading.value = true
  try {
    const params = { ...pagination } as GoodsForm
    Object.keys(goodsForm).forEach((item) => {
      if (goodsForm[item as (keyof typeof goodsForm)]) {
        params[item] = goodsForm[item as (keyof typeof goodsForm)]
      }
    })
    params.goodsTypeId = (goodsForm.goodsTypeId.slice().pop() as unknown) as number[]
    const { count, rows } = await $api.getGoodsList(params)
    goodsList.value = rows
    pagination.total = count
  } catch (error) {
    $message.error(error.msg || error)
  }
  isTableLoading.value = false
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

const handleSelectionChange = (list: GoodsItem[]) => {
  const arr = [] as number[]
  list.forEach((item) => {
    arr.push(item.id)
  })
  checkedGoodsIds.value = arr
}

const handleCreate = () => {
  dialogMode.value = DIALOG_MODE_ADD
  isShowAEDialog.value = true
}

const handleQuery = () => {
  pagination.page = 1
  getGoodsList()
}

const handleReset = () => {
  ;(unref(form) as unknown as typeof ElForm).resetFields()
  getGoodsList()
}

function handleEdit(row: GoodsItem) {
  dialogMode.value = DIALOG_MODE_EDIT
  curItem.value = row
  isShowAEDialog.value = true
}

function handleDel(row?: GoodsItem) {
  delMode.value = row ? DEL_DIALOG_SINGLE : DEL_DIALOG_MULTIPLE
  isShowDelDialog.value = true
  if (row) {
    curItem.value = row
  }
}

const modifyLabelValue = (list: GoodsTypeItem[]) => {
  list.forEach((item: GoodsTypeItem) => {
    item.label = item.name
    item.value = item.id
    if (item.children) {
      modifyLabelValue(item.children)
    }
  })
}
</script>
<script lang="ts">
interface GoodsForm {
  keyword: string
  brandId: number | string
  goodsTypeId: number[]
  state: number
  page: number
  limit: number
  total: number
}
</script>
<style lang="scss"></style>
