/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-10-07 05:17:25
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-07 05:47:47
 */
import utils from "@/utils/utils"
import type { Ref } from 'vue'
import { GoodsItem } from "@/interfaces/GoodsManage"

type Operate_func = (row: GoodsItem) => void

export const TABLE_COLS = (handleEdit: Operate_func, handleDel: Operate_func, goodsTypeList: Ref, brandList: Ref) => [
    {
        type: 'selection',
        width: '55'
    },
    {
        label: '商品名',
        slot: 'name'
    },
    {
        label: "商品类别",
        prop: "goodsTypeId",
        width: 100,
        showOverflowTooltip: true,
        formatter({ }, { }, value: number) {
            return (utils.getTreeListItem(value, goodsTypeList.value) as any).name
        },
    },
    {
        label: "品牌",
        prop: "brandId",
        width: 100,
        showOverflowTooltip: true,
        formatter({ }, { }, value: number) {
            return utils.getListName(value, brandList)
        },
    },
    {
        label: "价格",
        prop: "price",
        minWidth: 100,
    },
    {
        label: "市场价",
        prop: "marketPrice",
        minWidth: 100,
    },
    {
        label: "规格",
        prop: "size",
        minWidth: 100,
    },
    {
        label: "销量",
        prop: "saleNum",
        minWidth: 100,
    },
    {
        label: "库存",
        prop: "count",
        minWidth: 100,
    },
    {
        label: "状态",
        prop: "state",
        minWidth: 100,
        slot: 'state',
        formatter({ }, { }, value: number) {
            return {
                1: "在售",
                2: "下架",
                3: "售罄",
            }[value]
        },
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
        minWidth: '100px',
        btnList: [
            {
                label: "编辑",
                type: "text",
                size: "mini",
                click: (row: GoodsItem) => handleEdit(row)
            },
            {
                label: "删除",
                type: "text",
                size: "mini",
                click: (row: GoodsItem) => handleDel(row)
            },
        ],
    }
]