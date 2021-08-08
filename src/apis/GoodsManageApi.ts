/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-08-08 11:57:35
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-08 21:55:14
 */
import request from '../utils/request'
import { GetListReq } from '../interfaces/Common'
import {
    UpdateBrandReq,
    GetGoodsListReq,
    AddGoodsReq,
    UpdateGoodsReq,
    GoodsTypeInfo,
    UpdateGoodsTypeReq
} from '../interfaces/GoodsManage'

export default {
    getBrandList(params: GetListReq) {
        return request({
            url: '/brand/getBrandList',
            method: 'post',
            data: params,
        })
    },
    addBrand(params: { name: string }) {
        return request({
            url: '/brand/addBrand',
            method: 'post',
            data: params,
        })
    },
    updateBrand(params: UpdateBrandReq) {
        return request({
            url: '/brand/updateBrand',
            method: 'post',
            data: params,
        })
    },
    deleteBrand(params: { id: number }) {
        return request({
            url: '/brand/deleteBrand',
            method: 'post',
            data: params,
        })
    },
    getGoodsList(params: GetGoodsListReq) {
        return request({
            url: '/goods/getGoodsList',
            method: 'post',
            data: params,
        })
    },

    deleteGoods(params: { id: number[] }) {
        return request({
            url: '/goods/deleteGoods',
            method: 'post',
            data: params,
        })
    },

    addGoods(params: AddGoodsReq) {
        return request({
            url: '/goods/addGoods',
            method: 'post',
            data: params,
        })
    },

    updateGoods(params: UpdateGoodsReq) {
        return request({
            url: '/goods/updateGoods',
            method: 'post',
            data: params,
        })
    },

    getGoodsTypeList(params: GetGoodsListReq) {
        return request({
            url: '/goodsType/getGoodsTypeList',
            method: 'post',
            data: params,
        })
    },
    addGoodsType(params: GoodsTypeInfo) {
        return request({
            url: '/goodsType/addGoodsType',
            method: 'post',
            data: params,
        })
    },
    updateGoodsType(params: UpdateGoodsTypeReq) {
        return request({
            url: '/goodsType/updateGoodsType',
            method: 'post',
            data: params,
        })
    },
    deleteGoodsType(params: { id: number }) {
        return request({
            url: '/goodsType/deleteGoodsType',
            method: 'post',
            data: params,
        })
    },
}