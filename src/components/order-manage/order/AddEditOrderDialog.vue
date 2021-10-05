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
