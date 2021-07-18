import LoginApi from './LoginApi';
import UserApi from './UserApi';
import GoodApi from './GoodApi';
import BrandApi from './BrandApi';
import PermissionApi from './PermissionApi';
import RoleApi from './RoleApi';
import ModuleApi from './ModuleApi';
import GoodsTypeApi from './GoodsTypeApi';
import AdminApi from './AdminApi';
import OrderApi from './OrderApi';

export default {
    ...LoginApi,
    ...UserApi,
    ...GoodApi,
    ...BrandApi,
    ...GoodsTypeApi,
    ...PermissionApi,
    ...RoleApi,
    ...ModuleApi,
    ...AdminApi,
    ...OrderApi
}