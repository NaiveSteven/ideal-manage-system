/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-07-18 17:44:12
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-08 21:57:10
 */
import { GetListReq } from './Common'

export interface GetPlaceOrderListReq extends GetListReq {
    userId?: number;
    state?: number;
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

export interface UpdatePlaceOrderReq extends AddPlaceOrderReq {
    id: number;
}