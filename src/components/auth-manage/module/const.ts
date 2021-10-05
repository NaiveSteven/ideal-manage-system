/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-10-06 04:07:44
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-06 04:24:03
 */
import { FormItemConfigItem } from "@/interfaces/ilForm"
export const FORM_MODEL = {
    id: "",
    moduleName: "",
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
        moduleName: [
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
        prop: "moduleName",
        formItem: { label: "模块名" },
        attrs: {
            placeholder: "请输入模块名",
            clearable: true,
        },
    },
    {
        type: "input",
        prop: "remark",
        formItem: { label: "备注" },
        attrs: {
            placeholder: "请输入备注",
            clearable: true,
        },
    },
]