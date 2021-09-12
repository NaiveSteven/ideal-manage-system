/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-08-08 21:30:59
 * @LastEditors: mjqin
 * @LastEditTime: 2021-09-12 22:25:32
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