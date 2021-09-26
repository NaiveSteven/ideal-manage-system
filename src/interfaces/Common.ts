/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-08-08 21:30:59
 * @LastEditors: mjqin
 * @LastEditTime: 2021-09-26 19:51:43
 */
export interface PageInfo {
  page: number;
  limit: number;
}

export interface GetListReq extends PageInfo {
  keyword?: string;
}

export interface Error {
  msg: String;
  code: Number;
  data: any;
}

export interface ListItem {
  label: string;
  value: string | number;
}
export interface Props {
  modelValue?: string | number | Array<any> | Object | Boolean;
  prop?: string;
  attrs?: Object;
  dynamicAttrs?: Object;
  options?: Array<ListItem>;
  on?: On;
  rowData?: Array<any>;
}

export interface IndexInterface {
  [index: string]: string;
}

export interface On {
  [index: string]: (...args: any) => void
}