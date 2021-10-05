<template>
  <div>
    <el-dialog
      v-model="visible"
      width="580px"
      :title="mode === 'add' ? '新增角色' : '编辑角色'"
    >
      <il-form
        ref="form"
        :layout="layout"
        :form-model="formModel"
        :form-config="formConfig"
        :options="optionsConfig"
        :form-item-config="formItemConfig"
      >
        <template #checkbox>
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="isCheckAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <template v-for="permission in newPermissionList">
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
        </template>
      </il-form>
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
import { ref, watch, inject, unref, nextTick } from "vue"
import { DIALOG_MODE_EDIT } from "@/const"
import { useShowDialog } from "@/hooks/components/useShowDialog"
import { useDialogAddEdit } from "@/hooks/components/useDialogAddEdit"
import { ElForm } from "element-plus"
import { FORM_MODEL, LAYOUT, FORM_CONFIG, FORM_ITEM_CONFIG } from "./const"
import { useFormData } from "@/hooks/components/useFormData"
import utils from "@/utils/utils"

const props = defineProps<{
  modelValue: boolean
  mode: "add" | "edit"
  curItem: object
  permissionList: any
  moduleList: any
}>()
const emit = defineEmits(["update:modelValue", "updateList"])
const $api = inject("$api") as { [index: string]: Function }
const { formModel, formConfig, formItemConfig, layout, optionsConfig } =
  useFormData(FORM_MODEL, FORM_CONFIG, FORM_ITEM_CONFIG, LAYOUT)
const form = ref(null)
const newPermissionList = ref([])
const checkedPermissionList = ref([])
const permissionIdList = ref([])
const isIndeterminate = ref(false)
const isCheckAll = ref(false)

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
  props,
  emit,
  showDialogCallback,
  notShowDialogCallback
)

const { isConfirmBtnLoading, handleSubmit } = useDialogAddEdit(
  props,
  emit,
  ($api as { [index: string]: Function }).addRole,
  ($api as { [index: string]: Function }).updateRole,
  visible,
  getAddParams,
  getUpdateParams
)

async function showDialogCallback() {
  if (props.mode === DIALOG_MODE_EDIT) {
    await nextTick()
    Object.assign(formModel, props.curItem)
    const arr: any = []
    props.curItem.permissionsID.forEach((item) => {
      arr.push(Number(item))
    })
    checkedPermissionList.value = arr
  }
}

function notShowDialogCallback() {
  ;(unref(form as unknown) as typeof ElForm).resetFields()
  isCheckAll.value = false
  checkedPermissionList.value = []
}

function getAddParams() {
  const ids = checkedPermissionList.value.join()
  const params = {
    name: formModel.name,
    remark: formModel.remark,
    permissionsID: ids,
  }
  return params
}

function getUpdateParams() {
  const ids = checkedPermissionList.value.join()
  const params = {
    id: props.curItem.id,
    name: formModel.name,
    remark: formModel.remark,
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
</script>

<style lang="scss"></style>
