import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        name: 'index',
        path: '/',
        meta: {
            title: '首页'
        },
        component: () => import('../pages/HomePage.vue'),
        redirect: '/ideal',
        children: [
            {
                name: 'welcome',
                path: '/ideal',
                meta: {
                    title: '欢迎'
                },
                component: () => import('../pages/WelcomePage.vue')
            },
            {
                name: 'consumer',
                path: 'ideal/consumerManage',
                meta: {
                    title: '小程序用户管理'
                },
                component: () => import('../pages/ConsumerPage.vue')
            },
            {
                name: 'goodsManage',
                path: '/ideal/goodsManage',
                meta: {
                    title: '商品管理'
                },
                component: () => import('../pages/GoodsPage.vue')
            },
        ]
    },
    {
        name: 'login',
        path: '/login',
        meta: {
            title: '登录'
        },
        component: () => import('../pages/LoginPage.vue')
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router