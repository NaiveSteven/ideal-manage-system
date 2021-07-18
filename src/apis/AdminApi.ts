import request from '../utils/request'
import { GetAdminUserListReq, CreateAdminReq, UpdateAdminReq, DeleteAdminReq } from '../interfaces/Admin'

export default {
    getAdminList(params: GetAdminUserListReq) {
        return request({
            url: '/admin/getAdminUserList',
            method: 'post',
            data: params,
        })
    },
    addAdmin(params: CreateAdminReq) {
        return request({
            url: '/admin/addAdminUser',
            method: 'post',
            data: params,
        })
    },
    updateAdmin(params: UpdateAdminReq) {
        return request({
            url: '/admin/updateAdminUser',
            method: 'post',
            data: params,
        })
    },
    deleteAdmin(params: DeleteAdminReq) {
        return request({
            url: '/admin/deleteAdminUser',
            method: 'post',
            data: params,
        })
    },
}