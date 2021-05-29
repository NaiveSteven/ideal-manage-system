import request from '../utils/request'
import { GetGoodsListReq, AddGoodsReq, UpdateGoodsReq } from '../interfaces/Good'

export default {
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
}