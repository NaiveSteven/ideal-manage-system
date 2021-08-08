/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-08-08 11:58:06
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-08 21:45:50
 */
import request from '../utils/request'
import { GetListReq } from '../interfaces/Common'
import {
    AddModuleReq,
    UpdateModuleReq,
    AddPermissionReq,
    UpdatePermissionReq,
    AddRoleReq,
    UpdateRoleReq
} from '../interfaces/AuthManage'

export default {
    // 模块
    getModuleList(params: GetListReq) {
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
    deleteModule(params: { id: number }) {
        return request({
            url: '/module/deleteModule',
            method: 'post',
            data: params,
        })
    },

    // 权限点
    getPermissionList(params: GetListReq) {
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
    deletePermission(params: { id: number[] }) {
        return request({
            url: '/permission/deletePermission',
            method: 'post',
            data: params,
        })
    },

    // 角色
    getRoleList(params: GetListReq) {
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
    deleteRole(params: { id: number[] }) {
        return request({
            url: '/role/deleteRole',
            method: 'post',
            data: params,
        })
    },
}
