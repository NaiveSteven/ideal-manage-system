<template>
  <div>
    <el-dialog
      :title="mode === 'add' ? '新增管理员' : '编辑管理员'"
      v-model="visible"
      width="520px"
    >
      <el-form
        ref="form"
        :model="dialogForm"
        label-width="80px"
        :rules="dialogFormRules"
      >
        <el-form-item label="头像" prop="avatar" label-width="80px">
          <el-input v-model="dialogForm.avatar" placeholder="请输入头像地址" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname" label-width="80px">
          <el-input v-model="dialogForm.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="用户名" prop="username" label-width="80px">
          <el-input v-model="dialogForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="80px">
          <el-input v-model="dialogForm.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone" label-width="80px">
          <el-input v-model="dialogForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="角色" prop="roles" label-width="80px">
          <el-select
            v-model="dialogForm.roles"
            multiple
            placeholder="请选择管理员角色"
          >
            <template v-for="item in roleList" :key="item.id">
              <el-option
                :value="item.id.toString()"
                :label="item.name"
              ></el-option>
            </template>
          </el-select>
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
  name: "AddEditModuleDialog",
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
    roleList: {
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
      phone: "",
      nickname: "",
      username: "",
      password: "",
      roles: [],
      avatar: "",
    })
    const dialogFormRules = reactive({
      phone: [
        {
          required: true,
          trigger: "change",
        },
      ],
      nickname: [
        {
          required: true,
          trigger: "change",
        },
      ],
      username: [
        {
          required: true,
          trigger: "change",
        },
      ],
      password: [
        {
          required: true,
          trigger: "change",
        },
      ],
      roles: [
        {
          required: true,
          trigger: "change",
        },
      ],
      avatar: [
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
        const params = { ...dialogForm }
        params.roles = params.roles.map((item) => item.toString())
        await ctx.$api.addAdmin(params)
        visible.value = false
        ctx.$message.success("创建成功")
        emit("updateList")
      } catch (error) {
        console.log(error, "error")
        ctx.$message(error.msg || error)
      }
      isBtnLoading.value = false
    }

    const handleUpdate = async () => {
      isBtnLoading.value = true
      try {
        const params = {
          ...dialogForm,
          id: props.curItem.id,
          adminUserId: props.curItem.adminUserId,
        }
        params.roles = params.roles.map((item) => item.toString())
        await ctx.$api.updateAdmin(params)
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
