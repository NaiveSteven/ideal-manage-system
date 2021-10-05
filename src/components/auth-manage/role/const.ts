/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-10-06 05:08:17
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-06 05:18:28
 */
import { FormItemConfigItem } from "@/interfaces/ilForm"
export const FORM_MODEL = {
    permissionsID: "",
    name: "",
    remark: "",
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
        remark: [
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
        formItem: { label: "角色名" },
        attrs: {
            placeholder: "请输入角色名",
            clearable: true,
        },
    },
    {
        type: "input",
        prop: "remark",
        formItem: { label: "备注" },
        attrs: {
            type: 'textarea',
            placeholder: "请输入备注",
            clearable: true,
            autoSize: { minRows: 2, maxRows: 6 }
        },
    },
    {
        slot: 'checkbox'
    }
]