/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-08-08 21:30:59
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-06 17:53:05
 */
export interface PageInfo {
  page: number;
  limit: number;
  total: number;
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
  [index: string]: any;
}

export interface On {
  [index: string]: (...args: any) => void
}

export interface RowLayout {
  type?: string;
  justify?: string;
  items?: string;
  content?: string;
  direction?: string;
  wrap?: string;
}
export interface ColLayout {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}
export interface Layout {
  rowLayout?: RowLayout;
  colLayout?: ColLayout;
}