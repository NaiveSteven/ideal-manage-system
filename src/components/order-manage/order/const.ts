/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-10-06 06:20:26
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-07 06:54:25
 */
import { FormItemConfigItem } from "@/interfaces/ilForm"
import utils from "@/utils/utils"
import { PlaceOrderItem } from "@/interfaces/OrderManage"
import type { Ref } from 'vue'

export const FORM_MODEL = {
    id: "",
    name: "",
    phone: "",
    address: "",
    count: 0,
    goodsId: "",
    deal_state: 1,
    state: 1,
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
        phone: [
            {
                required: true,
                trigger: "change",
            },
        ],
        address: [
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
        goodsId: [
            {
                required: true,
                trigger: "change",
            },
        ],
        deal_state: [
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
    },
}

export const FORM_ITEM_CONFIG: FormItemConfigItem[] = [
    {
        type: "input",
        prop: "phone",
        formItem: { label: "手机号" },
        attrs: {
            placeholder: "请输入手机号",
            clearable: true,
        },
    },
    {
        type: "input",
        prop: "address",
        formItem: { label: "地址" },
        attrs: {
            placeholder: "请输入地址",
            clearable: true,
        },
    },
    {
        type: "input",
        prop: "name",
        formItem: { label: "姓名" },
        attrs: {
            placeholder: "请输入姓名",
            clearable: true,
        },
    },
    {
        type: "select",
        prop: "goodsId",
        formItem: { label: "商品名" },
        attrs: {
            placeholder: "请输入商品名",
            clearable: true,
        },
    },
    {
        type: "radio",
        prop: "state",
        formItem: { label: "订单状态" },
    },
    {
        type: "radio",
        prop: "deal_state",
        formItem: { label: "处理状态" },
    },
    {
        type: 'el-input-number',
        prop: 'count',
        formItem: { label: '数量' }
    }
]

export const Options = {
    goodsId: [],
    state: [
        {
            label: '未付款',
            value: 1
        },
        {
            label: '已付款未发货',
            value: 2
        },
        {
            label: '已发货未确认收到',
            value: 3
        },
        {
            label: '确认到货订单完成',
            value: 4
        },
    ],
    deal_state: [
        {
            label: '未处理',
            value: 1
        },
        {
            label: '正在处理',
            value: 2
        },
        {
            label: '处理完成',
            value: 3
        },
    ],
}




type Operate_func = (row: PlaceOrderItem) => void

export const TABLE_COLS = (handleEdit: Operate_func, handleDel: Operate_func, handleToDetail: Operate_func, userList: Ref, goodsList: Ref) => [
    {
        type: 'selection',
        width: '55'
    },
    {
        label: "用户Id",
        prop: "userId",
        width: 100,
        showOverflowTooltip: true,
        formatter: ({ }, { }, value: number) => {
            return utils.getListName(value, userList)
        },
    },
    {
        label: "商品名",
        prop: "goodsId",
        minWidth: 100,
        showOverflowTooltip: true,
        formatter: ({ }, { }, value: number) => {
            return utils.getListName(value, goodsList)
        },
    },
    {
        label: "地址",
        prop: "address",
        width: 100,
        showOverflowTooltip: true,
    },
    {
        label: "价格",
        prop: "price",
        minWidth: 100,
    },
    {
        label: "购买数量",
        prop: "count",
        minWidth: 100,
    },
    {
        label: "状态",
        slot: "state",
        minWidth: 150,
    },
    {
        label: "创建时间",
        prop: "createdAt",
        width: 150,
        formatter: ({ }, { }, value: string) => {
            return utils.formateDate(new Date(value))
        },
    },
    {
        label: '操作',
        type: 'button',
        width: 120,
        btnList: [
            {
                label: "编辑",
                type: "text",
                size: "mini",
                click: (row: PlaceOrderItem) => handleEdit(row)
            },
            {
                label: "详情",
                type: "text",
                size: "mini",
                click: (row: PlaceOrderItem) => handleToDetail(row)
            },
            {
                label: "删除",
                type: "text",
                size: "mini",
                click: (row: PlaceOrderItem) => handleDel(row)
            },
        ],
    }
]