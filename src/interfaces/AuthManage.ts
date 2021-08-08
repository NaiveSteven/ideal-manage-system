/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-08-08 21:39:10
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-08 21:44:50
 */
export interface AddModuleReq {
    moduleName: string;
    remark: string;
}

export interface UpdateModuleReq extends AddModuleReq {
    id: number;
}

export interface AddRoleReq {
    name: string;
    remark: string;
    permissionsID: string;
}

export interface UpdateRoleReq extends AddRoleReq {
    id: number;
}

export interface AddPermissionReq {
    name: string;
    permission_type: number;
    module_name: string;
    permission: string;
}

export interface UpdatePermissionReq extends AddPermissionReq {
    id: number;
}