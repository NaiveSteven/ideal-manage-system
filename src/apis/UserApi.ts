import request from '../utils/request'
import { GetUserListReq } from '../interfaces/User'

export default {
    getUserList(params: GetUserListReq) {
        return request({
            url: '/user/getUserList',
            method: 'post',
            data: params,
        })
    },
}