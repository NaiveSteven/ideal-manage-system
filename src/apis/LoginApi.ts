import request from '../utils/request'
import { LoginReq } from '../interfaces/Login'

export default {
    login(params: LoginReq) {
        return request({
            url: '/users/login',
            method: 'post',
            data: params,
        })
    },
}