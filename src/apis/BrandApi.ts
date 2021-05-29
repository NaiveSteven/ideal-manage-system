import request from '../utils/request'
import { GetBrandListReq } from '../interfaces/BrandApi'

export default {
    getBrandList(params: GetBrandListReq) {
        return request({
            url: '/brand/getBrandList',
            method: 'post',
            data: params,
        })
    },
}