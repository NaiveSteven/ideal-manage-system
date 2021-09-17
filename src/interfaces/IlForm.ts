/*
 * @Description: description
 * @Author: mjqin
 * @Date: 2021-09-17 15:36:53
 * @LastEditTime: 2021-09-17 16:53:15
 * @LastEditors: mjqin
 */
export interface FormItemConfigItem {
  type: string;
  prop: string;
  formItem?: {
    [index: string]: string;
  };
  attrs?: {
    [index: string]: string;
  };
  hide?: Function;
  on?: Function;
  dynamicAttrs?: string;
  modifier?: string;
}

export type validateCallback = (isSuccess: boolean, field: object) => void
export type validateFieldCallback = (errorMessage: string) => void
export interface FormActionType {
  validate: (callback: validateCallback) => void
  validateField: (props: string[] | string, callback: validateFieldCallback) => void
  resetFields: () => void
  scrollToField: (prop: string) => void
  clearValidate: (props: string[] | string) => void
}