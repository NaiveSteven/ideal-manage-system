/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-10-07 04:51:28
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-07 05:01:36
 */
import utils from "@/utils/utils"
import { RoleItem } from "@/interfaces/AuthManage"

type Operate_Func = (row: RoleItem) => void
type Get_Permission = (params: number[]) => void

export const TABLE_COLS = (handleEdit: Operate_Func, handleDel: Operate_Func, getPermission: Get_Permission) => [
    {
        type: 'selection',
        width: '55'
    },
    {
        label: "角色名",
        prop: "name",
        minWidth: 120,
    },
    {
        label: "所绑定的权限点",
        prop: "permissionsID",
        minWidth: 180,
        formatter: ({ }, { }, value: number[]) => {
            return getPermission(value);
        },
        showOverflowTooltip: true,
    },
    {
        label: "创建时间",
        prop: "createdAt",
        minWidth: 120,
        formatter: ({ }, { }, value: string) => {
            return utils.formateDate(new Date(value));
        },
    },
    {
        label: "备注",
        prop: "remark",
        minWidth: 120,
    },
    {
        headerSlot: 'header',
        type: 'button',
        btnList: [
            {
                label: "编辑",
                type: "text",
                size: "mini",
                click: (row: RoleItem) => handleEdit(row)
            },
            {
                label: "删除",
                type: "text",
                size: "mini",
                click: (row: RoleItem) => handleDel(row)
            },
        ],
    }
]