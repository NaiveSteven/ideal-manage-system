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
import { getCurrentInstance, reactive, ref, watch, inject } from "vue"
import { DIALOG_MODE_EDIT } from "@/const"
import { useShowDialog } from "@/hooks/components/useShowDialog.ts"
import { useDialogAddEdit } from "@/hooks/components/useDialogAddEdit.ts"
import { ElForm } from "element-plus"
import utils from "@/utils/utils"

const props = defineProps<{
  modelValue: boolean
  mode: string
  curItem: object
  permissionList: array
  moduleList: array
}>()
const emit = defineEmits(["update:modelValue", "updateList"])
const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance
const $api = inject("$api") as { [index: string]: Function }
const newPermissionList = ref([])
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
    ($api as { [index: string]: Function }).addRole,
    ($api as { [index: string]: Function }).updateRole,
    visible,
    getAddParams,
    getUpdateParams
  )

function showDialogCallback() {
  if (props.mode === DIALOG_MODE_EDIT) {
    ctx.$nextTick(() => {
      Object.assign(dialogForm, props.curItem)
      const arr: any = []
      props.curItem.permissionsID.forEach((item) => {
        arr.push(Number(item))
      })
      checkedPermissionList.value = arr
    })
  }
}

function notShowDialogCallback() {
  ;(ctx?.$refs.form as typeof ElForm).resetFields()
  isCheckAll.value = false
  checkedPermissionList.value = []
}

function getAddParams() {
  const ids = checkedPermissionList.value.join()
  const params = {
    name: dialogForm.name,
    remark: dialogForm.remark,
    permissionsID: ids,
  }
  return params
}

function getUpdateParams() {
  const ids = checkedPermissionList.value.join()
  const params = {
    id: props.curItem.id,
    name: dialogForm.name,
    remark: dialogForm.remark,
    permissionsID: ids,
  }
  return params
}

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

// const handleAdd = async () => {
//   isBtnLoading.value = true
//   try {
//     const ids = checkedPermissionList.value.join()
//     const params = {
//       name: dialogForm.name,
//       remark: dialogForm.remark,
//       permissionsID: ids,
//     }
//     await $api.addRole(params)
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
//     const ids = checkedPermissionList.value.join()
//     const params = {
//       id: props.curItem.id,
//       name: dialogForm.name,
//       remark: dialogForm.remark,
//       permissionsID: ids,
//     }
//     await $api.updateRole(params)
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
