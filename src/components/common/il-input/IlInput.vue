<!--
 * @Description: description
 * @Author: mjqin
 * @Date: 2021-09-15 11:17:00
 * @LastEditTime: 2021-09-15 20:02:32
 * @LastEditors: mjqin
-->
<template>
  <el-input v-model="bindVal" v-bind="attrsAll" v-on="props.on" />
</template>
<script lang="ts" setup>
import { useAttrs } from "@/hooks/il-form/useAttrs";
const { bindVal, attrsAll, props } = useAttrs();
</script>
