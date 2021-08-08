/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-08-08 21:31:15
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-08 21:38:37
 */
export interface LoginReq {
    username: string;
    password: string;
}

export interface CreateAdminReq extends LoginReq {
    phone: string;
    avatar: string;
    nickname: string;
    roles: string;
}

export interface UpdateAdminReq {
    id: number;
    adminUserId: string;
    phone?: string;
    avatar?:string;
    nickname?: string;
    password?: string;
    roles?: string;
}

export interface DeleteAdminReq {
    id: number;
    AdminUserId: string;
}