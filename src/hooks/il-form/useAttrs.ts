/*
 * @Description: description
 * @Author: mjqin
 * @Date: 2021-09-14 19:35:00
 * @LastEditTime: 2021-09-17 14:34:47
 * @LastEditors: mjqin
 */
import { computed, getCurrentInstance } from "vue";
import type { ComponentInternalInstance } from "vue";
import { Props } from "@/interfaces/Common";

export const useAttrs = (props: Props, emit: EmitType) => {
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance;
  const bindVal = computed({
    get: () => props.modelValue,
    set: (val) => {
      emit("input", val);
      emit("update:modelValue", val);
    },
  });
  const attrsAll = computed(() => {
    return { ...ctx?.$attrs, ...props.attrs, ...props.dynamicAttrs };
  });

  return { bindVal, attrsAll };
};
