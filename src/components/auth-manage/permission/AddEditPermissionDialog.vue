<template>
  <div>
    <el-dialog
      :title="mode === 'add' ? '新增权限点' : '编辑权限点'"
      v-model="visible"
    >
      <el-form
        ref="form"
        :model="dialogForm"
        label-width="100px"
        :rules="dialogFormRules"
      >
        <el-form-item label="名称" prop="name" label-width="100px">
          <el-input v-model="dialogForm.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="权限点" prop="permission" label-width="100px">
          <el-input
            v-model="dialogForm.permission"
            placeholder="请输入权限点"
          />
        </el-form-item>
        <el-form-item
          label="权限点类型"
          prop="permission_type"
          label-width="100px"
        >
          <el-radio-group v-model="dialogForm.permission_type">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
            <el-radio :label="3">数据</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属模块名" prop="module_name" label-width="100px">
          <el-input
            v-model="dialogForm.module_name"
            placeholder="请输入模块名称"
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
import { useShowDialog } from "@/hooks/components/useShowDialog"
import { useDialogAddEdit } from "@/hooks/components/useDialogAddEdit"

const props = defineProps<{
  modelValue: boolean
  mode: 'add' | 'edit'
  curItem: object
}>()
const emit = defineEmits(["update:modelValue", "updateList"])
const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance
const $api = inject("$api")
const dialogForm = reactive({
  id: "",
  name: "",
  permission_type: 1,
  module_name: "",
  permission: "",
})
const dialogFormRules = reactive({
  name: [
    {
      required: true,
      trigger: "change",
    },
  ],
  permission_type: [
    {
      required: true,
      trigger: "change",
    },
  ],
  module_name: [
    {
      required: true,
      trigger: "change",
    },
  ],
  permission: [
    {
      required: true,
      trigger: "change",
    },
  ],
})

const { visible } = useShowDialog(
  props,
  emit,
  showDialogCallback,
  notShowDialogCallback
)

const { isConfirmBtnLoading, handleSubmit } =
  useDialogAddEdit(
    ctx,
    props,
    emit,
    ($api as { [index: string]: Function }).addPermission,
    ($api as { [index: string]: Function }).updatePermission,
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
//     await $api.addPermission({ ...dialogForm })
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
//     await $api.updatePermission(params)
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
