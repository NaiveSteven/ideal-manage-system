/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-08-08 21:46:22
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-07 05:37:26
 */
import { GetListReq } from './Common'

export interface GetGoodsListReq extends GetListReq {
    goodsTypeId?: number;
    brandId?: number;
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

export interface UpdateGoodsReq extends AddGoodsReq {
    id: number;
}

export interface GoodsTypeInfo {
    name: string;
    pid: string;
}

export interface UpdateGoodsTypeReq extends GoodsTypeInfo {
    id: number;
}

export interface UpdateBrandReq {
    id: number;
    name: string;
}

export interface BrandItem extends UpdateBrandReq {
    adminUserId: number;
}

export interface GoodsItem extends UpdateGoodsReq {
    adminUserId: number;
}

export interface GoodsTypeItem extends UpdateGoodsTypeReq {
    adminUserId: number;
    label?: string;
    value?: number;
    children?: GoodsTypeItem[];
}