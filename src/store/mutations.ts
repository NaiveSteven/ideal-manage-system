/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-05-26 23:36:37
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-04 00:23:59
 */
/**
 * Mutations业务层数据提交
 */
import storage from '../utils/storage'

export default {
    saveUserInfo(state: any, userInfo: any){
        state.userInfo = userInfo;
    },
    savePermissionList(state: any, permissionList: any){
        state.permissionList = permissionList;
    }
}