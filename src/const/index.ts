import { MenuItem } from '../interfaces/Menu';
export const TOKEN_INVALID = 'Token认证失败，请重新登录'
export const NETWORK_ERROR = '网络请求异常，请稍后重试'

export const MENU_DATA: MenuItem[] = [
    {
        menuName: '首页',
        name: 'home',
        icon: 'el-icon-s-home',
        permission: 'menu.home',
        path: '/ideal',
    },
    {
        menuName: '管理员',
        name: 'adminUser',
        icon: 'el-icon-s-custom',
        permission: 'menu.adminUser',
        path: '/ideal/adminUser',
    },
    {
        menuName: '权限管理',
        name: 'permission-manage',
        icon: 'el-icon-s-flag',
        permission: 'menu.permission-manage',
        path: '/permission',
        children: [
            {
                menuName: '权限点管理',
                name: 'point-manage',
                icon: 'el-icon-lollipop',
                permission: 'menu.',
                path: '/ideal/adminUser',
            },
            {
                menuName: '角色管理',
                name: 'role-manage',
                icon: 'el-icon-s-check',
                permission: 'menu.role-manage',
                path: '/ideal/roleManage',
            },
        ],
    },
    {
        menuName: '小程序用户管理',
        name: 'consumer-manage',
        icon: 'el-icon-user-solid',
        permission: 'menu.consumer-manage',
        path: '/ideal/consumerManage',
    },
    {
        menuName: '商品管理',
        name: 'goods-manage',
        icon: 'el-icon-s-shop',
        permission: 'menu.goodsManage',
        path: '/ideal/goodsManage',
    },
    {
        menuName: '爆款管理',
        name: 'explosion-manage',
        icon: 'el-icon-shopping-cart-full',
        permission: 'menu.explosion-manage',
        path: '/ideal/explosionManage',
    },
    {
        menuName: '促销管理',
        name: 'promotion-manage',
        icon: 'el-icon-shopping-cart-2',
        permission: 'menu.promotion-manage',
        path: '/ideal/promotionManage',
    },
    {
        menuName: '品牌管理',
        name: 'brand-manage',
        icon: 'el-icon-reading',
        permission: 'menu.brand-manage',
        path: '/ideal/brandManage',
    },
    {
        menuName: '商品类别管理',
        name: 'goodsType-manage',
        icon: 'el-icon-c-scale-to-original',
        permission: 'menu.goodsType-manage',
        path: '/ideal/goodsTypeManage',
    },
];