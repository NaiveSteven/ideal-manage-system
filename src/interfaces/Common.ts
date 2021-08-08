/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-08-08 21:30:59
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-08 21:46:02
 */
export interface PageInfo {
    page: number;
    limit: number;
}

export interface GetListReq extends PageInfo {
    keyword?: string;
}