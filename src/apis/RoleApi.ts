import request from '../utils/request'
import { GetRoleListReq, AddRoleReq, UpdateRoleReq, DeleteRoleReq } from '../interfaces/Role'

export default {
    getRoleList(params: GetRoleListReq) {
        return request({
            url: '/role/getRoleList',
            method: 'post',
            data: params,
        })
    },
    addRole(params: AddRoleReq) {
        return request({
            url: '/role/addRole',
            method: 'post',
            data: params,
        })
    },
    updateRole(params: UpdateRoleReq) {
        return request({
            url: '/role/updateRole',
            method: 'post',
            data: params,
        })
    },
    deleteRole(params: DeleteRoleReq) {
        return request({
            url: '/role/deleteRole',
            method: 'post',
            data: params,
        })
    },
}