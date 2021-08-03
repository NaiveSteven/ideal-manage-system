/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-05-26 23:36:30
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-04 00:24:04
 */
/**
 * Vuex状态管理
 */
import { createStore } from 'vuex'
import mutations from './mutations'
import storage from '../utils/storage'

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
}
export default createStore({
    state,
    mutations
})