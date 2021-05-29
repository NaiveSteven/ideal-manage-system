<template>
  <div>
    <el-dialog :width="420" title="提示" v-model="visible">
      <span>{{
        contents.length > 0 ? `您确定要删除${content}吗？` : "您确定要删除吗？"
      }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="danger" :loading="isBtnLoading" @click="handleSubmit"
            >删 除</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { ref, watch, computed } from "vue";
export default {
  name: "DelDialog",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    contents: {
      type: Array,
      derfault: () => [],
    },
    isBtnLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const visible = ref(false);

    const content = computed(() => {
      return props.contents.join(",");
    });

    watch(
      () => props.modelValue,
      (newValue) => {
        visible.value = newValue;
      }
    );

    watch(visible, (newValue) => {
      emit("update:modelValue", newValue);
    });

    const handleSubmit = () => {
      emit("delConfirm");
    };

    return {
      visible,
      handleSubmit,
      content,
    };
  },
};
</script>

<style lang="scss"></style>
