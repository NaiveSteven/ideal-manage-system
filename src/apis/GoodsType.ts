import request from '../utils/request'
import { GetGoodsListReq } from '../interfaces/Good'

export default {
    getGoodsTypeList(params: GetGoodsListReq) {
        return request({
            url: '/goodsType/getGoodsTypeList',
            method: 'post',
            data: params,
        })
    },
}