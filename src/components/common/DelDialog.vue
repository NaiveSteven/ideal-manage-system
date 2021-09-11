<!--
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-05-29 18:15:29
 * @LastEditors: mjqin
 * @LastEditTime: 2021-09-12 02:24:48
-->
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
<script lang="ts" setup>
import { ref, watch, computed } from "vue"
const props = defineProps<{
  modelValue: boolean
  contents: array
  isBtnLoading: boolean
}>()
const emit = defineEmits(["update:modelValue", "delConfirm"])
const visible = ref(false)

const content = computed(() => {
  return props.contents.join(",")
})

watch(
  () => props.modelValue,
  (newValue) => {
    visible.value = newValue
  }
)

watch(visible, (newValue) => {
  emit("update:modelValue", newValue)
})

const handleSubmit = () => {
  emit("delConfirm")
}
</script>

<style lang="scss"></style>
