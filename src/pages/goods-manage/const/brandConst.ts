/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-10-07 05:08:43
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-07 05:11:40
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
        label: "品牌名",
        prop: "name",
        minWidth: 120,
      },
      {
        label: "创建时间",
        prop: "createdAt",
        minWidth: 150,
        formatter: (row, column, value) => {
          return utils.formateDate(new Date(value));
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