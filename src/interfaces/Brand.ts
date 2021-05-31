export interface GetBrandListReq {
    page: number;
    limit: number;
    keyword: string;
}
export interface CreateBrandReq {
    name: string;
}

export interface UpdateBrandReq {
    id: number;
    name: string;
}

export interface DeleteBrandReq {
    id: number;
}