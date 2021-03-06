/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-10-06 05:34:29
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-06 06:08:02
 */
import { FormItemConfigItem } from "@/interfaces/ilForm"
export const FORM_MODEL = {
    id: "",
    name: "",
    goodsTypeId: [],
    brandId: "",
    desc: "",
    price: 0,
    marketPrice: 0,
    size: "",
    count: 0,
    saleNum: 0,
    state: 1,
    imageUrl: "",
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
        goodsTypeId: [
            {
                required: true,
                trigger: "change",
            },
        ],
        brandId: [
            {
                required: true,
                trigger: "change",
            },
        ],
        desc: [
            {
                required: true,
                trigger: "change",
            },
        ],
        price: [
            {
                required: true,
                trigger: "change",
            },
        ],
        marketPrice: [
            {
                required: true,
                trigger: "change",
            },
        ],
        size: [
            {
                required: true,
                trigger: "change",
            },
        ],
        count: [
            {
                required: true,
                trigger: "change",
            },
        ],
        state: [
            {
                required: true,
                trigger: "change",
            },
        ],
        imageUrl: [
            {
                required: true,
                trigger: "change",
            },
        ],
        saleNum: [
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
        formItem: { label: "?????????" },
        attrs: {
            placeholder: "?????????????????????",
            clearable: true,
        },
    },
    {
        type: "select",
        prop: "brandId",
        formItem: { label: "??????" },
        attrs: {
            placeholder: "?????????????????????",
            clearable: true,
        },
    },
    {
        slot: 'goodsTypeId'
    },
    {
        type: "input",
        prop: "imageUrl",
        formItem: { label: "????????????" },
        attrs: {
            placeholder: "???????????????????????????",
            clearable: true,
        },
    },
    {
        type: "input",
        prop: "size",
        formItem: { label: "??????" },
        attrs: {
            placeholder: "?????????????????????",
            clearable: true,
        },
    },
    {
        type: "el-input-number",
        prop: "price",
        formItem: { label: "??????" },
    },
    {
        type: "el-input-number",
        prop: "marketPrice",
        formItem: { label: "?????????" },
    },
    {
        type: "el-input-number",
        prop: "saleNum",
        formItem: { label: "??????" },
    },
    {
        type: "el-input-number",
        prop: "count",
        formItem: { label: "??????" },
    },
    {
        type: "radio",
        prop: "state",
        formItem: { label: "????????????" },
    },
    {
        type: "input",
        prop: "desc",
        formItem: { label: "??????" },
        attrs: {
            type: "textarea",
            placeholder: "?????????????????????",
            autosize: { minRows: 3, maxRows: 5 },
            clearable: true,
        },
    },
]

export const Options = {
    brandId: [],
    state: [
        {
            label: '??????',
            value: 1,
        },
        {
            label: '??????',
            value: 2,
        },
        {
            label: '??????',
            value: 3,
        },
    ],
}