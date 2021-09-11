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
          <el-button @click="handleClose">取 消</el-button>
          <el-button
            type="primary"
            :loading="isBtnLoading"
            @click="handleSubmit"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { getCurrentInstance, reactive, ref, watch, inject } from "vue"
import { DIALOG_MODE_ADD, DIALOG_MODE_EDIT } from "@/const"

const props = defineProps<{
  modelValue: boolean
  mode: string
  curItem: object
}>()
const emit = defineEmits(['update:modelValue', 'updateList'])
const { ctx } = getCurrentInstance()
const $api = inject("$api")
const $message = inject("$message")

const visible = ref(false)
const isBtnLoading = ref(false)
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

watch(
  () => props.modelValue,
  (newValue) => {
    visible.value = newValue
  }
)

watch(visible, (newValue) => {
  if (!newValue) {
    handleReset("form")
  } else {
    if (props.mode === DIALOG_MODE_EDIT) {
      ctx.$nextTick(() => {
        Object.assign(dialogForm, props.curItem)
      })
    }
  }
  emit("update:modelValue", newValue)
})

const handleReset = (form) => {
  ctx.$refs[form].resetFields()
}

const handleClose = () => {
  visible.value = false
  handleReset("form")
}

const handleSubmit = () => {
  ctx.$refs.form.validate(async (valid) => {
    if (valid) {
      if (props.mode === DIALOG_MODE_ADD) {
        handleAdd()
      } else {
        handleUpdate()
      }
    }
  })
}

const handleAdd = async () => {
  isBtnLoading.value = true
  try {
    await $api.addModule({ ...dialogForm })
    visible.value = false
    $message.success("创建成功")
    emit("updateList")
  } catch (error) {
    $message(error.msg || error)
  }
  isBtnLoading.value = false
}

const handleUpdate = async () => {
  isBtnLoading.value = true
  try {
    const params = { ...dialogForm, id: props.curItem.id }
    await $api.updateModule(params)
    visible.value = false
    $message.success("编辑成功")
    emit("updateList")
  } catch (error) {
    $message(error.msg || error)
  }
  isBtnLoading.value = false
}
</script>

<style lang="scss"></style>
