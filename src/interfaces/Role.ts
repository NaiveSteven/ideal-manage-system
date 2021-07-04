export interface GetRoleListReq {
    page: number;
    limit: number;
    keyword?: string;
}

export interface AddRoleReq {
    name: string;
    remark: string;
    permissionsID: string;
}

export interface UpdateRoleReq {
    id: number;
    name: string;
    remark: string;
    permissionsID: string;
}

export interface DeleteRoleReq {
    id: number[];
}