/*
 * @Description: description
 * @Author: mjqin
 * @Date: 2021-09-14 19:35:00
 * @LastEditTime: 2021-09-26 19:34:49
 * @LastEditors: mjqin
 */
import { computed, getCurrentInstance } from "vue";
import type { ComponentInternalInstance } from "vue";
import { useComponentMethods } from "./useComponentMethods";
import { Props, On } from "@/interfaces/Common";

export const useAttrs = (props: Props, emit: EmitType) => {
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance;
  const { blur, focus, change, input, clear, visibleChange, removeTag } = useComponentMethods(props)
  const obj = {
    blur,
    focus,
    change,
    input,
    clear,
    visibleChange,
    removeTag,
  };

  const bindVal = computed({
    get: () => props.modelValue,
    set: (val) => {
      emit("input", val);
      emit("update:modelValue", val);
    },
  });
  const onAll = computed(() => {
    const newOn = {} as On;
    if (props.on) {
      Object.keys(props.on).forEach((item) => {
        newOn[item] = obj[item as (keyof typeof obj)] || function () {};
      });
    }
    return newOn;
  });
  const attrsAll = computed(() => {
    return { ...ctx?.$attrs, ...props.attrs, ...props.dynamicAttrs };
  });


  return { bindVal, attrsAll, onAll };
};
