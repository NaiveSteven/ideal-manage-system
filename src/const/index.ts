import { MenuItem } from '../interfaces/Menu';
export const TOKEN_INVALID = 'Token认证失败，请重新登录'
export const NETWORK_ERROR = '网络请求异常，请稍后重试'

export const DIALOG_MODE_ADD = 'add';
export const DIALOG_MODE_EDIT = 'edit';

export const DEL_DIALOG_SINGLE = 'single';
export const DEL_DIALOG_MULTIPLE = 'multiple';

export const MENU_DATA: MenuItem[] = [
    {
        menuName: '首页',
        name: 'home',
        icon: 'el-icon-s-home',
        permission: 'menu.home',
        path: '/ideal',
    },
    {
        menuName: '用户管理',
        name: 'user-manage',
        icon: 'el-icon-s-custom',
        permission: 'menu.userManage',
        path: '/userManage',
        children: [
            {
                menuName: '管理员',
                name: 'adminUser',
                icon: 'el-icon-s-custom',
                permission: 'menu.adminUser',
                path: '/ideal/adminUser',
            },
            {
                menuName: '小程序用户管理',
                name: 'consumer',
                icon: 'el-icon-user-solid',
                permission: 'menu.consumer',
                path: '/ideal/consumerManage',
            },
        ],
    },
    {
        menuName: '权限管理',
        name: 'permission-manage',
        icon: 'el-icon-s-flag',
        permission: 'menu.permissionManage',
        path: '/permission',
        children: [
            {
                menuName: '模块管理',
                name: 'moduleManage',
                icon: 'el-icon-film',
                permission: 'menu.module',
                path: '/ideal/moduleManage',
            },
            {
                menuName: '权限点管理',
                name: 'permissionManage',
                icon: 'el-icon-lollipop',
                permission: 'menu.point',
                path: '/ideal/permissionManage',
            },
            {
                menuName: '角色管理',
                name: 'roleManage',
                icon: 'el-icon-s-check',
                permission: 'menu.role',
                path: '/ideal/roleManage',
            },
        ],
    },
    {
        menuName: '商品管理',
        name: 'goods-module-manage',
        icon: 'el-icon-shopping-cart-full',
        permission: 'menu.goodsManage',
        path: '/ideal/goodsManage',
        children: [
            {
                menuName: '品牌管理',
                name: 'brandManage',
                icon: 'el-icon-reading',
                permission: 'menu.brand',
                path: '/ideal/brandManage',
            },
            {
                menuName: '商品类别管理',
                name: 'goodsTypeMange',
                icon: 'el-icon-c-scale-to-original',
                permission: 'menu.goodsType',
                path: '/ideal/goodsTypeManage',
            },
            {
                menuName: '商品管理',
                name: 'goodsManage',
                icon: 'el-icon-s-shop',
                permission: 'menu.goods',
                path: '/ideal/goodsManage',
            },
        ],
    },
    {
        menuName: '订单管理',
        name: 'order-manage',
        icon: 'el-icon-tickets',
        permission: 'menu.orderManage',
        path: '/ideal/orderManage',
        children: [
            {
                menuName: '下单管理',
                name: 'placeOrderManage',
                icon: 'el-icon-document-add',
                permission: 'menu.placeOrder',
                path: '/ideal/placeOrderManage',
            }
        ],
    },
    // {
    //     menuName: '爆款管理',
    //     name: 'explosion-manage',
    //     icon: 'el-icon-shopping-cart-full',
    //     permission: 'menu.explosion-manage',
    //     path: '/ideal/explosionManage',
    // },
    // {
    //     menuName: '促销管理',
    //     name: 'promotion-manage',
    //     icon: 'el-icon-shopping-cart-2',
    //     permission: 'menu.promotion-manage',
    //     path: '/ideal/promotionManage',
    // },
];

export const GOOD_STATE = [
    {
        label: '全部',
        value: 0,
    },
    {
        label: '在售',
        value: 1,
    },
    {
        label: '下架',
        value: 2,
    },
    {
        label: '售罄',
        value: 3,
    },
];

export const PERMISSION_TYPE_LIST = [
    {
        label: '全部',
        value: 0,
    },
    {
        label: '菜单',
        value: 1,
    },
    {
        label: '按钮',
        value: 2,
    },
    {
        label: '数据',
        value: 3,
    },
];