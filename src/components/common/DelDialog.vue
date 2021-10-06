<!--
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-05-29 18:15:29
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-07 06:30:17
-->
<template>
  <div>
    <el-dialog :width="420" title="提示" v-model="visible">
      <span>{{
        props.contents.length > 0 ? `您确定要删除${content}吗？` : "您确定要删除吗？"
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
import { computed } from "vue"
import { useShowDialog } from "@/hooks/components/useShowDialog"
const props = defineProps<{
  modelValue: boolean
  contents: array
  isBtnLoading: boolean
}>()
const emit = defineEmits(["update:modelValue", "delConfirm"])

const content = computed(() => {
  return props.contents.join(",")
})

const { visible } = useShowDialog(
  props,
  emit,
  () => {},
  () => {}
)

const handleSubmit = () => {
  emit("delConfirm")
}
</script>

<style lang="scss"></style>
