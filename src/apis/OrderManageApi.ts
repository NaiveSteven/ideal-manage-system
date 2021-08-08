/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-08-08 11:57:50
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-08 21:55:36
 */
import request from '../utils/request'
import { GetPlaceOrderListReq, AddPlaceOrderReq, UpdatePlaceOrderReq } from '../interfaces/OrderManage'

export default {
    getPlaceOrderList(params: GetPlaceOrderListReq) {
        return request({
            url: '/order/getOrderList',
            method: 'post',
            data: params,
        })
    },
    addPlaceOrder(params: AddPlaceOrderReq) {
        return request({
            url: '/order/addOrder',
            method: 'post',
            data: params,
        })
    },
    updatePlaceOrder(params: UpdatePlaceOrderReq) {
        return request({
            url: '/order/updateOrder',
            method: 'post',
            data: params,
        })
    },
    deletePlaceOrder(params: { id: number }) {
        return request({
            url: '/order/deleteOrder',
            method: 'post',
            data: params,
        })
    },
}