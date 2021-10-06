/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-08-08 21:31:15
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-07 06:24:35
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

export interface AdminItem {
    id: number;
    adminUserId: string;
    phone?: string;
    avatar?:string;
    nickname?: string;
    password?: string;
    roles?: string;
}

export interface ConsumerItem {
    id: number;
    adminUserId: number;
    name: string;
    integral: number;
    password: string;
    createdAt: string;
}