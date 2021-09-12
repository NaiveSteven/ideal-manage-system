<template>
  <div>
    <el-dialog
      :title="mode === 'add' ? '新增模块' : '编辑模块'"
      v-model="visible"
    >
      <el-form
        ref="form"
        :model="dialogForm"
        label-width="100px"
        :rules="dialogFormRules"
      >
        <el-form-item label="模块名" prop="moduleName" label-width="100px">
          <el-input
            v-model="dialogForm.moduleName"
            placeholder="请输入模块名"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark" label-width="100px">
          <el-input
            v-model="dialogForm.remark"
            type="textarea"
            placeholder="请输入备注"
          />
        </el-form-item>
      </el-form>
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
import type { ComponentInternalInstance } from 'vue'
import { getCurrentInstance, reactive, inject } from "vue"
import { DIALOG_MODE_EDIT } from "@/const"
import { ElForm } from "element-plus"
import { useShowDialog } from "@/hooks/components/useShowDialog.ts"
import { useDialogAddEdit } from "@/hooks/components/useDialogAddEdit.ts"

const props = defineProps<{
  modelValue: boolean
  mode: string
  curItem: object
}>()
const emit = defineEmits(['update:modelValue', 'updateList'])
const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance
const $api = inject("$api")
const dialogForm = reactive({
  id: "",
  moduleName: "",
  remark: "",
})
const dialogFormRules = reactive({
  moduleName: [
    {
      required: true,
      trigger: "change",
    },
  ],
  remark: [
    {
      required: true,
      trigger: "change",
    },
  ],
})


const { visible } = useShowDialog(
  ctx,
  props,
  emit,
  showDialogCallback,
  notShowDialogCallback
)

const { isConfirmBtnLoading, handleSubmit, handleAdd, handleUpdate } =
  useDialogAddEdit(
    ctx,
    props,
    emit,
    ($api as { [index: string]: Function }).addModule,
    ($api as { [index: string]: Function }).updateModule,
    visible,
    () => { return {...dialogForm} },
    () => { return {...dialogForm, id: props.curItem.id} }
  )

function showDialogCallback() {
  if (props.mode === DIALOG_MODE_EDIT) {
    ctx?.$nextTick(() => {
      Object.assign(dialogForm, props.curItem)
    })
  }
}

function notShowDialogCallback() {
  ;(ctx?.$refs.form as typeof ElForm).resetFields()
}

// const handleAdd = async () => {
//   isBtnLoading.value = true
//   try {
//     await $api.addModule({ ...dialogForm })
//     visible.value = false
//     $message.success("创建成功")
//     emit("updateList")
//   } catch (error) {
//     $message(error.msg || error)
//   }
//   isBtnLoading.value = false
// }

// const handleUpdate = async () => {
//   isBtnLoading.value = true
//   try {
//     const params = { ...dialogForm, id: props.curItem.id }
//     await $api.updateModule(params)
//     visible.value = false
//     $message.success("编辑成功")
//     emit("updateList")
//   } catch (error) {
//     $message(error.msg || error)
//   }
//   isBtnLoading.value = false
// }
</script>

<style lang="scss"></style>
