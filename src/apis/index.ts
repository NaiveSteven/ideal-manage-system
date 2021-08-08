/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-05-22 16:58:57
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-08 21:30:13
 */
import AuthManageApi from './AuthManageApi'
import GoodsManageApi from './GoodsManageApi'
import OrderManageApi from './OrderManageApi'
import UserManageApi from './UserManageApi'

export default {
    ...AuthManageApi,
    ...GoodsManageApi,
    ...OrderManageApi,
    ...UserManageApi
}