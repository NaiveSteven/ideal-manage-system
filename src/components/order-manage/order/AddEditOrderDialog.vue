<template>
  <el-dialog
    width="680px"
    :title="mode === 'add' ? '新增订单' : '编辑订单'"
    v-model="visible"
  >
    <il-form
      ref="form"
      :layout="layout"
      :form-model="formModel"
      :form-config="formConfig"
      :options="optionsConfig"
      :form-item-config="formItemConfig"
    />
    <!-- <el-form
      ref="form"
      :model="dialogForm"
      label-width="100px"
      :rules="dialogFormRules"
    >
      <el-form-item label="手机号" prop="phone" label-width="100px">
        <el-input v-model="dialogForm.phone" placeholder="请输入商品名称" />
      </el-form-item>
      <el-form-item label="地址" prop="address" label-width="100px">
        <el-input v-model="dialogForm.address" placeholder="请输入商品名称" />
      </el-form-item>
      <el-form-item label="姓名" prop="name" label-width="100px">
        <el-input v-model="dialogForm.name" placeholder="请输入商品名称" />
      </el-form-item>
      <el-form-item label="商品名" prop="goodsId" label-width="100px">
        <el-select v-model="dialogForm.goodsId" placeholder="请选择商品名">
          <template v-for="item in goodsList" :key="item.value">
            <el-option :value="item.id" :label="item.name"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态" prop="state" label-width="100px">
        <el-radio-group v-model="dialogForm.state">
          <el-radio :label="1">未付款</el-radio>
          <el-radio :label="2">已付款未发货</el-radio>
          <el-radio :label="3">已发货未确认收到</el-radio>
          <el-radio :label="4">确认到货订单完成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="处理状态" prop="deal_state" label-width="100px">
        <el-radio-group v-model="dialogForm.deal_state">
          <el-radio :label="1">未处理</el-radio>
          <el-radio :label="2">正在处理</el-radio>
          <el-radio :label="3">处理完成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="数量" prop="count" label-width="100px">
        <el-input-number size="mini" v-model="dialogForm.count" />
      </el-form-item>
    </el-form> -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="isConfirmBtnLoading"
          @click="handleSubmit"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { inject, nextTick, ref, unref, watch } from "vue"
import { DIALOG_MODE_EDIT } from "@/const"
import utils from "@/utils/utils"
import { ElForm } from "element-plus"
import { useShowDialog } from "@/hooks/components/useShowDialog"
import { useDialogAddEdit } from "@/hooks/components/useDialogAddEdit"
import {
  FORM_MODEL,
  LAYOUT,
  FORM_CONFIG,
  FORM_ITEM_CONFIG,
  Options,
} from "./const"
import { useFormData } from "@/hooks/components/useFormData"

const props = defineProps<{
  modelValue: boolean
  mode: "add" | "edit"
  curItem: object
  goodsList: array
}>()
const emit = defineEmits(["update:modelValue", "updateList"])
const form = ref(null)
const $api = inject("$api") as { [index: string]: Function }

const { formModel, formConfig, formItemConfig, layout, optionsConfig } =
  useFormData(FORM_MODEL, FORM_CONFIG, FORM_ITEM_CONFIG, LAYOUT, Options)

const { visible } = useShowDialog(
  props,
  emit,
  showDialogCallback,
  notShowDialogCallback
)

const { isConfirmBtnLoading, handleSubmit } = useDialogAddEdit(
  props,
  emit,
  $api.addPlaceOrder,
  $api.updatePlaceOrder,
  visible,
  getAddParams,
  getUpdateParams
)

watch(
  () => props.goodsList,
  () => {
    if (props.goodsList.length > 0) {
      optionsConfig.goodsId = props.goodsList.map((item) => ({
        label: item.name,
        value: item.id,
      }))
    }
  }
)

async function showDialogCallback() {
  if (props.mode === DIALOG_MODE_EDIT) {
    await nextTick()
    Object.assign(formModel, props.curItem)
  }
}

function notShowDialogCallback() {
  ;(unref(form as unknown) as typeof ElForm).resetFields()
}

function getAddParams() {
  const params = {
    ...formModel,
    price:
      Number(utils.getListName(formModel.goodsId, props.goodsList, "price")) *
      Number(formModel.count),
  }
  delete params.id
  delete params.name
  params.userId = 0
  return params
}

function getUpdateParams() {
  const params = {
    ...formModel,
    id: props.curItem.id,
    price:
      Number(utils.getListName(formModel.goodsId, props.goodsList, "price")) *
      Number(formModel.count),
  }
  params.userId = 0
  return params
}
</script>

<style lang="scss"></style>
