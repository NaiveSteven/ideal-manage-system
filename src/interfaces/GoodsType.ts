export interface GetGoodsTypeListReq {
    page: number;
    limit: number;
    keyword: string;
}
export interface CreateGoodsTypeReq {
    name: string;
    pid: string;
}

export interface UpdateGoodsTypeReq {
    id: number;
    name: string;
    pid: string;
}

export interface DeleteGoodsTypeReq {
    id: number;
}