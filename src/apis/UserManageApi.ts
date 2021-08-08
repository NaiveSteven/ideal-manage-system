/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-08-08 11:56:55
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-08 21:37:27
 */
import { GetListReq } from '../interfaces/Common'
import { CreateAdminReq, UpdateAdminReq, DeleteAdminReq, LoginReq } from '../interfaces/UserManage'
import request from '../utils/request'

export default {
    login(params: LoginReq) {
        return request({
            url: '/admin/adminUser',
            method: 'post',
            data: params,
        })
    },
    getUserList(params: GetListReq) {
        return request({
            url: '/user/getUserList',
            method: 'post',
            data: params,
        })
    },
    getAdminList(params: GetListReq) {
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
    getAdminUserInfo() {
        return request({
            url: '/admin/getAdminUserInfo',
            method: 'get'
        })
    }
}