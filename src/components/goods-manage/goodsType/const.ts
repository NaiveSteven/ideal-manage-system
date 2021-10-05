/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-10-06 06:11:25
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-06 06:14:56
 */
import { FormItemConfigItem } from "@/interfaces/ilForm"
export const FORM_MODEL = {
    id: "",
    name: "",
    pid: "",
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
          pid: [
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
        formItem: { label: "商品类别名" },
        attrs: {
            placeholder: "请输入商品类别名称",
            clearable: true,
        },
    },
    {
        slot: 'pid'
    },
]