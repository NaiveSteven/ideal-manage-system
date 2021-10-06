/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-10-07 05:48:43
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-07 05:56:16
 */
import utils from "@/utils/utils"
import { GoodsTypeItem } from "@/interfaces/GoodsManage"

type Operate_func = (row: GoodsTypeItem) => void

export const TABLE_COLS = (handleEdit: Operate_func, handleDel: Operate_func) => [
    {
        type: 'selection',
        width: '55'
    },
    {
        label: "商品类别名",
        prop: "name",
        minWidth: 120,
        hasChildren: true,
    },
    {
        label: "创建时间",
        prop: "createdAt",
        minWidth: 150,
        formatter: ({ }, { }, value: string) => {
            return utils.formateDate(new Date(value));
        },
    },
    {
        label: '操作',
        type: 'button',
        btnList: [
            {
                label: "编辑",
                type: "text",
                size: "mini",
                click: (row: GoodsTypeItem) => handleEdit(row)
            },
            {
                label: "删除",
                type: "text",
                size: "mini",
                click: (row: GoodsTypeItem) => handleDel(row)
            },
        ],
    }
]