/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-05-21 22:02:03
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-03 23:20:59
 */
import axios from 'axios'
import config from './../config'
import { ElMessage } from 'element-plus'
import { Option } from '../interfaces/Request';
import router from '../router'
import storage from './storage'
import { TOKEN_INVALID, NETWORK_ERROR } from '../const'

// 创建axios实例对象，添加全局配置
const service = axios.create({
    baseURL: config.baseApi,
    timeout: 8000
})

// 请求拦截
service.interceptors.request.use((req) => {
    const headers = req.headers;
    const token = storage.getItem('token');
    if (!headers.Authorization && token) headers.Authorization = 'Bearer ' + token;
    return req;
})

// 响应拦截
service.interceptors.response.use((res) => {
    const { errorCode, data, errorMsg } = res.data;
    if (errorCode === 200) {
        return data;
    } else if (errorCode === 401) {
        ElMessage.error(TOKEN_INVALID)
        setTimeout(() => {
            router.push('/login')
        }, 1500)
        return Promise.reject(TOKEN_INVALID)
    } else {
        ElMessage.error(errorMsg || NETWORK_ERROR)
        return Promise.reject(errorMsg || NETWORK_ERROR)
    }
})
/**
 * 请求核心函数
 * @param {*} options 请求配置
 */
function request(options: Option) {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data;
    }
    let isMock = config.mock;
    if (typeof options.mock != 'undefined') {
        isMock = options.mock;
    }
    if (config.env === 'prod') {
        service.defaults.baseURL = config.baseApi
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }

    return service(options)
}

export default request;
