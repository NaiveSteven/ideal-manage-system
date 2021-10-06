/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-10-07 06:03:06
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-07 06:17:07
 */
import utils from "@/utils/utils"
import { AdminItem } from "@/interfaces/UserManage"

type Operate_func = (row: AdminItem) => void

export const TABLE_COLS = (handleEdit: Operate_func, handleDel: Operate_func) => [
    {
        label: '昵称',
        slot: 'nickname',
        width: '160px'
    },
    {
        label: "手机号",
        prop: "phone",
        minWidth: 120,
    },
    {
        label: "密码",
        prop: "password",
        minWidth: 120,
    },
    {
        label: "角色",
        slot: 'roles',
        width: 120,
    },
    {
        label: "创建时间",
        prop: "createdAt",
        minWidth: 150,
        formatter: ({ }, { }, value: string) => {
            return utils.formateDate(new Date(value))
        },
    },
    {
        headerSlot: 'header',
        type: 'button',
        btnList: [
            {
                label: "编辑",
                type: "text",
                size: "mini",
                click: (row: AdminItem) => handleEdit(row)
            },
            {
                label: "删除",
                type: "text",
                size: "mini",
                click: (row: AdminItem) => handleDel(row)
            },
        ],
    }
]