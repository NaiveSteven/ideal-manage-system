<!--
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-05-30 17:07:49
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-06 05:33:07
-->
<template>
  <div>
    <el-dialog
      :title="mode === 'add' ? '新增品牌' : '编辑品牌'"
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
  </div>
</template>
<script lang="ts" setup>
import { inject, nextTick, unref, ref } from "vue"
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
  $api.addBrand,
  $api.updateBrand,
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
