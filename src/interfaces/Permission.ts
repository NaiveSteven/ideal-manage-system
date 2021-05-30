export interface GetPermissionListReq {
    page: number;
    limit: number;
    keyword?: string;
}

export interface AddPermissionReq {
    name: string;
    permission_type: number;
    module_name: string;
    permission: string;
}

export interface UpdatePermissionReq {
    id: number;
    name: string;
    permission_type: number;
    module_name: string;
    permission: string;
}

export interface DeletePermissionReq {
    id: number[];
}