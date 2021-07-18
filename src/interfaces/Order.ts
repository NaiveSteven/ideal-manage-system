export interface Page {
    page: number;
    limit: number;
}

export interface PageInfo {
    page: number;
    limit: number;
    total: number;
}

export interface GetPlaceOrderListReq extends Page {
    page: number;
    limit: number;
    userId?: number;
    state?: number;
    keyword?: string;
    deal_state?: number;
}

export interface AddPlaceOrderReq {
    userId: number;
    goodsId: number;
    phone: string;
    address: string;
    price: number;
    count: number;
    state: number;
    deal_state: number;
}

export interface UpdatePlaceOrderReq {
    id: number;
    userId: number;
    goodsId: number;
    phone: string;
    address: string;
    price: number;
    count: number;
    state: number;
    deal_state: number;
}