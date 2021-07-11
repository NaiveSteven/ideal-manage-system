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
<script>
import { getCurrentInstance, reactive, ref, watch } from "vue"
import { DIALOG_MODE_ADD, DIALOG_MODE_EDIT } from "../../const"
export default {
  name: "AddEditGoodsTypeDialog",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    mode: {
      type: String,
      default: DIALOG_MODE_ADD,
    },
    curItem: {
      type: Object,
      default: () => {},
    },
    goodsTypeList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const { ctx } = getCurrentInstance()
    const visible = ref(false)
    const isBtnLoading = ref(false)
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
            dialogForm.id = props.curItem.id
            dialogForm.name = props.curItem.name
            dialogForm.pid = props.curItem.id
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
        const params = {
          name: dialogForm.name,
          pid: dialogForm.pid.slice().pop(),
        }
        await ctx.$api.addGoodsType(params)
        visible.value = false
        ctx.$message.success("创建成功")
        emit("updateList")
      } catch (error) {
        ctx.$message(error.msg || error)
      }
      isBtnLoading.value = false
    }

    const handleUpdate = async () => {
      if (dialogForm.pid === props.curItem.id) {
        ctx.$message.warning("请勿选择自己")
        return
      }
      isBtnLoading.value = true
      try {
        const params = {
          name: dialogForm.name,
          pid:
            typeof dialogForm.pid === "number"
              ? dialogForm.pid
              : dialogForm.pid.slice().pop(),
          id: props.curItem.id,
        }
        await ctx.$api.updateGoodsType(params)
        visible.value = false
        ctx.$message.success("编辑成功")
        emit("updateList")
      } catch (error) {
        console.log(error, "error")
        ctx.$message(error.msg || error)
      }
      isBtnLoading.value = false
    }

    return {
      isBtnLoading,
      visible,
      dialogForm,
      dialogFormRules,
      handleReset,
      handleClose,
      handleSubmit,
      handleUpdate,
    }
  },
}
</script>

<style lang="scss"></style>
