import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        name: 'index',
        path: '/',
        meta: {
            title: '首页'
        },
        component: () => import('../pages/layout/HomePage.vue'),
        redirect: '/ideal',
        children: [
            {
                name: 'home',
                path: 'ideal',
                meta: {
                    title: '欢迎',
                    permission: 'menu.home',
                },
                component: () => import('../pages/layout/WelcomePage.vue')
            },
            {
                name: 'consumer',
                path: 'ideal/consumerManage',
                meta: {
                    title: '小程序用户管理',
                    permission: 'menu.consumer',

                },
                component: () => import('../pages/user-manage/ConsumerPage.vue')
            },
            {
                name: 'goodsManage',
                path: 'ideal/goodsManage',
                meta: {
                    title: '商品管理',
                    permission: 'menu.goods',
                },
                component: () => import('../pages/goods-manage/GoodsPage.vue')
            },
            {
                name: 'brandManage',
                path: 'ideal/brandManage',
                meta: {
                    title: '品牌管理',
                    permission: 'menu.brand',
                },
                component: () => import('../pages/goods-manage/BrandPage.vue')
            },
            {
                name: 'moduleManage',
                path: 'ideal/moduleManage',
                meta: {
                    title: '模块管理',
                    permission: 'menu.module',
                },
                component: () => import('../pages/auth-manage/ModulePage.vue')
            },
            {
                name: 'permissionManage',
                path: 'ideal/permissionManage',
                meta: {
                    title: '权限点管理',
                    permission: 'menu.point',
                },
                component: () => import('../pages/auth-manage/PermissionPage.vue')
            },
            {
                name: 'roleManage',
                path: 'ideal/roleManage',
                meta: {
                    title: '角色管理',
                    permission: 'menu.role',
                },
                component: () => import('../pages/auth-manage/RolePage.vue')
            },
            {
                name: 'goodsTypeMange',
                path: 'ideal/goodsTypeManage',
                meta: {
                    title: '商品类别管理',
                    permission: 'menu.goodsType',
                },
                component: () => import('../pages/goods-manage/GoodsTypePage.vue')
            },
            {
                name: 'adminUser',
                path: 'ideal/adminUser',
                meta: {
                    title: '管理员',
                    permission: 'menu.adminUser',
                },
                component: () => import('../pages/user-manage/AdminPage.vue')
            },
            {
                name: 'placeOrderManage',
                path: 'ideal/placeOrderManage',
                meta: {
                    title: '下单管理',
                    permission: 'menu.placeOrder',
                },
                component: () => import('../pages/order-manage/PlaceOrderPage.vue')
            },
            {
                name: 'placeOrderDetail',
                path: 'ideal/placeOrderDetail',
                meta: {
                    title: '下单详情',
                    permission: '',
                    parentName: 'placeOrderManage'
                },
                component: () => import('../pages/order-manage/PlaceOrderDetailPage.vue')
            },
            {
                name: 'test',
                path: 'ideal/test',
                meta: {
                    title: '组件测试',
                    permission: '',
                },
                component: () => import('../pages/test.vue')
            },
            {
                name: 'testTable',
                path: 'ideal/testTable',
                meta: {
                    title: '表格测试',
                    permission: '',
                },
                component: () => import('../pages/testTable.vue')
            },
        ]
    },
    {
        name: 'login',
        path: '/login',
        meta: {
            title: '登录'
        },
        component: () => import('../pages/layout/LoginPage.vue')
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router