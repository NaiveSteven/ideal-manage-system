<template>
  <div>
    <el-dialog
      v-model="visible"
      width="560px"
      :title="mode === 'add' ? '新增角色' : '编辑角色'"
    >
      <el-form
        ref="form"
        :model="dialogForm"
        label-width="100px"
        :rules="dialogFormRules"
      >
        <el-form-item label="角色名" prop="name" label-width="100px">
          <el-input v-model="dialogForm.name" placeholder="请输入角色名" />
        </el-form-item>
        <el-form-item label="备注" prop="remark" label-width="100px">
          <el-input
            type="textarea"
            v-model="dialogForm.remark"
            :autosize="{ minRows: 2, maxRows: 6 }"
            placeholder="请输入备注"
          />
        </el-form-item>
        <div>
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="isCheckAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <template
            v-for="(permission, index) in newPermissionList"
            :key="index"
          >
            <div class="my-2 text-xl">{{ permission.module_name }}</div>
            <el-checkbox-group
              v-model="checkedPermissionList"
              @change="handleCheckedPermissionChange"
            >
              <el-checkbox
                v-for="(item, cIndex) in permission.arr"
                :label="item.id"
                :key="cIndex"
                >{{ item.label }}</el-checkbox
              >
            </el-checkbox-group>
          </template>
        </div>
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
import utils from "@/utils/utils"
const props = defineProps<{
  modelValue: boolean
  mode: string
  curItem: object
  permissionList: array
  moduleList: array
}>()
const emit = defineEmits(["update:modelValue", "updateList"])
const { ctx } = getCurrentInstance()
const $api = inject("$api")
const $message = inject("$message")
const newPermissionList = ref([])
const visible = ref(false)
const isBtnLoading = ref(false)
const checkedPermissionList = ref([])
const permissionIdList = ref([])
const isIndeterminate = ref(false)
const isCheckAll = ref(false)
const dialogForm = reactive({
  permissionsID: "",
  name: "",
  remark: "",
})
const dialogFormRules = reactive({
  name: [
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

watch(
  () => props.permissionList,
  (newValue) => {
    const arr = []
    const obj = []
    newValue.forEach((permission) => {
      permission.module_name = utils.getListName(
        permission.moduleId,
        props.moduleList,
        "moduleName"
      )
      obj[permission.module_name] = permission.module_name
      permissionIdList.value.push(permission.id)
    })
    Object.keys(obj).forEach((item) => {
      arr.push({
        module_name: item,
        arr: [],
      })
    })
    newValue.forEach((permission) => {
      arr.forEach((item) => {
        if (permission.module_name === item.module_name) {
          item.arr.push({
            id: permission.id,
            name: permission.name,
            permission_type: permission.permission_type,
            permission: permission.permission,
            label: permission.name + ": " + permission.permission,
          })
        }
      })
    })
    newPermissionList.value = arr
  }
)

watch(visible, (newValue) => {
  if (!newValue) {
    handleReset("form")
    isCheckAll.value = false
    checkedPermissionList.value = []
  } else {
    if (props.mode === DIALOG_MODE_EDIT) {
      ctx.$nextTick(() => {
        Object.assign(dialogForm, props.curItem)
        const arr = []
        props.curItem.permissionsID.forEach((item) => {
          arr.push(Number(item))
        })
        checkedPermissionList.value = arr
      })
    }
  }
  emit("update:modelValue", newValue)
})

const handleCheckAllChange = (val) => {
  checkedPermissionList.value = val ? permissionIdList.value : []
  isIndeterminate.value = false
}

// 全选样式变化
const handleCheckedPermissionChange = (value) => {
  const checkedCount = value.length
  isCheckAll.value = checkedCount === permissionIdList.value.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < permissionIdList.value.length
}

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
    const ids = checkedPermissionList.value.join()
    const params = {
      name: dialogForm.name,
      remark: dialogForm.remark,
      permissionsID: ids,
    }
    await $api.addRole(params)
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
    const ids = checkedPermissionList.value.join()
    const params = {
      id: props.curItem.id,
      name: dialogForm.name,
      remark: dialogForm.remark,
      permissionsID: ids,
    }
    await $api.updateRole(params)
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
