<template>
  <div>
    <el-dialog
      :title="mode === 'add' ? '新增商品类别' : '编辑商品类别'"
      v-model="visible"
    >
      <el-form
        ref="form"
        :model="dialogForm"
        label-width="100px"
        :rules="dialogFormRules"
      >
        <el-form-item label-width="100px" label="商品类别名" prop="name">
          <el-input
            v-model="dialogForm.name"
            placeholder="请输入商品类别名称"
          />
        </el-form-item>
        <el-form-item label-width="100px" label="父级类别" prop="pid">
          <el-cascader
            v-model="dialogForm.pid"
            class="w-full"
            :options="goodsTypeList"
            placeholder="请选择商品父级"
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
  goodsTypeList: array
}>()
const emit = defineEmits(["update:modelValue", "updateList"])
const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance
const $api = inject("$api")
const dialogForm = reactive({
  id: "",
  name: "",
  pid: "",
})
const dialogFormRules = reactive({
  name: [
    {
      required: true,
      trigger: "change",
    },
  ],
  pid: [
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
    ($api as { [index: string]: Function }).addGoodsType,
    ($api as { [index: string]: Function }).updateGoodsType,
    visible,
    getAddParams,
    getUpdateParams
  )

function showDialogCallback() {
  if (props.mode === DIALOG_MODE_EDIT) {
    ctx?.$nextTick(() => {
      dialogForm.id = props.curItem.id
      dialogForm.name = props.curItem.name
      dialogForm.pid = props.curItem.id
    })
  }
}

function notShowDialogCallback() {
  ;(ctx?.$refs.form as typeof ElForm).resetFields()
}

function getAddParams() {
  return {
    name: dialogForm.name,
    pid: dialogForm.pid.slice().pop(),
  }
}

function getUpdateParams() {
  const params = {
    name: dialogForm.name,
    pid:
      typeof dialogForm.pid === "number"
        ? dialogForm.pid
        : dialogForm.pid.slice().pop(),
    id: props.curItem.id,
  }
  return params
}

// const handleAdd = async () => {
//   isBtnLoading.value = true
//   try {
//     const params = {
//       name: dialogForm.name,
//       pid: dialogForm.pid.slice().pop(),
//     }
//     await $api.addGoodsType(params)
//     visible.value = false
//     $message.success("创建成功")
//     emit("updateList")
//   } catch (error) {
//     $message(error.msg || error)
//   }
//   isBtnLoading.value = false
// }

// const handleUpdate = async () => {
//   if (dialogForm.pid === props.curItem.id) {
//     $message.warning("请勿选择自己")
//     return
//   }
//   isBtnLoading.value = true
//   try {
//     const params = {
//       name: dialogForm.name,
//       pid:
//         typeof dialogForm.pid === "number"
//           ? dialogForm.pid
//           : dialogForm.pid.slice().pop(),
//       id: props.curItem.id,
//     }
//     await $api.updateGoodsType(params)
//     visible.value = false
//     $message.success("编辑成功")
//     emit("updateList")
//   } catch (error) {
//     console.log(error, "error")
//     $message(error.msg || error)
//   }
//   isBtnLoading.value = false
// }
</script>

<style lang="scss"></style>
