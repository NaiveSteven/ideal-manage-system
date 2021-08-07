import { createRouter, createWebHashHistory, t } from 'vue-router'

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
                name: 'home',
                path: 'ideal',
                meta: {
                    title: '欢迎',
                    permission: 'menu.home',
                },
                component: () => import('../pages/WelcomePage.vue')
            },
            {
                name: 'consumer',
                path: 'ideal/consumerManage',
                meta: {
                    title: '小程序用户管理',
                    permission: 'menu.consumer',

                },
                component: () => import('../pages/ConsumerPage.vue')
            },
            {
                name: 'goodsManage',
                path: 'ideal/goodsManage',
                meta: {
                    title: '商品管理',
                    permission: 'menu.goods',
                },
                component: () => import('../pages/GoodsPage.vue')
            },
            {
                name: 'brandManage',
                path: 'ideal/brandManage',
                meta: {
                    title: '品牌管理',
                    permission: 'menu.brand',
                },
                component: () => import('../pages/BrandPage.vue')
            },
            {
                name: 'moduleManage',
                path: 'ideal/moduleManage',
                meta: {
                    title: '模块管理',
                    permission: 'menu.module',
                },
                component: () => import('../pages/ModulePage.vue')
            },
            {
                name: 'permissionManage',
                path: 'ideal/permissionManage',
                meta: {
                    title: '权限点管理',
                    permission: 'menu.point',
                },
                component: () => import('../pages/PermissionPage.vue')
            },
            {
                name: 'roleManage',
                path: 'ideal/roleManage',
                meta: {
                    title: '角色管理',
                    permission: 'menu.role',
                },
                component: () => import('../pages/RolePage.vue')
            },
            {
                name: 'goodsTypeMange',
                path: 'ideal/goodsTypeManage',
                meta: {
                    title: '商品类别管理',
                    permission: 'menu.goodsType',
                },
                component: () => import('../pages/GoodsTypePage.vue')
            },
            {
                name: 'adminUser',
                path: 'ideal/adminUser',
                meta: {
                    title: '管理员',
                    permission: 'menu.adminUser',
                },
                component: () => import('../pages/AdminPage.vue')
            },
            {
                name: 'placeOrderManage',
                path: 'ideal/placeOrderManage',
                meta: {
                    title: '下单管理',
                    permission: 'menu.placeOrder',
                },
                component: () => import('../pages/PlaceOrderPage.vue')
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