import request from '../utils/request'
import { GetBrandListReq, CreateBrandReq, UpdateBrandReq, DeleteBrandReq } from '../interfaces/Brand'

export default {
    getBrandList(params: GetBrandListReq) {
        return request({
            url: '/brand/getBrandList',
            method: 'post',
            data: params,
        })
    },
    addBrand(params: CreateBrandReq) {
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
    deleteBrand(params: DeleteBrandReq) {
        return request({
            url: '/brand/deleteBrand',
            method: 'post',
            data: params,
        })
    },
}