/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-10-06 03:52:55
 * @LastEditors: mjqin
 * @LastEditTime: 2021-10-06 04:17:30
 */
import { reactive } from 'vue';
import { IndexInterface, Layout } from '@/interfaces/Common'
import { FormItemConfigItem } from '@/interfaces/IlForm'


export function useFormData(
    formModelParam: IndexInterface,
    formConfigParam: IndexInterface,
    formItemConfigParam: FormItemConfigItem[],
    layoutParam: Layout = {},
    optionsParam: IndexInterface = {}
) {
    const formModel = reactive(formModelParam)
    const formConfig = reactive(formConfigParam)
    const formItemConfig = reactive(formItemConfigParam)
    const layout = reactive(layoutParam)
    const optionsConfig = reactive(optionsParam)
    return { formModel, formConfig, formItemConfig, layout, optionsConfig }
}