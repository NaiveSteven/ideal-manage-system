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
                path: 'ideal',
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
                path: 'ideal/goodsManage',
                meta: {
                    title: '商品管理'
                },
                component: () => import('../pages/GoodsPage.vue')
            },
            {
                name: 'brandManage',
                path: 'ideal/brandManage',
                meta: {
                    title: '品牌管理'
                },
                component: () => import('../pages/BrandPage.vue')
            },
            {
                name: 'moduleManage',
                path: 'ideal/moduleManage',
                meta: {
                    title: '模块管理'
                },
                component: () => import('../pages/ModulePage.vue')
            },
            {
                name: 'permissionManage',
                path: 'ideal/permissionManage',
                meta: {
                    title: '权限点管理'
                },
                component: () => import('../pages/PermissionPage.vue')
            },
            {
                name: 'roleManage',
                path: 'ideal/roleManage',
                meta: {
                    title: '角色管理'
                },
                component: () => import('../pages/RolePage.vue')
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