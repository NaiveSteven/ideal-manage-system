<template>
  <div>
    <el-dialog
      :title="mode === 'add' ? '新增商品类别' : '编辑商品类别'"
      v-model="visible"
      width="580px"
    >
      <il-form
        ref="form"
        :layout="layout"
        :form-model="formModel"
        :form-config="formConfig"
        :options="optionsConfig"
        :form-item-config="formItemConfig"
      >
        <template #pid>
          <el-form-item label-width="100px" label="父级类别" prop="pid">
            <el-cascader
              v-model="formModel.pid"
              class="w-full"
              :options="goodsTypeList"
              placeholder="请选择商品父级"
            />
          </el-form-item>
        </template>
      </il-form>
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
  </div>
</template>
<script lang="ts" setup>
import { inject, nextTick, ref, unref } from "vue"
import { DIALOG_MODE_EDIT } from "@/const"
import { ElForm } from "element-plus"
import { useShowDialog } from "@/hooks/components/useShowDialog"
import { useDialogAddEdit } from "@/hooks/components/useDialogAddEdit"
import { FORM_MODEL, LAYOUT, FORM_CONFIG, FORM_ITEM_CONFIG } from "./const"
import { useFormData } from "@/hooks/components/useFormData"

const props = defineProps<{
  modelValue: boolean
  mode: "add" | "edit"
  curItem: object
  goodsTypeList: array
}>()
const emit = defineEmits(["update:modelValue", "updateList"])
const form = ref(null)
const $api = inject("$api") as { [index: string]: Function }

const { formModel, formConfig, formItemConfig, layout, optionsConfig } =
  useFormData(FORM_MODEL, FORM_CONFIG, FORM_ITEM_CONFIG, LAYOUT)

const { visible } = useShowDialog(
  props,
  emit,
  showDialogCallback,
  notShowDialogCallback
)

const { isConfirmBtnLoading, handleSubmit } = useDialogAddEdit(
  props,
  emit,
  $api.addGoodsType,
  $api.updateGoodsType,
  visible,
  getAddParams,
  getUpdateParams
)

async function showDialogCallback() {
  if (props.mode === DIALOG_MODE_EDIT) {
    await nextTick()
    formModel.id = props.curItem.id
    formModel.name = props.curItem.name
    formModel.pid = props.curItem.id
  }
}

function notShowDialogCallback() {
  ;(unref(form as unknown) as typeof ElForm).resetFields()
}

function getAddParams() {
  return {
    name: formModel.name,
    pid: formModel.pid.slice().pop(),
  }
}

function getUpdateParams() {
  const params = {
    name: formModel.name,
    pid:
      typeof formModel.pid === "number"
        ? formModel.pid
        : formModel.pid.slice().pop(),
    id: props.curItem.id,
  }
  return params
}
</script>

<style lang="scss"></style>
