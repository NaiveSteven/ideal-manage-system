/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-10-07 03:38:06
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-07 04:16:35
 */
import utils from "@/utils/utils"
import { ModuleItem } from "@/interfaces/AuthManage"

type Operate_func = (row: ModuleItem) => void

export const TABLE_COLS = (handleEdit: Operate_func, handleDel: Operate_func) => [
    {
        type: 'selection',
        width: '55'
    },
    {
        label: "模块名",
        prop: "moduleName",
        minWidth: 120,
    },
    {
        label: "备注",
        prop: "remark",
        minWidth: 120,
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
                click: (row: ModuleItem) => handleEdit(row)
              },
              {
                label: "删除",
                type: "text",
                size: "mini",
                click: (row: ModuleItem) => handleDel(row)
              },
        ],
    }
]