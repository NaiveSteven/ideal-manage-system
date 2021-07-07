import LoginApi from './LoginApi';
import UserApi from './UserApi';
import GoodApi from './GoodApi';
import BrandApi from './BrandApi';
import GoodsTypeApi from './GoodsType';
import PermissionApi from './PermissionApi';
import RoleApi from './RoleApi';
import ModuleApi from './ModuleApi';

export default {
    ...LoginApi,
    ...UserApi,
    ...GoodApi,
    ...BrandApi,
    ...GoodsTypeApi,
    ...PermissionApi,
    ...RoleApi,
    ...ModuleApi,
}