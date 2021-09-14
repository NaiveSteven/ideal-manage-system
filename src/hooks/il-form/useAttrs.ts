/*
 * @Description: description
 * @Author: mjqin
 * @Date: 2021-09-14 19:35:00
 * @LastEditTime: 2021-09-14 19:47:58
 * @LastEditors: mjqin
 */
import { computed, getCurrentInstance } from "vue";
import type { ComponentInternalInstance } from "vue";
export interface ListItem {
  label: String;
  value: String | Number;
}
export interface Props {
  value: String | Number | Array<any> | Object | Boolean;
  prop: String;
  attrs: Object;
  dynamicAttrs: Object;
  options: Array<ListItem>;
  on: Object;
}
export const useAttrs = () => {
  const props = withDefaults(defineProps<Props>(), {
    on: () => ({} as Object),
  });
  const emit = defineEmits(["input", "update:modelValue"]);
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance;

  const bindVal = computed({
    get() {
      return props.value;
    },
    set(val) {
      emit("input", val);
      emit("update:modelValue", val);
    },
  });

  const attrsAll = computed(() => {
    return { ...ctx?.$attrs, ...props.attrs, ...props.dynamicAttrs };
  });

  return { bindVal, attrsAll };
};
