/* * @Description: description * @Author: mjqin * @Date: 2021-09-15 16:11:50 * @LastEditTime: 2021-09-15 16:11:50 *
@LastEditors: mjqin */
<script lang="ts" setup>
import { computed, useSlots, h, provide } from "vue";
export interface Props {
  tag: string;
  gutter: number;
  interval: number;
  type: string;
  justify: string;
  items: string;
  content: string;
  direction: string;
  wrap: string;
}

const slots = useSlots();

const props = withDefaults(defineProps<Props>(), {
  tag: "div",
  gutter: 0,
  interval: 0,
  type: "normal",
  justify: "normal",
  items: "normal",
  content: "normal",
  direction: "row",
  wrap: "nowrap",
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

h(
  props.tag,
  {
    class: [
      "el-row",
      "c-justify-content-" + props.justify,
      "c-align-items-" + props.items,
      "c-align-content-" + props.content,
      "c-flex-direction-" + props.direction,
      "c-flex-wrap-" + props.wrap,
      { "el-row--flex": props.type === "flex" },
    ],
    style: style,
  },
  slots.default
);
</script>
