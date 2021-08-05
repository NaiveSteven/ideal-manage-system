/*
 * @Description: Description
 * @Author: mjqin
 * @Date: 2021-05-26 23:36:37
 * @LastEditors: mjqin
 * @LastEditTime: 2021-08-06 00:18:31
 */
export default {
    saveData(state: any, data: { key: string, data: any}) {
        state[data.key] = data.data
    },
}