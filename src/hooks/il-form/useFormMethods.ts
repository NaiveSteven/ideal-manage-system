/*
 * @Description: description
 * @Author: mjqin
 * @Date: 2021-09-17 16:01:27
 * @LastEditTime: 2021-09-19 00:09:17
 * @LastEditors: mjqin
 */
import type { ComponentInternalInstance } from "vue";
import { ElForm } from "element-plus"; 
import { getCurrentInstance } from "vue";
import { validateCallback, validateFieldCallback } from "@/interfaces/ilForm";
export const useFormMethods = () => {
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance;

  const validate = (callback: validateCallback) => {
    (ctx?.$refs.formRefs as typeof ElForm).validate(callback);
  };

  const validateField = (props: string[] | string, callback: validateFieldCallback) => {
    (ctx?.$refs.formRefs as typeof ElForm).validateField(props, callback);
  };

  const resetFields = () => {
    (ctx?.$refs.formRefs as typeof ElForm).resetFields();
  };

  const scrollToField = (prop: string) => {
    (ctx?.$refs.formRefs as typeof ElForm).scrollToField(prop);
  };

  const clearValidate = (props: string[] | string) => {
    (ctx?.$refs.formRefs as typeof ElForm).clearValidate(props);
  };

  return { validate, validateField, resetFields, scrollToField, clearValidate };
};
