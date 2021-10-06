/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-10-07 04:23:37
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-07 04:39:37
 */
/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-10-07 04:23:37
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-07 04:27:28
 */
import utils from "@/utils/utils"
import type { Ref } from 'vue'
import { PermissionItem } from "@/interfaces/AuthManage"
import { PERMISSION_TYPE_LIST } from "@/const"

type Operate_func = (row: PermissionItem) => void

export const TABLE_COLS = (handleEdit: Operate_func, handleDel: Operate_func, moduleList: Ref) => [
    {
        type: 'selection',
        width: '55'
    },
    {
        label: "名称",
        prop: "name",
        minWidth: "110",
    },
    {
        label: "permission",
        prop: "permission",
        minWidth: "110",
        showOverflowTooltip: true,
    },
    {
        label: "权限点类别",
        prop: "permission_type",
        minWidth: "110",
        formatter({ }, { }, value: number) {
            return utils.getListLabel(value, PERMISSION_TYPE_LIST);
        },
    },
    {
        label: "所属模块名",
        prop: "moduleId",
        minWidth: "110",
        showOverflowTooltip: true,
        formatter({ }, { }, value: number) {
            return utils.getListName(value, moduleList, "moduleName");
        },
    },
    {
        label: "创建时间",
        prop: "createdAt",
        width: "150",
        formatter: ({ }, { }, value: string) => {
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
                click: (row: PermissionItem) => handleEdit(row)
            },
            {
                label: "删除",
                type: "text",
                size: "mini",
                click: (row: PermissionItem) => handleDel(row)
            },
        ],
    }
]