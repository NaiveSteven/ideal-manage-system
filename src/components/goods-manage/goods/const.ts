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
        formItem: { label: "商品名" },
        attrs: {
            placeholder: "请输入商品名称",
            clearable: true,
        },
    },
    {
        type: "select",
        prop: "brandId",
        formItem: { label: "品牌" },
        attrs: {
            placeholder: "请选择商品品牌",
            clearable: true,
        },
    },
    {
        slot: 'goodsTypeId'
    },
    {
        type: "input",
        prop: "imageUrl",
        formItem: { label: "图片地址" },
        attrs: {
            placeholder: "请输入商品图片地址",
            clearable: true,
        },
    },
    {
        type: "input",
        prop: "size",
        formItem: { label: "规格" },
        attrs: {
            placeholder: "请输入商品规格",
            clearable: true,
        },
    },
    {
        type: "el-input-number",
        prop: "price",
        formItem: { label: "规格" },
    },
    {
        type: "el-input-number",
        prop: "marketPrice",
        formItem: { label: "市场价" },
    },
    {
        type: "el-input-number",
        prop: "saleNum",
        formItem: { label: "销量" },
    },
    {
        type: "el-input-number",
        prop: "count",
        formItem: { label: "库存" },
    },
    {
        type: "radio",
        prop: "state",
        formItem: { label: "商品状态" },
    },
    {
        type: "input",
        prop: "desc",
        formItem: { label: "描述" },
        attrs: {
            type: "textarea",
            placeholder: "请输入商品描述",
            autosize: { minRows: 3, maxRows: 5 },
            clearable: true,
        },
    },
]

export const Options = {
    brandId: [],
    state: [
        {
            label: '在售',
            value: 1,
        },
        {
            label: '下架',
            value: 2,
        },
        {
            label: '售罄',
            value: 3,
        },
    ],
}