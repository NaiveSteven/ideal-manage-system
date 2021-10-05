<template>
  <div>
    <el-dialog
      :title="mode === 'add' ? '新增管理员' : '编辑管理员'"
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
import { inject, nextTick, ref, unref, watch } from "vue"
import { DIALOG_MODE_EDIT } from "@/const"
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
  roleList: array
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
  $api.addAdmin,
  $api.updateAdmin,
  visible,
  getAddParams,
  getUpdateParams
)

watch(
  () => props.roleList,
  () => {
    if (props.roleList.length > 0) {
      optionsConfig.roles = props.roleList.map((item) => ({
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
    formModel.roles = props.curItem.roles.map((item) => Number(item))
  }
}

function notShowDialogCallback() {
  ;(unref(form as unknown) as typeof ElForm).resetFields()
}

function getAddParams() {
  const params = { ...formModel }
  params.roles = params.roles.map((item) => item.toString())
  return params
}

function getUpdateParams() {
  const params = {
    ...formModel,
    id: props.curItem.id,
    adminUserId: props.curItem.adminUserId,
  }
  params.roles = params.roles.map((item) => item.toString())
  return params
}
</script>

<style lang="scss"></style>
