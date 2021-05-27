export interface MenuItem {
    menuName: string; // 标题
    name: string; // 唯一值
    icon?: string;
    children?: MenuItem[];
    permission?: string; // 权限点
    path?: string;
}