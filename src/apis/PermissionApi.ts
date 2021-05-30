import request from '../utils/request'
import { GetPermissionListReq, AddPermissionReq, UpdatePermissionReq, DeletePermissionReq } from '../interfaces/Permission'

export default {
    getPermissionList(params: GetPermissionListReq) {
        return request({
            url: '/permission/getPermissionList',
            method: 'post',
            data: params,
        })
    },
    addPermission(params: AddPermissionReq) {
        return request({
            url: '/permission/addPermission',
            method: 'post',
            data: params,
        })
    },
    updatePermission(params: UpdatePermissionReq) {
        return request({
            url: '/permission/updatePermission',
            method: 'post',
            data: params,
        })
    },
    deletePermission(params: DeletePermissionReq) {
        return request({
            url: '/permission/deletePermission',
            method: 'post',
            data: params,
        })
    },
}