export interface GetGoodsListReq {
    page: number;
    limit: number;
    goodsTypeId?: number;
    brandId?: number;
    keyword?: string;
    state?: number;
}

export interface AddGoodsReq {
    name: string;
    goodsTypeId: number;
    brandId: number;
    price: number;
    desc: string;
    count: number;
    marketPrice: number;
    size: string;
    state: number;
    imageUrl: string;
    saleNum: number;
}

export interface UpdateGoodsReq {
    id: number;
    name: string;
    goodsTypeId: number;
    brandId: number;
    price: number;
    desc: string;
    count: number;
    marketPrice: number;
    size: string;
    state: number;
    imageUrl: string;
    saleNum: number;
}