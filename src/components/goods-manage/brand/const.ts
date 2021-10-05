/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-10-06 05:28:12
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-06 05:33:21
 */
import { FormItemConfigItem } from "@/interfaces/ilForm"
export const FORM_MODEL = {
    id: "",
    name: "",
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
                trigger: "blur",
            },
        ],
    },
}

export const FORM_ITEM_CONFIG: FormItemConfigItem[] = [
    {
        type: "input",
        prop: "name",
        formItem: { label: "品牌名" },
        attrs: {
            placeholder: "请输入品牌名",
            clearable: true,
        },
    },
]