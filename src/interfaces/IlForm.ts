/*
 * @Description: description
 * @Author: mjqin
 * @Date: 2021-09-17 15:36:53
 * @LastEditTime: 2021-09-17 15:38:38
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