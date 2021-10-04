<template>
  <el-dialog
    width="680px"
    :title="mode === 'add' ? '新增订单' : '编辑订单'"
    v-model="visible"
  >
    <el-form
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
</template>
<script lang="ts" setup>
import type { ComponentInternalInstance } from 'vue'
import { getCurrentInstance, reactive, ref, inject } from "vue"
import { GOOD_STATE, DIALOG_MODE_EDIT } from "@/const"
import utils from "@/utils/utils"
import { ElForm } from "element-plus"
import { useShowDialog } from "@/hooks/components/useShowDialog"
import { useDialogAddEdit } from "@/hooks/components/useDialogAddEdit"

const props = defineProps<{
  modelValue: boolean
  mode: 'add' | 'edit'
  curItem: object
  goodsList: array
}>()
const emit = defineEmits(["update:modelValue", "updateList"])
const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance
const $api = inject("$api")
const goodStateList = ref(GOOD_STATE)
const dialogForm = reactive({
  id: "",
  name: "",
  phone: "",
  address: "",
  count: 0,
  goodsId: "",
  deal_state: 1,
  state: 1,
})
const dialogFormRules = reactive({
  name: [
    {
      required: true,
      trigger: "change",
    },
  ],
  phone: [
    {
      required: true,
      trigger: "change",
    },
  ],
  address: [
    {
      required: true,
      trigger: "change",
    },
  ],
  count: [
    {
      required: true,
      trigger: "change",
    },
  ],
  goodsId: [
    {
      required: true,
      trigger: "change",
    },
  ],
  deal_state: [
    {
      required: true,
      trigger: "change",
    },
  ],
  state: [
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
    ($api as { [index: string]: Function }).addPlaceOrder,
    ($api as { [index: string]: Function }).updatePlaceOrder,
    visible,
    getAddParams,
    getUpdateParams
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

function getAddParams() {
  const params = {
    ...dialogForm,
    price:
      Number(utils.getListName(dialogForm.goodsId, props.goodsList, "price")) *
      Number(dialogForm.count),
  }
  delete params.id
  delete params.name
  params.userId = 0
  return params
}

function getUpdateParams() {
  const params = {
    ...dialogForm,
    id: props.curItem.id,
    price:
      Number(utils.getListName(dialogForm.goodsId, props.goodsList, "price")) *
      Number(dialogForm.count),
  }
  params.userId = 0
  return params
}

// const handleAdd = async () => {
//   isBtnLoading.value = true
//   try {
//     const params = {
//       ...dialogForm,
//       price:
//         Number(
//           utils.getListName(dialogForm.goodsId, props.goodsList, "price")
//         ) * Number(dialogForm.count),
//     }
//     delete params.id
//     delete params.name
//     params.userId = 0
//     await $api.addPlaceOrder(params)
//     visible.value = false
//     $message.success("创建成功")
//     emit("updateList")
//   } catch (error) {
//     console.log(error, "error")
//     $message(error.msg || error)
//   }
//   isBtnLoading.value = false
// }

// const handleUpdate = async () => {
//   isBtnLoading.value = true
//   try {
//     const params = {
//       ...dialogForm,
//       id: props.curItem.id,
//       price:
//         Number(
//           utils.getListName(dialogForm.goodsId, props.goodsList, "price")
//         ) * Number(dialogForm.count),
//     }
//     params.userId = 0
//     await ctx.$api.updatePlaceOrder(params)
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
