export interface GetModuleListReq {
    page: number;
    limit: number;
    keyword: string;
}
export interface AddModuleReq {
    moduleName: string;
    remark: string;
}

export interface UpdateModuleReq {
    id: number;
    moduleName: string;
    remark: string;
}

export interface DeleteModuleReq {
    id: number;
}