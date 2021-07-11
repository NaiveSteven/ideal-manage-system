import request from '../utils/request'
import { GetGoodsTypeListReq, CreateGoodsTypeReq, UpdateGoodsTypeReq, DeleteGoodsTypeReq } from '../interfaces/GoodsType'

export default {
    getGoodsTypeList(params: GetGoodsTypeListReq) {
        return request({
            url: '/goodsType/getGoodsTypeList',
            method: 'post',
            data: params,
        })
    },
    addGoodsType(params: CreateGoodsTypeReq) {
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
    deleteGoodsType(params: DeleteGoodsTypeReq) {
        return request({
            url: '/goodsType/deleteGoodsType',
            method: 'post',
            data: params,
        })
    },
}