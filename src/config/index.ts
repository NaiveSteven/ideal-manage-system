import { EnvConfigInf } from '../interfaces/Config'
/**
 * 环境配置封装
 */
// const env = import.meta.env.MODE || 'prod';
const env = 'dev';
const EnvConfig: EnvConfigInf = {
    dev: {
        baseApi: 'http://localhost:3000/api/v1',
        mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'
    },
    test: {
        baseApi: 'http://localhost:3000/api/v1',
        mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'
    },
    prod: {
        baseApi: 'http://localhost:3000/api/v1',
        mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'
    }
}
export default {
    env,
    mock: false,
    namespace: 'manager',
    ...EnvConfig[env]
}