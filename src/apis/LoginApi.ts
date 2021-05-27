import request from '../utils/request'
import { LoginReq } from '../interfaces/Login'

export default {
    login(params: LoginReq) {
        return request({
            url: '/admin/adminUser',
            method: 'post',
            data: params,
        })
    },
}