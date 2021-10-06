/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-10-07 03:40:23
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-07 03:52:36
 */
import { reactive, ref } from 'vue'
import { PageInfo } from "@/interfaces/Common"

export const useTableData = (tableColsParams: any) => {
    const pagination = reactive<PageInfo>({
        page: 1,
        limit: 10,
        total: 10,
    })
    const tableCols = reactive(tableColsParams)
    const isTableLoading = ref(false)
    return { pagination, tableCols, isTableLoading }
}