/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-10-07 06:19:22
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-07 06:28:01
 */
import utils from "@/utils/utils"
import { ConsumerItem } from '@/interfaces/UserManage'

type Operate_func = (row: ConsumerItem) => void

export const TABLE_COLS = (handleEdit: Operate_func, handleDel: Operate_func, handleDetail: Operate_func) => [
    {
        type: 'index',
        label: '索引'
    },
    {
        label: "用户ID",
        prop: "id",
        minWidth: 100,
    },
    {
        label: "用户名",
        prop: "name",
        minWidth: 120,
    },
    {
        label: "注册时间",
        prop: "createdAt",
        width: 180,
        formatter: ({ }, { }, value: string) => {
            return utils.formateDate(new Date(value))
        },
    },
    {
        headerSlot: 'header',
        type: 'button',
        btnList: [
            {
                label: "详情",
                type: "text",
                size: "mini",
                click: (row: ConsumerItem) => handleDetail(row)
            },
            {
                label: "编辑",
                type: "text",
                size: "mini",
                click: (row: ConsumerItem) => handleEdit(row)
            },
            {
                label: "删除",
                type: "text",
                size: "mini",
                click: (row: ConsumerItem) => handleDel(row)
            },
        ],
    }
]