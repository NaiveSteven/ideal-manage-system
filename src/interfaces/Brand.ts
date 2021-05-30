export interface GetBrandListReq {
    page: number;
    limit: number;
    keyword: string;
}
export interface CreateBrandReq {
    name: string;
    adminUserId: number;
}

export interface UpdateBrandReq {
    id: number;
    name: string;
    adminUserId: number;
}

export interface DeleteBrandReq {
    id: number;
    adminUserId: number;
}