/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-10-06 04:32:46
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-06 05:07:07
 */
import { FormItemConfigItem } from "@/interfaces/ilForm"
export const FORM_MODEL = {
    id: "",
    name: "",
    permission_type: 1,
    moduleId: "",
    permission: "",
}
export const LAYOUT = {
    rowLayout: {
        type: "flex",
        direction: "column",
        justify: 'center'
    },
    colLayout: {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 24,
        xl: 24,
    },
}

export const FORM_CONFIG = {
    labelWidth: "100px",
    size: "mini",
    rules: {
        name: [
            {
                required: true,
                trigger: "change",
            },
        ],
        permission_type: [
            {
                required: true,
                trigger: "change",
            },
        ],
        module_name: [
            {
                required: true,
                trigger: "change",
            },
        ],
        permission: [
            {
                required: true,
                trigger: "change",
            },
        ],
    },
}

export const FORM_ITEM_CONFIG: FormItemConfigItem[] = [
    {
        type: "input",
        prop: "name",
        formItem: { label: "名称" },
        attrs: {
            placeholder: "请输入名称",
            clearable: true,
        },
    },
    {
        type: "input",
        prop: "permission",
        formItem: { label: "权限点" },
        attrs: {
            placeholder: "请输入权限点",
            clearable: true,
        },
    },
    {
        type: "radio",
        prop: "permission_type",
        formItem: { label: "权限点类型" },
    },
    {
        type: "select",
        prop: "moduleId",
        formItem: { label: "模块名称" },
        attrs: {
            placeholder: "请选择模块名称",
        }
    },
]

export const Options = {
    permission_type: [
        {
            label: '菜单',
            value: 1,
        },
        {
            label: '按钮',
            value: 2,
        },
        {
            label: '数据',
            value: 3,
        },
    ],
    moduleId: []
}