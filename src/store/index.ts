/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-05-26 23:36:30
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-06 00:09:16
 */
/**
 * Vuex状态管理
 */
import { createStore } from 'vuex'
import mutations from './mutations'

const state = {
    // 用户信息
    userInfo: {
        nickname: '',
        phone: '',
        avatar: '',
        username: '',
    },
    // 当前登录用户权限
    permissionList: [],
    // 当前用户登录权限名
    permissionNameList: [],
}
export default createStore({
    state,
    mutations
})