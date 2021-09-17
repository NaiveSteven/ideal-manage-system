/* * @Description: description * @Author: mjqin * @Date: 2021-09-15 16:11:50 * @LastEditTime: 2021-09-15 16:11:50 *
@LastEditors: mjqin */
<template>
  <div :class="myClass" :style="style">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { computed, provide } from "vue";
export interface Props {
  tag?: string;
  gutter?: number;
  interval?: number;
  type?: string;
  justify?: string;
  items?: string;
  content?: string;
  direction?: string;
  wrap?: string;
}

const props = withDefaults(defineProps<Props>(), {
  tag: "div",
  gutter: 0,
  interval: 0,
  type: "normal",
  justify: "normal",
  items: "normal",
  content: "normal",
  direction: "row",
  wrap: "wrap",
});

const gutter = computed(() => props.gutter);
const interval = computed(() => props.interval);
provide("IlContainer", {
  gutter,
  interval,
});

const style = computed(() => {
  const ret = {} as { marginLeft: string; marginRight: string };
  if (props.gutter) {
    ret.marginLeft = `-${props.gutter / 2}px`;
    ret.marginRight = ret.marginLeft;
  }
  return ret;
});

const myClass = computed(() => {
  return [
    "el-row",
    "c-justify-content-" + props.justify,
    "c-align-items-" + props.items,
    "c-align-content-" + props.content,
    "c-flex-direction-" + props.direction,
    "c-flex-wrap-" + props.wrap,
    { "el-row--flex": props.type === "flex" },
  ];
});
</script>
<style lang="scss" scoped>
.c-w-full {
  width: 100%;
}

.c-flex-direction-row {
  flex-direction: row;
}
.c-flex-direction-column {
  flex-direction: column;
}
.c-flex-direction-row-reverse {
  flex-direction: row-reverse;
}
.c-flex-direction-column-reverse {
  flex-direction: column-reverse;
}

.c-flex-wrap-nowrap {
  flex-wrap: nowrap;
}
.c-flex-wrap-wrap {
  flex-wrap: wrap;
}
.c-flex-wrap-wrap-reverse {
  flex-wrap: wrap-reverse;
}

.c-justify-content-center {
  justify-content: center;
}
.c-justify-content-flex-start {
  justify-content: flex-start;
}
.c-justify-content-flex-end {
  justify-content: flex-end;
}
.c-justify-content-space-between {
  justify-content: space-between;
}
.c-justify-content-space-around  {
  justify-content: space-around ;
}
.c-justify-content-space-evenly {
  justify-content: space-evenly;
}

.c-align-items-stretch {
  align-items: stretch;
}
.c-align-items-flex-start {
  align-items: flex-start;
}
.c-align-items-flex-end {
  align-items: flex-end;
}
.c-align-items-center {
  align-items: center;
}

.c-align-content-center {
  align-content: center;
}
.c-align-content-flex-start {
  align-content: flex-start;
}
.c-align-content-flex-end {
  align-content: flex-end;
}
.c-align-content-stretch {
  align-content: stretch;
}
.c-align-content-space-between {
  align-content: space-between;
}
.c-align-content-space-around {
  align-content: space-around;
}
</style>>
