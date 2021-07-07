import request from '../utils/request'
import { GetModuleListReq, AddModuleReq, UpdateModuleReq, DeleteModuleReq } from '../interfaces/Module'

export default {
    getModuleList(params: GetModuleListReq) {
        return request({
            url: '/module/getModuleList',
            method: 'post',
            data: params,
        })
    },
    addModule(params: AddModuleReq) {
        return request({
            url: '/module/addModule',
            method: 'post',
            data: params,
        })
    },
    updateModule(params: UpdateModuleReq) {
        return request({
            url: '/module/updateModule',
            method: 'post',
            data: params,
        })
    },
    deleteModule(params: DeleteModuleReq) {
        return request({
            url: '/module/deleteModule',
            method: 'post',
            data: params,
        })
    },
}