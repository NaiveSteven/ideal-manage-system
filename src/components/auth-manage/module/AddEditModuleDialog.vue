<!--
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-07-07 19:11:12
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-06 05:17:27
-->
<template>
  <el-dialog
    :title="mode === 'add' ? '新增模块' : '编辑模块'"
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
  $api.addModule,
  $api.updateModule,
  visible,
  () => {
    return { ...formModel }
  },
  () => {
    return { ...formModel, id: props.curItem.id }
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
</script>

<style lang="scss"></style>
