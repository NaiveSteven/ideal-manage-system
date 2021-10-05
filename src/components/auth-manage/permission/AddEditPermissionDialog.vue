<template>
  <el-dialog
    :title="mode === 'add' ? '新增权限点' : '编辑权限点'"
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
import { ref, unref, inject, nextTick, onMounted } from "vue"
import { DIALOG_MODE_EDIT } from "@/const"
import { ElForm, ElMessage } from "element-plus"
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
}>()

const emit = defineEmits(["update:modelValue", "updateList"])
const { formModel, formConfig, formItemConfig, layout, optionsConfig } =
  useFormData(FORM_MODEL, FORM_CONFIG, FORM_ITEM_CONFIG, LAYOUT, Options)
const form = ref(null)
const $api = inject("$api") as { [index: string]: Function }

const { visible } = useShowDialog(
  props,
  emit,
  showDialogCallback,
  notShowDialogCallback
)

const { isConfirmBtnLoading, handleSubmit } = useDialogAddEdit(
  props,
  emit,
  $api.addPermission,
  $api.updatePermission,
  visible,
  () => {
    return { ...formModel }
  },
  () => {
    return { ...formModel, id: props.curItem.id }
  }
)

onMounted(() => {
  getModuleList()
})

const getModuleList = async () => {
  try {
    const params = {
      page: 1,
      limit: 1000,
    }
    const { rows } = await $api.getModuleList(params)
    optionsConfig.moduleId = rows.map((item) => ({
      label: item.moduleName,
      value: item.id,
    }))
  } catch (error) {
    ElMessage.error(error.msg || error)
  }
}
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
