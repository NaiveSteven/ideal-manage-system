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
        <el-form-item label="权限点类型" prop="permission_type" label-width="100px">
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
import { getCurrentInstance, reactive, ref, watch } from "vue";
import { DIALOG_MODE_ADD, DIALOG_MODE_EDIT } from "../../const";
export default {
  name: "AddEditPermissionDialog",
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
  },
  setup(props, { emit }) {
    const { ctx } = getCurrentInstance();
    const visible = ref(false);
    const isBtnLoading = ref(false);
    const dialogForm = reactive({
      id: "",
      name: "",
      permission_type: 1,
      module_name: "",
      permission: "",
    });
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
    });

    watch(
      () => props.modelValue,
      (newValue) => {
        visible.value = newValue;
      }
    );

    watch(visible, (newValue) => {
      if (!newValue) {
        handleReset("form");
      } else {
        if (props.mode === DIALOG_MODE_EDIT) {
          ctx.$nextTick(() => {
            Object.assign(dialogForm, props.curItem);
          });
        }
      }
      emit("update:modelValue", newValue);
    });

    const handleReset = (form) => {
      ctx.$refs[form].resetFields();
    };

    const handleClose = () => {
      visible.value = false;
      handleReset("form");
    };

    const handleSubmit = () => {
      ctx.$refs.form.validate(async (valid) => {
        if (valid) {
          if (props.mode === DIALOG_MODE_ADD) {
            handleAdd();
          } else {
            handleUpdate();
          }
        }
      });
    };

    const handleAdd = async () => {
      isBtnLoading.value = true;
      try {
        await ctx.$api.addPermission({ ...dialogForm });
        visible.value = false;
        ctx.$message.success("创建成功");
        emit("updateList");
      } catch (error) {
        ctx.$message(error.msg || error);
      }
      isBtnLoading.value = false;
    };

    const handleUpdate = async () => {
      isBtnLoading.value = true;
      try {
        const params = { ...dialogForm, id: props.curItem.id };
        await ctx.$api.updatePermission(params);
        visible.value = false;
        ctx.$message.success("编辑成功");
        emit("updateList");
      } catch (error) {
        ctx.$message(error.msg || error);
      }
      isBtnLoading.value = false;
    };

    return {
      isBtnLoading,
      visible,
      dialogForm,
      dialogFormRules,
      handleReset,
      handleClose,
      handleSubmit,
      handleUpdate,
    };
  },
};
</script>

<style lang="scss"></style>
