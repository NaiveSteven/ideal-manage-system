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
          <el-input v-model="dialogForm.moduleName" placeholder="请输入模块名" />
        </el-form-item>
        <el-form-item label="备注" prop="remark" label-width="100px">
          <el-input v-model="dialogForm.remark" type="textarea" placeholder="请输入备注" />
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
  },
  setup(props, { emit }) {
    const { ctx } = getCurrentInstance();
    const visible = ref(false);
    const isBtnLoading = ref(false);
    const dialogForm = reactive({
      id: "",
      moduleName: "",
      remark: "",
    });
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
        await ctx.$api.addModule({ ...dialogForm });
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
        await ctx.$api.updateModule(params);
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